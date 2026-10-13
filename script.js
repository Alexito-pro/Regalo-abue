const memories = [
  { file: "1-Foto-1.jpg", alt: "Abuela y nieto juntos en un jardín", caption: "Una tarde en buena compañía" },
  { file: "2-Foto-2.jpg", alt: "Abuelo, abuela y nieto junto al mar", caption: "Un día de playa en familia" },
  { file: "3-Foto-3.jpg", alt: "Selfi en la playa con abuelos", caption: "Risas y mar, de esas que se quedan" },
  { file: "4-Foto-4.jpg", alt: "Collage de distintos recuerdos familiares", caption: "Muchos recuerdos en una sola foto" },
  { file: "5-Foto-5.jpg", alt: "Familia compartiendo una comida junto al mar", caption: "La mesa sabe mejor cuando estamos juntos" },
  { file: "6-Foto-6.jpg", alt: "La familia paseando en un bote", caption: "Una aventura para recordar" },
  { file: "7-Foto-7.jpg", alt: "Foto familiar en la playa bajo un letrero colorido", caption: "Un paseo lleno de sonrisas" },
  { file: "8-Foto-8.jpg", alt: "Dos familiares sonriendo en la playa al atardecer", caption: "Dos sonrisas frente al atardecer" },
  { file: "9-Foto-9.jpg", alt: "Abuelos abrazados y sonriendo junto al mar", caption: "Un abrazo que lo dice todo" },
  { file: "10-Foto-10.jpg", alt: "Dos familiares posando en la playa al atardecer", caption: "El cielo también quiso celebrar" },
  { file: "11-Foto-11.jpg", alt: "Nieto y abuelos juntos frente al atardecer en la playa", caption: "Los tres frente al atardecer" },
  { file: "12-Foto-12.jpg", alt: "Abuelos abrazados en la arena al atardecer", caption: "Cae el sol, sigue el cariño" },
  { file: "13-Foto-13.jpg", alt: "Selfi familiar junto a un avión antes de viajar", caption: "Comienza una nueva aventura" },
  { file: "14-Foto-14.jpg", alt: "La familia reunida en el aeropuerto con sus maletas", caption: "Todos listos para viajar" },
  { file: "15-Foto-15.jpg", alt: "Selfi de familia durante un día soleado de playa", caption: "Selfi de playa con mis favoritos" },
  { file: "16-Foto-16.jpg", alt: "Nieto con sus abuelos junto al mar", caption: "Un paseo al lado del mar" },
  { file: "17-Foto-17.jpg", alt: "Familia reunida de noche junto a su perro", caption: "La familia completa, con patitas incluidas" },
  { file: "18-Foto-18.jpg", alt: "Selfi familiar de noche en un jardín con flores", caption: "Un paseo bajo las luces" },
  { file: "19-Foto-19.jpg", alt: "Familia reunida en el aeropuerto con un globo de bienvenida", caption: "¡Qué alegría tenerlos de vuelta!" },
];

const grid = document.querySelector("#memory-grid");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("figure img");
const lightboxCaption = lightbox.querySelector("figcaption");
const lightboxCount = lightbox.querySelector(".lightbox-count");
let currentMemory = 0;

memories.forEach((memory, index) => {
  const card = document.createElement("figure");
  card.className = "memory-card";

  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", `Ampliar foto ${index + 1}: ${memory.caption}`);
  button.addEventListener("click", () => openMemory(index));

  const image = document.createElement("img");
  image.src = `fotos/${memory.file}`;
  image.alt = memory.alt;
  image.loading = "lazy";
  image.decoding = "async";

  const caption = document.createElement("figcaption");
  caption.textContent = memory.caption;

  button.append(image, caption);
  card.append(button);
  grid.append(card);
});

function openMemory(index) {
  currentMemory = index;
  const memory = memories[currentMemory];
  lightboxImage.src = `fotos/${memory.file}`;
  lightboxImage.alt = memory.alt;
  lightboxCaption.textContent = memory.caption;
  lightboxCount.textContent = `${currentMemory + 1} de ${memories.length}`;
  lightbox.showModal();
}

function stepMemory(amount) {
  currentMemory = (currentMemory + amount + memories.length) % memories.length;
  const memory = memories[currentMemory];
  lightboxImage.src = `fotos/${memory.file}`;
  lightboxImage.alt = memory.alt;
  lightboxCaption.textContent = memory.caption;
  lightboxCount.textContent = `${currentMemory + 1} de ${memories.length}`;
}

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => stepMemory(-1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => stepMemory(1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") stepMemory(-1);
  if (event.key === "ArrowRight") stepMemory(1);
});

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  navigation.classList.toggle("is-open", !isOpen);
});
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    navigation.classList.remove("is-open");
  });
});
