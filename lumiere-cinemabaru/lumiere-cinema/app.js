/* ============================================================
   LUMIÈRE CINEMA: Vanilla JavaScript Application
   - Movie catalog, genre filtering, and sorting
   - Real-time search and responsive hero carousel
   - Multi-stage booking: schedule, format studio, seat selection
   - Core Feature: Video-Accurate Cinema Seat POV Experience
     * 3D perspective screen view with Dune desert vista
     * Realistic tiered red auditorium seating & foreground recliner
     * Floating spec sheet: UP CLOSE / SWEET SPOT / FULL PICTURE
     * 3 Metrics: Distance to screen, FOV angle, Offset from center
     * Mini auditorium map with glowing mint-green seat dot
   - Concession (F&B) add-on orders
   - Interactive e-ticket pass with dynamic QR code & barcode
   ============================================================ */

"use strict";

/* ---------------- 1. DATA MASTER ---------------- */

const MOVIES = [
  {
    id: "agaklaen", title: "Agak Laen", genre: "Komedi / Horor", category: "Komedi", duration: "119 menit", rating: 8.3, age: "13+",
    price: 55000, status: "now", featured: true, kicker: "Komedi horor dari Imajinari", motif: "ring", colors: ["#1a0b33","#4a1a73","#9b2fd1"],
    poster: "posters/agaklaen.jpg",
    tagline: "Empat penjaga rumah hantu yang justru paling gampang ketakutan.",
    synopsis: "Empat sahabat menjaga wahana rumah hantu di sebuah pasar malam. Saat pengunjung sepi, mereka nekat mencari cara agar wahana tetap ramai, dan semuanya berubah kacau ketika kejadian yang tidak mereka rencanakan muncul di dalam rumah hantu.",
    cast: "Bene Dion, Oki Rengga, Indra Jegel, Boris Bokir, Tissa Biani", director: "Muhadkly Acho"
  },
  {
    id: "jumbo", title: "Jumbo", genre: "Animasi / Keluarga", category: "Animasi", duration: "102 menit", rating: 8.5, age: "SU",
    price: 55000, status: "now", featured: true, kicker: "Animasi keluarga dari Visinema", motif: "ring", colors: ["#0e3b66","#1f78c8","#ff9f1c"],
    poster: "posters/jumbo.jpg",
    tagline: "Tubuh besar, mimpi lebih besar.",
    synopsis: "Don, anak bertubuh besar yang sering diremehkan teman-temannya, ingin membuktikan diri lewat buku cerita peninggalan orang tuanya. Petualangannya bertemu teman tak terduga dan menguji arti keberanian serta persahabatan.",
    cast: "Prince Poetiray, Quinn Salman, Bunga Citra Lestari, Ariel Noah, Angga Yunanda", director: "Ryan Adriandhy"
  },
  {
    id: "sore", title: "Sore: Istri dari Masa Depan", genre: "Drama / Romance", category: "Drama", duration: "119 menit", rating: 8.6, age: "13+",
    price: 65000, status: "now", featured: true, kicker: "Drama romantis fiksi ilmiah", motif: "ring", colors: ["#2a1a0f","#7a4a26","#d9a066"],
    poster: "posters/sore.jpg",
    tagline: "Seseorang dari masa depan datang untuk memperbaiki hari ini.",
    synopsis: "Jonathan hidup tanpa arah sampai seorang perempuan muncul dan mengaku sebagai istrinya dari masa depan. Ia datang membawa satu tujuan: membantu Jonathan mengubah hidupnya sebelum terlambat.",
    cast: "Sheila Dara, Dion Wiyoko", director: "Yandy Laurens"
  },
  {
    id: "pengepungan", title: "Pengepungan di Bukit Duri", genre: "Thriller / Aksi", category: "Thriller", duration: "118 menit", rating: 8.1, age: "17+",
    price: 65000, status: "now", featured: false, kicker: "Thriller aksi karya Joko Anwar", motif: "ring", colors: ["#0c1514","#2a3a38","#7a8a85"],
    poster: "posters/pengepungan.jpg",
    tagline: "Di kelas ini, hanya ada satu cara bertahan.",
    synopsis: "Seorang guru pengganti masuk ke sekolah yang dikuasai kekerasan. Hari pertamanya berubah menjadi perjuangan bertahan hidup di ruang kelas yang tidak lagi aman.",
    cast: "Morgan Oey, Omara Esteghlal, Hana Pitrashata Malasan, Endy Arfian", director: "Joko Anwar"
  },
  {
    id: "tak-ingin-usai", title: "Tak Ingin Usai di Sini", genre: "Romance / Drama", category: "Romance", duration: "110 menit", rating: 7.9, age: "13+",
    price: 60000, status: "now", featured: false, kicker: "Romansa dari Paragon Pictures", motif: "ring", colors: ["#0f2a3a","#1f6f8f","#3fd0e6"],
    poster: "posters/tak-ingin-usai.jpg",
    tagline: "Ada hubungan yang tidak ingin diselesaikan, hanya dijalani.",
    synopsis: "Dua orang yang saling mencintai belajar bahwa kebersamaan tidak cukup hanya dengan perasaan. Mereka harus memilih apa yang layak dipertahankan.",
    cast: "Vanesha Prescilla, Bryan Domani, Rayn Wijaya, Davina Karamoy", director: "Robert Ronny"
  },
  {
    id: "jalur-langit", title: "Kupilih Jalur Langit", genre: "Drama / Religi", category: "Drama", duration: "110 menit", rating: 8.0, age: "13+",
    price: 60000, status: "soon", featured: false, kicker: "Terinspirasi kisah nyata", motif: "ring", colors: ["#3a1220","#8f2f4a","#e8a0a8"],
    poster: "posters/jalur-langit.jpg",
    tagline: "Cinta yang dititipkan lewat doa.",
    synopsis: "Kisah seorang perempuan yang memilih menjaga imannya dalam urusan hati. Terinspirasi dari kisah nyata Elizasifaa.",
    cast: "Segera diumumkan", director: "Archie Hekagery"
  },
  {
    id: "kkn", title: "KKN di Desa Penari", genre: "Horor", category: "Horor", duration: "130 menit", rating: 7.8, age: "17+",
    price: 60000, status: "soon", featured: false, kicker: "Horor dari utas viral SimpleMan", motif: "ring", colors: ["#1a0a08","#5a1a10","#c8321c"],
    poster: "posters/kkn.jpg",
    tagline: "Ada aturan desa yang tidak boleh dilanggar.",
    synopsis: "Sekelompok mahasiswa menjalani KKN di desa terpencil. Satu per satu mereka menyadari ada yang tidak beres, dan pelanggaran kecil mulai mengundang teror yang tak bisa dihentikan.",
    cast: "Tissa Biani, Adinda Thomas, Achmad Megantara, Aghniny Haque", director: "Awi Suryadi"
  },
  {
    id: "aadc", title: "Ada Apa dengan Cinta?", genre: "Romance / Drama", category: "Romance", duration: "112 menit", rating: 8.2, age: "13+",
    price: 50000, status: "soon", featured: false, kicker: "Tayang ulang film klasik", motif: "ring", colors: ["#3a2a06","#a86b10","#e0b020"],
    poster: "posters/aadc.jpg",
    tagline: "Puisi, persahabatan, dan cinta pertama anak SMA.",
    synopsis: "Cinta dan Rangga berasal dari dua dunia yang berbeda di sekolah, tetapi kecintaan pada sastra mendekatkan mereka. Cinta pertama mereka diuji oleh gengsi dan persahabatan.",
    cast: "Dian Sastrowardoyo, Nicholas Saputra", director: "Rudi Soedjarwo"
  }
];

const REVIEW_KEY = "lumiere_reviews_v1";
const SEED_REVIEWS = {
  agaklaen: [{ name: "Dimas", stars: 5, text: "Ketawa dari awal sampai akhir, dan seramnya tetap dapat." }, { name: "Rani", stars: 4, text: "Chemistry empat sahabatnya terasa asli. Seru ditonton ramai-ramai." }],
  jumbo: [{ name: "Putri", stars: 5, text: "Visualnya hangat dan ceritanya sampai ke hati. Anak saya minta nonton lagi." }, { name: "Bayu", stars: 4, text: "Animasi lokal yang bisa dibanggakan. Bagian akhirnya bikin haru." }],
  sore: [{ name: "Nadia", stars: 5, text: "Pelan tapi menghantam. Sheila Dara dan Dion Wiyoko sangat meyakinkan." }, { name: "Fikri", stars: 4, text: "Ide ceritanya segar dan penutupnya terasa pas." }],
  pengepungan: [{ name: "Aldo", stars: 4, text: "Tegang dan brutal, tidak memberi ruang untuk bernapas." }, { name: "Salsa", stars: 4, text: "Kerasa sekali garapan Joko Anwar. Tidak cocok untuk yang gampang ngilu." }],
  "tak-ingin-usai": [{ name: "Tari", stars: 4, text: "Manis dan dekat dengan keseharian. Pas untuk nonton berdua." }, { name: "Ega", stars: 3, text: "Ringan dan enak diikuti, meski ceritanya mudah ditebak." }]
};
function loadReviews() {
  try { return JSON.parse(localStorage.getItem(REVIEW_KEY)) || {}; } catch (e) { return {}; }
}
let REVIEWS = loadReviews();
let reviewDraft = 0;
let editingReview = false;
function saveReviews() {
  try { localStorage.setItem(REVIEW_KEY, JSON.stringify(REVIEWS)); } catch (e) { /* penyimpanan penuh atau diblokir */ }
}
function starsHTML(n) {
  return `<span class="stars" role="img" aria-label="${n} dari 5 bintang">${"★".repeat(n)}<span class="stars__off">${"★".repeat(5 - n)}</span></span>`;
}
function movieReviews(id) {
  const mine = Object.values(REVIEWS).filter((r) => r.movieId === id).sort((a, b) => b.at.localeCompare(a.at)).map((r) => ({ ...r, mine: true }));
  return [...mine, ...(SEED_REVIEWS[id] || [])];
}
function reviewsSectionHTML(movie) {
  if (movie.status !== "now") {
    return `<section class="reviews"><h3>Ulasan penonton</h3><p class="muted">Ulasan dibuka setelah film tayang.</p></section>`;
  }
  const list = movieReviews(movie.id);
  const avg = list.length ? list.reduce((s, r) => s + r.stars, 0) / list.length : 0;
  return `<section class="reviews"><h3>Ulasan penonton</h3>
    ${list.length ? `<p class="reviews__avg">${starsHTML(Math.round(avg))} ${avg.toFixed(1)} dari 5, ${list.length} ulasan</p>
    <ul>${list.map((r) => `<li class="review"><div class="review__head"><strong>${escapeHTML(r.name)}</strong>${starsHTML(r.stars)}${r.mine ? '<span class="review__tag">Ulasan kamu</span>' : ""}</div>${r.text ? `<p>${escapeHTML(r.text)}</p>` : ""}</li>`).join("")}</ul>` : '<p class="muted">Belum ada ulasan.</p>'}</section>`;
}
function ticketReviewHTML(ticket) {
  const movie = getMovie(ticket.movieId);
  if (movie.status !== "now") {
    return `<div class="review-box"><h3>Ulasan</h3><p class="muted">Kamu bisa menulis ulasan setelah film tayang.</p></div>`;
  }
  const r = REVIEWS[ticket.code];
  if (r && !editingReview) {
    return `<div class="review-box"><h3>Ulasan kamu</h3>${starsHTML(r.stars)}${r.text ? `<p>${escapeHTML(r.text)}</p>` : ""}<button class="btn btn-ghost" type="button" data-edit-review>Ubah ulasan</button></div>`;
  }
  const text = r ? r.text : "";
  return `<div class="review-box"><h3>Bagaimana filmnya?</h3>
    <div class="star-input" role="radiogroup" aria-label="Beri bintang">${[1, 2, 3, 4, 5].map((n) => `<button type="button" class="star-btn${n <= reviewDraft ? " is-on" : ""}" data-star="${n}" role="radio" aria-checked="${n === reviewDraft}" aria-label="${n} bintang">★</button>`).join("")}</div>
    <label class="sr-only" for="reviewText">Komentar</label>
    <textarea id="reviewText" maxlength="280" rows="3" placeholder="Tulis komentarmu tentang film ini">${escapeHTML(text)}</textarea>
    <button class="btn btn-primary" type="button" data-submit-review>Kirim ulasan</button></div>`;
}
function refreshTicketReview() {
  const box = document.getElementById("reviewMount");
  if (box && state.currentTicket) box.innerHTML = ticketReviewHTML(state.currentTicket);
}
document.addEventListener("click", (e) => {
  const star = e.target.closest("[data-star]");
  if (star) {
    reviewDraft = Number(star.dataset.star);
    star.parentElement.querySelectorAll(".star-btn").forEach((b, i) => {
      b.classList.toggle("is-on", i < reviewDraft);
      b.setAttribute("aria-checked", String(i + 1 === reviewDraft));
    });
    return;
  }
  if (e.target.closest("[data-edit-review]")) {
    editingReview = true;
    reviewDraft = REVIEWS[state.currentTicket.code].stars;
    refreshTicketReview();
    return;
  }
  if (e.target.closest("[data-submit-review]")) {
    if (!reviewDraft) { toast("Pilih jumlah bintang dulu.", "error"); return; }
    const t = state.currentTicket;
    REVIEWS[t.code] = { movieId: t.movieId, name: (currentUser() ? firstName(currentUser()) : "Kamu"), stars: reviewDraft, text: document.getElementById("reviewText").value.trim(), at: new Date().toISOString() };
    saveReviews();
    editingReview = false;
    refreshTicketReview();
    renderMyTickets();
    toast("Ulasan terkirim.");
  }
});



