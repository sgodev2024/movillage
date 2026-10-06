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
  Phone
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedOption?: string;
}

export function BookingModal({ isOpen, onClose, preselectedOption }: BookingModalProps) {
  const { locale } = useLanguage();
  const rooms: RoomItem[] = siteContent[locale]?.rooms?.items || siteContent.vi.rooms.items;

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

  // Sync preselected option when opened
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
        setSelectedRoomId(null);
        setCurrentStep('room_list');
      }
    } else {
      setSelectedRoomId(null);
      setCurrentStep('room_list');
    }

    // Reset date selection to unselected state on every modal open
    setCheckInDate(null);
    setCheckOutDate(null);
    setCurrentImageIndex(0);
    setFormError(null);
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

  // Format date helper: '2026-10-19' -> '19/10'
  const formatDateDisplay = (dateStr: string | null) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}`;
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

  // Form Submit Handler
  const handleFormSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.fullName.trim()) {
      setFormError('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 9) {
      setFormError('Vui lòng nhập số điện thoại hoặc Zalo hợp lệ.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('success');
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-espresso/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[680px] max-h-[92vh] bg-warm-paper rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stilt-timber/25 text-espresso animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. TOP STICKY HEADER */}
        <div className="shrink-0 bg-warm-paper/95 backdrop-blur-md border-b border-stilt-timber/15 px-5 py-3.5 flex items-center justify-between z-30">
          {currentStep === 'room_list' ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-espresso font-display">
                Chọn hạng phòng nghỉ
              </span>
            </div>
          ) : currentStep === 'details' ? (
            <button
              type="button"
              onClick={() => {
                setSelectedRoomId(null);
                setCurrentStep('room_list');
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-espresso hover:text-terracotta active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-terracotta" />
              <span>Đổi hạng phòng</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentStep('details')}
              className="flex items-center gap-1.5 text-xs font-semibold text-espresso hover:text-terracotta active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-terracotta" />
              <span>Quay lại chọn ngày</span>
            </button>
          )}

          {/* Stepper Dots & Active Room Indicator */}
          <div className="flex items-center gap-3">
            {activeRoom && currentStep !== 'room_list' && (
              <span className="text-xs font-bold text-espresso bg-soft-sand px-2.5 py-1 rounded-full truncate max-w-[140px] sm:max-w-[200px]">
                {activeRoom.name}
              </span>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-soft-sand hover:bg-stilt-timber/20 text-espresso flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. SCROLLABLE CONTENT BODY */}
        <div ref={contentScrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5">
          
          {/* STEP 1: Visual Room Selection List */}
          {currentStep === 'room_list' && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center px-2 pt-1 pb-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-terracotta block mb-1">
                  MƠ VILLAGE RESORT
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-espresso font-display">
                  Chọn phòng nghỉ tại Mơ
                </h3>
                <p className="text-xs text-espresso/70 mt-1 max-w-md mx-auto">
                  Chọn hạng phòng để xem lịch trống thực tế, ảnh không gian và bảng giá chi tiết
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {roomCategories.map((cat: string) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setRoomFilterCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      roomFilterCategory === cat
                        ? 'bg-terracotta text-warm-paper shadow-xs scale-102'
                        : 'bg-white border border-stilt-timber/20 text-espresso/80 hover:bg-soft-sand'
                    }`}
                  >
                    {cat === 'all' ? 'Tất cả phòng' : cat}
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
                    className="bg-white rounded-2xl p-3 sm:p-3.5 border border-stilt-timber/20 hover:border-terracotta/50 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-3.5 sm:gap-4 items-center group"
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
                            Mã: {rm.code}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-espresso font-display truncate group-hover:text-terracotta transition-colors">
                        {rm.name}
                      </h4>
                      <p className="text-xs text-espresso/70 truncate mb-2">
                        {rm.tagline}
                      </p>
                      
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-terracotta">
                          {rm.pricePerNight || 'Liên hệ'}
                        </span>
                        <span className="text-[11px] font-semibold text-espresso/80 bg-soft-sand px-2.5 py-1 rounded-lg group-hover:bg-terracotta group-hover:text-white transition-all flex items-center gap-1">
                          <span>Xem lịch</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Selected Room Calendar & Details */}
          {currentStep === 'details' && activeRoom && (
            <div className="space-y-5 animate-fade-in">
              {/* Room Hero Media Card */}
              <div className="bg-white rounded-2xl overflow-hidden border border-stilt-timber/20 shadow-xs">
                <div className="relative aspect-[16/9] overflow-hidden bg-espresso/10">
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
                        aria-label="Ảnh trước"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={nextImage}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 cursor-pointer z-10"
                        aria-label="Ảnh sau"
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
                      <span>Xem VR 360°</span>
                    </a>
                  )}
                </div>

                {/* Thumbnails strip */}
                {gallery.length > 1 && (
                  <div className="flex gap-2 p-2.5 overflow-x-auto scrollbar-none bg-[#ece4db] border-t border-stilt-timber/10">
                    {gallery.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-14 h-10 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          idx === currentImageIndex
                            ? 'border-terracotta scale-105 opacity-100 shadow-sm'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={img}
                          alt="thumbnail"
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Room Info Header */}
                <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-espresso font-display">
                      {activeRoom.name}
                    </h3>
                    <p className="text-xs text-espresso/75 mt-0.5">
                      {activeRoom.tagline}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-espresso/60 block font-medium">Giá tiêu chuẩn</span>
                    <span className="text-lg sm:text-xl font-bold text-terracotta">
                      {activeRoom.pricePerNight || 'Liên hệ'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Booking Calendar */}
              <div id="booking-calendar" className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-stilt-timber/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-terracotta" />
                    <h3 className="font-bold text-espresso text-sm sm:text-base font-display">
                      Lịch trống Tháng {currentMonth + 1}/{currentYear}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded-lg border border-stilt-timber/20 hover:bg-soft-sand text-espresso active:scale-95 transition-all cursor-pointer"
                      aria-label="Tháng trước"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1.5 rounded-lg border border-stilt-timber/20 hover:bg-soft-sand text-espresso active:scale-95 transition-all cursor-pointer"
                      aria-label="Tháng sau"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Status Legend */}
                <div className="flex items-center gap-4 py-2 px-3 rounded-xl bg-soft-sand/50 text-[11px] font-medium text-espresso/80 mb-3.5 overflow-x-auto scrollbar-none">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-3 h-3 rounded-md bg-bamboo-shoot inline-block"></span>
                    <span>Còn trống</span>
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-3 h-3 rounded-md bg-stone-300 inline-block"></span>
                    <span>Đã kín phòng</span>
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-3 h-3 rounded-md bg-terracotta inline-block"></span>
                    <span>Đang chọn</span>
                  </div>
                </div>

                {/* Days of week */}
                <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[11px] font-bold text-espresso/60">
                  <div>T2</div>
                  <div>T3</div>
                  <div>T4</div>
                  <div>T5</div>
                  <div>T6</div>
                  <div className="text-terracotta">T7</div>
                  <div className="text-terracotta">CN</div>
                </div>

                {/* Date grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((item, idx) => {
                    if (item.empty) {
                      return <div key={item.id} className="aspect-square rounded-xl bg-transparent" />;
                    }

                    const dateStr = item.dateString!;
                    const isCheckIn = checkInDate !== null && dateStr === checkInDate;
                    const isCheckOut = checkOutDate !== null && dateStr === checkOutDate;
                    const isInRange =
                      checkInDate !== null &&
                      checkOutDate !== null &&
                      new Date(dateStr) > new Date(checkInDate) &&
                      new Date(dateStr) < new Date(checkOutDate);

                    if (item.isBooked) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled
                          className="relative aspect-square rounded-xl p-1 flex flex-col items-center justify-between transition-all select-none bg-stone-100 text-stone-400 border border-stone-200/60 cursor-not-allowed"
                        >
                          <span className="text-xs font-semibold leading-none mt-0.5">{item.dayNumber}</span>
                          <span className="text-[9px] font-bold uppercase leading-none mb-0.5 text-stone-400">
                            Kín
                          </span>
                        </button>
                      );
                    }

                    // Selected Check-In Date
                    if (isCheckIn) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDateClick(dateStr, false)}
                          className="relative aspect-square rounded-xl p-1 flex flex-col items-center justify-between transition-all select-none bg-terracotta text-white font-bold ring-2 ring-terracotta/40 shadow-md scale-102 cursor-pointer z-10"
                        >
                          <span className="text-xs font-bold leading-none mt-0.5">{item.dayNumber}</span>
                          <span className="text-[8px] font-extrabold uppercase text-white bg-black/25 px-1 py-0.5 rounded leading-none">
                            Nhận 14h
                          </span>
                        </button>
                      );
                    }

                    // Selected Check-Out Date
                    if (isCheckOut) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDateClick(dateStr, false)}
                          className="relative aspect-square rounded-xl p-1 flex flex-col items-center justify-between transition-all select-none bg-[#944e3d] text-white font-bold ring-2 ring-terracotta/40 shadow-md scale-102 cursor-pointer z-10"
                        >
                          <span className="text-xs font-bold leading-none mt-0.5">{item.dayNumber}</span>
                          <span className="text-[8px] font-extrabold uppercase text-white bg-black/25 px-1 py-0.5 rounded leading-none">
                            Trả 12h
                          </span>
                        </button>
                      );
                    }

                    // In Range between checkin and checkout
                    if (isInRange) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDateClick(dateStr, false)}
                          className="relative aspect-square rounded-xl p-1 flex flex-col items-center justify-between transition-all select-none bg-terracotta/15 text-espresso border border-terracotta/30 hover:bg-terracotta/25 cursor-pointer"
                        >
                          <span className="text-xs font-bold leading-none mt-0.5">{item.dayNumber}</span>
                          <span className="text-[9px] font-semibold leading-none mb-0.5 text-terracotta">
                            {priceFormattedK}
                          </span>
                        </button>
                      );
                    }

                    // Available Normal Date (Unselected)
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleDateClick(dateStr, false)}
                        className="relative aspect-square rounded-xl p-1 flex flex-col items-center justify-between transition-all select-none bg-[#f4ede4] text-espresso border border-stilt-timber/15 hover:bg-white hover:border-terracotta/40 cursor-pointer active:scale-95"
                      >
                        <span className="text-xs font-semibold leading-none mt-0.5">{item.dayNumber}</span>
                        <span className="text-[9px] font-medium leading-none mb-0.5 text-bamboo-shoot font-semibold">
                          {priceFormattedK}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Date Selection Action / Helper Bar */}
                {checkInDate ? (
                  <div className="mt-3.5 p-3 rounded-xl bg-soft-sand/70 border border-stilt-timber/20 flex items-center justify-between text-xs animate-fade-in">
                    <span className="text-espresso text-[11px] sm:text-xs">
                      {checkOutDate ? (
                        <>Đã chọn: <strong className="text-terracotta">{formatDateDisplay(checkInDate)}</strong> - <strong className="text-terracotta">{formatDateDisplay(checkOutDate)}</strong> ({numberOfNights} đêm)</>
                      ) : (
                        <>Đã chọn nhận phòng: <strong className="text-terracotta">{formatDateDisplay(checkInDate)}</strong></>
                      )}
                    </span>
                    <div className="flex items-center gap-2">
                      {!checkOutDate && (
                        <button
                          type="button"
                          onClick={handleQuickOneNight}
                          className="px-2.5 py-1.5 rounded-lg bg-terracotta hover:bg-[#a15f4d] text-white font-semibold text-[11px] shadow-xs active:scale-95 flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <Zap className="w-3 h-3 fill-current" />
                          <span>Thuê 1 đêm</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleClearDates}
                        className="p-1.5 rounded-lg text-espresso/60 hover:text-espresso hover:bg-soft-sand active:scale-95 transition-all cursor-pointer"
                        title="Chọn lại ngày"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3.5 p-3 rounded-xl bg-soft-sand/40 border border-stilt-timber/15 text-center text-xs text-espresso/70">
                    👉 Bấm vào ngày bạn muốn <strong className="text-terracotta font-semibold">Nhận phòng (14:00)</strong>
                  </div>
                )}

                {/* Check-In / Check-Out Summary Card */}
                <div className="mt-3 p-3 rounded-xl bg-white border border-stilt-timber/15 text-xs">
                  <div className="flex items-center justify-between font-medium text-espresso">
                    <div>
                      <span className="text-espresso/60">Nhận phòng (14h): </span>
                      {checkInDate ? (
                        <strong className="text-terracotta">{formatDateDisplay(checkInDate)}</strong>
                      ) : (
                        <span className="text-stilt-timber italic">Chưa chọn</span>
                      )}
                    </div>
                    <div>
                      <span className="text-espresso/60">Trả phòng (12h): </span>
                      {checkOutDate ? (
                        <strong className="text-terracotta">{formatDateDisplay(checkOutDate)}</strong>
                      ) : checkInDate ? (
                        <span className="text-stilt-timber italic">Bấm chọn ngày trả</span>
                      ) : (
                        <span className="text-espresso/40">---</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Policies Box */}
              <div className="p-4 rounded-2xl bg-white border border-stilt-timber/15 text-xs text-espresso/70 space-y-1">
                <div className="flex items-center gap-1.5 text-espresso font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4 text-bamboo-shoot" />
                  <span>Quy định nhận & trả phòng:</span>
                </div>
                <p>• Nhận phòng từ 14:00 - Trả phòng trước 12:00 trưa hôm sau.</p>
                <p>• Lịch trống và giá được đồng bộ theo thời gian thực từ lễ tân Mơ Village.</p>
              </div>
            </div>
          )}

          {/* STEP 3: Customer Booking Form */}
          {currentStep === 'form' && activeRoom && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs border border-stilt-timber/20">
                <h3 className="text-base sm:text-lg font-bold text-espresso font-display mb-1">
                  Thông tin người đặt phòng
                </h3>
                <p className="text-xs text-espresso/70 mb-5">
                  Vui lòng điền thông tin để Mơ Village chuẩn bị đón tiếp bạn chu đáo nhất.
                </p>

                {formError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-red-700 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-espresso mb-1">
                      Họ và tên của bạn *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (formError) setFormError(null);
                      }}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/40 border border-stilt-timber/20 text-xs text-espresso focus:bg-white focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-espresso mb-1">
                      Số điện thoại / Zalo nhận xác nhận *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (formError) setFormError(null);
                      }}
                      placeholder="Ví dụ: 0987 654 321"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/40 border border-stilt-timber/20 text-xs text-espresso focus:bg-white focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-espresso mb-1">
                        Người lớn
                      </label>
                      <select
                        value={formData.adults}
                        onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/40 border border-stilt-timber/20 text-xs text-espresso focus:bg-white focus:border-terracotta outline-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((num) => (
                          <option key={num} value={num}>
                            {num} người lớn
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-espresso mb-1">
                        Trẻ em (&lt;12t)
                      </label>
                      <select
                        value={formData.children}
                        onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/40 border border-stilt-timber/20 text-xs text-espresso focus:bg-white focus:border-terracotta outline-none cursor-pointer"
                      >
                        {[0, 1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} trẻ em
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-espresso mb-1">
                      Ghi chú thêm (ăn uống, xe đưa đón, BBQ...)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      placeholder="Ví dụ: Cần xe Limousine đón từ Hà Nội, tổ chức sinh nhật, ăn tối bên hồ..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/40 border border-stilt-timber/20 text-xs text-espresso focus:bg-white focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none resize-none"
                    />
                  </div>

                  {/* Booking Summary Box */}
                  <div className="p-3.5 rounded-2xl bg-soft-sand/70 border border-stilt-timber/20 space-y-1.5 text-xs text-espresso">
                    <div className="font-bold flex justify-between">
                      <span>Hạng phòng:</span>
                      <span className="text-terracotta">{activeRoom.name}</span>
                    </div>
                    <div className="flex justify-between text-espresso/70">
                      <span>Thời gian nghỉ:</span>
                      <span>
                        {numberOfNights} đêm ({formatDateDisplay(checkInDate)} - {formatDateDisplay(checkOutDate)})
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-terracotta pt-1.5 border-t border-stilt-timber/15">
                      <span>Tổng tiền tạm tính:</span>
                      <span>{totalPriceNumber.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* STEP 4: Success Confirmation */}
          {currentStep === 'success' && activeRoom && (
            <div className="py-8 sm:py-12 text-center space-y-4 animate-scale-up">
              <div className="w-16 h-16 rounded-full bg-bamboo-shoot/20 text-bamboo-shoot flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-espresso font-display">
                Đặt phòng thành công!
              </h3>
              <p className="text-xs sm:text-sm text-espresso/80 leading-relaxed max-w-sm mx-auto">
                Cảm ơn <strong>{formData.fullName || 'quý khách'}</strong> đã lựa chọn Mơ Village. Lễ tân sẽ gọi điện qua SĐT/Zalo <strong>{formData.phone}</strong> trong vòng 15 phút để xác nhận chi tiết.
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stilt-timber/20 text-xs text-left max-w-sm mx-auto space-y-2 shadow-xs">
                <div className="font-bold text-espresso border-b border-stilt-timber/10 pb-2 flex justify-between items-center">
                  <span>Mã đơn đặt: #{Math.floor(100000 + Math.random() * 900000)}</span>
                  <span className="text-[10px] font-medium text-bamboo-shoot bg-bamboo-shoot/15 px-2 py-0.5 rounded-full">
                    Chờ lễ tân gọi
                  </span>
                </div>
                <div className="flex justify-between text-espresso/75">
                  <span>Phòng:</span>
                  <span className="font-semibold text-espresso">{activeRoom.name}</span>
                </div>
                <div className="flex justify-between text-espresso/75">
                  <span>Thời gian:</span>
                  <span className="font-semibold text-espresso">
                    {formatDateDisplay(checkInDate)} - {formatDateDisplay(checkOutDate)} ({numberOfNights} đêm)
                  </span>
                </div>
                <div className="flex justify-between text-espresso/75">
                  <span>Số khách:</span>
                  <span className="font-semibold text-espresso">{formData.adults} người lớn{parseInt(formData.children) > 0 ? `, ${formData.children} trẻ em` : ''}</span>
                </div>
                <div className="flex justify-between text-espresso/85 pt-1.5 border-t border-stilt-timber/10">
                  <span className="font-bold">Tổng chi phí dự kiến:</span>
                  <span className="font-bold text-terracotta text-sm">{totalPriceNumber.toLocaleString('vi-VN')} đ</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center items-center">
                <a
                  href="tel:+84964863838"
                  className="px-5 py-2.5 rounded-xl bg-soft-sand hover:bg-stilt-timber/20 text-espresso text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-terracotta" />
                  <span>Hotline: 0964 863 838</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-espresso hover:bg-espresso/90 text-warm-paper text-xs font-bold transition-all active:scale-95 cursor-pointer"
                >
                  Hoàn tất & Đóng
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. STICKY BOTTOM ACTION BAR */}
        {activeRoom && currentStep !== 'room_list' && currentStep !== 'success' && (
          <div className="shrink-0 bg-warm-paper border-t border-stilt-timber/20 z-30 shadow-lg">
            <div className="px-5 sm:px-6 py-3.5 flex items-center justify-between gap-4">
              <div>
                {checkInDate ? (
                  <>
                    <span className="text-[10px] text-espresso/70 block font-medium">
                      {checkOutDate ? `${numberOfNights} đêm (${formatDateDisplay(checkInDate)} - ${formatDateDisplay(checkOutDate)})` : `Nhận ${formatDateDisplay(checkInDate)} (Chưa chọn ngày trả)`}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base sm:text-lg font-bold text-terracotta font-display">
                        {totalPriceNumber.toLocaleString('vi-VN')} đ
                      </span>
                      <span className="text-[11px] text-espresso/60 font-normal">tổng tiền</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] text-espresso/60 block font-medium">
                      Chưa chọn ngày
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base sm:text-lg font-bold text-terracotta font-display">
                        {activeRoom.pricePerNight || '1.950.000 đ'}
                      </span>
                      <span className="text-[11px] text-espresso/60 font-normal">/ đêm</span>
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
                  className={`flex-1 max-w-[220px] py-3 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    checkInDate
                      ? 'bg-terracotta hover:bg-[#a15f4d] text-warm-paper shadow-md shadow-terracotta/25 active:scale-95 cursor-pointer'
                      : 'bg-stilt-timber/15 text-espresso/40 cursor-not-allowed'
                  }`}
                >
                  <span>{checkInDate ? 'Tiếp Tục Đặt Phòng' : 'Chọn ngày trên lịch'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleFormSubmit()}
                  disabled={isSubmitting}
                  className="flex-1 max-w-[220px] py-3 px-4 rounded-xl bg-terracotta hover:bg-[#a15f4d] text-warm-paper font-semibold text-xs shadow-md shadow-terracotta/25 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Đang gửi thông tin...</span>
                  ) : (
                    <>
                      <span>Xác Nhận Đặt Phòng</span>
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
