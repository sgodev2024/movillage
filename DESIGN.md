# Tài Liệu Thiết Kế (Design System & UI/UX Guidelines) — Mơ Village

> **Dự án**: Mơ Village Web Application (`movillage-clone`)  
> **Định vị**: Khu nghỉ dưỡng sinh thái cao cấp bên hồ Hòa Bình (Đà Bắc, Hòa Bình).  
> **Khẩu hiệu**: *"A gentle dream on Hòa Bình Lake"* — Nơi tìm về sự an yên giữa núi non và mặt hồ sớm sương.

---

## 1. Triết Lý Thiết Kế (Design Philosophy)

Giao diện của Mơ Village được xây dựng dựa trên sự giao thoa hài hòa giữa **thiên nhiên hoang sơ của hồ Hòa Bình**, **bản sắc văn hóa kiến trúc nhà sàn Mường**, và **trải nghiệm nghỉ dưỡng hiện đại, tinh tế (Mindful Luxury)**.

### Nguyên Tắc Cốt Lõi (Core Principles)
1. **Hơi Thở Thiên Nhiên (Organic Elegance)**: Màu sắc và chất liệu thị giác lấy cảm hứng trực tiếp từ đất nung, gỗ lim già, đá vôi, mặt hồ sớm sương và giấy dó ấm áp. Loại bỏ hoàn toàn các mảng màu công nghiệp gay gắt.
2. **Đậm Chất Biên Tập (Editorial Typography)**: Sử dụng font có chân mềm mại cổ điển (`Fraunces`) kết hợp cùng sans-serif Việt ngữ hiện đại (`Be Vietnam Pro`) mang đến cảm giác như đang lật mở một ấn phẩm du lịch cao cấp.
3. **Trải Nghiệm Mượt Mà, Không Gián Đoạn (Frictionless Booking)**: Dòng chảy đặt phòng (booking flow) và xem thông tin phòng được thiết kế trực quan theo dạng modal tương tác nhiều bước, hỗ trợ đa thiết bị và đa ngôn ngữ (VI/EN).
4. **Vi Tương Tác Sống Động (Subtle Micro-animations)**: Hiệu ứng chuyển động mượt mà (smooth cubic-bezier spring), hover card, chuyển ảnh gallery nhanh và chuyển bước nhẹ nhàng tạo cảm giác sống động và cao cấp.

---

## 2. Hệ Thống Màu Sắc (Color Palette & Tokens)

Hệ thống màu sắc được chuẩn hóa thông qua biến CSS và cấu hình Tailwind CSS v4 `@theme`.

### Bảng Màu Chính (Primary Brand Palette)

| Mã Token | Hex Code | Tên Cảm Hứng | Ứng Dụng |
| :--- | :--- | :--- | :--- |
| `--color-espresso` | `#2C150F` | **Gỗ Mun & Cà Phê Trầm** | Màu chữ tiêu đề chính, nút nhấn tối, icon quan trọng, viền nhấn |
| `--color-warm-paper` | `#F7F3EE` | **Giấy Dó Ấm (Warm Paper)** | Màu nền chủ đạo toàn trang (Background), tạo cảm giác ấm cúng, êm dịu cho mắt |
| `--color-soft-sand` | `#EDE4D8` | **Cát Bờ Hồ (Soft Sand)** | Nền thẻ (cards), hover states, container phụ, nền phân tách |
| `--color-terracotta` | `#B56E5A` | **Gốm Đất Nung (Terracotta)** | Màu nhấn chính (Primary Accent / CTA): Nút đặt phòng, badge khuyến mãi |
| `--color-lake-dawn` | `#6F8B8F` | **Sương Hồ Sớm (Lake Dawn)** | Màu phụ bản sắc: Trạng thái hover phụ, điểm xuyết cảnh quan |
| `--color-karst-mist` | `#D3D8D3` | **Sương Núi Vôi (Karst Mist)** | Đường viền (Borders), đường kẻ ngăn cách (Dividers), subtle lines |
| `--color-stilt-timber` | `#8A6F5C` | **Gỗ Nhà Sàn (Stilt Timber)** | Phụ đề, nhãn danh mục, thanh scrollbar, chi tiết trang trí |
| `--color-bamboo` | `#9AA487` | **Măng Tre Xanh (Bamboo Shoot)** | Thẻ trạng thái thiên nhiên, badge sinh thái, điểm nhấn phụ |
| `--color-apricot` | `#D8C1BC` | **Hoa Mơ Đầu Mùa (Apricot Blossom)** | Điểm sáng mềm mại, gradient mây sương |
| `--color-charcoal` | `#1F1F1F` | **Than Đen (Charcoal)** | Màu chữ phụ cho các khối nền sáng đặc biệt |

