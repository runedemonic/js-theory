
const colors = ["#fec5bb", "#fcd5ce", "#fae1dd", "#f8edeb", "#f8edeb",
"#e8e8e4", "#d8e2dc", "#ece4db", "#ffe5d9", "#ffd7ba", "#fec89a"];
const btn = document.getElementById("btn");
const colorCode = document.querySelector(".color-code");

btn.addEventListener('click', () => {
  // random number을 colors index 0-3 사이에서 가져 올 것
  const randomNumber = getRandomNumber();
  document.body.style.backgroundColor = colors[randomNumber];
  colorCode.textContent = colors[randomNumber]
});

function getRandomNumber() {
  return Math.floor(Math.random() * colors.length);
}