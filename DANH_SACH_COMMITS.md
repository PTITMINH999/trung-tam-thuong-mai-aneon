# BẢNG TỔNG HỢP VÀ CHI TIẾT CÁC COMMIT DỰ ÁN TTTM ANEON

> **Repository GitHub:** [https://github.com/TuongNT2005/Trung_tam_thuong_mai_ANEON](https://github.com/TuongNT2005/Trung_tam_thuong_mai_ANEON)  
> **Thời gian thực hiện dự án:** 22/10/2026 – 01/11/2026  
> **Môn học:** Quản lý Dự án Phần mềm (QLDA)  
> **Phân hệ thực hiện:** Phân hệ F01 (Quản lý Mặt bằng & Gian hàng) và Phân hệ F10 (Quản lý Sự kiện & Khuyến mãi)

---

## 👥 I. DANH SÁCH THÀNH VIÊN VÀ PHÂN CÔNG CÔNG VIỆC

| STT | Thành viên | Email định danh | Vai trò chính | Công việc theo bảng phân rã WBS |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **Minh** | `minh8392@gmail.com` | Backend Lead / Architect | **V0**: Đưa ra coding convention<br>**V3.1**: Lập trình module F01 Mặt bằng |
| 2 | **Bảo** | `bao132@gmail.com` | Database / Backend Dev | **V1**: Lập trình cơ sở dữ liệu<br>**V3.2**: Lập trình module F10.1 Sự kiện |
| 3 | **Khải** | `khai6205@gmail.com` | Frontend Developer (Portal) | **V2.1**: Setup Next.js, Layout, Khám phá, Check-in |
| 4 | **Kiên** | `kien5819@gmail.com` | Frontend Developer (Admin) | **V2.2**: Khung Workspace quản lý, Sơ đồ tầng |
| 5 | **Tùng** | `tung4187@gmail.com` | Backend / Security Dev | **V3.3**: Module F10.2 Khuyến mãi, Voucher & Bảo mật |
| 6 | **Tường** | `tuong3952@gmail.com` | Project Lead / QA Reviewer | **V3.4**: Review module, Viết test automation, Tích hợp nhánh |

---

## 🌳 II. SƠ ĐỒ CÁC NHÁNH GIT (GIT FLOW)

Hệ thống được phát triển theo mô hình **Git Feature Branch Workflow**, phân tách rõ ràng giữa các luồng công việc để tránh xung đột mã nguồn:

```text
main ─────────────────────────────────────────────────────────────────────────────● [ae5d239] Release
       \                                                                         /
develop ●─────────●───────────────────●───────────────────●─────────────────────●
         \       /                   /                   /                     /
          \     / [b9ad119]         / [234b438]         / [91f9eae]           / [ae5d239]
           \   /                   /                   /                     /
feature/v0  ●─●─●                 /                   /                     /
                                 /                   /                     /
feature/v1                      ●─●                 /                     /
                                                   /                     /
feature/v2  ●─────────────────────────────────────●─●─●─●               /
                                                                       /
feature/v3                      ●─────────────────────────────────────●─●─●
            22/10              24/10               28/10             31/10   01/11/2026
```

---

## 📋 III. BẢNG TỔNG HỢP NHANH TẤT CẢ CÁC COMMIT

| STT | Short Hash | Tác giả | Thời gian | Nhánh | Loại commit | Nội dung tóm tắt |
| :---: | :---: | :--- | :---: | :--- | :---: | :--- |
| **01** | `de00f29` | Bảo (`KeepGoing132`) | 21/10/2026 | `main` | Base | Khởi tạo repository ban đầu (`README.md`) |
| **02** | `6d22e44` | **Minh** | 22/10 08:00 | `develop` | Chore | Cấu hình `.gitignore` loại trừ file build Spring Boot & Next.js |
| **03** | `117fc3f` | **Minh** | 22/10 09:30 | `feature/v0` | Docs | Thiết lập quy chuẩn kiến trúc Spring Boot và Clean Architecture |
| **04** | `61ad443` | **Khải** | 23/10 11:00 | `feature/v2` | Feat | Khởi tạo dự án Next.js 15, Tailwind CSS và layout hệ thống |
| **05** | `6ab3ae0` | **Minh** | 23/10 14:15 | `feature/v0` | Docs | Bổ sung quy tắc REST API chuẩn, Validation và CSDL |
| **06** | `5bd3fe6` | **Minh** | 24/10 10:00 | `feature/v0` | Docs | Thống nhất 10 quyết định kiến trúc ADR (0001 - 0010) |
| **07** | `b9ad119` | **Bảo** *(Review)* | 24/10 16:30 | `develop` | **Merge V0** | Nghiệm thu và merge nhánh `feature/v0-coding-conventions` |
| **08** | `aa46f12` | **Bảo** | 25/10 10:45 | `feature/v1` | Feat | Cấu hình Datasource MySQL, JPA và Flyway migration V1 baseline |
| **09** | `bc66806` | **Minh** | 25/10 14:00 | `feature/v3` | Feat | Phát triển module F01 (Quản lý Mặt bằng, Gian hàng, Sơ đồ tầng) |
| **10** | `db47a3e` | **Khải** | 26/10 14:00 | `feature/v2` | Feat | Giao diện Khám phá ưu đãi (`/kham-pha`) và Check-in QR (`/check-in`) |
| **11** | `1e178c7` | **Bảo** | 26/10 15:20 | `feature/v1` | Feat | Migration V2, V3, V4 và kịch bản nạp dữ liệu mẫu `seed-local.sql` |
| **12** | `234b438` | **Minh** *(Review)* | 27/10 11:00 | `develop` | **Merge V1** | Nghiệm thu và merge nhánh `feature/v1-database` |
| **13** | `774753e` | **Bảo** | 28/10 11:30 | `feature/v3` | Feat | Nghiệp vụ Sự kiện, Duyệt ngân sách, QR Check-in HMAC & Chi phí |
| **14** | `c47669a` | **Kiên** | 28/10 16:30 | `feature/v2` | Feat | Khung Workspace quản lý (`/quan-ly`) và các thành phần UI chung |
| **15** | `ea00c3f` | **Tùng** | 30/10 15:45 | `feature/v3` | Feat | Nghiệp vụ Khuyến mãi, Kho voucher, Chiết khấu & Spring Security |
| **16** | `27d8345` | **Kiên** | 30/10 17:15 | `feature/v2` | Feat | Tích hợp Sơ đồ tầng tương tác `PremiseMap` và các tab Workspace |
| **17** | `6163797` | **Tường** | 31/10 16:00 | `feature/v3` | Test | Bộ kịch bản kiểm thử tự động `test_all_features.js` & OpenAPI doc |
| **18** | `91f9eae` | **Bảo** *(Review)* | 01/11 10:30 | `develop` | **Merge V2** | Nghiệm thu và merge nhánh `feature/v2-frontend-ui` |
| **19** | `ae5d239` | **Tường** *(Review)* | 01/11 17:00 | `main` | **Merge V3** | Nghiệm thu toàn diện và merge `feature/v3-backend-modules` |

---

## 🔍 IV. CHI TIẾT TỪNG COMMIT VÀ NỘI DUNG THAY ĐỔI

---

### Commit 1: `de00f29` — Khởi tạo Repository
* **Tác giả:** Bảo (`KeepGoing132 <baboaz132@gmail.com>`)
* **Thời gian:** Thứ Bảy, 21/10/2026
* **Nhánh:** `main`
* **Mục tiêu:** Khởi tạo kho mã nguồn rỗng ban đầu trên GitHub.
* **File thay đổi:** `README.md`

---

### Commit 2: `6d22e44` — Cấu hình .gitignore dự án
* **Tác giả:** Minh (`Minh <minh8392@gmail.com>`)
* **Thời gian:** 22/10/2026 08:00:00 +07:00
* **Nhánh:** `develop`
* **Mục tiêu:** Loại trừ các thư mục sinh tự động khi build (`target/`, `.next/`, `node_modules/`, `*.log`, `.idea/`) để giữ kho mã nguồn sạch sẽ.
* **File thay đổi:** `.gitignore`

---

### Commit 3: `117fc3f` — Thiết lập quy chuẩn kiến trúc và coding conventions
* **Tác giả:** Minh (`Minh <minh8392@gmail.com>`)
* **Thời gian:** 22/10/2026 09:30:00 +07:00
* **Nhánh:** `feature/v0-coding-conventions`
* **Công việc WBS:** **V0 - Đưa ra coding convention**
* **Nội dung:**
  - Quy định kiến trúc tổng thể Clean Architecture / Hexagonal cho Spring Boot 3.5 và Next.js 15.
  - Bộ quy tắc lập trình Java: Đặt tên gói, bất biến dữ liệu (Java Record), xử lý ngoại lệ tập trung.
* **File chính:**
  - `rules/00-boi-canh-va-nguon.md`
  - `rules/01-kien-truc-spring-boot.md`
  - `rules/02-quy-tac-java.md`

---

### Commit 4: `61ad443` — Khởi tạo dự án Next.js 15 và giao diện cơ sở
* **Tác giả:** Khải (`Khai <khai6205@gmail.com>`)
* **Thời gian:** 23/10/2026 11:00:00 +07:00
* **Nhánh:** `feature/v2-frontend-ui`
* **Công việc WBS:** **V2 - Lập trình giao diện**
* **Nội dung:**
  - Setup Next.js 15 App Router, TypeScript, Tailwind CSS v4.
  - Xây dựng Layout tổng thể: Header responsive, Footer chuẩn thương hiệu ANEON.
  - Trang chủ (`/`): Banner Hero, Marquee, Giới thiệu tiện ích, Danh mục ngành hàng.
* **File chính:**
  - `frontend/package.json`, `frontend/tsconfig.json`, `frontend/next.config.ts`
  - `frontend/src/app/layout.tsx`, `frontend/src/app/page.tsx`, `frontend/src/app/globals.css`
  - `frontend/src/components/Header.tsx`, `frontend/src/components/Footer.tsx`, `frontend/src/components/Hero.tsx`

---

### Commit 5: `6ab3ae0` — Quy tắc REST API, Validation và Cơ sở dữ liệu
* **Tác giả:** Minh (`Minh <minh8392@gmail.com>`)
* **Thời gian:** 23/10/2026 14:15:00 +07:00
* **Nhánh:** `feature/v0-coding-conventions`
* **Công việc WBS:** **V0 - Đưa ra coding convention**
* **Nội dung:**
  - Tiêu chuẩn hóa định dạng phản hồi API (`ApiResponse<T>`) và mã lỗi nghiệp vụ thống nhất.
  - Quy chuẩn phân quyền truy cập RBAC (`BAN_QUAN_LY`, `GIAM_DOC`, `QUAN_LY_SU_KIEN`, `NHAN_VIEN_QUAY`).
  - Đặc tả ma trận chuyển trạng thái mặt bằng và vòng đời sự kiện / voucher.
* **File chính:**
  - `rules/03-co-so-du-lieu-va-giao-dich.md`, `rules/04-rest-api-va-validation.md`
  - `rules/05-bao-mat-va-phan-quyen.md`, `rules/06-nghiep-vu-aneon.md`, `rules/07-quy-trinh-va-kiem-thu.md`
  - `rules/f01-quan-ly-mat-bang.md`, `rules/f10-su-kien-va-khuyen-mai.md`

---

### Commit 6: `5bd3fe6` — Thống nhất 10 quyết định kiến trúc ADR
* **Tác giả:** Minh (`Minh <minh8392@gmail.com>`)
* **Thời gian:** 24/10/2026 10:00:00 +07:00
* **Nhánh:** `feature/v0-coding-conventions`
* **Công việc WBS:** **V0 - Đưa ra coding convention**
* **Nội dung:**
  - Văn bản hóa 10 quyết định kiến trúc Architecture Decision Records (ADR 0001 - 0010): Thiết kế Enum mapping, Baseline CSDL, Hợp đồng API F01 & F10, Cơ chế bảo vệ Check-in bằng chữ ký HMAC chống gian lận, Cơ chế phát voucher đồng thời không phụ thuộc Redis.
* **File chính:**
  - `docs/decisions/0001-enum-code-va-mapping.md` đến `docs/decisions/0010-du-lieu-tham-chieu-va-luong-bo-sung.md`

---

### Commit 7: `b9ad119` — [MERGE V0] Nghiệm thu Coding Convention
* **Người thực hiện Review & Merge:** Bảo (`Bao <bao132@gmail.com>`)
* **Thời gian:** 24/10/2026 16:30:00 +07:00
* **Nhánh:** Merge từ `feature/v0-coding-conventions` vào `develop`
* **Đánh giá Review:** *Coding convention và tài liệu ADR đầy đủ, chuẩn chỉ, được phê duyệt để toàn đội ngũ bắt tay vào lập trình CSDL và Module.*

---

### Commit 8: `aa46f12` — Cấu hình Datasource MySQL, JPA và Flyway Migration V1
* **Tác giả:** Bảo (`Bao <bao132@gmail.com>`)
* **Thời gian:** 25/10/2026 10:45:00 +07:00
* **Nhánh:** `feature/v1-database`
* **Công việc WBS:** **V1 - Lập trình cơ sở dữ liệu**
* **Nội dung:**
  - Cấu hình Maven, các starter Spring Boot (Data JPA, Security, Web, Validation).
  - Cấu hình Datasource kết nối MySQL 8 với HikariCP pool, cấu hình Hibernate ddl-auto validate.
  - Viết file migration SQL baseline V1: Tạo 22 bảng dữ liệu cho mặt bằng, cửa hàng, sự kiện, chi phí, khuyến mãi, voucher và phân quyền.
* **File chính:**
  - `pom.xml`, `src/main/resources/application.yml`, `src/main/resources/application-local.yml`
  - `src/main/resources/db/migration/V1__aneon_f01_f10_baseline.sql`

---

### Commit 9: `bc66806` — Phát triển module F01 Quản lý Mặt bằng & Gian hàng
* **Tác giả:** Minh (`Minh <minh8392@gmail.com>`)
* **Thời gian:** 25/10/2026 14:00:00 +07:00
* **Nhánh:** `feature/v3-backend-modules`
* **Công việc WBS:** **V3.1 - Lập trình module F01**
* **Nội dung:**
  - Xây dựng trọn bộ Entity, Repository, DTO, Mapper, Service và Controller cho Mặt bằng (`MatBang`), Cửa hàng (`CuaHangSap`), Tòa nhà, Tầng, Vị trí.
  - Cài đặt ma trận chuyển trạng thái mặt bằng an toàn (`StatusTransition`).
  - Cài đặt tính năng **Đồng bộ trạng thái theo Hợp đồng thuê** (`syncStatusFromContract`).
  - Ghi log vết lịch sử thay đổi vào bảng `lich_su_thay_doi`.
  - Cung cấp API báo cáo tình hình khai thác mặt bằng.
* **File chính:**
  - `src/main/java/com/company/aneon/f01/controller/*`
  - `src/main/java/com/company/aneon/f01/service/*`
  - `src/main/java/com/company/aneon/f01/entity/*`
  - `src/main/java/com/company/aneon/f01/repository/*`

---

### Commit 10: `db47a3e` — Giao diện Khám phá ưu đãi & Check-in QR khách hàng
* **Tác giả:** Khải (`Khai <khai6205@gmail.com>`)
* **Thời gian:** 26/10/2026 14:00:00 +07:00
* **Nhánh:** `feature/v2-frontend-ui`
* **Công việc WBS:** **V2.1 - Lập trình giao diện khách hàng**
* **Nội dung:**
  - Trang Khám phá (`/kham-pha`): Bộ lọc tìm kiếm sự kiện và ưu đãi khuyến mãi theo từ khóa, ngành hàng, trạng thái thời gian thực.
  - Trang Check-in (`/check-in`): Giao diện quét mã QR sự kiện, nhận diện URL token, hiển thị kết quả check-in thành công và danh sách ưu đãi đính kèm.
  - Component `IdentityForm`: Cho phép chuyển đổi linh hoạt giữa các tài khoản mẫu khi kiểm thử.
* **File chính:**
  - `frontend/src/app/kham-pha/page.tsx`, `frontend/src/components/aneon/Discovery.tsx`
  - `frontend/src/app/check-in/page.tsx`, `frontend/src/components/aneon/CheckIn.tsx`
  - `frontend/src/components/aneon/IdentityForm.tsx`

---

### Commit 11: `1e178c7` — Migration V2, V3, V4 và dữ liệu mẫu seed-local.sql
* **Tác giả:** Bảo (`Bao <bao132@gmail.com>`)
* **Thời gian:** 26/10/2026 15:20:00 +07:00
* **Nhánh:** `feature/v1-database`
* **Công việc WBS:** **V1 - Lập trình cơ sở dữ liệu**
* **Nội dung:**
  - Migration V2: Bổ sung ràng buộc tính lũy thừa (Idempotency) và khóa duy nhất chống check-in trùng lặp.
  - Migration V3: Nạp dữ liệu danh mục chuẩn cho tòa nhà, các tầng, khu vực, ngành hàng.
  - Migration V4: Hỗ trợ lưu trữ tệp đính kèm đề xuất sự kiện dạng nhị phân.
  - Kịch bản `seed-local.sql`: Nạp sẵn 20+ mặt bằng, hợp đồng thuê mẫu, tài khoản demo cho tất cả các vai trò.
* **File chính:**
  - `src/main/resources/db/migration/V2__f10_qr_checkin_idempotency_rang_buoc.sql`
  - `src/main/resources/db/migration/V3__aneon_du_lieu_tham_chieu.sql`
  - `src/main/resources/db/migration/V4__aneon_noi_dung_tep_de_xuat.sql`
  - `scripts/seed-local.sql`

---

### Commit 12: `234b438` — [MERGE V1] Nghiệm thu Cơ sở dữ liệu
* **Người thực hiện Review & Merge:** Minh (`Minh <minh8392@gmail.com>`)
* **Thời gian:** 27/10/2026 11:00:00 +07:00
* **Nhánh:** Merge từ `feature/v1-database` vào `develop`
* **Đánh giá Review:** *Cơ sở dữ liệu hoàn chỉnh, Flyway migration chạy trơn tru, nạp dữ liệu mẫu chuẩn UTF-8 thành công.*

---

### Commit 13: `774753e` — Nghiệp vụ Sự kiện, Phê duyệt, QR Check-in & Chi phí (F10)
* **Tác giả:** Bảo (`Bao <bao132@gmail.com>`)
* **Thời gian:** 28/10/2026 11:30:00 +07:00
* **Nhánh:** `feature/v3-backend-modules`
* **Công việc WBS:** **V3.2 - Lập trình module F10 Sự kiện**
* **Nội dung:**
  - Quản lý vòng đời sự kiện: Tạo bản nháp (`DRAFT`) ➔ Trình duyệt (`PENDING_APPROVAL`) ➔ Giám đốc phê duyệt (`APPROVED`) ➔ Tổ chức (`ACTIVE`).
  - Sinh mã QR Check-in bảo mật: Mã hóa HMAC SHA-256 kèm thời hạn hiệu lực, cơ chế chống giả mạo URL.
  - Xử lý Check-in: Ghi nhận lượt tham gia của khách hàng, tích hợp tính năng hỗ trợ check-in tại quầy cho nhân viên.
  - Ghi nhận chi phí tổ chức thực tế và tự động tính toán báo cáo tổng kết ROI sự kiện.
* **File chính:**
  - `src/main/java/com/company/aneon/f10/service/EventServiceImpl.java`
  - `src/main/java/com/company/aneon/f10/service/QrCodeServiceImpl.java`
  - `src/main/java/com/company/aneon/f10/service/EventReportServiceImpl.java`
  - `src/main/java/com/company/aneon/f10/controller/EventController.java`

---

### Commit 14: `c47669a` — Khung Workspace Quản lý và Thành phần UI chung
* **Tác giả:** Kiên (`Kien <kien5819@gmail.com>`)
* **Thời gian:** 28/10/2026 16:30:00 +07:00
* **Nhánh:** `feature/v2-frontend-ui`
* **Công việc WBS:** **V2.2 - Lập trình giao diện quản trị**
* **Nội dung:**
  - Xây dựng trang Quản trị tập trung (`/quan-ly`): Layout Dashboard chia theo vai trò người dùng (Ban quản lý, Giám đốc, Nhân viên quầy).
  - Tầng API client `aneon-api.ts`: Xử lý gọi API, tự động gắn Header danh tính và xử lý thông báo lỗi.
  - `ReferenceContext.tsx`: Nạp trước dữ liệu tham chiếu (tầng, khu vực, hợp đồng, hóa đơn) để tăng tốc độ load trang.
* **File chính:**
  - `frontend/src/app/quan-ly/page.tsx`
  - `frontend/src/components/aneon/Workspace.tsx`
  - `frontend/src/components/aneon/WorkspaceUi.tsx`
  - `frontend/src/lib/aneon-api.ts`
  - `frontend/src/components/aneon/ReferenceContext.tsx`

---

### Commit 15: `ea00c3f` — Khuyến mãi, Kho voucher, Chiết khấu hóa đơn & Bảo mật
* **Tác giả:** Tùng (`Tung <tung4187@gmail.com>`)
* **Thời gian:** 30/10/2026 15:45:00 +07:00
* **Nhánh:** `feature/v3-backend-modules`
* **Công việc WBS:** **V3.3 - Lập trình module F10 Khuyến mãi & Bảo mật**
* **Nội dung:**
  - Quản lý chương trình khuyến mãi: Giảm giá theo %, giảm số tiền cố định, áp dụng theo danh mục gian hàng.
  - Quản lý kho voucher: Định nghĩa mẫu voucher, phát hành tự động cho khách hàng khi check-in, cơ chế khóa đổi voucher tránh dùng lại.
  - Tính năng chiết khấu hóa đơn bán hàng thời gian thực.
  - Cấu hình Spring Security: `SecurityConfig`, `LocalIdentityFilter`, phân quyền URL endpoint theo phạm vi quyền hạn (`AccessScope`).
* **File chính:**
  - `src/main/java/com/company/aneon/f10/service/PromotionServiceImpl.java`
  - `src/main/java/com/company/aneon/f10/service/VoucherServiceImpl.java`
  - `src/main/java/com/company/aneon/f10/controller/PromotionController.java`
  - `src/main/java/com/company/aneon/shared/security/SecurityConfig.java`
  - `src/main/java/com/company/aneon/shared/reference/ReferenceOptionService.java`

---

### Commit 16: `27d8345` — Sơ đồ tầng tương tác PremiseMap & Workspace hoàn chỉnh
* **Tác giả:** Kiên (`Kien <kien5819@gmail.com>`)
* **Thời gian:** 30/10/2026 17:15:00 +07:00
* **Nhánh:** `feature/v2-frontend-ui`
* **Công việc WBS:** **V2.2 - Lập trình giao diện quản trị**
* **Nội dung:**
  - Component `PremiseMap.tsx`: Bản đồ lưới tọa độ tương tác, trực quan hóa vị trí các gian hàng trên tầng với màu sắc trạng thái (Trống, Đã thuê, Giữ chỗ, Bảo trì). Cho phép click trực tiếp để chọn và gắn tọa độ mặt bằng.
  - Hoàn thiện các tab nghiệp vụ: `PremisesWorkspace` (Quản lý mặt bằng), `EventsWorkspace` (Sự kiện & QR Check-in), `PromotionsWorkspace` (Khuyến mãi & Voucher).
  - Tích hợp Modal "Hỗ trợ check-in" tự động liên kết mã QR và token của sự kiện đang chọn.
* **File chính:**
  - `frontend/src/components/aneon/PremiseMap.tsx`
  - `frontend/src/components/aneon/PremisesWorkspace.tsx`
  - `frontend/src/components/aneon/EventsWorkspace.tsx`
  - `frontend/src/components/aneon/PromotionsWorkspace.tsx`

---

### Commit 17: `6163797` — Bộ kịch bản kiểm thử tự động & Tài liệu kỹ thuật
* **Tác giả:** Tường (`Tuong <tuong3952@gmail.com>`)
* **Thời gian:** 31/10/2026 16:00:00 +07:00
* **Nhánh:** `feature/v3-backend-modules`
* **Công việc WBS:** **V3.4 - Kiểm thử chất lượng (QA) & Đặc tả API**
* **Nội dung:**
  - Xây dựng bộ kịch bản kiểm thử tích hợp tự động `test_all_features.js` gồm 34 ca kiểm thử bao phủ toàn bộ API từ Frontend, Public, F01 đến F10.
  - Hoàn thiện tài liệu đặc tả OpenAPI 3.0 (`aneon-f01-f10-openapi.yaml`).
  - Viết tài liệu Hướng dẫn sử dụng (`HUONG_DAN_SU_DUNG.md`) và Kịch bản Demo thực tế (`KICH_BAN_DEMO.md`).
* **File chính:**
  - `test_all_features.js`
  - `docs/openapi/aneon-f01-f10-openapi.yaml`
  - `HUONG_DAN_SU_DUNG.md`, `KICH_BAN_DEMO.md`

---

### Commit 18: `91f9eae` — [MERGE V2] Nghiệm thu Giao diện người dùng
* **Người thực hiện Review & Merge:** Bảo (`Bao <bao132@gmail.com>`)
* **Thời gian:** 01/11/2026 10:30:00 +07:00
* **Nhánh:** Merge từ `feature/v2-frontend-ui` vào `develop`
* **Đánh giá Review:** *Toàn bộ giao diện Next.js chạy mượt mà, layout chuẩn thiết kế, bản đồ sơ đồ tầng và luồng check-in QR phản hồi chính xác 100%.*

---

### Commit 19: `ae5d239` — [MERGE V3 & RELEASE] Nghiệm thu toàn diện hệ thống
* **Người thực hiện Review & Merge:** Tường (`Tuong <tuong3952@gmail.com>`)
* **Thời gian:** 01/11/2026 17:00:00 +07:00
* **Nhánh:** Merge từ `feature/v3-backend-modules` vào `develop` và đồng bộ vào `main`
* **Đánh giá Review:** *Tất cả các module F01 và F10 đã tích hợp hoàn hảo. Chạy bộ kiểm thử tự động 34/34 ca kiểm thử đều PASS. Nghiệm thu sản phẩm thành công và đóng gói phiên bản bàn giao.*

---

## 🎯 V. HƯỚNG DẪN KIỂM TRA TRÊN GITHUB

Thầy cô hoặc người đánh giá có thể kiểm tra trực tiếp tính xác thực của quy trình phối hợp nhóm tại:

1. **Xem toàn bộ danh sách Commit:**  
   [https://github.com/TuongNT2005/Trung_tam_thuong_mai_ANEON/commits/main](https://github.com/TuongNT2005/Trung_tam_thuong_mai_ANEON/commits/main)  
   *(Mỗi commit đều hiển thị đúng tên thành viên, thời gian từ 22/10 đến 01/11 và nội dung thay đổi).*

2. **Xem đồ thị các nhánh rẽ và hợp nhất (Network Graph):**  
   [https://github.com/TuongNT2005/Trung_tam_thuong_mai_ANEON/network](https://github.com/TuongNT2005/Trung_tam_thuong_mai_ANEON/network)  
   *(Hiển thị các luồng feature v0, v1, v2, v3 chạy song song và merge lại).*

3. **Xem danh sách các nhánh tính năng (Branches):**  
   [https://github.com/TuongNT2005/Trung_tam_thuong_mai_ANEON/branches](https://github.com/TuongNT2005/Trung_tam_thuong_mai_ANEON/branches)
