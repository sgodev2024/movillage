'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Utensils, Coffee, Flower2, Heart, Waves, Bath, Users, Presentation, Wind, Leaf, type LucideIcon } from 'lucide-react';
import styles from './ServicesSection.module.css';

const serviceIcons: Record<string, LucideIcon> = {
  restaurant: Utensils, cafe: Coffee, spa: Flower2, yoga: Heart,
  sauna: Wind, 'herbal-bath': Leaf, pool: Waves, jacuzzi: Bath,
  'team-building': Users, conference: Presentation,
};

export function ServicesSection() {
  const { locale, t } = useLanguage();
  const en = locale === 'en';
  const groups = [
    { title: en ? 'Dining' : 'Ẩm thực', image: '/assets/img/restaurant-dsc05377.webp', alt: en ? 'Restaurant at Mơ' : 'Nhà hàng tại Mơ', items: [
      { id: 'restaurant', title: en ? 'Restaurant' : 'Nhà hàng', description: en ? 'A space to share meals and moments together.' : 'Không gian dùng bữa và gặp gỡ bên nhau.' },
      { id: 'cafe', title: en ? 'Café' : 'Cà phê', description: en ? 'Slow down with your favourite drink.' : 'Chậm lại bên một thức uống yêu thích.' },
    ] },
    { title: en ? 'Wellness' : 'Chăm sóc sức khỏe', image: '/assets/img/phong-xong-img2969.webp', alt: en ? 'Wellness space at Mơ' : 'Không gian chăm sóc sức khỏe tại Mơ', items: [
      { id: 'spa', title: 'Spa', description: en ? 'Take a little time to care for yourself.' : 'Dành một khoảng thời gian chăm sóc bản thân.' },
      { id: 'yoga', title: en ? 'Yoga Deck' : 'Sàn Yoga', description: en ? 'A space for quiet, mindful moments.' : 'Không gian cho những phút tĩnh tâm.' },
      { id: 'sauna', title: t.experiences.facilitiesList[1].title, description: t.experiences.facilitiesList[1].desc },
      { id: 'herbal-bath', title: t.experiences.facilitiesList[2].title, description: t.experiences.facilitiesList[2].desc },
    ] },
    { title: en ? 'Facilities & Connection' : 'Tiện ích & kết nối', image: '/assets/img/gallery-pool-mountain.webp', alt: en ? 'Swimming pool at Mơ' : 'Bể bơi tại Mơ', items: [
      { id: 'pool', title: en ? 'Swimming Pool' : 'Bể bơi', description: en ? 'Relax at your own pace.' : 'Thư giãn theo nhịp của riêng bạn.' },
      { id: 'jacuzzi', title: en ? 'Outdoor Jacuzzi' : 'Bể sục ngoài trời', description: en ? 'Enjoy a peaceful moment outdoors.' : 'Tận hưởng phút nghỉ ngơi giữa không gian ngoài trời.' },
      { id: 'team-building', title: en ? 'Team Building Lawn' : 'Sân cỏ Team Building', description: en ? 'A space for shared activities.' : 'Không gian cho hoạt động tập thể.' },
      { id: 'conference', title: en ? 'Conference Room' : 'Phòng hội nghị', description: en ? 'Meet and connect during your stay.' : 'Gặp gỡ và kết nối trong chuyến đi.' },
    ] },
  ];
  return (
    <div id="services" className="mt-16 pt-12 border-t border-stilt-timber/25 scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <p className="text-body-sm uppercase tracking-[0.2em] text-bamboo-shoot font-semibold mb-3">{en ? 'Services & Facilities' : 'Dịch vụ & tiện ích'}</p>
        <h3 className="text-display-sm text-espresso mb-4">{en ? 'Something more to enjoy every day at Mơ' : 'Mỗi ngày ở Mơ, thêm một điều để tận hưởng'}</h3>
      </div>
      <div className={styles.grid}>
        {groups.map(group => <article key={group.title} className={styles.card}>
          <div className={styles.image}>
            <Image src={group.image} alt={group.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          </div>
          <div className={styles.content}>
            <h4 className={`text-body-lg font-semibold text-espresso ${styles.heading}`}>{group.title}</h4>
            <div className={styles.list}>
              {group.items.map(item => {
                const Icon = serviceIcons[item.id];
                return <div key={item.id} id={`service-${item.id}`} className={styles.item}>
                  <span className={styles.icon}><Icon size={20} strokeWidth={1.6} aria-hidden="true" /></span>
                  <div className={styles.copy}>
                    <h5 className={`text-body-base font-semibold text-espresso ${styles.title}`}>{item.title}</h5>
                    <p className={`text-body-sm text-espresso/90 ${styles.description}`}>{item.description}</p>
                  </div>
                </div>;
              })}
            </div>
          </div>
        </article>)}
      </div>
    </div>
  );
}
