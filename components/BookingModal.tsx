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
  Eye,
  Maximize2
} from 'lucide-react';

export type BookingStep = 'room_list' | 'room_detail' | 'details' | 'form' | 'success';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedOption?: string;
  initialStep?: BookingStep;
}

export function BookingModal({
  isOpen,
  onClose,
  preselectedOption,
  initialStep = 'room_list'
}: BookingModalProps) {
  const { locale } = useLanguage();
  const rooms: RoomItem[] = siteContent[locale]?.rooms?.items || siteContent.vi.rooms.items;

  const contentScrollRef = useRef<HTMLDivElement>(null);

  // Selected room state (null when user opened from navbar/hero without picking a specific room)
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [detailActiveImage, setDetailActiveImage] = useState<string | null>(null);
  const [roomFilterCategory, setRoomFilterCategory] = useState<string>('all');

  // Calendar State
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed: 9 is October
  const [monthAnimKey, setMonthAnimKey] = useState(0);

  // Date selection state - Default to UNSELECTED (null)
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);

  // Step state & directional animation
  const [currentStep, setCurrentStep] = useState<BookingStep>('room_list');
  const [stepDirection, setStepDirection] = useState<'forward' | 'backward'>('forward');
  const [isClosing, setIsClosing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    adults: '2',
    children: '0',
    specialRequests: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goToStep = (nextStep: BookingStep, customDirection?: 'forward' | 'backward') => {
    const stepIndices: Record<BookingStep, number> = {
      room_list: 0,
      room_detail: 1,
      details: 2,
      form: 3,
      success: 4,
    };
    const dir =
      customDirection ||
      (stepIndices[nextStep] >= stepIndices[currentStep] ? 'forward' : 'backward');
    setStepDirection(dir);
    setCurrentStep(nextStep);
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isClosing) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isClosing]);

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
        setCurrentStep(initialStep || 'details');
      } else {
        setSelectedRoomId(null);
        setCurrentStep('room_list');
      }
    } else {
      setSelectedRoomId(null);
      setCurrentStep(initialStep || 'room_list');
    }

    // Reset date selection to unselected state on every modal open
    setCheckInDate(null);
    setCheckOutDate(null);
    setCurrentImageIndex(0);
    setDetailActiveImage(null);
    setFormError(null);
  }, [preselectedOption, isOpen, initialStep, rooms]);

  // Scroll to top when changing steps
  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentStep, selectedRoomId]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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
    setMonthAnimKey((k) => k + 1);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    setMonthAnimKey((k) => k + 1);
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

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-espresso/80 backdrop-blur-sm ${
        isClosing ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop-in'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] bg-warm-paper rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stilt-timber/25 text-espresso ${
          isClosing ? 'animate-modal-card-out' : 'animate-modal-card-in'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. TOP STICKY HEADER */}
        <div className="shrink-0 bg-warm-paper/95 backdrop-blur-md border-b border-stilt-timber/15 px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between z-30">
          {currentStep === 'room_list' ? (
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold text-espresso font-display">
                {locale === 'en' ? 'Select Accommodation' : 'Chọn hạng phòng nghỉ'}
              </span>
            </div>
          ) : currentStep === 'room_detail' ? (
            <button
              type="button"
              onClick={() => goToStep('room_list', 'backward')}
              className="flex items-center gap-1.5 text-xs font-semibold text-espresso hover:text-terracotta active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-terracotta" />
              <span>{locale === 'en' ? 'All Accommodations' : 'Tất cả phòng nghỉ'}</span>
            </button>
          ) : currentStep === 'details' ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => goToStep('room_list', 'backward')}
                className="flex items-center gap-1.5 text-xs font-semibold text-espresso hover:text-terracotta active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-terracotta" />
                <span>{locale === 'en' ? 'Change Room' : 'Đổi hạng phòng'}</span>
              </button>
              <button
                type="button"
                onClick={() => goToStep('room_detail', 'backward')}
                className="hidden sm:flex items-center gap-1 text-xs font-medium text-espresso/70 hover:text-terracotta transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-lake-dawn" />
                <span>{locale === 'en' ? 'View Details' : 'Xem chi tiết'}</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => goToStep('details', 'backward')}
              className="flex items-center gap-1.5 text-xs font-semibold text-espresso hover:text-terracotta active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-terracotta" />
              <span>{locale === 'en' ? 'Back to Calendar' : 'Quay lại chọn ngày'}</span>
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
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-soft-sand hover:bg-stilt-timber/20 text-espresso flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Animated Step Progress Bar */}
        <div className="h-0.5 bg-stilt-timber/10 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-bamboo-shoot via-terracotta to-bamboo-shoot transition-all duration-300 ease-out"
            style={{
              width:
                currentStep === 'room_list'
                  ? '25%'
                  : currentStep === 'room_detail'
                  ? '50%'
                  : currentStep === 'details'
                  ? '75%'
                  : currentStep === 'form'
                  ? '95%'
                  : '100%',
            }}
          />
        </div>

        {/* 2. SCROLLABLE CONTENT BODY */}
        <div ref={contentScrollRef} className="flex-1 overflow-y-auto custom-scrollbar px-6 sm:px-8 py-5 sm:py-6 space-y-5 sm:space-y-6">
          
          {/* STEP 1: Visual Room Selection List */}
          {currentStep === 'room_list' && (
            <div className={`space-y-4 ${stepDirection === 'forward' ? 'animate-step-forward' : 'animate-step-backward'}`}>
              <div className="text-center px-2 pt-1 pb-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-terracotta block mb-1">
                  MƠ VILLAGE RESORT
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-espresso font-display">
                  {locale === 'en' ? 'Select an accommodation' : 'Chọn phòng nghỉ tại Mơ'}
                </h3>
                <p className="text-xs text-espresso/70 mt-1 max-w-md mx-auto">
                  {locale === 'en' ? 'Select an accommodation to view real-time availability, photos, and rates' : 'Chọn hạng phòng để xem lịch trống thực tế, ảnh không gian và bảng giá chi tiết'}
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
                    {cat === 'all'
                      ? (locale === 'en' ? 'All Rooms' : 'Tất cả phòng')
                      : (locale === 'en'
                        ? (cat === 'Nhà Cộng Đồng' ? 'Community House' : cat === 'Nhà Đào' ? 'Peach House' : cat === 'Nhà Mận' ? 'Plum House' : cat === 'Nhà Mít' ? 'Jackfruit House' : cat === 'Nhà Sang' ? 'Sang Villa' : cat === 'Nhà Táo' ? 'Apple House' : cat)
                        : cat)}
                  </button>
                ))}
              </div>

              {/* Rooms Cards List */}
              <div className="space-y-3.5 pt-1">
                {filteredRooms.map((rm: RoomItem) => (
                  <div
                    key={rm.id}
                    onClick={() => {
                      setSelectedRoomId(rm.id);
                      setCurrentImageIndex(0);
                      setDetailActiveImage(null);
                      setCheckInDate(null);
                      setCheckOutDate(null);
                      goToStep('details', 'forward');
                    }}
                    className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-stilt-timber/20 hover:border-terracotta/50 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-4 sm:gap-6 items-center group"
                  >
                    {/* Room Thumbnail */}
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-soft-sand">
                      <Image
                        src={rm.image}
                        alt={rm.name}
                        fill
                        sizes="144px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                        {rm.capacity}
                      </span>
                    </div>

                    {/* Room Info */}
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-xs font-semibold text-terracotta">
                          {rm.category}
                        </span>
                        {rm.code && (
                          <span className="text-[11px] text-espresso/60">
                            {locale === 'en' ? 'Code: ' : 'Mã: '}{rm.code}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base sm:text-xl font-bold text-espresso font-display truncate group-hover:text-terracotta transition-colors mb-1">
                        {rm.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-espresso/70 line-clamp-2 mb-3">
                        {rm.tagline}
                      </p>
                      
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-base sm:text-lg font-bold text-terracotta">
                          {rm.pricePerNight || (locale === 'en' ? 'Contact' : 'Liên hệ')}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRoomId(rm.id);
                              setCurrentImageIndex(0);
                              setDetailActiveImage(null);
                              goToStep('room_detail', 'forward');
                            }}
                            className="text-xs font-medium text-espresso/70 hover:text-terracotta bg-soft-sand/80 hover:bg-soft-sand px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 border border-stilt-timber/15"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{locale === 'en' ? 'Details' : 'Chi tiết'}</span>
                          </button>
                          <span className="text-xs font-semibold text-espresso/80 bg-soft-sand px-3 py-1.5 rounded-xl group-hover:bg-terracotta group-hover:text-white transition-all flex items-center gap-1.5 shadow-2xs">
                            <span>{locale === 'en' ? 'Check dates' : 'Xem lịch'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Room Detailed View */}
          {currentStep === 'room_detail' && activeRoom && (
            <div className={`space-y-6 ${stepDirection === 'forward' ? 'animate-step-forward' : 'animate-step-backward'}`}>
              {/* Header Main Image */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-espresso/10">
                <Image
                  src={detailActiveImage || gallery[currentImageIndex] || activeRoom.image}
                  alt={activeRoom.name}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover transition-all duration-300"
                />
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-terracotta text-warm-paper text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md">
                    {activeRoom.category}
                  </span>
                  {activeRoom.code && (
                    <span className="bg-black/65 backdrop-blur-sm text-warm-paper text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md">
                      Mã: {activeRoom.code}
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4 bg-bamboo-shoot text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                  <Users className="w-3.5 h-3.5" />
                  <span>{activeRoom.capacity}</span>
                </div>
              </div>

              {/* Gallery Thumbnails Strip */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                  {gallery.map((img: string, idx: number) => {
                    const isSelected = (detailActiveImage || gallery[currentImageIndex] || activeRoom.image) === img;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setDetailActiveImage(img)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'border-terracotta scale-105 shadow-md'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${activeRoom.name} gallery image ${idx + 1}`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Title & Price & VR Link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stilt-timber/15 pb-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-espresso">
                    {activeRoom.name}
                  </h3>
                  <p className="text-sm text-stilt-timber mt-1 font-medium">
                    {activeRoom.tagline}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  {activeRoom.vr360Url && (
                    <a
                      href={activeRoom.vr360Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-lake-dawn hover:bg-[#5b7579] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Xem VR 360°</span>
                    </a>
                  )}
                  {activeRoom.pricePerNight && (
                    <div className="text-left sm:text-right">
                      <span className="text-xs text-espresso/60 block font-medium">Giá phòng</span>
                      <span className="text-xl sm:text-2xl font-bold text-terracotta">
                        {activeRoom.pricePerNight}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/95 p-4 sm:p-5 rounded-2xl border border-stilt-timber/20 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-soft-sand flex items-center justify-center text-bamboo-shoot shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="text-espresso/60 block">{locale === 'en' ? 'Capacity' : 'Sức chứa'}</span>
                    <span className="font-semibold text-espresso">{activeRoom.capacity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-soft-sand flex items-center justify-center text-stilt-timber shrink-0">
                    <Bed className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="text-espresso/60 block">{locale === 'en' ? 'Beds' : 'Giường ngủ'}</span>
                    <span className="font-semibold text-espresso">{activeRoom.bedType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-soft-sand flex items-center justify-center text-lake-dawn shrink-0">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="text-espresso/60 block">{locale === 'en' ? 'Area' : 'Diện tích'}</span>
                    <span className="font-semibold text-espresso">{activeRoom.area || (locale === 'en' ? 'Standard' : 'Tiêu chuẩn')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-soft-sand flex items-center justify-center text-bamboo-shoot shrink-0">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="text-espresso/60 block">{locale === 'en' ? 'View' : 'Tầm nhìn'}</span>
                    <span className="font-semibold text-espresso">{activeRoom.view}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-espresso/70 mb-2">
                  {locale === 'en' ? 'Room Introduction & Standards' : 'Giới thiệu & Tiêu chuẩn phòng'}
                </h4>
                <p className="text-sm text-espresso/85 leading-relaxed">
                  {activeRoom.description}
                </p>
              </div>

              {/* Highlights & Amenities */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-espresso/70 mb-3">
                    {locale === 'en' ? 'Standard Features' : 'Đặc điểm tiêu chuẩn'}
                  </h4>
                  <ul className="space-y-2">
                    {activeRoom.features.map((feat: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-espresso/90">
                        <Check className="w-3.5 h-3.5 text-bamboo-shoot shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-espresso/70 mb-3">
                    {locale === 'en' ? 'Room Amenities' : 'Tiện nghi phòng'}
                  </h4>
                  <ul className="space-y-2">
                    {activeRoom.amenities.map((amenity: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-espresso/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-stilt-timber shrink-0 mt-1.5" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Banner to go to Calendar */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stilt-timber/20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 shadow-xs">
                <div>
                  <span className="text-xs text-espresso/60 block">{locale === 'en' ? 'Ready to experience?' : 'Sẵn sàng trải nghiệm?'}</span>
                  <span className="text-sm sm:text-base font-bold text-espresso font-display">
                    {locale === 'en' ? `Check live availability and rates for ${activeRoom.name}` : `Xem lịch trống thực tế và bảng giá cho ${activeRoom.name}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => goToStep('details', 'forward')}
                  className="px-5 py-3 rounded-xl bg-terracotta hover:bg-[#a15f4d] text-warm-paper text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>{locale === 'en' ? 'Select Dates' : 'Xem lịch & Chọn ngày'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Selected Room Calendar & Details */}
          {currentStep === 'details' && activeRoom && (
            <div className={`space-y-5 ${stepDirection === 'forward' ? 'animate-step-forward' : 'animate-step-backward'}`}>
              {/* Room Hero Media Card */}
              <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-stilt-timber/20 shadow-xs">
                <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-espresso/10">
                  <Image
                    src={gallery[currentImageIndex] || activeRoom.image}
                    alt={activeRoom.name}
                    fill
                    sizes="(max-width: 896px) 100vw, 896px"
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
                <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-espresso font-display">
                      {activeRoom.name}
                    </h3>
                    <p className="text-xs text-espresso/75 mt-0.5">
                      {activeRoom.tagline}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-espresso/60 block font-medium">{locale === 'en' ? 'Standard Rate' : 'Giá tiêu chuẩn'}</span>
                    <span className="text-lg sm:text-xl font-bold text-terracotta">
                      {activeRoom.pricePerNight || (locale === 'en' ? 'Contact' : 'Liên hệ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Booking Calendar */}
              <div id="booking-calendar" className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs border border-stilt-timber/20">
                <div className="flex items-center justify-between mb-4 sm:mb-5 pb-0.5">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-terracotta" />
                    <h3 className="font-bold text-espresso text-sm sm:text-base font-display">
                      {locale === 'en' ? `Calendar: Month ${currentMonth + 1}/${currentYear}` : `Lịch trống Tháng ${currentMonth + 1}/${currentYear}`}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded-lg border border-stilt-timber/20 hover:bg-soft-sand text-espresso active:scale-95 transition-all cursor-pointer"
                      aria-label={locale === 'en' ? 'Previous month' : 'Tháng trước'}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1.5 rounded-lg border border-stilt-timber/20 hover:bg-soft-sand text-espresso active:scale-95 transition-all cursor-pointer"
                      aria-label={locale === 'en' ? 'Next month' : 'Tháng sau'}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Status Legend */}
                <div className="flex items-center gap-3.5 sm:gap-5 py-2.5 px-4 rounded-xl sm:rounded-2xl bg-soft-sand/60 text-[11px] sm:text-xs font-medium text-espresso/80 mb-4 overflow-x-auto scrollbar-none border border-stilt-timber/15">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-5 h-5 rounded-md bg-white border border-[#a6dfb0] shadow-2xs flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#1a532d]"></span>
                    </span>
                    <span className="font-semibold text-espresso">{locale === 'en' ? 'Available' : 'Còn trống (kèm giá)'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-5 h-5 rounded-md bg-[#ded3c2] border border-[#c4b6a1] flex items-center justify-center text-[9px] font-bold text-[#554030]">
                      ✕
                    </span>
                    <span className="text-espresso/70">{locale === 'en' ? 'Fully Booked' : 'Đã kín phòng'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-5 h-5 rounded-md bg-terracotta text-white flex items-center justify-center text-[9px] font-black shadow-2xs">
                      ✓
                    </span>
                    <span className="font-semibold text-terracotta">{locale === 'en' ? 'Selected' : 'Đang chọn'}</span>
                  </div>
                </div>

                {/* Days of week */}
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center py-1.5 mb-2 text-[11px] sm:text-xs font-bold text-espresso/60">
                  {locale === 'en' ? (
                    <>
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div className="text-terracotta">Sat</div>
                      <div className="text-terracotta">Sun</div>
                    </>
                  ) : (
                    <>
                      <div>T2</div>
                      <div>T3</div>
                      <div>T4</div>
                      <div>T5</div>
                      <div>T6</div>
                      <div className="text-terracotta">T7</div>
                      <div className="text-terracotta">CN</div>
                    </>
                  )}
                </div>

                {/* Date grid */}
                <div key={monthAnimKey} className="grid grid-cols-7 gap-1.5 sm:gap-2 animate-month-switch">
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

                    // 1. Booked Date (Full / Unavailable)
                    if (item.isBooked) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled
                          title={`Ngày ${item.dayNumber} đã kín phòng`}
                          className="relative aspect-square rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex flex-col items-center justify-center gap-1 sm:gap-1.5 select-none bg-[#ded3c2] border border-[#c4b6a1] cursor-not-allowed transition-all overflow-hidden"
                        >
                          <span className="text-xs sm:text-sm font-bold leading-none text-[#7d6857]/60 line-through">
                            {item.dayNumber}
                          </span>
                          <span className="px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-wide bg-[#c8baa5] text-[#554030] leading-none">
                            Kín
                          </span>
                        </button>
                      );
                    }

                    // 2. Selected Check-In Date
                    if (isCheckIn) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDateClick(dateStr, false)}
                          className="relative aspect-square rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex flex-col items-center justify-center gap-1 sm:gap-1.5 select-none bg-terracotta text-white font-bold border-2 border-[#8e4a38] ring-2 ring-terracotta/40 shadow-md scale-102 cursor-pointer z-10 transition-transform"
                        >
                          <span className="text-xs sm:text-sm font-black leading-none text-white">{item.dayNumber}</span>
                          <span className="px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[7.5px] sm:text-[8px] font-black uppercase text-white bg-black/30 leading-none">
                            Nhận 14h
                          </span>
                        </button>
                      );
                    }

                    // 3. Selected Check-Out Date
                    if (isCheckOut) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDateClick(dateStr, false)}
                          className="relative aspect-square rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex flex-col items-center justify-center gap-1 sm:gap-1.5 select-none bg-[#8e4a38] text-white font-bold border-2 border-[#6d3427] ring-2 ring-terracotta/40 shadow-md scale-102 cursor-pointer z-10 transition-transform"
                        >
                          <span className="text-xs sm:text-sm font-black leading-none text-white">{item.dayNumber}</span>
                          <span className="px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[7.5px] sm:text-[8px] font-black uppercase text-white bg-black/30 leading-none">
                            Trả 12h
                          </span>
                        </button>
                      );
                    }

                    // 4. In Range between checkin and checkout
                    if (isInRange) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDateClick(dateStr, false)}
                          className="relative aspect-square rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex flex-col items-center justify-center gap-1 sm:gap-1.5 select-none bg-terracotta/15 text-espresso border-y-2 border-terracotta/35 hover:bg-terracotta/25 cursor-pointer transition-colors"
                        >
                          <span className="text-xs sm:text-sm font-bold leading-none text-espresso">{item.dayNumber}</span>
                          <span className="text-[9px] sm:text-[10px] font-bold leading-none text-terracotta">
                            {priceFormattedK}
                          </span>
                        </button>
                      );
                    }

                    // 5. Available Normal Date (Unselected)
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleDateClick(dateStr, false)}
                        title={`Ngày ${item.dayNumber} - Còn trống (${priceFormattedK}/đêm)`}
                        className="group/day relative aspect-square rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex flex-col items-center justify-center gap-1 sm:gap-1.5 select-none bg-white text-espresso border-2 border-[#d5c3b1] shadow-2xs hover:border-terracotta hover:bg-[#fffcf9] hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer z-1"
                      >
                        <span className="text-xs sm:text-sm font-bold leading-none text-espresso group-hover/day:text-terracotta transition-colors">
                          {item.dayNumber}
                        </span>
                        <span className="px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-extrabold text-[#14532d] bg-[#dcfce7] border border-[#86efac] leading-none shadow-2xs group-hover/day:bg-terracotta group-hover/day:text-white group-hover/day:border-terracotta transition-all">
                          {priceFormattedK}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Unified Date Selection Summary & Action Card */}
                <div 
                  className="mt-5 p-4 sm:p-5 rounded-2xl bg-[#faf6f0] border border-stilt-timber/25 shadow-xs space-y-3.5"
                  style={{ marginTop: '1.25rem' }}
                >
                  {/* Two Columns: Nhận phòng & Trả phòng */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className={`p-3 sm:p-3.5 rounded-xl border transition-all ${
                      checkInDate 
                        ? 'bg-white border-terracotta/50 shadow-xs' 
                        : 'bg-white/80 border-stilt-timber/15'
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${checkInDate ? 'bg-terracotta' : 'bg-stilt-timber/40'}`} />
                        <span className="text-espresso/70 text-[11px] sm:text-xs font-semibold">{locale === 'en' ? 'Check-in (14:00)' : 'Nhận phòng (14:00)'}</span>
                      </div>
                      {checkInDate ? (
                        <span className="text-terracotta font-bold text-sm sm:text-base font-display block">
                          {formatDateDisplay(checkInDate)}
                        </span>
                      ) : (
                        <span className="text-stilt-timber/70 italic text-xs block">
                          {locale === 'en' ? 'Not selected' : 'Chưa chọn ngày'}
                        </span>
                      )}
                    </div>

                    <div className={`p-3 sm:p-3.5 rounded-xl border transition-all ${
                      checkOutDate 
                        ? 'bg-white border-terracotta/50 shadow-xs' 
                        : 'bg-white/80 border-stilt-timber/15'
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${checkOutDate ? 'bg-[#8e4a38]' : 'bg-stilt-timber/40'}`} />
                        <span className="text-espresso/70 text-[11px] sm:text-xs font-semibold">{locale === 'en' ? 'Check-out (12:00)' : 'Trả phòng (12:00)'}</span>
                      </div>
                      {checkOutDate ? (
                        <span className="text-[#8e4a38] font-bold text-sm sm:text-base font-display block">
                          {formatDateDisplay(checkOutDate)}
                        </span>
                      ) : checkInDate ? (
                        <span className="text-terracotta font-semibold italic text-xs block animate-pulse">
                          {locale === 'en' ? 'Tap to select check-out' : 'Bấm chọn ngày trả'}
                        </span>
                      ) : (
                        <span className="text-espresso/40 text-xs block">
                          ---
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status / Quick Action / Guidance Footer */}
                  {checkInDate ? (
                    <div className="pt-2 border-t border-stilt-timber/15 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-espresso text-[11px] sm:text-xs font-medium">
                        {checkOutDate ? (
                          locale === 'en' ? (
                            <>Selected: <strong className="text-terracotta font-bold">{numberOfNights} night{numberOfNights > 1 ? 's' : ''}</strong></>
                          ) : (
                            <>Đã chọn: <strong className="text-terracotta font-bold">{numberOfNights} đêm</strong> nghỉ dưỡng</>
                          )
                        ) : (
                          <span className="text-espresso/80">{locale === 'en' ? '👉 Select check-out date or:' : '👉 Bấm chọn ngày trả phòng hoặc:'}</span>
                        )}
                      </span>
                      <div className="flex items-center gap-2">
                        {!checkOutDate && (
                          <button
                            type="button"
                            onClick={handleQuickOneNight}
                            className="px-3 py-1.5 rounded-xl bg-terracotta hover:bg-[#a15f4d] text-white font-semibold text-[11px] shadow-xs active:scale-95 flex items-center gap-1.5 cursor-pointer transition-all"
                          >
                            <Zap className="w-3 h-3 fill-current" />
                            <span>{locale === 'en' ? '1 Night' : 'Thuê 1 đêm'}</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleClearDates}
                          className="px-2.5 py-1.5 rounded-xl text-espresso/70 hover:text-espresso hover:bg-soft-sand/70 active:scale-95 transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                          title={locale === 'en' ? 'Reset dates' : 'Chọn lại ngày'}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{locale === 'en' ? 'Reset' : 'Chọn lại'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2.5 px-3 rounded-xl bg-soft-sand/40 border border-stilt-timber/10 text-center text-xs text-espresso/75 flex items-center justify-center gap-1.5">
                      <span className="text-sm">👉</span>
                      <span>
                        {locale === 'en' ? (
                          <>Select your preferred <strong className="text-terracotta font-bold">Check-in date (14:00)</strong> on the calendar above</>
                        ) : (
                          <>Bấm vào ngày bạn muốn <strong className="text-terracotta font-bold">Nhận phòng (14:00)</strong> trên lịch ở trên</>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Policies Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stilt-timber/15 text-xs text-espresso/70 space-y-1.5">
                <div className="flex items-center gap-1.5 text-espresso font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4 text-bamboo-shoot" />
                  <span>{locale === 'en' ? 'Check-in & Check-out Policies:' : 'Quy định nhận & trả phòng:'}</span>
                </div>
                <p>{locale === 'en' ? '• Check-in from 14:00 - Check-out before 12:00 next day.' : '• Nhận phòng từ 14:00 - Trả phòng trước 12:00 trưa hôm sau.'}</p>
                <p>{locale === 'en' ? '• Real-time availability and rates synced with Mơ Village front desk.' : '• Lịch trống và giá được đồng bộ theo thời gian thực từ lễ tân Mơ Village.'}</p>
              </div>
            </div>
          )}

          {/* STEP 3: Customer Booking Form */}
          {currentStep === 'form' && activeRoom && (
            <div className={`space-y-4 ${stepDirection === 'forward' ? 'animate-step-forward' : 'animate-step-backward'}`}>
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs border border-stilt-timber/20">
                <h3 className="text-base sm:text-lg font-bold text-espresso font-display mb-1">
                  {locale === 'en' ? 'Guest Information' : 'Thông tin người đặt phòng'}
                </h3>
                <p className="text-xs text-espresso/70 mb-5">
                  {locale === 'en' ? 'Please fill in your details for Mơ Village to best prepare your welcome.' : 'Vui lòng điền thông tin để Mơ Village chuẩn bị đón tiếp bạn chu đáo nhất.'}
                </p>

                {formError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-red-700 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-espresso mb-1.5">
                        {locale === 'en' ? 'Full Name *' : 'Họ và tên của bạn *'}
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
                        className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-soft-sand/40 border border-stilt-timber/20 text-xs sm:text-sm text-espresso focus:bg-white focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-espresso mb-1.5">
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
                        className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-soft-sand/40 border border-stilt-timber/20 text-xs sm:text-sm text-espresso focus:bg-white focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-bold text-espresso mb-1.5">
                        {locale === 'en' ? 'Adults' : 'Người lớn'}
                      </label>
                      <select
                        value={formData.adults}
                        onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-soft-sand/40 border border-stilt-timber/20 text-xs sm:text-sm text-espresso focus:bg-white focus:border-terracotta outline-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((num) => (
                          <option key={num} value={num}>
                            {num} {locale === 'en' ? 'adults' : 'người lớn'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-espresso mb-1.5">
                        {locale === 'en' ? 'Children (<12y)' : 'Trẻ em (<12t)'}
                      </label>
                      <select
                        value={formData.children}
                        onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-soft-sand/40 border border-stilt-timber/20 text-xs sm:text-sm text-espresso focus:bg-white focus:border-terracotta outline-none cursor-pointer"
                      >
                        {[0, 1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} {locale === 'en' ? 'children' : 'trẻ em'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-espresso mb-1.5">
                      {locale === 'en' ? 'Special requests (dietary, transfer shuttle, BBQ...)' : 'Ghi chú thêm (ăn uống, xe đưa đón, BBQ...)'}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      placeholder={locale === 'en' ? 'E.g., Shuttle needed from Hanoi, birthday celebration, lakeside dining...' : 'Ví dụ: Cần xe Limousine đón từ Hà Nội, tổ chức sinh nhật, ăn tối bên hồ...'}
                      className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-soft-sand/40 border border-stilt-timber/20 text-xs sm:text-sm text-espresso focus:bg-white focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none resize-none"
                    />
                  </div>

                  {/* Booking Summary Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-soft-sand/70 border border-stilt-timber/20 space-y-2 text-xs text-espresso">
                    <div className="font-bold flex justify-between">
                      <span>{locale === 'en' ? 'Room Category:' : 'Hạng phòng:'}</span>
                      <span className="text-terracotta">{activeRoom.name}</span>
                    </div>
                    <div className="flex justify-between text-espresso/70">
                      <span>{locale === 'en' ? 'Stay Duration:' : 'Thời gian nghỉ:'}</span>
                      <span>
                        {numberOfNights} {locale === 'en' ? 'nights' : 'đêm'} ({formatDateDisplay(checkInDate)} - {formatDateDisplay(checkOutDate)})
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-terracotta pt-2 border-t border-stilt-timber/15">
                      <span>{locale === 'en' ? 'Estimated Total:' : 'Tổng tiền tạm tính:'}</span>
                      <span>{totalPriceNumber.toLocaleString('vi-VN')} {locale === 'en' ? 'VND' : 'đ'}</span>
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
                {locale === 'en' ? 'Reservation Request Received!' : 'Đặt phòng thành công!'}
              </h3>
              <p className="text-xs sm:text-sm text-espresso/80 leading-relaxed max-w-sm mx-auto">
                {locale === 'en' ? (
                  <>Thank you <strong>{formData.fullName || 'guest'}</strong> for choosing Mơ Village. Our reservations concierge will contact you via phone/WhatsApp/Zalo <strong>{formData.phone}</strong> within 15 minutes to confirm.</>
                ) : (
                  <>Cảm ơn <strong>{formData.fullName || 'quý khách'}</strong> đã lựa chọn Mơ Village. Lễ tân sẽ gọi điện qua SĐT/Zalo <strong>{formData.phone}</strong> trong vòng 15 phút để xác nhận chi tiết.</>
                )}
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stilt-timber/20 text-xs text-left max-w-sm mx-auto space-y-2 shadow-xs">
                <div className="font-bold text-espresso border-b border-stilt-timber/10 pb-2 flex justify-between items-center">
                  <span>{locale === 'en' ? 'Booking ID:' : 'Mã đơn đặt:'} #{Math.floor(100000 + Math.random() * 900000)}</span>
                  <span className="text-[10px] font-medium text-bamboo-shoot bg-bamboo-shoot/15 px-2 py-0.5 rounded-full">
                    {locale === 'en' ? 'Awaiting Concierge Call' : 'Chờ lễ tân gọi'}
                  </span>
                </div>
                <div className="flex justify-between text-espresso/75">
                  <span>{locale === 'en' ? 'Room:' : 'Phòng:'}</span>
                  <span className="font-semibold text-espresso">{activeRoom.name}</span>
                </div>
                <div className="flex justify-between text-espresso/75">
                  <span>{locale === 'en' ? 'Period:' : 'Thời gian:'}</span>
                  <span className="font-semibold text-espresso">
                    {formatDateDisplay(checkInDate)} - {formatDateDisplay(checkOutDate)} ({numberOfNights} {locale === 'en' ? 'nights' : 'đêm'})
                  </span>
                </div>
                <div className="flex justify-between text-espresso/75">
                  <span>{locale === 'en' ? 'Guests:' : 'Số khách:'}</span>
                  <span className="font-semibold text-espresso">
                    {formData.adults} {locale === 'en' ? 'adults' : 'người lớn'}{parseInt(formData.children) > 0 ? `, ${formData.children} ${locale === 'en' ? 'children' : 'trẻ em'}` : ''}
                  </span>
                </div>
                <div className="flex justify-between text-espresso/85 pt-1.5 border-t border-stilt-timber/10">
                  <span className="font-bold">{locale === 'en' ? 'Estimated Total:' : 'Tổng chi phí dự kiến:'}</span>
                  <span className="font-bold text-terracotta text-sm">{totalPriceNumber.toLocaleString('vi-VN')} {locale === 'en' ? 'VND' : 'đ'}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center items-center">
                <a
                  href="tel:+84964863838"
                  className="px-5 py-2.5 rounded-xl bg-soft-sand hover:bg-stilt-timber/20 text-espresso text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-terracotta" />
                  <span>Hotline: (+84) 964 863 838</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-espresso hover:bg-espresso/90 text-warm-paper text-xs font-bold transition-all active:scale-95 cursor-pointer"
                >
                  {locale === 'en' ? 'Done & Close' : 'Hoàn tất & Đóng'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. STICKY BOTTOM ACTION BAR */}
        {activeRoom && currentStep === 'room_detail' && (
          <div className="shrink-0 bg-warm-paper border-t border-stilt-timber/20 z-30 shadow-lg">
            <div className="px-6 sm:px-8 py-3.5 sm:py-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
              <span className="text-xs text-espresso/70 whitespace-nowrap">
                {locale === 'en' ? '24/7 Front Desk • Check-in 14:00 - Check-out 12:00' : 'Lễ tân phục vụ 24/7 • Check-in 14:00 - Check-out 12:00'}
              </span>
              <div className="flex items-center gap-3 shrink-0">
                {activeRoom.vr360Url && (
                  <a
                    href={activeRoom.vr360Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-soft-sand text-espresso border border-stilt-timber/30 text-xs sm:text-sm font-medium shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-terracotta" />
                    <span>{locale === 'en' ? 'VR 360°' : 'Xem VR 360°'}</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => goToStep('details', 'forward')}
                  className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-[#a15f4d] text-warm-paper text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>{locale === 'en' ? 'Book this room now' : 'Đặt phòng này ngay'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-bamboo-shoot via-terracotta to-bamboo-shoot opacity-80" />
          </div>
        )}

        {activeRoom && currentStep !== 'room_list' && currentStep !== 'room_detail' && currentStep !== 'success' && (
          <div className="shrink-0 bg-warm-paper border-t border-stilt-timber/20 z-30 shadow-lg">
            <div className="px-6 sm:px-8 py-4 flex items-center justify-between gap-4">
              <div>
                {checkInDate ? (
                  <>
                    <span className="text-[10px] sm:text-[11px] text-espresso/70 block font-medium">
                      {checkOutDate 
                        ? `${numberOfNights} ${locale === 'en' ? 'nights' : 'đêm'} (${formatDateDisplay(checkInDate)} - ${formatDateDisplay(checkOutDate)})` 
                        : (locale === 'en' ? `Check-in ${formatDateDisplay(checkInDate)} (Select check-out)` : `Nhận ${formatDateDisplay(checkInDate)} (Chưa chọn ngày trả)`)}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base sm:text-xl font-bold text-terracotta font-display">
                        {totalPriceNumber.toLocaleString('vi-VN')} {locale === 'en' ? 'VND' : 'đ'}
                      </span>
                      <span className="text-[11px] text-espresso/60 font-normal">{locale === 'en' ? 'total' : 'tổng tiền'}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] sm:text-[11px] text-espresso/60 block font-medium">
                      {locale === 'en' ? 'Dates not selected' : 'Chưa chọn ngày'}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base sm:text-xl font-bold text-terracotta font-display">
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
                    goToStep('form', 'forward');
                  }}
                  className={`flex-1 max-w-[230px] py-3.5 px-5 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                    checkInDate
                      ? 'bg-terracotta hover:bg-[#a15f4d] text-warm-paper shadow-md shadow-terracotta/25 active:scale-95 cursor-pointer'
                      : 'bg-stilt-timber/15 text-espresso/40 cursor-not-allowed'
                  }`}
                >
                  <span>{checkInDate ? (locale === 'en' ? 'Continue' : 'Tiếp Tục Đặt Phòng') : (locale === 'en' ? 'Select dates on calendar' : 'Chọn ngày trên lịch')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleFormSubmit()}
                  disabled={isSubmitting}
                  className="flex-1 max-w-[230px] py-3.5 px-5 rounded-xl sm:rounded-2xl bg-terracotta hover:bg-[#a15f4d] text-warm-paper font-semibold text-xs sm:text-sm shadow-md shadow-terracotta/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>{locale === 'en' ? 'Submitting...' : 'Đang gửi thông tin...'}</span>
                  ) : (
                    <>
                      <span>{locale === 'en' ? 'Confirm Booking' : 'Xác Nhận Đặt Phòng'}</span>
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
