<div align="center">

# 3주차 과제 제출

## color flipper 만들기 ⭐️

<br>

![color flipper 움짤](../%ED%99%A9%EC%A7%80%EC%84%A0_3%EC%A3%BC%EC%B0%A8/%ED%99%A9%EC%A7%80%EC%84%A0_3%EC%A3%BC%EC%B0%A8.gif)

<br>
코드는 아래에!
<br>
<br>

</div>

```html
<!-- html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>
      Color Flipper 만들기
    </title>
    <!-- styles -->
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <main>
      <div class="container">
        <div>
          <h1 style="font-family: 'GangwonEdu_OTFBoldA';">
            배경색 : <span class="color">#f1f5f8</span>
          </h1>
        </div>
        <button class="btn btn-click" id="btn">눌러보세용</button>
      </div>
    </main>
    <!-- javascript -->
    <script src="main.js"></script>
  </body>
</html>
```

<br>

```js
// js

const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", function() {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }
  console.log(hexColor);
  color.textContent = hexColor;
  document.body.style.backgroundColor = hexColor;
});

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}
```

<br>

```css
/* css */

@font-face {
  font-family: "GangwonEdu_OTFBoldA";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFBoldA.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

main {
  min-height: calc(100vh - 3rem);
}
.container {
  text-align: center;
}
h1 {
  color: black;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 2.5rem;
}
.color {
  color: rgb(0, 0, 152);
}
.btn-click {
  font-family: "GangwonEdu_OTFBoldA";
  background: transparent;
  color: black;
  font-weight: 700;
  border: 2px solid black;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.3rem;
  padding: 0.75rem 1.25rem;
}
.btn-click:hover {
  color: white;
  background: black;
}
```
