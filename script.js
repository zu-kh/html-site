const quotes = [
    "في عينيكِ أرى جمال الكون.",
    "أنتِ النجمة التي تضيء سمائي.",
    "كل يوم معكِ هو بداية لحياة جديدة.",
    "حبكِ هو اللحن الذي يعزفه قلبي.",
    "وجودكِ بجانبي هو كل ما أتمنى."
];

const quoteButton = document.getElementById('quote-button');
const quoteDisplay = document.getElementById('quote-display');

quoteButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = quotes[randomIndex];
});

var colours = ['#d4a2b2', '#e2b3c2', '#c71585', '#e6c2bf', '#f2dad5']; // colors of the hearts
var minisize = 5; // smallest size of hearts in pixels
var maxisize = 30; // biggest size of hearts in pixels
var hearts = 200; // maximum number of hearts on screen
var over_or_under = "over"; // set to "over" for hearts to always be on top

var swide = window.innerWidth;
var shigh = window.innerHeight;
var herz = [];
var herzx = [];
var herzy = [];

window.onresize = function() {
    swide = window.innerWidth;
    shigh = window.innerHeight;
}

window.onload = function() {
    for (var i = 0; i < hearts; i++) {
        var heart = createHeart("auto", "auto");
        heart.className = "heart"; // Add class for styling
        heart.style.zIndex = (over_or_under == "over") ? "1001" : "0";
        heart.style.color = colours[i % colours.length];
        heart.style.pointerEvents = "none";
        heart.appendChild(document.createTextNode(String.fromCharCode(9829)));
        document.body.appendChild(heart);
        herz[i] = heart;
        herzy[i] = false;

        // Position hearts randomly and make them appear
        positionHeart(i);
    }
    setInterval(animateHearts, 50);
}

function positionHeart(i) {
    herz[i].style.left = Math.random() * (swide - minisize) + "px";
    herz[i].style.top = Math.random() * (shigh - minisize) + "px";
    herz[i].style.fontSize = Math.random() * (maxisize - minisize) + minisize + "px";
    herz[i].style.visibility = "visible";
    herzy[i] = true;

    // Set initial random movement direction
    herzx[i] = Math.random() * 2 - 1; // Random horizontal movement (-1 to 1)
    herzy[i] = Math.random() * 2 - 1; // Random vertical movement (-1 to 1)
}

function animateHearts() {
    for (var i = 0; i < hearts; i++) {
        if (herzy[i]) {
            animateHeart(i);
        }
    }
}

function animateHeart(i) {
    // This function animates a heart element
    // Update position with smooth movement
    var left = parseFloat(herz[i].style.left);
    var top = parseFloat(herz[i].style.top);

    left += herzx[i]; // Update x position
    top += herzy[i];  // Update y position

    // Change direction if the heart goes off screen
    if (left < 0 || left > swide) {
        herzx[i] *= -1; // Reverse direction
    }
    if (top < 0 || top > shigh) {
        herzy[i] *= -1; // Reverse direction
    }
    if (Math.random() > 0.95) {
        herzx[i] = Math.random() * 2 - 1;
        herzy[i] = Math.random() * 2 - 1;
    }

    herz[i].style.left = left + "px"; // Update left position
    herz[i].style.top = top + "px";   // Update top position
}

function createHeart(height, width) {
    // This function creates a heart element
    var span = document.createElement("span");
    span.style.position = "absolute";
    span.style.height = height;
    span.style.width = width;
    span.style.overflow = "hidden";
    span.style.backgroundColor = "transparent";
    return span;
}

const header = document.querySelector('header');
header.addEventListener('click', () => {
    alert('أنتِ أجمل شيء في حياتي');
});
