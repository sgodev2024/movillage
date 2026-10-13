'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { RoomsSection } from '@/components/RoomsSection';
import { BookingModal } from '@/components/BookingModal';
import { Header } from '@/components/Header';
import { NearbyJourneys } from '@/components/NearbyJourneys';
import { CheckInSection } from '@/components/CheckInSection';
import { DirectionsSection } from '@/components/DirectionsSection';
import Link from 'next/link';

export default function Home() {
  const { locale, toggleLocale, t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingRoomName, setBookingRoomName] = useState<string | undefined>(undefined);

  const handleOpenBooking = (roomName?: string) => {
    setBookingRoomName(roomName);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    /* ---------- FAQ accordion ---------- */
    const faqBtns = document.querySelectorAll('.faq-trigger');
    const handleFaqClick = function (this: HTMLButtonElement) {
      const item = this.closest('.faq-item') as HTMLElement | null;
      if (!item) return;
      const panel = item.querySelector('.faq-panel') as HTMLElement | null;
      const sign = item.querySelector('.faq-sign');
      const isOpen = item.classList.contains('is-open');

      // close others
      document.querySelectorAll('.faq-item.is-open').forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          const p = other.querySelector('.faq-panel') as HTMLElement | null;
          const s = other.querySelector('.faq-sign');
          if (p) {
            p.style.height = '0px';
            p.style.opacity = '0';
          }
          if (s) s.textContent = '+';
        }
      });

      if (panel) {
        if (isOpen) {
          item.classList.remove('is-open');
          panel.style.height = '0px';
          panel.style.opacity = '0';
          if (sign) sign.textContent = '+';
        } else {
          item.classList.add('is-open');
          panel.style.height = panel.scrollHeight + 'px';
          panel.style.opacity = '1';
          if (sign) sign.textContent = '+';
        }
      }
    };

    faqBtns.forEach((btn) => {
      btn.addEventListener('click', handleFaqClick as EventListener);
    });

    /* ---------- Scroll reveal ---------- */
    const reveals = document.querySelectorAll('[data-reveal]');
    reveals.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.classList.add('reveal');
      htmlEl.style.transition = 'opacity .6s cubic-bezier(.4,0,.2,1), transform .6s cubic-bezier(.4,0,.2,1)';
    });

    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              el.style.opacity = '1';
              el.style.transform = 'none';
              io?.unobserve(el);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
      );

      reveals.forEach((el, i) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
        io?.observe(el);
      });
    } else {
      reveals.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'none';
      });
    }

    /* ---------- Floating buttons show on scroll ---------- */
    const fab = document.getElementById('fab-stack');
    const toTop = document.getElementById('to-top');

    const onScroll = () => {
      if (!fab) return;
      if (window.scrollY > 300) {
        fab.classList.remove('opacity-0', 'translate-y-16', 'pointer-events-none');
      } else {
        fab.classList.add('opacity-0', 'translate-y-16', 'pointer-events-none');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const handleToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (toTop) {
      toTop.addEventListener('click', handleToTop);
    }

    return () => {
      faqBtns.forEach((btn) => {
        btn.removeEventListener('click', handleFaqClick as EventListener);
      });
      window.removeEventListener('scroll', onScroll);
      if (toTop) toTop.removeEventListener('click', handleToTop);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <>
      <Header
        onOpenBooking={() => handleOpenBooking()}
        currentPath="/"
        position="fixed"
      />

<main id="top">
  {/*  HERO  */}
  <section className="relative h-screen w-full overflow-hidden">
    <img alt="Mơ Village misty lake at dawn" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/hero-poster.jpg" />
    <video className="absolute inset-0 h-full w-full object-cover" poster="/assets/img/hero-poster.jpg" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
      <source src="/assets/video/hero-lake-dawn-4k.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-b from-espresso/20 via-transparent to-espresso/40"></div>
    <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
      <div className="max-w-4xl">
        <div className="relative w-[33.8rem] h-[15.2rem] sm:w-[50.7rem] sm:h-[20.3rem] lg:w-[60.8rem] lg:h-[25.4rem] mx-auto mb-6">
          <img alt="Mơ Village" className="object-contain drop-shadow-2xl" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/logo-stacked.svg" />
        </div>
        <p className="text-body-lg sm:text-body-2xl lg:text-display-sm mb-6 text-warm-paper drop-shadow max-w-2xl mx-auto px-4">{t.hero.title}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4">
          <a href="#booking" onClick={(e) => { e.preventDefault(); handleOpenBooking(); }} className="bg-terracotta hover:bg-terracotta/90 text-warm-paper px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-ui-sm sm:text-ui-base transition-colors w-auto cursor-pointer">{t.hero.ctaPrimary}</a>
          <a href="#rooms" className="bg-warm-paper/20 backdrop-blur-sm hover:bg-warm-paper/30 text-warm-paper px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-ui-sm sm:text-ui-base transition-colors border border-warm-paper/30 w-auto">{t.hero.ctaSecondary}</a>
        </div>
      </div>
    </div>
  </section>

  {/*  STORY  */}
  <section id="story" className="py-16 md:py-24 bg-white bg-warm-paper">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
        <p className="text-body-sm uppercase tracking-wide text-stilt-timber mb-4">{t.story.tagline}</p>
        <h2 className="text-display-lg text-espresso mb-6">{t.story.title}</h2>
        <p className="text-body-lg text-espresso/80 mb-12 max-w-3xl">{t.story.lead}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="flex flex-col gap-6" data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <img alt="Hồ Hòa Bình" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/campus-dji0135.webp" />
          </div>
          <div>
            <h3 className="text-display-sm text-espresso mb-4">{t.story.cards[0].title}</h3>
            <p className="text-body-base text-espresso/90">{t.story.cards[0].desc}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6" data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <img alt="Đà Bắc - Hòa Bình" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/campus-dji0107.webp" />
          </div>
          <div>
            <h3 className="text-display-sm text-espresso mb-4">{t.story.cards[1].title}</h3>
            <p className="text-body-base text-espresso/90">{t.story.cards[1].desc}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6" data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <img alt="Kiến trúc nhà sàn" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/nh-mn-img2934.webp" />
          </div>
          <div>
            <h3 className="text-display-sm text-espresso mb-4">{t.story.cards[2].title}</h3>
            <p className="text-body-base text-espresso/90">{t.story.cards[2].desc}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ROOMS  */}
  <RoomsSection onOpenBooking={handleOpenBooking} />

  {/*  NEARBY JOURNEYS  */}
  <NearbyJourneys />

  <CheckInSection />

  {/*  GALLERY  */}
  <section id="gallery" className="py-16 md:py-24 bg-white bg-soft-sand">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-display-lg font-bold text-espresso mb-12">{t.gallery.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0]" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 1" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/campus-dji0135.webp" /></div>
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0]" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 2" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/nh-sang.webp" /></div>
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0]" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 3" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/be-suc-dji0124.webp" /></div>
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0]" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 4" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/restaurant-dsc05377.webp" /></div>
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0] col-span-2" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 5" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/phong-xong-img2969.webp" /></div>
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0]" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 6" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/nh-mn-img2934.webp" /></div>
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0] row-span-2" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 7" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/cafe-img0850.webp" /></div>
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0]" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 8" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/giai-tri-tren-ho-img4621.webp" /></div>
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0]" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 9" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/nh-mt-img2947.webp" /></div>
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0]" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 10" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/campus-dji0107.webp" /></div>
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0]" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 11" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/ngam-bon-img4506.webp" /></div>
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0]" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 12" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/nh-o-img2981.webp" /></div>
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0]" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 13" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/facility-img2970.webp" /></div>
        <div className="relative rounded-lg overflow-hidden bg-[#D4C4B0]" data-reveal style={{"opacity":"0","transform":"scale(0.95)"}}><img alt="Gallery image 14" className="object-cover hover:scale-105 transition-transform duration-500" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/facility-a7309145.webp" /></div>
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-terracotta hover:bg-terracotta/90 text-warm-paper rounded-lg font-medium text-ui-base transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <span>{locale === 'en' ? 'Explore Full Photo Gallery' : 'Khám phá Thư viện ảnh đầy đủ'}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </div>
  </section>

  {/*  DIRECTIONS  */}
  <DirectionsSection />

  {/*  PACKAGES  */}
  <section id="packages" className="py-16 md:py-24 bg-white bg-warm-paper">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div data-reveal>
        <p className="text-body-sm uppercase tracking-wide text-bamboo-shoot mb-4">
          {t.packages.tagline}
        </p>
        <h2 className="text-display-lg font-bold text-espresso mb-12">
          {t.packages.title}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" data-reveal>

        {/* Card 1: 2 days 1 night */}
        <div
          onClick={() => handleOpenBooking(t.packages.items[0].title)}
          className="rounded-lg p-6 relative overflow-hidden bg-warm-paper border-2 border-stilt-timber/20 hover:border-stilt-timber/40 hover:shadow-2xl transition-all duration-500 group flex flex-col cursor-pointer"
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom right, rgba(154, 164, 135, 0.05), transparent, rgba(138, 111, 92, 0.1))' }}
          ></div>
          <div className="absolute top-6 right-6">
            <div className="px-4 py-1.5 bg-bamboo-shoot rounded-full shadow-lg">
              <span className="text-body-sm font-semibold text-warm-paper uppercase tracking-wide">
                {t.packages.items[0].badge}
              </span>
            </div>
          </div>
          <div className="relative p-10 pt-20 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-display-sm text-espresso mb-1 font-display">
                  {t.packages.items[0].title}
                </h3>
                <p className="text-body-sm text-stilt-timber uppercase tracking-wider">
                  {t.packages.items[0].subtitle}
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-bamboo-shoot/10 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🌲</span>
              </div>
            </div>
            <div className="mb-8 pb-6 border-b-2 border-bamboo-shoot/20">
              <p className="text-body-2xl text-terracotta font-bold">
                {locale === 'en' ? 'From 1,800,000đ/person' : 'Từ 1.800.000đ/người'}
              </p>
            </div>
            <ul className="space-y-4 flex-1">
              {t.packages.items[0].features.map((feat: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-bamboo-shoot flex items-center justify-center flex-shrink-0">
                    <span className="text-warm-paper text-xs">✓</span>
                  </div>
                  <span className="text-body-base text-espresso/90 leading-relaxed">
                    {feat}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="h-1.5"
            style={{ background: 'linear-gradient(to right, #9aa487, #8a6f5c, #9aa487)' }}
          ></div>
        </div>

        {/* Card 2: 3 days 2 nights */}
        <div
          onClick={() => handleOpenBooking(t.packages.items[1].title)}
          className="rounded-lg p-6 relative overflow-hidden text-warm-paper hover:shadow-2xl transition-all duration-500 group border-2 border-apricot-blossom/30 flex flex-col cursor-pointer"
          style={{
            backgroundColor: '#2c150f',
            backgroundImage: 'linear-gradient(to bottom right, #2c150f, #2c150f, rgba(44, 21, 15, 0.95))'
          }}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-terracotta/15 rounded-bl-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-apricot-blossom/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-6 right-6">
            <div className="px-4 py-1.5 bg-terracotta rounded-full shadow-lg">
              <span className="text-body-sm font-semibold text-warm-paper uppercase tracking-wide">
                {t.packages.items[1].badge}
              </span>
            </div>
          </div>
          <div className="relative p-10 pt-20 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-display-sm text-warm-paper mb-1 font-display">
                  {t.packages.items[1].title}
                </h3>
                <p className="text-body-sm text-apricot-blossom uppercase tracking-wider">
                  {t.packages.items[1].subtitle}
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-apricot-blossom/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">✨</span>
              </div>
            </div>
            <div className="mb-8 pb-6 border-b-2 border-apricot-blossom/30">
              <p className="text-body-2xl text-apricot-blossom font-bold">
                {locale === 'en' ? 'From 3,200,000đ/person' : 'Từ 3.200.000đ/người'}
              </p>
            </div>
            <ul className="space-y-4 flex-1">
              {t.packages.items[1].features.map((feat: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-apricot-blossom flex items-center justify-center flex-shrink-0">
                    <span className="text-espresso text-xs font-bold">✓</span>
                  </div>
                  <span className="text-body-base text-warm-paper/95 leading-relaxed">
                    {feat}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="h-1.5"
            style={{ background: 'linear-gradient(to right, #d8c1bc, #b56e5a, #d8c1bc)' }}
          ></div>
        </div>

      </div>
    </div>
  </section>

  {/*  BOOKING  */}
  <section id="booking" className="py-16 md:py-24 bg-white relative min-h-[500px] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img alt="Mơ Village" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/campus-dji0135.webp" />
      <div className="absolute inset-0 bg-espresso/40"></div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-3xl mx-auto" data-reveal style={{"opacity":"0","transform":"translateY(30px)"}}>
        <p className="text-body-sm uppercase tracking-[0.2em] text-apricot-blossom mb-4">{t.booking.tagline}</p>
        <h2 className="text-display-xl font-bold text-warm-paper mb-6 leading-tight">{t.booking.title}</h2>
        <p className="text-body-lg text-warm-paper/90 mb-8 leading-relaxed">{t.booking.sub}</p>
        <button onClick={() => handleOpenBooking()} className="px-6 py-3 rounded-lg font-medium transition-colors bg-terracotta hover:bg-terracotta/90 text-warm-paper px-12 py-4 cursor-pointer">{t.nav.bookNow}</button>
      </div>
    </div>
  </section>

  {/*  FLOATING CONTACT  */}
  <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-40 transition-all duration-300 opacity-0 translate-y-16 pointer-events-none" id="fab-stack">
    <a href="tel:+84964863838" className="w-14 h-14 bg-[#B8956A] hover:bg-[#8B7355] rounded-full shadow-2xl transition-colors flex items-center justify-center overflow-hidden" aria-label="Phone">
      <img src="/assets/img/icon-phone.webp" alt="Phone" className="w-[110%] h-[110%] object-cover" />
    </a>
    <a href="https://www.facebook.com/movillage.hoabinh" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#B8956A] hover:bg-[#8B7355] rounded-full shadow-2xl transition-colors flex items-center justify-center overflow-hidden" aria-label="Facebook">
      <img src="/assets/img/icon-facebook.webp" alt="Facebook" className="w-[120%] h-[120%] object-cover" />
    </a>
    <a href="https://zalo.me/0964863838" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#B8956A] hover:bg-[#8B7355] rounded-full shadow-2xl transition-colors flex items-center justify-center overflow-hidden" aria-label="Zalo">
      <img src="/assets/img/icon-zalo.webp" alt="Zalo" className="w-full h-full object-cover" />
    </a>
    <button className="w-14 h-14 bg-[#B8956A] hover:bg-[#8B7355] text-[#1F1611] rounded-full shadow-2xl transition-colors flex items-center justify-center" id="to-top" aria-label="Scroll to top">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </button>
  </div>

  {/* BOOKING MODAL */}
  <BookingModal
    isOpen={isBookingOpen}
    onClose={() => setIsBookingOpen(false)}
    preselectedOption={bookingRoomName}
  />
</main>
    </>
  );
}
