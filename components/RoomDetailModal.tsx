'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { RoomItem } from '@/data/content';
import { X, Users, Bed, Eye, Maximize2, Check, Calendar, Sparkles } from 'lucide-react';

interface RoomDetailModalProps {
  room: RoomItem | null;
  onClose: () => void;
  onBookRoom: (roomName: string) => void;
}

export function RoomDetailModal({ room, onClose, onBookRoom }: RoomDetailModalProps) {
  const { locale } = useLanguage();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Reset active image when room changes
  useEffect(() => {
    setActiveImage(null);
  }, [room?.id]);

  if (!room) return null;

  const currentImage = activeImage || room.image;
  const gallery = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];

  // Helper to format room code cleanly
  const formatCode = (code?: string) => {
    if (!code) return '';
    if (code.length <= 4) return code;
    return code
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([a-zA-Z])(\d+)/g, '$1 $2')
      .replace(/Executiv\b/i, 'Executive');
  };

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

  const formattedCode = formatCode(room.code);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-warm-paper rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stilt-timber/25 text-espresso animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. TOP STICKY HEADER */}
        <div className="shrink-0 bg-warm-paper/95 backdrop-blur-md border-b border-stilt-timber/15 px-4 sm:px-6 py-3 flex items-center justify-between z-30">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="text-xs font-bold text-terracotta uppercase tracking-wider bg-terracotta/10 px-2.5 py-0.5 rounded-full shrink-0">
              {getCategoryLabel(room.category)}
            </span>
            <span className="text-espresso/30 shrink-0">•</span>
            <span className="text-sm sm:text-base font-bold text-espresso font-display truncate">
              {room.name}
            </span>
            {formattedCode && (
              <span className="hidden sm:inline-block text-[11px] font-medium text-espresso/70 bg-soft-sand px-2 py-0.5 rounded-full border border-stilt-timber/20 shrink-0">
                {locale === 'en' ? 'Code: ' : 'Mã: '}{formattedCode}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-soft-sand hover:bg-stilt-timber/20 text-espresso flex items-center justify-center active:scale-95 transition-all cursor-pointer shrink-0 ml-3 shadow-2xs"
            aria-label={locale === 'en' ? 'Close modal' : 'Đóng modal'}
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* 2. SCROLLABLE CONTENT BODY */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-5 md:p-6 space-y-3.5 sm:space-y-4">
          {/* Panoramic Hero Image */}
          <div className="relative aspect-[21/9] sm:aspect-[2.35/1] max-h-[230px] sm:max-h-[260px] rounded-2xl overflow-hidden bg-espresso/10 border border-stilt-timber/15 shadow-inner">
            <Image
              src={currentImage}
              alt={room.name}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover transition-all duration-300"
              priority
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

            {/* Top Badges on Image */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="bg-terracotta text-warm-paper text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md">
                  {getCategoryLabel(room.category)}
                </span>
                {formattedCode && (
                  <span className="bg-black/60 backdrop-blur-sm text-warm-paper text-[11px] sm:text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md border border-white/15">
                    {locale === 'en' ? 'Code: ' : 'Mã: '}{formattedCode}
                  </span>
                )}
              </div>

              <div className="bg-bamboo-shoot/90 backdrop-blur-xs text-white text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md flex items-center gap-1.5 shrink-0">
                <Users className="w-3.5 h-3.5" />
                <span>{room.capacity}</span>
              </div>
            </div>
          </div>

          {/* Gallery Thumbnails Strip */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
              {gallery.map((img: string, idx: number) => {
                const isSelected = currentImage === img;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-14 h-10 sm:w-16 sm:h-11 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-terracotta scale-102 shadow-sm ring-2 ring-terracotta/25'
                        : 'border-transparent opacity-65 hover:opacity-100 hover:scale-102'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${room.name} gallery image ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Title & Price Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-stilt-timber/15 pb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-espresso">
                {room.name}
              </h3>
              <p className="text-xs sm:text-sm text-espresso/75 mt-0.5 leading-relaxed">
                {room.tagline}
              </p>
            </div>

            {room.pricePerNight && (
              <div className="text-left sm:text-right shrink-0 bg-white/80 px-3.5 py-2 rounded-xl border border-stilt-timber/20 shadow-2xs">
                <span className="text-[10px] sm:text-[11px] text-espresso/60 block font-medium uppercase tracking-wider">
                  {locale === 'en' ? 'Room Rate' : 'Giá phòng'}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg sm:text-xl font-bold text-terracotta font-display">
                    {room.pricePerNight}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-espresso/60">
                    {locale === 'en' ? '/ night' : '/ đêm'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* BẢNG CHI TIẾT THÔNG SỐ PHÒNG - 4 Columns in 1 Row on desktop */}
          <div className="bg-white/90 p-3 sm:p-3.5 rounded-2xl border border-stilt-timber/20 shadow-2xs">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {/* Sức chứa */}
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-soft-sand/50 border border-stilt-timber/10">
                <div className="w-8 h-8 rounded-lg bg-warm-paper flex items-center justify-center text-bamboo-shoot shrink-0 shadow-2xs">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-xs min-w-0 flex-1">
                  <span className="text-espresso/60 block text-[10px] uppercase tracking-wider font-semibold leading-tight">
                    {locale === 'en' ? 'Capacity' : 'Sức chứa'}
                  </span>
                  <span className="font-bold text-espresso truncate block text-xs mt-0.5" title={room.capacity}>
                    {room.capacity}
                  </span>
                </div>
              </div>

              {/* Giường ngủ */}
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-soft-sand/50 border border-stilt-timber/10">
                <div className="w-8 h-8 rounded-lg bg-warm-paper flex items-center justify-center text-stilt-timber shrink-0 shadow-2xs">
                  <Bed className="w-4 h-4" />
                </div>
                <div className="text-xs min-w-0 flex-1">
                  <span className="text-espresso/60 block text-[10px] uppercase tracking-wider font-semibold leading-tight">
                    {locale === 'en' ? 'Beds' : 'Giường ngủ'}
                  </span>
                  <span className="font-bold text-espresso truncate block text-xs mt-0.5" title={room.bedType}>
                    {room.bedType}
                  </span>
                </div>
              </div>

              {/* Diện tích */}
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-soft-sand/50 border border-stilt-timber/10">
                <div className="w-8 h-8 rounded-lg bg-warm-paper flex items-center justify-center text-lake-dawn shrink-0 shadow-2xs">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div className="text-xs min-w-0 flex-1">
                  <span className="text-espresso/60 block text-[10px] uppercase tracking-wider font-semibold leading-tight">
                    {locale === 'en' ? 'Area' : 'Diện tích'}
                  </span>
                  <span className="font-bold text-espresso truncate block text-xs mt-0.5">
                    {room.area || (locale === 'en' ? 'Standard' : 'Tiêu chuẩn')}
                  </span>
                </div>
              </div>

              {/* Tầm nhìn */}
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-soft-sand/50 border border-stilt-timber/10">
                <div className="w-8 h-8 rounded-lg bg-warm-paper flex items-center justify-center text-terracotta shrink-0 shadow-2xs">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="text-xs min-w-0 flex-1">
                  <span className="text-espresso/60 block text-[10px] uppercase tracking-wider font-semibold leading-tight">
                    {locale === 'en' ? 'View' : 'Tầm nhìn'}
                  </span>
                  <span className="font-bold text-espresso truncate block text-xs mt-0.5" title={room.view}>
                    {room.view}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white/70 p-3.5 sm:p-4.5 rounded-2xl border border-stilt-timber/15">
            <h4 className="text-xs font-bold uppercase tracking-wider text-espresso/70 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>{locale === 'en' ? 'Overview & Room Standards' : 'Giới thiệu & Tiêu chuẩn phòng'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-espresso/85 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Highlights & Amenities */}
          <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div className="bg-white/70 p-3.5 sm:p-4 rounded-2xl border border-stilt-timber/15 flex flex-col">
              <h4 className="text-xs font-bold uppercase tracking-wider text-espresso/70 mb-2.5 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-bamboo-shoot" />
                <span>{locale === 'en' ? 'Standard Features' : 'Đặc điểm tiêu chuẩn'}</span>
              </h4>
              <ul className="space-y-1.5 flex-1">
                {room.features.map((feat: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-espresso/90">
                    <span className="text-bamboo-shoot font-bold text-xs shrink-0 mt-0.5">✓</span>
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/70 p-3.5 sm:p-4 rounded-2xl border border-stilt-timber/15 flex flex-col">
              <h4 className="text-xs font-bold uppercase tracking-wider text-espresso/70 mb-2.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-stilt-timber inline-block" />
                <span>{locale === 'en' ? 'Room Amenities' : 'Tiện nghi phòng'}</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {room.amenities.map((amenity: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center text-xs text-espresso/85 bg-soft-sand/80 px-2.5 py-1 rounded-lg border border-stilt-timber/15"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. MODAL FOOTER CTA */}
        <div className="shrink-0 bg-warm-paper border-t border-stilt-timber/15 z-20">
          <div className="px-4 sm:px-6 py-3 sm:py-3.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
            <span className="text-[11px] sm:text-xs text-espresso/70 whitespace-nowrap font-medium">
              {locale === 'en' ? '24/7 Front Desk • Check-in 14:00 - Check-out 12:00' : 'Lễ tân phục vụ 24/7 • Check-in 14:00 - Check-out 12:00'}
            </span>
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {room.vr360Url && (
                <a
                  href={room.vr360Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-soft-sand text-espresso border border-stilt-timber/30 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                  <span>{locale === 'en' ? 'VR 360°' : 'Xem VR 360°'}</span>
                </a>
              )}
              <button
                onClick={() => {
                  onClose();
                  onBookRoom(room.name);
                }}
                className="px-4 sm:px-5 py-2 rounded-xl bg-terracotta hover:bg-[#a15f4d] text-warm-paper text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{locale === 'en' ? 'Book this room now' : 'Đặt phòng này ngay'}</span>
              </button>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-bamboo-shoot via-terracotta to-bamboo-shoot opacity-80" />
        </div>
      </div>
    </div>
  );
}
