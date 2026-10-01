# Taxi Cai Lậy

Website tiếng Việt dạng HTML/CSS/JavaScript, không cần npm hoặc backend để chạy bản hiện tại.

## Chạy bằng VS Code Live Server

1. Giải nén toàn bộ file ZIP. Giữ nguyên thư mục `dist`, các file CSS/JS và thư mục `assets`; không chỉ lấy riêng `index.html`.
2. Trong VS Code, chọn **File → Open Folder** và mở thư mục dự án đã giải nén.
3. Mở `dist/index.html`, nhấp chuột phải trong file và chọn **Open with Live Server**.
4. Nếu trình duyệt giữ bản cũ, nhấn **Ctrl + F5**. Địa chỉ có thể là `http://127.0.0.1:5500/dist/index.html`, tùy thư mục bạn mở và cổng Live Server.

Bản sửa dùng `./styles.css`, `./engine.js`, `./app.js`, `./assets/...` và liên kết trang tương đối, nên chạy được khi Live Server phục vụ thư mục dự án, thư mục cha hoặc riêng `dist`. Không cần cài npm hay chạy Python để xem các trang HTML đã có.

Các trường `canonical`, `og:url` và URL trong sitemap vẫn dùng địa chỉ công khai để phục vụ SEO. Chúng không tải CSS, không tải JavaScript và không điều khiển giao diện. Mở địa chỉ trong `og:url` là truy cập bản online, không phải chạy code local.

## Chạy bằng Python và sửa code

Chạy từ thư mục dự án:

```sh
python -m http.server 5500 --directory dist
```

Mở `http://localhost:5500`. Nên chạy qua HTTP bằng Live Server hoặc Python để kiểm tra đúng hành vi trình duyệt; không cần sửa `og:url` thành localhost.

- `dist/index.html`: trang chủ và form đặt xe.
- `dist/styles.css`: giao diện responsive; không có framework CSS.
- `dist/app.js`: tương tác, form liên hệ, vị trí, giọng nói, sao chép Zalo.
- `dist/engine.js`: tính cước, nhận diện lịch trình, chọn loại xe, kiểm tra ngày giờ và điện thoại.
- `build-pages.py`: nguồn các trang dịch vụ, thông tin riêng tư và sitemap. Chạy `python build-pages.py` sau khi sửa nội dung tại đây hoặc header/footer của trang chủ.
- `dist/assets/taxi-hero.webp`: hình minh họa tạo bằng AI, không phải ảnh đội xe thực tế.

## Luồng thực tế

Form kiểm tra lịch trình → thêm liên hệ → tạo nội dung → khách tự sao chép và gửi Zalo → tổng đài kiểm tra xe và xác nhận giá. Website không tự gửi tin nhắn, không thu tiền, không lưu đơn lên máy chủ và không xác nhận có xe trống.

Trợ lý hiện dùng quy tắc nhận diện tiếng Việt, không gọi mô hình AI hội thoại. Nó nhận diện một số địa danh, ngày tương đối, giờ, số khách, hành lý và loại chuyến. Các phần chưa rõ phải được khách bổ sung. Nếu nâng cấp AI, đặt API key ở máy chủ; không thêm key vào JavaScript công khai.

Vị trí và nhận giọng nói cần HTTPS hoặc localhost và quyền của trình duyệt; có đường nhập tay khi không hỗ trợ. Không dùng localStorage cho thông tin khách.

## Dữ liệu và SEO

Hotline/Zalo `0939227015` và đơn giá tham khảo được đối chiếu tại `https://www.xetaxicailay.id.vn/` và `/pricing.html` ngày 27/09/2026. Cước chưa được chủ xe xác nhận lại. Mốc đúng 30 km được hiển thị thành khoảng vì bảng cước nguồn chỉ ghi dưới/trên 30 km. Không tự đo quãng đường hoặc tự cộng phụ phí.

Có HTML nội dung trực tiếp, một H1 mỗi trang, title/description riêng, canonical, Open Graph, TaxiService JSON-LD, sitemap, robots, ảnh WebP và trang 404. Không bảo đảm vị trí xếp hạng Google.

Bản xuất bản ban đầu chỉ chủ sở hữu xem. Google chưa thể lập chỉ mục bản riêng tư. Website và DNS tên miền cũ chưa được thay đổi. Khi đưa lên tên miền chính: đổi origin trong trang chủ và `build-pages.py`, tạo lại các trang/sitemap, kiểm tra nội dung/cước, ánh xạ URL cũ và khai báo chuyển hướng 301 phù hợp trên hệ thống hosting đích trước khi đổi DNS. Không chuyển đồng loạt URL cũ về trang chủ.

## Kiểm tra đã thực hiện

- Kiểm tra cú pháp hai file JavaScript.
- 12 tình huống logic: múi giờ Việt Nam, ngày không hợp lệ, giờ đã qua, khứ hồi, nhận diện câu tiếng Việt, giá, điện thoại và nội dung yêu cầu.
- Kiểm tra tài nguyên nội bộ, anchor, nhãn input, H1, JSON-LD và sitemap của 6 trang HTML.
- Kiểm tra lại CSS, JavaScript, ảnh và liên kết khi trang được phục vụ ở thư mục gốc, `/dist/` và thư mục dự án lồng nhau, nhằm tránh lỗi đường dẫn khi dùng Live Server.
- Môi trường static này không cung cấp trình duyệt xem thử tương thích. Chưa kiểm tra trực quan trên thiết bị thật hoặc WebMCP native; nên rà lại trước khi thay website chính.

WebMCP `stage_taxi_trip` được feature-detect; chỉ hỗ trợ điền form, không gửi hoặc hoàn tất đặt xe.