/* ---------------- AKUN (demo front-end: data tersimpan di peramban, tanpa server) ---------------- */
const USERS_KEY = "lumiere_users_v1";
const SESSION_KEY = "lumiere_session_v1";
const AVATAR_COLORS = ["#d82233", "#cda861", "#3d6b8f", "#5b7f5a", "#7a4a8f", "#8a5a3a"];
let authTab = "login";
let authReturn = "home";
function loadUsers() { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch (e) { return []; } }
function saveUsers(list) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(list)); return true; } catch (e) { toast("Penyimpanan peramban penuh.", "error"); return false; }
}
function currentUser() {
  try { const id = localStorage.getItem(SESSION_KEY); return loadUsers().find((u) => u.id === id) || null; } catch (e) { return null; }
}
function ticketsKey() { const u = currentUser(); return u ? `${STORAGE_KEY}_${u.id}` : null; }
const newSalt = () => Array.from(crypto.getRandomValues(new Uint8Array(12)), (b) => b.toString(16).padStart(2, "0")).join("");
async function hashPassword(pw, salt) {
  const data = new TextEncoder().encode(salt + pw);
  if (window.crypto && crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  let h = 5381; for (const b of data) h = ((h << 5) + h + b) >>> 0;
  return "x" + h.toString(16);
}
const firstName = (u) => u.name.trim().split(/\s+/)[0];
function field(id, label, type = "text", value = "", auto = "") {
  return `<label class="form-field" for="${id}">${label}<input id="${id}" type="${type}" value="${escapeHTML(value)}" autocomplete="${auto}"></label>`;
}
function showAuth(tab = "login", message = "") {
  authTab = tab;
  if (state.view !== "auth" && state.view !== "profile") authReturn = state.view;
  const login = tab === "login";
  $("authView").innerHTML = `<div class="auth-page">
  <div class="auth-hero">
    <h2>Lihat layar dari kursimu sebelum membeli tiket.</h2>
    <p class="muted">Pilih kursi, cek sudut pandangnya, lalu pesan. Tiket dan ulasanmu tersimpan di satu akun.</p>
    <div class="auth-posters">${MOVIES.filter((m) => m.featured).slice(0, 3).map((m) => posterHTML(m)).join("")}</div>
  </div>
  <div class="auth-card">
    <div class="auth-tabs" role="tablist">
      <button type="button" role="tab" aria-selected="${login}" data-auth-tab="login">Masuk</button>
      <button type="button" role="tab" aria-selected="${!login}" data-auth-tab="register">Daftar</button>
    </div>
    <h1>${login ? "Masuk ke Lumière" : "Buat akun baru"}</h1>
    <p class="muted">${escapeHTML(message || (login ? "Masuk untuk membeli tiket dan menulis ulasan." : "Gratis dan tanpa verifikasi email."))}</p>
    ${login ? "" : field("fName", "Nama lengkap", "text", "", "name")}
    ${field("fEmail", "Email", "email", "", "email")}
    ${login ? "" : field("fPhone", "Nomor HP (opsional)", "tel", "", "tel")}
    ${field("fPass", "Kata sandi", "password", "", login ? "current-password" : "new-password")}
    ${login ? "" : field("fPass2", "Ulangi kata sandi", "password", "", "new-password")}
    <p class="form-error" id="authError" role="alert"></p>
    <button class="btn btn-primary btn-block" type="button" data-auth-submit>${login ? "Masuk" : "Buat akun"}</button>
    <p class="auth-note">Akun disimpan di peramban ini saja. Versi demo, belum memakai server.</p>
  </div></div>`;
  setView("auth");
  const first = $(login ? "fEmail" : "fName");
  if (first) first.focus({ preventScroll: true });
}
async function submitAuth() {
  const val = (id) => ($(id) ? $(id).value.trim() : "");
  const fail = (m) => { $("authError").textContent = m; };
  const email = val("fEmail").toLowerCase(), pass = $("fPass").value;
  if (!/^\S+@\S+\.\S+$/.test(email)) return fail("Masukkan alamat email yang valid.");
  const users = loadUsers();
  if (authTab === "login") {
    const u = users.find((x) => x.email === email);
    if (!u || u.hash !== await hashPassword(pass, u.salt)) return fail("Email atau kata sandi salah.");
    return finishLogin(u, false);
  }
  const name = val("fName");
  if (name.length < 2) return fail("Nama minimal 2 huruf.");
  if (pass.length < 8) return fail("Kata sandi minimal 8 karakter.");
  if (pass !== $("fPass2").value) return fail("Kata sandi tidak sama.");
  if (users.some((x) => x.email === email)) return fail("Email ini sudah terdaftar. Silakan masuk.");
  const salt = newSalt();
  const u = { id: "u" + Date.now().toString(36), name, email, phone: val("fPhone"), city: "", color: AVATAR_COLORS[users.length % AVATAR_COLORS.length], salt, hash: await hashPassword(pass, salt), createdAt: new Date().toISOString() };
  users.push(u);
  if (saveUsers(users)) finishLogin(u, true);
}
function finishLogin(u, isNew) {
  try { localStorage.setItem(SESSION_KEY, u.id); } catch (e) { /* sesi tidak tersimpan */ }
  afterAuthChange();
  toast(isNew ? `Akun dibuat. Selamat datang, ${firstName(u)}.` : `Selamat datang kembali, ${firstName(u)}.`);
  setView(authReturn || "home");
}
function logout() {
  try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* abaikan */ }
  afterAuthChange();
  toast("Kamu sudah keluar.");
  showAuth("login");
  authReturn = "home";
}
function afterAuthChange() {
  state.tickets = loadTickets();
  updateTicketCount();
  renderMyTickets();
  refreshAuthUI();
}
function refreshAuthUI() {
  const u = currentUser();
  document.body.classList.toggle("is-gated", !u);
  $("authBtn").hidden = !!u;
  $("userMenu").hidden = !u;
  $("userPanel").hidden = true;
  $("userBtn").setAttribute("aria-expanded", "false");
  if (u) {
    $("userAvatar").textContent = u.name.trim()[0].toUpperCase();
    $("userAvatar").style.background = u.color;
    $("userPanelInfo").innerHTML = `<strong>${escapeHTML(u.name)}</strong><br><span class="muted">${escapeHTML(u.email)}</span>`;
  }
}
function renderProfile() {
  const u = currentUser();
  if (!u) { showAuth("login", "Masuk untuk membuka profilmu."); return; }
  const reviewCount = Object.values(REVIEWS).filter((r) => state.tickets.some((t) => t.movieId === r.movieId)).length;
  $("profileView").innerHTML = `<div class="content-wrap profile-wrap">
    <button class="back-btn" type="button" data-go-home>&#8592; Kembali ke katalog</button>
    <div class="profile-head">
      <span class="avatar avatar--lg" style="background:${u.color}">${escapeHTML(u.name.trim()[0].toUpperCase())}</span>
      <div><h1>${escapeHTML(u.name)}</h1>
        <p class="muted">Bergabung ${new Date(u.createdAt).toLocaleDateString("id-ID", { month: "long", year: "numeric" })}. ${state.tickets.length} tiket, ${reviewCount} ulasan.</p></div>
    </div>
    <section class="panel"><h2>Data diri</h2>
      ${field("pName", "Nama lengkap", "text", u.name, "name")}
      ${field("pEmail", "Email", "email", u.email, "email")}
      ${field("pPhone", "Nomor HP", "tel", u.phone || "", "tel")}
      ${field("pCity", "Kota", "text", u.city || "", "address-level2")}
      <div class="form-field">Warna avatar<div class="swatches" role="radiogroup" aria-label="Warna avatar">${AVATAR_COLORS.map((c) => `<button type="button" class="swatch" role="radio" aria-checked="${c === u.color}" aria-label="Warna ${c}" data-color="${c}" style="background:${c}"></button>`).join("")}</div></div>
      <p class="form-error" id="profileMsg" role="alert"></p>
      <div class="profile-actions"><button class="btn btn-primary" type="button" data-profile-save>Simpan profil</button></div>
    </section>
    <section class="panel"><h2>Ganti kata sandi</h2>
      ${field("pOld", "Kata sandi lama", "password", "", "current-password")}
      ${field("pNew", "Kata sandi baru (min. 8 karakter)", "password", "", "new-password")}
      <p class="form-error" id="passMsg" role="alert"></p>
      <div class="profile-actions"><button class="btn btn-ghost" type="button" data-pass-save>Ubah kata sandi</button></div>
    </section>
    <section class="panel"><h2>Akun</h2>
      <div class="profile-actions"><button class="btn btn-ghost" type="button" data-logout>Keluar</button><button class="btn btn-ghost btn-danger" type="button" data-delete-account>Hapus akun</button></div>
    </section></div>`;
}
let profileColor = null;
async function saveProfile() {
  const u = currentUser(); const users = loadUsers(); const me = users.find((x) => x.id === u.id);
  const v = (id) => $(id).value.trim(); const msg = $("profileMsg");
  const email = v("pEmail").toLowerCase();
  if (v("pName").length < 2) { msg.textContent = "Nama minimal 2 huruf."; return; }
  if (!/^\S+@\S+\.\S+$/.test(email)) { msg.textContent = "Masukkan alamat email yang valid."; return; }
  if (users.some((x) => x.id !== me.id && x.email === email)) { msg.textContent = "Email itu sudah dipakai akun lain."; return; }
  Object.assign(me, { name: v("pName"), email, phone: v("pPhone"), city: v("pCity"), color: profileColor || me.color });
  if (saveUsers(users)) { refreshAuthUI(); renderProfile(); toast("Profil disimpan."); }
}
async function savePassword() {
  const u = currentUser(); const users = loadUsers(); const me = users.find((x) => x.id === u.id); const msg = $("passMsg");
  if (me.hash !== await hashPassword($("pOld").value, me.salt)) { msg.textContent = "Kata sandi lama salah."; return; }
  if ($("pNew").value.length < 8) { msg.textContent = "Kata sandi baru minimal 8 karakter."; return; }
  me.salt = newSalt(); me.hash = await hashPassword($("pNew").value, me.salt);
  if (saveUsers(users)) { $("pOld").value = ""; $("pNew").value = ""; msg.textContent = ""; toast("Kata sandi diubah."); }
}
function deleteAccount() {
  if (!confirm("Hapus akun ini beserta semua tiketnya? Tindakan ini tidak bisa dibatalkan.")) return;
  const u = currentUser();
  state.tickets.forEach((t) => delete REVIEWS[t.code]); saveReviews();
  try { localStorage.removeItem(ticketsKey()); } catch (e) { /* abaikan */ }
  saveUsers(loadUsers().filter((x) => x.id !== u.id));
  logout();
}
document.addEventListener("click", (e) => {
  const t = e.target;
  const tab = t.closest("[data-auth-tab]");
  if (tab) { showAuth(tab.dataset.authTab); return; }
  if (t.closest("[data-auth-submit]")) { submitAuth(); return; }
  if (t.closest("[data-go-home]")) { setView("home"); return; }
  const sw = t.closest("[data-color]");
  if (sw) { profileColor = sw.dataset.color; document.querySelectorAll(".swatch").forEach((b) => b.setAttribute("aria-checked", String(b === sw))); return; }
  if (t.closest("[data-profile-save]")) { saveProfile(); return; }
  if (t.closest("[data-pass-save]")) { savePassword(); return; }
  if (t.closest("[data-logout]")) { logout(); return; }
  if (t.closest("[data-delete-account]")) { deleteAccount(); return; }
  if (t.closest("#authBtn")) { showAuth("login"); return; }
  if (t.closest("#userBtn")) { const open = $("userPanel").hidden; $("userPanel").hidden = !open; $("userBtn").setAttribute("aria-expanded", String(open)); return; }
  if (t.closest("#openProfile")) { $("userPanel").hidden = true; profileColor = null; setView("profile"); return; }
  if (t.closest("#openTickets")) { $("userPanel").hidden = true; renderMyTickets(); openModal("myTicketsModal"); return; }
  if (!t.closest("#userMenu") && $("userPanel")) $("userPanel").hidden = true;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.closest("#authView input")) { e.preventDefault(); submitAuth(); }
});

