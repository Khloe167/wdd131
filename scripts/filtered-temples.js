document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
  {templeName: "Bern Switzerland",
    location: "Bern, Switzerland",
    dedicated: "1955, September, 11",
    area: 10000,
    imageUrl:
    "https://www.churchofjesuschrist.org/imgs/a2c415301c7991e2e10059b5ec588a28785917b0/full/640%2C/0/default"
    },
    {templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 102000,
    imageUrl:
    "https://www.churchofjesuschrist.org/imgs/df6b96801c9f11ec99eeeeeeac1ea2207e7c517b/full/640%2C/0/default"
  },
  {templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
    "https://www.churchofjesuschrist.org/imgs/92c33bcbf9cf85483e008d6871f8ced5f6d7b661/full/640%2C/0/default"
  },
  ];

  function displayTemples(filteredTemples) {
    const container = document.getElementById("temple-cards");
    container.innerHTML = ""; // clear before displaying new set

    filteredTemples.forEach(temple => {
      const card = document.createElement("div");
      card.innerHTML = `
        <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
        <h3>${temple.templeName}</h3>
      <p>${temple.location}</p>
      <p>Dedicated: ${temple.dedicated}</p>
      <p>Area: ${temple.area} sq ft</p>
      `;

      container.appendChild(card);
    });
  }

// initial display
document.addEventListener("DOMContentLoaded", () => {
  displayTemples(temples);

  // HOME = show all
  document.getElementById("home").addEventListener("click", (e) => {
    e.preventDefault();
    displayTemples(temples);
  });

  // OLD = temples built before 1900
  document.getElementById("old").addEventListener("click", (e) => {
    e.preventDefault();
    displayTemples(temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900));
  });

  // NEW = temples built after 2000
  document.getElementById("new").addEventListener("click", (e) => {
    e.preventDefault();
    displayTemples(temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000));
  });

  // LARGE = temples bigger than 90,000 sq ft
  document.getElementById("large").addEventListener("click", (e) => {
    e.preventDefault();
    displayTemples(temples.filter(t => t.area > 90000));
  });

  // SMALL = temples smaller than 10,000 sq ft
  document.getElementById("small").addEventListener("click", (e) => {
    e.preventDefault();
    displayTemples(temples.filter(t => t.area < 10000));
  });
});
