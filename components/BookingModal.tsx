'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { siteContent, RoomItem } from '@/data/content';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Calendar as CalendarIcon,
  Zap,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Users,
  Bed,
  RotateCcw,
  Sparkles,
  Check,
  Phone,
  QrCode,
  Copy
} from 'lucide-react';

const PAYMENT_CONFIG = {
  bankName: 'Ngân hàng Quân Đội (MB Bank)',
  bankCode: 'MB',
  accountNumber: '0964863838',
  accountDisplay: '0964.863.838',
  accountName: 'MO VILLAGE RESORT',
  hotline: '0964 863 838',
  hotlineTel: '+84964863838',
  zaloUrl: 'https://zalo.me/0964863838',
  facebookUrl: 'https://www.facebook.com/movillage.hoabinh',
  resortName: 'Mơ Village Resort',
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedOption?: string;
}

export function BookingModal({ isOpen, onClose, preselectedOption }: BookingModalProps) {
  const { locale } = useLanguage();
  const rooms: RoomItem[] = siteContent[locale]?.rooms?.items || siteContent.vi.rooms.items;

  const getCategoryLabel = (cat: string) => {
    if (locale !== 'en') return cat;
    const map: Record<string, string> = {
      'Nhà Cộng Đồng': 'Community House',
      'Nhà Đào': 'Peach House',
      'Nhà Mận': 'Plum House',
      'Nhà Mít': 'Jackfruit House',
      'Nhà Sang': 'Sang Villa',
      'Nhà Táo': 'Apple House',
    };
    return map[cat] || cat;
  };

  const contentScrollRef = useRef<HTMLDivElement>(null);

  // Selected room state (null when user opened from navbar/hero without picking a specific room)
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [roomFilterCategory, setRoomFilterCategory] = useState<string>('all');

  // Calendar State
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed: 9 is October

  // Date selection state - Default to UNSELECTED (null)
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);

  // Step state: 'room_list' | 'details' | 'form' | 'success'
  const [currentStep, setCurrentStep] = useState<'room_list' | 'details' | 'form' | 'success'>('room_list');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    adults: '2',
    children: '0',
    specialRequests: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingCode, setBookingCode] = useState<string>('');
  const [showQr, setShowQr] = useState<boolean>(true);
  const [copiedBill, setCopiedBill] = useState<boolean>(false);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);

  // Sync preselected option when opened - Always show calendar table first
  useEffect(() => {
    if (!isOpen) return;

    if (preselectedOption) {
      const found = rooms.find(
        (r: RoomItem) =>
          r.name.toLowerCase().includes(preselectedOption.toLowerCase()) ||
          r.category.toLowerCase().includes(preselectedOption.toLowerCase()) ||
          (r.code && r.code.toLowerCase() === preselectedOption.toLowerCase())
      );
      if (found) {
        setSelectedRoomId(found.id);
        setCurrentStep('details');
      } else {
        setSelectedRoomId(rooms[0]?.id || null);
        setCurrentStep('details');
      }
    } else {
      // General booking action: open CALENDAR TABLE FIRST with default first room
      setSelectedRoomId(rooms[0]?.id || null);
      setCurrentStep('details');
    }

    // Reset date selection to unselected state on every modal open
    setCheckInDate(null);
    setCheckOutDate(null);
    setCurrentImageIndex(0);
    setFormError(null);
    setBookingCode('');
    setCopiedBill(false);
    setCopiedAccount(false);
    setShowQr(true);
  }, [preselectedOption, isOpen, rooms]);

  // Scroll to top when changing steps
  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, selectedRoomId]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const activeRoom = useMemo(() => {
    if (!selectedRoomId) return null;
    return rooms.find((r: RoomItem) => r.id === selectedRoomId) || null;
  }, [rooms, selectedRoomId]);

  const gallery = useMemo(() => {
    if (!activeRoom) return [];
    if (activeRoom.gallery && activeRoom.gallery.length > 0) {
      return activeRoom.gallery;
    }
    return [activeRoom.image];
  }, [activeRoom]);

  // Unique categories for filter
  const roomCategories = useMemo(() => {
    const cats = new Set<string>();
    rooms.forEach((r: RoomItem) => cats.add(r.category));
    return ['all', ...Array.from(cats)];
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    if (roomFilterCategory === 'all') return rooms;
    return rooms.filter((r: RoomItem) => r.category === roomFilterCategory);
  }, [rooms, roomFilterCategory]);

  // Parse numeric price from string
  const pricePerNightNumber = useMemo(() => {
    if (!activeRoom?.pricePerNight) return 1950000;
    const clean = activeRoom.pricePerNight.replace(/\D/g, '');
    return clean ? parseInt(clean, 10) : 1950000;
  }, [activeRoom]);

  const priceFormattedK = useMemo(() => {
    const k = Math.round(pricePerNightNumber / 1000);
    return `${k.toLocaleString('vi-VN')}k`;
  }, [pricePerNightNumber]);

  // Calculate number of nights
  const numberOfNights = useMemo(() => {
    if (!checkInDate) return 0;
    if (!checkOutDate) return 1; // 1 night provisional when check-in is picked
    const inD = new Date(checkInDate);
    const outD = new Date(checkOutDate);
    const diffTime = outD.getTime() - inD.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkInDate, checkOutDate]);

  const totalPriceNumber = useMemo(() => {
    if (!checkInDate) return 0;
    return pricePerNightNumber * numberOfNights;
  }, [pricePerNightNumber, numberOfNights, checkInDate]);

  const depositAmount = useMemo(() => {
    return Math.round(totalPriceNumber * 0.5);
  }, [totalPriceNumber]);

  // Format date helper: '2026-10-19' -> '19/10'
  const formatDateDisplay = (dateStr: string | null) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}`;
    }
    return dateStr;
  };

  // Full date helper: '2026-10-19' -> '19/10/2026'
  const formatFullDate = (dateStr: string | null, fallbackDay = 1) => {
    if (!dateStr) {
      const d = new Date(currentYear, currentMonth, fallbackDay);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      return `${day}/${month}/${d.getFullYear()}`;
    }
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Generate calendar days for currentMonth & currentYear
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let startDayOffset = firstDayOfMonth.getDay() - 1;
    if (startDayOffset === -1) startDayOffset = 6;

    const days = [];

    // Empty cells before start of month
    for (let i = 0; i < startDayOffset; i++) {
      days.push({ empty: true, id: `empty-${i}` });
    }

    // Days in month
    for (let d = 1; d <= daysInMonth; d++) {
      const dayStr = d < 10 ? `0${d}` : `${d}`;
      const monthStr = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
      const fullDate = `${currentYear}-${monthStr}-${dayStr}`;

      const isBooked = [1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18].includes(d);

      days.push({
        empty: false,
        dayNumber: d,
        dateString: fullDate,
        isBooked,
      });
    }

    return days;
  }, [currentYear, currentMonth]);

  // Handle Date Click
  const handleDateClick = (dateString: string, isBooked: boolean) => {
    if (isBooked) return;

    if (!checkInDate) {
      // 1. Initial click: Select Check-In
      setCheckInDate(dateString);
      setCheckOutDate(null);
    } else if (checkInDate && !checkOutDate) {
      // 2. Second click: Select Check-Out
      if (new Date(dateString) > new Date(checkInDate)) {
        setCheckOutDate(dateString);
      } else {
        // If clicked date is earlier or same, reset as new check-in date
        setCheckInDate(dateString);
        setCheckOutDate(null);
      }
    } else {
      // 3. Both dates already selected -> Start fresh selection
      setCheckInDate(dateString);
      setCheckOutDate(null);
    }
  };

  // Quick 1-Night action
  const handleQuickOneNight = () => {
    if (!checkInDate) return;
    const nextDay = new Date(checkInDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCheckOutDate(nextDay.toISOString().split('T')[0]);
  };

  // Clear date selection (Back to unselected state)
  const handleClearDates = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  // Image navigation
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const buildBillText = (codeToUse?: string) => {
    const code = codeToUse || bookingCode || '#MV-0810-251';
    const resortTitle = PAYMENT_CONFIG.resortName.toUpperCase();
    const checkInStr = formatFullDate(checkInDate, 10);
    const checkOutStr = formatFullDate(checkOutDate, 11);
    const nights = numberOfNights || 1;
    const cleanPhone = (formData.phone || '').replace(/\s+/g, '');

    return `PHIẾU ĐẶT PHÒNG - ${resortTitle}