const STUDIOS = [
  {
    id: "regular",
    name: "Studio 1: Regular Cinema",
    icon: "[1]",
    desc: "Kursi ergonomis, proyeksi laser 4K & surround Dolby 7.1",
    badge: "Harga Standar",
    multiplier: 1
  },
  {
    id: "premiere",
    name: "Studio 2: Premiere VIP",
    icon: "[VIP]",
    desc: "Recliner elektrik berlapis kulit, selimut sutra & Dolby Atmos",
    badge: "+35% Recliner Mewah",
    multiplier: 1.35
  },
  {
    id: "imax",
    name: "Studio 3: IMAX Laser",
    icon: "[IMAX]",
    desc: "Layar raksasa kurva 24 meter, dual 4K laser & audio 12-channel",
    badge: "+70% Layar Kurva Raksasa",
    multiplier: 1.7
  }
];

const TIMES = [
  { time: "17:30", label: "Sore", status: "Tersedia", format: "Standard" },
  { time: "19:45", label: "Prime", status: "Favorit", format: "IMAX" },
  { time: "22:15", label: "Malam", status: "Tersedia", format: "3D" }
];

const FNB_ITEMS = [
  {
    id: "fnb-popcorn",
    name: "Popcorn Karamel Emas",
    category: "Popcorn",
    desc: "Jagung renyah dibalut karamel mentega gurih manis ukuran jumbo.",
    price: 45000
  },
  {
    id: "fnb-nachos",
    name: "Artisan Nachos Deluxe",
    category: "Cemilan",
    desc: "Keripik jagung hangat dengan saus keju cheddar leleh dan jalapeño.",
    price: 38000
  },
  {
    id: "fnb-soda",
    name: "Sparkling Peach Tea",
    category: "Minuman",
    desc: "Teh melati soda dingin berkarbonasi dengan sari persik asli.",
    price: 26000
  },
  {
    id: "fnb-combo",
    name: "Combo Pasangan Hemat",
    category: "Paket",
    desc: "1 Popcorn Karamel Jumbo + 2 Minuman Dingin (Hemat Rp 18.000).",
    price: 72000
  },
  {
    id: "fnb-water",
    name: "Air Mineral Pegunungan",
    category: "Minuman",
    desc: "Air mineral botol kaca 500ml bersuhu dingin.",
    price: 15000
  }
];

/* 9 baris kursi A sampai I (seperti di video) */
const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const COLS = 12;
const MAX_SEATS = 6;
const ADMIN_FEE = 4000;
const STORAGE_KEY = "lumiere_tickets_v3";
const DEFAULT_SEAT = "B4";

/* Baris H dan I adalah Recliner seats */
const RECLINER_ROWS = new Set(["H", "I"]);

const DATES = Array.from({ length: 5 }, (_, i) => {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + i);
  const dayName = new Intl.DateTimeFormat("id-ID", { weekday: "short" }).format(d);
  const dateNum = d.getDate();
  const monthName = new Intl.DateTimeFormat("id-ID", { month: "short" }).format(d);
  const full = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d);
  return {
    index: i,
    top: i === 0 ? "HARI INI" : i === 1 ? "BESOK" : dayName.toUpperCase(),
    dateNum,
    monthName,
    short: i === 0 ? "Hari ini" : i === 1 ? "Besok" : `${dayName}, ${dateNum} ${monthName}`,
    label: `${dateNum} ${monthName} (${dayName})`,
    full
  };
});

/* ---------------- 2. STATE & UTILITY ---------------- */

const state = {
  view: "home",
  step: 1,
  heroIndex: 0,
  search: "",
  genreFilter: "all",
  sortBy: "featured",
  activeMovie: null,
  date: 0,
  studio: "regular",
  time: "19:45",
  selectedSeats: ["B4"],
  activePovSeat: "B4",
  occupied: new Set(),
  fnbOrders: {},
  tickets: loadTickets(),
  currentTicket: null
};

const $ = (id) => document.getElementById(id);
const rupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");
const escapeHTML = (str) => String(str).replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));

function getMovie(id) {
  return MOVIES.find((m) => m.id === id) || MOVIES[0];
}

function getStudio(id) {
  return STUDIOS.find((s) => s.id === id) || STUDIOS[0];
}

function isRecliner(code) {
  return RECLINER_ROWS.has(code[0]);
}

function priceForSeat(code) {
  if (!state.activeMovie) return 0;
  const base = state.activeMovie.price;
  const reclinerMultiplier = isRecliner(code) ? 1.35 : 1.0;
  const studioMultiplier = getStudio(state.studio).multiplier;
  return Math.round((base * reclinerMultiplier * studioMultiplier) / 500) * 500;
}

function sortedSeats() {
  return [...state.selectedSeats].sort((a, b) => {
    const ra = a.charCodeAt(0), rb = b.charCodeAt(0);
    return ra === rb ? parseInt(a.slice(1), 10) - parseInt(b.slice(1), 10) : ra - rb;
  });
}

function totalSeatsPrice() {
  return state.selectedSeats.reduce((acc, code) => acc + priceForSeat(code), 0);
}

function totalFnbPrice() {
  let total = 0;
  for (const [id, qty] of Object.entries(state.fnbOrders)) {
    const item = FNB_ITEMS.find((f) => f.id === id);
    if (item && qty > 0) total += item.price * qty;
  }
  return total;
}

/* PRNG deterministik untuk kursi terisi */
function seedFrom(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return h >>> 0;
}

