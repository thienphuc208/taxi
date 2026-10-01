'use strict';
(function () {
  const paths = {
    car: '<path d="m5 17-1 3m15-3 1 3M5 7l2-4h10l2 4M4 7h16l2 5v5H2v-5zM6 12h2m8 0h2"/><circle cx="6" cy="17" r="1"/><circle cx="18" cy="17" r="1"/>',
    suv: '<path d="M3 8h17l2 5v5H2V9l1-1ZM5 8l2-5h10l3 5M11 3v5M5 13h2m10 0h2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    bus: '<rect x="4" y="2" width="16" height="18" rx="3"/><path d="M4 11h16M12 3v8M7 20v2m10-2v2M7 15h1m8 0h1"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    locate: '<circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L9 10.9a16 16 0 0 0 4.1 4.1l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
    shield: '<path d="M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6Z"/><path d="m8 12 3 3 5-6"/>',
    receipt: '<path d="M4 3l2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2v18l-2-2-2 2-2-2-2 2-2-2-2 2-2-2-2 2V3Z"/><path d="M8 9h8M8 13h8m-8 4h4"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    'arrow-right': '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    'arrow-up-right': '<path d="M6 18 18 6M6 6h12v12"/>',
    swap: '<path d="M8 3v17m-4-4 4 4 4-4m4 5V4m-4 4 4-4 4 4"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="m6 6 12 12M6 18 18 6"/>',
    plus: '<path d="M5 12h14m-7-7v14"/>',
    route: '<circle cx="6" cy="5" r="3"/><circle cx="18" cy="19" r="3"/><path d="M6 8v9a3 3 0 0 0 3 3h6M18 16V7a3 3 0 0 0-3-3h-2"/>',
    sparkles: '<path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3ZM20 2v4m-2-2h4M3 18v4m-2-2h4"/>',
    plane: '<path d="m22 2-7 20-4-9-9-4L22 2ZM22 2 11 13"/>',
    city: '<path d="M3 22V6h8v16M11 10h10v12M1 22h22M6 10h2m-2 4h2m-2 4h2m6-4h3m-3 4h3M7 2v4"/>',
    palm: '<path d="M12 22V9M7 22h10M12 9C8 3 4 4 2 9c4-2 6-1 10 0ZM12 9c0-7 5-9 8-5-4 0-6 2-8 5ZM12 9c5-5 9-2 10 2-4-2-6-2-10-2Z"/>',
    calculator: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 10h2m4 0h2m-8 4h2m4 0h2m-8 4h2m4 0h2"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
    mic: '<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/>'
  };
  document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${paths[el.dataset.icon] || ''}</svg>`; });
  const $ = id => document.getElementById(id), E = window.TaxiEngine;
  const menuButton = document.querySelector('.menu-toggle');
  menuButton?.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu'); $('main-nav').classList.toggle('open', open); });
  document.querySelectorAll('#main-nav a').forEach(a => a.addEventListener('click', () => { $('main-nav').classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false'); }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { $('main-nav')?.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false'); } });
  if ($('year')) $('year').textContent = new Date().getFullYear();
  if (!$('booking-form') || !E) return;
  let currentTrip = null, lastParsed = null, toastTimer;
  function toast(message) { $('toast').textContent = message; $('toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { $('toast').hidden = true; }, 5000); }
  function selected(name) { return document.querySelector(`input[name="${name}"]:checked`)?.value; }
  function choose(name, value) { const el = document.querySelector(`input[name="${name}"][value="${value}"]`); if (el) { el.checked = true; el.dispatchEvent(new Event('change', { bubbles: true })); } }
  function readTrip() { return { pickup: $('pickup').value.trim(), destination: $('destination').value.trim(), date: $('departure-date').value, time: $('departure-time').value, trip: selected('trip'), vehicle: selected('vehicle'), returnDate: $('return-date').value, returnTime: $('return-time').value }; }
  function scrollBooking(focusId = 'destination') { $('dat-xe').scrollIntoView({ behavior: 'smooth', block: 'start' }); $(focusId).focus({ preventScroll: true }); }
  function syncReturn() { const enabled = selected('trip') === 'roundtrip'; $('return-fields').hidden = !enabled; $('return-date').required = enabled; $('return-time').required = enabled; $('return-date').min = $('departure-date').value || E.todayVN(); }
  const initial = E.nextTime(); $('departure-date').value = initial.date; $('departure-time').value = initial.time; $('departure-date').min = E.todayVN(); $('return-date').min = initial.date;
  $('departure-date').addEventListener('change', syncReturn); document.querySelectorAll('[name="trip"]').forEach(el => el.addEventListener('change', syncReturn));
  $('swap').addEventListener('click', () => { const old = $('pickup').value; $('pickup').value = $('destination').value; $('destination').value = old; toast('Đã đổi điểm đón và điểm đến.'); });
  $('locate').addEventListener('click', () => {
    if (!navigator.geolocation) { $('location-status').textContent = 'Trình duyệt chưa hỗ trợ vị trí. Bạn nhập địa chỉ đón nhé.'; return; }
    const button = $('locate'); button.disabled = true; $('location-status').textContent = 'Đang xin quyền lấy vị trí…';
    navigator.geolocation.getCurrentPosition(position => { const { latitude, longitude } = position.coords; $('pickup').value = `Vị trí GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`; $('location-status').textContent = 'Đã thêm tọa độ. Bạn bổ sung tên đường hoặc điểm hẹn trong ghi chú để tài xế dễ tìm.'; button.disabled = false; }, error => { $('location-status').textContent = error.code === 1 ? 'Chưa được cấp quyền vị trí. Bạn có thể nhập địa chỉ bằng tay.' : 'Chưa lấy được vị trí. Bạn nhập địa chỉ đón nhé.'; button.disabled = false; }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 });
  });
  document.querySelectorAll('[data-destination]').forEach(el => el.addEventListener('click', () => { $('pickup').value = 'Cai Lậy'; $('destination').value = el.dataset.destination; scrollBooking('departure-date'); toast('Đã chọn tuyến. Bạn bổ sung địa chỉ và giờ đón.'); }));
  const params = new URLSearchParams(location.search);
  if (params.get('to')) $('destination').value = params.get('to').slice(0, 180);
  function openAssistant() { $('tro-ly').scrollIntoView({ behavior: 'smooth', block: 'center' }); $('trip-prompt').focus({ preventScroll: true }); }
  $('open-assistant').addEventListener('click', openAssistant);
  const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  function renderParsed(parsed) {
    const result = $('assistant-result'); result.hidden = false; result.replaceChildren();
    if (parsed.error) { const p = document.createElement('p'); p.textContent = parsed.error; result.append(p); return; }
    const h = document.createElement('h3'); h.textContent = 'Mình đã nhận diện được:'; result.append(h);
    const grid = document.createElement('div'); grid.className = 'parsed-grid';
    const fields = [['Điểm đón', parsed.pickup], ['Điểm đến', parsed.destination], ['Ngày đi', parsed.date && E.dateText(parsed.date)], ['Giờ đón', parsed.time], ['Gợi ý xe', parsed.vehicle && `Xe ${parsed.vehicle} chỗ`], ['Hành khách', parsed.passengers], ['Hành trình', parsed.trip === 'roundtrip' ? 'Khứ hồi' : parsed.trip === 'oneway' ? 'Một chiều' : '']];
    for (const [label, value] of fields) if (value) { const chip = document.createElement('div'); chip.className = 'parsed-chip'; const small = document.createElement('small'); small.textContent = label; chip.append(small, document.createTextNode(String(value))); grid.append(chip); }
    result.append(grid);
    const notes = document.createElement('p'); notes.textContent = [...parsed.warnings, ...(parsed.vehicle ? ['Loại xe chỉ là gợi ý; cần xác nhận số khách và hành lý với tổng đài.'] : [])].join(' '); result.append(notes);
    const apply = document.createElement('button'); apply.type = 'button'; apply.className = 'button dark'; apply.textContent = 'Áp dụng vào form đặt xe'; apply.addEventListener('click', () => { applyParsed(parsed); scrollBooking('departure-date'); toast('Đã điền phần nhận diện được. Bạn kiểm tra lại ngày, giờ và địa chỉ.'); }); result.append(apply);
  }
  function applyParsed(parsed) {
    for (const [key, id] of [['pickup', 'pickup'], ['destination', 'destination'], ['date', 'departure-date'], ['time', 'departure-time']]) if (parsed[key]) $(id).value = parsed[key];
    if (parsed.vehicle) choose('vehicle', parsed.vehicle); if (parsed.trip) choose('trip', parsed.trip);
    if (parsed.passengers >= 1 && parsed.passengers <= 15) $('passengers').value = parsed.passengers;
    if (parsed.luggage !== undefined && parsed.luggage <= 20) $('luggage').value = parsed.luggage;
    syncReturn();
  }
  function runAssistant() { lastParsed = E.parseTrip($('trip-prompt').value); renderParsed(lastParsed); return lastParsed; }
  $('assistant-form').addEventListener('submit', event => { event.preventDefault(); runAssistant(); });
  document.querySelectorAll('[data-prompt]').forEach(button => button.addEventListener('click', () => { $('trip-prompt').value = button.dataset.prompt; runAssistant(); }));
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (Recognition) {
    $('voice').hidden = false; let recognition;
    $('voice').addEventListener('click', () => { if (recognition) { recognition.stop(); return; } recognition = new Recognition(); recognition.lang = 'vi-VN'; recognition.interimResults = false; recognition.maxAlternatives = 1; $('voice').setAttribute('aria-pressed', 'true'); $('voice').title = 'Đang nghe, bấm để dừng'; toast('Đang nghe lịch trình. Trình duyệt có thể dùng dịch vụ nhận dạng giọng nói.'); recognition.onresult = event => { $('trip-prompt').value = event.results[0][0].transcript.slice(0, 600); runAssistant(); }; recognition.onerror = event => { toast(event.error === 'not-allowed' ? 'Chưa được cấp quyền micro. Bạn nhập lịch trình bằng bàn phím nhé.' : 'Chưa nghe rõ. Bạn thử lại hoặc nhập lịch trình.'); }; recognition.onend = () => { recognition = null; $('voice').setAttribute('aria-pressed', 'false'); $('voice').title = 'Nhập lịch trình bằng giọng nói'; }; try { recognition.start(); } catch { recognition = null; $('voice').setAttribute('aria-pressed', 'false'); toast('Chưa bật được micro trên trình duyệt này.'); } });
  }
  function updateFare() { const result = E.estimate($('fare-km').value, $('fare-car').value); $('fare-total').replaceChildren(); if (result.error || result.contact) { $('fare-total').textContent = result.error ? '—' : 'Liên hệ'; $('fare-explanation').textContent = result.error || result.explanation; } else { $('fare-total').append(document.createTextNode(result.label)); const unit = document.createElement('small'); unit.textContent = 'đ'; $('fare-total').append(unit); $('fare-explanation').textContent = result.explanation; } return result; }
  $('fare-km').addEventListener('input', updateFare); $('fare-car').addEventListener('change', updateFare);
  $('fare-form').addEventListener('submit', event => { event.preventDefault(); const result = updateFare(); if (result.error) return; choose('vehicle', $('fare-car').value); scrollBooking(); toast(`Đã chọn xe ${$('fare-car').value} chỗ. Cước vẫn cần tổng đài xác nhận.`); });
  function showSummary(trip) { $('booking-summary').innerHTML = `<div class="summary-line"><span>Điểm đón</span><b>${escapeHTML(trip.pickup)}</b></div><div class="summary-line"><span>Điểm đến</span><b>${escapeHTML(trip.destination)}</b></div><div class="summary-line"><span>Giờ đón</span><b>${escapeHTML(trip.time)} · ${E.dateText(trip.date)}</b></div>${trip.trip === 'roundtrip' ? `<div class="summary-line"><span>Giờ về</span><b>${escapeHTML(trip.returnTime)} · ${E.dateText(trip.returnDate)}</b></div>` : ''}<small>Xe ${escapeHTML(trip.vehicle)} chỗ · ${trip.trip === 'roundtrip' ? 'Khứ hồi' : 'Một chiều'} · Chờ báo giá</small>`; }
  function capacityWarning() { const pax = Number($('passengers').value), luggage = Number($('luggage').value), car = currentTrip?.vehicle || selected('vehicle'), capacity = { '4': 3, '7': 6, '16': 15 }[car]; const recommended = E.recommendedVehicle(pax, luggage); let text = ''; if (pax > capacity) text = `Xe ${car} chỗ có thể không đủ cho ${pax} hành khách cùng tài xế. Hãy quay lại chọn xe lớn hơn.`; else if (recommended && Number(recommended) > Number(car)) text = `Với ${luggage} vali lớn, bạn nên cân nhắc xe ${recommended} chỗ. Tổng đài sẽ tư vấn lại không gian hành lý.`; $('capacity-note').textContent = text; return pax <= capacity; }
  $('passengers').addEventListener('input', capacityWarning); $('luggage').addEventListener('input', capacityWarning);
  $('booking-form').addEventListener('submit', event => { event.preventDefault(); const trip = readTrip(), error = E.validateTrip(trip); $('booking-error').textContent = error; if (error) return; currentTrip = trip; showSummary(trip); $('contact-form').hidden = false; $('handoff-panel').hidden = true; $('contact-error').textContent = ''; $('consent').checked = false; capacityWarning(); $('booking-dialog').showModal(); });
  $('booking-dialog').querySelector('.dialog-close').addEventListener('click', () => $('booking-dialog').close());
  $('booking-dialog').addEventListener('click', event => { if (event.target !== $('booking-dialog')) return; const r = $('booking-dialog').getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) $('booking-dialog').close(); });
  $('contact-form').addEventListener('submit', event => {
    event.preventDefault(); const name = $('customer-name').value.trim(), phone = $('customer-phone').value.trim(), passengers = Number($('passengers').value), luggage = Number($('luggage').value); let error = '';
    if (name.length < 2) error = 'Bạn nhập tên ít nhất 2 ký tự.';
    else if (!E.validPhone(phone)) error = 'Bạn kiểm tra số di động Việt Nam, ví dụ 0939 227 015.';
    else if (!Number.isInteger(passengers) || passengers < 1 || passengers > 15 || !Number.isInteger(luggage) || luggage < 0 || luggage > 20) error = 'Số khách hoặc số vali chưa hợp lệ.';
    else if (!capacityWarning()) error = 'Loại xe chưa phù hợp với số khách. Bạn đóng cửa sổ này để chọn xe lớn hơn.';
    else if (!$('consent').checked) error = 'Bạn cần đồng ý trước khi chuẩn bị thông tin liên hệ.';
    else error = E.validateTrip(currentTrip);
    $('contact-error').textContent = error; if (error) return;
    const message = E.bookingMessage(currentTrip, { name, phone, passengers, luggage, note: $('customer-note').value.trim() }); $('handoff-text').value = message; $('contact-form').hidden = true; $('handoff-panel').hidden = false; $('copy-status').textContent = ''; $('booking-dialog').scrollTop = 0; $('copy-booking').focus({ preventScroll: true });
  });
  $('copy-booking').addEventListener('click', async () => { try { if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable'); await navigator.clipboard.writeText($('handoff-text').value); $('copy-status').textContent = 'Đã sao chép. Mở Zalo, dán nội dung và bấm gửi.'; } catch { $('handoff-text').focus(); $('handoff-text').select(); $('copy-status').textContent = 'Nội dung đã được chọn. Bạn nhấn Sao chép hoặc Ctrl+C, rồi dán vào Zalo.'; } });
  $('edit-contact').addEventListener('click', () => { $('contact-form').hidden = false; $('handoff-panel').hidden = true; $('customer-name').focus(); });
  updateFare();
  const context = document.modelContext;
  if (context?.registerTool) {
    const lifecycle = new AbortController();
    window.addEventListener('pagehide', () => lifecycle.abort(), { once: true });
    const tool = { name: 'stage_taxi_trip', title: 'Chuẩn bị chuyến Taxi Cai Lậy', description: 'Nhận diện lịch trình tiếng Việt và điền phần nhận diện được vào form đang hiển thị. Không gửi yêu cầu, không xác nhận hoặc đặt xe. Khách phải kiểm tra và tự gửi Zalo.', inputSchema: { type: 'object', properties: { itinerary: { type: 'string', minLength: 4, maxLength: 600 } }, required: ['itinerary'], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute: input => { if (!input || typeof input.itinerary !== 'string' || Object.keys(input).some(key => key !== 'itinerary')) throw new Error('Cần một itinerary dạng chuỗi.'); const parsed = E.parseTrip(input.itinerary); if (parsed.error) throw new Error(parsed.error); $('trip-prompt').value = input.itinerary; renderParsed(parsed); applyParsed(parsed); return { status: 'staged_not_booked', fields: readTrip(), warnings: parsed.warnings }; } };
    try { Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch { /* Unsupported experimental browser API; normal booking stays available. */ }
  }
})();
