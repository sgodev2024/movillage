'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { RoomsSection } from '@/components/RoomsSection';
import { BookingModal } from '@/components/BookingModal';

export default function Home() {
  const { locale, toggleLocale } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingRoomName, setBookingRoomName] = useState<string | undefined>(undefined);

  const handleOpenBooking = (roomName?: string) => {
    setBookingRoomName(roomName);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    /* ---------- Mobile menu ---------- */
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');

    const handleToggleClick = () => {
      if (!menu || !toggle) return;
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    };

    const handleMenuClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && menu && toggle) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    };

    if (toggle) toggle.addEventListener('click', handleToggleClick);
    if (menu) menu.addEventListener('click', handleMenuClick);

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
      if (toggle) toggle.removeEventListener('click', handleToggleClick);
      if (menu) menu.removeEventListener('click', handleMenuClick);
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
<nav className="fixed top-0 w-full bg-warm-paper/95 backdrop-blur-sm z-50 border-b border-karst-mist">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <a className="relative h-12 w-48" href="#top" aria-label="Mơ Village">
        <img alt="Mơ Village" className="object-contain object-left" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/logo-horizontal.svg" />
      </a>
      <div className="hidden md:flex items-center gap-8">
        <a className="text-espresso hover:text-stilt-timber transition-colors" href="#story">Câu chuyện</a>
        <a className="text-espresso hover:text-stilt-timber transition-colors" href="#rooms">Phòng nghỉ</a>
        <a className="text-espresso hover:text-stilt-timber transition-colors" href="#experiences">Trải nghiệm</a>
        <a className="text-espresso hover:text-stilt-timber transition-colors" href="#gallery">Thư viện</a>
        <a className="text-espresso hover:text-stilt-timber transition-colors" href="#directions">Đường đến Mơ</a>
        <a className="text-espresso hover:text-stilt-timber transition-colors" href="#packages">Gói dịch vụ</a>
        <button className="bg-terracotta hover:bg-terracotta/90 text-warm-paper px-6 py-2 rounded-lg transition-colors cursor-pointer" onClick={() => handleOpenBooking()}>Đặt chỗ nghỉ</button>
        <button onClick={toggleLocale} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-soft-sand transition-colors cursor-pointer" aria-label="Change language">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,187a113.4,113.4,0,0,1-20.39-35h40.82a116.94,116.94,0,0,1-10,20.77A108.61,108.61,0,0,1,128,207Zm-26.49-59a135.42,135.42,0,0,1,0-40h53a135.42,135.42,0,0,1,0,40ZM44,128a83.49,83.49,0,0,1,2.43-20H77.25a160.63,160.63,0,0,0,0,40H46.43A83.49,83.49,0,0,1,44,128Zm84-79a113.4,113.4,0,0,1,20.39,35H107.59a116.94,116.94,0,0,1,10-20.77A108.61,108.61,0,0,1,128,49Zm50.73,59h30.82a83.52,83.52,0,0,1,0,40H178.75a160.63,160.63,0,0,0,0-40Zm20.77-24H173.71a140.82,140.82,0,0,0-15.5-34.36A84.51,84.51,0,0,1,199.52,84ZM97.79,49.64A140.82,140.82,0,0,0,82.29,84H56.48A84.51,84.51,0,0,1,97.79,49.64ZM56.48,172H82.29a140.82,140.82,0,0,0,15.5,34.36A84.51,84.51,0,0,1,56.48,172Zm101.73,34.36A140.82,140.82,0,0,0,173.71,172h25.81A84.51,84.51,0,0,1,158.21,206.36Z"></path></svg>
          <span className="text-sm font-semibold uppercase">{locale}</span>
        </button>
      </div>
      <button className="md:hidden p-2 text-espresso" id="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
      </button>
    </div>
  </div>
  <div className="mobile-menu md:hidden bg-warm-paper border-t border-karst-mist" id="mobile-menu">
    <a href="#story">Câu chuyện</a>
    <a href="#rooms">Phòng nghỉ</a>
    <a href="#experiences">Trải nghiệm</a>
    <a href="#gallery">Thư viện</a>
    <a href="#directions">Đường đến Mơ</a>
    <a href="#packages">Gói dịch vụ</a>
    <a href="#booking" onClick={(e) => { e.preventDefault(); handleOpenBooking(); }}>Đặt chỗ nghỉ</a>
  </div>