function makeRNG(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function occupiedFor(key) {
  const rnd = makeRNG(seedFrom(key));
  const set = new Set();
  const target = 18 + Math.floor(rnd() * 14);
  let guard = 0;
  while (set.size < target && guard++ < 600) {
    const r = ROWS[Math.floor(rnd() * ROWS.length)];
    const c = 1 + Math.floor(rnd() * COLS);
    set.add(r + c);
  }
  // Kursi contoh di video selalu dibuka agar dapat dicoba
  set.delete("B4");
  set.delete("F8");
  set.delete("I12");
  set.delete("E6");
  set.delete("E7");
  return set;
}

function loadTickets() {
  try {
    const key = ticketsKey();
    if (!key) return [];
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveTickets() {
  try {
    if (ticketsKey()) localStorage.setItem(ticketsKey(), JSON.stringify(state.tickets));
  } catch (e) {
    toast("Penyimpanan peramban penuh.", "error");
  }
}

/* ---------------- 3. POSTER GENERATIF ---------------- */

function posterHTML(movie, extraClass = "") {
  if (movie.poster) {
    return `<div class="poster poster--photo ${extraClass}" style="--p1:${movie.colors[0]};--p2:${movie.colors[1]};--p3:${movie.colors[2]}"><img src="${movie.poster}" alt="Poster film ${escapeHTML(movie.title)}" loading="lazy" decoding="async"></div>`;
  }
  const art = movie.motif === "ring"
    ? '<span class="poster__ring"></span>'
    : `<span class="poster__shape poster__shape--${movie.motif}"></span>`;
  return `
    <div class="poster ${extraClass}" style="--p1:${movie.colors[0]};--p2:${movie.colors[1]};--p3:${movie.colors[2]}">
      ${art}
      <span class="poster__kicker">${escapeHTML(movie.kicker)}</span>
      <span class="poster__age">${escapeHTML(movie.age)}</span>
      <div class="poster__title">
        ${escapeHTML(movie.title)}
        <small>${escapeHTML(movie.genre.toUpperCase())}</small>
      </div>
    </div>`;
}

/* ---------------- 4. HOME VIEW: HERO & KATALOG ---------------- */

function renderHero() {
  const featured = MOVIES.filter((m) => m.featured);
  $("hero").querySelectorAll(".hero__slide").forEach((el) => el.remove());

  featured.forEach((movie, i) => {
    const slide = document.createElement("article");
    slide.className = "hero__slide" + (i === 0 ? " is-active" : "");
    slide.dataset.slide = String(i);
    slide.setAttribute("aria-hidden", i === 0 ? "false" : "true");
    slide.style.cssText = `--p1:${movie.colors[0]};--p2:${movie.colors[1]};--p3:${movie.colors[2]}`;
    slide.innerHTML = `
      <div class="hero__art"></div>
      <div class="hero__shade"></div>
      <div class="hero__content">
        <span class="hero__eyebrow">Film unggulan: ${escapeHTML(movie.kicker)}</span>
        <h1 class="hero__title">${escapeHTML(movie.title)}</h1>
        <p class="hero__tagline">${escapeHTML(movie.tagline)}</p>
        <p class="hero__synopsis">${escapeHTML(movie.synopsis)}</p>
        <div class="hero__meta">
          <span class="chip chip--star">&#9733; ${movie.rating.toFixed(1)}</span>
          <span class="chip chip--age">${escapeHTML(movie.age)}</span>
          <span class="chip">&#9201; ${escapeHTML(movie.duration)}</span>
          <span class="chip chip--format">4K Laser &middot; Dolby Atmos</span>
        </div>
        <div class="hero__actions">
          <button class="btn btn-primary" type="button" data-buy="${movie.id}">Pesan Tiket Sekarang</button>
          <button class="btn btn-ghost" type="button" data-detail="${movie.id}">Sinopsis &amp; Jadwal</button>
        </div>
      </div>
      <div class="hero__poster">${posterHTML(movie)}</div>`;
    $("hero").insertBefore(slide, $("hero").querySelector(".hero__controls"));
  });

  $("heroDots").innerHTML = featured.map((_, i) =>
    `<button class="hero__dot ${i === 0 ? "is-active" : ""}" type="button" role="tab" data-dot="${i}" aria-label="Slide film ${i + 1}" aria-selected="${i === 0}"></button>`
  ).join("");
  state.heroIndex = 0;
}

function goHero(index) {
  const slides = [...$("hero").querySelectorAll(".hero__slide")];
  if (!slides.length) return;
  state.heroIndex = (index + slides.length) % slides.length;
  slides.forEach((el, i) => {
    el.classList.toggle("is-active", i === state.heroIndex);
    el.setAttribute("aria-hidden", i === state.heroIndex ? "false" : "true");
  });
  $("heroDots").querySelectorAll(".hero__dot").forEach((dot, i) => {
    dot.classList.toggle("is-active", i === state.heroIndex);
    dot.setAttribute("aria-selected", i === state.heroIndex ? "true" : "false");
  });
}

function movieCardHTML(movie) {
  return `
    <article class="movie-card" data-card="${movie.id}">
      <div class="movie-card__poster" data-click-detail="${movie.id}">
        ${posterHTML(movie)}
        ${movie.status === "soon" ? '<span class="movie-card__soon">SEGERA TAYANG</span>' : ""}
        <span class="movie-card__format-tag">4K LASER</span>
      </div>
      <div class="movie-card__body">
        <h3 class="movie-card__title" data-click-detail="${movie.id}">${escapeHTML(movie.title)}</h3>
        <span class="movie-card__genre">${escapeHTML(movie.genre)} &middot; ${escapeHTML(movie.duration)}</span>
        <div class="movie-card__meta">
          <span class="movie-card__rating">&#9733; ${movie.rating.toFixed(1)} <small>/ 10</small></span>
          <span class="movie-card__price">${rupiah(movie.price)}<small>Mulai</small></span>
        </div>
        <div class="movie-card__slots">
          <span class="slot-label">Jadwal:</span>
          <button class="slot-chip" type="button" data-quick-slot="${movie.id}" data-time="17:30">17:30</button>
          <button class="slot-chip" type="button" data-quick-slot="${movie.id}" data-time="19:45">19:45</button>
          <button class="slot-chip" type="button" data-quick-slot="${movie.id}" data-time="22:15">22:15</button>
        </div>
        <button class="btn btn-primary btn-block movie-card__book-btn" type="button" data-buy="${movie.id}">
          ${movie.status === "now" ? "Pesan Kursi" : "Reservasi Awal"}
        </button>
      </div>
    </article>`;
}

function getFilteredMovies() {
  const q = state.search.toLowerCase().trim();
  const genre = state.genreFilter;

  let list = MOVIES.filter((m) => {
    const matchSearch = !q || `${m.title} ${m.genre} ${m.synopsis} ${m.kicker}`.toLowerCase().includes(q);
    const matchGenre = genre === "all" || m.category === genre || m.genre.includes(genre);
    return matchSearch && matchGenre;
  });

  if (state.sortBy === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === "title") {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return list;
}

function renderCatalog() {
  const list = getFilteredMovies();
  const now = list.filter((m) => m.status === "now");
  const soon = list.filter((m) => m.status === "soon");

  $("nowGrid").innerHTML = now.map(movieCardHTML).join("");
  $("soonGrid").innerHTML = soon.map(movieCardHTML).join("");
  $("nowCount").textContent = `${now.length} film`;
  $("soonCount").textContent = `${soon.length} film`;

  const hasSearch = state.search !== "";
  $("nowShowing").hidden = hasSearch && now.length === 0;
  $("comingSoon").hidden = hasSearch && soon.length === 0;
  $("emptySearch").hidden = !(hasSearch && now.length === 0 && soon.length === 0);
}

/* ---------------- 5. MODAL MANAGEMENT ---------------- */

function openModal(id) {
  const el = $(id);
  if (!el) return;
  el.hidden = false;
  document.body.classList.add("is-locked");
  const closeBtn = el.querySelector(".modal__close");
  if (closeBtn) closeBtn.focus();
}

function closeModal(id) {
  const el = $(id);
  if (el) el.hidden = true;
  if (!document.querySelector(".modal:not([hidden]), .pov-modal:not([hidden])")) {
    document.body.classList.remove("is-locked");
  }
}

function openMovieDetail(id) {
  const movie = getMovie(id);
  $("movieDetail").innerHTML = `
    <div class="movie-detail__poster">${posterHTML(movie)}</div>
    <div class="movie-detail__info">
      <span class="eyebrow eyebrow--gold"><i></i> ${escapeHTML(movie.kicker)}</span>
      <h2 id="movieModalTitle">${escapeHTML(movie.title)}</h2>
      <div class="movie-detail__meta">
        <span class="chip chip--star">&#9733; ${movie.rating.toFixed(1)} / 10</span>
        <span class="chip chip--age">${escapeHTML(movie.age)}</span>
        <span class="chip">&#9201; ${escapeHTML(movie.duration)}</span>
        <span class="chip">${escapeHTML(movie.genre)}</span>
      </div>
      <p class="movie-detail__synopsis">${escapeHTML(movie.synopsis)}</p>
      <div class="movie-detail__facts">
        <div><small>Harga tiket</small><strong>${rupiah(movie.price)}</strong></div>
        <div><small>Sutradara</small><strong>${escapeHTML(movie.director || "Lumière")}</strong></div>
        <div><small>Pemeran</small><strong>${escapeHTML(movie.cast || "Ensemble Cast")}</strong></div>
        <div><small>Format tayang</small><strong>Regular, Premiere VIP &amp; IMAX 4K</strong></div>
      </div>
      ${reviewsSectionHTML(movie)}
      <div class="movie-detail__actions">
        ${movie.status === "now"
          ? `<button class="btn btn-primary" type="button" data-buy="${movie.id}">Pilih Jadwal &amp; Kursi</button>`
          : `<button class="btn btn-primary" type="button" data-notify="${movie.id}">Ingatkan Saat Tiket Rilis</button>`}
        <button class="btn btn-ghost" type="button" data-close="movieModal">Tutup Jendela</button>
      </div>
    </div>`;
  openModal("movieModal");
}

/* ---------------- 6. BOOKING WORKFLOW ---------------- */

function setView(view) {
  if (view !== "auth" && !currentUser()) { showAuth("login"); return; }
  state.view = view;
  ["home", "booking", "auth", "profile"].forEach((v) => { const el = $(v + "View"); if (el) el.hidden = v !== view; });
  if (view === "profile") renderProfile();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goBooking(movieId, preselectedTime = null) {
  const movie = getMovie(movieId);
  state.activeMovie = movie;
  state.date = 0;
  state.studio = "regular";
  state.time = preselectedTime || TIMES[1].time; // 19:45
  state.selectedSeats = ["B4"];
  state.activePovSeat = "B4";
  state.fnbOrders = {};
  state.step = 1;

  $("bookingHead").innerHTML = `
    <div class="booking-head__info">
      <span class="eyebrow">Pemesanan tiket</span>
      <h1>${escapeHTML(movie.title)}</h1>
      <p>${escapeHTML(movie.genre)} &middot; ${escapeHTML(movie.duration)} &middot; Format Suara Dolby Atmos</p>
      <p class="booking-head__synopsis">${escapeHTML(movie.synopsis)}</p>
      <dl class="booking-head__facts">
        <div><dt>Sutradara</dt><dd>${escapeHTML(movie.director || "-")}</dd></div>
        <div><dt>Pemeran</dt><dd>${escapeHTML(movie.cast || "-")}</dd></div>
        <div><dt>Batas usia</dt><dd>${escapeHTML(movie.age)}</dd></div>
        <div><dt>Rating</dt><dd>&#9733; ${movie.rating.toFixed(1)} / 10</dd></div>
      </dl>
    </div>
    <div class="booking-head__poster">${posterHTML(movie)}</div>`;

  renderSchedule();
  renderFnbList();
  renderSeatGrid();
  renderTimePillsOnMap();
  updateSummary();
  setStep(1);
  setView("booking");
}

function setStep(step) {
  state.step = step;
  $("schedulePanel").hidden = step !== 1;
  $("seatPanel").hidden = step < 2;
  $("step3Panel").hidden = step < 3;
  $("summaryPanel").hidden = step < 2;

  $("stepper").querySelectorAll("li").forEach((li) => {
    const s = Number(li.dataset.step);
    li.classList.toggle("is-active", s === step);
    li.classList.toggle("is-done", s < step);
  });
}

function renderSchedule() {
  $("dateChips").innerHTML = DATES.map((d) => `
    <button class="date-chip ${d.index === state.date ? "is-active" : ""}" type="button" data-date="${d.index}" aria-pressed="${d.index === state.date}">
      <small>${escapeHTML(d.top)}</small>
      <span class="date-chip__num">${d.dateNum}</span>
      <strong>${escapeHTML(d.monthName)}</strong>
    </button>`).join("");

  $("studioList").innerHTML = STUDIOS.map((s) => `
    <button class="studio-option ${s.id === state.studio ? "is-active" : ""}" type="button" data-studio="${s.id}" aria-pressed="${s.id === state.studio}">
      <span class="studio-option__icon">${s.icon}</span>
      <span>
        <strong>${escapeHTML(s.name)}</strong>
        <small>${escapeHTML(s.desc)}</small>
        <em>${escapeHTML(s.badge)}</em>
      </span>
    </button>`).join("");

  $("timeList").innerHTML = TIMES.map((t) => `
    <button class="time-pill ${t.time === state.time ? "is-active" : ""}" type="button" data-time="${t.time}" aria-pressed="${t.time === state.time}">
      <span class="time-pill__hour">${t.time}</span>
      <small>${escapeHTML(t.label)} &middot; ${escapeHTML(t.format)}</small>
    </button>`).join("");

  const ready = state.time !== null;
  $("toSeats").disabled = !ready;
  $("scheduleNote").textContent = ready
    ? `${DATES[state.date].full} &middot; ${getStudio(state.studio).name} &middot; Jam ${state.time}`
    : "Pilih tanggal, format studio, dan jam tayang untuk melanjutkan.";
}

function changeSchedule(key, value) {
  if (key === "date") state.date = value;
  if (key === "studio") state.studio = value;
  if (key === "time") state.time = value;

  renderSchedule();
  refreshOccupied();
  renderSeatGrid();
  renderTimePillsOnMap();
  updateSummary();
}

/* ---------------- 7. DENAH KURSI BIOSKOP (SEATING MAP) ---------------- */

function screeningKey() {
  return `${state.activeMovie ? state.activeMovie.id : "none"}-${state.date}-${state.studio}-${state.time}`;
}

function refreshOccupied() {
  state.occupied = occupiedFor(screeningKey());
}

function renderTimePillsOnMap() {
  const container = $("seatTimePills");
  if (!container) return;
  container.innerHTML = TIMES.map((t) => `
    <button class="seat-pill-btn ${t.time === state.time ? "is-active" : ""}" type="button" data-map-time="${t.time}">
      <span>${t.time}</span>
      <small>${t.format}</small>
    </button>
  `).join("");

  if (state.activeMovie) {
    $("seatMapTitle").textContent = state.activeMovie.title;
    $("seatMapSubtitle").textContent = `${getStudio(state.studio).name} · ${DATES[state.date].label} · ${state.time}`;
  }
}

function seatHTML(row, col) {
  const code = row + col;
  const occupied = state.occupied.has(code);
  const recliner = isRecliner(code);
  const selected = state.selectedSeats.includes(code);

  let statusClass = "is-available";
  if (occupied) statusClass = "is-occupied";
  else if (selected) statusClass = "is-selected";
  else if (recliner) statusClass = "is-recliner";

  return `<button class="seat-pill ${statusClass}"
    type="button" data-seat="${code}" ${occupied ? "disabled aria-disabled=\"true\"" : ""}
    aria-label="Kursi baris ${row} nomor ${col}, ${recliner ? "tipe Recliner" : "tipe Standard"}, ${occupied ? "sudah terisi" : selected ? "terpilih" : "tersedia"}"
    aria-pressed="${selected ? "true" : "false"}"
    title="Row ${row}, Seat ${col}${occupied ? " (Terisi)" : ""}">
    <span class="seat-pill__inner">${col}</span>
  </button>`;
}

function renderSeatGrid() {
  if (!state.occupied.size) refreshOccupied();
  let html = "";
  ROWS.forEach((row) => {
    html += `<span class="seat-row-label">${row}</span>`;
    for (let c = 1; c <= 6; c++) html += seatHTML(row, c);
    html += '<span class="seat-aisle" aria-hidden="true"></span>';
    for (let c = 7; c <= COLS; c++) html += seatHTML(row, c);
    html += `<span class="seat-row-label">${row}</span>`;
  });
  $("seatGrid").innerHTML = html;
  updateSeatBottomBar();
}

function updateSeatBottomBar() {
  const bar = $("seatBottomBar");
  if (!bar) return;
  const count = state.selectedSeats.length;

  if (count === 0) {
    $("seatBarLabel").textContent = "PILIH KURSI";
    $("seatBarTitle").textContent = "Pilih kursi di denah untuk melihat sudut pandang";
    $("seatBarPrice").textContent = "-";
    $("btnOpenPOV").disabled = true;
    $("btnContinueToFnb").disabled = true;
  } else {
    const latest = state.selectedSeats[state.selectedSeats.length - 1];
    const row = latest[0];
    const col = latest.slice(1);
    const price = priceForSeat(latest);

    $("seatBarLabel").textContent = count === 1 ? "KURSI DIPILIH" : `${count} KURSI DIPILIH`;
    $("seatBarTitle").textContent = count === 1 ? `Row ${row}, Seat ${col}` : state.selectedSeats.join(", ");
    $("seatBarPrice").textContent = rupiah(totalSeatsPrice());
    $("btnOpenPOV").disabled = false;
    $("btnContinueToFnb").disabled = false;
  }
}

function selectSeat(code) {
  const idx = state.selectedSeats.indexOf(code);
  if (idx >= 0) {
    // Jika kursi sudah terpilih, klik lagi bisa membuka POV atau deselect
    state.activePovSeat = code;
    openPOV(code);
    return;
  }

  if (state.selectedSeats.length >= MAX_SEATS) {
    toast(`Maksimal ${MAX_SEATS} kursi per reservasi.`, "error");
    return;
  }

  // Set sebagai active POV seat dan tambahkan ke seleksi
  state.selectedSeats.push(code);
  state.activePovSeat = code;
  renderSeatGrid();
  updateSummary();
  // Buka POV seperti di video!
  openPOV(code);
}

/* ---------------- 8. VIDEO-ACCURATE CINEMA SEAT POV ENGINE ---------------- */

/* Menghitung data geometris yang persis seperti di video */
function computeSeatPOVData(code) {
  const rowLetter = code[0];
  const col = parseInt(code.slice(1), 10);
  const rowIdx = ROWS.indexOf(rowLetter); // 0=A s/d 8=I

  /* 1. Distance to screen (meter)
     Row A: 5.6m, Row B: 6.3m, Row C: 7.1m, Row D: 8.0m, Row E: 8.9m,
     Row F: 9.8m, Row G: 10.9m, Row H: 12.1m, Row I: 13.3m */
  const distanceMap = {
    A: 5.6, B: 6.3, C: 7.1, D: 8.0, E: 8.9, F: 9.8, G: 10.9, H: 12.1, I: 13.3
  };
  const distance = (distanceMap[rowLetter] || (6.3 + rowIdx * 0.9)).toFixed(1);

  /* 2. Field of view (FOV dalam derajat)
     Row A: 92°, Row B: 86°, Row C: 78°, Row D: 71°, Row E: 65°,
     Row F: 60°, Row G: 54°, Row H: 49°, Row I: 45° */
  const fovMap = {
    A: 92, B: 86, C: 78, D: 71, E: 65, F: 60, G: 54, H: 49, I: 45
  };
  const fov = fovMap[rowLetter] || 60;

  /* 3. Offset from centre (meter)
     Center berada di antara kolom 6 dan 7 (6.5)
     Contoh di video:
     Seat 4: 2.2 m left of centre
     Seat 8: 0.3 m right of centre
     Seat 12: 3.3 m right of centre */
  const centerCol = 6.5;
  const colDiff = col - centerCol;
  let offsetDist = 0;
  let offsetLabel = "centre of hall";

  if (col === 4) offsetDist = 2.2;
  else if (col === 8) offsetDist = 0.3;
  else if (col === 12) offsetDist = 3.3;
  else {
    offsetDist = Math.abs(colDiff * 0.6);
  }

  if (col < centerCol) {
    offsetLabel = "left of centre";
  } else if (col > centerCol) {
    offsetLabel = "right of centre";
  }

  /* 4. Category Tag
     Row A-C: UP CLOSE
     Row D-F (tengah): SWEET SPOT
     Row G-I: FULL PICTURE
     Kolom samping: SIDE ANGLE jika jauh dari tengah */
  let tag = "SWEET SPOT";
  if (rowIdx <= 2) {
    tag = "UP CLOSE";
  } else if (rowIdx >= 6) {
    tag = "FULL PICTURE";
  } else if (Math.abs(colDiff) > 3.5) {
    tag = "SIDE ANGLE";
  }

  /* 5. Seat Subtitle & Type */
  const recliner = isRecliner(code);
  const typeName = recliner ? "Recliner" : "Standard";
  const price = priceForSeat(code);

  /* 6. Transformasi 3D Layar (Perspective Rig)
     - Scale: Row B (depan) lebih besar (1.32), Row I (belakang) lebih kecil (0.80)
     - Pitch: Row A-C mendongak ke atas (+11deg), Row I datar (-2deg)
     - Yaw: Kursi di kiri (col 4) melihat layar di kanan (+8deg yaw)
            Kursi di kanan (col 12) melihat layar di kiri (-10deg yaw) */
  const depthFactor = rowIdx / (ROWS.length - 1); // 0 (A) .. 1 (I)
  const lateralFactor = (col - 6.5) / 5.5; // -1 (kiri) .. +1 (kanan)

  const scale = (1.35 - depthFactor * 0.55).toFixed(2);
  const pitch = (12 - depthFactor * 14).toFixed(1); // 12deg to -2deg
  const yaw = (-lateralFactor * 11).toFixed(1); // look towards screen
  const screenShiftX = (lateralFactor * 40).toFixed(1);
  const screenShiftY = (depthFactor * 15 - 5).toFixed(1);

  return {
    row: rowLetter,
    col,
    tag,
    title: `Row ${rowLetter}, Seat ${col}`,
    sub: `${typeName} · ${rupiah(price)}`,
    price,
    distance: `${distance} m`,
    fov: `${fov}°`,
    offset: `${offsetDist.toFixed(1)} m`,
    offsetLabel,
    isRecliner: recliner,
    scale,
    pitch,
    yaw,
    screenShiftX,
    screenShiftY,
    rowIdx,
    colIdx: col - 1
  };
}

/* Animasi angka mulus (smooth counter) */
function animateNumberText(elem, targetVal, unit = "", decimals = 1, duration = 380) {
  if (!elem) return;
  const currentVal = parseFloat(elem.dataset.numVal) || targetVal;
  elem.dataset.numVal = targetVal;
  if (Math.abs(currentVal - targetVal) < 0.04) {
    elem.textContent = targetVal.toFixed(decimals) + (unit ? " " + unit : "");
    return;
  }
  const startTime = performance.now();
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth easeOutCubic curve
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = currentVal + (targetVal - currentVal) * ease;
    elem.textContent = val.toFixed(decimals) + (unit ? " " + unit : "");
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      elem.textContent = targetVal.toFixed(decimals) + (unit ? " " + unit : "");
    }
  }
  requestAnimationFrame(step);
}

/* Radar Minimap Builder */
function renderRadarDots() {
  const container = $("radarSeatDots");
  if (!container || container.dataset.inited) return;
  container.dataset.inited = "true";
  container.innerHTML = "";

  // 9 baris (A-I), 12 kolom (1-12)
  for (let r = 0; r < ROWS.length; r++) {
    const rowLetter = ROWS[r];
    const isRec = r >= 7; // Rows H & I
    const cy = 25 + r * 7.5;

    for (let c = 1; c <= COLS; c++) {
      const code = rowLetter + c;
      // Space between columns with middle aisle gap between col 6 and 7
      const aisle = c > 6 ? 5 : 0;
      const cx = 22 + (c - 1) * 9.5 + aisle;

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", cx.toFixed(1));
      circle.setAttribute("cy", cy.toFixed(1));
      circle.setAttribute("r", isRec ? "2.6" : "2.1");
      circle.setAttribute("class", "radar-seat-dot");
      circle.setAttribute("data-radar-seat", code);

      const isOcc = state.occupiedSeats.has(code);
      circle.setAttribute("fill", isOcc ? "#252533" : isRec ? "#4e2130" : "#3c3c4f");
      circle.setAttribute("opacity", isOcc ? "0.4" : "0.85");

      const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
      title.textContent = `${code} (${isRec ? "Recliner" : "Standard"})`;
      circle.appendChild(title);

      container.appendChild(circle);
    }
  }
}

/* 3D Stage Interactive Parallax Mouse Tracker */
let povParallaxInited = false;
let targetTiltX = 0;
let targetTiltY = 0;
let currentTiltX = 0;
let currentTiltY = 0;
let stageRafId = null;

function setupStageParallax() {
  const stage = $("povStage");
  if (!stage || povParallaxInited) return;
  povParallaxInited = true;

  stage.addEventListener("mousemove", (e) => {
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 .. +1
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 .. +1

    targetTiltY = normX * 4.0; // Yaw tilt (degrees)
    targetTiltX = -normY * 3.0; // Pitch tilt (degrees)
  });

  stage.addEventListener("mouseleave", () => {
    targetTiltX = 0;
    targetTiltY = 0;
  });
}

function runParallaxLoop() {
  if (!state.isPovOpen) return;
  // Silky smooth lerp damping (0.07)
  currentTiltX += (targetTiltX - currentTiltX) * 0.07;
  currentTiltY += (targetTiltY - currentTiltY) * 0.07;

  const rig = $("povScreenRig");
  if (rig && state.povCurrentTransform) {
    const t = state.povCurrentTransform;
    const combinedShiftX = t.screenShiftX + currentTiltY * 2.2;
    const combinedShiftY = t.screenShiftY - currentTiltX * 1.6;
    const combinedPitch = t.pitch + currentTiltX;
    const combinedYaw = t.yaw + currentTiltY;

    rig.style.transform = `
      translate3d(${combinedShiftX.toFixed(2)}px, ${combinedShiftY.toFixed(2)}px, 0)
      scale(${t.scale})
      rotateX(${combinedPitch.toFixed(2)}deg)
      rotateY(${combinedYaw.toFixed(2)}deg)
    `;
  }
  stageRafId = requestAnimationFrame(runParallaxLoop);
}

function updatePOVView(code) {
  const data = computeSeatPOVData(code);
  state.activePovSeat = code;

  // 1. Top navigation info
  $("povViewPillText").textContent = `View from ${code}`;
  if ($("povMovieWatermarkHeader") && state.activeMovie) {
    $("povMovieWatermarkHeader").textContent = `${state.activeMovie.title}, Studio 1`;
  }

  // 2. Card specs & tags
  const badge = $("povTagBadge");
  if (badge) {
    badge.textContent = data.tag;
    badge.className = "pov-tag-badge";
    if (data.tag === "SWEET SPOT") badge.classList.add("tag--sweet");
    else if (data.tag === "UP CLOSE") badge.classList.add("tag--close");
  }

  if ($("povHallTypeTag")) {
    $("povHallTypeTag").textContent = data.isRecliner ? "VIP Recliner Zone" : "Standard Zone";
  }

  $("povSeatTitle").textContent = data.title;
  $("povSeatSub").textContent = data.sub;

  // 3. Smooth animated numeric metrics
  animateNumberText($("metricDistance"), parseFloat(data.distance), "m", 1);
  animateNumberText($("metricFov"), data.fov, "°", 0);
  animateNumberText($("metricOffset"), parseFloat(data.offset), "m", 1);
  $("metricOffsetLabel").textContent = data.offsetLabel;

  // 4. Smooth metric gauge progress bars
  const distNum = parseFloat(data.distance);
  const distPct = Math.min(100, Math.max(15, ((distNum - 5.0) / 9.0) * 100));
  if ($("metricDistanceBar")) {
    $("metricDistanceBar").style.width = `${distPct.toFixed(0)}%`;
  }

  const fovPct = Math.min(100, Math.max(20, ((data.fov - 40) / 55) * 100));
  if ($("metricFovBar")) {
    $("metricFovBar").style.width = `${fovPct.toFixed(0)}%`;
  }

  const offsetNum = parseFloat(data.offset);
  const offsetPct = Math.min(100, Math.max(10, (offsetNum / 3.5) * 100));
  if ($("metricOffsetBar")) {
    $("metricOffsetBar").style.width = `${offsetPct.toFixed(0)}%`;
  }

  // 5. Viewing Experience Advice Tip
  const adviceMap = {
    "UP CLOSE": "Sensasi visual raksasa yang memenuhi seluruh pandangan mata. Rasakan kedalaman visual tanpa distraksi batas tepi layar.",
    "SWEET SPOT": "Titik akustik dan visual paling seimbang di auditorium. Sudut terbaik untuk detail audio Dolby Atmos dan visual IMAX.",
    "FULL PICTURE": "Sudut pandang rileks menyeluruh mencakup seluruh layar dengan sempurna. Posisi paling nyaman dengan kursi Recliner VIP.",
    "SIDE ANGLE": "Sudut dinamis di sayap auditorium dengan ruang kaki lebih leluasa dan akses lorong yang cepat."
  };
  if ($("povExperienceText")) {
    $("povExperienceText").textContent = adviceMap[data.tag] || "Pandangan optimal untuk menikmati film.";
  }

  // 6. Action button text
  $("btnBookSeatPOV").textContent = `Pesan Kursi · ${rupiah(data.price)}`;

  // 7. Radar Minimap active dot coordinates
  const minimapDot = $("minimapActiveSeat");
  const minimapPulse = $("minimapPulseRing");
  const colAisle = data.col > 6 ? 5 : 0;
  const activeMx = 22 + (data.col - 1) * 9.5 + colAisle;
  const activeMy = 25 + data.rowIdx * 7.5;

  if (minimapDot) {
    minimapDot.setAttribute("cx", activeMx.toFixed(1));
    minimapDot.setAttribute("cy", activeMy.toFixed(1));
  }
  if (minimapPulse) {
    minimapPulse.setAttribute("cx", activeMx.toFixed(1));
    minimapPulse.setAttribute("cy", activeMy.toFixed(1));
  }

  // 8. Transform Screen Rig (3D Base Coordinates)
  state.povCurrentTransform = {
    screenShiftX: parseFloat(data.screenShiftX),
    screenShiftY: parseFloat(data.screenShiftY),
    scale: parseFloat(data.scale),
    pitch: parseFloat(data.pitch),
    yaw: parseFloat(data.yaw)
  };

  const screenRig = $("povScreenRig");
  if (screenRig) {
    screenRig.style.transform = `
      translate3d(${data.screenShiftX}px, ${data.screenShiftY}px, 0)
      scale(${data.scale})
      rotateX(${data.pitch}deg)
      rotateY(${data.yaw}deg)
    `;
  }

  // 9. Adjust Auditorium Red Seats Visibility
  const audRows = $("povSeatRows");
  const reclinerFootrest = $("povReclinerFootrest");
  if (audRows) {
    const row1 = audRows.querySelector(".aud-row--1");
    const row2 = audRows.querySelector(".aud-row--2");
    const row3 = audRows.querySelector(".aud-row--3");

    if (data.rowIdx <= 1) {
      if (row1) row1.style.display = "flex";
      if (row2) row2.style.display = "none";
      if (row3) row3.style.display = "none";
    } else if (data.rowIdx <= 4) {
      if (row1) row1.style.display = "flex";
      if (row2) row2.style.display = "flex";
      if (row3) row3.style.display = "none";
    } else {
      if (row1) row1.style.display = "flex";
      if (row2) row2.style.display = "flex";
      if (row3) row3.style.display = "flex";
    }
  }

  if (reclinerFootrest) {
    reclinerFootrest.style.display = data.isRecliner ? "block" : "none";
  }

  // Update Movie Watermark
  if (state.activeMovie) {
    $("povMovieWatermark").textContent = state.activeMovie.title.toUpperCase();
  }
}

function openPOV(code) {
  const modal = $("cinemaPovModal");
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add("is-locked");
  state.isPovOpen = true;

  // Siapkan radar dan efek mouse parallax
  renderRadarDots();
  setupStageParallax();

  if (stageRafId) cancelAnimationFrame(stageRafId);
  stageRafId = requestAnimationFrame(runParallaxLoop);

  updatePOVView(code);
}

function closePOV() {
  const modal = $("cinemaPovModal");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("is-locked");
  state.isPovOpen = false;

  if (stageRafId) {
    cancelAnimationFrame(stageRafId);
    stageRafId = null;
  }
  renderSeatGrid();
}

function stepPOVSeat(direction) {
  const current = state.activePovSeat || "B4";
  const rLetter = current[0];
  const col = parseInt(current.slice(1), 10);
  const rIdx = ROWS.indexOf(rLetter);

  let nextCol = col + direction;
  let nextRowIdx = rIdx;

  if (nextCol < 1) {
    nextCol = COLS;
    nextRowIdx = Math.max(0, rIdx - 1);
  } else if (nextCol > COLS) {
    nextCol = 1;
    nextRowIdx = Math.min(ROWS.length - 1, rIdx + 1);
  }

  const nextCode = ROWS[nextRowIdx] + nextCol;
  updatePOVView(nextCode);

  if (!state.selectedSeats.includes(nextCode)) {
    state.selectedSeats = [nextCode];
    renderSeatGrid();
    updateSummary();
  }
}

function stepPOVRow(direction) {
  const current = state.activePovSeat || "B4";
  const rLetter = current[0];
  const col = current.slice(1);
  const rIdx = ROWS.indexOf(rLetter);

  const nextRowIdx = Math.max(0, Math.min(ROWS.length - 1, rIdx + direction));
  const nextCode = ROWS[nextRowIdx] + col;
  updatePOVView(nextCode);

  if (!state.selectedSeats.includes(nextCode)) {
    state.selectedSeats = [nextCode];
    renderSeatGrid();
    updateSummary();
  }
}

/* ---------------- 9. CEMILAN & RINGKASAN PEMESANAN ---------------- */

function renderFnbList() {
  $("fnbGrid").innerHTML = FNB_ITEMS.map((item) => {
    const qty = state.fnbOrders[item.id] || 0;
    return `
      <div class="fnb-card ${qty > 0 ? "is-ordered" : ""}">
        <div class="fnb-card__top">
          <span class="fnb-card__cat">${escapeHTML(item.category)}</span>
          <span class="fnb-card__price">${rupiah(item.price)}</span>
        </div>
        <strong class="fnb-card__name">${escapeHTML(item.name)}</strong>
        <p class="fnb-card__desc">${escapeHTML(item.desc)}</p>
        <div class="fnb-card__action">
          <span class="fnb-card__qty-label">Jumlah:</span>
          <div class="fnb-qty-control">
            <button class="fnb-btn" type="button" data-fnb-dec="${item.id}" aria-label="Kurangi ${escapeHTML(item.name)}">-</button>
            <span class="fnb-qty-num" id="fnbQty_${item.id}">${qty}</span>
            <button class="fnb-btn" type="button" data-fnb-inc="${item.id}" aria-label="Tambah ${escapeHTML(item.name)}">+</button>
          </div>
        </div>
      </div>`;
  }).join("");
}

function updateSummary() {
  const movie = state.activeMovie;
  if (!movie) return;
  const n = state.selectedSeats.length;
  const subtotalTickets = totalSeatsPrice();
  const adminTotal = ADMIN_FEE * n;
  const fnbTotal = totalFnbPrice();
  const grandTotal = subtotalTickets + adminTotal + fnbTotal;

  $("summaryMovie").textContent = movie.title;
  $("summaryDetails").innerHTML = `
    <div><small>Tanggal</small><strong>${escapeHTML(DATES[state.date].label)}</strong></div>
    <div><small>Studio</small><strong>${escapeHTML(getStudio(state.studio).name)}</strong></div>
    <div><small>Jam tayang</small><strong>${state.time || "-"}</strong></div>
    <div><small>Format</small><strong>IMAX &middot; Dolby Atmos</strong></div>`;

  $("summarySeats").innerHTML = n
    ? sortedSeats().map((s) => `<span class="seat-tag">${s} (${isRecliner(s) ? "Recliner" : "Standard"})</span>`).join("")
    : '<span class="muted">Belum ada kursi yang dipilih</span>';

  /* F&B List di Ringkasan */
  const orderedFnb = Object.entries(state.fnbOrders)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = FNB_ITEMS.find((f) => f.id === id);
      return `<div class="fnb-summary-row"><span>${escapeHTML(item.name)} x ${qty}</span><strong>${rupiah(item.price * qty)}</strong></div>`;
    });

  if (orderedFnb.length) {
    $("summaryFnbWrap").hidden = false;
    $("summaryFnbList").innerHTML = orderedFnb.join("");
  } else {
    $("summaryFnbWrap").hidden = true;
    $("summaryFnbList").innerHTML = "";
  }

  /* Rincian Harga */
  $("summaryPrices").innerHTML = `
    <div class="price-row"><span>Tiket (${n} kursi)</span><strong>${rupiah(subtotalTickets)}</strong></div>
    <div class="price-row"><span>Biaya Layanan (${rupiah(ADMIN_FEE)} x ${n})</span><strong>${rupiah(adminTotal)}</strong></div>
    ${fnbTotal > 0 ? `<div class="price-row"><span>Cemilan &amp; Minuman</span><strong>${rupiah(fnbTotal)}</strong></div>` : ""}
    <div class="price-row price-row--total"><span>TOTAL PEMBAYARAN</span><strong>${rupiah(grandTotal)}</strong></div>`;

  $("confirmBtn").disabled = n === 0;
}

/* ---------------- 10. E-TICKET GENERATOR ---------------- */

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return "LUM-" + s;
}

