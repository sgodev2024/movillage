export interface RoomItem {
  id: string;
  code?: string;
  name: string;
  category: string;
  capacity: string;
  capacityNumber: number;
  bedsCount?: number;
  bedType: string;
  area: string;
  view: string;
  image: string;
  gallery?: string[];
  tagline: string;
  pricePerNight?: string;
  features: string[];
  description: string;
  amenities: string[];
  vr360Url?: string;
  bookingUrl?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  category: 'facilities' | 'workshops' | 'nearby';
  description: string;
  image?: string;
  icon?: string;
}

export interface PackageItem {
  id: string;
  title: string;
  badge?: string;
  subtitle: string;
  price: string;
  priceUnit: string;
  features: string[];
  itinerarySummary: string[];
  isPopular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: 'all' | 'landscape' | 'rooms' | 'facilities' | 'dining';
  aspect?: string;
}

export interface FAQItem {
  id: string;
  num: string;
  question: string;
  answer: string;
}

export const siteContent = {
  vi: {
    nav: {
      story: 'Câu chuyện',
      rooms: 'Phòng nghỉ',
      experiences: 'Trải nghiệm',
      gallery: 'Thư viện',
      directions: 'Đường đến Mơ',
      packages: 'Gói dịch vụ',
      bookNow: 'Đặt chỗ nghỉ',
    },
    hero: {
      title: 'Một giấc mơ dịu trên mặt hồ Hòa Bình',
      sub: 'Khu nghỉ dưỡng ven hồ mang đậm hồn cốt văn hóa Mường giữa thiên nhiên Tây Bắc thanh bình.',
      ctaPrimary: 'Đặt chỗ nghỉ của bạn',
      ctaSecondary: 'Xem phòng',
      scrollDown: 'Cuộn để khám phá',
    },
    story: {
      tagline: 'Chuyện của Mơ',
      title: 'Một giấc mơ dịu trên mặt hồ Hòa Bình',
      lead: 'Mơ Village là khu nghỉ dưỡng ven hồ kết hợp sự bình yên của nước, sương mù, rừng cây với sự ấm áp của kiến trúc nhà sàn Mường. Một nơi hiện đại, nhẹ nhàng kỳ ảo để nghỉ ngơi, kết nối và khám phá.',
      cards: [
        {
          title: 'Hồ Hòa Bình',
          desc: 'Hồ nhân tạo lớn nhất Việt Nam, hình thành từ đập thủy điện Hòa Bình năm 1994. Diện tích 230 km², sâu tới 40m, với cảnh sương mù huyền ảo vào buổi sáng.',
          image: '/images/campus-lake.webp',
          stat: '230 km² Mặt nước',
        },
        {
          title: 'Đà Bắc - Hòa Bình',
          desc: 'Cách Hà Nội 100km (khoảng 2–2.5 giờ lái xe). Vùng đất của người Mường với văn hóa truyền thống đậm đà, khí hậu mát mẻ quanh năm cùng thác nước và hang động nguyên sơ.',
          image: '/images/campus-da-bac.webp',
          stat: '~100 km Từ Hà Nội',
        },
        {
          title: 'Kiến trúc nhà sàn',
          desc: 'Lấy cảm hứng từ nhà sàn truyền thống Mường với cột gỗ tự nhiên, mái lợp tranh và không gian mở thoáng đãng, kết hợp hài hòa giữa di sản bản địa và tiện nghi nghỉ dưỡng hiện đại.',
          image: '/images/room-nha-tao.webp',
          stat: '100% Gỗ & Vật liệu tự nhiên',
        },
      ],
    },
    rooms: {
      tagline: 'Mơ có gì',
      title: 'Các hạng phòng nghỉ',
      sub: 'Mỗi căn nhà tại Mơ mang một cái tên thân thương từ cây trái Tây Bắc, hướng nhìn ôm trọn hồ nước hoặc rừng thông xanh mát.',
      viewDetails: 'Chi tiết phòng',
      bookThis: 'Đặt phòng này',
      guestLabel: 'người',
      items: [
  {
    id: 'room-380',
    code: 'M1',
    name: 'Nhà Mận 1',
    category: 'Nhà Mận',
    capacity: '2 người',
    capacityNumber: 2,
    bedsCount: 1,
    bedType: '1 x 2mx2m',
    area: '32m²',
    view: 'View Hồ/Vườn',
    image: '/images/rooms/img-2945-1781666658(2).webp',
    gallery: [
      '/images/rooms/img-1746504277359-1747893743757-1781666666.webp',
      '/images/rooms/img-20250611-223904-1781666671.webp',
      '/images/rooms/img-1746504277558-1747893745323-1781666679.webp',
      '/images/rooms/img-1757148509409-1774370725030-1781666685.webp',
      '/images/rooms/img-1774364115124-1774364124972-1781666691.webp',
      '/images/rooms/phong-tam-1781666698.webp',
      '/images/rooms/img-2945-1781666658(2).webp'
    ],
    tagline: 'Phòng đôi sang trọng với bồn tắm ngâm và ban công view trọn hồ Hòa Bình.',
    pricePerNight: '1.950.000 đ',
    features: [
      'Diện tích: 32m²',
      'Giường: 1 x 2mx2m',
      'Ban công view hồ/vườn',
      'Phòng tắm view hồ với bồn tắm & vòi sen',
      'Miễn phí 1 trẻ em dưới 12t ngủ chung giường'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen', 'Bồn tắm view hồ'],
    description: 'Tiêu chuẩn phòng: Diện tích 32m2, Giường 1 x 2mx2m, Ban công riêng view hồ/vườn, Phòng tắm view hồ lãng mạn. Chính sách: Miễn phí 1 trẻ em dưới 12 tuổi ngủ chung giường.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=380',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/380?premium=https://movillage.mytravelviet.net#room-380'
  },
  {
    id: 'room-381',
    code: 'Dorm8pax',
    name: 'Dorm 8 pax',
    category: 'Nhà Cộng Đồng',
    capacity: '8 người',
    capacityNumber: 8,
    bedsCount: 8,
    bedType: '8 đệm 1m1x2m',
    area: '60m²',
    view: 'View hồ/vườn/sân cỏ',
    image: '/images/rooms/img-8432-1781683598.webp',
    gallery: [
      '/images/rooms/img-1746501071655-1746501111175-1781683573.webp',
      '/images/rooms/img-8442-1781683580.webp',
      '/images/rooms/img-8429-1781683592.webp',
      '/images/rooms/img-8432-1781683598.webp',
      '/images/rooms/img-8431-1781683604.webp',
      '/images/rooms/anh-phong-dorm-8-pax-1781768028(1).webp'
    ],
    tagline: 'Phòng tập thể 8 người ấm cúng, 2 phòng tắm riêng, phù hợp hội bạn thân.',
    pricePerNight: '3.500.000 đ',
    features: [
      'Diện tích: 60m²',
      '8 đệm đơn 1m1x2m tiêu chuẩn',
      '2 nhà tắm & 2 WC riêng',
      'Khu sinh hoạt chung rộng rãi',
      'View hồ & sân cỏ thoáng đãng'
    ],
    amenities: ['Tủ đựng đồ cá nhân', 'Khu sinh hoạt chung', '2 Nhà tắm nước nóng', '2 WC riêng', 'Quạt & Điều hòa công suất lớn'],
    description: 'Tiêu chuẩn phòng: Diện tích 60m2, 8 đệm 1m1x2m, 2 nhà tắm / 2 WC, khu sinh hoạt chung thoải mái. Phù hợp cho nhóm bạn thân hoặc gia đình nhiều thành viên.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=381',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/381?premium=https://movillage.mytravelviet.net#room-381'
  },
  {
    id: 'room-382',
    code: 'Dorm3Pax',
    name: 'Dorm 3 Pax',
    category: 'Nhà Cộng Đồng',
    capacity: '3 người',
    capacityNumber: 3,
    bedsCount: 3,
    bedType: '3 đệm 1m1x2m',
    area: '14m²',
    view: 'View Vườn',
    image: '/images/rooms/img-20260513-230504-1781684295.webp',
    gallery: [
      '/images/rooms/dorm-3-1781684273.webp',
      '/images/rooms/img-20260513-230504-1781684295.webp',
      '/images/rooms/img-20260513-230503-1781684308.webp',
      '/images/rooms/img-20260513-230502-1781684320.webp',
      '/images/rooms/img-20260513-230100-1781684333.webp',
      '/images/rooms/img-8443-1781684257(1).webp'
    ],
    tagline: 'Phòng sàn gỗ 3 đệm nhỏ xinh, view vườn yên tĩnh và tiết kiệm.',
    pricePerNight: '750.000 đ',
    features: [
      'Diện tích: 14m²',
      'Sàn gỗ với 3 đệm 1m1x2m',
      'Hướng vườn cây xanh mát',
      'Phòng tắm ngoài tiện nghi',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Kệ sách', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen'],
    description: 'Tiêu chuẩn phòng: Diện tích 14m2, sàn 3 đệm 1m1x2m, hướng vườn yên bình. Miễn phí 1 trẻ em dưới 12 tuổi.',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/382?premium=https://movillage.mytravelviet.net#room-382'
  },
  {
    id: 'room-383',
    code: 'Dorm20pax',
    name: 'Dorm 20 pax',
    category: 'Nhà Cộng Đồng',
    capacity: '20 người',
    capacityNumber: 20,
    bedsCount: 20,
    bedType: '20 đệm đơn 1m1x2m',
    area: '130m²',
    view: 'View Hồ/Vườn',
    image: '/images/rooms/dorm-20-1781685707(2).webp',
    gallery: [
      '/images/rooms/dorm-20-1-1781685718.webp',
      '/images/rooms/nha-tam-va-wc-1781685733.webp',
      '/images/rooms/ban-cong-rong-1781685740.webp',
      '/images/rooms/cau-thang-1781685746.webp',
      '/images/rooms/toa-dorm-20-1781685760.webp',
      '/images/rooms/dorm-20-1781685707(2).webp'
    ],
    tagline: 'Nhà sàn tập thể đại quy mô 130m², 4 tắm/4 WC, ban công rộng view hồ.',
    pricePerNight: '7.500.000 đ',
    features: [
      'Diện tích: 130m² trọn sàn',
      '20 đệm đơn 1m1x2m cao cấp',
      '4 phòng tắm & 4 WC riêng biệt',
      'Ban công lớn view trọn mặt hồ',
      'Rất phù hợp teambuilding & đoàn đông'
    ],
    amenities: ['Tủ đựng đồ cá nhân', 'Khu sinh hoạt chung lớn', 'Ban công có bàn & ghế đôn', '4 Phòng tắm / 4 WC', 'Hệ thống quạt & điều hòa'],
    description: 'Tiêu chuẩn phòng: Diện tích 130m2, 20 đệm đơn 1m1x2m, khu vệ sinh 4 tắm / 4 WC, ban công rộng rãi view hồ/vườn tuyệt đẹp.',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/383?premium=https://movillage.mytravelviet.net#room-383'
  },
  {
    id: 'room-384',
    code: 'DeluxeRoom',
    name: 'Deluxe Room',
    category: 'Nhà Mít',
    capacity: '2 người',
    capacityNumber: 2,
    bedsCount: 1,
    bedType: '1 x 1m8x2m',
    area: '24m²',
    view: 'View Hồ/Vườn',
    image: '/images/rooms/view-phong-ngu-1781686716(2).webp',
    gallery: [
      '/images/rooms/view-phong-ngu-1-1781686722.webp',
      '/images/rooms/hien-phong-1781686727.webp',
      '/images/rooms/img-1149-1781686734.webp',
      '/images/rooms/img-1151-1781686743.webp',
      '/images/rooms/img-1154-1781686751.webp',
      '/images/rooms/phong-tam-wc-1781686760.webp',
      '/images/rooms/view-phong-ngu-1781686716(2).webp'
    ],
    tagline: 'Phòng Deluxe ấm cúng với ban công ghế mây và phòng tắm view vườn.',
    pricePerNight: 'Liên hệ',
    features: [
      'Diện tích: 24m²',
      'Giường: 1 x 1m8x2m',
      'Ban công có bàn ghế mây thư giãn',
      'Hướng: View hồ & vườn xanh mát',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen'],
    description: 'Tiêu chuẩn phòng: Diện tích 24m2, Giường 1m8x2m, Ban công riêng có ghế mây ngắm cảnh, phòng tắm view vườn thoáng mát.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=384',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/384?premium=https://movillage.mytravelviet.net#room-384'
  },
  {
    id: 'room-385',
    code: 'DeluxeRoom2',
    name: 'Deluxe Room 2',
    category: 'Nhà Mít',
    capacity: '2 người',
    capacityNumber: 2,
    bedsCount: 1,
    bedType: '1 x 1m8x2m',
    area: '24m²',
    view: 'View Hồ/Vườn',
    image: '/images/rooms/view-phong-ngu-1781687060.webp',
    gallery: [
      '/images/rooms/view-phong-ngu-1-1781687063.webp',
      '/images/rooms/phong-tam-wc-1781687067.webp',
      '/images/rooms/img-1154-1781687070(1).webp',
      '/images/rooms/img-1151-1781687075.webp',
      '/images/rooms/img-1149-1781687079.webp',
      '/images/rooms/hien-phong-1781687083.webp',
      '/images/rooms/view-phong-ngu-1781687060.webp'
    ],
    tagline: 'Phòng Deluxe Nhà Mít số 2, view thiên nhiên chan hòa ánh sáng.',
    pricePerNight: 'Liên hệ',
    features: [
      'Diện tích: 24m²',
      'Giường đôi 1m8x2m',
      'Ban công hiên phòng view hồ/vườn',
      'Phòng tắm view vườn riêng tư',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen'],
    description: 'Tiêu chuẩn phòng: Diện tích 24m2, Giường 1 x 1m8x2m, Ban công bao gồm ghế mây + bàn, Hướng View hồ/vườn.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=385',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/385?premium=https://movillage.mytravelviet.net#room-385'
  },
  {
    id: 'room-386',
    code: 'DeluxeRoom3',
    name: 'Deluxe Room 3',
    category: 'Nhà Mít',
    capacity: '2 người',
    capacityNumber: 2,
    bedsCount: 1,
    bedType: '1 x 1m8x2m',
    area: '24m²',
    view: 'View Hồ/Vườn',
    image: '/images/rooms/view-phong-ngu-1781687455(2).webp',
    gallery: [
      '/images/rooms/view-phong-ngu-1-1781687459.webp',
      '/images/rooms/img-1151-1781687462.webp',
      '/images/rooms/img-1149-1781687466.webp',
      '/images/rooms/img-1154-1781687471.webp',
      '/images/rooms/hien-phong-1781687475.webp',
      '/images/rooms/view-phong-ngu-1781687455(2).webp'
    ],
    tagline: 'Phòng Deluxe Nhà Mít số 3, thiết kế mộc mạc tinh tế, hiên nhà rộng.',
    pricePerNight: 'Liên hệ',
    features: [
      'Diện tích: 24m²',
      'Giường đôi 1m8x2m êm ái',
      'Ban công hiên phòng view hồ',
      'Phòng tắm view vườn',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen'],
    description: 'Tiêu chuẩn phòng: Diện tích 24m2, Giường 1 x 1m8x2m, Ban công có ghế mây + bàn trà, Hướng View hồ/vườn.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=386',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/386?premium=https://movillage.mytravelviet.net#room-386'
  },
  {
    id: 'room-387',
    code: 'DeluxeRoom4',
    name: 'Deluxe Room 4',
    category: 'Nhà Mít',
    capacity: '2 người',
    capacityNumber: 2,
    bedsCount: 1,
    bedType: '1 x 1m8x2m',
    area: '24m²',
    view: 'View Hồ/Vườn',
    image: '/images/rooms/view-phong-ngu-1781687640(2).webp',
    gallery: [
      '/images/rooms/hien-phong-1781687644.webp',
      '/images/rooms/img-1149-1781687647.webp',
      '/images/rooms/img-1151-1781687651.webp',
      '/images/rooms/img-1154-1781687656.webp',
      '/images/rooms/view-phong-ngu-1-1781687660.webp',
      '/images/rooms/phong-tam-wc-1781687663.webp',
      '/images/rooms/view-phong-ngu-1781687640(2).webp'
    ],
    tagline: 'Phòng Deluxe Nhà Mít số 4, đón trọn gió hồ mát lành và nắng sớm.',
    pricePerNight: 'Liên hệ',
    features: [
      'Diện tích: 24m²',
      'Giường đôi 1m8x2m',
      'Ban công riêng có ghế mây ngắm cảnh',
      'Phòng tắm view vườn',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen'],
    description: 'Tiêu chuẩn phòng: Diện tích 24m2, Giường 1 x 1m8x2m, Ban công view hồ/vườn với bàn ghế mây thư giãn.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=387',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/387?premium=https://movillage.mytravelviet.net#room-387'
  },
  {
    id: 'room-388',
    code: 'FamilyRoom1',
    name: 'Family Room 1',
    category: 'Nhà Mít',
    capacity: '4 người',
    capacityNumber: 4,
    bedsCount: 2,
    bedType: '1 x 1m8x2m + 1 x 1m6x2m',
    area: '48m²',
    view: 'View hồ/vườn/bể bơi',
    image: '/images/rooms/1ii41ffkf-bnv1up-1781688765(2).webp',
    gallery: [
      '/images/rooms/1ii41fes8-bnv1up-1781688773.webp',
      '/images/rooms/1ii41ffcq-bnv1up-1781688781.webp',
      '/images/rooms/1ii41ffhr-bnv1up-1781688791.webp',
      '/images/rooms/1ii41fffb-bnv1up-1781688798.webp',
      '/images/rooms/view-tu-phong-ngu-2-va-phong-khach-1781688805.webp',
      '/images/rooms/f7d8ec96a3680a3653794-1781688810.webp',
      '/images/rooms/hien-ngoai-1781688817.webp',
      '/images/rooms/1ii41ffkf-bnv1up-1781688765(2).webp'
    ],
    tagline: 'Căn hộ gia đình 48m² với 2 phòng ngủ riêng biệt, phòng khách và ban công.',
    pricePerNight: '2.250.000 đ',
    features: [
      'Diện tích: 48m²',
      '2 Phòng ngủ riêng biệt (1m8x2m + 1m6x2m)',
      'Phòng khách sinh hoạt chung ấm cúng',
      'Ban công hiên ngoài view hồ & bể bơi',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen', 'Phòng khách riêng'],
    description: 'Tiêu chuẩn phòng: Diện tích 48m2, 2 Phòng ngủ riêng, Giường: 1 x 1,8x2m + 1 x 1m6x2m, Ban công và phòng khách riêng, Hướng: View hồ/vườn/bể bơi.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=388',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/388?premium=https://movillage.mytravelviet.net#room-388'
  },
  {
    id: 'room-389',
    code: 'FamilyRoom2',
    name: 'Family Room 2',
    category: 'Nhà Mít',
    capacity: '4 người',
    capacityNumber: 4,
    bedsCount: 2,
    bedType: '1 x 1m8x2m + 1 x 1m6x2m',
    area: '48m²',
    view: 'View hồ/vườn/bể bơi',
    image: '/images/rooms/view-phong-ngu-1-1781689295(2).webp',
    gallery: [
      '/images/rooms/view-tu-phong-ngu-2-va-phong-khach-1781689298.webp',
      '/images/rooms/f7d8ec96a3680a3653794-1781689301.webp',
      '/images/rooms/hien-ngoai-1781689304.webp',
      '/images/rooms/1ii41fffb-bnv1up-1781689309.webp',
      '/images/rooms/1ii41ffhr-bnv1up-1781689312.webp',
      '/images/rooms/1ii41ffcq-bnv1up-1781689316.webp',
      '/images/rooms/1ii41ffkf-bnv1up-1781689320.webp',
      '/images/rooms/view-phong-ngu-1-1781689295(2).webp'
    ],
    tagline: 'Căn hộ gia đình Nhà Mít 2, 2 phòng ngủ rộng rãi cho cả gia đình tận hưởng.',
    pricePerNight: '2.250.000 đ',
    features: [
      'Diện tích: 48m²',
      '2 Phòng ngủ riêng biệt tiện nghi',
      'Giường: 1 x 1m8x2m + 1 x 1m6x2m',
      'Ban công rộng & phòng khách thoáng đãng',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen', 'Phòng khách'],
    description: 'Tiêu chuẩn phòng: Diện tích 48m2, 2 Phòng ngủ riêng, Giường: 1 x 1,8x2m + 1 x 1m6x2m, Ban công & Phòng khách, View hồ/vườn/bể bơi.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=389',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/389?premium=https://movillage.mytravelviet.net#room-389'
  },
  {
    id: 'room-390',
    code: 'FamilyExecutiv',
    name: 'Family Executive - 103',
    category: 'Nhà Táo',
    capacity: '4 người',
    capacityNumber: 4,
    bedsCount: 2,
    bedType: '2 x 1m8x2m',
    area: '60m²',
    view: 'View hồ/vườn/bể bơi',
    image: '/images/rooms/img-1765180079175-1765247763983-1781691197(2).webp',
    gallery: [
      '/images/rooms/img-1774371350692-1774371385705-1781691208.webp',
      '/images/rooms/img-1765180079130-1765247762667-1781691221.webp',
      '/images/rooms/img-1765180079175-1765247763983-1781691197(2).webp'
    ],
    tagline: 'Căn Executive đẳng cấp 60m² với 2 phòng ngủ King, bồn tắm ngâm cao cấp.',
    pricePerNight: '2.050.000 đ',
    features: [
      'Diện tích: 60m²',
      '2 Phòng ngủ riêng biệt (2 x 1m8x2m)',
      'Ban công rộng view hồ & bể bơi',
      'Phòng tắm có bồn tắm ngâm sang trọng',
      'Miễn phí 2 trẻ em dưới 12t ngủ chung giường'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen', 'Bồn tắm ngâm'],
    description: 'Chính sách phòng: Diện tích 60m2, 2 Phòng ngủ riêng, Giường: 2 x 1m8x2m, Ban công riêng view hồ/vườn/bể bơi, Bồn tắm ngâm cao cấp. Miễn phí 2 trẻ em dưới 12 tuổi.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=390',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/390?premium=https://movillage.mytravelviet.net#room-390'
  },
  {
    id: 'room-391',
    code: 'DeluxeExecutiv1',
    name: 'Deluxe Executive 1',
    category: 'Nhà Táo',
    capacity: '2 người',
    capacityNumber: 2,
    bedsCount: 1,
    bedType: '1 x 1m8x2m',
    area: '31m²',
    view: 'View hồ/vườn/bể bơi',
    image: '/images/rooms/img-20260513-231412-1781748252(2).webp',
    gallery: [
      '/images/rooms/img-1746585065236-1747200868985-1781748264.webp',
      '/images/rooms/img-20260513-231414-1781748269.webp',
      '/images/rooms/img-1746585065090-1747200868199-1781748282.webp',
      '/images/rooms/img-1746585065192-1747200868732-1781748288.webp',
      '/images/rooms/img-1746585065217-1747200868862-1781748296.webp',
      '/images/rooms/img-20260513-231400-1781748302.webp',
      '/images/rooms/img-20260513-231412-1781748252(2).webp'
    ],
    tagline: 'Phòng Deluxe Executive 31m² có bồn tắm ngâm view trực diện cảnh quan hồ.',
    pricePerNight: '1.500.000 đ',
    features: [
      'Diện tích: 31m²',
      'Giường: 1 x 1m8x2m',
      'Ban công đón nắng & gió hồ',
      'Phòng tắm view hồ/vườn có bồn tắm',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen', 'Bồn tắm'],
    description: 'Tiêu chuẩn phòng: Diện tích 31m2, Giường 1 x 1m8x2m, Ban công riêng, Hướng: View hồ/vườn/bể bơi, Phòng tắm: View hồ/vườn/bể bơi có bồn tắm.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=391',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/391?premium=https://movillage.mytravelviet.net#room-391'
  },
  {
    id: 'room-392',
    code: 'DeluxeExecutiv2',
    name: 'Deluxe Executive 2',
    category: 'Nhà Táo',
    capacity: '2 người',
    capacityNumber: 2,
    bedsCount: 1,
    bedType: '1 x 1m8x2m',
    area: '31m²',
    view: 'View hồ/vườn/bể bơi',
    image: '/images/rooms/view-phong-ngu-2-1781748609(2).webp',
    gallery: [
      '/images/rooms/img-20260513-231232-1781748615.webp',
      '/images/rooms/phong-tam-wc-1-1781748628.webp',
      '/images/rooms/img-1144-1781748639.webp',
      '/images/rooms/efdcf16688725e2c0763109-1781748648.webp',
      '/images/rooms/img-1143-1781748655.webp',
      '/images/rooms/view-phong-ngu-2-1781748609(2).webp'
    ],
    tagline: 'Phòng Deluxe Executive 2, không gian nghỉ dưỡng ấm cúng với bồn tắm ngâm.',
    pricePerNight: '1.500.000 đ',
    features: [
      'Diện tích: 31m²',
      'Giường: 1 x 1m8x2m',
      'Ban công thoáng đãng',
      'Phòng tắm view hồ/vườn có bồn tắm',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen', 'Bồn tắm'],
    description: 'Tiêu chuẩn phòng: Diện tích 31m2, Giường 1 x 1m8x2m, Ban công ngắm cảnh hồ, Phòng tắm tiện nghi có bồn tắm.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=392',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/392?premium=https://movillage.mytravelviet.net#room-392'
  },
  {
    id: 'room-393',
    code: 'DeluxeExecutiv3',
    name: 'Deluxe Executive 3',
    category: 'Nhà Táo',
    capacity: '2 người',
    capacityNumber: 2,
    bedsCount: 1,
    bedType: '1 x 1m8x2m',
    area: '31m²',
    view: 'View hồ/vườn/bể bơi',
    image: '/images/rooms/img-8413-1781749267(2).webp',
    gallery: [
      '/images/rooms/view-tu-cua-vao-phong-1781749276.webp',
      '/images/rooms/img-20260513-231351-1781749284.webp',
      '/images/rooms/img-20250514-123601-1781749295.webp',
      '/images/rooms/img-20250514-123652-1781749301.webp',
      '/images/rooms/img-8413-1781749267(2).webp'
    ],
    tagline: 'Phòng Deluxe Executive 3, tầm nhìn rộng mở, ban công và bồn tắm thư giãn.',
    pricePerNight: '1.500.000 đ',
    features: [
      'Diện tích: 31m²',
      'Giường đôi 1m8x2m',
      'Ban công view hồ',
      'Phòng tắm có bồn tắm ngâm',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen', 'Bồn tắm'],
    description: 'Tiêu chuẩn phòng: Diện tích 31m2, Giường 1 x 1m8x2m, Ban công ngắm cảnh, Phòng tắm view hồ có bồn tắm.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=393',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/393?premium=https://movillage.mytravelviet.net#room-393'
  },
  {
    id: 'room-394',
    code: 'DeluxePremium1',
    name: 'Deluxe Premium 1',
    category: 'Nhà Táo',
    capacity: '2 người',
    capacityNumber: 2,
    bedsCount: 1,
    bedType: '1 x 1m8x2m',
    area: '31m²',
    view: 'View hồ/vườn/bể bơi',
    image: '/images/rooms/deluxe-premium-101-1781749784(2).webp',
    gallery: [
      '/images/rooms/img-1746504206982-1747200771455-1781749789.webp',
      '/images/rooms/img-1746504207001-1747200771614-1781749795.webp',
      '/images/rooms/img-1746504207041-1747200771874-1781749802.webp',
      '/images/rooms/view-bon-tam-1781749809.webp',
      '/images/rooms/img-1746504207120-1747200772345-1781749816.webp',
      '/images/rooms/img-1746504207172-1747200772702-1781749821.webp',
      '/images/rooms/deluxe-premium-101-1781749784(2).webp'
    ],
    tagline: 'Hạng phòng Deluxe Premium tầng 1 với bồn tắm chill hướng trọn mặt hồ.',
    pricePerNight: '1.950.000 đ',
    features: [
      'Diện tích: 31m²',
      'Giường: 1 x 1m8x2m',
      'Ban công view hồ khoáng đạt',
      'Bồn tắm ngâm cực chill view hồ',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen', 'Bồn tắm view hồ'],
    description: 'Tiêu chuẩn phòng: Diện tích 31m2, Giường 1 x 1m8x2m, Ban công riêng, Phòng tắm view hồ/vườn với bồn tắm ngâm lãng mạn.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=394',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/394?premium=https://movillage.mytravelviet.net#room-394'
  },
  {
    id: 'room-395',
    code: 'DeluxePremium2',
    name: 'Deluxe Premium 2',
    category: 'Nhà Táo',
    capacity: '2 người',
    capacityNumber: 2,
    bedsCount: 1,
    bedType: '1 x 1m8x2m',
    area: '31m²',
    view: 'View hồ/vườn/bể bơi',
    image: '/images/rooms/view-ho-1781750371(2).webp',
    gallery: [
      '/images/rooms/view-ban-cong-1781750375.webp',
      '/images/rooms/bon-tam-chill-1781750389.webp',
      '/images/rooms/img-1773200625242-1773200753745-1781750396.webp',
      '/images/rooms/deluxe-premium-tang-2-1781750411.webp',
      '/images/rooms/ban-cong-1781750417.webp',
      '/images/rooms/img-1773200625404-1773200762247-1781750424.webp',
      '/images/rooms/img-1773200625474-1773200766359-1781750437.webp',
      '/images/rooms/view-ho-1781750371(2).webp'
    ],
    tagline: 'Hạng phòng Deluxe Premium tầng 2, ban công trên cao ngắm toàn cảnh hồ mộng mơ.',
    pricePerNight: '1.950.000 đ',
    features: [
      'Diện tích: 31m²',
      'Giường: 1 x 1m8x2m',
      'Ban công tầng 2 ngắm hồ tuyệt đẹp',
      'Bồn tắm ngâm view hồ thơ mộng',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen', 'Bồn tắm view hồ'],
    description: 'Tiêu chuẩn phòng: Diện tích 31m2, Giường 1 x 1m8x2m, Ban công tầng 2, Phòng tắm view hồ với bồn tắm thư giãn đẳng cấp.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=395',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/395?premium=https://movillage.mytravelviet.net#room-395'
  },
  {
    id: 'room-396',
    code: 'Đ1',
    name: 'Nhà Đào 1',
    category: 'Nhà Đào',
    capacity: '2 người',
    capacityNumber: 2,
    bedsCount: 1,
    bedType: '1 x 2mx2m',
    area: '32m²',
    view: 'View Hồ/Vườn',
    image: '/images/rooms/trong-phong-1781750947(2).webp',
    gallery: [
      '/images/rooms/nha-tam-rong-rai-1781750953.webp',
      '/images/rooms/img-1774371350578-1774371380158-1781750963.webp',
      '/images/rooms/img-1774371350570-1774371379825-1781750973.webp',
      '/images/rooms/img-1746504277321-1747893743445-1781750985.webp',
      '/images/rooms/img-1746504277301-1747893743289-1781750989.webp',
      '/images/rooms/img-8917-1781750993.webp',
      '/images/rooms/trong-phong-1781750947(2).webp'
    ],
    tagline: 'Phòng Nhà Đào 1 ấm áp, nội thất gỗ mộc tinh tế, bồn tắm ngâm view hồ.',
    pricePerNight: '1.950.000 đ',
    features: [
      'Diện tích: 32m²',
      'Giường King 2mx2m',
      'Ban công rộng view hồ/vườn',
      'Phòng tắm view hồ với bồn tắm lớn',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen', 'Bồn tắm'],
    description: 'Tiêu chuẩn phòng: Diện tích: 32m2, Giường: 1 x 2mx2m, Ban công: Có, Hướng: View hồ/vườn, Phòng tắm: View hồ có bồn tắm ngâm.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=396',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/396?premium=https://movillage.mytravelviet.net#room-396'
  },
  {
    id: 'room-397',
    code: 'Đ2',
    name: 'Nhà Đào 2',
    category: 'Nhà Đào',
    capacity: '2 người',
    capacityNumber: 2,
    bedsCount: 1,
    bedType: '1 x 2mx2m',
    area: '32m²',
    view: 'View Hồ/Vườn',
    image: '/images/rooms/suite-lake-view-1781751326(2).webp',
    gallery: [
      '/images/rooms/img-8914-1781751332.webp',
      '/images/rooms/img-1774371350578-1774371380158-1781751337.webp',
      '/images/rooms/nha-tam-rong-rai-1781751341.webp',
      '/images/rooms/img-1774371350570-1774371379825-1781751345.webp',
      '/images/rooms/img-8322-1781751349.webp',
      '/images/rooms/img-1774371350588-1774371380557-1781751356.webp',
      '/images/rooms/suite-lake-view-1-1781751370.webp',
      '/images/rooms/suite-lake-view-1781751326(2).webp'
    ],
    tagline: 'Suite Lake View Nhà Đào 2, ngắm bình minh trên mặt nước hồ Hòa Bình.',
    pricePerNight: '1.950.000 đ',
    features: [
      'Diện tích: 32m²',
      'Giường King 2mx2m',
      'Ban công riêng view hồ',
      'Phòng tắm view hồ có bồn tắm',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen', 'Bồn tắm'],
    description: 'Tiêu chuẩn phòng: Diện tích: 32m2, Giường: 1 x 2mx2m, Ban công riêng ngắm cảnh, Phòng tắm view hồ thư thái.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=397',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/397?premium=https://movillage.mytravelviet.net#room-397'
  },
  {
    id: 'room-398',
    code: 'M2',
    name: 'Nhà Mận 2',
    category: 'Nhà Mận',
    capacity: '2 người',
    capacityNumber: 2,
    bedsCount: 1,
    bedType: '1 x 2mx2m',
    area: '32m²',
    view: 'View Hồ/Vườn',
    image: '/images/rooms/036913d5e5df33816ace128-1781751843(2).webp',
    gallery: [
      '/images/rooms/img-1774364115101-1774364124818-1781751847.webp',
      '/images/rooms/img-1757148509409-1774370725030-1781751853.webp',
      '/images/rooms/phong-tam-1781751859.webp',
      '/images/rooms/view-phong-tam-bon-1781751862.webp',
      '/images/rooms/img-20250611-223904-1781751869.webp',
      '/images/rooms/img-1746504277359-1747893743757-1781751877.webp',
      '/images/rooms/036913d5e5df33816ace128-1781751843(2).webp'
    ],
    tagline: 'Phòng Nhà Mận 2 sang trọng, view hồ nước êm đềm và rừng cây xanh.',
    pricePerNight: '1.950.000 đ',
    features: [
      'Diện tích: 32m²',
      'Giường: 1 x 2mx2m',
      'Ban công view hồ/vườn',
      'Phòng tắm view hồ với bồn tắm ngâm',
      'Miễn phí 1 trẻ em dưới 12t'
    ],
    amenities: ['Bàn làm việc', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen', 'Bồn tắm'],
    description: 'Tiêu chuẩn phòng: Diện tích: 32m2, Giường: 1 x 2mx2m, Ban công: Có, Hướng: View hồ/vườn, Phòng tắm: View hồ.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=398',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/398?premium=https://movillage.mytravelviet.net#room-398'
  },
  {
    id: 'room-399',
    code: 'S1',
    name: 'Nhà Sang 1',
    category: 'Nhà Sang',
    capacity: '4 người',
    capacityNumber: 4,
    bedsCount: 2,
    bedType: '2 x 1m8x2m',
    area: '60m²',
    view: 'View Hồ/Vườn',
    image: '/images/rooms/20250725-080819-1781752900(2).webp',
    gallery: [
      '/images/rooms/khong-gian-2-phong-ngu-1781752933.webp',
      '/images/rooms/phong-tam-wc-1781752945.webp',
      '/images/rooms/view-ben-ngoai-hien-1781752951.webp',
      '/images/rooms/hien-tra-chieu-1781752959.webp',
      '/images/rooms/canh-ve-dem-1781752972.webp',
      '/images/rooms/20250725-075817-1781752978.webp',
      '/images/rooms/20250725-080349-1781752995.webp',
      '/images/rooms/20250725-080819-1781752900(2).webp'
    ],
    tagline: 'Biệt thự Nhà Sang 60m², 2 phòng ngủ riêng, hiên trà chiều view hồ tuyệt sắc.',
    pricePerNight: '3.250.000 đ',
    features: [
      'Diện tích: 60m²',
      '2 Phòng ngủ riêng biệt (2 x 1m8x2m)',
      'Phòng khách & Hiên trà chiều ngắm cảnh',
      'Ban công rộng view toàn cảnh hồ',
      'Phù hợp gia đình & nhóm bạn 4 người'
    ],
    amenities: ['Phòng khách riêng', 'Hiên trà chiều', 'Áo choàng tắm', 'Dép đi trong nhà', 'Trà / cà phê / ấm đun', 'Kệ treo đồ', 'Vòi sen'],
    description: 'Tiêu chuẩn phòng: Diện tích: 60m2, 2 Phòng ngủ riêng, Giường: 2 x 1m8x2m, Ban công & Phòng khách, Hướng: View hồ/vườn, Hiên trà chiều ngắm hoàng hôn.',
    vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=399',
    bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/399?premium=https://movillage.mytravelviet.net#room-399'
  }
],
    },
    experiences: {
      tagline: 'Trải nghiệm',
      title: 'Khám phá và tận hưởng',
      sub: 'Từ hoạt động phiêu lưu đến workshop nghệ thuật, mỗi trải nghiệm là một kỷ niệm',
      categories: {
        facilities: 'Hoạt động tại Mơ',
        workshops: 'Workshop & văn hóa',
        nearby: 'Điểm đến lân cận',
      },
      facilitiesList: [
        {
          id: 'onsen',
          title: 'Bể sục Onsen 4 mùa',
          desc: 'Thư giãn trong bể sục nước nóng tự nhiên giữa không gian núi rừng',
          image: '/images/fac-onsen.webp',
        },
        {
          id: 'sauna',
          title: 'Phòng xông ướt, xông khô',
          desc: 'Xông hơi thải độc, làm sạch cơ thể và tâm trí',
          image: '/images/campus-lake.webp',
        },
        {
          id: 'herbal-bath',
          title: 'Ngâm bồn thuốc thảo dược',
          desc: 'Ngâm mình trong các loại thảo dược thiên nhiên, phục hồi năng lượng',
          image: '/images/fac-herbal-bath.webp',
        },
        {
          id: 'lake-fun',
          title: 'Giải trí trên hồ',
          desc: 'Kayak, cano, câu cá - khám phá hồ Hòa Bình bằng nhiều cách',
          image: '/images/fac-billiard.webp',
        },
        {
          id: 'boat-tour',
          title: 'Tour thuyền thăm quan',
          desc: 'Du thuyền ngắm hoàng hôn, ghé thăm làng nổi và làng cá',
          image: '/images/gallery-lake-deck.webp',
        },
        {
          id: 'teambuilding',
          title: 'Team Building',
          desc: 'Tổ chức team building cho công ty và nhóm lớn với hoạt động ngoài trời và không gian riêng tư',
          image: '/images/gallery-pool-sunset.webp',
        },
      ],
      workshopsList: [
        {
          id: 'cam-hoa',
          title: 'Cắm hoa',
          desc: 'Workshop cắm hoa phong cách tự nhiên với hoa địa phương, thể hiện vẻ đẹp giản dị của núi rừng Hòa Bình',
        },
        {
          id: 'lam-banh',
          title: 'Làm bánh',
          desc: 'Học làm bánh truyền thống Mường như bánh dày, cốm, và các món bánh hiện đại từ nguyên liệu địa phương',
        },
        {
          id: 'thu-cong',
          title: 'Thủ công',
          desc: 'Dệt thổ cẩm Mường với họa tiết truyền thống, làm đồ gỗ, và học các nghề thủ công từ người dân bản địa',
        },
      ],
      nearbyList: [
        {
          id: 'chua-thac-bo',
          title: 'Chúa Thác Bờ',
          desc: 'Thác nước hùng vĩ cao 300m với cảnh quan tráng lệ, nơi du khách có thể chiêm ngưỡng thiên nhiên hoang sơ và chụp ảnh check-in đẹp mắt',
          distance: '15km',
        },
        {
          id: 'suoi-ke',
          title: 'Suối Ké',
          desc: 'Suối đá tự nhiên trong vắt với dòng nước mát lạnh quanh năm, nơi lý tưởng để tắm mát và thư giãn giữa thiên nhiên',
          distance: '8km',
        },
        {
          id: 'hang-lo-lan',
          title: 'Hang Lỗ Làn',
          desc: 'Hang động tự nhiên với nhũ đá hình thành hàng nghìn năm, một kỳ quan địa chất độc đáo của vùng núi đá vôi Hòa Bình',
          distance: '12km',
        },
        {
          id: 'ban-sung',
          title: 'Bản Sưng',
          desc: 'Bản làng Mường truyền thống giữ gìn văn hóa bản địa, nơi bạn có thể trải nghiệm lối sống, trang phục và ẩm thực của người Mường',
          distance: '10km',
        },
      ],
    },
    gallery: {
      tagline: 'Góc nhìn Mơ',
      title: 'Thư viện ảnh',
      sub: 'Những khoảnh khắc đẹp như tranh vẽ ghi lại tại Mơ Village qua các mùa trong năm.',
      filterAll: 'Tất cả',
      filterLandscape: 'Cảnh quan hồ',
      filterRooms: 'Không gian nghỉ',
      filterFacilities: 'Tiện ích & Thư giãn',
      filterDining: 'Ẩm thực & Cafe',
      images: [
        { id: '1', title: 'Toàn cảnh Mơ Village lúc lên đèn', image: '/images/gallery-aerial.webp', category: 'landscape' as const },
        { id: '2', title: 'Góc ban công ngắm hồ', image: '/images/gallery-balcony.webp', category: 'rooms' as const },
        { id: '3', title: 'Bể bơi vô cực uốn lượn', image: '/images/fac-onsen.webp', category: 'facilities' as const },
        { id: '4', title: 'Mâm cơm ẩm thực Tây Bắc', image: '/images/gallery-restaurant.webp', category: 'dining' as const },
        { id: '5', title: 'Ngắm hồ Hòa Bình bảng lảng sương sớm', image: '/images/campus-lake.webp', category: 'landscape' as const },
        { id: '6', title: 'Hiên nhà gỗ & bồn tắm ngâm', image: '/images/room-nha-tao.webp', category: 'rooms' as const },
        { id: '7', title: 'Thư giãn trên lưới võng mặt hồ', image: '/images/gallery-lake-deck.webp', category: 'landscape' as const },
        { id: '8', title: 'Không gian giải trí bi-a', image: '/images/fac-billiard.webp', category: 'facilities' as const },
        { id: '9', title: 'Nhà Đào nép mình bên tán cây', image: '/images/room-nha-dao.webp', category: 'rooms' as const },
        { id: '10', title: 'Khuôn viên bãi cỏ và cảnh quan xanh', image: '/images/fac-teambuilding.webp', category: 'facilities' as const },
        { id: '11', title: 'Bể bơi ôm trọn vách núi xanh', image: '/images/fac-sauna.webp', category: 'facilities' as const },
        { id: '12', title: 'Khung cửa sổ view vịnh hồ', image: '/images/gallery-interior-wood.webp', category: 'rooms' as const },
        { id: '13', title: 'Sàn gỗ ngắm mây trời', image: '/images/gallery-walkway.webp', category: 'landscape' as const },
        { id: '14', title: 'Bể bơi vô cực dưới trời trong biếc', image: '/images/gallery-pool-sunset.webp', category: 'facilities' as const },
      ],
    },
    directions: {
      tagline: 'Chỉ đường & Lưu ý',
      title: 'Đường đến Mơ',
      sub: 'Rời phố một chút. Chạm hồ thật gần.',
      mapTitle: 'Vị trí Mơ Village trên Google Maps',
      openGoogleMaps: 'Chỉ đường',
      hotlineDirect: 'Hotline hỗ trợ dẫn đường: 0964 863 838',
      routeDesc: 'Từ trung tâm Hà Nội, hành trình hơn 100 km đưa bạn qua những triền núi và đường ven hồ. Cung đường đẹp, có đoạn đèo dốc - hãy đi thong thả, Mơ vẫn ở đây chờ.',
      routeSteps: ['Hà Nội', 'Hòa Lạc', 'Hòa Bình', 'Xóm Mơ'],
      howToGet: [
        {
          title: 'Tự lái Ô tô / Xe máy',
          desc: 'Từ Trung tâm Hà Nội đi theo Đại lộ Thăng Long -> Cao tốc Hòa Lạc - Hòa Bình -> Đường tỉnh 433 lên Đà Bắc -> Đến Mơ Village (Khoảng 2h - 2h30). Đường nhựa đẹp, xe sedan 4 chỗ đi thuận tiện.',
          icon: '🚗',
        },
        {
          title: 'Xe Limousine đưa đón',
          desc: 'Mơ Village có liên kết với các nhà xe Limousine 9-16 chỗ chất lượng cao đưa đón tận nơi từ nội thành Hà Nội về thẳng Mơ hoặc Cảng Bích Hạ/Thung Nai.',
          icon: '🚐',
        },
        {
          title: 'Đường thủy du thuyền',
          desc: 'Bạn có thể gửi ô tô tại Cảng Thung Nai/Cảng Bích Hạ và trải nghiệm cano cao tốc lướt trên mặt hồ 20 phút để đến thẳng cầu tàu của Mơ Village.',
          icon: '🚤',
        },
      ],
      faqs: [
        {
          id: 'faq-1',
          num: '01',
          question: 'Mơ cách Hà Nội bao xa?',
          answer: 'Mơ nằm bên hồ Hòa Bình, tại khu vực Đà Bắc, cách Hà Nội hơn 100 km. Thời gian di chuyển thường khoảng 3 – 3,5 giờ tùy cung đường và điều kiện giao thông.',
        },
        {
          id: 'faq-2',
          num: '02',
          question: 'Đến Mơ có thể làm gì?',
          answer: 'Bạn có thể tham gia chèo kayak/SUP trên hồ, bơi bể bơi vô cực nước ấm, tắm khoáng thảo dược, thưởng thức ẩm thực Mường và tham gia các workshop văn hóa truyền thống.',
        },
        {
          id: 'faq-3',
          num: '03',
          question: 'Mơ có phù hợp với gia đình và đoàn nhỏ?',
          answer: 'Rất phù hợp! Mơ có nhiều hạng phòng đa dạng từ Nhà Mít, Nhà Sang (villa 3 phòng ngủ có bếp và BBQ) đến Nhà Sàn cộng đồng, cùng khuôn viên bãi cỏ rộng rãi cho trẻ em vui chơi.',
        },
        {
          id: 'faq-4',
          num: '04',
          question: 'Nên đặt phòng trước bao lâu?',
          answer: 'Vào các dịp cuối tuần và lễ tết, Mơ thường hết phòng sớm. Quý khách nên đặt trước từ 1 đến 3 tuần để chọn được căn nhà và dịch vụ ưng ý nhất.',
        },
      ],
    },
    packages: {
      tagline: 'Gói & Dịch vụ',
      title: 'Các gói combo & dịch vụ',
      sub: 'Lựa chọn gói nghỉ dưỡng trọn gói để thảnh thơi tận hưởng trọn vẹn từng khoảnh khắc.',
      selectPackage: 'Chọn gói này',
      items: [
        {
          id: 'combo-2n1d',
          title: '2 ngày 1 đêm',
          subtitle: 'Weekend Escape',
          price: '1.800.000',
          priceUnit: 'đ/khách',
          isPopular: false,
          badge: 'Quick Getaway',
          features: [
            '1 đêm nghỉ + ăn sáng + 1 bữa chính',
            'Chèo kayak hoặc câu cá + sử dụng hồ bơi, sàn yoga',
          ],
          itinerarySummary: [
            'Ngày 1: Check-in 14:00 -> Thưởng trà chiều ngắm hồ -> Chèo Kayak -> Bữa tối đặc sản Mường -> Lửa trại ngắm sao.',
            'Ngày 2: Yoga đón bình minh -> Điểm tâm sáng -> Thư giãn bể bơi/xông hơi -> Check-out 12:00.',
          ],
        },
        {
          id: 'combo-3n2d',
          title: '3 ngày 2 đêm',
          subtitle: 'Complete Experience',
          price: '3.200.000',
          priceUnit: 'đ/khách',
          isPopular: true,
          badge: 'Phổ biến',
          features: [
            '2 đêm nghỉ + ăn sáng + 2 bữa chính',
            'Tour thuyền hoàng hôn + 1 workshop (cắm hoa hoặc làm bánh)',
            'Spa massage 60 phút + sử dụng đầy đủ tiện ích',
          ],
          itinerarySummary: [
            'Ngày 1: Đón tiếp nồng ấm -> Check-in -> Thưởng trà -> Chèo Kayak hoàng hôn -> Bữa tối lẩu cá lăng ven hồ.',
            'Ngày 2: Tour thuyền thăm đảo đá vôi & đền Thác Bờ -> Workshop văn hóa -> Ngâm bồn khoáng thuốc Mường -> Tiệc nướng BBQ.',
            'Ngày 3: Dạo bộ làng cổ -> Điểm tâm -> Check-out với quà lưu niệm đặc sản Mơ.',
          ],
        },
      ],
    },
    booking: {
      tagline: 'GỬI MỘT LỜI HẸN',
      title: 'Cuối tuần này, mình đi Mơ nhé?',
      sub: 'Chọn ngày, chọn người đồng hành. Phần biên văn chuẩn bị, để Mơ chuẩn bị.',
      form: {
        fullName: 'Họ và tên của bạn',
        fullNamePlaceholder: 'Ví dụ: Nguyễn Văn An',
        phone: 'Số điện thoại / Zalo',
        phonePlaceholder: 'Ví dụ: 0987 654 321',
        email: 'Địa chỉ Email (tùy chọn)',
        emailPlaceholder: 'name@example.com',
        checkIn: 'Ngày nhận phòng',
        checkOut: 'Ngày trả phòng',
        adults: 'Người lớn (>12 tuổi)',
        children: 'Trẻ em (dưới 12 tuổi)',
        roomType: 'Hạng phòng hoặc Gói combo bạn quan tâm',
        roomTypePlaceholder: '-- Chọn hạng phòng hoặc combo --',
        specialRequests: 'Ghi chú thêm (yêu cầu ăn uống, xe đưa đón, tổ chức sự kiện...)',
        specialRequestsPlaceholder: 'Ví dụ: Cần phòng tầng 2 view hồ đẹp, cần xe đón từ Keangnam...',
        submit: 'Gửi yêu cầu đặt phòng',
        submitting: 'Đang gửi yêu cầu...',
        successTitle: 'Gửi yêu cầu thành công!',
        successMessage: 'Cảm ơn bạn đã liên hệ Mơ Village. Đội ngũ tư vấn sẽ gọi lại cho bạn qua Zalo/Điện thoại trong vòng 15 phút để xác nhận chi tiết.',
      },
    },
    footer: {
      aboutTitle: 'Mơ Village Resort',
      aboutDesc: 'Một giấc mơ dịu trên mặt hồ Hòa Bình. Nơi bạn tìm lại sự cân bằng, hít hà không khí núi rừng và tận hưởng những khoảnh khắc quý giá.',
      quickLinksTitle: 'Liên kết nhanh',
      contactTitle: 'Thông tin liên hệ',
      address: 'Xóm Ké, Xã Hiền Lương, Huyện Đà Bắc, Tỉnh Hòa Bình, Việt Nam',
      hotline: '0964 863 838',
      email: 'booking@movillage.vn',
      hours: 'Phục vụ 24/7 hàng ngày',
      followUs: 'Mạng xã hội',
      copyright: '© 2026 Mơ Village Resort. Tất cả quyền được bảo lưu.',
      poweredBy: 'A gentle dream on Hòa Bình Lake',
    },
  },
  en: {
    nav: {
      story: 'Our Story',
      rooms: 'Rooms',
      experiences: 'Experiences',
      gallery: 'Gallery',
      directions: 'Getting to Mơ',
      packages: 'Packages',
      bookNow: 'Book your stay',
    },
    hero: {
      title: 'A gentle dream on Hòa Bình Lake',
      sub: 'A serene lakeside sanctuary blending authentic Mường stilt house heritage with peaceful Northwest nature.',
      ctaPrimary: 'Book your stay',
      ctaSecondary: 'Explore Rooms',
      scrollDown: 'Scroll to explore',
    },
    story: {
      tagline: 'The Story of Mơ',
      title: 'A gentle dream on Hòa Bình Lake',
      lead: 'Mơ Village is a lakeside retreat blending the calm of water, mist, and forest with the warmth of Mường stilt-house vernacular. A contemporary, quietly whimsical place to rest, reconnect, and explore.',
      cards: [
        {
          title: 'Hòa Bình Lake',
          desc: "Vietnam's largest artificial lake, formed by Hòa Bình Dam in 1994. Covers 230 km², reaches 40m depth, with ethereal morning mist creating dreamlike vistas.",
          image: '/images/campus-lake.webp',
          stat: '230 km² Water Surface',
        },
        {
          title: 'Đà Bắc - Hòa Bình',
          desc: '100km from Hanoi (2-hour drive). Home to Mường ethnic communities with rich cultural traditions. Cool climate year-round, dotted with waterfalls and caves.',
          image: '/images/campus-da-bac.webp',
          stat: '~100 km From Hanoi',
        },
        {
          title: 'Stilt House Architecture',
          desc: 'Inspired by traditional Mường stilt houses with wooden pillars, thatched roofs, and airy spaces. Harmoniously blending cultural heritage with modern comfort.',
          image: '/images/room-nha-tao.webp',
          stat: '100% Natural Materials',
        },
      ],
    },
    rooms: {
      tagline: 'WHAT MƠ OFFERS',
      title: 'Room Categories',
      sub: 'From cozy stilt houses to spacious villas, each space carries its own character',
      viewDetails: 'Room Details',
      bookThis: 'Book this Room',
      guestLabel: 'guests',
      items: [
      {
            id: 'room-380',
            code: 'M1',
            name: 'Nhà Mận 1',
            category: 'Nhà Mận',
            capacity: '2 guests',
            capacityNumber: 2,
            bedsCount: 1,
            bedType: '1 King bed (2m x 2m)',
            area: '32m²',
            view: 'Lake & Garden view',
            image: '/images/rooms/img-2945-1781666658(2).webp',
            gallery: [
      '/images/rooms/img-1746504277359-1747893743757-1781666666.webp',
      '/images/rooms/img-20250611-223904-1781666671.webp',
      '/images/rooms/img-1746504277558-1747893745323-1781666679.webp',
      '/images/rooms/img-1757148509409-1774370725030-1781666685.webp',
      '/images/rooms/img-1774364115124-1774364124972-1781666691.webp',
      '/images/rooms/phong-tam-1781666698.webp',
      '/images/rooms/img-2945-1781666658(2).webp'
    ],
            tagline: 'Luxury double room with soaking bathtub and private balcony overlooking Hòa Bình Lake.',
            pricePerNight: '1,950,000 VND',
            features: [
                  'Area: 32m²',
                  'Bed: 1 King bed (2m x 2m)',
                  'Lake & garden view balcony',
                  'Lake-view bathroom with bathtub & shower',
                  'Complimentary stay for 1 child under 12 sharing bed'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower',
                  'Lake-view bathtub'
            ],
            description: 'Room standards: 32m² floor area, 1 King bed (2m x 2m), private balcony overlooking lake and garden, romantic en-suite soaking tub with lake view. Policy: Free for 1 child under 12 sharing existing bed.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=380',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/380?premium=https://movillage.mytravelviet.net#room-380'
      },
      {
            id: 'room-381',
            code: 'Dorm8pax',
            name: 'Dorm 8 pax',
            category: 'Nhà Cộng Đồng',
            capacity: '8 guests',
            capacityNumber: 8,
            bedsCount: 8,
            bedType: '8 single futons (1.1m x 2m)',
            area: '60m²',
            view: 'Lake, garden & lawn view',
            image: '/images/rooms/img-8432-1781683598.webp',
            gallery: [
      '/images/rooms/img-1746501071655-1746501111175-1781683573.webp',
      '/images/rooms/img-8442-1781683580.webp',
      '/images/rooms/img-8429-1781683592.webp',
      '/images/rooms/img-8432-1781683598.webp',
      '/images/rooms/img-8431-1781683604.webp',
      '/images/rooms/anh-phong-dorm-8-pax-1781768028(1).webp'
    ],
            tagline: 'Cozy 8-guest dorm with 2 private bathrooms, ideal for friend groups.',
            pricePerNight: '3,500,000 VND',
            features: [
                  'Area: 60m²',
                  '8 single futons (1.1m x 2m)',
                  '2 private bathrooms & 2 WCs',
                  'Spacious shared living space',
                  'Airy lake & lawn view'
            ],
            amenities: [
                  'Personal lockers',
                  'Shared living lounge',
                  '2 Hot water bathrooms',
                  '2 Private WCs',
                  'High-capacity fans & AC'
            ],
            description: 'Room standards: 60m² area, 8 single futons (1.1m x 2m), 2 bathrooms / 2 WCs, comfortable common lounge. Ideal for close friend groups or large families.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=381',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/381?premium=https://movillage.mytravelviet.net#room-381'
      },
      {
            id: 'room-382',
            code: 'Dorm3Pax',
            name: 'Dorm 3 Pax',
            category: 'Nhà Cộng Đồng',
            capacity: '3 guests',
            capacityNumber: 3,
            bedsCount: 3,
            bedType: '3 single futons (1.1m x 2m)',
            area: '14m²',
            view: 'Garden view',
            image: '/images/rooms/img-20260513-230504-1781684295.webp',
            gallery: [
      '/images/rooms/dorm-3-1781684273.webp',
      '/images/rooms/img-20260513-230504-1781684295.webp',
      '/images/rooms/img-20260513-230503-1781684308.webp',
      '/images/rooms/img-20260513-230502-1781684320.webp',
      '/images/rooms/img-20260513-230100-1781684333.webp',
      '/images/rooms/img-8443-1781684257(1).webp'
    ],
            tagline: 'Charming wooden floor room with 3 futons, peaceful garden view and great value.',
            pricePerNight: '750,000 VND',
            features: [
                  'Area: 14m²',
                  'Wooden floor with 3 futons (1.1m x 2m)',
                  'Facing lush greenery and gardens',
                  'Convenient external bathroom',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Bookshelf',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower'
            ],
            description: 'Room standards: 14m² area, wooden floor with 3 futons (1.1m x 2m), peaceful garden orientation. Complimentary for 1 child under 12.',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/382?premium=https://movillage.mytravelviet.net#room-382'
      },
      {
            id: 'room-383',
            code: 'Dorm20pax',
            name: 'Dorm 20 pax',
            category: 'Nhà Cộng Đồng',
            capacity: '20 guests',
            capacityNumber: 20,
            bedsCount: 20,
            bedType: '20 single futons (1.1m x 2m)',
            area: '130m²',
            view: 'Lake & Garden view',
            image: '/images/rooms/dorm-20-1781685707(2).webp',
            gallery: [
      '/images/rooms/dorm-20-1-1781685718.webp',
      '/images/rooms/nha-tam-va-wc-1781685733.webp',
      '/images/rooms/ban-cong-rong-1781685740.webp',
      '/images/rooms/cau-thang-1781685746.webp',
      '/images/rooms/toa-dorm-20-1781685760.webp',
      '/images/rooms/dorm-20-1781685707(2).webp'
    ],
            tagline: 'Grand 130m² stilt house dorm, 4 bathrooms/4 WCs, wide balcony overlooking the lake.',
            pricePerNight: '7,500,000 VND',
            features: [
                  'Area: 130m² full floor',
                  '20 premium single futons (1.1m x 2m)',
                  '4 private bathrooms & 4 separate WCs',
                  'Expansive balcony overlooking the entire lake',
                  'Perfect for team building & large delegations'
            ],
            amenities: [
                  'Personal lockers',
                  'Spacious common lounge',
                  'Balcony with outdoor seating',
                  '4 Bathrooms / 4 WCs',
                  'Ceiling fans & AC system'
            ],
            description: 'Room standards: 130m² area, 20 single futons (1.1m x 2m), 4 full bathrooms / 4 WCs, expansive balcony with panoramic lake and garden view.',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/383?premium=https://movillage.mytravelviet.net#room-383'
      },
      {
            id: 'room-384',
            code: 'DeluxeRoom',
            name: 'Deluxe Room',
            category: 'Nhà Mít',
            capacity: '2 guests',
            capacityNumber: 2,
            bedsCount: 1,
            bedType: '1 Queen bed (1.8m x 2m)',
            area: '24m²',
            view: 'Lake & Garden view',
            image: '/images/rooms/view-phong-ngu-1781686716(2).webp',
            gallery: [
      '/images/rooms/view-phong-ngu-1-1781686722.webp',
      '/images/rooms/hien-phong-1781686727.webp',
      '/images/rooms/img-1149-1781686734.webp',
      '/images/rooms/img-1151-1781686743.webp',
      '/images/rooms/img-1154-1781686751.webp',
      '/images/rooms/phong-tam-wc-1781686760.webp',
      '/images/rooms/view-phong-ngu-1781686716(2).webp'
    ],
            tagline: 'Deluxe room with panoramic lake view, warm wooden decor and private balcony.',
            pricePerNight: '1,500,000 VND',
            features: [
                  'Area: 24m²',
                  'Bed: 1 Queen bed (1.8m x 2m)',
                  'Lake & garden view balcony',
                  'Private bathroom with hot shower',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower'
            ],
            description: 'Standard Deluxe room with 24m² area, Queen bed (1.8m x 2m), private balcony with peaceful lake view. Complimentary stay for 1 child under 12.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=384',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/384?premium=https://movillage.mytravelviet.net#room-384'
      },
      {
            id: 'room-385',
            code: 'DeluxeRoom2',
            name: 'Deluxe Room 2',
            category: 'Nhà Mít',
            capacity: '2 guests',
            capacityNumber: 2,
            bedsCount: 1,
            bedType: '1 Queen bed (1.8m x 2m)',
            area: '24m²',
            view: 'Lake & Garden view',
            image: '/images/rooms/view-phong-ngu-1781687060.webp',
            gallery: [
      '/images/rooms/view-phong-ngu-1-1781687063.webp',
      '/images/rooms/phong-tam-wc-1781687067.webp',
      '/images/rooms/img-1154-1781687070(1).webp',
      '/images/rooms/img-1151-1781687075.webp',
      '/images/rooms/img-1149-1781687079.webp',
      '/images/rooms/hien-phong-1781687083.webp',
      '/images/rooms/view-phong-ngu-1781687060.webp'
    ],
            tagline: 'Airy double room with serene lake view, peaceful retreat amidst nature.',
            pricePerNight: '1,500,000 VND',
            features: [
                  'Area: 24m²',
                  'Bed: 1 Queen bed (1.8m x 2m)',
                  'Lake & garden view balcony',
                  'Private bathroom with hot shower',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower'
            ],
            description: 'Standard Deluxe room 2 with 24m² area, Queen bed (1.8m x 2m), tranquil surroundings and lake view.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=385',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/385?premium=https://movillage.mytravelviet.net#room-385'
      },
      {
            id: 'room-386',
            code: 'DeluxeRoom3',
            name: 'Deluxe Room 3',
            category: 'Nhà Mít',
            capacity: '2 guests',
            capacityNumber: 2,
            bedsCount: 1,
            bedType: '1 Queen bed (1.8m x 2m)',
            area: '24m²',
            view: 'Lake & Garden view',
            image: '/images/rooms/view-phong-ngu-1781687455(2).webp',
            gallery: [
      '/images/rooms/view-phong-ngu-1-1781687459.webp',
      '/images/rooms/img-1151-1781687462.webp',
      '/images/rooms/img-1149-1781687466.webp',
      '/images/rooms/img-1154-1781687471.webp',
      '/images/rooms/hien-phong-1781687475.webp',
      '/images/rooms/view-phong-ngu-1781687455(2).webp'
    ],
            tagline: 'Quiet double room overlooking lush garden and lake, ideal for relaxing getaways.',
            pricePerNight: '1,500,000 VND',
            features: [
                  'Area: 24m²',
                  'Bed: 1 Queen bed (1.8m x 2m)',
                  'Lake & garden view balcony',
                  'Private bathroom with hot shower',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower'
            ],
            description: 'Standard Deluxe room 3 with 24m² area, Queen bed (1.8m x 2m), fresh air and lake views.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=386',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/386?premium=https://movillage.mytravelviet.net#room-386'
      },
      {
            id: 'room-387',
            code: 'DeluxeRoom4',
            name: 'Deluxe Room 4',
            category: 'Nhà Mít',
            capacity: '2 guests',
            capacityNumber: 2,
            bedsCount: 1,
            bedType: '1 Queen bed (1.8m x 2m)',
            area: '24m²',
            view: 'Lake & Garden view',
            image: '/images/rooms/view-phong-ngu-1781687640(2).webp',
            gallery: [
      '/images/rooms/hien-phong-1781687644.webp',
      '/images/rooms/img-1149-1781687647.webp',
      '/images/rooms/img-1151-1781687651.webp',
      '/images/rooms/img-1154-1781687656.webp',
      '/images/rooms/view-phong-ngu-1-1781687660.webp',
      '/images/rooms/phong-tam-wc-1781687663.webp',
      '/images/rooms/view-phong-ngu-1781687640(2).webp'
    ],
            tagline: 'Cozy retreat room with romantic lake view, modern boutique comfort.',
            pricePerNight: '1,500,000 VND',
            features: [
                  'Area: 24m²',
                  'Bed: 1 Queen bed (1.8m x 2m)',
                  'Lake & garden view balcony',
                  'Private bathroom with hot shower',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower'
            ],
            description: 'Standard Deluxe room 4 with 24m² area, Queen bed (1.8m x 2m), peaceful ambiance and lake vistas.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=387',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/387?premium=https://movillage.mytravelviet.net#room-387'
      },
      {
            id: 'room-388',
            code: 'FamilyRoom1',
            name: 'Family Room 1',
            category: 'Nhà Mít',
            capacity: '4 guests',
            capacityNumber: 4,
            bedsCount: 2,
            bedType: '1 Queen bed + 1 Double bed',
            area: '48m²',
            view: 'Lake, garden & pool view',
            image: '/images/rooms/1ii41ffkf-bnv1up-1781688765(2).webp',
            gallery: [
      '/images/rooms/1ii41fes8-bnv1up-1781688773.webp',
      '/images/rooms/1ii41ffcq-bnv1up-1781688781.webp',
      '/images/rooms/1ii41ffhr-bnv1up-1781688791.webp',
      '/images/rooms/1ii41fffb-bnv1up-1781688798.webp',
      '/images/rooms/view-tu-phong-ngu-2-va-phong-khach-1781688805.webp',
      '/images/rooms/f7d8ec96a3680a3653794-1781688810.webp',
      '/images/rooms/hien-ngoai-1781688817.webp',
      '/images/rooms/1ii41ffkf-bnv1up-1781688765(2).webp'
    ],
            tagline: 'Spacious family room with 2 large beds, lake and pool view for family vacations.',
            pricePerNight: '2,800,000 VND',
            features: [
                  'Area: 48m²',
                  'Beds: 1 Queen (1.8m x 2m) + 1 Double (1.6m x 2m)',
                  'Lake, garden & pool view balcony',
                  'En-suite bathroom with bathtub & shower',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower',
                  'Bathtub'
            ],
            description: 'Family suite with 48m² area, 2 comfortable large beds, panoramic balcony view of the lake and pool.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=388',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/388?premium=https://movillage.mytravelviet.net#room-388'
      },
      {
            id: 'room-389',
            code: 'FamilyRoom2',
            name: 'Family Room 2',
            category: 'Nhà Mít',
            capacity: '4 guests',
            capacityNumber: 4,
            bedsCount: 2,
            bedType: '1 Queen bed + 1 Double bed',
            area: '48m²',
            view: 'Lake, garden & pool view',
            image: '/images/rooms/view-phong-ngu-1-1781689295(2).webp',
            gallery: [
      '/images/rooms/view-tu-phong-ngu-2-va-phong-khach-1781689298.webp',
      '/images/rooms/f7d8ec96a3680a3653794-1781689301.webp',
      '/images/rooms/hien-ngoai-1781689304.webp',
      '/images/rooms/1ii41fffb-bnv1up-1781689309.webp',
      '/images/rooms/1ii41ffhr-bnv1up-1781689312.webp',
      '/images/rooms/1ii41ffcq-bnv1up-1781689316.webp',
      '/images/rooms/1ii41ffkf-bnv1up-1781689320.webp',
      '/images/rooms/view-phong-ngu-1-1781689295(2).webp'
    ],
            tagline: 'Comfortable family suite with lake and garden view, ideal for multi-generational vacations.',
            pricePerNight: '2,800,000 VND',
            features: [
                  'Area: 48m²',
                  'Beds: 1 Queen (1.8m x 2m) + 1 Double (1.6m x 2m)',
                  'Lake, garden & pool view balcony',
                  'En-suite bathroom with bathtub & shower',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower',
                  'Bathtub'
            ],
            description: 'Family suite 2 with 48m² area, 2 large beds, lovely mountain and lake breeze.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=389',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/389?premium=https://movillage.mytravelviet.net#room-389'
      },
      {
            id: 'room-390',
            code: '103',
            name: 'Family Executive - 103',
            category: 'Nhà Táo',
            capacity: '4 guests',
            capacityNumber: 4,
            bedsCount: 2,
            bedType: '2 Queen beds (1.8m x 2m)',
            area: '60m²',
            view: 'Lake, garden & pool view',
            image: '/images/rooms/img-1765180079175-1765247763983-1781691197(2).webp',
            gallery: [
      '/images/rooms/img-1774371350692-1774371385705-1781691208.webp',
      '/images/rooms/img-1765180079130-1765247762667-1781691221.webp',
      '/images/rooms/img-1765180079175-1765247763983-1781691197(2).webp'
    ],
            tagline: 'Executive 60m² family stilt villa suite with 2 bedrooms, premium wooden terrace.',
            pricePerNight: '3,200,000 VND',
            features: [
                  'Area: 60m²',
                  '2 Queen beds (1.8m x 2m)',
                  'Lake & infinity pool view terrace',
                  '2 private bathrooms with bathtubs',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower',
                  'Lake-view bathtub'
            ],
            description: 'Executive Family suite with 60m² area, 2 Queen beds, spacious private wooden balcony overlooking the pool and lake.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=390',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/390?premium=https://movillage.mytravelviet.net#room-390'
      },
      {
            id: 'room-391',
            code: 'DE1',
            name: 'Deluxe Executive 1',
            category: 'Nhà Táo',
            capacity: '2 guests',
            capacityNumber: 2,
            bedsCount: 1,
            bedType: '1 Queen bed (1.8m x 2m)',
            area: '31m²',
            view: 'Lake, garden & pool view',
            image: '/images/rooms/img-20260513-231412-1781748252(2).webp',
            gallery: [
      '/images/rooms/img-1746585065236-1747200868985-1781748264.webp',
      '/images/rooms/img-20260513-231414-1781748269.webp',
      '/images/rooms/img-1746585065090-1747200868199-1781748282.webp',
      '/images/rooms/img-1746585065192-1747200868732-1781748288.webp',
      '/images/rooms/img-1746585065217-1747200868862-1781748296.webp',
      '/images/rooms/img-20260513-231400-1781748302.webp',
      '/images/rooms/img-20260513-231412-1781748252(2).webp'
    ],
            tagline: 'Deluxe executive room with lake view balcony, queen bed and soaking tub.',
            pricePerNight: '1,850,000 VND',
            features: [
                  'Area: 31m²',
                  'Bed: 1 Queen bed (1.8m x 2m)',
                  'Lake & pool view balcony',
                  'Private bathroom with soaking tub',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower',
                  'Bathtub'
            ],
            description: 'Deluxe Executive room 1 with 31m² area, romantic balcony and soaking tub.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=391',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/391?premium=https://movillage.mytravelviet.net#room-391'
      },
      {
            id: 'room-392',
            code: 'DE2',
            name: 'Deluxe Executive 2',
            category: 'Nhà Táo',
            capacity: '2 guests',
            capacityNumber: 2,
            bedsCount: 1,
            bedType: '1 Queen bed (1.8m x 2m)',
            area: '31m²',
            view: 'Lake, garden & pool view',
            image: '/images/rooms/view-phong-ngu-2-1781748609(2).webp',
            gallery: [
      '/images/rooms/img-20260513-231232-1781748615.webp',
      '/images/rooms/phong-tam-wc-1-1781748628.webp',
      '/images/rooms/img-1144-1781748639.webp',
      '/images/rooms/efdcf16688725e2c0763109-1781748648.webp',
      '/images/rooms/img-1143-1781748655.webp',
      '/images/rooms/view-phong-ngu-2-1781748609(2).webp'
    ],
            tagline: 'Executive double room with panoramic lake and pool view, elegant wooden interiors.',
            pricePerNight: '1,850,000 VND',
            features: [
                  'Area: 31m²',
                  'Bed: 1 Queen bed (1.8m x 2m)',
                  'Lake & pool view balcony',
                  'Private bathroom with soaking tub',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower',
                  'Bathtub'
            ],
            description: 'Deluxe Executive room 2 with 31m² area, elegant styling and lake views.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=392',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/392?premium=https://movillage.mytravelviet.net#room-392'
      },
      {
            id: 'room-393',
            code: 'DE3',
            name: 'Deluxe Executive 3',
            category: 'Nhà Táo',
            capacity: '2 guests',
            capacityNumber: 2,
            bedsCount: 1,
            bedType: '1 Queen bed (1.8m x 2m)',
            area: '31m²',
            view: 'Lake, garden & pool view',
            image: '/images/rooms/img-8413-1781749267(2).webp',
            gallery: [
      '/images/rooms/view-tu-cua-vao-phong-1781749276.webp',
      '/images/rooms/img-20260513-231351-1781749284.webp',
      '/images/rooms/img-20250514-123601-1781749295.webp',
      '/images/rooms/img-20250514-123652-1781749301.webp',
      '/images/rooms/img-8413-1781749267(2).webp'
    ],
            tagline: 'Boutique lake-facing room with private terrace and tranquil forest breeze.',
            pricePerNight: '1,850,000 VND',
            features: [
                  'Area: 31m²',
                  'Bed: 1 Queen bed (1.8m x 2m)',
                  'Lake & pool view balcony',
                  'Private bathroom with soaking tub',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower',
                  'Bathtub'
            ],
            description: 'Deluxe Executive room 3 with 31m² area, relaxing atmosphere.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=393',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/393?premium=https://movillage.mytravelviet.net#room-393'
      },
      {
            id: 'room-394',
            code: 'DP1',
            name: 'Deluxe Premium 1',
            category: 'Nhà Táo',
            capacity: '2 guests',
            capacityNumber: 2,
            bedsCount: 1,
            bedType: '1 Queen bed (1.8m x 2m)',
            area: '31m²',
            view: 'Lake, garden & pool view',
            image: '/images/rooms/deluxe-premium-101-1781749784(2).webp',
            gallery: [
      '/images/rooms/img-1746504206982-1747200771455-1781749789.webp',
      '/images/rooms/img-1746504207001-1747200771614-1781749795.webp',
      '/images/rooms/img-1746504207041-1747200771874-1781749802.webp',
      '/images/rooms/view-bon-tam-1781749809.webp',
      '/images/rooms/img-1746504207120-1747200772345-1781749816.webp',
      '/images/rooms/img-1746504207172-1747200772702-1781749821.webp',
      '/images/rooms/deluxe-premium-101-1781749784(2).webp'
    ],
            tagline: 'High-floor premium double room, open airy view across Hòa Bình lake.',
            pricePerNight: '1,850,000 VND',
            features: [
                  'Area: 31m²',
                  'Bed: 1 Queen bed (1.8m x 2m)',
                  'Lake & pool view balcony',
                  'Private bathroom with soaking tub',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower',
                  'Bathtub'
            ],
            description: 'Deluxe Premium room 1 with 31m² area, high ceiling and prime view.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=394',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/394?premium=https://movillage.mytravelviet.net#room-394'
      },
      {
            id: 'room-395',
            code: 'DP2',
            name: 'Deluxe Premium 2',
            category: 'Nhà Táo',
            capacity: '2 guests',
            capacityNumber: 2,
            bedsCount: 1,
            bedType: '1 Queen bed (1.8m x 2m)',
            area: '31m²',
            view: 'Lake, garden & pool view',
            image: '/images/rooms/view-ho-1781750371(2).webp',
            gallery: [
      '/images/rooms/view-ban-cong-1781750375.webp',
      '/images/rooms/bon-tam-chill-1781750389.webp',
      '/images/rooms/img-1773200625242-1773200753745-1781750396.webp',
      '/images/rooms/deluxe-premium-tang-2-1781750411.webp',
      '/images/rooms/ban-cong-1781750417.webp',
      '/images/rooms/img-1773200625404-1773200762247-1781750424.webp',
      '/images/rooms/img-1773200625474-1773200766359-1781750437.webp',
      '/images/rooms/view-ho-1781750371(2).webp'
    ],
            tagline: 'Premium room with tranquil balcony, romantic atmosphere for couples.',
            pricePerNight: '1,850,000 VND',
            features: [
                  'Area: 31m²',
                  'Bed: 1 Queen bed (1.8m x 2m)',
                  'Lake & pool view balcony',
                  'Private bathroom with soaking tub',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower',
                  'Bathtub'
            ],
            description: 'Deluxe Premium room 2 with 31m² area, romantic balcony and tranquil scenery.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=395',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/395?premium=https://movillage.mytravelviet.net#room-395'
      },
      {
            id: 'room-396',
            code: 'D1',
            name: 'Nhà Đào 1',
            category: 'Nhà Đào',
            capacity: '2 guests',
            capacityNumber: 2,
            bedsCount: 1,
            bedType: '1 King bed (2m x 2m)',
            area: '32m²',
            view: 'Lake & Garden view',
            image: '/images/rooms/trong-phong-1781750947(2).webp',
            gallery: [
      '/images/rooms/nha-tam-rong-rai-1781750953.webp',
      '/images/rooms/img-1774371350578-1774371380158-1781750963.webp',
      '/images/rooms/img-1774371350570-1774371379825-1781750973.webp',
      '/images/rooms/img-1746504277321-1747893743445-1781750985.webp',
      '/images/rooms/img-1746504277301-1747893743289-1781750989.webp',
      '/images/rooms/img-8917-1781750993.webp',
      '/images/rooms/trong-phong-1781750947(2).webp'
    ],
            tagline: 'Charming wooden stilt room with forest view, bathtub and private balcony.',
            pricePerNight: '1,950,000 VND',
            features: [
                  'Area: 32m²',
                  'Bed: 1 King bed (2m x 2m)',
                  'Pine forest & lake view balcony',
                  'Bathroom with scenic bathtub & shower',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower',
                  'Bathtub with view'
            ],
            description: 'Nhà Đào 1 with 32m² area, 1 King bed (2m x 2m), peaceful forest surroundings and en-suite scenic bathtub.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=396',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/396?premium=https://movillage.mytravelviet.net#room-396'
      },
      {
            id: 'room-397',
            code: 'D2',
            name: 'Nhà Đào 2',
            category: 'Nhà Đào',
            capacity: '2 guests',
            capacityNumber: 2,
            bedsCount: 1,
            bedType: '1 King bed (2m x 2m)',
            area: '32m²',
            view: 'Lake & Garden view',
            image: '/images/rooms/suite-lake-view-1781751326(2).webp',
            gallery: [
      '/images/rooms/img-8914-1781751332.webp',
      '/images/rooms/img-1774371350578-1774371380158-1781751337.webp',
      '/images/rooms/nha-tam-rong-rai-1781751341.webp',
      '/images/rooms/img-1774371350570-1774371379825-1781751345.webp',
      '/images/rooms/img-8322-1781751349.webp',
      '/images/rooms/img-1774371350588-1774371380557-1781751356.webp',
      '/images/rooms/suite-lake-view-1-1781751370.webp',
      '/images/rooms/suite-lake-view-1781751326(2).webp'
    ],
            tagline: 'Cozy stilt house room with deep forest view, private bathtub and wooden deck.',
            pricePerNight: '1,950,000 VND',
            features: [
                  'Area: 32m²',
                  'Bed: 1 King bed (2m x 2m)',
                  'Pine forest & lake view balcony',
                  'Bathroom with scenic bathtub & shower',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower',
                  'Bathtub with view'
            ],
            description: 'Nhà Đào 2 with 32m² area, 1 King bed (2m x 2m), charming timber woodwork and forest tranquility.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=397',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/397?premium=https://movillage.mytravelviet.net#room-397'
      },
      {
            id: 'room-398',
            code: 'M2',
            name: 'Nhà Mận 2',
            category: 'Nhà Mận',
            capacity: '2 guests',
            capacityNumber: 2,
            bedsCount: 1,
            bedType: '1 King bed (2m x 2m)',
            area: '32m²',
            view: 'Lake & Garden view',
            image: '/images/rooms/036913d5e5df33816ace128-1781751843(2).webp',
            gallery: [
      '/images/rooms/img-1774364115101-1774364124818-1781751847.webp',
      '/images/rooms/img-1757148509409-1774370725030-1781751853.webp',
      '/images/rooms/phong-tam-1781751859.webp',
      '/images/rooms/view-phong-tam-bon-1781751862.webp',
      '/images/rooms/img-20250611-223904-1781751869.webp',
      '/images/rooms/img-1746504277359-1747893743757-1781751877.webp',
      '/images/rooms/036913d5e5df33816ace128-1781751843(2).webp'
    ],
            tagline: 'Panoramic lake view suite with romantic soaking tub and spacious balcony.',
            pricePerNight: '1,950,000 VND',
            features: [
                  'Area: 32m²',
                  'Bed: 1 King bed (2m x 2m)',
                  'Panoramic lake view balcony',
                  'En-suite bathroom with view bathtub & shower',
                  'Free for 1 child under 12'
            ],
            amenities: [
                  'Work desk',
                  'Bathrobe',
                  'Slippers',
                  'Tea / coffee / kettle',
                  'Clothes rack',
                  'Shower',
                  'Lake-view bathtub'
            ],
            description: 'Nhà Mận 2 with 32m² area, King bed, panoramic lake views, and soaking bathtub.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=398',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/398?premium=https://movillage.mytravelviet.net#room-398'
      },
      {
            id: 'room-399',
            code: 'S1',
            name: 'Nhà Sang 1',
            category: 'Nhà Sang',
            capacity: '4 guests',
            capacityNumber: 4,
            bedsCount: 2,
            bedType: '2 Queen beds (1.8m x 2m)',
            area: '60m²',
            view: 'Lake & Garden view',
            image: '/images/rooms/20250725-080819-1781752900(2).webp',
            gallery: [
      '/images/rooms/khong-gian-2-phong-ngu-1781752933.webp',
      '/images/rooms/phong-tam-wc-1781752945.webp',
      '/images/rooms/view-ben-ngoai-hien-1781752951.webp',
      '/images/rooms/hien-tra-chieu-1781752959.webp',
      '/images/rooms/canh-ve-dem-1781752972.webp',
      '/images/rooms/20250725-075817-1781752978.webp',
      '/images/rooms/20250725-080349-1781752995.webp',
      '/images/rooms/20250725-080819-1781752900(2).webp'
    ],
            tagline: 'Spacious villa with 3 bedrooms, fully equipped kitchen and private BBQ terrace.',
            pricePerNight: '3,800,000 VND',
            features: [
                  'Area: 60m² villa',
                  '2 Queen beds (1.8m x 2m)',
                  'Lake & garden view terrace',
                  'Fully equipped kitchen & dining area',
                  'Private BBQ patio'
            ],
            amenities: [
                  'Equipped kitchen',
                  'Spacious living room',
                  'Private BBQ patio',
                  'Bathrobe & slippers',
                  'Refrigerator',
                  'High-speed Wi-Fi'
            ],
            description: 'Spacious Sang Villa with 60m² area, 2 Queen beds, fully equipped kitchen, living lounge and private outdoor BBQ terrace.',
            vr360Url: 'https://movillage.mytravelviet.net/vn/hotel/360/mo-village?room_id=399',
            bookingUrl: 'https://movillage.mytravelviet.net/vn/hotel/order/payemnt/399?premium=https://movillage.mytravelviet.net#room-399'
      }
],
    },
    experiences: {
      tagline: 'Experiences',
      title: 'Discover and Enjoy',
      sub: 'From adventure activities to art workshops, each experience becomes a memory',
      categories: {
        facilities: 'Activities at Mơ',
        workshops: 'Workshops & Culture',
        nearby: 'Nearby Attractions',
      },
      facilitiesList: [
        {
          id: 'onsen',
          title: '4-Season Onsen Hot Tub',
          desc: 'Relax in natural hot spring pools surrounded by mountains and forest',
          image: '/images/fac-onsen.webp',
        },
        {
          id: 'sauna',
          title: 'Wet & Dry Sauna',
          desc: 'Detox and cleanse your body and mind in our wellness facilities',
          image: '/images/campus-lake.webp',
        },
        {
          id: 'herbal-bath',
          title: 'Herbal Bath Soaking',
          desc: 'Soak in natural herbal baths to restore energy and vitality',
          image: '/images/fac-herbal-bath.webp',
        },
        {
          id: 'lake-fun',
          title: 'Lake Recreation',
          desc: 'Kayak, canoe, fishing - explore Hòa Bình Lake in many ways',
          image: '/images/fac-billiard.webp',
        },
        {
          id: 'boat-tour',
          title: 'Lake Boat Tours',
          desc: 'Sunset cruise, visit floating villages and fishing communities',
          image: '/images/gallery-lake-deck.webp',
        },
        {
          id: 'teambuilding',
          title: 'Team Building',
          desc: 'Host team building events for companies and large groups with outdoor activities and private spaces',
          image: '/images/gallery-pool-sunset.webp',
        },
      ],
      workshopsList: [
        {
          id: 'cam-hoa',
          title: 'Floral arrangement',
          desc: "Natural-style flower arranging workshop with local blooms, expressing the simple beauty of Hòa Bình's mountains and forests",
        },
        {
          id: 'lam-banh',
          title: 'Baking',
          desc: 'Learn traditional Mường cakes like sticky rice cake, green rice flakes, and modern pastries from local ingredients',
        },
        {
          id: 'thu-cong',
          title: 'Handicrafts',
          desc: 'Weave traditional Mường brocade patterns, woodworking, and learn traditional crafts from local artisans',
        },
      ],
      nearbyList: [
        {
          id: 'chua-thac-bo',
          title: 'Chúa Thác Bờ',
          desc: 'Majestic 300m waterfall with spectacular scenery, where visitors can admire pristine nature and capture beautiful photos',
          distance: '15km',
        },
        {
          id: 'suoi-ke',
          title: 'Suối Ké',
          desc: 'Crystal clear natural stone stream with cool water year-round, an ideal place to swim and relax in nature',
          distance: '8km',
        },
        {
          id: 'hang-lo-lan',
          title: 'Hang Lỗ Làn',
          desc: 'Natural cave with stalactites formed over thousands of years, a unique geological wonder of Hòa Bình limestone mountains',
          distance: '12km',
        },
        {
          id: 'ban-sung',
          title: 'Bản Sưng',
          desc: 'Traditional Mường village preserving indigenous culture, where you can experience the lifestyle, clothing, and cuisine of Mường people',
          distance: '10km',
        },
      ],
    },
    gallery: {
      tagline: 'Photo Gallery',
      title: 'Moments at Mơ',
      sub: 'Explore spaces, facilities, and memorable experiences',
      filterAll: 'All',
      filterLandscape: 'Lake Landscape',
      filterRooms: 'Guest Rooms',
      filterFacilities: 'Amenities & Leisure',
      filterDining: 'Dining & Cafe',
      images: [
        { id: '1', title: 'Panoramic Mơ Village at dusk', image: '/images/gallery-aerial.webp', category: 'landscape' as const },
        { id: '2', title: 'Lake-view balcony corner', image: '/images/gallery-balcony.webp', category: 'rooms' as const },
        { id: '3', title: 'Curved infinity pool', image: '/images/fac-onsen.webp', category: 'facilities' as const },
        { id: '4', title: 'Northwest ethnic culinary feast', image: '/images/gallery-restaurant.webp', category: 'dining' as const },
        { id: '5', title: 'Hòa Bình Lake shrouded in morning mist', image: '/images/campus-lake.webp', category: 'landscape' as const },
        { id: '6', title: 'Timber terrace & soaking tub', image: '/images/room-nha-tao.webp', category: 'rooms' as const },
        { id: '7', title: 'Lakeside overwater hammock net', image: '/images/gallery-lake-deck.webp', category: 'landscape' as const },
        { id: '8', title: 'Billiards and leisure area', image: '/images/fac-billiard.webp', category: 'facilities' as const },
        { id: '9', title: 'Nhà Đào nestled beneath the treetops', image: '/images/room-nha-dao.webp', category: 'rooms' as const },
        { id: '10', title: 'Lawn grounds and green landscape', image: '/images/fac-teambuilding.webp', category: 'facilities' as const },
        { id: '11', title: 'Pool embraced by mountain ridges', image: '/images/fac-sauna.webp', category: 'facilities' as const },
        { id: '12', title: 'Window framing tranquil bay views', image: '/images/gallery-interior-wood.webp', category: 'rooms' as const },
        { id: '13', title: 'Timber deck under open sky', image: '/images/gallery-walkway.webp', category: 'landscape' as const },
        { id: '14', title: 'Infinity pool at golden sunset', image: '/images/gallery-pool-sunset.webp', category: 'facilities' as const },
      ],
    },
    directions: {
      tagline: 'Getting Here',
      title: 'Getting to Mơ',
      sub: 'Leave the city for a while. Touch the lake up close.',
      mapTitle: 'Mơ Village on Google Maps',
      openGoogleMaps: 'Get Directions',
      hotlineDirect: 'Travel Assistance Hotline: (+84) 964 863 838',
      routeDesc: 'From central Hanoi, a journey of over 100km takes you through mountain slopes and lakeside roads. Beautiful route with some winding passes — take it slow, Mơ will still be here waiting.',
      routeSteps: ['Hanoi', 'Hoa Lac', 'Hoa Binh', 'Mo Village'],
      howToGet: [
        {
          title: 'Self-Drive (Car / Motorbike)',
          desc: 'From Central Hanoi, take Thăng Long Boulevard -> Hòa Lạc – Hòa Bình Expressway -> Provincial Road 433 to Đà Bắc -> Mơ Village (approx. 2h to 2h30). Smooth paved road suitable for all vehicles.',
          icon: '🚗',
        },
        {
          title: 'Premium Limousine Shuttle',
          desc: 'Daily 9–16 seater luxury limousine shuttles available from Hanoi directly to Mơ Village or Thung Nai Pier upon request.',
          icon: '🚐',
        },
        {
          title: 'Speedboat / Cruise Transfer',
          desc: 'Park your vehicle at Thung Nai or Bích Hạ Harbor and take an exhilarating 20-minute speedboat ride directly to Mơ Village jetty.',
          icon: '🚤',
        },
      ],
      faqs: [
        {
          id: 'faq-1',
          num: '01',
          question: 'How far is Mơ from Hanoi?',
          answer: 'Mơ sits by Hòa Bình Lake in Đà Bắc area, over 100km from Hanoi. Travel time is usually 3–3.5 hours depending on route and traffic conditions.',
        },
        {
          id: 'faq-2',
          num: '02',
          question: 'What can you do at Mơ?',
          answer: 'You can kayak, swim among mountains and forests, relax in hot tubs, sauna, read books, fish, enjoy Northwest flavors, or simply spend a whole day unhurried.',
        },
        {
          id: 'faq-3',
          num: '03',
          question: 'Is Mơ suitable for families and small groups?',
          answer: "Yes. Mơ has various room types, children's play areas, lawns, and common spaces. When you book, Mơ will suggest arrangements suitable for your group size and ages.",
        },
        {
          id: 'faq-4',
          num: '04',
          question: 'How far in advance should I book?',
          answer: 'For weekends and holidays, contact us early to secure your preferred room type. Prices and promotions vary by date, so Mơ will quote directly for each stay.',
        },
      ],
    },
    packages: {
      tagline: 'Packages & Services',
      title: 'Combo packages & services',
      sub: 'Choose a suitable package or customize to your needs',
      selectPackage: 'Select this package',
      items: [
        {
          id: 'combo-2n1d',
          title: '2 days 1 night',
          subtitle: 'Weekend Escape',
          price: '1.800.000',
          priceUnit: 'VND/person',
          isPopular: false,
          badge: 'Quick Getaway',
          features: [
            '1 night stay + breakfast + 1 main meal',
            'Kayaking or fishing + pool and yoga deck access',
          ],
          itinerarySummary: [
            'Day 1: Warm welcome -> Check-in -> Afternoon kayak -> Lakeside hotpot dinner.',
            'Day 2: Morning yoga -> Leisure breakfast -> Village walk -> Check-out.',
          ],
        },
        {
          id: 'combo-3n2d',
          title: '3 days 2 nights',
          subtitle: 'Complete Experience',
          price: '3.200.000',
          priceUnit: 'VND/person',
          isPopular: true,
          badge: 'Popular',
          features: [
            '2 nights stay + breakfast + 2 main meals',
            'Sunset boat tour + 1 workshop (floral or baking)',
            '60-minute spa massage + full facility access',
          ],
          itinerarySummary: [
            'Day 1: Warm welcome -> Check-in -> Afternoon kayak -> Lakeside hotpot dinner.',
            'Day 2: Island boat tour & Thác Bờ temple -> Cultural workshop -> Herbal soak -> Starlit BBQ banquet.',
            'Day 3: Ancient village stroll -> Leisure breakfast -> Farewell check-out with gift.',
          ],
        },
      ],
    },
    booking: {
      tagline: 'SEND AN INVITATION',
      title: 'This weekend, shall we go to Mơ?',
      sub: "Pick your dates, pick your companions. The paperwork's yours to draft, let Mơ prepare the rest.",
      form: {
        fullName: 'Full Name',
        fullNamePlaceholder: 'E.g., David Miller',
        phone: 'Phone Number / WhatsApp / Zalo',
        phonePlaceholder: 'E.g., +84 987 654 321',
        email: 'Email Address (Optional)',
        emailPlaceholder: 'name@example.com',
        checkIn: 'Check-in Date',
        checkOut: 'Check-out Date',
        adults: 'Number of Guests',
        children: 'Children (<12 yrs)',
        roomType: 'Preferred Room or Package',
        roomTypePlaceholder: '-- Select room or package --',
        specialRequests: 'Special Requests (dietary, airport transfer, events...)',
        specialRequestsPlaceholder: 'E.g., High-floor room with panoramic lake view, transfer shuttle needed...',
        submit: 'Send Reservation Inquiry',
        submitting: 'Submitting Inquiry...',
        successTitle: 'Inquiry Received!',
        successMessage: 'Thank you for reaching out to Mơ Village. Our reservations concierge will contact you via WhatsApp/Phone/Zalo within 15 minutes to confirm.',
      },
    },
    footer: {
      aboutTitle: 'Mơ Village Resort',
      aboutDesc: 'A gentle dream on Hòa Bình Lake. Where tranquil jade waters and traditional stilt architecture embrace your soul in pure Northwest serenity.',
      quickLinksTitle: 'Quick Links',
      contactTitle: 'Contact Us',
      address: 'Ké Hamlet, Hiền Lương Commune, Đà Bắc District, Hòa Bình Province, Vietnam',
      hotline: '(+84) 964 863 838',
      email: 'booking@movillage.vn',
      hours: '24/7 Concierge Service',
      followUs: 'Follow Us',
      copyright: '© 2026 Mơ Village Resort. All rights reserved.',
      poweredBy: 'A gentle dream on Hòa Bình Lake',
    },
  },
};
