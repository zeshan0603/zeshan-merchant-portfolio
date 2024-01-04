// HACKER EFFECT
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

function runHackerEffect() {
  let iteration = 0;
  const targetElement = document.getElementById("hacker-effect-span");

  clearInterval(interval);

  interval = setInterval(() => {
    targetElement.innerText = targetElement.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return targetElement.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= targetElement.dataset.value.length) {
      clearInterval(interval);
      iteration = 0; // Reset iteration for next run
      setTimeout(runHackerEffect, 3000); // Call the effect again after 3 seconds
    }

    iteration += 1 / 3;
  }, 50);
}

// Initial call after 3 seconds
setTimeout(runHackerEffect, 3000);



// HACKER EFFECT

// CUSTOM CURSOR
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
let animationFrameId;
let mouseMoveEventAdded = false; // To keep track if the event is already added

const colors = [
  "#ee2b47",
  "#f13945",
  "#f34543",
  "#f64f41",
  "#f8593f",
  "#f9633e",
  "#fb6c3d",
  "#fc753d",
  "#fd7d3d",
  "#fe863d",
  "#ff8e3e",
  "#ff9640"
];

function updateCoords(e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
}

function addMouseMoveListener() {
  if (!mouseMoveEventAdded) {
    window.addEventListener("mousemove", updateCoords);
    mouseMoveEventAdded = true;
  }
}

function animateCircles() {
  addMouseMoveListener(); // Ensuring the mousemove event is listened to

  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  animationFrameId = requestAnimationFrame(animateCircles);
}

function startAnimation() {
  animateCircles();
}

function stopAnimation() {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener("mousemove", updateCoords);
  mouseMoveEventAdded = false;
}

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});


startAnimation();


// CUSTOM CURSOR



// 3d logo
const logo = document.getElementById("logo"),
      images = logo.querySelectorAll("img");

const getActive = () => document.body.dataset.active === "true",
      setActiveTo = active => document.body.dataset.active = active;

const shift = (image, index, rangeX, rangeY) => {
  const active = getActive();
        
  const translationIntensity = active ? 24 : 2,
        maxTranslation = translationIntensity * (index + 1),
        currentTranslation = `${maxTranslation * rangeX}% ${maxTranslation * rangeY}%`;
  
  const scale = active ? 1 + (index * 0.4) : 1;
  
  image.animate({ 
    translate: currentTranslation, 
    scale 
  }, { duration: 750, fill: "forwards", easing: "ease" });
}

const shiftAll = (images, rangeX, rangeY) => 
  images.forEach((image, index) => shift(image, index, rangeX, rangeY));

const shiftLogo = (e, images) => {  
  const rect = logo.getBoundingClientRect(),
        radius = 1000;
  
  const centerX = rect.left + (rect.width / 2),
        centerY = rect.top + (rect.height / 2);
  
  const rangeX = (e.clientX - centerX) / radius,
        rangeY = (e.clientY - centerY) / radius;
  
  shiftAll(images, rangeX, rangeY);
}

const resetLogo = () => {
  setActiveTo(false);
  shiftAll(images, 0.2, -0.2);
}

window.onmousemove = e => shiftLogo(e, images);

document.body.onmouseleave = () => {
  if(!getActive()) resetLogo();
}

// window.onmousedown = e => {
//   setActiveTo(true);
//   shiftLogo(e, images);
// }

// window.onmouseup = e => resetLogo();

resetLogo();

// 3d logo


// GITHUB EFFECT
const ran = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const enhance = id => {
  const element = document.getElementById(id),
        text = element.innerText.split("");
  
  element.innerText = "";
  
  text.forEach((value, index) => {
    const outer = document.createElement("span");
    
    outer.className = "outer";
    
    const inner = document.createElement("span");
    
    inner.className = "inner";
    
    inner.style.animationDelay = `${ran(-5000, 0)}ms`;
    
    const letter = document.createElement("span");
    
    letter.className = "letter";
    
    letter.innerText = value;
    
    letter.style.animationDelay = `${index * 1000 }ms`;
    
    inner.appendChild(letter);    
    
    outer.appendChild(inner);    
    
    element.appendChild(outer);
  });
}

enhance("channel-link");
// GITHUB EFFECT


