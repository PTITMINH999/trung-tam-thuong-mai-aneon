// Updated comprehensive test suite
const http = require('http');

const API_BASE = 'http://localhost:8080/api/v1';
const FRONTEND_BASE = 'http://localhost:3000';

const MANAGEMENT_HEADERS = {
  'Content-Type': 'application/json',
  'X-Actor-Id': '11111111-1111-1111-1111-111111111111',
  'X-Actor-Roles': 'MANAGEMENT',
};

const MARKETING_HEADERS = {
  'Content-Type': 'application/json',
  'X-Actor-Id': '22222222-2222-2222-2222-222222222222',
  'X-Actor-Roles': 'MARKETING',
};

const DIRECTOR_HEADERS = {
  'Content-Type': 'application/json',
  'X-Actor-Id': '00000000-0000-0000-0000-000000000001',
  'X-Actor-Roles': 'DIRECTOR',
};

const OPERATIONS_HEADERS = {
  'Content-Type': 'application/json',
  'X-Actor-Id': '00000000-0000-0000-0000-000000000004',
  'X-Actor-Roles': 'OPERATIONS',
};

const CUSTOMER_HEADERS = {
  'Content-Type': 'application/json',
  'X-Actor-Id': '33333333-3333-3333-3333-333333333333',
  'X-Actor-Roles': 'CUSTOMER',
};

async function req(url, options = {}) {
  const parsed = new URL(url);
  return new Promise((resolve, reject) => {
    const r = http.request(parsed, {
      method: options.method || 'GET',
      headers: options.headers || {},
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json;
        try { json = JSON.parse(data); } catch (e) { json = data; }
        resolve({ status: res.statusCode, headers: res.headers, data: json });
      });
    });
    r.on('error', reject);
    if (options.body) {
      r.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    r.end();
  });
}

const results = [];

function record(suite, testName, success, details, error = null) {
  results.push({ suite, testName, success, details, error });
  const statusIcon = success ? '✅ PASS' : '❌ FAIL';
  console.log(`${statusIcon}: [${suite}] ${testName} - ${details}`);
  if (error) console.error('   Error:', error);
}

