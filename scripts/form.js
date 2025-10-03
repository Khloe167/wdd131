// Product Array
const products = [
  { id: "p1", name: "Wireless Mouse" },
  { id: "p2", name: "Mechanical Keyboard" },
  { id: "p3", name: "Noise Cancelling Headphones" },
  { id: "p4", name: "4K Monitor" },
  { id: "p5", name: "Gaming Chair" }
];

// Populate select options
const select = document.getElementById("productName");

if (select) {
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;   // value = product id
    option.textContent = product.name; // display = product name
    select.appendChild(option);
  });
}
// Get current count or set to 0
let count = localStorage.getItem("reviewCount") || 0;

// Increment counter
count++;
localStorage.setItem("reviewCount", count);

// Display in confirmation page
document.getElementById("reviewCount").textContent = count;
document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
