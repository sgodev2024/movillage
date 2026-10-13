'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  currentPath?: string;
}

export function Footer({ currentPath }: FooterProps) {
  const { locale, t } = useLanguage();

  const isGallery = currentPath === '/gallery' || currentPath === '/thu-vien-anh';

  return (
    <footer className="w-full bg-[#EDE4D8] border-t border-[#D3D8D3]/60">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20 py-12 lg:py-16">
        {/* Brand and contacts layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Brand story */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <Link href="/" className="relative h-14 w-48 block" aria-label="Mơ Village Home">
              <img
                src="/assets/img/logo-horizontal.svg"
                alt="Mơ Village"
                className="w-full h-full object-contain object-left"
              />
            </Link>
            <p className="font-display text-[22px] sm:text-[24px] leading-[150%] text-[#2C150F] max-w-md">
              {locale === 'en'
                ? 'A gentle dream on Hòa Bình Lake'
                : 'Một giấc mơ dịu trên mặt hồ Hòa Bình'}
            </p>
            <p className="text-[14px] leading-[175%] text-[#705F55]">
              {locale === 'en'
                ? 'Đà Bắc, Hòa Bình, Vietnam'
                : 'Đà Bắc, Hoà Bình, Việt Nam'}
            </p>
          </div>

          {/* Explore Mơ */}
          <div className="lg:col-span-4 flex flex-col items-start gap-5">
            <p className="text-[12px] font-normal uppercase tracking-wider text-[#8A6F5C]">
              {locale === 'en' ? 'EXPLORE MƠ' : 'KHÁM PHÁ MƠ'}
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full text-[14px] leading-[18px]">
              <div className="flex flex-col gap-4">
                <Link
                  href="/#story"
                  className="text-[#2C150F] hover:text-[#B56E5A] transition-colors"
                >
                  {t.nav.story}
                </Link>
                <Link
                  href="/#rooms"
                  className="text-[#2C150F] hover:text-[#B56E5A] transition-colors"
                >
                  {t.nav.rooms}
                </Link>
                <Link
                  href="/#nearby"
                  className="text-[#2C150F] hover:text-[#B56E5A] transition-colors"
                >
                  {t.nav.experiences}
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href="/gallery"
                  className={`transition-colors ${
                    isGallery
                      ? 'text-[#B56E5A]'
                      : 'text-[#2C150F] hover:text-[#B56E5A]'
                  }`}
                >
                  {t.nav.gallery}
                </Link>
                <Link
                  href="/#directions"
                  className="text-[#2C150F] hover:text-[#B56E5A] transition-colors"
                >
                  {t.nav.directions}
                </Link>
                <Link
                  href="/#packages"
                  className="text-[#2C150F] hover:text-[#B56E5A] transition-colors"
                >
                  {t.nav.packages}
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Mơ */}
          <div className="lg:col-span-3 flex flex-col items-start gap-4">
            <p className="text-[12px] font-normal uppercase tracking-wider text-[#8A6F5C]">
              {locale === 'en' ? 'CONTACT MƠ' : 'LIÊN HỆ VỚI MƠ'}
            </p>
            <a
              href="tel:0964863838"
              className="text-[20px] font-medium text-[#2C150F] hover:text-[#B56E5A] transition-colors"
            >
              0964 863 838
            </a>
            <div className="flex items-center gap-6 text-[14px] text-[#2C150F]">
              <a
                href="https://www.facebook.com/movillage.hoabinh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B56E5A] transition-colors flex items-center gap-1"
              >
                Facebook
                <span className="text-[11px] opacity-70">↗</span>
              </a>
              <a
                href="https://zalo.me/0964863838"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B56E5A] transition-colors flex items-center gap-1"
              >
                Zalo
                <span className="text-[11px] opacity-70">↗</span>
              </a>
            </div>
            <p className="text-[14px] leading-[175%] text-[#705F55] mt-1">
              {locale === 'en'
                ? 'Open for guests year-round'
                : 'Mở cửa đón khách quanh năm'}
            </p>
          </div>
        </div>

        {/* Footer signature / copyright */}
        <div className="border-t border-[#D3D8D3] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px]">
          <p className="text-[#705F55]">
            © 2026 Mơ Village. {locale === 'en' ? 'All rights reserved.' : 'Mọi quyền được bảo lưu.'}
          </p>
          <p className="text-[#8A6F5C]">
            {locale === 'en'
              ? 'Touch nature, remember our authentic spirit.'
              : 'Chạm vào thiên nhiên, ghi nhớ màu bản sắc.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
