'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Sunrise, Utensils, House, Landmark, Waves, Mountain, Zap, Flower2, MapPin, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './NearbyJourneys.module.css';

export function NearbyJourneys() {
  const { locale } = useLanguage();
  const en = locale === 'en';
  const [selected, setSelected] = useState(0);
  const [detail, setDetail] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const copy = (vi: string, english: string) => en ? english : vi;
  const plans = [
    {
      title: copy('Ghé Hòa Bình trước khi về Mơ', 'Explore Hòa Bình before arriving at Mơ'), sub: copy('Điểm dừng trên đường tới khu nghỉ dưỡng', 'Stops on your way to the retreat'), image: '/assets/img/hero-poster.jpg', steps: [
        [copy('Khám phá Hòa Bình', 'Explore Hòa Bình'), copy('Dừng chân ở khu vực TP. Hòa Bình, chọn ghé Thủy điện Hòa Bình hoặc Chùa Phật Quang.', 'Stop in the Hòa Bình city area and choose to visit the hydropower plant or Phật Quang Pagoda.')],
        [copy('Về Mơ dùng bữa', 'Lunch at Mơ'), copy('Trở về Mơ, thưởng thức bữa trưa và nghỉ ngơi sau hành trình.', 'Return to Mơ for lunch and a rest after your journey.')],
        [copy('Nhận phòng & thảnh thơi', 'Check in & unwind'), copy('Nhận phòng theo giờ xác nhận, dạo khuôn viên và tận hưởng không gian bên hồ.', 'Check in at your confirmed time, stroll around and enjoy the lakeside setting.')],
      ]
    },
    {
      title: copy('Một ngày khám phá văn hóa', 'A day exploring local culture'), sub: copy('Gợi ý trải nghiệm tại Bản Sưng', 'An introduction to Sưng village'), image: '/assets/img/nh-mt-img2947.webp', steps: [
        [copy('Ghé Bản Sưng', 'Visit Sưng village'), copy('Gợi ý tìm hiểu văn hóa người Dao Tiền và không gian bản làng.', 'Discover Dao Tiền culture and village life.')],
        [copy('Dùng bữa & nghỉ ngơi', 'Lunch & rest'), copy('Sắp xếp điểm dùng bữa theo phương án đã đặt trước.', 'Arrange lunch according to your pre-booked plan.')],
        [copy('Trở về Mơ', 'Return to Mơ'), copy('Dành buổi chiều nghỉ ngơi và thư giãn tại khu nghỉ dưỡng.', 'Spend the afternoon resting and relaxing at the retreat.')],
      ]
    },
    {
      title: copy('Đi tìm một khoảng thiên nhiên', 'Find a moment in nature'), sub: copy('Chọn Suối Ké hoặc Thác Răng', 'Choose Ké Stream or Răng Waterfall'), image: '/assets/img/campus-dji0135.webp', steps: [
        [copy('Chọn Suối Ké hoặc Thác Răng', 'Choose Ké Stream or Răng Waterfall'), copy('Chọn một điểm đến phù hợp với điều kiện thời tiết và hành trình.', 'Choose a destination suited to the weather and your itinerary.')],
        [copy('Nghỉ chân & dùng bữa', 'Rest & lunch'), copy('Sắp xếp bữa trưa theo tuyến di chuyển được xác nhận.', 'Arrange lunch along your confirmed route.')],
        [copy('Về Mơ tận hưởng', 'Enjoy your time at Mơ'), copy('Trở về khu nghỉ dưỡng, nghỉ ngơi và tận hưởng các tiện ích.', 'Return to the retreat to rest and enjoy its facilities.')],
      ]
    },
  ];
  const places = [
    { name: copy('Bản Sưng', 'Sưng Village'), icon: Landmark, text: copy('Gợi ý tìm hiểu văn hóa người Dao Tiền.', 'An introduction to Dao Tiền culture.'), extra: copy('Liên hệ Mơ để sắp xếp người hướng dẫn và hoạt động phù hợp trước chuyến đi.', 'Contact Mơ in advance to arrange a guide and suitable activities.') },
    { name: copy('Suối Ké', 'Ké Stream'), icon: Waves, text: copy('Một điểm dừng cho hành trình khám phá thiên nhiên.', 'A stop on your journey into nature.'), extra: copy('Xác nhận thời tiết và điều kiện tiếp cận trước khi khởi hành.', 'Confirm weather and access conditions before setting out.') },
    { name: copy('Thác Răng', 'Răng Waterfall'), icon: Mountain, text: copy('Thêm một lựa chọn cho chuyến đi giữa núi rừng.', 'Another option for a trip into the mountains.'), extra: copy('Nhờ Mơ tư vấn tuyến đường và điều kiện tham quan theo mùa.', 'Ask Mơ about the route and seasonal visiting conditions.') },
    { name: copy('Thủy điện Hòa Bình', 'Hòa Bình Hydropower Plant'), icon: Zap, text: copy('Điểm tham quan công trình và cảnh quan trên hành trình.', 'Explore architecture and scenery along your journey.'), extra: copy('Xác nhận lịch tham quan, giờ mở cửa và yêu cầu đặt trước.', 'Confirm visiting schedules, opening hours and booking requirements.') },
    { name: copy('Chùa Phật Quang', 'Phật Quang Pagoda'), icon: Flower2, text: copy('Gợi ý một điểm dừng tham quan tâm linh.', 'A suggested spiritual sightseeing stop.'), extra: copy('Xác nhận đúng vị trí với Mơ; lựa chọn trang phục phù hợp khi tham quan.', 'Confirm the location with Mơ and wear suitable clothing for your visit.') },
    { name: copy('Khu vực TP. Hòa Bình', 'Hòa Bình City Area'), icon: MapPin, text: copy('Dừng chân khám phá trước khi tiếp tục về Mơ.', 'Explore the area before continuing to Mơ.'), extra: copy('Chọn điểm dừng phù hợp với tuyến đường và giờ nhận phòng của bạn.', 'Choose stops that fit your route and confirmed check-in time.') },
  ];
  const times = [copy('Buổi sáng', 'Morning'), copy('Buổi trưa', 'Midday'), copy('Buổi chiều', 'Afternoon')];
  const icons = [Sunrise, Utensils, House];
  return <section id="nearby" className={`section-py bg-warm-paper ${styles.section}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={styles.intro}>
        <p className="text-body-sm uppercase tracking-[0.2em] text-stilt-timber mb-3">{copy('Khám phá & tận hưởng', 'Explore & enjoy')}</p>
        <h2 className="text-display-lg text-espresso mb-6">{copy('Các địa điểm tham quan và trải nghiệm ở gần Mơ', 'Places to visit and experiences near Mơ')}</h2>
        <p className="text-body-base text-espresso/90">{copy('Ghé một bản làng, dừng chân bên dòng suối hay khám phá Hòa Bình trước khi về Mơ.', 'Visit a village, pause beside a stream or explore Hòa Bình before returning to Mơ.')}</p>
      </div>
      <h3 className="text-display-sm text-espresso mb-8">{copy('Chọn một hành trình quanh Mơ', 'Choose a journey around Mơ')}</h3>
      <div className={styles.choices}>
        {plans.map((plan, index) => <button key={plan.title} type="button" aria-pressed={selected === index} aria-controls="nearby-itinerary" onClick={() => setSelected(index)} className={styles.choice}>
          <span className={styles.image}><Image src={plan.image} alt={copy('Ảnh minh họa không gian Mơ Village', 'Illustrative image of Mơ Village')} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover" /></span>
          <span className={styles.choiceCopy}><span className="text-body-lg font-semibold">{plan.title}</span><span className={`text-body-sm ${styles.subtitle}`}>{plan.sub}</span><span className={`text-body-sm ${styles.action}`}>{copy('Xem lịch trình', 'View itinerary')} <ArrowRight size={16} aria-hidden="true" /></span></span>
        </button>)}
      </div>
      <div id="nearby-itinerary" className={styles.journey} aria-live="polite">
        <p className="text-body-sm uppercase tracking-wide text-stilt-timber mb-3">{copy('Lịch trình gợi ý', 'Suggested itinerary')}</p>
        <h3 className="text-display-sm text-espresso mb-8">{plans[selected].title}</h3>
        <div className={styles.timeline}>{plans[selected].steps.map(([title, text], index) => { const Icon = icons[index]; return <div className={styles.step} key={index}><div className={`text-body-sm ${styles.time}`}><Icon size={20} aria-hidden="true" />{times[index]}</div><h4 className="text-body-lg font-semibold text-espresso mb-2">{title}</h4><p className="text-body-sm text-espresso/90">{text}</p></div>; })}</div>
      </div>
      <h3 className="text-display-sm text-espresso mb-8">{copy('Tìm hiểu từng điểm đến', 'Discover each destination')}</h3>
      <div className={styles.places}>{places.map((place, index) => { const Icon = place.icon; return <article key={place.name} className={styles.place}><span className={styles.icon}><Icon size={22} aria-hidden="true" /></span><div><h4 className="text-body-lg font-semibold text-espresso mb-2">{place.name}</h4><p className="text-body-sm text-espresso/90 mb-3">{place.text}</p><button type="button" className={`text-body-sm ${styles.detail}`} onClick={() => { setDetail(index); dialog.current?.showModal(); }}>{copy('Xem chi tiết', 'View details')} <ArrowRight size={16} aria-hidden="true" /></button></div></article>; })}</div>
      <div className={styles.cta}><a href="https://zalo.me/0964863838" target="_blank" rel="noopener noreferrer" className="inline-flex bg-terracotta hover:bg-terracotta/90 text-warm-paper px-6 py-3 rounded-lg text-ui-base transition-colors">{copy('Nhờ Mơ tư vấn lịch trình', 'Ask Mơ to help plan your trip')}</a></div>
      <dialog ref={dialog} className={styles.dialog} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
        <button type="button" autoFocus className={styles.close} aria-label={copy('Đóng', 'Close')} onClick={() => dialog.current?.close()}><X size={24} /></button>
        {detail !== null && <><h3 className="text-display-sm text-espresso mb-6">{places[detail].name}</h3><p className="text-body-base mb-4">{places[detail].text}</p><p className="text-body-sm mb-6">{places[detail].extra}</p><a href="https://zalo.me/0964863838" target="_blank" rel="noopener noreferrer" className="text-ui-base text-terracotta">{copy('Liên hệ Mơ để sắp xếp chuyến đi', 'Contact Mơ to arrange your visit')}</a></>}
      </dialog>
    </div>
  </section>;
}
