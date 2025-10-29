const form = document.getElementById("contactForm")
const status = document.getElementById("status")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    }
    
    status.textContent = "Sending...";

try {
    const response = await fetch("https://broader-real-estate-2.onrender.com/api/contact", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        status.textContent ="Message sent successfully!"
    status.classList.add("success")

        form.reset();
    }
    else{
        status.textContent = "Failed to send. Please try again later."
    status.classList.add("error")

    }
}catch(err) {
    console.error("Error:", err)
    status.textContent = "Server error. Try again Later."
    status.classList.add("error")
}
})



document.querySelectorAll('.faq .box-container .box h3').forEach(headings => {
         headings.onclick = () => {
            headings.parentElement.classList.toggle('active');
         }
      });

      let year = new Date().getFullYear()
      document.querySelector(".year").textContent = year

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