function drawBarcode(canvas, code) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = 240, h = 48;
  canvas.width = w;
  canvas.height = h;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#0c0c12";

  const rnd = makeRNG(seedFrom(code));
  let x = 12;
  while (x < w - 12) {
    const barW = rnd() > 0.5 ? 2 : 4;
    const gap = rnd() > 0.4 ? 2 : 3;
    ctx.fillRect(x, 6, barW, h - 18);
    x += barW + gap;
  }
  ctx.font = "9px 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(code, w / 2, h - 2);
}

function drawQR(canvas, seedText) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const n = 25, quiet = 2, size = 140;
  const cell = size / (n + quiet * 2);
  canvas.width = size;
  canvas.height = size;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  const rnd = makeRNG(seedFrom(seedText));
  const m = Array.from({ length: n * n }, () => rnd() > 0.48);
  const set = (x, y, v) => { if (x >= 0 && y >= 0 && x < n && y < n) m[y * n + x] = v; };

  [[0, 0], [n - 7, 0], [0, n - 7]].forEach(([ox, oy]) => {
    for (let y = -1; y < 8; y++) {
      for (let x = -1; x < 8; x++) {
        const inside = x >= 0 && x < 7 && y >= 0 && y < 7;
        const dark = inside && (
          x === 0 || x === 6 || y === 0 || y === 6 ||
          (x >= 2 && x <= 4 && y >= 2 && y <= 4)
        );
        set(ox + x, oy + y, dark);
      }
    }
  });
  for (let i = 8; i < n - 8; i++) { set(i, 6, i % 2 === 0); set(6, i, i % 2 === 0); }

  ctx.fillStyle = "#0c0c12";
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (m[y * n + x]) {
        ctx.fillRect((x + quiet) * cell, (y + quiet) * cell, Math.ceil(cell), Math.ceil(cell));
      }
    }
  }
}

