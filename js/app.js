const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) =>{
    console.log(entry)
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
    }else {
      entry.target.classList.remove('show');
    }
  });
});



const hiddenElement = document.querySelectorAll(".text-effect");
hiddenElement.forEach((el) => observer.observe(el));

const hoverText = document.querySelector(".group");
const hoverImage = document.getElementById("hoverImage");

hoverText.addEventListener("mouseenter", () => {
  hoverImage.classList.remove("hidden");
});

hoverText.addEventListener("mouseleave", () => {
  hoverImage.classList.add("hidden");
});