### Màu Gradient & Hiệu Ứng Nền
- **Hero Vignette Gradient**: `from-espresso/20 via-transparent to-espresso/40` — Giữ trọn vẻ đẹp của video hồ sương nhưng đảm bảo độ tương phản đọc chữ hoàn hảo.
- **Warm Overlay**: `bg-warm-paper/95 backdrop-blur-sm` — Dành cho Fixed Navigation và Floating Action Bar.

---

## 3. Hệ Thống Kiểu Chữ (Typography System)

Typography kết hợp giữa vẻ đẹp thơ mộng cổ điển và sự rõ ràng trong giao tiếp số.

```
Fraunces           -> Tiêu đề chính, tiêu đề phòng, số đếm cảm xúc (Editorial Serif)
Be Vietnam Pro     -> Nội dung văn bản, giao diện UI, nút bấm, thông số phòng (Modern Geometric Sans)
```

### Phân Cấp Typography (Scale & Hierarchy)

| Cấp Bậc | Kích Thước (Desktop / Mobile) | Font Family | Trọng Số | Line Height | Ứng Dụng |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `text-display-xl` | `52px / 40px` (clamp 3-4.5rem) | Fraunces | SemiBold (600) | 1.15 | Hero Title, Tiêu đề thương hiệu lớn |
| `text-display-lg` | `40px / 32px` (clamp 2.25-3.5rem)| Fraunces | SemiBold (600) | 1.2 | Tiêu đề phân đoạn (`#story`, `#rooms`, v.v.) |
| `text-display-md` | `32px / 28px` | Fraunces | SemiBold (600) | 1.25 | Tiêu đề nhóm nội dung, modal heading |
| `text-display-sm` | `24px / 20px` | Fraunces | Medium (500) | 1.3 | Tên phòng trong thẻ, thẻ câu chuyện |
| `text-body-xl` | `18px / 16px` | Be Vietnam Pro | Regular (400) | 1.6 | Đoạn mở đầu (Lead paragraph), trích dẫn |
| `text-body-base` | `16px / 15px` | Be Vietnam Pro | Regular (400) | 1.625 (1.75 VI)| Thân bài viết, mô tả chi tiết phòng |
| `text-body-sm` | `14px / 13px` | Be Vietnam Pro | Regular (400) | 1.5 | Thông số kỹ thuật (diện tích, view, sức chứa) |
| `text-ui-base` | `14px - 16px` | Be Vietnam Pro | Medium/SemiBold | 1.5 | Nút bấm chính (CTA Buttons), bộ lọc filter |
| `text-ui-sm` | `12px - 13px` | Be Vietnam Pro | SemiBold (600) | 1.3 | Tag danh mục, nhãn mã phòng, badge tiện ích |

> **Quy chuẩn tiếng Việt**: Với các thẻ văn bản tiếng Việt (`html[lang="vi"]`), độ giãn dòng (`line-height`) tự động tăng thêm ~10% để tránh va chạm dấu thanh và tối ưu độ đọc trên màn hình điện thoại.

---

## 4. Hệ Thống Khoảng Cách & Bố Cục (Spacing & Grid)

### Khoảng Cách (Spacing Tokens)
- Base Unit: **4px**
- Nhịp khoảng cách:
  - `space-1`: 4px (Padding badge, micro gap)
  - `space-2`: 8px (Khoảng cách giữa icon và label)
  - `space-4`: 16px (Padding thẻ card, gap danh sách)
  - `space-6`: 24px (Khoảng cách giữa các khối tử tế)
  - `space-8`: 32px (Margin giữa các tiêu đề và nội dung)
  - `space-16`: 64px (Padding chiều dọc section trên mobile)
  - `space-24`: 96px (Padding chiều dọc section trên desktop)

### Bán Kính Bo Góc (Border Radii)
- `rounded-lg`: 8px — Các nút bấm, thumbnail nhỏ, ô input calendar
- `rounded-2xl`: 16px — Thẻ phòng (Room Cards), Hộp thông tin (Info cards)
- `rounded-3xl`: 24px — Container Modal, Banner nổi bật
- `rounded-full`: 9999px — Filter category pills, action icons, avatar

### Độ Đổ Bóng (Box Shadows)
- `shadow-sm`: `0 1px 2px rgba(44, 21, 15, 0.05)` (Thẻ phẳng, pill active)
- `shadow-md`: `0 4px 6px -1px rgba(44, 21, 15, 0.08)` (Card hover, dropdown)
- `shadow-2xl`: `0 25px 50px -12px rgba(44, 21, 15, 0.25)` (Modal popups)

---

## 5. Chuyển Động & Hiệu Ứng (Motion & Animations)

Tất cả hiệu ứng chuyển động đều tuân theo nguyên lý **nhẹ nhàng, tự nhiên như làn sương**:

