
const clickerButton = document.getElementById('clicker-btn');
const clickCountElement = document.getElementById('click-count');
const needle = document.getElementById('needle');
const achievementsList = document.getElementById('achievements-list');
const body = document.querySelector('body');
const backgroundSelector = document.getElementById('background-selector');
const openBackgroundSettingsButton = document.getElementById('open-background-settings');
const colorChangeButton = document.getElementById('change-button-color');

let clickCount = 0;
let speed = 0;
let lastClickTime = 0;
let previousTime = Date.now();

const achievements = {
    "Сотник 😁!": 100,
    "Половинка гепарда 🐆": 1000000,
    "Пятисот раз 😆": 500,
    "Тысяча баллов!": 1000,
    "Черепаха 🐢": 1,
    "Челик 🎩": 777,
    "на еду" : 67,
};

function updateSpeedometer() {
    const currentTime = Date.now();
    const timeDiff = currentTime - previousTime;
    speed = timeDiff > 0 ? Math.min(Math.round(1000 / timeDiff), 10) : 0;
    previousTime = currentTime;

    needle.style.transform = `rotate(${speed * 18 - 90}deg)`;
}

function updateAchievements() {
    for (let achievement in achievements) {
        if (clickCount >= achievements[achievement]) {
            if (!document.getElementById(achievement)) {
                let li = document.createElement('li');
                li.id = achievement;
                li.textContent = achievement;
                achievementsList.appendChild(li);
            }
        }
    }
}

clickerButton.addEventListener('click', () => {
    clickCount++;
    clickCountElement.textContent = clickCount;

    updateSpeedometer();
    updateAchievements();
});

openBackgroundSettingsButton.addEventListener('click', () => {
    backgroundSelector.classList.toggle('show');
});

colorChangeButton.addEventListener('click', () => {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
    clickerButton.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
});

function changeBackground(backgroundClass) {
    body.className = ''; // Очистить текущий класс
    body.classList.add(backgroundClass); // Добавить новый класс фона
    backgroundSelector.classList.remove('show');
}
