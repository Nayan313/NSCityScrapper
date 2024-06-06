var myDate = new Date();
var hrs = myDate.getHours();

var greet;

if (hrs < 12) greet = "Good Morning";
else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon";
else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";

document.getElementById("greetings").innerHTML = greet;

var timeOut = 100;
var slideIndex = 0;
var autoOn = true;

autoSlides();

function autoSlides() {
  timeOut = timeOut - 20;

  if (autoOn == true && timeOut < 0) {
    showSlides();
  }
  setTimeout(autoSlides, 20);
}

function prevSlide() {
  timeOut = 4000;

  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slideIndex--;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slideIndex == 0) {
    slideIndex = 3;
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function showSlides() {
  timeOut = 4000;

  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function myFunction(e) {
  document.getElementById("main").style.filter = "blur(0.6rem)";
}

function clearColor() {
  document.getElementById("main").style.filter = "none";
}

let currentIndex = {};

function cardS(cardSliderId, direction) {
  const cardSlider = document.getElementById(cardSliderId);
  const cardSlides = cardSlider.querySelector(".cardSlides");
  const totalSlides = cardSlides.children.length;
  if (!currentIndex[cardSliderId]) {
    currentIndex[cardSliderId] = 0;
  }

  currentIndex[cardSliderId] += direction;

  if (currentIndex[cardSliderId] >= totalSlides) {
    currentIndex[cardSliderId] = 0;
  } else if (currentIndex[cardSliderId] < 0) {
    currentIndex[cardSliderId] = totalSlides - 1;
  }

  const cardWidth = cardSlides.children[0].offsetWidth; // Assuming all cards have the same width
  const cardOffset = -currentIndex[cardSliderId] * cardWidth;
  cardSlides.style.transform = `translateX(${cardOffset}px)`;
}



function showCard(cardClass) {
  document.querySelector(".cityWikiInfoCard").style.opacity = 0;

  // Reset all cards
  document.querySelectorAll(".card").forEach(card => {
    card.style.zIndex = 0;
    card.style.opacity = 0;
  });
  document.querySelectorAll(".trigger").forEach(card => {
    card.style.background = "var(--main-color-light)";
    card.style.border = "none";
  });
  
  // Show the selected card
  document.querySelector(`.${cardClass}`).style.opacity = 1;
  document.querySelector(`.${cardClass}`).style.zIndex = 1;
  document.querySelector(`.${cardClass}Btn`).style.background = "var(--main-color)";
  document.querySelector(`.${cardClass}Btn`).style.border = "1px solid var(--main-color-light)";
}

// Add event listeners to buttons
document.querySelectorAll(".trigger").forEach(button => {
  button.addEventListener("click", function() {
    const cardClass = button.getAttribute("data-card");
    showCard(cardClass);
  });
});



