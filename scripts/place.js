// Static Paris weather values
const TEMPERATURE_C = 15.0;   // °C
const WIND_SPEED_KMH = 10.0;  // km/h

// Elements
const tempEl = document.getElementById('temp-display');
const windEl = document.getElementById('wind-display');
const wcEl = document.getElementById('windchill-display');
const yearEl = document.getElementById('current-year');
const lastModEl = document.getElementById('last-modified');

if (tempEl) tempEl.textContent = `${TEMPERATURE_C} °C`;
if (windEl) windEl.textContent = `${WIND_SPEED_KMH} km/h`;

function calculateWindChill(tempC, windKph) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKph, 0.16) + 0.3965 * tempC * Math.pow(windKph, 0.16);
}

function displayWindChill(tempC, windKph) {
  if (tempC <= 10 && windKph > 4.8) {
    const wc = calculateWindChill(tempC, windKph);
    wcEl.textContent = `${wc.toFixed(1)} °C`;
  } else {
    wcEl.textContent = "N/A";
  }
}

function setFooterMeta() {
  const now = new Date();
  if (yearEl) yearEl.textContent = now.getFullYear();
  if (lastModEl) lastModEl.textContent = document.lastModified || 'Unknown';
}

displayWindChill(TEMPERATURE_C, WIND_SPEED_KMH);
setFooterMeta();
