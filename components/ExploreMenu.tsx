'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export function ExploreMenu({ isHome, mobile = false, onNavigate }: {
  isHome: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const { locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const en = locale === 'en';
  const groups = [
    { title: en ? 'Accommodation' : 'Phòng nghỉ', items: [
      ['Dorm 8', 'Nhà Cộng Đồng'], ['Dorm 20', 'Nhà Cộng Đồng'],
      [en ? 'Community House' : 'Nhà Cộng Đồng', 'Nhà Cộng Đồng'],
      [en ? 'Jackfruit House' : 'Nhà Mít', 'Nhà Mít'],
      [en ? 'Sang Villa' : 'Nhà Sang', 'Nhà Sang'],
      [en ? 'Apple House' : 'Nhà Táo', 'Nhà Táo'],
      [en ? 'Peach House' : 'Nhà Đào', 'Nhà Đào'],
      [en ? 'Plum House' : 'Nhà Mận', 'Nhà Mận'],
    ] },
    { title: en ? 'Dining' : 'Ẩm thực', items: [[en ? 'Restaurant' : 'Nhà hàng', 'service-restaurant'], [en ? 'Café' : 'Cà phê', 'service-cafe']] },
    { title: en ? 'Wellness' : 'Chăm sóc sức khỏe', items: [['Spa', 'service-spa'], [en ? 'Yoga Deck' : 'Sàn Yoga', 'service-yoga']] },
    { title: en ? 'Facilities' : 'Tiện ích', items: [[en ? 'Swimming Pool' : 'Bể bơi', 'service-pool'], [en ? 'Outdoor Jacuzzi' : 'Bể sục ngoài trời', 'service-jacuzzi'], ['Team Building', 'service-team-building'], [en ? 'Conference Room' : 'Phòng hội nghị', 'service-conference']] },
  ];

  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  return (
    <div ref={root}
      onMouseEnter={() => { if (!mobile && window.matchMedia('(hover: hover)').matches) setOpen(true); }}
      onMouseLeave={() => { if (!mobile) setOpen(false); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <button ref={trigger} type="button" aria-expanded={open} aria-controls={id}
        className={mobile ? 'w-full text-left px-6 py-3 text-espresso border-t border-karst-mist flex items-center justify-between' : 'text-espresso hover:text-stilt-timber transition-colors flex items-center gap-2 cursor-pointer'}
        onClick={() => setOpen(!open)}>
        {en ? 'Discover Mơ' : 'Mơ có gì'} <span aria-hidden="true">{open ? '▴' : '▾'}</span>
      </button>
      {open && <div id={id} className={mobile ? 'bg-soft-sand px-6 py-4 grid gap-6' : 'absolute top-full left-0 right-0 bg-warm-paper border-b border-karst-mist shadow-lg'}>
        <div className={mobile ? 'grid gap-6' : 'max-w-7xl mx-auto px-8 py-6 grid grid-cols-4 gap-8'}>
          {groups.map(group => <div key={group.title}>
            <p className="text-terracotta mb-3">{group.title}</p>
            <ul className="space-y-2">
              {group.items.map(([label, category]) => {
                const hash = category.startsWith('service-') ? `#${category}` : `#rooms?category=${encodeURIComponent(category)}`;
                return <li key={label}><a href={isHome ? hash : `/${hash}`}
                  className="block text-espresso hover:text-stilt-timber transition-colors"
                  onClick={() => { setOpen(false); onNavigate?.(); }}>
                  {label}
                </a></li>;
              })}
            </ul>
          </div>)}
        </div>
      </div>}
    </div>
  );
}
