'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RoomItem } from '@/data/content';
import { useLanguage } from '@/context/LanguageContext';
import { X, Users, Bed, Eye, Maximize2, Check, Calendar, Sparkles } from 'lucide-react';

interface RoomDetailModalProps {
  room: RoomItem | null;
  onClose: () => void;
  onBookRoom: (roomName: string) => void;
}

export function RoomDetailModal({ room, onClose, onBookRoom }: RoomDetailModalProps) {
  const { locale } = useLanguage();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && room && !isClosing) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [room, isClosing]);

  // Lock background scrolling when modal is open
  React.useEffect(() => {
    if (room && !isClosing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [room, isClosing]);

  if (!room && !isClosing) return null;

  const currentImage = activeImage || (room ? room.image : '');
  const gallery = room && room.gallery && room.gallery.length > 0 ? room.gallery : (room ? [room.image] : []);

  if (!room) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-espresso/75 backdrop-blur-sm ${
        isClosing ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop-in'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-4xl bg-warm-paper rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-stilt-timber/25 ${
          isClosing ? 'animate-modal-card-out' : 'animate-modal-card-in'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-warm-paper flex items-center justify-center backdrop-blur-sm shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Đóng modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto custom-scrollbar flex-1 p-5 sm:p-8 space-y-6">
          {/* Header Main Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-espresso/10">
            <Image
              src={currentImage}
              alt={room.name}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover transition-all duration-300"
            />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-terracotta text-warm-paper text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                {room.category}
              </span>
              {room.code && (
                <span className="bg-black/65 backdrop-blur-sm text-warm-paper text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                  Mã: {room.code}
                </span>
              )}
            </div>

            <div className="absolute top-4 right-16 sm:right-16 bg-bamboo-shoot text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-xs">
              <Users className="w-3.5 h-3.5" />
              <span>{room.capacity}</span>
            </div>
          </div>

          {/* Gallery Thumbnails Strip */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {gallery.map((img: string, idx: number) => {
                const isSelected = currentImage === img;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-terracotta scale-105 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${room.name} gallery image ${idx + 1}`}
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
                {room.name}
              </h3>
              <p className="text-sm text-stilt-timber mt-1 font-medium">
                {room.tagline}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {room.vr360Url && (
                <a
                  href={room.vr360Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-lake-dawn hover:bg-[#5b7579] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{locale === 'en' ? 'VR 360° View' : 'Xem VR 360°'}</span>
                </a>
              )}
              {room.pricePerNight && (
                <div className="text-left sm:text-right">
                  <span className="text-xs text-espresso/60 block font-medium">{locale === 'en' ? 'Rate' : 'Giá phòng'}</span>
                  <span className="text-xl sm:text-2xl font-bold text-terracotta">
                    {room.pricePerNight}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/70 p-4 rounded-xl border border-stilt-timber/15">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-soft-sand flex items-center justify-center text-bamboo-shoot shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-espresso/60 block">{locale === 'en' ? 'Capacity' : 'Sức chứa'}</span>
                <span className="font-semibold text-espresso">{room.capacity}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-soft-sand flex items-center justify-center text-stilt-timber shrink-0">
                <Bed className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-espresso/60 block">{locale === 'en' ? 'Beds' : 'Giường ngủ'}</span>
                <span className="font-semibold text-espresso">{room.bedType}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-soft-sand flex items-center justify-center text-lake-dawn shrink-0">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-espresso/60 block">{locale === 'en' ? 'Area' : 'Diện tích'}</span>
                <span className="font-semibold text-espresso">{room.area || (locale === 'en' ? 'Standard' : 'Tiêu chuẩn')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-soft-sand flex items-center justify-center text-bamboo-shoot shrink-0">
                <Eye className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-espresso/60 block">{locale === 'en' ? 'View' : 'Tầm nhìn'}</span>
                <span className="font-semibold text-espresso">{room.view}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-espresso/70 mb-2">
              {locale === 'en' ? 'Room Introduction & Standards' : 'Giới thiệu & Tiêu chuẩn phòng'}
            </h4>
            <p className="text-sm text-espresso/85 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Highlights & Amenities */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-espresso/70 mb-3">
                {locale === 'en' ? 'Standard Features' : 'Đặc điểm tiêu chuẩn'}
              </h4>
              <ul className="space-y-2">
                {room.features.map((feat: string, i: number) => (
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
                {room.amenities.map((amenity: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-espresso/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-stilt-timber shrink-0 mt-1.5" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="shrink-0 bg-warm-paper border-t border-stilt-timber/15 z-20">
          <div className="px-6 py-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
            <span className="text-xs text-espresso/70 whitespace-nowrap">
              {locale === 'en' ? '24/7 Front Desk • Check-in 14:00 - Check-out 12:00' : 'Lễ tân phục vụ 24/7 • Check-in 14:00 - Check-out 12:00'}
            </span>
            <div className="flex items-center gap-3 shrink-0">
              {room.vr360Url && (
                <a
                  href={room.vr360Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-soft-sand text-espresso border border-stilt-timber/30 text-xs sm:text-sm font-medium shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-terracotta" />
                  <span>{locale === 'en' ? 'VR 360°' : 'Xem VR 360°'}</span>
                </a>
              )}
              <button
                onClick={() => {
                  onClose();
                  onBookRoom(room.name);
                }}
                className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-[#a15f4d] text-warm-paper text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
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
