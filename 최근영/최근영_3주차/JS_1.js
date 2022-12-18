const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const colorTitle = document.querySelector(".back_color");
const colorBtn = document.querySelector("#click_btn");

colorBtn.addEventListener("click", function() {
    const bodyColor = document.querySelector("body");
    let numRandom = Math.floor(Math.random()*colors.length);
    bodyColor.style.backgroundColor = colors[numRandom];
    colorTitle.textContent = colors[numRandom];
})