</nav>

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
        <p className="text-body-lg sm:text-body-2xl lg:text-display-sm mb-6 text-warm-paper drop-shadow max-w-2xl mx-auto px-4">Một giấc mơ dịu trên mặt hồ Hòa Bình</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4">
          <button onClick={() => handleOpenBooking()} className="bg-terracotta hover:bg-terracotta/90 text-warm-paper px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-ui-sm sm:text-ui-base transition-colors w-auto cursor-pointer">Đặt chỗ nghỉ của bạn</button>
          <a href="#rooms" className="bg-warm-paper/20 backdrop-blur-sm hover:bg-warm-paper/30 text-warm-paper px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-ui-sm sm:text-ui-base transition-colors border border-warm-paper/30 w-auto">Xem phòng</a>
        </div>
      </div>
    </div>
  </section>

  {/*  STORY  */}
  <section id="story" className="py-16 md:py-24 bg-white bg-warm-paper">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
        <p className="text-body-sm uppercase tracking-wide text-stilt-timber mb-4">Chuyện của Mơ</p>
        <h2 className="text-display-lg text-espresso mb-6">Một giấc mơ dịu trên mặt hồ Hòa Bình</h2>
        <p className="text-body-lg text-espresso/80 mb-12 max-w-3xl">Mơ Village là khu nghỉ dưỡng ven hồ kết hợp sự bình yên của nước, sương mù, rừng cây với sự ấm áp của kiến trúc nhà sàn Mường. Một nơi hiện đại, nhẹ nhàng kỳ ảo để nghỉ ngơi, kết nối và khám phá.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="flex flex-col gap-6" data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <img alt="Hồ Hòa Bình" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/campus-dji0135.webp" />
          </div>
          <div>
            <h3 className="text-display-sm text-espresso mb-4">Hồ Hòa Bình</h3>
            <p className="text-body-base text-espresso/90">Hồ nhân tạo lớn nhất Việt Nam, hình thành từ đập thủy điện Hòa Bình năm 1994. Diện tích 230 km², sâu tới 40m, với cảnh sương mù huyền ảo vào buổi sáng.</p>
          </div>
        </div>
        <div className="flex flex-col gap-6" data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <img alt="Đà Bắc - Hòa Bình" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/campus-dji0107.webp" />
          </div>
          <div>
            <h3 className="text-display-sm text-espresso mb-4">Đà Bắc - Hòa Bình</h3>
            <p className="text-body-base text-espresso/90">Cách Hà Nội 100km (2 giờ lái xe). Vùng đất của người Mường với văn hóa truyền thống đậm đà. Khí hậu mát mẻ quanh năm, nhiều thác nước và hang động.</p>
          </div>
        </div>
        <div className="flex flex-col gap-6" data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <img alt="Kiến trúc nhà sàn" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/nh-mn-img2934.webp" />
          </div>
          <div>
            <h3 className="text-display-sm text-espresso mb-4">Kiến trúc nhà sàn</h3>
            <p className="text-body-base text-espresso/90">Lấy cảm hứng từ nhà sàn truyền thống Mường với cột gỗ, mái lợp tranh, và không gian thoáng. Kết hợp hài hòa giữa di sản văn hóa và tiện nghi hiện đại.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ROOMS  */}
  <RoomsSection onOpenBooking={handleOpenBooking} />

  {/*  EXPERIENCES  */}
  <section id="experiences" className="relative min-h-screen py-24">
    <div className="absolute inset-0 -z-10">
      <img alt="Kayaking on Hòa Bình Lake" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/cho-thuyen-kayak.webp" />
      <video className="absolute inset-0 h-full w-full object-cover" poster="/assets/img/cho-thuyen-kayak.webp" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
        <source src="/assets/video/kayak-lake.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-espresso/50"></div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mb-16 text-center mx-auto" data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
        <div className="relative w-48 h-48 mx-auto mb-8">
          <img alt="Mơ Village" className="object-contain" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/logo-reversed-white.svg" />
        </div>
        <p className="text-body-sm uppercase tracking-wide mb-4 text-apricot-blossom">Trải nghiệm</p>
        <h2 className="text-display-lg text-warm-paper mb-6">Khám phá và tận hưởng</h2>
        <p className="text-body-base text-warm-paper/90">Từ hoạt động phiêu lưu đến workshop nghệ thuật, mỗi trải nghiệm là một kỷ niệm</p>
      </div>

      <div className="mb-16">
        <h3 className="text-display-sm text-warm-paper mb-8">Hoạt động tại Mơ</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
            <div className="bg-warm-paper rounded-lg p-6 overflow-hidden bg-warm-paper/95 backdrop-blur-sm h-full flex flex-col">
              <div className="relative aspect-[16/10]"><img alt="Bể sục Onsen 4 mùa" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/be-suc-dji0124.webp" /></div>
              <div className="p-5 flex-1 flex flex-col"><h4 className="text-body-lg font-semibold text-espresso mb-2">Bể sục Onsen 4 mùa</h4><p className="text-body-base text-espresso/90">Thư giãn trong bể sục nước nóng tự nhiên giữa không gian núi rừng</p></div>
            </div>
          </div>
          <div data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
            <div className="bg-warm-paper rounded-lg p-6 overflow-hidden bg-warm-paper/95 backdrop-blur-sm h-full flex flex-col">
              <div className="relative aspect-[16/10]"><img alt="Phòng xông ướt, xông khô" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/phong-xong-img2969.webp" /></div>
              <div className="p-5 flex-1 flex flex-col"><h4 className="text-body-lg font-semibold text-espresso mb-2">Phòng xông ướt, xông khô</h4><p className="text-body-base text-espresso/90">Xông hơi thải độc, làm sạch cơ thể và tâm trí</p></div>
            </div>
          </div>
          <div data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
            <div className="bg-warm-paper rounded-lg p-6 overflow-hidden bg-warm-paper/95 backdrop-blur-sm h-full flex flex-col">
              <div className="relative aspect-[16/10]"><img alt="Ngâm bồn thuốc thảo dược" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/ngam-bon-img4506.webp" /></div>
              <div className="p-5 flex-1 flex flex-col"><h4 className="text-body-lg font-semibold text-espresso mb-2">Ngâm bồn thuốc thảo dược</h4><p className="text-body-base text-espresso/90">Ngâm mình trong các loại thảo dược thiên nhiên, phục hồi năng lượng</p></div>
            </div>
          </div>
          <div data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
            <div className="bg-warm-paper rounded-lg p-6 overflow-hidden bg-warm-paper/95 backdrop-blur-sm h-full flex flex-col">
              <div className="relative aspect-[16/10]"><img alt="Giải trí trên hồ" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/giai-tri-tren-ho-img4621.webp" /></div>
              <div className="p-5 flex-1 flex flex-col"><h4 className="text-body-lg font-semibold text-espresso mb-2">Giải trí trên hồ</h4><p className="text-body-base text-espresso/90">Kayak, cano, câu cá - khám phá hồ Hòa Bình bằng nhiều cách</p></div>
            </div>
          </div>
          <div data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
            <div className="bg-warm-paper rounded-lg p-6 overflow-hidden bg-warm-paper/95 backdrop-blur-sm h-full flex flex-col">
              <div className="relative aspect-[16/10]"><img alt="Tour thuyền thăm quan" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/tour-thuyen-dji0157.webp" /></div>
              <div className="p-5 flex-1 flex flex-col"><h4 className="text-body-lg font-semibold text-espresso mb-2">Tour thuyền thăm quan</h4><p className="text-body-base text-espresso/90">Du thuyền ngắm hoàng hôn, ghé thăm làng nổi và làng cá</p></div>
            </div>
          </div>
          <div data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
            <div className="bg-warm-paper rounded-lg p-6 overflow-hidden bg-warm-paper/95 backdrop-blur-sm h-full flex flex-col">
              <div className="relative aspect-[16/10]"><img alt="Team Building" className="object-cover" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0"}} src="/assets/img/team-building-dji0111.webp" /></div>
              <div className="p-5 flex-1 flex flex-col"><h4 className="text-body-lg font-semibold text-espresso mb-2">Team Building</h4><p className="text-body-base text-espresso/90">Tổ chức team building cho công ty và nhóm lớn với hoạt động ngoài trời và không gian riêng tư</p></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-display-sm text-warm-paper mb-8">Workshop & văn hóa</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-warm-paper/95 backdrop-blur-sm rounded-lg h-full flex flex-col" data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}><h4 className="text-body-lg font-semibold text-espresso mb-2">Cắm hoa</h4><p className="text-body-base text-espresso/90">Workshop cắm hoa phong cách tự nhiên với hoa địa phương, thể hiện vẻ đẹp giản dị của núi rừng Hòa Bình</p></div>
          <div className="p-6 bg-warm-paper/95 backdrop-blur-sm rounded-lg h-full flex flex-col" data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}><h4 className="text-body-lg font-semibold text-espresso mb-2">Làm bánh</h4><p className="text-body-base text-espresso/90">Học làm bánh truyền thống Mường như bánh dày, cốm, và các món bánh hiện đại từ nguyên liệu địa phương</p></div>
          <div className="p-6 bg-warm-paper/95 backdrop-blur-sm rounded-lg h-full flex flex-col" data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}><h4 className="text-body-lg font-semibold text-espresso mb-2">Thủ công</h4><p className="text-body-base text-espresso/90">Dệt thổ cẩm Mường với họa tiết truyền thống, làm đồ gỗ, và học các nghề thủ công từ người dân bản địa</p></div>
        </div>
      </div>

      <div className="mt-16" data-reveal style={{"opacity":"0","transform":"translateY(20px)"}}>
        <h3 className="text-display-sm text-warm-paper mb-8">Điểm đến lân cận</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-warm-paper/95 backdrop-blur-sm rounded-lg h-full flex flex-col"><h4 className="text-body-lg font-semibold text-espresso mb-2">Chúa Thác Bờ</h4><p className="text-body-base text-espresso/90 mb-3 flex-1">Thác nước hùng vĩ cao 300m với cảnh quan tráng lệ, nơi du khách có thể chiêm ngưỡng thiên nhiên hoang sơ và chụp ảnh check-in đẹp mắt</p><p className="text-body-sm text-stilt-timber">15km</p></div>
          <div className="p-6 bg-warm-paper/95 backdrop-blur-sm rounded-lg h-full flex flex-col"><h4 className="text-body-lg font-semibold text-espresso mb-2">Suối Ké</h4><p className="text-body-base text-espresso/90 mb-3 flex-1">Suối đá tự nhiên trong vắt với dòng nước mát lạnh quanh năm, nơi lý tưởng để tắm mát và thư giãn giữa thiên nhiên</p><p className="text-body-sm text-stilt-timber">8km</p></div>
          <div className="p-6 bg-warm-paper/95 backdrop-blur-sm rounded-lg h-full flex flex-col"><h4 className="text-body-lg font-semibold text-espresso mb-2">Hang Lỗ Làn</h4><p className="text-body-base text-espresso/90 mb-3 flex-1">Hang động tự nhiên với nhũ đá hình thành hàng nghìn năm, một kỳ quan địa chất độc đáo của vùng núi đá vôi Hòa Bình</p><p className="text-body-sm text-stilt-timber">12km</p></div>
          <div className="p-6 bg-warm-paper/95 backdrop-blur-sm rounded-lg h-full flex flex-col"><h4 className="text-body-lg font-semibold text-espresso mb-2">Bản Sưng</h4><p className="text-body-base text-espresso/90 mb-3 flex-1">Bản làng Mường truyền thống giữ gìn văn hóa bản địa, nơi bạn có thể trải nghiệm lối sống, trang phục và ẩm thực của người Mường</p><p className="text-body-sm text-stilt-timber">10km</p></div>
        </div>
      </div>
    </div>
  </section>

  {/*  GALLERY  */}
  <section id="gallery" className="py-16 md:py-24 bg-white bg-soft-sand">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-display-lg font-bold text-espresso mb-12">Thư viện ảnh</h2>
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
    </div>
  </section>

  {/*  DIRECTIONS  */}
  <section id="directions" className="relative py-16 md:py-24" style={{"backgroundImage":"url(/assets/img/map-background.png)","backgroundSize":"cover","backgroundPosition":"center -100px","backgroundRepeat":"no-repeat"}}>
    <div className="absolute inset-0 bg-espresso/60"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-display-lg text-warm-paper mb-6">Đường đến Mơ</h2>
          <p className="text-body-lg text-warm-paper/90 mb-4">Rời phố một chút. Chạm hồ thật gần.</p>
        </div>
        <div className="space-y-4 mb-12" id="faq">
          <div className="border-b-2 border-warm-paper/20 faq-item">
            <button className="faq-trigger w-full py-6 flex items-center justify-between text-left hover:bg-warm-paper/10 transition-colors px-4 rounded-lg">
              <div className="flex items-center gap-4"><span className="text-body-lg font-semibold text-terracotta">01</span><span className="text-body-lg font-semibold text-warm-paper">Mơ cách Hà Nội bao xa?</span></div>
              <span className="text-2xl text-terracotta faq-sign">+</span>
            </button>
            <div className="overflow-hidden faq-panel" style={{"height":"0px","opacity":"0"}}><div className="pb-6 px-4 pl-16"><p className="text-body-base text-warm-paper/90 leading-relaxed">Mơ nằm bên hồ Hòa Bình, tại khu vực Đà Bắc, cách Hà Nội hơn 100 km. Thời gian di chuyển thường khoảng 3–3,5 giờ tùy cung đường và điều kiện giao thông.</p></div></div>
          </div>
          <div className="border-b-2 border-warm-paper/20 faq-item">
            <button className="faq-trigger w-full py-6 flex items-center justify-between text-left hover:bg-warm-paper/10 transition-colors px-4 rounded-lg">
              <div className="flex items-center gap-4"><span className="text-body-lg font-semibold text-terracotta">02</span><span className="text-body-lg font-semibold text-warm-paper">Đến Mơ có thể làm gì?</span></div>
              <span className="text-2xl text-terracotta faq-sign">+</span>
            </button>
            <div className="overflow-hidden faq-panel" style={{"height":"0px","opacity":"0"}}><div className="pb-6 px-4 pl-16"><p className="text-body-base text-warm-paper/90 leading-relaxed">Bạn có thể chèo kayak, bơi giữa núi rừng, thư giãn tại bể sục, xông hơi, đọc sách, câu cá, dùng bữa vị Tây Bắc hoặc đơn giản là dành trọn một ngày không vội.</p></div></div>
          </div>
          <div className="border-b-2 border-warm-paper/20 faq-item">
            <button className="faq-trigger w-full py-6 flex items-center justify-between text-left hover:bg-warm-paper/10 transition-colors px-4 rounded-lg">
              <div className="flex items-center gap-4"><span className="text-body-lg font-semibold text-terracotta">03</span><span className="text-body-lg font-semibold text-warm-paper">Mơ có phù hợp với gia đình và đoàn nhỏ?</span></div>
              <span className="text-2xl text-terracotta faq-sign">+</span>
            </button>
            <div className="overflow-hidden faq-panel" style={{"height":"0px","opacity":"0"}}><div className="pb-6 px-4 pl-16"><p className="text-body-base text-warm-paper/90 leading-relaxed">Có. Mơ có nhiều hạng phòng, khu vui chơi trẻ nhỏ, sân cỏ và không gian chung. Khi nhắn đặt phòng, Mơ sẽ gợi ý cách bố trí phù hợp với số người và độ tuổi.</p></div></div>
          </div>
          <div className="border-b-2 border-warm-paper/20 faq-item">
            <button className="faq-trigger w-full py-6 flex items-center justify-between text-left hover:bg-warm-paper/10 transition-colors px-4 rounded-lg">
              <div className="flex items-center gap-4"><span className="text-body-lg font-semibold text-terracotta">04</span><span className="text-body-lg font-semibold text-warm-paper">Nên đặt phòng trước bao lâu?</span></div>
              <span className="text-2xl text-terracotta faq-sign">+</span>
            </button>
            <div className="overflow-hidden faq-panel" style={{"height":"0px","opacity":"0"}}><div className="pb-6 px-4 pl-16"><p className="text-body-base text-warm-paper/90 leading-relaxed">Với cuối tuần và dịp lễ, bạn nên liên hệ sớm để giữ hạng phòng mong muốn. Giá và ưu đãi thay đổi theo ngày, vì vậy Mơ sẽ báo trực tiếp cho từng kỳ nghỉ.</p></div></div>
          </div>
        </div>
        <div className="mt-12">
          <div className="p-8 bg-warm-paper/95 backdrop-blur-sm rounded-lg">
            <p className="text-body-base text-espresso/80 mb-6">Từ trung tâm Hà Nội, hành trình hơn 100 km đưa bạn qua những triền núi và đường ven hồ. Cung đường đẹp, có đoạn đèo dốc — hãy đi thong thả, Mơ vẫn ở đây chờ.</p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <span className="text-body-lg font-semibold text-espresso">Hà Nội</span>
                <span className="text-bamboo-shoot">→</span>
                <span className="text-body-lg font-semibold text-espresso">Hòa Lạc</span>
                <span className="text-bamboo-shoot">→</span>
                <span className="text-body-lg font-semibold text-espresso">Hòa Bình</span>
                <span className="text-bamboo-shoot">→</span>
                <span className="text-body-lg font-semibold text-terracotta">Xóm Mơ</span>
              </div>
              <a href="https://maps.app.goo.gl/7gk7cRHAvQdimFi39" target="_blank" rel="noopener noreferrer" className="inline-block bg-terracotta hover:bg-terracotta/90 text-warm-paper px-6 py-3 rounded-lg text-ui-base transition-colors whitespace-nowrap">Chỉ đường</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  PACKAGES  */}
  <section id="packages" className="py-16 md:py-24 bg-white bg-warm-paper">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div data-reveal style={{"opacity":"0","transform":"translateY(50px)"}}>
        <p className="text-body-sm uppercase tracking-wide text-bamboo-shoot mb-4">Gói & Dịch vụ</p>
        <h2 className="text-display-lg font-bold text-espresso mb-12">Các gói combo & dịch vụ</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" data-reveal style={{"opacity":"0","transform":"translateY(50px)"}}>

        <div className="bg-warm-paper rounded-lg p-6 relative overflow-hidden bg-soft-sand border-2 border-stilt-timber/20 hover:border-stilt-timber/40 hover:shadow-2xl transition-all duration-500 group flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-bamboo-shoot/5 via-transparent to-stilt-timber/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-6 right-6"><div className="px-4 py-1.5 bg-bamboo-shoot rounded-full shadow-lg"><span className="text-body-sm font-semibold text-warm-paper uppercase tracking-wide">Quick Getaway</span></div></div>
          <div className="relative p-10 pt-20 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-display-sm text-espresso mb-1 font-display">2 ngày 1 đêm</h3>
                <p className="text-body-sm text-stilt-timber uppercase tracking-wider">Weekend Escape</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-bamboo-shoot/10 flex items-center justify-center flex-shrink-0"><span className="text-2xl">🌲</span></div>
            </div>
            <div className="mb-8 pb-6 border-b-2 border-bamboo-shoot/20"><p className="text-body-2xl text-terracotta font-bold">Từ 1.800.000đ/người</p></div>
            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3"><div className="mt-1 w-5 h-5 rounded-full bg-bamboo-shoot flex items-center justify-center flex-shrink-0"><span className="text-warm-paper text-xs">✓</span></div><span className="text-body-base text-espresso/90 leading-relaxed">1 đêm nghỉ + ăn sáng + 1 bữa chính</span></li>
              <li className="flex items-start gap-3"><div className="mt-1 w-5 h-5 rounded-full bg-bamboo-shoot flex items-center justify-center flex-shrink-0"><span className="text-warm-paper text-xs">✓</span></div><span className="text-body-base text-espresso/90 leading-relaxed">Chèo kayak hoặc câu cá + sử dụng hồ bơi, sàn yoga</span></li>
            </ul>
          </div>
          <div className="h-1.5 bg-gradient-to-r from-bamboo-shoot via-stilt-timber to-bamboo-shoot"></div>
        </div>

        <div className="bg-warm-paper rounded-lg p-6 relative overflow-hidden bg-gradient-to-br from-espresso via-espresso to-espresso/95 text-warm-paper hover:shadow-2xl transition-all duration-500 group border-2 border-apricot-blossom/30 flex flex-col">
          <div className="absolute top-0 right-0 w-40 h-40 bg-terracotta/15 rounded-bl-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-apricot-blossom/10 rounded-full blur-3xl"></div>
          <div className="absolute top-6 right-6"><div className="px-4 py-1.5 bg-terracotta rounded-full shadow-lg"><span className="text-body-sm font-semibold text-warm-paper uppercase tracking-wide">Phổ biến</span></div></div>
          <div className="relative p-10 pt-20 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-display-sm text-warm-paper mb-1 font-display">3 ngày 2 đêm</h3>
                <p className="text-body-sm text-apricot-blossom uppercase tracking-wider">Complete Experience</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-apricot-blossom/20 flex items-center justify-center flex-shrink-0"><span className="text-2xl">✨</span></div>
            </div>
            <div className="mb-8 pb-6 border-b-2 border-apricot-blossom/30"><p className="text-body-2xl text-apricot-blossom font-bold">Từ 3.200.000đ/người</p></div>
            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3"><div className="mt-1 w-5 h-5 rounded-full bg-apricot-blossom flex items-center justify-center flex-shrink-0"><span className="text-espresso text-xs font-bold">✓</span></div><span className="text-body-base text-warm-paper/95 leading-relaxed">2 đêm nghỉ + ăn sáng + 2 bữa chính</span></li>
              <li className="flex items-start gap-3"><div className="mt-1 w-5 h-5 rounded-full bg-apricot-blossom flex items-center justify-center flex-shrink-0"><span className="text-espresso text-xs font-bold">✓</span></div><span className="text-body-base text-warm-paper/95 leading-relaxed">Tour thuyền hoàng hôn + 1 workshop (cắm hoa hoặc làm bánh)</span></li>
              <li className="flex items-start gap-3"><div className="mt-1 w-5 h-5 rounded-full bg-apricot-blossom flex items-center justify-center flex-shrink-0"><span className="text-espresso text-xs font-bold">✓</span></div><span className="text-body-base text-warm-paper/95 leading-relaxed">Spa massage 60 phút + sử dụng đầy đủ tiện ích</span></li>
            </ul>
          </div>
          <div className="h-1.5 bg-gradient-to-r from-apricot-blossom via-terracotta to-apricot-blossom"></div>
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
        <p className="text-body-sm uppercase tracking-[0.2em] text-apricot-blossom mb-4">GỬI MỘT LỜI HẸN</p>
        <h2 className="text-display-xl font-bold text-warm-paper mb-6 leading-tight">Cuối tuần này, mình đi Mơ nhé?</h2>
        <p className="text-body-lg text-warm-paper/90 mb-8 leading-relaxed">Chọn ngày, chọn người đồng hành. Phần biên văn chuẩn bị, để Mơ chuẩn bị.</p>
        <button onClick={() => handleOpenBooking()} className="px-6 py-3 rounded-lg font-medium transition-colors bg-terracotta hover:bg-terracotta/90 text-warm-paper px-12 py-4 cursor-pointer">Đặt chỗ nghỉ</button>
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