function confirmPayment() {
  if (!currentUser()) { showAuth("login", "Masuk dulu untuk menyelesaikan pembayaran."); return; }
  if (!state.selectedSeats.length || !state.time || !state.activeMovie) return;
  const n = state.selectedSeats.length;
  const subtotal = totalSeatsPrice() + ADMIN_FEE * n;
  const fnb = totalFnbPrice();
  const total = subtotal + fnb;

  const ticket = {
    code: makeCode(),
    movieId: state.activeMovie.id,
    movieTitle: state.activeMovie.title,
    genre: state.activeMovie.genre,
    dateLabel: DATES[state.date].label,
    dateFull: DATES[state.date].full,
    studio: getStudio(state.studio).name,
    time: state.time,
    seats: sortedSeats(),
    fnbItems: { ...state.fnbOrders },
    total,
    createdAt: new Date().toISOString()
  };

  state.tickets.unshift(ticket);
  state.tickets = state.tickets.slice(0, 30);
  saveTickets();
  updateTicketCount();
  setStep(3);
  showETicket(ticket);
  toast("Pembayaran berhasil diverifikasi. E-ticket Anda siap digunakan.");
}

function showETicket(ticket) {
  state.currentTicket = ticket;
  editingReview = false;
  reviewDraft = REVIEWS[ticket.code] ? REVIEWS[ticket.code].stars : 0;
  const movie = getMovie(ticket.movieId);
  const seatsStr = ticket.seats.map(escapeHTML).join(", ");

  $("eticketContent").innerHTML = `
    <div class="eticket">
      <div class="eticket__top">
        <div class="eticket__brand">LUMIÈRE CINEMA &middot; PASSBOARD</div>
        <h2 class="eticket__title" id="eticketTitle">${escapeHTML(ticket.movieTitle)}</h2>
        <p class="eticket__sub">${escapeHTML(ticket.genre)} &middot; E-TICKET RESMI</p>
      </div>
      <div class="eticket__body">
        <div class="eticket__rows">
          <div class="eticket__row"><small>Kode tiket</small><strong>${escapeHTML(ticket.code)}</strong></div>
          <div class="eticket__row"><small>Tanggal</small><strong>${escapeHTML(ticket.dateLabel)}</strong></div>
          <div class="eticket__row"><small>Studio</small><strong>${escapeHTML(ticket.studio)}</strong></div>
          <div class="eticket__row"><small>Jam tayang</small><strong>${escapeHTML(ticket.time)} WIB</strong></div>
          <div class="eticket__row"><small>Nomor kursi</small><strong>${seatsStr}</strong></div>
          <div class="eticket__row"><small>Total dibayar</small><strong>${rupiah(ticket.total)}</strong></div>
        </div>
        <div class="eticket__qr">
          <canvas id="qrCanvas" width="140" height="140" aria-label="Kode QR digital tiket bioskop"></canvas>
          <small>Scan di pintu masuk</small>
        </div>
      </div>
      <div class="eticket__barcode-wrap">
        <canvas id="barcodeCanvas" width="240" height="48" aria-label="Barcode digital tiket"></canvas>
      </div>
      <div class="eticket__footer">
        Harap hadir 15 menit sebelum film dimulai &middot; Batas usia penonton: ${escapeHTML(movie.age)}
      </div>
    </div>
    <div id="reviewMount">${ticketReviewHTML(ticket)}</div>`;

  drawQR($("qrCanvas"), ticket.code + ticket.seats.join(""));
  drawBarcode($("barcodeCanvas"), ticket.code);
  openModal("ticketModal");
}

