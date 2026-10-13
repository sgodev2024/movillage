'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ExploreMenu } from './ExploreMenu';

interface HeaderProps {
  onOpenBooking?: () => void;
  currentPath?: string;
  position?: 'fixed' | 'sticky';
}

export function Header({
  onOpenBooking,
  currentPath = '/',
  position = 'fixed',
}: HeaderProps) {
  const { locale, toggleLocale, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = currentPath === '/';
  const isGallery = currentPath === '/gallery' || currentPath === '/thu-vien-anh';

  const getSectionHref = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <nav
      className={`${
        position === 'fixed' ? 'fixed top-0' : 'sticky top-0'
      } w-full bg-warm-paper/95 backdrop-blur-sm z-50 border-b border-karst-mist`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            className="relative h-12 w-48 block"
            href={isHome ? '#top' : '/'}
            aria-label="Mơ Village"
          >
            <img
              alt="Mơ Village"
              className="object-contain object-left absolute inset-0 w-full h-full"
              src="/assets/img/logo-horizontal.svg"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              className="text-espresso hover:text-stilt-timber transition-colors"
              href={getSectionHref('#story')}
            >
              {t.nav.story}
            </Link>
            <ExploreMenu isHome={isHome} />
            <Link
              className="text-espresso hover:text-stilt-timber transition-colors"
              href={getSectionHref('#nearby')}
            >
              {t.nav.experiences}
            </Link>
            <Link
              className={`transition-colors ${
                isGallery
                  ? 'text-terracotta'
                  : 'text-espresso hover:text-stilt-timber'
              }`}
              href="/gallery"
            >
              {t.nav.gallery}
            </Link>
            <Link
              className="text-espresso hover:text-stilt-timber transition-colors"
              href={getSectionHref('#directions')}
            >
              {t.nav.directions}
            </Link>
            <Link
              className="text-espresso hover:text-stilt-timber transition-colors"
              href={getSectionHref('#packages')}
            >
              {t.nav.packages}
            </Link>

            {/* CTA Button */}
            <button
              className="bg-terracotta hover:bg-terracotta/90 text-warm-paper px-6 py-2 rounded-lg transition-colors cursor-pointer"
              onClick={() => onOpenBooking?.()}
            >
              {t.nav.bookNow}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-soft-sand transition-colors cursor-pointer"
              aria-label="Change language"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,187a113.4,113.4,0,0,1-20.39-35h40.82a116.94,116.94,0,0,1-10,20.77A108.61,108.61,0,0,1,128,207Zm-26.49-59a135.42,135.42,0,0,1,0-40h53a135.42,135.42,0,0,1,0,40ZM44,128a83.49,83.49,0,0,1,2.43-20H77.25a160.63,160.63,0,0,0,0,40H46.43A83.49,83.49,0,0,1,44,128Zm84-79a113.4,113.4,0,0,1,20.39,35H107.59a116.94,116.94,0,0,1,10-20.77A108.61,108.61,0,0,1,128,49Zm50.73,59h30.82a83.52,83.52,0,0,1,0,40H178.75a160.63,160.63,0,0,0,0-40Zm20.77-24H173.71a140.82,140.82,0,0,0-15.5-34.36A84.51,84.51,0,0,1,199.52,84ZM97.79,49.64A140.82,140.82,0,0,0,82.29,84H56.48A84.51,84.51,0,0,1,97.79,49.64ZM56.48,172H82.29a140.82,140.82,0,0,0,15.5,34.36A84.51,84.51,0,0,1,56.48,172Zm101.73,34.36A140.82,140.82,0,0,0,173.71,172h25.81A84.51,84.51,0,0,1,158.21,206.36Z" />
              </svg>
              <span className="text-sm font-semibold uppercase">{locale}</span>
            </button>
          </div>

          {/* Mobile menu hamburger toggle */}
          <button
            className="md:hidden p-2 text-espresso"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`mobile-menu md:hidden bg-warm-paper border-t border-karst-mist ${
          isMobileMenuOpen ? 'is-open' : ''
        }`}
        id="mobile-menu"
      >
        <Link href={getSectionHref('#story')} onClick={() => setIsMobileMenuOpen(false)}>
          {t.nav.story}
        </Link>
        {isMobileMenuOpen && <ExploreMenu isHome={isHome} mobile onNavigate={() => setIsMobileMenuOpen(false)} />}
        <Link href={getSectionHref('#nearby')} onClick={() => setIsMobileMenuOpen(false)}>
          {t.nav.experiences}
        </Link>
        <Link
          href="/gallery"
          onClick={() => setIsMobileMenuOpen(false)}
          className={isGallery ? 'text-terracotta' : ''}
        >
          {t.nav.gallery}
        </Link>
        <Link href={getSectionHref('#directions')} onClick={() => setIsMobileMenuOpen(false)}>
          {t.nav.directions}
        </Link>
        <Link href={getSectionHref('#packages')} onClick={() => setIsMobileMenuOpen(false)}>
          {t.nav.packages}
        </Link>
        <a
          href="#booking"
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            onOpenBooking?.();
          }}
        >
          {t.nav.bookNow}
        </a>
        <button
          onClick={() => {
            toggleLocale();
          }}
          className="text-left px-6 py-3 border-t border-karst-mist flex items-center justify-between text-espresso hover:bg-[#ede4d8] text-sm font-semibold uppercase cursor-pointer"
        >
          <span>{locale === 'vi' ? 'Ngôn ngữ: Tiếng Việt' : 'Language: English'}</span>
          <span className="bg-soft-sand px-2 py-0.5 rounded text-xs">{locale.toUpperCase()}</span>
        </button>
      </div>
    </nav>
  );
}
