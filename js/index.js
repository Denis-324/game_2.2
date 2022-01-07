let game = document.querySelector(".game");

let healthMan = document.createElement("div");
let healthMan1 = document.createElement("div");
healthMan.classList.add("game__health_man");
let healthManVar;
let healthMonsterVar = 10;

let healthMonster = document.createElement("div");
healthMonster.classList.add("game__health_monster");
healthMonster.textContent = healthMonsterVar;

game.append(healthMan);
game.append(healthMonster);

const btns = document.querySelectorAll(".game__btn");
const btnsWrap = document.querySelector(".game__btns");

let startBtn = document.querySelector(".game__btn_start");

let gameBtnMonster = document.querySelector(".game__btn_monster");

// получение индекса объекта по нажатию на кнопку у монстра
let monsteraAbility;

let info = document.createElement("div");
const getIndexObjMonster = () => {
  let randonNum = getRundomCooldown();
  console.log(randonNum, arr);

  monsteraAbility = monster.moves[randonNum];

  info.classList.add("game__info");
  info.textContent = monster.moves[randonNum].name;
  game.append(info);

  //   gameBtnMonster.classList.add("btn_active");

  gameBtn1.removeAttribute("disabled");
  if (!gameBtn2.classList.contains("disabled")) {
    gameBtn2.removeAttribute("disabled");
  }
  if (!gameBtn3.classList.contains("disabled")) {
    gameBtn3.removeAttribute("disabled");
  }
  if (!gameBtn4.classList.contains("disabled")) {
    gameBtn4.removeAttribute("disabled");
  }
};

// получение индекса объекта по нажатию на кнопку у человека
const gameBtn1 = document.querySelector(".game__btn1");
// gameBtn1.setAttribute("disabled", "disabled");
const gameBtn2 = document.querySelector(".game__btn2");
// gameBtn2.setAttribute("disabled", "disabled");
const gameBtn3 = document.querySelector(".game__btn3");
// gameBtn3.setAttribute("disabled", "disabled");
const gameBtn4 = document.querySelector(".game__btn4");
// gameBtn4.setAttribute("disabled", "disabled");
let gameBtn2Counter = 0;
let gameBtn3Counter = 0;
let gameBtn4Counter = 0;
let manAbility;
function getIndexObjMan() {
  btns.forEach(function (element, index) {
    element.addEventListener("click", function (ev) {
      let dateId = element.getAttribute("data-id");
      manAbility = man.moves[dateId];
      if (index === 1 || index === 2 || index === 3) {
        ev.target.classList.add("disabled");
        ev.target.setAttribute("disabled", "disabled");
      }
      getStart();
      getIndexObjMonster();
    });
  });
}

const getStart = () => {
  //задержка и появление ударов рыцаря (cooldown)
  getCounterСooldown();
  //массив с магической силой
  let magicMonster = [];
  let magicMan = [];

  // массивы с физической силой
  let physicalMonster = [];
  let physicalMan = [];

  // массивы с уроном
  let dmgMagic = [];
  let dmgPhysical = [];

  //окончательный урон
  let totalDmg = [];

  //массив с магической силой
  magicMonster = getMagicNum(monsteraAbility);
  magicMan = getMagicNum(manAbility);

  //массивый с физической силой

  physicalMonster = getPhysicalNum(monsteraAbility);
  physicalMan = getPhysicalNum(manAbility);
  // массивы с уроном
  dmgMagic = getDamage(magicMonster, magicMan);
  dmgPhysical = getDamage(physicalMonster, physicalMan);

  //окончательный урон
  totalDmg = damageCounting(dmgMagic, dmgPhysical);
  //================================================

  console.log(totalDmg);
  healthMonsterVar = (healthMonsterVar - totalDmg[1]).toFixed(1);
  healthManVar = (healthManVar - totalDmg[0]).toFixed(1);

  healthMan.textContent = healthManVar;
  healthMonster.textContent = healthMonsterVar;

  if (healthMonsterVar <= 0) {
    let result = document.createElement("div");
    result.classList.add("game__result");
    result.innerHTML = `Игра закончена! Победил рыцарь!`;
    btnsWrap.remove();
    game.append(result);

    setTimeout(function () {
      location.reload();
    }, 4000);
  } else if (healthManVar <= 0) {
    let result = document.createElement("div");
    result.classList.add("game__result");
    result.innerHTML = `Игра закончена! Победил монстр!`;
    btnsWrap.remove();
    game.append(result);

    setTimeout(function () {
      location.reload();
    }, 4000);
  }
  if (healthManVar <= 0 && healthMonsterVar <= 0) {
    let result = document.createElement("div");
    result.classList.add("game__result");
    result.innerHTML = `Игра закончена! Взаимное уничтожение!`;
    btnsWrap.remove();
    game.append(result);
    setTimeout(function () {
      location.reload();
    }, 4000);
  }
  info.remove();
};

getIndexObjMan();
