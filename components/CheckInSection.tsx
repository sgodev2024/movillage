'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Expand, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './CheckInSection.module.css';

export function CheckInSection() {
  const { locale } = useLanguage();
  const en = locale === 'en';
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const photos = [
    { image: '/assets/img/campus-dji0135.webp', title: en ? 'Green spaces by the lake' : 'Khoảng xanh bên hồ', description: en ? 'Let nature frame your moment.' : 'Để thiên nhiên làm nền cho khoảnh khắc của bạn.' },
    { image: '/assets/img/cafe-img0850.webp', title: en ? 'A café corner' : 'Một góc cà phê', description: en ? 'Slow down and capture a memory.' : 'Chậm lại, và lưu một tấm hình.' },
    { image: '/assets/img/nh-mt-img2947.webp', title: en ? 'A welcoming veranda' : 'Hiên nhà thân quen', description: en ? 'Rustic details in every frame.' : 'Nét mộc mạc trong từng khung hình.' },
    { image: '/assets/img/cho-thuyen-kayak.webp', title: en ? 'Touch the water' : 'Chạm vào mặt nước', description: en ? 'Another perspective on Mơ.' : 'Một góc nhìn khác về Mơ.' },
    { image: '/assets/img/campus-dji0107.webp', title: en ? 'A stroll through greenery' : 'Dạo giữa khoảng xanh', description: en ? 'Remember a peaceful stroll.' : 'Lưu lại một bước chân thảnh thơi.' },
  ];
  const navigate = (direction: number) => setIndex(value => (value + direction + photos.length) % photos.length);
  const photo = photos[index];
  return <section id="check-in" className={`section-py bg-warm-paper ${styles.section}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={styles.intro}>
        <p className="text-body-sm uppercase tracking-[0.2em] text-stilt-timber mb-3">{en ? 'Take a little Mơ home' : 'Mang một chút Mơ về nhà'}</p>
        <h2 className="text-display-lg text-espresso mb-6">{en ? 'Photo spots at Mơ' : 'Các góc check-in của Mơ'}</h2>
        <p className="text-body-base text-espresso/90">{en ? 'A lakeside corner, a veranda, a moment of your own. Find a place to capture your story at Mơ.' : 'Một góc hồ, một hiên nhà, một khoảnh khắc thật riêng. Tìm nơi lưu lại câu chuyện của bạn tại Mơ.'}</p>
      </div>
      <div className={styles.grid}>{photos.map((item, i) => <button key={item.image} type="button" className={styles.tile} aria-label={`${en ? 'View photo' : 'Xem ảnh'}: ${item.title}`} onClick={() => { setIndex(i); dialog.current?.showModal(); }}>
        <Image src={item.image} alt={item.title} fill sizes="(max-width: 420px) 100vw, (max-width: 767px) 50vw, 33vw" className="object-cover" />
        <span className={styles.shade} />
        <span className={styles.zoom}><Expand size={18} aria-hidden="true" /></span>
        <span className={styles.caption}><span className={`text-body-lg font-semibold ${styles.title}`}>{item.title}</span><span className={`text-body-sm ${styles.description}`}>{item.description}</span></span>
      </button>)}</div>
      <div className={styles.footer}><Link href="/gallery" className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta/90 text-warm-paper px-6 py-3 rounded-lg text-ui-base transition-colors">{en ? 'Explore the photo gallery' : 'Khám phá Thư viện ảnh'}<ArrowRight size={18} aria-hidden="true" /></Link></div>
      <dialog ref={dialog} className={styles.dialog} aria-label={en ? 'Photo viewer' : 'Xem ảnh check-in'} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }} onKeyDown={e => { if (e.key === 'ArrowLeft') navigate(-1); if (e.key === 'ArrowRight') navigate(1); }}>
        <div className={styles.toolbar}><span className="text-body-sm">{index + 1} / {photos.length}</span><button autoFocus type="button" className={styles.control} onClick={() => dialog.current?.close()} aria-label={en ? 'Close' : 'Đóng'}><X size={24} /></button></div>
        <div className={styles.large}><Image src={photo.image} alt={photo.title} fill sizes="(max-width: 767px) 90vw, 900px" className="object-contain" /></div>
        <div className={styles.toolbar}><button type="button" className={styles.control} aria-label={en ? 'Previous photo' : 'Ảnh trước'} onClick={() => navigate(-1)}><ChevronLeft size={24} /></button><div aria-live="polite" className={styles.detail}><h3 className="text-body-lg font-semibold">{photo.title}</h3><p className="text-body-sm">{photo.description}</p></div><button type="button" className={styles.control} aria-label={en ? 'Next photo' : 'Ảnh tiếp'} onClick={() => navigate(1)}><ChevronRight size={24} /></button></div>
      </dialog>
    </div>
  </section>;
}