function updateTicketCount() {
  $("ticketCount").textContent = String(state.tickets.length);
}

function renderMyTickets() {
  $("myTicketsCount").textContent = `${state.tickets.length} tiket`;
  $("ticketList").innerHTML = state.tickets.length
    ? state.tickets.map((t) => `
        <div class="ticket-card">
          <div class="ticket-card__poster">${posterHTML(getMovie(t.movieId))}</div>
          <div>
            <div class="ticket-card__title">${escapeHTML(t.movieTitle)}</div>
            <div class="ticket-card__meta">${escapeHTML(t.dateLabel)} &middot; ${escapeHTML(t.studio)} &middot; ${escapeHTML(t.time)}</div>
            <div class="ticket-card__meta">Kursi: ${t.seats.map(escapeHTML).join(", ")}</div>
            <div class="ticket-card__meta">${REVIEWS[t.code] ? starsHTML(REVIEWS[t.code].stars) : '<span class="muted">Belum diulas</span>'}</div>
            <div class="ticket-card__code">${escapeHTML(t.code)}</div>
          </div>
          <div class="ticket-card__right">
            <strong class="ticket-card__price">${rupiah(t.total)}</strong>
            <button class="btn btn-ghost ticket-card__view-btn" type="button" data-view="${escapeHTML(t.code)}">Lihat Tiket</button>
            <button class="ticket-delete" type="button" data-delete="${escapeHTML(t.code)}" aria-label="Hapus tiket ${escapeHTML(t.code)}">&times;</button>
          </div>
        </div>`).join("")
    : `<div class="empty-state" style="margin:10px 0">
         <div class="empty-state__icon">&#127910;</div>
         <h3>Belum Ada Tiket yang Dipesan</h3>
         <p>Tiket yang Anda beli akan tersimpan rapi di dompet digital ini.</p>
       </div>`;
}

/* ---------------- 11. TOAST NOTIFICATION ---------------- */

function toast(message, type = "info") {
  const el = document.createElement("div");
  el.className = "toast" + (type === "error" ? " toast--error" : "");
  el.innerHTML = `<span>${type === "error" ? "&#9888;" : "&#10004;"}</span><span>${escapeHTML(message)}</span>`;
  $("toastStack").appendChild(el);
  setTimeout(() => {
    el.classList.add("is-out");
    setTimeout(() => el.remove(), 320);
  }, 3200);
}

/* ---------------- 12. EVENT BINDING ---------------- */

