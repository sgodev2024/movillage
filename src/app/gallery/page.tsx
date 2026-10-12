'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { galleryPhotos, galleryContent, GalleryPhoto } from '@/data/galleryData';
import { LightboxModal } from '@/components/LightboxModal';
import { BookingModal } from '@/components/BookingModal';
import { Header } from '@/components/Header';

type CategoryFilter = 'all' | 'landscape' | 'rooms' | 'experiences' | 'dining';

export default function GalleryPage() {
  const { locale, toggleLocale, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    currentIndex: number;
    photosList: GalleryPhoto[];
  }>({
    isOpen: false,
    currentIndex: 0,
    photosList: galleryPhotos,
  });

  const content = galleryContent[locale];

  // Hero photo
  const heroPhoto = galleryPhotos.find((p) => p.column === 'featured') || galleryPhotos[0];

  // Filter grid photos
  const gridPhotos = useMemo(() => {
    const list = galleryPhotos.filter((p) => p.column !== 'featured');
    if (selectedCategory === 'all') return list;
    return list.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Total count including hero if matching filter
  const totalCount = useMemo(() => {
    let count = gridPhotos.length;
    if (selectedCategory === 'all' || heroPhoto.category === selectedCategory) {
      count += 1;
    }
    return count;
  }, [gridPhotos.length, selectedCategory, heroPhoto.category]);

  // Column distribution for 3-column layout
  const { col1, col2, col3 } = useMemo(() => {
    if (selectedCategory === 'all') {
      return {
        col1: galleryPhotos.filter((p) => p.column === 1),
        col2: galleryPhotos.filter((p) => p.column === 2),
        col3: galleryPhotos.filter((p) => p.column === 3),
      };
    }

    // Dynamic balance for filtered categories
    const c1: GalleryPhoto[] = [];
    const c2: GalleryPhoto[] = [];
    const c3: GalleryPhoto[] = [];
    gridPhotos.forEach((photo, idx) => {
      if (idx % 3 === 0) c1.push(photo);
      else if (idx % 3 === 1) c2.push(photo);
      else c3.push(photo);
    });
    return { col1: c1, col2: c2, col3: c3 };
  }, [selectedCategory, gridPhotos]);

  // Open lightbox with specific photo
  const openLightbox = (photo: GalleryPhoto) => {
    // Determine the full list to browse within
    let fullList = [...galleryPhotos];
    if (selectedCategory !== 'all') {
      fullList = galleryPhotos.filter(
        (p) => p.category === selectedCategory || (p.column === 'featured' && p.category === selectedCategory)
      );
    }
    const idx = fullList.findIndex((p) => p.id === photo.id);
    setLightboxState({
      isOpen: true,
      currentIndex: idx >= 0 ? idx : 0,
      photosList: fullList,
    });
  };

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#2C150F] flex flex-col selection:bg-[#B56E5A]/20 selection:text-[#2C150F]">
      {/* ========================================================
          1. HEADER (Reusable Component)
          ======================================================== */}
      <Header
        onOpenBooking={handleOpenBooking}
        currentPath="/gallery"
        position="sticky"
      />

      <main>
        {/* ========================================================
            2. INTRODUCTION & EDITORIAL HEADER (Figma Specs)
            ======================================================== */}
        <section className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20 pt-12 sm:pt-16 pb-10">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
          {/* Editorial introduction flex row */}
          <div className="gallery-editorial-intro">
            {/* Title group */}
            <div className="flex flex-col items-start gap-4 sm:gap-5 max-w-[620px]">
              <span className="text-[12px] font-normal leading-[15px] text-[#8A6F5C] uppercase tracking-[0.08em]">
                {content.eyebrow}
              </span>
              <h1 className="font-display text-[40px] sm:text-[48px] lg:text-[52px] leading-[115%] font-normal text-[#2C150F] tracking-tight">
                {content.title}
              </h1>
              <p className="font-display text-[20px] sm:text-[24px] leading-[140%] text-[#2C150F] font-normal">
                {content.lead}
              </p>
            </div>

            {/* Opening note */}
            <div className="flex flex-col items-start gap-4 max-w-[420px] lg:pb-1">
              <p className="text-[15px] sm:text-[16px] leading-[175%] text-[#705F55] font-normal">
                {content.openingNote}
              </p>
              <div className="flex items-center gap-2 text-[12px] leading-[15px] text-[#8A6F5C]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A6F5C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{content.location}</span>
              </div>
            </div>
          </div>

          {/* Featured landscape photo banner */}
          <div className="flex flex-col items-start gap-4">
            <div
              onClick={() => openLightbox(heroPhoto)}
              className="relative w-full h-[340px] sm:h-[480px] lg:h-[640px] rounded-2xl overflow-hidden cursor-pointer group shadow-sm bg-[#EDE4D8]"
            >
              <img
                src={heroPhoto.image}
                alt={locale === 'en' ? heroPhoto.titleEn : heroPhoto.title}
                className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-700 ease-out"
              />
              {/* Subtle hover overlay with expand icon */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-[#F7F3EE]/90 backdrop-blur-xs text-[#2C150F] flex items-center justify-center shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                </span>
              </div>
            </div>

            {/* Featured Caption */}
            <div className="w-full flex items-center justify-between text-[13px] sm:text-[14px]">
              <span className="text-[#705F55]">
                {locale === 'en' ? heroPhoto.titleEn : heroPhoto.title}
              </span>
              <span className="text-[12px] font-normal uppercase tracking-wider text-[#8A6F5C]">
                {locale === 'en' ? heroPhoto.categoryLabelEn : heroPhoto.categoryLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. PHOTO LIBRARY (Filters + 3-Column Editorial Grid)
          ======================================================== */}
      <section className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20 pb-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
          {/* Gallery toolbar with filter buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-[#D3D8D3]">
            {/* Category filter pills */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap" role="tablist">
              {(
                [
                  { key: 'all', label: content.categories.all },
                  { key: 'landscape', label: content.categories.landscape },
                  { key: 'rooms', label: content.categories.rooms },
                  { key: 'experiences', label: content.categories.experiences },
                  { key: 'dining', label: content.categories.dining },
                ] as const
              ).map(({ key, label }) => {
                const isActive = selectedCategory === key;
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-5 sm:px-6 py-2.5 rounded-full text-[14px] leading-[18px] font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-terracotta text-white border border-terracotta shadow-sm'
                        : 'bg-transparent text-[#2C150F] border border-[#D3D8D3] hover:border-[#8A6F5C] hover:bg-[#EDE4D8]/60'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Collection size counter */}
            <span className="text-[14px] leading-[18px] text-[#8A6F5C] whitespace-nowrap self-start sm:self-auto font-normal">
              {totalCount} {content.countLabel}
            </span>
          </div>

          {/* Editorial Photo Grid (3 Columns) */}
          <div className="gallery-grid-3col">
            {/* Column 1 */}
            <div className="flex flex-col gap-10">
              {col1.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  locale={locale}
                  onClick={() => openLightbox(photo)}
                />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-10">
              {col2.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  locale={locale}
                  onClick={() => openLightbox(photo)}
                />
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-10">
              {col3.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  locale={locale}
                  onClick={() => openLightbox(photo)}
                />
              ))}
            </div>
          </div>

          {/* Collection Closing Line */}
          <div className="pt-10 pb-4 text-center">
            <p className="font-display text-[22px] sm:text-[24px] leading-[30px] text-[#8A6F5C] font-normal">
              {content.closingNote}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. INVITATION TO STAY (Booking Invitation Banner)
          ======================================================== */}
      <section className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20 pb-16">
        <div className="max-w-[1280px] mx-auto bg-[#EDE4D8] rounded-[24px] p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-sm">
          {/* Invitation Copy */}
          <div className="flex flex-col items-start gap-4 max-w-[800px]">
            <h2 className="font-display text-[26px] sm:text-[32px] leading-[130%] text-[#2C150F] font-normal">
              {content.invitation.title}
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[175%] text-[#705F55] font-normal">
              {content.invitation.desc}
            </p>
          </div>

          {/* Booking Contact Actions */}
          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            <button
              onClick={handleOpenBooking}
              className="w-[164px] h-[50px] inline-flex items-center justify-center gap-3 bg-terracotta hover:bg-terracotta/90 active:scale-[0.98] text-white rounded-lg text-[14px] font-medium leading-[18px] shadow-sm transition-all cursor-pointer"
            >
              <span>{content.invitation.cta}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>
            <a
              href="tel:0964863838"
              className="text-[14px] leading-[18px] text-[#705F55] hover:text-[#B56E5A] transition-colors"
            >
              Hotline: {content.invitation.hotline}
            </a>
          </div>
        </div>
      </section>

      </main>


      {/* ========================================================
          6. FLOATING CONTACT ACTIONS (Consistent with Homepage)
          ======================================================== */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-30">
        <a
          href="tel:0964863838"
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#B8956A] hover:bg-[#8B7355] rounded-full shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden hover:scale-105"
          aria-label="Call Hotline"
        >
          <img src="/assets/img/icon-phone.webp" alt="Phone" className="w-[110%] h-[110%] object-cover" />
        </a>
        <a
          href="https://www.facebook.com/movillage.hoabinh"
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#B8956A] hover:bg-[#8B7355] rounded-full shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden hover:scale-105"
          aria-label="Facebook"
        >
          <img src="/assets/img/icon-facebook.webp" alt="Facebook" className="w-[120%] h-[120%] object-cover" />
        </a>
        <a
          href="https://zalo.me/0964863838"
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#B8956A] hover:bg-[#8B7355] rounded-full shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden hover:scale-105"
          aria-label="Zalo"
        >
          <img src="/assets/img/icon-zalo.webp" alt="Zalo" className="w-full h-full object-cover" />
        </a>
        <button
          onClick={scrollToTop}
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#B8956A] hover:bg-[#8B7355] text-[#1F1611] rounded-full shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105 cursor-pointer"
          aria-label="Scroll to top"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>

      {/* ========================================================
          7. MODALS
          ======================================================== */}
      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        currentIndex={lightboxState.currentIndex}
        photos={lightboxState.photosList}
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
        onNavigate={(newIdx) => setLightboxState((prev) => ({ ...prev, currentIndex: newIdx }))}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}

// Subcomponent: Individual Photograph Card
function PhotoCard({
  photo,
  locale,
  onClick,
}: {
  photo: GalleryPhoto;
  locale: string;
  onClick: () => void;
}) {
  const title = locale === 'en' ? photo.titleEn : photo.title;
  const categoryLabel = locale === 'en' ? photo.categoryLabelEn : photo.categoryLabel;

  return (
    <article
      onClick={onClick}
      className="flex flex-col items-start gap-3 w-full cursor-pointer group"
    >
      {/* Image container with fixed height matching Figma editorial layout */}
      <div
        className="w-full rounded-2xl overflow-hidden relative shadow-xs bg-[#EDE4D8]"
        style={{ height: `${photo.height}px` }}
      >
        <img
          src={photo.image}
          alt={title}
          loading="eager"
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
        />
        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Photo Notes */}
      <div className="flex flex-col items-start gap-[6px] w-full">
        <span className="text-[11px] leading-[14px] font-normal uppercase tracking-wider text-[#8A6F5C]">
          {categoryLabel}
        </span>
        <h3 className="text-[14px] leading-[160%] text-[#2C150F] font-normal group-hover:text-[#B56E5A] transition-colors">
          {title}
        </h3>
      </div>
    </article>
  );
}