### Timing Functions
- Primary Curve: `cubic-bezier(0.16, 1, 0.3, 1)` (Spring ease-out, mượt và dứt khoát)
- Quick Transition: `0.15s` (Hover nút bấm, chuyển màu border)
- Normal Transition: `0.25s - 0.3s` (Mở modal, chuyển tab, lật ảnh)

### Các Keyframe Tùy Chỉnh
1. `modalBackdropIn` / `modalBackdropOut`: Hiệu ứng làm mờ nền tối dần và sáng trở lại.
2. `modalCardIn` / `modalCardOut`: Hộp thoại modal phóng nhẹ từ `scale(0.96) translateY(8px)` lên `1.0`.
3. `stepSlideForward` / `stepSlideBackward`: Dành riêng cho trải nghiệm chuyển bước trong modal đặt phòng (trượt ngang mượt mà).
4. `monthSwitch`: Đổi tháng trên lịch đặt phòng với hiệu ứng zoom vi mô chống giật hình.
5. `reveal`: Hiệu ứng cuộn trang dần hiển thị nội dung (`IntersectionObserver`).

> **Hỗ trợ Tiếp Cận (Accessibility)**: Khi người dùng kích hoạt `prefers-reduced-motion: reduce`, toàn bộ hiệu ứng chuyển động sẽ được tắt hoặc giảm về `0.01ms`.

---

## 6. Kiến Trúc Các Thành Phần Giao Diện (Components Architecture)

```
movillage-clone/
├── components/
│   ├── RoomsSection.tsx        # Danh sách phòng, bộ lọc danh mục, quick thumbnail switcher
│   ├── RoomDetailModal.tsx     # Chi tiết phòng toàn diện, lightbox ảnh, tiện nghi & specs
│   └── BookingModal.tsx        # Luồng đặt phòng 4 bước (Phòng -> Lịch -> Khách -> Chuyển khoản)
├── context/
│   └── LanguageContext.tsx     # Quản lý ngôn ngữ song ngữ (vi / en), tự động lưu trữ
├── src/app/
│   ├── layout.tsx              # Shell toàn cục, nạp font biến và metadata SEO
│   ├── page.tsx                # Trang chủ hội tụ: Hero, Story, Rooms, Exp, Packages, FAQ, Map
│   └── globals.css             # Design tokens, keyframes, scrollbar tùy chỉnh
└── data/
    └── content.ts              # Kho dữ liệu chuẩn hóa về phòng, giá, tiện ích, nội dung
```

### Chi Tiết Từng Thành Phần Chính

#### 1. Header & Navigation (`page.tsx`)
- Thanh điều hướng dính cố định (`fixed top-0 z-50`).
- Nền bán trong suốt với hiệu ứng kính mờ (`bg-warm-paper/95 backdrop-blur-sm`).
- Logo thương hiệu dạng vector SVG tỷ lệ chuẩn.
- Nút chuyển ngôn ngữ trực tiếp (VI ⇄ EN) với cờ / ký hiệu địa cầu.
- Nút CTA nổi bật "Đặt phòng ngay" dẫn thẳng vào modal đặt phòng.

#### 2. Hero Banner (`page.tsx`)
- Video 4K tua vòng tĩnh lặng quay cảnh hồ Hòa Bình buổi sớm (`hero-lake-dawn-4k.mp4`).
- Poster fallback tải nhanh cho mạng yếu (`hero-poster.jpg`).
- Logo xếp chồng (`logo-stacked.svg`) kích thước phóng đại ấn tượng với bóng sâu `drop-shadow-2xl`.
- Hai nút hành động: Nút chính đất nung (`Terracotta`) và nút phụ kính mờ viền sáng.

#### 3. Khu Vực Giới Thiệu Phòng (`RoomsSection.tsx`)
- **Category Filter Pills**: Cho phép lọc nhanh theo khu nhà (Nhà Đào, Nhà Mận, Nhà Mít, Nhà Sang, Nhà Táo, Nhà Cộng Đồng).
- **Thẻ phòng đa tương tác**:
  - Tích hợp cụm thumbnail góc dưới cho phép xem trước các góc ảnh khác nhau mà không cần mở modal.
  - Nhãn hiển thị sức chứa, số giường, diện tích và tầm nhìn hồ/rừng.
  - Mức giá tính theo đêm rõ ràng, định dạng tiền tệ Việt Nam Đồng (`₫`).
  - Hai nút hành động: "Xem chi tiết" và "Đặt phòng".

