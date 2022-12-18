document.addEventListener("DOMContentLoaded", () => {
    // 카드 옵션
    const cardArray = [
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        }
    ];
    
    cardArray.sort(() => 0.5 - Math.random());                  // 랜덤 정렬

    const grid = document.querySelector(".grid");               // 카드 보드
    let cardsChosen = [];                                       // 고른 카드 객체들을 담는 배열
    let cardsChosenId = [];                                     // 고른 카드 객체들의 id 값을 담는 배열
    let cardsWon = [];                                          // 찾은 카드의 개수
    const resultDisplay = document.querySelector("#result");

    // 카드 보드 생성
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++){             // cardArray.length 만큼 카드 생성
            let card = document.createElement("img");           // img 태그 생성
            card.setAttribute("src", "images/blank.png");       // src 속성은 카드가 가려져 있는 빈 카드로 일단 지정
            card.setAttribute("data-id", i);                    // 현 인덱스로 data-id 속성 지정, 이것은 추후 카드 뽑을 때, 어떤 카드인지 구분하기 위한 속성
            card.addEventListener("click", flipCard);           // 현재 태그의 클릭 이벤트(flipCard) 추가
            grid.appendChild(card); 
        }
    }

    // 찾은 카드 검사
    function checkForMatch() {
        let cards = document.querySelectorAll("img");
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (cardsChosen[0] == cardsChosen[1]) {                         // 뽑은 카드 2개가 같다면
            alert("You found a match");
            cards[optionOneId].setAttribute("src", "images/white.png"); // 흰 카드로 설정
            cards[optionOneId].removeEventListener("click", flipCard);  // 찾은 카드는 클릭 이벤트 삭제
            cards[optionTwoId].setAttribute("src", "images/white.png");
            cards[optionTwoId].removeEventListener("click", flipCard);
            cardsWon.push(cardsChosen);                                 // 찾은 카드 추가
        }
        else {                                                          // 아니면 원상복구
            cards[optionOneId].setAttribute("src", "images/blank.png");
            cards[optionTwoId].setAttribute("src", "images/blank.png");
            alert("Sorry, try again!");
        }

        cardsChosen = [];                                               // 다시 뽑아야하므로 초기화
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;                    // 찾은 카드의 개수가 곧 점수

        if (cardsWon.length == cardArray.length / 2) {                  // 다 찾는 조건이 cardArray는 같은 카드가 2개씩 있으므로 따라서 cardArray 의 절반 크기이다.
            resultDisplay.textContent = "Congratulation! You found them all!";
        }
    }

    // 카드 뒤집기
    function flipCard() {
        let cardId = this.getAttribute("data-id");                              // 생성 시에 부여한 id 값을 가져온다.

        cardsChosen.push(cardArray[cardId].name);                               // 고른 카드들을 담는 배열에 현재 카드의 이름을 추가
        cardsChosenId.push(cardId);                                             // 고른 카드의 id 도 추가

        this.setAttribute("src", cardArray[cardId].img);                        // 위에서 찾은 id 값에 대해 cardArray 에서 img url 을 뽑아서 설정

        if (cardsChosen.length == 2) {                                          // 고른 카드가 2개면 타임아웃 걸기, 500이면 너무 길어서 10으로 설정
            setTimeout(checkForMatch, 10);
        }
    }

    createBoard();
});

