'use client';

import React, { useEffect, useCallback } from 'react';
import { GalleryPhoto } from '@/data/galleryData';
import { useLanguage } from '@/context/LanguageContext';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: GalleryPhoto[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function LightboxModal({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onNavigate,
}: LightboxModalProps) {
  const { locale } = useLanguage();

  const handlePrev = useCallback(() => {
    if (photos.length === 0) return;
    const nextIdx = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (photos.length === 0) return;
    const nextIdx = (currentIndex + 1) % photos.length;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];
  const photoTitle = locale === 'en' ? currentPhoto.titleEn : currentPhoto.title;
  const categoryLabel = locale === 'en' ? currentPhoto.categoryLabelEn : currentPhoto.categoryLabel;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photoTitle}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A120E]/90 backdrop-blur-md animate-fade-in p-4 sm:p-6 lg:p-8"
      onClick={onClose}
    >
      {/* Top action bar */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 bg-gradient-to-b from-black/60 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-[12px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-[#F7F3EE]/20 text-[#F7F3EE] backdrop-blur-xs">
            {categoryLabel}
          </span>
          <span className="text-[14px] text-[#F7F3EE]/80 font-mono">
            {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-[#F7F3EE]/15 hover:bg-[#F7F3EE]/30 text-[#F7F3EE] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative max-w-6xl max-h-[85vh] w-full flex flex-col items-center justify-center z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/40 max-h-[72vh] flex items-center justify-center">
          <img
            src={currentPhoto.image}
            alt={photoTitle}
            className="max-h-[72vh] max-w-full object-contain rounded-2xl select-none transition-all duration-300"
          />
        </div>

        {/* Caption bar */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <p className="font-display text-[20px] sm:text-[24px] text-[#F7F3EE] tracking-tight leading-snug">
            {photoTitle}
          </p>
          <p className="text-[13px] text-[#D8C1BC] mt-1 uppercase tracking-widest font-normal">
            Mơ Village · Hòa Bình
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#F7F3EE]/15 hover:bg-[#F7F3EE]/30 text-[#F7F3EE] flex items-center justify-center transition-all cursor-pointer hover:scale-105"
        aria-label="Previous photo"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#F7F3EE]/15 hover:bg-[#F7F3EE]/30 text-[#F7F3EE] flex items-center justify-center transition-all cursor-pointer hover:scale-105"
        aria-label="Next photo"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}