#### 4. Cửa Sổ Chi Tiết Phòng (`RoomDetailModal.tsx`)
- Cửa sổ hiển thị toàn bộ album ảnh chất lượng cao của từng căn phòng.
- Trình bày thông số kỹ thuật dạng lưới icon (Sức chứa, Giường, Diện tích, View).
- Danh sách tiện nghi đầy đủ: Điều hòa nhiệt độ, bồn tắm ngắm cảnh, minibar, Wi-Fi tốc độ cao, máy sấy, ban công riêng.
- Nút đặt phòng gắn mã phòng trực tiếp vào bước tiếp theo.

#### 5. Modal Đặt Phòng Tương Tác 4 Bước (`BookingModal.tsx`)
Quy trình đặt phòng được chuẩn hóa thành 4 bước mạch lạc:
1. **Bước 1 — Chọn Phòng (`room_list`)**: Hiển thị thẻ chọn phòng nhỏ gọn kèm hình ảnh, giá và sức chứa.
2. **Bước 2 — Chọn Ngày & Thời Gian Lưu Trú (`details`)**:
   - Bộ lịch tương tác tuỳ biến hoàn toàn: Tô màu dải ngày chọn (Check-in đến Check-out).
   - Tự động tính toán số đêm lưu trú và ước tính tổng chi phí tạm tính.
3. **Bước 3 — Thông Tin Khách Đặt (`form`)**:
   - Thu thập Họ và tên, Số điện thoại liên hệ, Số lượng người lớn và trẻ em.
   - Ô nhập ghi chú / yêu cầu đặc biệt (check-in sớm, chế độ ăn, v.v.).
   - Kiểm tra tính hợp lệ dữ liệu (validation) trước khi gửi.
4. **Bước 4 — Xác Nhận & Thanh Toán (`success`)**:
   - Mã đặt phòng ngẫu nhiên duy nhất (VD: `MO-202610-8492`).
   - Mã VietQR động tích hợp thông tin tài khoản MB Bank của khu nghỉ dưỡng.
   - Nút 1-chạm sao chép nhanh số tài khoản & cú pháp chuyển khoản.
   - Kênh hỗ trợ trực tiếp khẩn cấp qua Hotline (`0964 863 838`) và liên kết Zalo.

---

## 7. Cấu Hình Thanh Toán & Thông Tin Thương Hiệu (Payment & Info)

```typescript
export const PAYMENT_CONFIG = {
  bankName: 'Ngân hàng Quân Đội (MB Bank)',
  bankCode: 'MB',
  accountNumber: '0964863838',
  accountDisplay: '0964.863.838',
  accountName: 'MO VILLAGE RESORT',
  hotline: '0964 863 838',
  hotlineTel: '+84964863838',
  zaloUrl: 'https://zalo.me/0964863838',
  facebookUrl: 'https://www.facebook.com/movillage.hoabinh',
  resortName: 'Mơ Village Resort',
};
```

---

## 8. Chuẩn Mực Trải Nghiệm Người Dùng (UX Guidelines)

1. **Mobile-First & Touch-Friendly**:
   - Các nút bấm chính và ô chọn lịch có chiều cao tối thiểu 44px để đảm bảo thao tác chạm ngón tay chính xác trên điện thoại.
   - Modal hỗ trợ cuộn êm (`custom-scrollbar`) và khóa cuộn trang nền (`body.style.overflow = 'hidden'`) khi đang mở.
2. **Phản Hồi Trạng Thái Tức Thì (Instant Feedback)**:
   - Các nút bấm có đầy đủ hiệu ứng `hover`, `active`, và `focus-visible`.
   - Các nút sao chép (Copy) hiển thị phản hồi tức thì "Đã chép" trong 2 giây.
3. **Bản Địa Hóa Liền Mạch (Localization)**:
   - Không giật hay tải lại trang khi đổi giữa tiếng Việt và tiếng Anh.
   - Định dạng ngày tháng, tiền tệ linh hoạt phù hợp với ngữ cảnh ngôn ngữ đang chọn.
4. **Phím Tắt & Thân Thiện Bàn Phím**:
   - Nhấn phím `Escape` để đóng bất kỳ modal nào đang mở.

---

## 9. Hướng Dẫn Phát Triển Mở Rộng (Extending the Design)

Khi tạo mới các component hoặc trang con:
- **Luôn kế thừa biến CSS từ Design System**: Sử dụng `text-espresso`, `bg-warm-paper`, `text-terracotta`, `border-karst-mist`.
- **Giữ phong cách Typography**: Tiêu đề trang trọng dùng `font-display` (`Fraunces`), nội dung đọc dùng font mặc định (`Be Vietnam Pro`).
- **Hình ảnh chất lượng cao**: Ưu tiên ảnh tỉ lệ chuẩn `16:10`, `4:3` hoặc `4:5`, định dạng `.webp` có chiều sâu tự nhiên.
- **Không phá vỡ nhịp thở**: Giữ khoảng cách thoáng (`padding`, `gap`) rộng rãi, không dồn nén chữ và thành phần giao diện.
