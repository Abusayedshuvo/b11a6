const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/levels/all"
  );
  const data = await response.json();
  showCategory(data.data);
};

const showCategory = (data) => {
  data.forEach((element) => {
    const buttonContainer = document.getElementById("button-container");
    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick="loadLevel(${element.level_no})" class="btn border-[#422AD5] text-[#422AD5] p-7 level-btn">${element.lessonName}</button> `;
    buttonContainer.appendChild(div);
  });
};

const loadLevel = async (level_no) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/level/${level_no}`
  );
  const data = await response.json();
  displayShow(data.data);
};

const displayShow = (cards) => {
  const cardContainer = document.getElementById("card-container");
  const noWord = document.getElementById("no-word");
  const defaultDiv = document.getElementById("defult");

  if (cards.length > 0) {
    defaultDiv.style.display = "none";
  }

  if (cards.length > 1) {
    cardContainer.style.display = "grid";
    noWord.style.display = "none";
  } else {
    cardContainer.style.display = "none";
    noWord.style.display = "block";
  }
  cardContainer.innerHTML = "";
  cards.forEach((item) => {
    const showCard = document.createElement("div");
    showCard.innerHTML = `
   <div class="bg-white rounded-xl p-14">
            <div class="space-y-6 text-center">
              <p class="text-3xl font-bold"> ${item.word}</p>
              <p class="text-xl font-medium">Meaning /Pronounciation</p>
              <p class="text-3xl font-semibold text-[#18181B]">
              ${item.meaning} / ${item.pronunciation} 
              </p>
            </div>
            <div class="flex mt-14 justify-between">
              <button class="bg-[#1A91FF]/10 p-4 rounded-lg">
                <i class="fa-solid fa-circle-exclamation"></i>
              </button>
              <button class="bg-[#1A91FF]/10 p-4 rounded-lg">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
    `;
    cardContainer.append(showCard);
  });

  const allButtons = document.getElementsByClassName("level-btn");
  if (allButtons.length > 0) {
    for (let button of allButtons) {
      button.addEventListener("click", (event) => {
        for (let btn of allButtons) {
          btn.classList.remove("active");
        }
        event.target.classList.add("active");
      });
    }
  }
};

loadLevel();
loadCategory();
