(function (root) {
  'use strict';
  const clean = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  const money = value => new Intl.NumberFormat('vi-VN').format(value);
  const partsVN = (now = new Date()) => Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now).map(p => [p.type, p.value]));
  function todayVN(now = new Date()) { const p = partsVN(now); return `${p.year}-${p.month}-${p.day}`; }
  function addDays(date, days) { const d = new Date(`${date}T12:00:00+07:00`); d.setUTCDate(d.getUTCDate() + days); return todayVN(d); }
  function nextTime(now = new Date()) { const future = new Date(Math.ceil((now.getTime() + 30 * 60000) / 900000) * 900000); const p = partsVN(future); return { date: todayVN(future), time: `${p.hour}:${p.minute}` }; }
  function dateText(date) { if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return ''; return date.split('-').reverse().join('/'); }
  function validDate(date) { if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return false; const d = new Date(date + 'T12:00:00+07:00'); return !Number.isNaN(d.getTime()) && todayVN(d) === date; }
  function estimate(km, vehicle) {
    const d = Number(km), car = Number(vehicle);
    if (!Number.isFinite(d) || d < 1 || d > 2000) return { error: 'Nhập quãng đường từ 1 đến 2.000 km.' };
    if (![4, 7, 16].includes(car)) return { error: 'Loại xe không hợp lệ.' };
    if (car === 16) return { contact: true, label: 'Liên hệ báo giá', explanation: 'Xe 16 chỗ được tư vấn giá theo từng chuyến.' };
    const high = car === 4 ? 14500 : 16500, low = car === 4 ? 12500 : 14500;
    if (d === 30) return { min: d * low, max: d * high, label: `${money(d * low)}–${money(d * high)}`, explanation: 'Mốc 30 km cần được tổng đài xác nhận cách tính.' };
    const rate = d < 30 ? high : low;
    return { total: Math.round(d * rate), rate, label: money(Math.round(d * rate)), explanation: `${money(d)} km × ${money(rate)}đ/km` };
  }
  function recommendedVehicle(passengers, luggage = 0) {
    if (!Number.isInteger(passengers) || passengers < 1 || passengers > 15) return null;
    if (passengers <= 3 && luggage <= 2) return '4';
    if (passengers <= 6 && luggage <= 5) return '7';
    return '16';
  }
  const places = [
    { value: 'Sân bay Tân Sơn Nhất', re: /(?:san bay\s*)?tan son nhat|\btsn\b|\bsan bay\b/g },
    { value: 'Cai Lậy', re: /cai lay/g }, { value: 'Cái Bè', re: /cai be/g },
    { value: 'Mỹ Tho', re: /my tho/g }, { value: 'Cần Thơ', re: /can tho/g },
    { value: 'TP. Hồ Chí Minh', re: /tp\.?\s*(?:ho chi minh|hcm)|ho chi minh|sai gon|\bhcm\b/g },
    { value: 'Vĩnh Long', re: /vinh long/g }, { value: 'Bến Tre', re: /ben tre/g },
    { value: 'Tân Phước', re: /tan phuoc/g }, { value: 'Châu Thành', re: /chau thanh/g },
    { value: 'Chợ Gạo', re: /cho gao/g }, { value: 'Gò Công', re: /go cong/g },
    { value: 'Vũng Tàu', re: /vung tau/g }, { value: 'Đà Lạt', re: /da lat/g }
  ];
  function parseTrip(text, now = new Date()) {
    if (typeof text !== 'string' || text.trim().length < 4 || text.length > 600) return { error: 'Bạn nhập một lịch trình ngắn, tối đa 600 ký tự nhé.' };
    const s = clean(text), result = { warnings: [] }, matches = [];
    for (const place of places) { const re = new RegExp(place.re.source, 'g'); for (const m of s.matchAll(re)) matches.push({ value: place.value, index: m.index, end: m.index + m[0].length }); }
    matches.sort((a, b) => a.index - b.index);
    const unique = matches.filter((m, i) => i === 0 || m.value !== matches[i - 1].value);
    if (unique.length >= 2) {
      const from = unique.find(m => /(?:\btu|\bdon (?:o|tai))\s*$/.test(s.slice(Math.max(0, m.index - 18), m.index)));
      const to = unique.find(m => /(?:\bdi|\bden|\bve|\btoi)\s*$/.test(s.slice(Math.max(0, m.index - 15), m.index)) && m !== from);
      result.pickup = (from || unique[0]).value;
      result.destination = (to || unique.find(m => m.value !== result.pickup))?.value;
      if (unique.length > 2) result.warnings.push('Có nhiều địa điểm trong câu. Bạn kiểm tra điểm đón, điểm đến và bổ sung điểm dừng vào ghi chú.');
    } else if (unique.length === 1) {
      const m = unique[0];
      if (/(?:\btu|\bdon (?:o|tai))\s*$/.test(s.slice(Math.max(0, m.index - 18), m.index))) result.pickup = m.value;
      else result.destination = m.value;
    }
    if (/\bngay kia\b|\bngay mot\b|\bmai mot\b/.test(s) || /\bmốt\b/i.test(text)) result.date = addDays(todayVN(now), 2);
    else if (/\bmai\b/.test(s)) result.date = addDays(todayVN(now), 1);
    else if (/\bhom nay\b|\btoi nay\b|\bchieu nay\b|\bsang nay\b/.test(s)) result.date = todayVN(now);
    const dm = s.match(/(?:\bngay\s*)?(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{4}))?/);
    if (dm) {
      const y = dm[3] || todayVN(now).slice(0, 4), date = `${y}-${dm[2].padStart(2, '0')}-${dm[1].padStart(2, '0')}`;
      if (validDate(date)) result.date = date;
      else result.warnings.push('Ngày bạn nhập không hợp lệ. Hãy chọn lại ngày trên form.');
    }
    const hm = s.match(/\b(\d{1,2})\s*(?:h|gio|:)\s*(\d{1,2})?\s*(?:phut)?(?:\s*(sang|chieu|toi|dem|trua))?/);
    if (hm) { let hour = Number(hm[1]), minute = Number(hm[2] || 0); const period = hm[3] || (/\bchieu|\btoi\b/.test(s) ? 'chieu' : ''); if (/chieu|toi/.test(period) && hour < 12) hour += 12; if (hour < 24 && minute < 60) result.time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`; else result.warnings.push('Giờ chưa hợp lệ. Bạn chọn lại giờ đón giúp mình.'); }
    const pax = s.match(/\b(\d{1,2})\s*(?:nguoi|khach|hanh khach)\b/), bags = s.match(/\b(\d{1,2})\s*(?:vali|va li|va ly)\b/), car = s.match(/\b(?:xe\s*)?(4|7|16)\s*cho\b/);
    if (bags) result.luggage = Number(bags[1]);
    if (pax) { result.passengers = Number(pax[1]); if (result.passengers < 1 || result.passengers > 15) result.warnings.push('Nhóm trên 15 người cần tổng đài tư vấn số lượng xe.'); else result.vehicle = recommendedVehicle(result.passengers, result.luggage || 0); }
    if (car) result.vehicle = car[1];
    if (/khu hoi|hai chieu|2 chieu|di ve/.test(s)) { result.trip = 'roundtrip'; result.warnings.push('Với chuyến khứ hồi, bạn chọn thêm ngày và giờ về trên form.'); }
    else if (/mot chieu|1 chieu/.test(s)) result.trip = 'oneway';
    if (result.date && result.date < todayVN(now)) result.warnings.push('Ngày đã qua. Bạn chọn lại ngày trước khi đặt.');
    if (!result.pickup) result.warnings.push('Bạn bổ sung địa chỉ đón cụ thể trên form.');
    if (!result.destination) result.warnings.push('Chưa nhận diện được điểm đến. Bạn nhập trực tiếp trên form.');
    if (!result.time) result.warnings.push('Bạn chọn thêm giờ đón.');
    if (!result.date) result.warnings.push('Bạn chọn thêm ngày đi.');
    if (!unique.length && !hm && !result.date && !pax && !car) return { error: 'Mình chưa nhận diện được lịch trình. Thử: “Mai 6h từ Cai Lậy đi Tân Sơn Nhất, 4 người”, hoặc điền trực tiếp vào form đặt xe.' };
    return result;
  }
  function validateTrip(trip, now = new Date()) {
    if (!trip || typeof trip.pickup !== 'string' || typeof trip.destination !== 'string' || trip.pickup.trim().length < 2 || trip.destination.trim().length < 2) return 'Bạn nhập đầy đủ điểm đón và điểm đến.';
    if (trip.pickup.length > 180 || trip.destination.length > 180) return 'Địa chỉ tối đa 180 ký tự.';
    if (clean(trip.pickup.trim()) === clean(trip.destination.trim())) return 'Điểm đón và điểm đến cần khác nhau.';
    if (!validDate(trip.date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(trip.time || '')) return 'Bạn chọn ngày và giờ đón hợp lệ.';
    const start = new Date(`${trip.date}T${trip.time}:00+07:00`);
    if (start.getTime() < now.getTime()) return 'Giờ đón đã qua. Bạn chọn thời gian khác hoặc gọi hotline để đặt xe ngay.';
    if (!["4", "7", "16"].includes(String(trip.vehicle))) return 'Bạn chọn loại xe phù hợp.';
    if (!['oneway', 'roundtrip'].includes(trip.trip)) return 'Loại hành trình không hợp lệ.';
    if (trip.trip === 'roundtrip') {
      if (!validDate(trip.returnDate) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(trip.returnTime || '')) return 'Bạn chọn ngày và giờ về cho chuyến khứ hồi.';
      if (new Date(`${trip.returnDate}T${trip.returnTime}:00+07:00`) <= start) return 'Thời gian về phải sau thời gian đón.';
    }
    return '';
  }
  function validPhone(phone) { return /^(?:0|\+84|84)(?:3|5|7|8|9)\d{8}$/.test(String(phone).replace(/[\s().-]/g, '')); }
  function bookingMessage(trip, contact) {
    return ['YÊU CẦU ĐẶT XE – TAXI CAI LẬY', `Khách: ${contact.name}`, `Điện thoại: ${contact.phone}`, `Điểm đón: ${trip.pickup}`, `Điểm đến: ${trip.destination}`, `Đón lúc: ${trip.time}, ngày ${dateText(trip.date)}`, `Hành trình: ${trip.trip === 'roundtrip' ? 'Khứ hồi' : 'Một chiều'}`, ...(trip.trip === 'roundtrip' ? [`Về lúc: ${trip.returnTime}, ngày ${dateText(trip.returnDate)}`] : []), `Loại xe đề nghị: ${trip.vehicle} chỗ`, `Hành khách: ${contact.passengers}; vali lớn: ${contact.luggage}`, ...(contact.note ? [`Ghi chú: ${contact.note}`] : []), '', 'Nhờ tổng đài kiểm tra xe và báo giá trọn chuyến giúp tôi. Chuyến đi chờ tổng đài xác nhận.'].join('\n');
  }
  const api = { clean, money, todayVN, addDays, nextTime, dateText, validDate, estimate, recommendedVehicle, parseTrip, validateTrip, validPhone, bookingMessage };
  root.TaxiEngine = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
