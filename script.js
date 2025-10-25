const searchTypeBtn = document.querySelectorAll(".search_type_btn");
console.log(document.querySelectorAll(".product_card"));
// console.log(searchTypeBtn);
searchTypeBtn.forEach((search_btn) => {
  search_btn.addEventListener("click", () => {
    // console.log("fiesttaaa");
    searchTypeBtn.forEach((btn) => btn.classList.remove("active"));
    search_btn.classList.add("active");
  });
});



 var swiper = new Swiper(".citiesSwiper", {
      spaceBetween: 30,
      // centeredSlides: true,
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
       breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
            slidesPerView: 5,
          spaceBetween: 30,
        },
      },
    });


async function loadProps() {
  const response = await fetch("http://localhost:8080/api/properties");
      const assets = await response.json();
      const apartments = []
      const lands = []
      const villas = []
      const cottage = []
      console.log(assets);
      assets.forEach((asset) => {
        if (asset.category == "apartments"){
          apartments.push(asset)
        }
        else if (asset.category == "Land"){
          lands.push(asset)
        }
        else if (asset.category == "cottage"){
          cottage.push(asset)
        }
        else if (asset.category == "villas"){
          villas.push(asset)
        }
      })
      const all = [...cottage, ...apartments, ...villas]
      console.log(all);
      console.log(apartments);
      
      let content = document.querySelector(".featured_properties_content_container")
      
      
            // content.innerHTML = ""
            
             all.forEach((apart) => {
            const property = document.createElement("div")
            property.classList.add("product_card");
            property.setAttribute('data-id', apart.id)

            property.innerHTML =  `
            <div class="img_container" data-id = ${apart.id}>
            <img src="${apart.image}" alt="product" class="product_img">
            <div class="text_container">
            <a href="properties/property.html?link=${apart.link}">
            <h3>${apart.title}</h3>
            </a>
                <ul class="product_features_list">
                <li><i class="fa-solid fa-bed"> </i>Beds: ${apart.bedrooms.length > 1 ? apart.bedrooms.join(',') : apart.bedrooms[0]}</li>
                <li><i class="fa-solid fa-bath"> </i> Baths: ${apart.bathrooms}</li>
                    </ul>
                  <div class="price_container">
                  <h5><i class="fas fa-tag"></i>${apart.price}M</h5>
                  </div>
                  </div>
                  </div>
                  `;
                  content.appendChild(property)
                  property.addEventListener('click', () => {
  window.location.href = `properties/property.html?link=${apart.link}`;
});

                })
                
                
                
                let tabsBtn = document.querySelectorAll(".featured_properties_menu_list li button")
                let product = []
      
      
      let productCard = document.querySelectorAll(" .product_card")
      console.log(productCard);
      tabsBtn.forEach((tabBtn) => {
        
        // content.innerHTML = ""
        tabBtn.addEventListener("click", () => {
          
          content.innerHTML = ""
          if (tabBtn.textContent == "Apartments"){
            apartments.forEach((apart) => {
              const property = document.createElement("div")
              property.classList.add("product_card");
              property.setAttribute('data-id', apart.id)
              
              
              property.innerHTML = `
              <div class="img_container" data-id = ${apart.id}>
              <img src="${apart.image}" alt="product" class="product_img">
              <div class="text_container">
              <a href="properties/property.html?link=${apart.link}">
              <h3>${apart.title}</h3>
              </a>
              <ul class="product_features_list">
              <li><i class="fa-solid fa-bed"> </i>Beds: ${apart.bedrooms.length > 1 ? apart.bedrooms.join(',') : apart.bedrooms[0]}</li>
                    <li><i class="fa-solid fa-bath"> </i> Baths: ${apart.bathrooms}</li>
                    </ul>
                    <div class="price_container">
                    <h5><i class="fas fa-tag"></i>${apart.price}M</h5>
                    </div>
                    </div>
                    </div>
                    </div>`;
                    content.appendChild(property)
                    
          property.addEventListener("click", () => {
          })
          property.addEventListener('click', () => {
  window.location.href = `properties/property.html?link=${apart.link}`;
});

          console.log(property);
        })
        
      }
      else if (tabBtn.textContent == "Villas"){
          // content.innerHTML = ""
          villas.forEach((apart) => {
            const property = document.createElement("div")
            property.classList.add("product_card");
            property.setAttribute('data-id', apart.id)
            property.innerHTML =  `  
            <div class="img_container" data-id = ${apart.id}>
            <img src="${apart.image}" alt="product" class="product_img">
            <div class="text_container">
            <a href="properties/property.html?link=${apart.link}">
            <h3>${apart.title}</h3>
            </a>
            <ul class="product_features_list">
            <li><i class="fa-solid fa-bed"> </i>Beds: ${apart.bedrooms.length > 1 ? apart.bedrooms.join(',') : apart.bedrooms[0]}</li>
            <li><i class="fa-solid fa-bath"> </i> Baths: ${apart.bathrooms}</li>
           
            </ul>
            <div class="price_container">
            <h5><i class="fas fa-tag"></i>${apart.price}M</h5>
            </div>
            </div>
            </div>
            `;
                    content.appendChild(property)
                    property.addEventListener('click', () => {
  window.location.href = `properties/property.html?link=${apart.link}`;
});

                  })
                  
                }
                else if (tabBtn.textContent == "Land"){
                  // content.innerHTML = ""
          lands.forEach((apart) => {
            const property = document.createElement("div")
            property.classList.add("product_card");
            property.setAttribute('data-id', apart.id)
            property.innerHTML =  `
            
            <div class="img_container" data-id = ${apart.id}>
            <img src="${apart.image}"
            alt="product" class="product_img">
            <div class="text_container">
            <a href="properties/property.html?link=${apart.link}">
            <h4>${apart.location}</h4>
            <h3>${apart.feet} Acres</h3>
            </a>
            
            <div class="price_container">
            <h5><i class="fas fa-tag"></i> ${apart.price}M</h5>
            </div>
            </div>
            
            </div>
            `;
            content.appendChild(property)
            property.addEventListener('click', () => {
  window.location.href = `properties/property.html?link=${apart.link}`;
});

          })
          
        }
        else if (tabBtn.textContent == "Cottages"){
          // content.innerHTML = ""
          cottage.forEach((apart) => {
            const property = document.createElement("div")
            property.classList.add("product_card");
            property.setAttribute('data-id', apart.id)
            property.innerHTML =  `
            <div class="img_container" data-id = ${apart.id}>
            <img src="${apart.image}" alt="product" class="product_img">
                <div class="text_container">
                <a href="properties/property.html?link=${apart.link}">
                    <h3>${apart.title}</h3>
                    </a>
                    <ul class="product_features_list">
                    <li><i class="fa-solid fa-bed"> </i>Beds: ${apart.bedrooms.length > 1 ? apart.bedrooms.join(',') : apart.bedrooms[0]}</li>
                    <li><i class="fa-solid fa-bath"> </i> Baths: ${apart.bathrooms}</li>
                    
                    </ul>
                    <div class="price_container">
                    <h5><i class="fas fa-tag"></i>${apart.price}M</h5>
                    </div>
                    </div>
                    </div>
                    `;
                    content.appendChild(property)
                    property.addEventListener('click', () => {
  window.location.href = `properties/property.html?link=${apart.link}`;
});

                  })
                  
                }
        else if (tabBtn.textContent == "View All"){
          // content.innerHTML = ""
          all.forEach((apart) => {
            const property = document.createElement("div")
            property.classList.add("product_card");
            property.setAttribute('data-id', apart.id)

            property.innerHTML =  `
            <div class="img_container" data-id = ${apart.id}>
            <img src="${apart.image}" alt="product" class="product_img">
                <div class="text_container">
                <a href="properties/property.html?link=${apart.link}">
                <h3>${apart.title}</h3>
                </a>
                <ul class="product_features_list">
                <li><i class="fa-solid fa-bed"> </i>Beds: ${apart.bedrooms.length > 1 ? apart.bedrooms.join(',') : apart.bedrooms[0]}</li>
                <li><i class="fa-solid fa-bath"> </i> Baths: ${apart.bathrooms}</li>
                
                    </ul>
                    <div class="price_container">
                    <h5><i class="fas fa-tag"></i>${apart.price}M</h5>
                    </div>
                    </div>
                    </div>
                    `;
                    content.appendChild(property)
                    property.addEventListener('click', () => {
  window.location.href = `properties/property.html?link=${apart.link}`;
});

                  })
                
                }
                console.log("fiesttaaa");
                console.log(tabBtn.textContent);
                tabsBtn.forEach((btn) => btn.classList.remove("active"));
                
              console.log(tabBtn.dataset.tab);
              
              console.log(tabBtn.id);
              
              // document.getElementById(tabBtn.dataset.tab).classList.add("active")
              tabBtn.classList.add("active");
              
            })
          })
          
         

// })
// document.addEventListener("DOMContentLoaded", ()=> {
  tabsBtn.forEach((tabBtn) => {
  tabBtn.addEventListener("click", () => {
    product = content.querySelectorAll(".product_card")
    product.forEach((prop) => prop.addEventListener("click", function() {
      // console.log();
      assets.forEach((asset => {
        // console.log(asset.id);
        if (1 * prop.dataset.id === asset.id) {
          console.log(asset.title);
          console.log(asset.location);
          console.log(asset.description);
          console.log(asset.price);
          console.log(asset.feet);
          console.log(asset.type);
        }
      }))
      console.log("yesss");
      console.log(prop.dataset.id);
    }))
    console.log(product);
    console.log("yazz");
  })
})

product = content.querySelectorAll(".product_card")
    product.forEach((prop) => prop.addEventListener("click", function() {
       assets.forEach((asset => {
        // console.log(asset.id);
        if (1 * prop.dataset.id === asset.id) {
          console.log(asset.title);
        }

      }))
      console.log("yesss");
      console.log(prop.dataset.id);
    }))
  // console.log(product);
  // console.log(content.children);
// }) 


    //   const container = document.querySelector(".top_properties_content_container")

    //   container.innerHTML = "";
      
    //   const propCard = document.createElement("div")
    //   // propCard.classList.add("property-card");
    //   assets.find((property) => {
    //     if (property.category === "featured") {
    //       console.log("musolini");
    //       propCard.innerHTML = 
    //       `<div class="product">
    //         <div class="img_container">
    //           <img src="${property.image}" alt="product" class="product_img">
    //           <div class="text_container">
    //             <a href="#">
    //               <h3>${property.title}</h3>
    //               </a>
    //             <div class="price_container">
    //               <h5>${property.price}</h5>
    //             </div>
    //           </div>
    //         </div>
    //       </div>`;
    //     container.appendChild(propCard);
    //    }
    // })

    const featuredHeader = document.querySelector(".featuredName")
    const featuredLocaion = document.querySelector(".featuredLocation")
    const featured = document.querySelector(".featured")
    const viewProp = document.querySelector(".viewProp")
    console.log(featured)
    console.log(featuredHeader);

    console.log(`this is the header ${assets}`);
      console.log(assets);

      assets.find(asset => {
        if (asset.category == "featured"){
          featured.setAttribute("id", asset.id)
          document.querySelector(".bdrms").innerHTML = `<i class="fas fa-bed"></i><span> ${asset.bedrooms}</span>`
          document.querySelector(".bathes").innerHTML = `<i class="fas fa-bath"></i><span> ${asset.bathrooms}</span>`
          document.querySelector(".sqrft").innerHTML = `<i class="fa fa-maximize"></i><span> ${asset.feet}</span>`
          document.querySelector(".numphotos").textContent = asset.slides.length
          document.querySelector(".featImg").setAttribute("src", asset.image)
console.log(asset.slides)
          featuredHeader.textContent = asset.title
          const locationIcon = document.createElement("i")
          locationIcon.classList.add("fas")
          locationIcon.classList.add("fa-map-marker-alt")
          featuredLocaion.innerHTML = `<i class="fas fa-map-marker-alt"></i>${asset.location}`
        console.log(featuredHeader.innerHTML);
        viewProp.addEventListener('click', () => {
window.location.href = `properties/property.html?link=${asset.link}`;
});
        }
      })

      let typeValue = ""
      let localValue = ""



document.getElementById("propertytype").addEventListener("change", (event) => {
// console.log(event.target.value); 
typeValue = event.target.value
const locs = document.getElementById("propertylocation").querySelectorAll("option")
console.log(locs);

 if (typeValue === "#") {
  console.log("youuuuu");
    locs.forEach(loc => loc.classList.remove("hidden"));
    return;
 }

locs.forEach((loc => {
  console.log(loc.classList, typeValue);
  if(!loc.classList.contains(typeValue)){
    loc.classList.add("hidden")
  }
  else{
    loc.classList.remove("hidden")
  }
}))

displaySearch()

})

document.getElementById("propertylocation").addEventListener("change", (event) => {
localValue = event.target.value

// if (typeValue != )
console.log(typeValue);
displaySearch()
  // console.log(occur.target.value);
})

function displaySearch(){
 if (typeValue && localValue){
  console.log(`you want a ${typeValue} in ${localValue}`);
 } 
 else if (typeValue) {
  console.log(`you want a ${typeValue}`);
}
 else if (localValue) {
   console.log(`you want something in ${localValue}`);
 }
 else{
  console.log(`please select your preference`)
}
}

displaySearch()

const searchBtn = document.querySelector(".search_form_btn")
const allProperties = document.querySelector(".featured_properties_content_container")

searchBtn.addEventListener("click", function(e){
  // assets.forEach()
  console.log(typeValue);
  e.preventDefault()
  if(typeValue) {
    allProperties.querySelectorAll(".product_card").forEach(node => {
      let nodeId = node.dataset.id
      assets.forEach((asset) => {
        if(asset.id == nodeId){
          console.log(asset.type,typeValue);
          if(asset.type != typeValue){
            node.classList.add("hidden")
          }
          else{
            node.classList.remove("hidden")

          }
          console.log(node.classList);
        }
      })
        })
  }
})


// console.log(`you want a ${typeValue} in ${localValue}`);


console.log(
document.getElementById("propertytype").textContent)

    }

    loadProps();

const header = document.querySelector("header")

// window.addEventListener("scroll", function () {
//   (header.style.position = "fixed", this.window.scrollY > 700);
//   menu.classList.add("hidden")
// });


window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  // const menu = document.querySelector(".menu");

  if (window.scrollY > 700) {
    header.style.position = "fixed";
    header.style.top = "0";
    header.style.width = "100%";
    // menu.classList.add("hidden");
  } else {
    header.style.position = "relative";
    // menu.classList.remove("hidden");
  }
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