function wireEvents() {
  /* Navbar */
  document.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.nav;
      $("navLinks").classList.remove("is-open");
      if (target === "tickets") {
        renderMyTickets();
        openModal("myTicketsModal");
        return;
      }
      document.querySelectorAll(".nav-link").forEach((l) => l.classList.toggle("is-active", l.dataset.nav === target));
      if (state.view !== "home") setView("home");
      if (target === "home") resetSearch();
      const section = target === "coming" ? $("comingSoon") : $("nowShowing");
      if (section && !section.hidden) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  $("navToggle").addEventListener("click", () => {
    const open = $("navLinks").classList.toggle("is-open");
    $("navToggle").setAttribute("aria-expanded", String(open));
  });

  $("helpBtn").addEventListener("click", () => openModal("helpModal"));

  /* Search & Filters */
  $("searchInput").addEventListener("input", (e) => {
    state.search = e.target.value;
    $("searchClear").hidden = !e.target.value;
    renderCatalog();
  });

  $("searchClear").addEventListener("click", resetSearch);
  $("resetSearch").addEventListener("click", resetSearch);

  $("genreFilters").addEventListener("click", (e) => {
    const btn = e.target.closest(".genre-pill");
    if (!btn) return;
    $("genreFilters").querySelectorAll(".genre-pill").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    state.genreFilter = btn.dataset.genre;
    renderCatalog();
  });

  $("sortSelect").addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderCatalog();
  });

  /* Hero Controls */
  $("heroPrev").addEventListener("click", () => goHero(state.heroIndex - 1));
  $("heroNext").addEventListener("click", () => goHero(state.heroIndex + 1));
  $("heroDots").addEventListener("click", (e) => {
    const dot = e.target.closest("[data-dot]");
    if (dot) goHero(Number(dot.dataset.dot));
  });

  const heroEl = $("hero");
  const HERO_MS = 10000;
  let heroPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let heroTimer = null;
  const stopHero = () => { clearInterval(heroTimer); heroTimer = null; };
  const startHero = () => { stopHero(); if (!heroPaused && !document.hidden) heroTimer = setInterval(() => goHero(state.heroIndex + 1), HERO_MS); };
  const syncPause = () => { $("heroPause").textContent = heroPaused ? "Putar" : "Jeda"; $("heroPause").setAttribute("aria-pressed", String(heroPaused)); };
  heroEl.addEventListener("click", (e) => { if (e.target.closest(".hero__arrow, .hero__dot")) startHero(); });
  $("heroPause").addEventListener("click", () => { heroPaused = !heroPaused; syncPause(); startHero(); });
  document.addEventListener("visibilitychange", startHero);
  syncPause();
  startHero();

  /* Global Delegation: Movie Cards & Quick slots */
  document.addEventListener("click", (e) => {
    const buy = e.target.closest("[data-buy]");
    if (buy) {
      closeModal("movieModal");
      goBooking(buy.dataset.buy);
      return;
    }
    const quickSlot = e.target.closest("[data-quick-slot]");
    if (quickSlot) {
      closeModal("movieModal");
      goBooking(quickSlot.dataset.quickSlot, quickSlot.dataset.time);
      return;
    }
    const clickDetail = e.target.closest("[data-click-detail]");
    if (clickDetail) {
      openMovieDetail(clickDetail.dataset.clickDetail);
      return;
    }
    const detail = e.target.closest("[data-detail]");
    if (detail) {
      openMovieDetail(detail.dataset.detail);
      return;
    }
    const notify = e.target.closest("[data-notify]");
    if (notify) {
      toast("Notifikasi aktif: Kami akan mengabari Anda saat tiket dibuka.");
      return;
    }
    const close = e.target.closest("[data-close]");
    if (close) {
      closeModal(close.dataset.close);
      return;
    }
  });

  /* Schedule Step 1 */
  $("dateChips").addEventListener("click", (e) => {
    const el = e.target.closest("[data-date]");
    if (el) changeSchedule("date", Number(el.dataset.date));
  });

  $("studioList").addEventListener("click", (e) => {
    const el = e.target.closest("[data-studio]");
    if (el) changeSchedule("studio", el.dataset.studio);
  });

  $("timeList").addEventListener("click", (e) => {
    const el = e.target.closest("[data-time]");
    if (el) changeSchedule("time", el.dataset.time);
  });

  $("toSeats").addEventListener("click", () => {
    if (!state.time) return;
    setStep(2);
    $("seatPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("backHome").addEventListener("click", () => {
    setStep(1);
    setView("home");
  });

  $("stepper").addEventListener("click", (e) => {
    const li = e.target.closest("[data-step]");
    if (!li) return;
    const step = Number(li.dataset.step);
    if (step === 1) {
      setStep(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2 && state.time) {
      setStep(2);
      $("seatPanel").scrollIntoView({ behavior: "smooth" });
    } else if (step === 3 && state.selectedSeats.length) {
      setStep(3);
      $("step3Panel").scrollIntoView({ behavior: "smooth" });
    }
  });

  /* Map Quick Time Switcher */
  $("seatTimePills").addEventListener("click", (e) => {
    const pill = e.target.closest("[data-map-time]");
    if (!pill) return;
    state.time = pill.dataset.mapTime;
    renderTimePillsOnMap();
    renderSchedule();
    refreshOccupied();
    renderSeatGrid();
    updateSummary();
  });

  /* Seat Grid Clicks: Click a seat to select & open POV */
  $("seatGrid").addEventListener("click", (e) => {
    const seat = e.target.closest(".seat-pill");
    if (seat && !seat.disabled) {
      selectSeat(seat.dataset.seat);
    }
  });

  /* Seat Bottom Bar Buttons */
  $("btnOpenPOV").addEventListener("click", () => {
    if (state.selectedSeats.length) {
      openPOV(state.selectedSeats[state.selectedSeats.length - 1]);
    } else {
      openPOV(DEFAULT_SEAT);
    }
  });

  $("btnContinueToFnb").addEventListener("click", () => {
    if (!state.selectedSeats.length) return;
    setStep(3);
    $("step3Panel").scrollIntoView({ behavior: "smooth" });
  });

  /* Cinema POV Modal Controls (Widescreen Web) */
  $("btnBackFromPOV").addEventListener("click", closePOV);
  $("btnChangeSeat").addEventListener("click", closePOV);
  if ($("btnClosePOV")) $("btnClosePOV").addEventListener("click", closePOV);

  $("btnBookSeatPOV").addEventListener("click", () => {
    const seatCode = state.activePovSeat;
    if (!state.selectedSeats.includes(seatCode)) {
      if (state.selectedSeats.length >= MAX_SEATS) {
        toast(`Maksimal ${MAX_SEATS} kursi per reservasi.`, "error");
        return;
      }
      state.selectedSeats.push(seatCode);
    }
    toast(`Kursi ${seatCode} dikonfirmasi.`);
    closePOV();
    setStep(3);
    $("step3Panel").scrollIntoView({ behavior: "smooth" });
  });

  $("btnPrevSeatPOV").addEventListener("click", () => stepPOVSeat(-1));
  $("btnNextSeatPOV").addEventListener("click", () => stepPOVSeat(1));

  // Radar Minimap click to jump to seat
  const radarSvg = $("povRadarSvg");
  if (radarSvg) {
    radarSvg.addEventListener("click", (e) => {
      const dot = e.target.closest(".radar-seat-dot");
      if (dot && dot.dataset.radarSeat) {
        const code = dot.dataset.radarSeat;
        updatePOVView(code);
        if (!state.selectedSeats.includes(code)) {
          state.selectedSeats = [code];
          renderSeatGrid();
          updateSummary();
        }
      }
    });
  }

  // Klik backdrop POV menutup modal
  $("cinemaPovModal").addEventListener("click", (e) => {
    if (e.target.dataset.closePov || e.target.closest("[data-close-pov]")) closePOV();
  });

  /* F&B Increment / Decrement */
  $("fnbGrid").addEventListener("click", (e) => {
    const inc = e.target.closest("[data-fnb-inc]");
    if (inc) {
      const id = inc.dataset.fnbInc;
      state.fnbOrders[id] = (state.fnbOrders[id] || 0) + 1;
      $(`fnbQty_${id}`).textContent = String(state.fnbOrders[id]);
      updateSummary();
      return;
    }
    const dec = e.target.closest("[data-fnb-dec]");
    if (dec) {
      const id = dec.dataset.fnbDec;
      if (state.fnbOrders[id] > 0) {
        state.fnbOrders[id]--;
        $(`fnbQty_${id}`).textContent = String(state.fnbOrders[id]);
        updateSummary();
      }
      return;
    }
  });

  /* Payment & E-Ticket */
  $("confirmBtn").addEventListener("click", confirmPayment);
  $("doneBtn").addEventListener("click", () => {
    closeModal("ticketModal");
    setStep(1);
    setView("home");
    toast("Terima kasih. Selamat menikmati tayangan film.");
  });

  $("copyCodeBtn").addEventListener("click", async () => {
    if (!state.currentTicket) return;
    try {
      await navigator.clipboard.writeText(state.currentTicket.code);
      toast("Kode booking berhasil disalin ke clipboard.");
    } catch (e) {
      toast("Kode booking: " + state.currentTicket.code);
    }
  });

  /* My Tickets Modal Actions */
  $("ticketList").addEventListener("click", (e) => {
    const view = e.target.closest("[data-view]");
    if (view) {
      const t = state.tickets.find((x) => x.code === view.dataset.view);
      if (t) showETicket(t);
      return;
    }
    const del = e.target.closest("[data-delete]");
    if (del) {
      state.tickets = state.tickets.filter((x) => x.code !== del.dataset.delete);
      saveTickets();
      updateTicketCount();
      renderMyTickets();
      toast("Tiket dihapus dari arsip.");
    }
  });

  /* Keyboard navigation for POV modal and general navigation */
  document.addEventListener("keydown", (e) => {
    const povModal = $("cinemaPovModal");
    if (povModal && !povModal.hidden) {
      if (e.key === "Escape") {
        closePOV();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepPOVSeat(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        stepPOVSeat(1);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        stepPOVRow(-1); // Maju mendekat ke arah layar
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        stepPOVRow(1); // Mundur menjauh dari layar
        return;
      }
      return;
    }
    if (e.key === "Escape") {
      const modals = [...document.querySelectorAll(".modal:not([hidden])")];
      if (modals.length) {
        closeModal(modals[modals.length - 1].id);
      } else if ($("navLinks").classList.contains("is-open")) {
        $("navLinks").classList.remove("is-open");
        $("navToggle").setAttribute("aria-expanded", "false");
      }
    }
  });
}

function resetSearch() {
  state.search = "";
  $("searchInput").value = "";
  $("searchClear").hidden = true;
  renderCatalog();
}

/* ---------------- 13. INITIALIZATION ---------------- */

function init() {
  refreshAuthUI();
  renderHero();
  renderCatalog();
  updateTicketCount();
  refreshOccupied();
  renderSeatGrid();
  renderTimePillsOnMap();
  renderFnbList();
  wireEvents();
  if (!currentUser()) showAuth("login");
}

init();
