let swiper; // keep a reference globally

async function loadProperty() {
  const amenities = document.querySelector(".amenities")
  const params = new URLSearchParams(window.location.search);
  const link = params.get('link');
  if (!link) {
    document.body.innerHTML = "<h2>Property not found.</h2>";
    return;
  }

  const response = await fetch(`http://localhost:8080/api/properties/${link}`);
  const property = await response.json();
console.log(response)
  console.log(property.status, property.deposit)
  console.log(document.querySelector(".property-price"));

  document.getElementById("property-title").textContent = property.title;
  document.querySelector("#property-location").textContent = property.location;
  document.querySelector(".property-price").textContent = `Ksh ${property.price.toLocaleString()}M`;
  document.querySelector(".description").textContent = property.description;
  document.querySelector(".property-type").textContent = property.type;
  document.querySelector(".location").innerHTML = `<i class="fas fa-map-marker-alt"></i>${property.location}`;
  document.querySelector(".feet").innerHTML = `<i>square feet :</i><span>${property.feet} ${property.maxfeet ? `&rarr; ${property.maxfeet}` : ""}</span>`;
  document.querySelector(".property-price").innerHTML = `<i class="fas fa-tag"></i>${property.price}M`
  document.querySelector(".name").textContent = property.title
  document.querySelector(".deposit").innerHTML = `<i>deposit :</i><span>${property.deposit}</span>`
  document.querySelector(".status").innerHTML = `<i>status :</i><span>${property.furnished}</span>`
  document.querySelector(".bdrm").innerHTML = `<i>bedrooms :</i><span>${property.bedrooms}</span>`
  document.querySelector(".bthrm").innerHTML = `<i>bathroom :</i><span>${property.bathrooms}</span>`
  document.querySelector(".floors").textContent = property.floors
  document.querySelector(".mortgage").innerHTML = `<i>mortgage :</i><span>${property.mortgage}</span>`
  document.querySelector(".installments").innerHTML = `<i>installments :</i><span>${property.installments}</span>`
  document.querySelector(".typeProperty").innerHTML = `<strong>Type: </strong>${property.type}`
  // document.querySelector(".aboutProp").setAttribute("placeholder",property.title)

  const roomPrice = document.querySelector(".roomPrices")

  function pricePerRoom() {
    if(property.onebdrm) {
      roomPrice.innerHTML += `<div class="roomTag">1 Bedroom: <span class = "tag">${property.onebdrm / 1000000}M</span></div>`
    }
    if(property.twobdrm) {
      roomPrice.innerHTML += `<div class="roomTag">2 Bedroom: <span class = "tag">${property.twobdrm / 1000000}M</span></div>`
    }
    if(property.threebdrm) {
      roomPrice.innerHTML += `<div class="roomTag">3 Bedroom: <span class = "tag">${property.threebdrm / 1000000}M</span></div>`
    }
    if(property.fourbdrm) {
      roomPrice.innerHTML += `<div class="roomTag">4 Bedroom: <span class = "tag">${property.fourbdrm / 1000000}M</span></div>`
    }
    if(property.fivebdrm) {
      roomPrice.innerHTML += `<div class="roomTag">5 Bedroom: <span class = "tag">${property.fivebdrm / 1000000}M</span></div>`
    }
  }

document.getElementById("message").textContent = `Hi i'd like to know more about ${property.title}`


// document.getElementById("message").style.color = "#666"
  pricePerRoom()

let amenity = [];

property.amenities.forEach(amen => {
  amenity.push(amen)
})
console.log(property.price);
console.log(property);
console.log(amenity);


amenity.forEach((amen) => {
  const element = document.createElement('div')
  element.classList.add("box")
  element.innerHTML = 
  `<p><i class="fas fa-check"></i><span>${amen}</span></p>`
  amenities.appendChild(element)
})



  const wrapper = document.querySelector(".swiper-wrapper");
  wrapper.innerHTML = "";

 if(property.slides) {
  (property.slides || []).forEach((img) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.classList.add("property-image")
    slide.innerHTML = `<img src="../${img}" alt="Property Image">`;
    wrapper.appendChild(slide);
  });

  if (swiper) swiper.destroy(true, true); 
  swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
else if (property.slides == null){
  const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.classList.add("property-image")
    slide.innerHTML = `<img src="${property.image}" alt="Property Image">`
    wrapper.appendChild(slide);
  
}
console.log(property.image);

document.getElementById("sendMailBtn").addEventListener("click", (e) => {
  // console.log("gotchaa")
  e.preventDefault()
  const message = `${document.getElementById("message").value}`;
  const subject = `Inquiry about ${property.title}`;
  const email = "muyiadavid99@gmail.com";
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  window.location.href = mailtoLink
});

document.getElementById("sendWhatsAppBtn").addEventListener("click", (e) => {
  e.preventDefault()

  // console.log("WhatsApp button clicked");
  const message = document.getElementById("message").value;
  const phoneNumber = "254742545572";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, "_blank");
});

}

const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", this.window.scrollY > 10);
});

let menu = document.querySelector("#menu-icon");

let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  console.log(menu.classList);
  navbar.classList.toggle("open");
};


let year = new Date().getFullYear()
document.querySelector(".year").textContent = year



loadProperty();
