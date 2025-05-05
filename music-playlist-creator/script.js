
// navbar

// light/dark mode
const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  toggleBtn.innerHTML = body.classList.contains("dark-mode")
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});


const footer = document.querySelector(".footer");
console.log(footer)
const currentYear = new Date().getFullYear();
footer.innerHTML = `&copy; ${currentYear} Ampd. All rights reserved.`;