'use client';

import { useState } from 'react';
import { Car, MapPin, Camera, House, Route, Sun, Phone, Navigation } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { journeyPoints, journeyUrl, validCoordinates, type JourneyPoint } from '@/data/journey';
import styles from './DirectionsSection.module.css';

const icons = { car: Car, pin: MapPin, camera: Camera, home: House };

export function DirectionsSection({ points = journeyPoints }: { points?: JourneyPoint[] }) {
  const { locale } = useLanguage();
  const en = locale === 'en';
  const [scenic, setScenic] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const visible = scenic ? points : points.filter(p => p.id === 'departure' || p.id === 'arrival');
  const routeUrl = journeyUrl(visible);
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY;
  const active = visible.find(p => p.id === selected);
  const locations = visible.map(validCoordinates);
  const ready = locations.length >= 2 && locations.every(Boolean);
  let embed: string | undefined;
  if (key && ready) {
    const query = new URLSearchParams({ key, origin: locations[0]!, destination: locations.at(-1)!, mode: 'driving', language: en ? 'en' : 'vi' });
    if (locations.length > 2) query.set('waypoints', locations.slice(1, -1).join('|'));
    embed = `https://www.google.com/maps/embed/v1/directions?${query}`;
    if (active && validCoordinates(active)) embed = `https://www.google.com/maps/embed/v1/place?${new URLSearchParams({ key, q: validCoordinates(active)!, language: en ? 'en' : 'vi' })}`;
  }
  return <section id="directions" className="py-16 md:py-24 bg-warm-paper text-espresso">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={styles.intro}><p className="text-body-sm uppercase tracking-[0.2em] text-stilt-timber mb-3">{en ? 'The road to Mơ' : 'Đường đến Mơ'}</p><h2 className="text-display-lg mb-6">{en ? 'Your getaway begins along the way' : 'Chuyến nghỉ bắt đầu từ những cung đường'}</h2><p className="text-body-base">{en ? 'Take time to enjoy the scenery, pause and savour the journey to Mơ.' : 'Hãy dành một khoảng thời gian để ngắm cảnh, dừng chân và tận hưởng hành trình tới Mơ.'}</p></div>
      <div className={styles.options}>{[true, false].map(value => <button key={String(value)} type="button" aria-pressed={scenic === value} className={`text-ui-base ${styles.option}`} onClick={() => { setScenic(value); setSelected(null); }}>{value ? (en ? 'Slow down, enjoy the scenery' : 'Đi chậm, ngắm cảnh') : (en ? 'Head straight to Mơ' : 'Đi thẳng tới Mơ')}</button>)}</div>
      <div className={styles.map}>{embed ? <iframe title={en ? 'Journey map' : 'Bản đồ hành trình'} src={embed} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /> : <><img src="/assets/img/journey-map-preview.png" alt={en ? 'Illustrative route map provided by Mơ' : 'Bản đồ hành trình minh họa do Mơ cung cấp'} /><p className={`text-body-sm ${styles.caption}`}>{en ? 'Illustrative map · Contact Mơ to confirm the route and stops.' : 'Bản đồ minh họa · Liên hệ Mơ để xác nhận cung đường và điểm dừng.'}</p></>}</div>
      {active && <div className="mt-6 text-body-base" aria-live="polite"><strong>{en ? active.titleEn : active.title}</strong><p>{en ? active.descriptionEn : active.description}</p></div>}
      <div className={styles.body}><ol className={styles.list} aria-label={en ? 'Journey stops' : 'Các điểm trên hành trình'}>{visible.map(point => { const Icon = icons[point.icon]; const coords = validCoordinates(point); return <li key={point.id} className={`${styles.point} ${selected === point.id ? styles.selected : ''}`}><span className={styles.marker}><Icon size={20} aria-hidden="true" /></span><div className={styles.detail}><h3 className="text-body-lg font-semibold mb-3">{en ? point.titleEn : point.title}</h3><p className="text-body-base">{en ? point.descriptionEn : point.description}</p>{coords && embed && <div className={`text-ui-base ${styles.actions}`}><button type="button" onClick={() => setSelected(point.id)} aria-pressed={selected === point.id}>{en ? 'View on map' : 'Xem trên bản đồ'}</button><a href={`https://www.google.com/maps/dir/?${new URLSearchParams({ api: '1', destination: coords, travelmode: 'driving' })}`} target="_blank" rel="noopener noreferrer">{en ? 'Directions ↗' : 'Chỉ đường ↗'}</a></div>}</div></li>; })}</ol>
      <aside className={styles.side}><h3 className="text-body-lg font-semibold">{en ? 'Prepare for your journey' : 'Chuẩn bị cho hành trình'}</h3>{[{ Icon: Route, vi: 'Tuyến có điểm dừng cần được mở cùng các điểm trung gian trên bản đồ.', en: 'Open a route with its intermediate stops included.' }, { Icon: Sun, vi: 'Ưu tiên ngắm cảnh khi trời sáng và thời tiết thuận lợi.', en: 'Enjoy the scenery in daylight and favourable weather.' }, { Icon: Phone, vi: 'Nhờ Mơ xác nhận tuyến phù hợp với phương tiện trước khi đi.', en: 'Ask Mơ to confirm a route suitable for your vehicle.' }].map(({ Icon, vi, en: english }) => <div key={vi} className={`text-body-base ${styles.tip}`}><Icon size={20} aria-hidden="true" /><span>{en ? english : vi}</span></div>)}<a href={routeUrl} target="_blank" rel="noopener noreferrer" className={`text-ui-base ${styles.primary}`}><Navigation size={20} aria-hidden="true" />{ready ? (en ? 'Open selected directions' : 'Mở chỉ đường đã chọn') : (en ? 'Open directions to Mơ' : 'Mở chỉ đường tới Mơ')}</a><a href="https://zalo.me/0964863838" target="_blank" rel="noopener noreferrer" className={`text-ui-base ${styles.secondary}`}>{en ? 'Ask Mơ about the route' : 'Nhờ Mơ tư vấn cung đường'}</a>{!ready && <p className={`text-body-sm ${styles.note}`}>{en ? 'Illustrative route · Stops awaiting confirmation' : 'Tuyến minh họa · Chưa xác nhận điểm dừng'}</p>}</aside></div>
    </div>
  </section>;
}
