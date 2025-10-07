// js/site.js
// Multiple functions, DOM interactions, conditional branching, arrays/objects, array methods, template literals, localStorage
document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
document.addEventListener("DOMContentLoaded", init);

function init() {
  renderYears();
  initNavToggles();
  showDailyMessage();
  initSlideshow();
  renderTimeline();
  initMilestoneForm();
  initContactForm();
  updateSubmitCount();
}

/* ---------- Utilities ---------- */
function renderYears() {
  const years = document.querySelectorAll("#year, #year2, #year3, #year4, #year5");
  years.forEach(el => { if (el) el.textContent = new Date().getFullYear(); });
}

/* ---------- NAV ---------- */
function initNavToggles(){
  const toggles = document.querySelectorAll(".nav-toggle");
  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const nav = btn.nextElementSibling;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      if (nav) nav.style.display = expanded ? "" : "block";
    });
  });
}

/* ---------- Dynamic message & Quotes ---------- */
const quotes = [
  {text:"Small steps every day lead to big changes.", author:"— Anonymous"},
  {text:"Strive for progress, not perfection.", author:"— Unknown"},
  {text:"The expert in anything was once a beginner.", author:"— Helen Hayes"},
  {text:"Turn your can'ts into cans and dreams into plans.", author:"— Anonymous"}
];

function showDailyMessage(){
  // Choose quote based on date or stored index
  const savedIndex = Number(localStorage.getItem("quoteIndex")) || 0;
  const index = (savedIndex + 1) % quotes.length;
  localStorage.setItem("quoteIndex", String(index));
  const message = `${quotes[index].text} ${quotes[index].author}`;
  const el = document.getElementById("dynamic-message");
  if (el) el.textContent = message;
}

/* ---------- Slideshow ---------- */
let slideIndex = 0;
function initSlideshow(){
  const container = document.getElementById("slideshow");
  if (!container) return;

  // Build slides with template literals (only template literals used for building HTML)
  container.innerHTML = quotes.map((q, i) => `
    <div class="slide ${i === 0 ? "active" : ""}" data-index="${i}">
      <blockquote>"${q.text}"</blockquote>
      <p class="muted">${q.author}</p>
    </div>
  `).join("");

  document.getElementById("prevSlide").addEventListener("click", () => changeSlide(-1));
  document.getElementById("nextSlide").addEventListener("click", () => changeSlide(1));
  slideIndex = 0;
}

function changeSlide(delta){
  const slides = Array.from(document.querySelectorAll(".slide"));
  if (!slides.length) return;
  slideIndex = (slideIndex + delta + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle("active", i === slideIndex));
}

/* ---------- Timeline (localStorage) ---------- */
const TIMELINE_KEY = "careerTimeline";

function defaultTimeline(){
  return [
    {id: genId(), text:"Complete responsive web dev course", date:"2025-12-01", done:false},
    {id: genId(), text:"Build portfolio website", date:"2026-03-15", done:false},
    {id: genId(), text:"Apply to internships", date:"2026-06-01", done:false}
  ];
}

function loadTimeline(){
  const raw = localStorage.getItem(TIMELINE_KEY);
  if (!raw) {
    const def = defaultTimeline();
    localStorage.setItem(TIMELINE_KEY, JSON.stringify(def));
    return def;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Timeline data corrupted, resetting", e);
    const def = defaultTimeline();
    localStorage.setItem(TIMELINE_KEY, JSON.stringify(def));
    return def;
  }
}

function saveTimeline(items){
  localStorage.setItem(TIMELINE_KEY, JSON.stringify(items));
}

function renderTimeline(){
  const container = document.getElementById("timeline");
  if (!container) return;
  const items = loadTimeline();

  // sort by date ascending
  items.sort((a,b) => new Date(a.date) - new Date(b.date));

  container.innerHTML = items.map(item => `
    <div class="timeline-item" data-id="${item.id}">
      <div>
        <strong>${escapeHtml(item.text)}</strong>
        <div class="meta">${new Date(item.date).toLocaleDateString()}</div>
      </div>
      <div>
        <button class="mark-btn">${item.done ? "Completed" : "Mark done"}</button>
        <button class="remove-btn">Remove</button>
      </div>
    </div>
  `).join("");

  // add event listeners
  container.querySelectorAll(".mark-btn").forEach(btn => btn.addEventListener("click", toggleDone));
  container.querySelectorAll(".remove-btn").forEach(btn => btn.addEventListener("click", removeItem));
}

function toggleDone(e){
  const id = e.target.closest(".timeline-item").dataset.id;
  const items = loadTimeline();
  const item = items.find(i => i.id === id);
  if (item) {
    item.done = !item.done;
    saveTimeline(items);
    renderTimeline();
  }
}

function removeItem(e){
  const id = e.target.closest(".timeline-item").dataset.id;
  let items = loadTimeline();
  items = items.filter(i => i.id !== id);
  saveTimeline(items);
  renderTimeline();
}

function initMilestoneForm(){
  const form = document.getElementById("milestoneForm");
  if (!form) return;
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const text = document.getElementById("milestoneText").value.trim();
    const date = document.getElementById("milestoneDate").value;
    if (!text || !date) return;
    const items = loadTimeline();
    items.push({id: genId(), text, date, done:false});
    saveTimeline(items);
    form.reset();
    renderTimeline();
  });
}

/* ---------- Contact form (localStorage counter) ---------- */
const CONTACT_KEY = "contactSubmissions";

function initContactForm(){
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const message = document.getElementById("messageInput").value.trim();
    if (!email || !message) {
      alert("Please complete required fields.");
      return;
    }
    const existing = JSON.parse(localStorage.getItem(CONTACT_KEY) || "[]");
    existing.push({id: genId(), name, email, message, date: new Date().toISOString()});
    localStorage.setItem(CONTACT_KEY, JSON.stringify(existing));
    updateSubmitCount();
    form.reset();
    alert("Thank you! Your message was recorded locally.");
  });
}

function updateSubmitCount(){
  const list = JSON.parse(localStorage.getItem(CONTACT_KEY) || "[]");
  const count = list.length;
  const counter = document.getElementById("submitCount");
  const info = document.getElementById("submissionInfo");
  if (counter) counter.textContent = String(count);
  if (info) info.style.display = count === 0 ? "block" : "block";
}

/* ---------- Helpers ---------- */
function genId(){
  return 'id-' + Math.random().toString(36).slice(2,9);
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, function(m){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m];
  });
}
