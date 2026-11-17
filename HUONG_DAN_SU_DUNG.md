# HƯỚNG DẪN SỬ DỤNG VÀ DANH MỤC CHỨC NĂNG HỆ THỐNG TTTM ANEON

Hệ thống quản lý Trung tâm Thương mại Thông minh **ANEON** bao gồm hai phân hệ chính:
- **F01**: Quản lý mặt bằng, gian hàng, tình hình khai thác và nhật ký thay đổi.
- **F10**: Quản lý sự kiện, chương trình khuyến mãi, voucher ưu đãi và check-in tham gia.

---

## MỤC LỤC
1. [Tổng quan các cổng giao diện](#1-tổng-quan-các-cổng-giao-diện)
2. [Đăng nhập & Phân quyền danh tính](#2-đăng-nhập--phân-quyền-danh-tính)
3. [Chức năng dành cho Khách hàng (Public)](#3-chức-năng-dành-cho-khách-hàng-public)
   - [3.1. Trang chủ và Danh bạ gian hàng (/)](#31-trang-chủ-và-danh-bạ-gian-hàng-)
   - [3.2. Khám phá Sự kiện & Ưu đãi (/kham-pha)](#32-khám-phá-sự-kiện--ưu-đãi-kham-pha)
   - [3.3. Check-in tham gia sự kiện (/check-in)](#33-check-in-tham-gia-sự-kiện-check-in)
4. [Chức năng Quản lý Mặt bằng & Gian hàng (F01)](#4-chức-năng-quản-lý-mặt-bằng--gian-hàng-f01)
   - [4.1. Quản lý Mặt bằng](#41-quản-lý-mặt-bằng)
   - [4.2. Quản lý Cửa hàng / Sạp](#42-quản-lý-cửa-hàng--sạp)
   - [4.3. Theo dõi Tình hình khai thác](#43-theo-dõi-tình-hình-khai-thác)
   - [4.4. Tra cứu Lịch sử thay đổi (Audit Log)](#44-tra-cứu-lịch-sử-thay-đổi-audit-log)
5. [Chức năng Quản lý Sự kiện & Khuyến mãi (F10)](#5-chức-năng-quản-lý-sự-kiện--khuyến-mãi-f10)
   - [5.1. Quản lý Sự kiện toàn diện](#51-quản-lý-sự-kiện-toàn-diện)
   - [5.2. Quản lý Chương trình Khuyến mãi](#52-quản-lý-chương-trình-khuyến-mãi)
   - [5.3. Quản lý Mẫu Voucher & Phát / Đổi Voucher](#53-quản-lý-mẫu-voucher--phát--đổi-voucher)
   - [5.4. Hỗ trợ Check-in cho khách hàng](#54-hỗ-trợ-check-in-cho-khách-hàng)
6. [Tổng kết quy tắc định dạng và tránh lỗi](#6-tổng-kết-quy-tắc-định-dạng-và-tránh-lỗi)

---

## 1. TỔNG QUAN CÁC CỔNG GIAO DIỆN

| Đường dẫn (URL) | Đối tượng sử dụng | Mô tả chức năng chính |
| --- | --- | --- |
| `http://localhost:3000/` | Khách mua sắm, Công chúng | Trang chủ giới thiệu TTTM, danh bạ gian hàng theo tầng/ngành hàng, ưu đãi và sự kiện nổi bật. |
| `http://localhost:3000/kham-pha` | Khách mua sắm | Tìm kiếm, tra cứu chi tiết và lọc sự kiện, khuyến mãi đang/sắp diễn ra. |
| `http://localhost:3000/check-in` | Khách mua sắm | Xác nhận tham gia sự kiện thông qua mã QR hoặc đường link check-in. |
| `http://localhost:3000/quan-ly` | Ban quản lý, Vận hành, Marketing, Giám đốc, Kế toán | Không gian làm việc nội bộ quản trị mặt bằng, cửa hàng, sự kiện, ngân sách, khuyến mãi, voucher. |

---

## 2. ĐĂNG NHẬP & PHÂN QUYỀN DANH TÍNH

Khi truy cập trang Quản lý (`/quan-ly`) hoặc Check-in (`/check-in`), hệ thống cung cấp 2 phương thức xác thực:
1. **Phiên dùng thử (Local Identity Presets)**: Chọn nhanh các tài khoản có sẵn trong cơ sở dữ liệu kèm theo vai trò nghiệp vụ tương ứng:
   - **Ban quản lý (MANAGEMENT)**: Toàn quyền quản lý mặt bằng, cửa hàng, duyệt sự kiện, tạo khuyến mãi và voucher.
   - **Giám đốc (DIRECTOR)**: Quyền phê duyệt đề xuất sự kiện, xem báo cáo khai thác, tài chính sự kiện.
   - **Marketing (MARKETING)**: Đề xuất sự kiện, quản lý lịch hoạt động, tạo mã QR, ghi nhận chi phí, phát hành voucher.
   - **Vận hành (OPERATIONS)**: Đổi trạng thái mặt bằng, hỗ trợ check-in sự kiện, xác nhận sử dụng voucher và áp dụng khuyến mãi hóa đơn.
   - **Khách hàng (CUSTOMER)**: Check-in sự kiện, nhận và đổi voucher.
2. **Phiên dùng Token (JWT Token)**: Nhập chuỗi Bearer Token do Identity Provider cấp khi tích hợp môi trường doanh nghiệp.

---

## 3. CHỨC NĂNG DÀNH CHO KHÁCH HÀNG (PUBLIC)

### 3.1. Trang chủ và Danh bạ gian hàng (`/`)
- **Mục đích**: Giúp khách hàng nắm bắt thông tin chung về trung tâm thương mại và tìm kiếm cửa hàng thuận tiện.
- **Cách thực hiện**:
  1. Truy cập `http://localhost:3000/`.
  2. Cuộn xuống phần **Danh sách gian hàng mẫu**.
  3. Nhập từ khóa tên cửa hàng hoặc mô tả vào ô tìm kiếm.
  4. Bấm chọn danh mục ngành hàng (*Ẩm thực, Thời trang, Công nghệ, Mỹ phẩm...*) hoặc chọn tầng (*Tầng 1, Tầng 2, Tầng 3...*) để lọc nhanh kết quả.

### 3.2. Khám phá Sự kiện & Ưu đãi (`/kham-pha`)
- **Mục đích**: Tra cứu toàn bộ các chương trình ưu đãi, giảm giá và sự kiện đang hoặc sắp diễn ra tại TTTM.
- **Cách thực hiện**:
  1. Truy cập `http://localhost:3000/kham-pha`.
  2. Sử dụng thanh công cụ lọc:
     - **Từ khóa**: Nhập tên chương trình, tên gian hàng tham gia.
     - **Danh mục**: Chọn *Sự kiện* hoặc *Ưu đãi*.
     - **Thời gian**: Chọn *Đang diễn ra* hoặc *Sắp diễn ra*.
     - **Hình thức ưu đãi**: Chọn *Giảm giá*, *Tặng voucher*, hoặc *Tích điểm*.
  3. Bấm **Tìm kiếm**.
  4. Xem chi tiết thời gian hiệu lực, địa điểm tổ chức và bấm vào **Điều kiện áp dụng** để đọc thể lệ chi tiết.

### 3.3. Check-in tham gia sự kiện (`/check-in`)
- **Mục đích**: Khách hàng quét mã QR tại sự kiện hoặc mở liên kết check-in để xác nhận tham dự và nhận quyền lợi.
- **Cách thực hiện**:
  1. Quét mã QR check-in đặt tại sảnh sự kiện, trình duyệt tự mở đường dẫn dạng:
     `http://localhost:3000/check-in?token=<QR_TOKEN>&event=<EVENT_UUID>`
  2. Nếu chưa đăng nhập, chọn tài khoản khách hàng (hoặc nhập thông tin định danh khách hàng).
  3. Bấm nút **Xác nhận check-in**.
  4. Hệ thống hiển thị thông báo check-in thành công kèm mốc thời gian ghi nhận.

---

## 4. CHỨC NĂNG QUẢN LÝ MẶT BẰNG & GIAN HÀNG (F01)

### 4.1. Quản lý Mặt bằng
*(Dành cho: Ban quản lý, Vận hành)*

1. **Tra cứu danh sách mặt bằng**:
   - Truy cập tab **Mặt bằng** tại màn hình Quản lý.
   - Nhập từ khóa tại ô **Tên hoặc mã**, chọn **Khu vực** hoặc **Trạng thái**, bấm **Lọc kết quả**.
   - Bấm **Chi tiết** tại từng hàng để xem diện tích, vị trí và sơ đồ.
2. **Kiểm tra tính khả dụng của mã mặt bằng**:
   - Mở mục **Kiểm tra mã mặt bằng**, nhập mã dự kiến (Ví dụ: `MB-A01`, `MB-L1-002`).
   - Bấm **Kiểm tra mã**, hệ thống báo ngay mã đã được dùng hay còn trống.
3. **Thêm mới mặt bằng**:
   - Bấm mở phần **Thêm mặt bằng**.
   - Điền các thông tin:
     - **Mã**: Nhập theo định dạng chữ và số, gạch nối (Ví dụ: `MB-A01`).
     - **Tên**: Tên gợi nhớ (Ví dụ: `Gian hàng góc A01 - Tầng 1`).
     - **Khu vực**: Chọn từ danh sách dropdown khu vực.
     - **Tổng diện tích (m²)**: Nhập số lớn hơn 0 (Ví dụ: `65.5`).
     - **Loại mặt bằng**: Chọn *Cửa hàng, Sạp, Quảng cáo, Khu sự kiện...*
     - **Vị trí**: Chọn vị trí từ danh sách dropdown.
   - Bấm **Tạo mặt bằng**.
4. **Chỉnh sửa thông tin mặt bằng**:
   - Trong màn hình chi tiết mặt bằng, mở mục **Chỉnh sửa thông tin**.
   - Cập nhật tên, diện tích, loại mặt bằng, mô tả -> Bấm **Lưu chỉnh sửa**.
5. **Gắn vị trí trên bản đồ / sơ đồ tầng**:
   - Mở mục **Gắn vị trí mặt bằng**.
   - Sơ đồ hiển thị các điểm tọa độ trên mặt sàn, nhấp chuột chọn điểm vị trí mong muốn.
   - Nhập lý do thay đổi và bấm **Lưu vị trí**.
6. **Thay đổi trạng thái mặt bằng**:
   - Mở mục **Đổi trạng thái**.
   - Chọn trạng thái mới: *Còn trống (VACANT), Đã giữ chỗ (RESERVED), Đang bảo trì (MAINTENANCE), Ngừng khai thác (RETIRED)...*
   - Nhập lý do đổi trạng thái -> Bấm **Cập nhật trạng thái**.
7. **Đồng bộ trạng thái theo hợp đồng**:
   - Mở mục **Đồng bộ trạng thái theo hợp đồng**.
   - Chọn hợp đồng từ danh sách -> Bấm **Đồng bộ hợp đồng**.

### 4.2. Quản lý Cửa hàng / Sạp
*(Dành cho: Ban quản lý, Vận hành)*

1. **Tra cứu danh sách cửa hàng / sạp**:
   - Chọn tab **Cửa hàng / sạp**.
   - Lọc theo từ khóa, mặt bằng bố trí hoặc trạng thái.
2. **Thêm mới cửa hàng / sạp**:
   - Mở mục **Thêm cửa hàng / sạp**.
   - Điền thông tin:
     - **Mã cửa hàng / sạp**: Định dạng chuẩn (Ví dụ: `CH-HIGHLANDS`, `CH-A01`).
     - **Tên**: Tên thương hiệu/gian hàng.
     - **Mặt bằng**: Chọn từ dropdown danh sách mặt bằng còn trống.
     - **Diện tích (m²)**: Phải nhỏ hơn hoặc bằng diện tích mặt bằng quy định.
     - **Ngành hàng**: Chọn ngành hàng (*Ẩm thực, Thời trang...*).
     - **Giờ hoạt động**: Ví dụ `08:00 - 22:00 hàng ngày`.
     - **Cho phép hiển thị công khai**: Tích chọn nếu muốn hiển thị cho khách mua sắm.
   - Bấm **Tạo cửa hàng**.
3. **Xem khách thuê và chỉnh sửa**:
   - Bấm **Chi tiết** cửa hàng để xem danh sách đối tác thuê gian hàng đang ký hợp đồng.
   - Mở **Chỉnh sửa thông tin** để cập nhật giờ mở cửa hoặc đổi trạng thái.

### 4.3. Theo dõi Tình hình khai thác
*(Dành cho: Ban quản lý, Vận hành, Giám đốc)*

- **Cách sử dụng**:
  1. Chọn tab **Tình hình khai thác**.
  2. Bảng thống kê hiển thị ngay 4 chỉ số trọng yếu:
     - **Tổng mặt bằng**
     - **Đã cho thuê**
     - **Còn trống**
     - **Đang bảo trì**
  3. Lọc danh sách theo **Khu vực** hoặc **Tầng lầu** để xem chi tiết diện tích đã phân bổ tại từng gian.

### 4.4. Tra cứu Lịch sử thay đổi (Audit Log)
*(Dành cho: Ban quản lý, Vận hành, Giám đốc, Quản trị hệ thống)*

- **Cách sử dụng**:
  1. Chọn tab **Lịch sử thay đổi**.
  2. Tìm kiếm theo mã đối tượng (`MB-...`, `CH-...`), loại đối tượng (*Mặt bằng / Cửa hàng*), loại thao tác (*Tạo mới, Đổi trạng thái, Gắn vị trí...*), hoặc khoảng ngày.
  3. Tại mỗi bản ghi, bấm **Xem dữ liệu** ở cột *Trước thay đổi* và *Sau thay đổi* để đối chiếu chi tiết snapshot dữ liệu JSON.

---

## 5. CHỨC NĂNG QUẢN LÝ SỰ KIỆN & KHUYẾN MÃI (F10)

### 5.1. Quản lý Sự kiện toàn diện
*(Dành cho: Marketing, Ban quản lý, Giám đốc)*

1. **Tạo bản nháp sự kiện (Marketing)**:
   - Chọn tab **Sự kiện**, mở mục **Tạo bản nháp**.
   - Nhập thông tin:
     - **Mã sự kiện**: Chữ, số, gạch nối (Ví dụ: `SK-XUAN-2026`).
     - **Tên sự kiện**: Ví dụ `Hội chợ Ẩm thực Mùa Xuân 2026`.
     - **Địa điểm / Vị trí**: Chọn sảnh tổ chức từ dropdown.
     - **Thời gian bắt đầu / Kết thúc**: Chọn ngày giờ.
     - **Ngân sách dự kiến (₫)**: Dự toán chi phí.
     - **Số khách mục tiêu**: Ví dụ `1000`.
   - Bấm **Lưu bản nháp**.
2. **Đính kèm tài liệu kế hoạch sự kiện**:
   - Trong chi tiết bản nháp, mở mục **Tệp đính kèm**.
   - Bấm chọn tệp tài liệu kế hoạch, thiết kế poster (Hệ thống hỗ trợ các định dạng an toàn: `.pdf`, `.docx`, `.png`, `.jpg`, dung lượng tối đa 25MB).
   - Bấm **Tải lên**. Người dùng có thể bấm **Tải xuống** hoặc **Gỡ tệp** khi cần.
3. **Gửi bản nháp để phê duyệt**:
   - Khi đã hoàn thiện bản nháp, mở mục **Gửi bản nháp để duyệt**.
   - Bấm nút **Gửi duyệt** (Sự kiện chuyển sang trạng thái `PENDING_APPROVAL`).
4. **Phê duyệt hoặc Từ chối đề xuất (Ban quản lý / Giám đốc)**:
   - Đăng nhập với vai trò **Ban quản lý** hoặc **Giám đốc**.
   - Chọn sự kiện đang chờ duyệt:
     - Để phê duyệt: Mở mục **Duyệt đề xuất**, nhập **Ngân sách duyệt (₫)** và ghi chú -> Bấm **Duyệt sự kiện** (Chuyển sang `APPROVED`).
     - Để từ chối: Mở mục **Từ chối đề xuất**, nhập rõ **Lý do từ chối** -> Bấm **Từ chối sự kiện** (Chuyển sang `REJECTED`).
5. **Lập lịch hoạt động (Chống trùng sảnh)**:
   - Trong sự kiện đã duyệt, mở mục **Lịch hoạt động** -> Bấm **Thêm hoạt động**.
   - Điền tên hoạt động, khung giờ bắt đầu - kết thúc, người phụ trách.
   - Bấm **Lưu hoạt động**. *Lưu ý: Hệ thống tự động kiểm tra xung đột lịch; nếu vị trí đã có hoạt động khác trong cùng khung giờ, hệ thống sẽ cảnh báo ngăn chặn trùng lặp.*
6. **Tạo mã QR check-in sự kiện**:
   - Mở mục **Tạo mã QR check-in** -> Bấm **Tạo mã QR**.
   - Hệ thống tự động sinh liên kết check-in bảo mật và hình ảnh mã QR. Ban tổ chức in mã QR này đặt tại cửa sảnh sự kiện để khách hàng quét.
7. **Ghi nhận chi phí tổ chức**:
   - Mở mục **Ghi chi phí**.
   - Nhập tên nhà cung cấp, số hóa đơn, số tiền phát sinh (₫), thời điểm chi tiêu và mô tả -> Bấm **Ghi chi phí**.
8. **Xem báo cáo tổng kết sự kiện**:
   - Mở mục **Báo cáo sự kiện** -> Bấm **Tải báo cáo**.
   - Hệ thống tự động tổng hợp số liệu:
     - Ngân sách đã duyệt vs Ngân sách dự kiến.
     - Tổng chi thực tế vs Chênh lệch ngân sách.
     - Số khách đã check-in thực tế vs Số khách mục tiêu.
     - Tỷ lệ tham gia (%) và Đánh giá hiệu quả đầu tư (ROI).

### 5.2. Quản lý Chương trình Khuyến mãi
*(Dành cho: Ban quản lý, Marketing, Vận hành)*

1. **Tạo chương trình khuyến mãi**:
   - Chọn tab **Khuyến mãi**, chọn **Loại khuyến mãi**:
     - **Giảm giá (DISCOUNT)**: Nhập **Tỷ lệ giảm (%)** (hệ thống giới hạn tối đa 100%) và **Mức giảm tối đa (₫)**.
     - **Tặng voucher (VOUCHER_GIVEAWAY)**: Chọn mẫu voucher từ danh sách và nhập tổng số lượng phát hành.
     - **Tích điểm (POINT_ACCUMULATION)**: Nhập điểm thưởng, mức tiền quy đổi (₫) và số điểm tương ứng.
   - Nhập mã chương trình (Ví dụ: `KM-TET-2026`), tên, thời gian bắt đầu, kết thúc, điều kiện áp dụng.
   - Bấm **Tạo chương trình**.
2. **Theo dõi số liệu khuyến mãi thời gian thực**:
   - Mở mục **Theo dõi số liệu khuyến mãi**.
   - Chọn chương trình khuyến mãi từ dropdown -> Bấm **Tra cứu số liệu**.
   - Hệ thống hiển thị: Hạn mức phát hành, số lượng đã phát, tồn kho, đã sử dụng, tổng tiền đã giảm giá và tổng điểm thưởng đã tích lũy.
3. **Áp dụng khuyến mãi vào hóa đơn mua hàng**:
   - Nhân viên thu ngân mở mục **Áp dụng khuyến mãi vào hóa đơn**.
   - Chọn **Chương trình khuyến mãi**, chọn **Hóa đơn mua hàng**, chọn **Khách mua sắm**.
   - *(Mã giao dịch được hệ thống tự động sinh ngầm bảo mật, không bắt nhân viên tự nhập).*
   - Bấm **Áp dụng khuyến mãi** -> Hệ thống trả về số tiền giảm thực tế và điểm tích lũy được cấp.

### 5.3. Quản lý Mẫu Voucher & Phát / Đổi Voucher
*(Dành cho: Ban quản lý, Marketing, Vận hành)*

1. **Tạo mẫu voucher mới**:
   - Chọn tab **Voucher** -> Bấm mở **Tạo mẫu voucher**.
   - Chọn **Loại giảm giá**:
     - **Phần trăm (%)**: Nhập **Tỷ lệ giảm (%)** (ràng buộc từ `0.01%` đến tối đa `100%`) và bắt buộc nhập **Mức giảm tối đa (₫)** trần.
     - **Số tiền cố định (₫)**: Nhập số tiền giảm cố định (Ví dụ: `50.000₫`, `100.000₫`), mức giảm tối đa được để trống.
   - **Mã voucher**: Nhập chữ in HOA và số (Ví dụ: `VCDEMO50`, `VOUCHER100K`). Hệ thống có tính năng **tự động viết hoa** khi người dùng gõ.
   - Điền tên voucher, giới hạn tổng phát hành, giới hạn mỗi khách, giá trị hóa đơn tối thiểu, thời hạn hiệu lực.
   - Bấm **Tạo mẫu voucher**.
2. **Phát voucher cho khách hàng**:
   - Mở mục **Phát voucher cho khách**.
   - Chọn **Mẫu voucher** từ danh sách dropdown.
   - Chọn **Khách mua sắm** nhận voucher từ dropdown.
   - Nhập mã tham chiếu (tùy chọn) -> Bấm **Phát voucher**.
3. **Sử dụng / Xác nhận đổi voucher**:
   - Mở mục **Sử dụng voucher**.
   - Chọn **Phiếu ưu đãi của khách** từ danh sách dropdown (hiển thị rõ tên khách hàng và mã voucher đã phát).
   - Chọn **Hóa đơn mua hàng** áp dụng.
   - Bấm **Xác nhận sử dụng**. Hệ thống kiểm tra điều kiện hóa đơn, gian hàng áp dụng, thời hạn và đánh dấu phiếu sang trạng thái `USED`.

### 5.4. Hỗ trợ Check-in cho khách hàng
*(Dành cho: Vận hành, Lễ tân TTTM)*

- **Cách sử dụng**:
  1. Chọn tab **Hỗ trợ check-in**.
  2. Chọn **Sự kiện** đang diễn ra từ danh sách dropdown.
  3. Chọn **Khách mua sắm** cần hỗ trợ từ danh sách dropdown.
  4. Dán mã token lấy từ QR sự kiện vào ô **Mã từ liên kết check-in**.
  5. Bấm **Xác nhận check-in cho khách**.

---

## 6. TỔNG KẾT QUY TẮC ĐỊNH DẠNG VÀ TRÁNH LỖI

Để quá trình vận hành hệ thống diễn ra mượt mà và không gặp lỗi xác thực dữ liệu, người dùng cần lưu ý các quy tắc sau:

1. **Quy tắc đặt Mã (Code)**:
   - **Mã voucher**: Bắt buộc viết hoa và chỉ gồm chữ cái cùng chữ số (`^[A-Z0-9]+$`). Không chứa khoảng trắng, dấu tiếng Việt hoặc dấu gạch nối. *(Giao diện đã hỗ trợ tự động viết hoa khi gõ).*
   - **Mã mặt bằng, cửa hàng, sự kiện, khuyến mãi**: Chỉ gồm chữ cái, chữ số, dấu chấm `.`, dấu gạch nối `-`, hoặc gạch dưới `_` (`^[A-Za-z0-9._-]+$`).
   - **Mã giao dịch / Mã QR check-in**: Hệ thống hoàn toàn tự động sinh, người dùng không cần tự gõ.
2. **Quy tắc tính toán Giảm giá**:
   - Khi giảm giá theo **Phần trăm (%)**: Tỷ lệ giảm tuyệt đối không được vượt quá `100%`. Bắt buộc phải có **Mức giảm tối đa (₫)** để kiểm soát rủi ro tài chính.
   - Khi giảm giá theo **Số tiền cố định**: Nhập số tiền VNĐ thực tế, không cần nhập mức giảm tối đa.
3. **Quy tắc thời gian sự kiện & Check-in**:
   - Khách hàng chỉ có thể check-in khi sự kiện đang trong khung giờ diễn ra (`startAt <= thời điểm hiện tại <= endAt`).
   - Các hoạt động trong sự kiện không được xếp trùng vị trí/sảnh trong cùng một khoảng thời gian.
4. **Quy tắc tệp đính kèm**:
   - Hệ thống kiểm tra magic bytes thực tế của tệp tải lên, chỉ chấp nhận 4 định dạng chuẩn: `.pdf`, `.docx`, `.png`, `.jpg` với dung lượng tối đa 25MB.
5. **Chọn thực thể liên kết qua Dropdown**:
   - Các trường Khu vực, Tầng lầu, Mặt bằng, Cửa hàng, Ngành hàng, Khách hàng, Hóa đơn, Mẫu voucher và Phiếu ưu đãi đều đã được tích hợp danh sách chọn Dropdown hiển thị đầy đủ tên gọi trực quan, người dùng không cần phải ghi nhớ hay sao chép mã UUID thủ công.
