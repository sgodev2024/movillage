export type JourneyPoint = {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: 'car' | 'pin' | 'camera' | 'home';
  coordinates?: { lat: number; lng: number };
};

// Replace with the admin response once its endpoint and verified coordinates are available.
export const journeyPoints: JourneyPoint[] = [
  { id: 'departure', title: 'Khởi hành từ Hà Nội', titleEn: 'Depart from Hanoi', description: 'Sắp xếp giờ đi theo lịch nhận phòng, chừa thời gian cho các điểm dừng nếu muốn ngắm cảnh.', descriptionEn: 'Plan your departure around check-in, allowing time for scenic stops.', icon: 'car' },
  { id: 'stop', title: 'Dừng chân tại khu vực Hòa Bình', titleEn: 'Stop in the Hòa Bình area', description: 'Chọn một điểm nghỉ hoặc tham quan nằm trên tuyến đường đã được Mơ xác nhận.', descriptionEn: 'Choose a rest or sightseeing stop on a route confirmed by Mơ.', icon: 'pin' },
  { id: 'view', title: 'Ghé điểm ngắm cảnh trên đường', titleEn: 'Enjoy a scenic stop', description: 'Dừng tại vị trí được xác nhận có chỗ đỗ xe phù hợp; dành một khoảng thời gian cho cảnh hồ và núi.', descriptionEn: 'Stop at a confirmed location with suitable parking and enjoy the lake and mountains.', icon: 'camera' },
  { id: 'arrival', title: 'Đến Mơ, thảnh thơi bên hồ', titleEn: 'Arrive at Mơ, unwind by the lake', description: 'Theo chỉ dẫn chặng cuối của Mơ để tới đúng lối vào, gửi xe và bắt đầu chuyến nghỉ.', descriptionEn: 'Follow Mơ’s final directions to the entrance, park and begin your stay.', icon: 'home' },
];

export const moMapsUrl = 'https://maps.app.goo.gl/7gk7cRHAvQdimFi39';

export function validCoordinates(point: JourneyPoint) {
  const c = point.coordinates;
  return c && Number.isFinite(c.lat) && Number.isFinite(c.lng) && Math.abs(c.lat) <= 90 && Math.abs(c.lng) <= 180 ? `${c.lat},${c.lng}` : undefined;
}

export function journeyUrl(points: JourneyPoint[]) {
  const locations = points.map(validCoordinates);
  if (locations.length < 2 || locations.some(x => !x)) return moMapsUrl;
  const query = new URLSearchParams({ api: '1', origin: locations[0]!, destination: locations.at(-1)!, travelmode: 'driving' });
  if (locations.length > 2) query.set('waypoints', locations.slice(1, -1).join('|'));
  return `https://www.google.com/maps/dir/?${query}`;
}