Mã đơn: ${code}
Khách hàng: ${formData.fullName || (locale === 'en' ? 'Valued guest' : 'Quý khách')}
Số điện thoại: ${formData.phone}
Căn phòng: ${activeRoom?.name || ''}
Nhận phòng: ${checkInStr} lúc 14h
Trả phòng: ${checkOutStr} lúc 12h (${nights} đêm)
Số khách: ${formData.adults} người${parseInt(formData.children) > 0 ? `, ${formData.children} trẻ em` : ''} (Chuẩn ${activeRoom?.capacity || '2 người'})
Tiền phòng thanh toán: ${totalPriceNumber.toLocaleString('vi-VN')} đ
Tổng bill thanh toán: ${totalPriceNumber.toLocaleString('vi-VN')} VNĐ
Số tiền cọc trước (50%): ${depositAmount.toLocaleString('vi-VN')} VNĐ
---
Tài khoản nhận cọc:
Ngân hàng: ${PAYMENT_CONFIG.bankName}
Số tài khoản: ${PAYMENT_CONFIG.accountNumber}
Chủ tài khoản: ${PAYMENT_CONFIG.accountName}
Nội dung CK: ${code} ${cleanPhone}`;
  };

  // Form Submit Handler
  const handleFormSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.fullName.trim()) {
      setFormError(locale === 'en' ? 'Please enter your full name.' : 'Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 9) {
      setFormError(locale === 'en' ? 'Please enter a valid phone number or WhatsApp.' : 'Vui lòng nhập số điện thoại hoặc Zalo hợp lệ.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const rand = Math.floor(100 + Math.random() * 900);
    const code = `#MV-${dd}${mm}-${rand}`;
    setBookingCode(code);

    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('success');

      // Auto-copy bill text to clipboard
      const billText = buildBillText(code);
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(billText).catch(() => { });
      }
      setCopiedBill(true);
    }, 600);
  };

  const handleOpenZalo = () => {
    const text = buildBillText();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => { });
    }
    setCopiedBill(true);
    window.open(PAYMENT_CONFIG.zaloUrl, '_blank');
  };

  const handleCopyBill = () => {
    const text = buildBillText();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => { });
    }
    setCopiedBill(true);
    setTimeout(() => setCopiedBill(false), 2500);
  };

  const handleCopyAccount = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(PAYMENT_CONFIG.accountNumber).catch(() => { });
    }
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-espresso/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[700px] max-h-[94vh] bg-warm-paper rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stilt-timber/25 text-espresso animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. TOP STICKY HEADER */}
        <div className="shrink-0 bg-warm-paper/95 backdrop-blur-md border-b border-stilt-timber/15 px-6 sm:px-8 py-3.5 sm:py-4 min-h-[56px] flex items-center justify-between z-30">
          {currentStep === 'room_list' ? (
            <div className="flex items-center gap-2.5">
              <span className="text-sm sm:text-base font-bold text-espresso font-display tracking-tight">
                {locale === 'en' ? 'Select Room Category' : 'Chọn hạng phòng nghỉ'}
              </span>
            </div>
          ) : currentStep === 'details' ? (
            <button
              type="button"
              onClick={() => {
                setSelectedRoomId(null);
                setCurrentStep('room_list');
              }}
              className="h-8.5 px-3 rounded-lg bg-soft-sand hover:bg-stilt-timber/20 text-espresso text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4 text-terracotta" />
              <span>{locale === 'en' ? 'Change room' : 'Đổi hạng phòng'}</span>
            </button>
          ) : currentStep === 'form' ? (
            <button
              type="button"
              onClick={() => setCurrentStep('details')}
              className="h-8.5 px-3 rounded-lg bg-soft-sand hover:bg-stilt-timber/20 text-espresso text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4 text-terracotta" />
              <span>{locale === 'en' ? 'Back to dates' : 'Quay lại chọn ngày'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-sm sm:text-base font-bold text-espresso font-display">
                {locale === 'en' ? 'Booking Confirmation' : 'Xác nhận đặt phòng'}
              </span>
            </div>
          )}

          {/* Stepper Dots & Active Room Indicator */}
          <div className="flex items-center gap-3">
            {activeRoom && currentStep !== 'room_list' && (
              <span className="text-xs font-bold text-espresso bg-soft-sand px-3 py-1 rounded-lg truncate max-w-[140px] sm:max-w-[200px]">
                {activeRoom.name}
              </span>
            )}
            <button
              onClick={onClose}
              className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-soft-sand hover:bg-stilt-timber/25 text-espresso flex items-center justify-center active:scale-95 transition-colors cursor-pointer shrink-0 shadow-2xs"
              aria-label={locale === 'en' ? 'Close' : 'Đóng'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. SCROLLABLE CONTENT BODY */}
        <div ref={contentScrollRef} className="flex-1 overflow-y-auto px-6 sm:px-8 py-4 sm:py-5 space-y-4">

          {/* STEP 1: Visual Room Selection List */}
          {currentStep === 'room_list' && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center px-4 pt-3 sm:pt-4 pb-2">
                <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-1.5">
                  MƠ VILLAGE RESORT
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-espresso font-display">
                  {locale === 'en' ? 'Select Accommodations at Mơ' : 'Chọn phòng nghỉ tại Mơ'}
                </h3>
                <p className="text-xs sm:text-sm text-espresso/70 mt-1.5 max-w-md mx-auto leading-relaxed">
                  {locale === 'en' ? 'Select a room category to view real-time availability, photos, and rates' : 'Chọn hạng phòng để xem lịch trống thực tế, ảnh không gian và bảng giá chi tiết'}
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {roomCategories.map((cat: string) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setRoomFilterCategory(cat)}
                    className={`h-9 px-4 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer inline-flex items-center justify-center leading-none ${roomFilterCategory === cat
                      ? 'bg-terracotta text-warm-paper shadow-xs'
                      : 'bg-white border border-stilt-timber/20 text-espresso/80 hover:bg-soft-sand'
                      }`}
                  >
                    {cat === 'all' ? (locale === 'en' ? 'All rooms' : 'Tất cả phòng') : getCategoryLabel(cat)}
                  </button>
                ))}
              </div>

              {/* Rooms Cards List */}
              <div className="space-y-3 pt-1">
                {filteredRooms.map((rm: RoomItem) => (
                  <div
                    key={rm.id}
                    onClick={() => {
                      setSelectedRoomId(rm.id);
                      setCurrentImageIndex(0);
                      setCheckInDate(null);
                      setCheckOutDate(null);
                      setCurrentStep('details');
                    }}
                    className="bg-soft-sand/50 hover:bg-soft-sand border border-stilt-timber/20 hover:border-terracotta/40 rounded-xl p-3.5 sm:p-4 transition-all cursor-pointer flex gap-3.5 sm:gap-4 items-center group shadow-2xs"
                  >
                    {/* Room Thumbnail */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-soft-sand">
                      <Image
                        src={rm.image}
                        alt={rm.name}
                        fill
                        sizes="112px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                        {rm.capacity}
                      </span>
                    </div>

                    {/* Room Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[11px] font-semibold text-terracotta">
                          {rm.category}
                        </span>
                        {rm.code && (
                          <span className="text-[10px] text-espresso/60">
                            {locale === 'en' ? 'Code: ' : 'Mã: '}{rm.code}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-espresso font-display truncate group-hover:text-terracotta transition-colors">
                        {rm.name}
                      </h4>
                      <p className="text-xs text-espresso/70 truncate mb-2.5">
                        {rm.tagline}
                      </p>

                      <div className="flex items-center justify-between gap-2 pt-0.5">
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm sm:text-base font-bold text-terracotta font-display">
                            {rm.pricePerNight || (locale === 'en' ? 'Contact' : 'Liên hệ')}
                          </span>
                          {rm.pricePerNight && (
                            <span className="text-[10px] sm:text-[11px] text-espresso/60 font-normal">
                              {locale === 'en' ? '/ night' : '/ đêm'}
                            </span>
                          )}
                        </div>
                        <span className="h-9 px-4 rounded-lg text-xs font-medium bg-terracotta text-warm-paper group-hover:bg-terracotta/90 shadow-2xs transition-colors inline-flex items-center justify-center gap-1.5 leading-none shrink-0">
                          <span>{locale === 'en' ? 'View calendar' : 'Xem lịch'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Room Details & Booking Calendar */}
          {currentStep === 'details' && activeRoom && (
            <div className="space-y-4 animate-fade-in">
              {/* 1. Thanh tóm tắt phòng đang chọn & Nút đổi phòng nhanh (Không card lồng card) */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-stilt-timber/15">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shrink-0 border border-stilt-timber/20 bg-soft-sand shadow-2xs">
                    <Image
                      src={activeRoom.image}
                      alt={activeRoom.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-espresso font-display truncate">
                        {activeRoom.name}
                      </h4>
                      <span className="text-[11px] text-espresso/60 font-medium">({activeRoom.capacity})</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xs sm:text-sm font-bold text-terracotta">
                        {activeRoom.pricePerNight || (locale === 'en' ? 'Contact' : 'Liên hệ')}
                      </span>
                      {activeRoom.pricePerNight && (
                        <span className="text-[10px] text-espresso/60 font-normal">
                          {locale === 'en' ? '/ night' : '/ đêm'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep('room_list')}
                  className="h-8 px-3 rounded-lg bg-soft-sand hover:bg-stilt-timber/20 text-espresso text-xs font-semibold border border-stilt-timber/25 transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5 leading-none"
                >
                  <span>{locale === 'en' ? 'Change room' : 'Đổi phòng'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-terracotta" />
                </button>
              </div>

              {/* 2. BẢNG LỊCH TRỐNG ĐẶT PHÒNG (Liền mạch trực tiếp trên nền modal, không lồng card) */}
              <div id="booking-calendar" className="w-full">
                {/* Header tháng và điều hướng */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                      <CalendarIcon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-espresso text-sm sm:text-base font-display">
                      {locale === 'en'
                        ? `Available Dates - ${new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' })}`
                        : `Lịch trống Tháng ${currentMonth + 1}/${currentYear}`}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="w-7.5 h-7.5 sm:w-8 sm:h-8 inline-flex items-center justify-center rounded-lg border border-stilt-timber/25 hover:bg-soft-sand text-espresso active:scale-95 transition-all cursor-pointer"
                      aria-label={locale === 'en' ? 'Previous month' : 'Tháng trước'}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="w-7.5 h-7.5 sm:w-8 sm:h-8 inline-flex items-center justify-center rounded-lg border border-stilt-timber/25 hover:bg-soft-sand text-espresso active:scale-95 transition-all cursor-pointer"
                      aria-label={locale === 'en' ? 'Next month' : 'Tháng sau'}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Chú thích màu sắc (Legend) dạng thanh phẳng tinh gọn, không bọc card */}
                <div className="flex items-center justify-start gap-4 sm:gap-6 text-xs text-espresso/80 pb-2 mb-2 border-b border-stilt-timber/15 flex-wrap">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200 shrink-0"></span>
                    <span className="text-[11px] sm:text-xs">{locale === 'en' ? 'Available' : 'Còn trống'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-300 ring-2 ring-stone-200 shrink-0"></span>
                    <span className="text-[11px] sm:text-xs text-espresso/60">{locale === 'en' ? 'Booked' : 'Đã kín phòng'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-terracotta shrink-0"></span>
                    <span className="text-[11px] sm:text-xs text-terracotta font-semibold">{locale === 'en' ? 'Selected' : 'Đang chọn'}</span>
                  </div>
                </div>

                {/* Thứ trong tuần */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center mb-1.5">
                  <div className="py-0.5 text-xs font-bold text-espresso/70">{locale === 'en' ? 'Mon' : 'T2'}</div>
                  <div className="py-0.5 text-xs font-bold text-espresso/70">{locale === 'en' ? 'Tue' : 'T3'}</div>
                  <div className="py-0.5 text-xs font-bold text-espresso/70">{locale === 'en' ? 'Wed' : 'T4'}</div>
                  <div className="py-0.5 text-xs font-bold text-espresso/70">{locale === 'en' ? 'Thu' : 'T5'}</div>
                  <div className="py-0.5 text-xs font-bold text-espresso/70">{locale === 'en' ? 'Fri' : 'T6'}</div>
                  <div className="py-0.5 text-xs font-bold text-terracotta bg-terracotta/10 rounded-md">{locale === 'en' ? 'Sat' : 'T7'}</div>
                  <div className="py-0.5 text-xs font-bold text-terracotta bg-terracotta/10 rounded-md">{locale === 'en' ? 'Sun' : 'CN'}</div>
                </div>

                {/* BẢNG CÁC Ô NGÀY (Rõ nét, phân biệt rõ Đã kín vs Còn trống) */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                  {calendarDays.map((item, idx) => {
                    if (item.empty) {
                      return <div key={item.id} className="h-[46px] sm:h-[50px] rounded-xl bg-transparent" />;
                    }

                    const dateStr = item.dateString!;
                    const isCheckIn = checkInDate !== null && dateStr === checkInDate;
                    const isCheckOut = checkOutDate !== null && dateStr === checkOutDate;
                    const isInRange =
                      checkInDate !== null &&
                      checkOutDate !== null &&
                      new Date(dateStr) > new Date(checkInDate) &&
                      new Date(dateStr) < new Date(checkOutDate);

                    // 1. Ngày đã kín phòng (Booked)
                    if (item.isBooked) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled
                          className="relative h-[46px] sm:h-[50px] rounded-xl p-0.5 sm:p-1 flex flex-col items-center justify-between transition-all select-none bg-soft-sand/60 text-stone-400 border border-stilt-timber/20 cursor-not-allowed opacity-85"
                          title={locale === 'en' ? 'Already booked' : 'Đã kín phòng'}
                        >
                          <span className="text-xs sm:text-sm font-bold text-stone-400 mt-0.5">
                            {item.dayNumber}
                          </span>
                          <span className="h-3.5 sm:h-4 px-1.5 text-[8.5px] sm:text-[9.5px] font-bold uppercase rounded bg-stone-200/90 text-stone-500 leading-none inline-flex items-center justify-center tracking-wide">
                            {locale === 'en' ? 'Booked' : 'KÍN'}
                          </span>
                        </button>
                      );
                    }

                    // 2. Ngày nhận phòng (Check-In)
                    if (isCheckIn) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDateClick(dateStr, false)}
                          className="relative h-[46px] sm:h-[50px] rounded-xl p-0.5 sm:p-1 flex flex-col items-center justify-between transition-all select-none bg-terracotta text-white font-bold ring-2 ring-terracotta/60 shadow-md scale-102 cursor-pointer z-10"
                        >
                          <span className="text-xs sm:text-sm font-black leading-none mt-0.5 text-white">
                            {item.dayNumber}
                          </span>
                          <span className="h-3.5 sm:h-4 px-1.5 text-[8px] sm:text-[9px] font-black uppercase text-terracotta bg-white rounded leading-none inline-flex items-center justify-center shadow-xs">
                            {locale === 'en' ? 'In 14h' : 'Nhận 14h'}
                          </span>
                        </button>
                      );
                    }

                    // 3. Ngày trả phòng (Check-Out)
                    if (isCheckOut) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDateClick(dateStr, false)}
                          className="relative h-[46px] sm:h-[50px] rounded-xl p-0.5 sm:p-1 flex flex-col items-center justify-between transition-all select-none bg-espresso text-white font-bold ring-2 ring-espresso/60 shadow-md scale-102 cursor-pointer z-10"
                        >
                          <span className="text-xs sm:text-sm font-black leading-none mt-0.5 text-white">
                            {item.dayNumber}
                          </span>
                          <span className="h-3.5 sm:h-4 px-1.5 text-[8px] sm:text-[9px] font-black uppercase text-espresso bg-white rounded leading-none inline-flex items-center justify-center shadow-xs">
                            {locale === 'en' ? 'Out 12h' : 'Trả 12h'}
                          </span>
                        </button>
                      );
                    }

                    // 4. Trong khoảng lưu trú (In Range)
                    if (isInRange) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDateClick(dateStr, false)}
                          className="relative h-[46px] sm:h-[50px] rounded-xl p-0.5 sm:p-1 flex flex-col items-center justify-between transition-all select-none bg-terracotta/15 text-espresso border-y-2 border-terracotta/40 hover:bg-terracotta/25 cursor-pointer"
                        >
                          <span className="text-xs sm:text-sm font-bold text-terracotta mt-0.5">
                            {item.dayNumber}
                          </span>
                          <span className="h-3.5 sm:h-4 px-1 text-[8.5px] sm:text-[9.5px] font-bold text-terracotta leading-none inline-flex items-center justify-center">
                            {priceFormattedK}
                          </span>
                        </button>
                      );
                    }

                    // 5. Ngày còn trống bình thường (Available - Viền xanh ngọc & Chữ đen đậm & Badge giá xanh)
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleDateClick(dateStr, false)}
                        className="relative h-[46px] sm:h-[50px] rounded-xl p-0.5 sm:p-1 flex flex-col items-center justify-between transition-all select-none bg-white text-espresso border-2 border-emerald-400/60 hover:border-emerald-600 hover:bg-emerald-50/50 shadow-2xs hover:shadow-sm cursor-pointer active:scale-95 group"
                      >
                        <span className="text-xs sm:text-sm font-bold text-espresso group-hover:text-emerald-900 mt-0.5">
                          {item.dayNumber}
                        </span>
                        <span className="h-3.5 sm:h-4 px-1.5 text-[8.5px] sm:text-[9.5px] font-bold text-emerald-800 bg-emerald-100/90 group-hover:bg-emerald-200/90 rounded border border-emerald-300/80 leading-none inline-flex items-center justify-center">
                          {priceFormattedK}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Thanh hướng dẫn thao tác chọn ngày */}
                <div className="mt-2.5 py-2 px-3 rounded-lg bg-soft-sand/60 border border-stilt-timber/15 flex items-center justify-between text-xs animate-fade-in">
                  {!checkInDate ? (
                    <div className="flex items-center gap-2 text-espresso font-semibold w-full justify-center py-0.5">
                      <span className="text-sm">👉</span>
                      <span className="text-xs">
                        {locale === 'en'
                          ? 'Tap any available date to choose your '
                          : 'Bấm vào ngày bạn muốn '}
                        <strong className="text-terracotta font-bold">
                          {locale === 'en' ? 'Check-in (14:00)' : 'Nhận phòng (14:00)'}
                        </strong>
                      </span>
                    </div>
                  ) : !checkOutDate ? (
                    <div className="flex items-center justify-between w-full gap-2">
                      <div className="flex items-center gap-1.5 text-espresso">
                        <span className="text-sm">👉</span>
                        <div className="text-[11px] sm:text-xs">
                          <span>{locale === 'en' ? 'Picked ' : 'Đã chọn '}</span>
                          <strong className="text-terracotta font-bold">{formatDateDisplay(checkInDate)} (14h)</strong>
                          <span className="text-espresso/60"> → {locale === 'en' ? 'pick Check-out' : 'chọn ngày Trả phòng (12h)'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={handleQuickOneNight}
                          className="h-7.5 px-2.5 sm:px-3 rounded-lg bg-terracotta hover:bg-terracotta/90 text-white font-bold text-xs shadow-xs active:scale-95 inline-flex items-center justify-center gap-1 cursor-pointer transition-colors leading-none"
                        >
                          <Zap className="w-3 h-3 fill-current" />
                          <span>+1 {locale === 'en' ? 'Night' : 'Đêm'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleClearDates}
                          className="w-7.5 h-7.5 inline-flex items-center justify-center rounded-lg text-espresso/70 hover:text-espresso hover:bg-stone-200/70 border border-stilt-timber/25 active:scale-95 transition-all cursor-pointer"
                          title={locale === 'en' ? 'Reset dates' : 'Chọn lại ngày'}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full gap-2">
                      <div className="flex items-center gap-1.5 text-espresso flex-wrap">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-semibold">
                          {locale === 'en' ? 'Selected: ' : 'Lưu trú: '}
                          <strong className="text-terracotta font-bold">{formatDateDisplay(checkInDate)} → {formatDateDisplay(checkOutDate)}</strong>
                          <span className="text-espresso/70 font-normal"> ({numberOfNights} {locale === 'en' ? 'night(s)' : 'đêm'})</span>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleClearDates}
                        className="h-7 px-2.5 rounded-lg bg-white hover:bg-soft-sand text-espresso/80 text-xs font-medium border border-stilt-timber/25 active:scale-95 inline-flex items-center justify-center gap-1 cursor-pointer transition-colors shrink-0 leading-none"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{locale === 'en' ? 'Reset' : 'Chọn lại'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Hàng tóm tắt 2 cột: Nhận phòng & Trả phòng */}
                <div className="mt-2.5 pt-2.5 border-t border-stilt-timber/15 text-xs">
                  <div className="grid grid-cols-2 gap-3 text-espresso">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-espresso/70 font-semibold shrink-0">
                        {locale === 'en' ? 'Check-in (14h): ' : 'Nhận phòng (14h): '}
                      </span>
                      {checkInDate ? (
                        <strong className="text-terracotta font-bold truncate">{formatFullDate(checkInDate)}</strong>
                      ) : (
                        <span className="text-stilt-timber italic truncate">{locale === 'en' ? 'Not selected' : 'Chưa chọn'}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-end gap-1.5 min-w-0 text-right">
                      <span className="text-espresso/70 font-semibold shrink-0">
                        {locale === 'en' ? 'Check-out (12h): ' : 'Trả phòng (12h): '}
                      </span>
                      {checkOutDate ? (
                        <strong className="text-terracotta font-bold truncate">{formatFullDate(checkOutDate)}</strong>
                      ) : checkInDate ? (
                        <span className="text-terracotta italic truncate">{locale === 'en' ? 'Click check-out date' : 'Bấm chọn ngày trả'}</span>
                      ) : (
                        <span className="text-espresso/40">---</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Album ảnh thực tế & Chi tiết phòng (Liền mạch trực tiếp trên nền modal, không lồng card) */}
              <div className="space-y-2 pt-1">
                <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-espresso/10 border border-stilt-timber/15">
                  <Image
                    src={gallery[currentImageIndex] || activeRoom.image}
                    alt={activeRoom.name}
                    fill
                    sizes="(max-width: 672px) 100vw, 672px"
                    className="object-cover"
                  />

                  {/* Prev / Next Arrows */}
                  {gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prevImage}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 cursor-pointer z-10"
                        aria-label={locale === 'en' ? 'Previous image' : 'Ảnh trước'}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={nextImage}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 cursor-pointer z-10"
                        aria-label={locale === 'en' ? 'Next image' : 'Ảnh sau'}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 bg-terracotta text-white text-xs font-semibold rounded-full shadow-sm">
                      {activeRoom.category}
                    </span>
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-xs text-white text-xs font-medium rounded-full">
                      {activeRoom.capacity}
                    </span>
                  </div>

                  {/* VR 360 link if available */}
                  {activeRoom.vr360Url && (
                    <a
                      href={activeRoom.vr360Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-espresso text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                      <span>{locale === 'en' ? 'VR 360° Tour' : 'Xem VR 360°'}</span>
                    </a>
                  )}
                </div>

                {/* Thumbnails strip */}
                {gallery.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {gallery.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${idx === currentImageIndex
                          ? 'border-terracotta scale-102 shadow-xs'
                          : 'border-stilt-timber/20 opacity-70 hover:opacity-100'
                          }`}
                      >
                        <Image
                          src={img}
                          alt="thumbnail"
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Quy định nhận & trả phòng (Không card lồng card) */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-soft-sand/40 border border-stilt-timber/15 text-xs text-espresso/70 space-y-1">
                <div className="flex items-center gap-1.5 text-espresso font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4 text-bamboo-shoot" />
                  <span>{locale === 'en' ? 'Check-in & Check-out Policies:' : 'Quy định nhận & trả phòng:'}</span>
                </div>
                <p>{locale === 'en' ? '• Check-in from 14:00 - Check-out before 12:00 next day.' : '• Nhận phòng từ 14:00 - Trả phòng trước 12:00 trưa hôm sau.'}</p>
                <p>{locale === 'en' ? '• Real-time availability and rates synchronized with front desk.' : '• Lịch trống và giá được đồng bộ theo thời gian thực từ lễ tân Mơ Village.'}</p>
              </div>
            </div>
          )}

          {/* STEP 3: Customer Booking Form (Trực tiếp trên nền modal, không lồng card) */}
          {currentStep === 'form' && activeRoom && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-stilt-timber/15 pb-2.5">
                <h3 className="text-base sm:text-lg font-bold text-espresso font-display">
                  {locale === 'en' ? 'Guest Information' : 'Thông tin người đặt phòng'}
                </h3>
                <p className="text-xs text-espresso/70 mt-0.5">
                  {locale === 'en' ? 'Please provide your details so Mơ Village can prepare for your stay.' : 'Vui lòng điền thông tin để Mơ Village chuẩn bị đón tiếp bạn chu đáo nhất.'}
                </p>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-red-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-espresso mb-1">
                    {locale === 'en' ? 'Your Full Name *' : 'Họ và tên của bạn *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (formError) setFormError(null);
                    }}
                    placeholder={locale === 'en' ? 'E.g., David Miller' : 'Ví dụ: Nguyễn Văn An'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stilt-timber/25 text-xs text-espresso focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-espresso mb-1">
                    {locale === 'en' ? 'Phone / WhatsApp / Zalo *' : 'Số điện thoại / Zalo nhận xác nhận *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (formError) setFormError(null);
                    }}
                    placeholder={locale === 'en' ? 'E.g., +84 987 654 321' : 'Ví dụ: 0987 654 321'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stilt-timber/25 text-xs text-espresso focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all shadow-2xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-espresso mb-1">
                      {locale === 'en' ? 'Adults' : 'Người lớn'}
                    </label>
                    <select
                      value={formData.adults}
                      onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stilt-timber/25 text-xs text-espresso focus:border-terracotta outline-none cursor-pointer shadow-2xs"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {locale === 'en' ? `${num} adult${num > 1 ? 's' : ''}` : `${num} người lớn`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-espresso mb-1">
                      {locale === 'en' ? 'Children (<12y)' : 'Trẻ em (<12t)'}
                    </label>
                    <select
                      value={formData.children}
                      onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stilt-timber/25 text-xs text-espresso focus:border-terracotta outline-none cursor-pointer shadow-2xs"
                    >
                      {[0, 1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {locale === 'en' ? `${num} child${num !== 1 ? 'ren' : ''}` : `${num} trẻ em`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-espresso mb-1">
                    {locale === 'en' ? 'Special Requests (dietary, transfer, BBQ...)' : 'Ghi chú thêm (ăn uống, xe đưa đón, BBQ...)'}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder={locale === 'en' ? 'E.g., Shuttle transfer needed, birthday celebration, lakeside dining...' : 'Ví dụ: Cần xe Limousine đón từ Hà Nội, tổ chức sinh nhật, ăn tối bên hồ...'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stilt-timber/25 text-xs text-espresso focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none resize-none shadow-2xs"
                  />
                </div>

                {/* BẢNG TÓM TẮT THÔNG TIN ĐẶT PHÒNG & CHI PHÍ */}
                <div className="pt-3.5 border-t border-stilt-timber/15 space-y-2 text-xs text-espresso">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-espresso/70 font-medium">{locale === 'en' ? 'Room Category:' : 'Hạng phòng:'}</span>
                    <span className="font-bold text-terracotta">{activeRoom.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-espresso/70 font-medium">{locale === 'en' ? 'Duration of stay:' : 'Thời gian nghỉ:'}</span>
                    <span className="font-medium">
                      {numberOfNights} {locale === 'en' ? 'night(s)' : 'đêm'} ({formatDateDisplay(checkInDate)} - {formatDateDisplay(checkOutDate)})
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-sm text-terracotta pt-2 border-t border-stilt-timber/15">
                    <span>{locale === 'en' ? 'Estimated Total:' : 'Tổng tiền tạm tính:'}</span>
                    <span className="text-base">{totalPriceNumber.toLocaleString('vi-VN')} đ</span>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: Success Confirmation */}
          {currentStep === 'success' && activeRoom && (
            <div className="max-w-md mx-auto space-y-3 animate-scale-up text-stone-900 pb-2">
              {/* Header */}
              <div className="text-center mb-1 shrink-0">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-1.5 shadow-inner">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-stone-900 text-base sm:text-lg tracking-tight">
                  {locale === 'en' ? 'Reservation Confirmation' : 'Xác Nhận Đặt Phòng'}
                </h3>
                <p className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 inline" /> {PAYMENT_CONFIG.resortName}
                </p>
              </div>

              {/* 1. BẢNG PHIẾU ĐẶT PHÒNG (Đồng nhất kích cỡ các dòng, phẳng liền mạch) */}
              <div className="bg-stone-50/90 rounded-2xl p-4 sm:p-5 border border-stone-200 text-xs space-y-2.5">
                <div className="text-center pb-2.5 border-b border-dashed border-stone-300">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    {locale === 'en' ? 'RESERVATION RECEIPT' : 'PHIẾU ĐẶT PHÒNG'}
                  </span>
                  <div className="font-mono font-bold text-stone-800 text-sm mt-0.5">
                    {bookingCode || '#MV-0810-251'}
                  </div>
                </div>

                <div className="divide-y divide-stone-200/60 pt-0.5">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone-500">{locale === 'en' ? 'Guest:' : 'Khách hàng:'}</span>
                    <strong className="text-stone-900 font-semibold">{formData.fullName || (locale === 'en' ? 'Valued guest' : 'Quý khách')}</strong>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone-500">{locale === 'en' ? 'Phone:' : 'Số điện thoại:'}</span>
                    <strong className="text-stone-900 font-semibold">{formData.phone}</strong>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone-500">{locale === 'en' ? 'Room:' : 'Căn phòng:'}</span>
                    <strong className="text-emerald-800 font-bold text-right max-w-[200px] truncate">{activeRoom.name}</strong>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone-500">{locale === 'en' ? 'Check-in:' : 'Nhận phòng:'}</span>
                    <strong className="text-stone-800">{formatFullDate(checkInDate, 10)} lúc 14h</strong>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone-500">{locale === 'en' ? 'Check-out:' : 'Trả phòng:'}</span>
                    <strong className="text-stone-800">
                      {formatFullDate(checkOutDate, 11)} lúc 12h ({numberOfNights || 1} {locale === 'en' ? 'night(s)' : 'đêm'})
                    </strong>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone-500">{locale === 'en' ? 'Guests:' : 'Số khách phòng:'}</span>
                    <strong className="text-stone-800">
                      {formData.adults} {locale === 'en' ? 'adult(s)' : 'người'}{parseInt(formData.children) > 0 ? `, ${formData.children} ${locale === 'en' ? 'children' : 'trẻ em'}` : ''} ({locale === 'en' ? 'Standard ' : 'Chuẩn '}{activeRoom.capacity || '2 người'})
                    </strong>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone-600 font-medium">{locale === 'en' ? 'Room charge:' : 'Tiền phòng thanh toán:'}</span>
                    <strong className="text-stone-900 font-bold">{totalPriceNumber.toLocaleString('vi-VN')} đ</strong>
                  </div>
                </div>

                {/* Tổng tiền & Cọc 50% - Thiết kế phẳng, không lồng card */}
                <div className="pt-2.5 border-t border-dashed border-stone-300 space-y-2">
                  <div className="flex justify-between items-center py-1">
                    <span className="font-extrabold text-stone-700">{locale === 'en' ? 'Total bill:' : 'Tổng bill thanh toán:'}</span>
                    <span className="text-base font-black text-stone-900">{totalPriceNumber.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 px-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="font-bold text-emerald-900 text-xs">{locale === 'en' ? 'Deposit (50%):' : 'Số tiền cọc trước (50%):'}</span>
                    <span className="text-base font-extrabold text-emerald-700">{depositAmount.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  <p className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                    📌 <strong>{locale === 'en' ? 'Note:' : 'Ghi chú:'}</strong> {locale === 'en' ? 'Guest transfers 50% deposit then taps "Send bill via Zalo" to confirm reservation & transport.' : 'Khách hàng chuyển khoản cọc 50% sau đó bấm nút gửi bill qua Zalo để Home xác nhận giữ phòng và xe.'}
                  </p>
                </div>
              </div>

              {/* 2. BẢNG THÔNG TIN TÀI KHOẢN NHẬN CỌC (Đồng nhất kích cỡ các dòng, không lồng card) */}
              <div className="rounded-2xl border border-amber-300/80 bg-amber-50/50 p-4 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{locale === 'en' ? 'Official Deposit Account' : 'Tài khoản cọc chính chủ duy nhất'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowQr(!showQr)}
                    className="h-7 px-2.5 text-xs text-amber-800 font-semibold inline-flex items-center gap-1 underline cursor-pointer leading-none"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{showQr ? (locale === 'en' ? 'Hide QR' : 'Ẩn QR') : (locale === 'en' ? 'Show QR' : 'Hiện QR')}</span>
                  </button>
                </div>

                {/* Bảng thông số tài khoản ngân hàng */}
                <div className="divide-y divide-amber-200/60 pt-1">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone-500">{locale === 'en' ? 'Bank:' : 'Ngân hàng:'}</span>
                    <strong className="text-stone-800">{PAYMENT_CONFIG.bankName}</strong>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone-500">{locale === 'en' ? 'Account No:' : 'Số tài khoản:'}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-700 text-sm tracking-wide">{PAYMENT_CONFIG.accountDisplay}</span>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="h-7 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-700 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center leading-none"
                      >
                        {copiedAccount ? (locale === 'en' ? 'Copied' : 'Đã chép') : (locale === 'en' ? 'Copy' : 'Chép')}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone-500">{locale === 'en' ? 'Account Holder:' : 'Chủ tài khoản:'}</span>
                    <strong className="text-stone-900 uppercase font-bold">{PAYMENT_CONFIG.accountName}</strong>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone-500">{locale === 'en' ? 'Deposit (50%):' : 'Số tiền cọc 50%:'}</span>
                    <strong className="text-emerald-700 font-bold text-sm">{depositAmount.toLocaleString('vi-VN')} VNĐ</strong>
                  </div>
                </div>

                {showQr && (
                  <div className="flex flex-col items-center justify-center pt-2 animate-fade-in">
                    <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-xs max-w-[180px]">
                      <img
                        alt={`VietQR ${PAYMENT_CONFIG.bankCode} ${PAYMENT_CONFIG.accountName}`}
                        className="w-full h-auto object-contain rounded-lg"
                        src={`https://img.vietqr.io/image/${PAYMENT_CONFIG.bankCode}-${PAYMENT_CONFIG.accountNumber}-compact2.png?amount=${depositAmount}&addInfo=${encodeURIComponent(`${bookingCode || '#MV'} ${(formData.phone || '').replace(/\s+/g, '')}`)}&accountName=${encodeURIComponent(PAYMENT_CONFIG.accountName)}`}
                      />
                    </div>
                    <span className="text-xs text-stone-500 mt-1.5 font-medium">
                      {locale === 'en' ? 'Open Banking app & scan QR to pay' : 'Mở app Ngân hàng quét QR thanh toán nhanh'}
                    </span>
                  </div>
                )}
              </div>

              {/* 3. Notification Badge */}
              <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-center gap-2 text-center">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{locale === 'en' ? 'Booking receipt details copied to clipboard!' : 'Đã tự động sao chép toàn bộ bill này!'}</span>
              </div>

              {/* 4. Zalo Button */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={handleOpenZalo}
                  className="w-full h-12 px-6 rounded-lg bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold text-sm shadow-md active:scale-98 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer leading-none"
                >
                  <span className="text-base">📲</span>
                  <span>{locale === 'en' ? 'Request Sent & Open Zalo' : 'Đã Gửi Đơn & Mở Lại Zalo'}</span>
                </button>
                <p className="text-[11px] text-emerald-700 font-bold text-center">
                  {locale === 'en' ? '✓ Synced booking info with front desk system!' : '✓ Đã đồng bộ thông tin đơn về Google Sheet lễ tân!'}
                </p>
              </div>

              {/* 5. Copy Bill & Call Hotline Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyBill}
                  className="h-10 px-4 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer leading-none"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedBill ? (locale === 'en' ? 'Copied!' : 'Đã sao chép!') : (locale === 'en' ? 'Copy Bill' : 'Sao chép bill')}</span>
                </button>
                <a
                  href={`tel:${PAYMENT_CONFIG.hotlineTel}`}
                  className="h-10 px-4 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium inline-flex items-center justify-center gap-2 transition-colors leading-none"
                >
                  <Phone className="w-4 h-4" />
                  <span>{locale === 'en' ? 'Call Hotline' : 'Gọi Hotline'}</span>
                </a>
              </div>

              {/* 6. Social Links */}
              <div className="pt-2 border-t border-stone-200/70 flex items-center justify-center gap-3 text-[11px]">
                <a
                  href={PAYMENT_CONFIG.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Fanpage Facebook
                </a>
                <span className="text-stone-300">•</span>
                <a
                  href={`tel:${PAYMENT_CONFIG.hotlineTel}`}
                  className="text-stone-800 hover:underline font-semibold"
                >
                  Hotline: {PAYMENT_CONFIG.hotline}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 3. STICKY BOTTOM ACTION BAR */}
        {activeRoom && currentStep !== 'room_list' && currentStep !== 'success' && (
          <div className="shrink-0 bg-warm-paper border-t border-stilt-timber/20 z-30 shadow-lg">
            <div className="px-6 sm:px-8 py-4 flex items-center justify-between gap-4">
              <div>
                {checkInDate ? (
                  <>
                    <span className="text-[10px] text-espresso/70 block font-medium">
                      {checkOutDate ? `${numberOfNights} ${locale === 'en' ? 'night(s)' : 'đêm'} (${formatDateDisplay(checkInDate)} - ${formatDateDisplay(checkOutDate)})` : `${locale === 'en' ? 'Check-in ' : 'Nhận '}${formatDateDisplay(checkInDate)} (${locale === 'en' ? 'Select check-out' : 'Chưa chọn ngày trả'})`}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base sm:text-lg font-bold text-terracotta font-display">
                        {totalPriceNumber.toLocaleString('vi-VN')} đ
                      </span>
                      <span className="text-[11px] text-espresso/60 font-normal">{locale === 'en' ? 'total' : 'tổng tiền'}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] text-espresso/60 block font-medium">
                      {locale === 'en' ? 'No dates selected' : 'Chưa chọn ngày'}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base sm:text-lg font-bold text-terracotta font-display">
                        {activeRoom.pricePerNight || '1.950.000 đ'}
                      </span>
                      <span className="text-[11px] text-espresso/60 font-normal">{locale === 'en' ? '/ night' : '/ đêm'}</span>
                    </div>
                  </>
                )}
              </div>

              {currentStep === 'details' ? (
                <button
                  type="button"
                  disabled={!checkInDate}
                  onClick={() => {
                    if (!checkInDate) return;
                    if (!checkOutDate) {
                      // If check-out is not yet selected, auto select next day
                      const nextDay = new Date(checkInDate);
                      nextDay.setDate(nextDay.getDate() + 1);
                      setCheckOutDate(nextDay.toISOString().split('T')[0]);
                    }
                    setCurrentStep('form');
                  }}
                  className={`h-11 sm:h-12 px-6 sm:px-7 rounded-lg font-medium text-xs sm:text-sm transition-colors inline-flex items-center justify-center gap-2 min-w-[190px] sm:min-w-[220px] w-auto leading-none ${checkInDate
                    ? 'bg-terracotta hover:bg-terracotta/90 text-warm-paper shadow-xs cursor-pointer'
                    : 'bg-stilt-timber/15 text-espresso/40 cursor-not-allowed'
                    }`}
                >
                  <span>{checkInDate ? (locale === 'en' ? 'Continue Booking' : 'Tiếp Tục Đặt Phòng') : (locale === 'en' ? 'Select dates on calendar' : 'Chọn ngày trên lịch')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleFormSubmit()}
                  disabled={isSubmitting}
                  className="h-11 sm:h-12 px-6 sm:px-7 rounded-lg bg-terracotta hover:bg-terracotta/90 text-warm-paper font-medium text-xs sm:text-sm shadow-xs transition-colors inline-flex items-center justify-center gap-2 cursor-pointer leading-none min-w-[190px] sm:min-w-[220px] w-auto"
                >
                  {isSubmitting ? (
                    <span>{locale === 'en' ? 'Submitting...' : 'Đang gửi thông tin...'}</span>
                  ) : (
                    <>
                      <span>{locale === 'en' ? 'Confirm Reservation' : 'Xác Nhận Đặt Phòng'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Signature Mơ Village Accent Bar */}
            <div className="h-1 bg-gradient-to-r from-bamboo-shoot via-terracotta to-bamboo-shoot opacity-80" />
          </div>
        )}
      </div>
    </div>
  );
}
