gsap.registerPlugin(ScrollTrigger);
let tl = gsap.timeline();

tl.to(".sideNavbar", {
  right: 0,
});
tl.from(".sideNavbar a", {
  x: 120,
  stagger: 0.2,
  duration: 0.5,
  opacity: 0,
  delay: 0.14,
});
tl.pause();
let openMenubar = document.querySelector(".hamburger");
let ReverseMenubar = document.querySelector(".cross");

openMenubar.addEventListener("click", function () {
  tl.play();
});
ReverseMenubar.addEventListener("click", function () {
  tl.reverse();
});






function gsapAnim() {
const btns = document.querySelectorAll("#cardSButton");
btns.forEach((btn) =>{
  gsap.from(btn, {
    opacity:0,
    scale:0.2,
    duation:0.4,
    scrollTrigger: {
      trigger: btn,
      start: "top 50%", // When the top of the box hits 80% of the viewport height
      toggleActions: "play none none none",  // Uncomment to see the trigger markers during development
    },
  })
})
const detailCard = document.querySelectorAll(".cityWikiCardSection,.in-part, .table ,.gsapTitle");
detailCard.forEach((btn) =>{
  gsap.from(btn, {
    opacity:0,
    scale:0.2,
    duation:0.4,
    stagger: 0.5,
    scrollTrigger: {
      trigger: btn,
      start: "top 50%", // When the top of the box hits 80% of the viewport height
      toggleActions: "play none none none",  // Uncomment to see the trigger markers during development
    },
  })
})


const boxes1 = document.querySelectorAll(".sliderTitle");

boxes1.forEach((box) => {
  const timeline = gsap.timeline({
    scrollTrigger: {// Set to true for development, false or remove in production
      trigger: box,
      start: "top 50%", // When the top of the box hits 50% of the viewport height
      toggleActions: "play none none none",
    }
  });

  timeline.from(box.querySelector("h1"), {
    opacity: 0,
    x: -50,
    duration: 0.7,
  })
  .from(box.querySelector("p"), {
    opacity: 0,
    x: -50,
    duration: 0.7,
  })  // This ensures the animations overlap slightly for a smoother effect
  .from(box.querySelector("a"), {
    opacity: 0,
    x: -50,
    duration: 0.7,
  });
});



  // alert("called")
  const boxes = document.querySelectorAll(".cardS");

  // Loop through each box and create a ScrollTrigger for it
  boxes.forEach((box, index) => {
    gsap.from(box, {
      opacity: 0,
      y: 50,
      scale: .5,
      stagger: 0.8,
      duration: 1,
      scrollTrigger: {
        trigger: box,
        start: "top 50%", // When the top of the box hits 80% of the viewport height
        toggleActions: "play none none none",  // Uncomment to see the trigger markers during development
      },
    });
  });
}