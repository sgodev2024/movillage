'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { RoomItem } from '@/data/content';
import { RoomDetailModal } from './RoomDetailModal';
import { Users, Bed, Maximize2, Compass, Sparkles, ArrowRight, Check } from 'lucide-react';

interface RoomsSectionProps {
  onOpenBooking: (roomName?: string) => void;
}

export function RoomsSection({ onOpenBooking }: RoomsSectionProps) {
  const { t, locale } = useLanguage();
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [activeImageMap, setActiveImageMap] = useState<Record<string, string>>({});

  const categories = [
    { id: 'all', label: locale === 'en' ? 'All' : 'Tất cả' },
    { id: 'Nhà Cộng Đồng', label: locale === 'en' ? 'Community House' : 'Nhà Cộng Đồng' },
    { id: 'Nhà Đào', label: locale === 'en' ? 'Peach House' : 'Nhà Đào' },
    { id: 'Nhà Mận', label: locale === 'en' ? 'Plum House' : 'Nhà Mận' },
    { id: 'Nhà Mít', label: locale === 'en' ? 'Jackfruit House' : 'Nhà Mít' },
    { id: 'Nhà Sang', label: locale === 'en' ? 'Sang Villa' : 'Nhà Sang' },
    { id: 'Nhà Táo', label: locale === 'en' ? 'Apple House' : 'Nhà Táo' },
  ];

  const allRooms: RoomItem[] = t.rooms?.items || [];

  const filteredRooms = allRooms.filter((room: RoomItem) => {
    if (selectedCategory === 'all') return true;
    return room.category === selectedCategory;
  });

  const displayedRooms = showAll || selectedCategory !== 'all' ? filteredRooms : filteredRooms.slice(0, 6);

  const handleThumbnailClick = (roomId: string, imgUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageMap((prev) => ({
      ...prev,
      [roomId]: imgUrl,
    }));
  };

  return (
    <section id="rooms" className="py-16 md:py-24 bg-soft-sand/70 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <p className="text-body-sm uppercase tracking-[0.2em] text-bamboo-shoot font-semibold mb-3">
            {t.rooms?.tagline || 'MƠ CÓ GÌ'}
          </p>
          <h2 className="text-display-lg font-bold text-espresso mb-4 font-display">
            {t.rooms?.title || 'Các hạng phòng nghỉ'}
          </h2>
          <div className="w-20 h-1 bg-terracotta/60 mx-auto mb-4 rounded-full" />
          <p className="text-body-base text-espresso/80 max-w-2xl mx-auto">
            {t.rooms?.sub || 'Không gian nghỉ dưỡng hòa mình cùng thiên nhiên hồ Hòa Bình, kiến trúc nhà sàn truyền thống kết hợp tiện nghi cao cấp.'}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = cat.id === 'all'
              ? allRooms.length
              : allRooms.filter((r: RoomItem) => r.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setShowAll(false);
                }}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-terracotta text-warm-paper shadow-md shadow-terracotta/25 scale-105'
                    : 'bg-warm-paper text-espresso/80 hover:bg-white hover:text-espresso border border-stilt-timber/25 shadow-xs'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-warm-paper/30 text-warm-paper font-bold' : 'bg-stilt-timber/15 text-espresso/80'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {displayedRooms.map((room: RoomItem) => {
            const currentImg = activeImageMap[room.id] || room.image;
            const galleryList = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];

            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className="bg-warm-paper rounded-2xl overflow-hidden border-2 border-stilt-timber/20 hover:border-terracotta/60 shadow-md hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between cursor-pointer"
              >
                <div className="flex-1 flex flex-col">
                  {/* Main Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-espresso/10">
                    <Image
                      src={currentImg}
                      alt={room.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay for top/bottom badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/45 pointer-events-none" />

                    {/* Top Badges: Category on left, Capacity on right */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap max-w-[70%]">
                        <span className="px-2.5 py-1 bg-terracotta text-warm-paper text-[11px] font-semibold rounded-full shadow-md whitespace-nowrap">
                          {room.category}
                        </span>
                        {room.code && (
                          <span className="px-2 py-0.5 bg-black/60 backdrop-blur-xs text-warm-paper text-[10px] font-medium rounded-full whitespace-nowrap">
                            {room.code}
                          </span>
                        )}
                      </div>

                      <div className="px-2.5 py-1 bg-bamboo-shoot text-white text-[11px] font-semibold rounded-full shadow-md flex items-center gap-1 backdrop-blur-xs shrink-0">
                        <Users className="w-3.5 h-3.5" />
                        <span>{room.capacity}</span>
                      </div>
                    </div>

                    {/* VR 360 Badge at bottom right of image */}
                    {room.vr360Url && (
                      <div className="absolute bottom-3 right-3">
                        <a
                          href={room.vr360Url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1 bg-white/95 hover:bg-white text-espresso text-[11px] font-semibold rounded-full shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 text-terracotta" />
                          <span>VR 360°</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Gallery Preview Strip */}
                  {galleryList.length > 1 && (
                    <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none bg-[#ede5db] border-b border-stilt-timber/10">
                      {galleryList.slice(0, 5).map((img: string, thumbIdx: number) => {
                        const isSelected = currentImg === img;
                        return (
                          <button
                            key={thumbIdx}
                            type="button"
                            onClick={(e) => handleThumbnailClick(room.id, img, e)}
                            className={`relative w-12 h-9 rounded-md overflow-hidden shrink-0 border-2 transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'border-terracotta scale-105 shadow-sm'
                                : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`${room.name} thumb ${thumbIdx + 1}`}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </button>
                        );
                      })}
                      {galleryList.length > 5 && (
                        <span className="text-[11px] font-semibold text-espresso/60 px-1">
                          +{galleryList.length - 5}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Room Content Details */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-xl sm:text-2xl font-bold text-espresso font-display group-hover:text-terracotta transition-colors">
                          {room.name}
                        </h3>
                      </div>

                      {/* Tagline / Subtitle */}
                      <p className="text-body-sm text-espresso/80 leading-relaxed mb-4 line-clamp-2">
                        {room.tagline}
                      </p>

                      {/* Key Specs Pills Grid */}
                      <div className="grid grid-cols-2 gap-2 bg-white/90 p-3 rounded-xl border border-stilt-timber/15 mb-4 text-xs">
                        <div className="flex items-center gap-2 text-espresso/90 overflow-hidden">
                          <Users className="w-3.5 h-3.5 text-terracotta shrink-0" />
                          <span className="truncate" title={room.capacity}>{room.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2 text-espresso/90 overflow-hidden">
                          <Bed className="w-3.5 h-3.5 text-stilt-timber shrink-0" />
                          <span className="truncate" title={room.bedType}>{room.bedType}</span>
                        </div>
                        <div className="flex items-center gap-2 text-espresso/90 overflow-hidden">
                          <Maximize2 className="w-3.5 h-3.5 text-lake-dawn shrink-0" />
                          <span className="truncate" title={room.area}>{room.area}</span>
                        </div>
                        <div className="flex items-center gap-2 text-espresso/90 overflow-hidden">
                          <Compass className="w-3.5 h-3.5 text-bamboo-shoot shrink-0" />
                          <span className="truncate" title={room.view}>{room.view}</span>
                        </div>
                      </div>
                    </div>

                    {/* Highlight Features */}
                    <ul className="space-y-1.5 pt-1">
                      {room.features.slice(0, 3).map((feat: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-espresso/80">
                          <Check className="w-3.5 h-3.5 text-bamboo-shoot shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Price & Action Footer */}
                <div className="border-t border-stilt-timber/15 bg-warm-paper">
                  <div className="px-5 py-4 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stilt-timber block font-semibold">
                        {locale === 'en' ? 'Room Rate' : 'Giá phòng'}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg sm:text-xl font-bold text-terracotta font-display">
                          {room.pricePerNight || (locale === 'en' ? 'Contact us' : 'Liên hệ')}
                        </span>
                        {room.pricePerNight && (
                          <span className="text-[11px] text-espresso/60 font-normal">{locale === 'en' ? '/ night' : '/ đêm'}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoom(room);
                        }}
                        className="px-3.5 py-2 bg-white hover:bg-soft-sand text-espresso text-xs font-semibold rounded-lg border border-stilt-timber/25 transition-all cursor-pointer shadow-xs active:scale-95"
                      >
                        {locale === 'en' ? 'Details' : 'Chi tiết'}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBooking(room.name);
                        }}
                        className="px-4 py-2 bg-terracotta hover:bg-[#a15f4d] text-warm-paper text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center gap-1.5 active:scale-95"
                      >
                        <span>{locale === 'en' ? 'Book Now' : 'Đặt ngay'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Signature Mơ Village Accent Bar */}
                  <div className="h-1 bg-gradient-to-r from-bamboo-shoot via-terracotta to-bamboo-shoot opacity-80" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Collapse Button when in All category */}
        {selectedCategory === 'all' && filteredRooms.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 bg-espresso text-warm-paper hover:bg-espresso/90 rounded-full font-medium text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer inline-flex items-center gap-2 active:scale-95"
            >
              {showAll ? (
                <>
                  <span>{locale === 'en' ? 'Collapse list' : 'Thu gọn danh sách'}</span>
                </>
              ) : (
                <>
                  <span>{locale === 'en' ? `View more (${filteredRooms.length - 6} other rooms)` : `Xem thêm (${filteredRooms.length - 6} phòng khác)`}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Room Detail Modal for viewing full specifications & booking */}
      <RoomDetailModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onBookRoom={(name) => {
          setSelectedRoom(null);
          onOpenBooking(name);
        }}
      />
    </section>
  );
}
