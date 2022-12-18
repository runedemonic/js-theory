const colors = [0, 1, 2, 3, 4, 5, 6 ,7 ,8 ,9 , "A", "B", "C", "D", "E", "F"];

const colorTitle = document.querySelector(".back_color");
const colorBtn = document.querySelector("#click_btn");

colorBtn.addEventListener("click", function() {
    const bodyColor = document.querySelector("body");
    let hexColor = "#"
    for (let i = 0; i < 6; i++) {
        let numRandom = Math.floor(Math.random()*colors.length);
        hexColor += colors[numRandom];
    }
    bodyColor.style.backgroundColor = hexColor
    colorTitle.textContent = hexColor;
})