async function runTests() {
  console.log('=== BẮT ĐẦU KIỂM THỬ TOÀN BỘ CHỨC NĂNG ANEON ===\n');

  // 1. Frontend public routes
  try {
    const resHome = await req(`${FRONTEND_BASE}/`);
    record('Frontend', 'Trang chủ (/)', resHome.status === 200, `Status ${resHome.status}`);
  } catch (e) { record('Frontend', 'Trang chủ (/)', false, 'Lỗi kết nối', e.message); }

  try {
    const resDiscovery = await req(`${FRONTEND_BASE}/kham-pha`);
    record('Frontend', 'Trang khám phá (/kham-pha)', resDiscovery.status === 200, `Status ${resDiscovery.status}`);
  } catch (e) { record('Frontend', 'Trang khám phá (/kham-pha)', false, 'Lỗi kết nối', e.message); }

  try {
    const resCheckIn = await req(`${FRONTEND_BASE}/check-in`);
    record('Frontend', 'Trang check-in (/check-in)', resCheckIn.status === 200, `Status ${resCheckIn.status}`);
  } catch (e) { record('Frontend', 'Trang check-in (/check-in)', false, 'Lỗi kết nối', e.message); }

  try {
    const resManage = await req(`${FRONTEND_BASE}/quan-ly`);
    record('Frontend', 'Trang quản lý (/quan-ly)', resManage.status === 200, `Status ${resManage.status}`);
  } catch (e) { record('Frontend', 'Trang quản lý (/quan-ly)', false, 'Lỗi kết nối', e.message); }

  // 2. Public API Search
  try {
    const resSearch = await req(`${API_BASE}/f10/promotions-events/search?page=0&size=10`);
    record('Public API', 'Tìm kiếm sự kiện & ưu đãi', resSearch.status === 200 && resSearch.data?.code === 200, `Status ${resSearch.status}`);
  } catch (e) { record('Public API', 'Tìm kiếm sự kiện & ưu đãi', false, 'Lỗi', e.message); }

  // 3. Shared Reference Options & Public Accounts
  let refData;
  try {
    const resRef = await req(`${API_BASE}/shared/reference-options`, { headers: MANAGEMENT_HEADERS });
    refData = resRef.data?.data;
    record('Shared API', 'Lấy danh mục tham chiếu', resRef.status === 200 && refData?.zones?.length > 0, `Có ${refData?.zones?.length} khu vực, ${refData?.premises?.length} mặt bằng`);

    const resAcc = await req(`${API_BASE}/shared/public-accounts`);
    record('Shared API', 'Lấy danh sách tài khoản demo', resAcc.status === 200 && Array.isArray(resAcc.data?.data) && resAcc.data?.data?.length > 0, `Có ${resAcc.data?.data?.length} tài khoản mẫu`);
  } catch (e) { record('Shared API', 'Lấy danh mục tham chiếu & tài khoản', false, 'Lỗi', e.message); }

  // 4. F01 - Mặt bằng
  let testPremiseId, testPremiseCode = `MB-TEST-${Date.now().toString().slice(-4)}${Math.random().toString(36).slice(2, 4)}`;
  try {
    // Check code availability
    const resAvail = await req(`${API_BASE}/f01/premises/code-availability?code=${testPremiseCode}`, { headers: MANAGEMENT_HEADERS });
    record('F01 Mặt bằng', 'Kiểm tra mã khả dụng', resAvail.status === 200 && resAvail.data?.data?.available === true, `Mã ${testPremiseCode} khả dụng`);

    // Create premise
    const targetLoc = refData?.locations?.[0];
    const zoneId = targetLoc?.zoneId || refData?.zones?.[0]?.id || 'a0000000-0000-4000-8000-000000000002';
    const resCreatePremise = await req(`${API_BASE}/f01/premises`, {
      method: 'POST',
      headers: MANAGEMENT_HEADERS,
      body: {
        code: testPremiseCode,
        name: `Mặt bằng Thử nghiệm ${testPremiseCode}`,
        zoneId: zoneId,
        totalArea: 65.5,
        status: 'VACANT',
        type: 'STORE',
        description: 'Mặt bằng kiểm thử tự động',
      }
    });
    testPremiseId = resCreatePremise.data?.data?.id;
    record('F01 Mặt bằng', 'Tạo mặt bằng mới', resCreatePremise.status === 201 && !!testPremiseId, `ID: ${testPremiseId}, Code: ${testPremiseCode}`);

    // Get premise detail
    const resGetPremise = await req(`${API_BASE}/f01/premises/${testPremiseId}`, { headers: MANAGEMENT_HEADERS });
    record('F01 Mặt bằng', 'Xem chi tiết mặt bằng', resGetPremise.status === 200 && resGetPremise.data?.data?.code === testPremiseCode, `Mã: ${resGetPremise.data?.data?.code}`);

    // Update premise
    const resUpdatePremise = await req(`${API_BASE}/f01/premises/${testPremiseId}`, {
      method: 'PUT',
      headers: MANAGEMENT_HEADERS,
      body: {
        name: `Mặt bằng Thử nghiệm Đã sửa ${testPremiseCode}`,
        zoneId: zoneId,
        totalArea: 70.0,
        type: 'STORE',
        description: 'Mặt bằng đã cập nhật',
        version: resGetPremise.data?.data?.version,
      }
    });
    record('F01 Mặt bằng', 'Cập nhật thông tin mặt bằng', resUpdatePremise.status === 200, `Status ${resUpdatePremise.status}`);

    // Change premise status
    const resGetVersion = await req(`${API_BASE}/f01/premises/${testPremiseId}`, { headers: MANAGEMENT_HEADERS });
    const resStatus = await req(`${API_BASE}/f01/premises/${testPremiseId}/status`, {
      method: 'PATCH',
      headers: MANAGEMENT_HEADERS,
      body: {
        status: 'RESERVED',
        reason: 'Khách hàng đặt cọc giữ chỗ',
        version: resGetVersion.data?.data?.version,
      }
    });
    record('F01 Mặt bằng', 'Đổi trạng thái mặt bằng sang RESERVED', resStatus.status === 200 && resStatus.data?.data?.currentStatus === 'RESERVED', `Trạng thái mới: ${resStatus.data?.data?.currentStatus}`);

    // Assign map location (PUT)
    const matchingLoc = refData?.locations?.find(l => l.zoneId === zoneId) || targetLoc;
    const locationId = matchingLoc?.id || 'a0000000-0000-4000-8000-000000000006';
    const resGetVersion2 = await req(`${API_BASE}/f01/premises/${testPremiseId}`, { headers: MANAGEMENT_HEADERS });
    const resLoc = await req(`${API_BASE}/f01/premises/${testPremiseId}/location`, {
      method: 'PUT',
      headers: MANAGEMENT_HEADERS,
      body: {
        locationId: locationId,
        reason: 'Gán vị trí theo sơ đồ tầng',
        version: resGetVersion2.data?.data?.version,
      }
    });
    record('F01 Mặt bằng', 'Gắn vị trí mặt bằng trên bản đồ', resLoc.status === 200, `Gắn vị trí thành công`);
  } catch (e) { record('F01 Mặt bằng', 'Quy trình mặt bằng', false, 'Lỗi', e.message); }

  // 5. F01 - Cửa hàng / sạp
  let testStoreId, testStoreCode = `CH-TEST-${Date.now().toString().slice(-4)}${Math.random().toString(36).slice(2, 4)}`;
  try {
    const categoryId = refData?.categories?.[0]?.id || 'a0000000-0000-4000-8000-000000000003';
    const resCreateStore = await req(`${API_BASE}/f01/stores`, {
      method: 'POST',
      headers: MANAGEMENT_HEADERS,
      body: {
        code: testStoreCode,
        name: `Cửa hàng Test ${testStoreCode}`,
        premiseId: testPremiseId,
        categoryId: categoryId,
        area: 50.0,
        operatingHours: '09:00 - 22:00',
        description: 'Cửa hàng kiểm thử tự động',
        status: 'VACANT',
        publicVisible: true,
      }
    });
    testStoreId = resCreateStore.data?.data?.id;
    record('F01 Cửa hàng', 'Tạo cửa hàng mới', resCreateStore.status === 201 && !!testStoreId, `ID: ${testStoreId}, Code: ${testStoreCode}`);

    // Get store detail
    const resGetStore = await req(`${API_BASE}/f01/stores/${testStoreId}`, { headers: MANAGEMENT_HEADERS });
    record('F01 Cửa hàng', 'Xem chi tiết cửa hàng', resGetStore.status === 200 && resGetStore.data?.data?.code === testStoreCode, `Mã: ${resGetStore.data?.data?.code}`);

    // Update store
    const resUpdateStore = await req(`${API_BASE}/f01/stores/${testStoreId}`, {
      method: 'PUT',
      headers: MANAGEMENT_HEADERS,
      body: {
        name: `Cửa hàng Test Đã sửa ${testStoreCode}`,
        premiseId: testPremiseId,
        categoryId: categoryId,
        area: 55.0,
        operatingHours: '08:00 - 22:30',
        description: 'Mô tả đã sửa',
        publicVisible: true,
        version: resGetStore.data?.data?.version,
      }
    });
    record('F01 Cửa hàng', 'Cập nhật cửa hàng', resUpdateStore.status === 200, `Status ${resUpdateStore.status}`);

    // Check store tenants
    const resTenants = await req(`${API_BASE}/f01/stores/${testStoreId}/tenants`, { headers: MANAGEMENT_HEADERS });
    record('F01 Cửa hàng', 'Xem danh sách khách thuê cửa hàng', resTenants.status === 200, `Có ${resTenants.data?.data?.length || 0} khách thuê`);
  } catch (e) { record('F01 Cửa hàng', 'Quy trình cửa hàng', false, 'Lỗi', e.message); }

  // 6. F01 - Khai thác mặt bằng & Lịch sử
  try {
    const resUtil = await req(`${API_BASE}/f01/utilization?page=0&size=10`, { headers: MANAGEMENT_HEADERS });
    record('F01 Tình hình khai thác', 'Báo cáo khai thác mặt bằng', resUtil.status === 200 && !!resUtil.data?.data?.summary, `Tổng: ${resUtil.data?.data?.summary?.total}, Còn trống: ${resUtil.data?.data?.summary?.vacant}`);

    const resHist = await req(`${API_BASE}/f01/histories?page=0&size=10`, { headers: MANAGEMENT_HEADERS });
    record('F01 Lịch sử', 'Tra cứu lịch sử thay đổi', resHist.status === 200 && Array.isArray(resHist.data?.data?.content), `Tìm thấy ${resHist.data?.data?.totalElements} bản ghi lịch sử`);
  } catch (e) { record('F01 Thống kê', 'Khai thác & Lịch sử', false, 'Lỗi', e.message); }

  // 7. F10 - Sự kiện (Event Proposals, Drafts, Approval, QR, Activities, Expenses, Report)
  let testEventId, testEventCode = `SK-TEST-${Date.now().toString().slice(-4)}`;
  try {
    const locationId = refData?.locations?.[0]?.id || 'a0000000-0000-4000-8000-000000000006';
    const now = new Date();
    // Start 1 hour ago, end 30 days from now -> Event is currently ongoing
    const start = new Date(now.getTime() - 3600000).toISOString();
    const end = new Date(now.getTime() + 86400000 * 30).toISOString();

    // Create Draft
    const resDraft = await req(`${API_BASE}/f10/events/drafts`, {
      method: 'POST',
      headers: MARKETING_HEADERS,
      body: {
        code: testEventCode,
        name: `Sự kiện Bản nháp ${testEventCode}`,
        type: 'Ẩm thực',
        locationId: locationId,
        startAt: start,
        endAt: end,
        estimatedBudget: 30000000,
        targetAttendees: 500,
        participatingStoreIds: [],
        publicVisible: true,
      }
    });
    testEventId = resDraft.data?.data?.id;
    record('F10 Sự kiện', 'Tạo bản nháp sự kiện', resDraft.status === 201 && !!testEventId, `ID: ${testEventId}, Code: ${testEventCode}`);

    // Update Draft
    const resGetEvent = await req(`${API_BASE}/f10/events/${testEventId}`, { headers: MARKETING_HEADERS });
    const resUpdateDraft = await req(`${API_BASE}/f10/events/${testEventId}/draft?version=${resGetEvent.data?.data?.version}`, {
      method: 'PUT',
      headers: MARKETING_HEADERS,
      body: {
        code: testEventCode,
        name: `Sự kiện Bản nháp Cập nhật ${testEventCode}`,
        type: 'Ca nhạc & Ẩm thực',
        locationId: locationId,
        startAt: start,
        endAt: end,
        estimatedBudget: 35000000,
        targetAttendees: 600,
        participatingStoreIds: [],
        publicVisible: true,
      }
    });
    record('F10 Sự kiện', 'Cập nhật bản nháp sự kiện', resUpdateDraft.status === 200, `Status ${resUpdateDraft.status}`);

    // Submit Draft
    const resGetEvent2 = await req(`${API_BASE}/f10/events/${testEventId}`, { headers: MARKETING_HEADERS });
    const resSubmit = await req(`${API_BASE}/f10/events/${testEventId}/submission?version=${resGetEvent2.data?.data?.version}`, {
      method: 'POST',
      headers: MARKETING_HEADERS,
    });
    record('F10 Sự kiện', 'Gửi bản nháp để duyệt', resSubmit.status === 200 && resSubmit.data?.data?.status === 'PENDING_APPROVAL', `Trạng thái: ${resSubmit.data?.data?.status}`);

    // Approve Event
    const resGetEvent3 = await req(`${API_BASE}/f10/events/${testEventId}`, { headers: DIRECTOR_HEADERS });
    const resApprove = await req(`${API_BASE}/f10/events/${testEventId}/approval`, {
      method: 'PUT',
      headers: DIRECTOR_HEADERS,
      body: {
        action: 'APPROVE',
        approvedBudget: 32000000,
        note: 'Duyệt ngân sách 32 triệu',
        version: resGetEvent3.data?.data?.version,
      }
    });
    record('F10 Sự kiện', 'Duyệt sự kiện (Cấp quản lý/Giám đốc)', resApprove.status === 200 && resApprove.data?.data?.status === 'APPROVED', `Trạng thái: ${resApprove.data?.data?.status}, Ngân sách duyệt: ${resApprove.data?.data?.approvedBudget}`);

    // Add Activity Schedule (wrapped in activities array, dynamic hours to avoid conflict)
    const staffId = refData?.staff?.[0]?.id || '11111111-1111-1111-1111-111111111111';
    const offsetHours = 30 + Math.floor(Math.random() * 300);
    const actStart = new Date(now.getTime() + 3600000 * offsetHours).toISOString();
    const actEnd = new Date(now.getTime() + 3600000 * (offsetHours + 1)).toISOString();
    const resActivity = await req(`${API_BASE}/f10/events/${testEventId}/activities`, {
      method: 'POST',
      headers: MARKETING_HEADERS,
      body: {
        activities: [{
          name: `Hoạt động ${testEventCode}`,
          locationId: locationId,
          startAt: actStart,
          endAt: actEnd,
          personInCharge: staffId,
          description: 'Khai mạc và văn nghệ chào mừng',
        }]
      }
    });
    record('F10 Sự kiện', 'Thêm hoạt động vào lịch sự kiện', resActivity.status === 201, `Thêm thành công ${resActivity.data?.data?.count || 1} hoạt động`);

    // Generate QR check-in
    let qrToken;
    const resQr = await req(`${API_BASE}/f10/events/${testEventId}/qr-code`, {
      method: 'POST',
      headers: MARKETING_HEADERS,
    });
    qrToken = resQr.data?.data?.checkInUrl?.split('token=')?.[1]?.split('&')?.[0];
    record('F10 Sự kiện', 'Tạo mã QR check-in sự kiện', resQr.status === 200 && !!resQr.data?.data?.checkInUrl, `CheckInUrl: ${resQr.data?.data?.checkInUrl}`);

    // Customer Check-in
    const customerId = refData?.customers?.[0]?.id || '33333333-3333-3333-3333-333333333333';
    const resCheckIn = await req(`${API_BASE}/f10/events/${testEventId}/check-ins`, {
      method: 'POST',
      headers: CUSTOMER_HEADERS,
      body: {
        qrToken: qrToken,
      }
    });
    record('F10 Sự kiện', 'Khách hàng check-in sự kiện qua QR Token', resCheckIn.status === 201 && resCheckIn.data?.data?.duplicate === false, `CheckInId: ${resCheckIn.data?.data?.checkInId}`);

    // Record Event Expense
    const resExpense = await req(`${API_BASE}/f10/events/${testEventId}/expenses`, {
      method: 'POST',
      headers: MARKETING_HEADERS,
      body: {
        supplierName: 'Công ty Âm thanh Ánh sáng Test',
        invoiceNumber: 'HD-TEST-001',
        amount: 8500000,
        incurredAt: new Date().toISOString(),
        description: 'Chi phí thuê sân khấu',
      }
    });
    record('F10 Sự kiện', 'Ghi chi phí tổ chức sự kiện', resExpense.status === 201, `Số tiền: ${resExpense.data?.data?.amount} ₫`);

    // Event Report
    const resReport = await req(`${API_BASE}/f10/events/${testEventId}/report`, { headers: MANAGEMENT_HEADERS });
    record('F10 Sự kiện', 'Xem báo cáo tổng kết sự kiện', resReport.status === 200 && resReport.data?.data?.actualAttendees >= 1, `Số khách check-in: ${resReport.data?.data?.actualAttendees}, Tổng chi phí: ${resReport.data?.data?.totalActualExpense} ₫, ROI: ${resReport.data?.data?.roiPercentage}%`);
  } catch (e) { record('F10 Sự kiện', 'Quy trình sự kiện', false, 'Lỗi', e.message); }

  // 8. F10 - Khuyến mãi (Promotions: DISCOUNT, VOUCHER_GIVEAWAY, POINT_ACCUMULATION, Realtime, Application)
  let testPromoId, testPromoCode = `KM-TEST-${Date.now().toString().slice(-4)}`;
  try {
    const now = new Date();
    const start = new Date(now.getTime() - 86400000).toISOString();
    const end = new Date(now.getTime() + 86400000 * 10).toISOString();

    const resPromo = await req(`${API_BASE}/f10/promotions`, {
      method: 'POST',
      headers: MANAGEMENT_HEADERS,
      body: {
        code: testPromoCode,
        name: `Khuyến mãi Mùa Hè ${testPromoCode}`,
        type: 'DISCOUNT',
        startAt: start,
        endAt: end,
        minimumInvoiceAmount: 100000,
        participatingStoreIds: [],
        terms: 'Áp dụng cho mọi khách hàng',
        targetTiers: ['STANDARD', 'GOLD', 'PLATINUM'],
        publicVisible: true,
        discount: {
          discountRatePercent: 15,
          maximumDiscount: 50000,
        }
      }
    });
    testPromoId = resPromo.data?.data?.id;
    record('F10 Khuyến mãi', 'Tạo chương trình khuyến mãi (Giảm giá %)', resPromo.status === 201 && !!testPromoId, `ID: ${testPromoId}, Code: ${testPromoCode}`);

    // Realtime metrics
    const resRealtime = await req(`${API_BASE}/f10/promotions/${testPromoId}/realtime`, { headers: MANAGEMENT_HEADERS });
    record('F10 Khuyến mãi', 'Xem số liệu khuyến mãi realtime', resRealtime.status === 200, `Tổng chiết khấu: ${resRealtime.data?.data?.totalDiscountGranted} ₫`);

    // Apply promotion to invoice
    const invoiceId = refData?.invoices?.[0]?.id || 'a0000000-0000-4000-8000-000000000020';
    const customerId = refData?.customers?.[0]?.id || '33333333-3333-3333-3333-333333333333';
    const resApply = await req(`${API_BASE}/f10/promotions/${testPromoId}/applications`, {
      method: 'POST',
      headers: OPERATIONS_HEADERS,
      body: {
        invoiceId: invoiceId,
        customerId: customerId,
        idempotencyKey: `TX-APPLY-${Date.now()}`,
      }
    });
    record('F10 Khuyến mãi', 'Áp dụng khuyến mãi vào hóa đơn', resApply.status === 201, `Tiền giảm: ${resApply.data?.data?.discountAmount} ₫`);
  } catch (e) { record('F10 Khuyến mãi', 'Quy trình khuyến mãi', false, 'Lỗi', e.message); }

  // 9. F10 - Voucher (Create Template, Issue to Customer, Redeem Voucher)
  let testVoucherId, testVoucherCode = `VC${Date.now().toString().slice(-6)}`;
  let testInstanceId;
  try {
    const now = new Date();
    const start = new Date(now.getTime() - 86400000).toISOString();
    const end = new Date(now.getTime() + 86400000 * 30).toISOString();

    // Create Voucher Template
    const resVoucher = await req(`${API_BASE}/f10/vouchers`, {
      method: 'POST',
      headers: MANAGEMENT_HEADERS,
      body: {
        code: testVoucherCode,
        name: `Voucher Test ${testVoucherCode}`,
        discountType: 'PERCENTAGE',
        value: 20,
        maximumDiscount: 100000,
        minimumInvoiceAmount: 200000,
        issuedLimit: 500,
        perCustomerLimit: 2,
        validFrom: start,
        expiresAt: end,
        participatingStoreIds: [],
      }
    });
    testVoucherId = resVoucher.data?.data?.id;
    record('F10 Voucher', 'Tạo mẫu voucher (Giảm 20% tối đa 100K)', resVoucher.status === 201 && !!testVoucherId, `ID: ${testVoucherId}, Code: ${testVoucherCode}`);

    // Issue voucher to customer
    const customerId = refData?.customers?.[0]?.id || '33333333-3333-3333-3333-333333333333';
    const resIssue = await req(`${API_BASE}/f10/vouchers/${testVoucherId}/issues`, {
      method: 'POST',
      headers: MARKETING_HEADERS,
      body: {
        customerId: customerId,
        issueReference: `REF-ISSUE-${Date.now()}`,
      }
    });
    testInstanceId = resIssue.data?.data?.id;
    record('F10 Voucher', 'Phát voucher cho khách hàng', resIssue.status === 201 && !!testInstanceId, `InstanceId: ${testInstanceId}, Duplicate: ${resIssue.data?.data?.duplicate}`);

    // Redeem voucher
    const invoiceId = refData?.invoices?.[0]?.id || 'a0000000-0000-4000-8000-000000000020';
    const resRedeem = await req(`${API_BASE}/f10/voucher-instances/${testInstanceId}/redemptions`, {
      method: 'POST',
      headers: OPERATIONS_HEADERS,
      body: {
        invoiceId: invoiceId,
        idempotencyKey: `TX-RED-${Date.now()}`,
      }
    });
    record('F10 Voucher', 'Sử dụng / đổi voucher của khách hàng', resRedeem.status === 200, `Trạng thái: ${resRedeem.data?.data?.status}`);
  } catch (e) { record('F10 Voucher', 'Quy trình voucher', false, 'Lỗi', e.message); }

  console.log('\n=== TỔNG KẾT KẾT QUẢ KIỂM THỬ ===');
  const total = results.length;
  const passed = results.filter(r => r.success).length;
  const failed = total - passed;
  console.log(`Tổng số: ${total} | Thành công: ${passed} | Thất bại: ${failed}`);
}

runTests();
