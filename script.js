// 屏幕元素
const screens = {
    start: document.getElementById('start-screen'),
    delta: document.getElementById('delta-screen'),
    cs2: document.getElementById('cs2-screen'),
    terraria: document.getElementById('terraria-screen'),
    naruto: document.getElementById('naruto-screen'),
    genshin: document.getElementById('genshin-screen'),
    award: document.getElementById('award-screen')
};

// 按钮和计数器
const deltaBtn = document.getElementById('delta-btn');
const deltaCounter = document.getElementById('delta-counter');
const cs2Shake = document.getElementById('cs2-shake');
const terrariaBtn = document.getElementById('terraria-btn');
const terrariaProgress = document.getElementById('terraria-progress');
const narutoBtn = document.getElementById('naruto-btn');
const narutoCounter = document.getElementById('naruto-counter');
const genshinArea = document.getElementById('genshin-area');
const genshinCounter = document.getElementById('genshin-counter');

// 游戏状态
let gameState = {
    deltaClicks: 0,
    cs2Shakes: 0,
    terrariaHeld: 0,
    narutoClicks: 0,
    genshinSwipes: 0
};

// 开始游戏
function startGame() {
    screens.start.classList.add('hidden');
    screens.delta.classList.remove('hidden');
}

// === 三角洲：快速点击 ===
deltaBtn.addEventListener('click', () => {
    gameState.deltaClicks++;
    deltaCounter.textContent = `点击数: ${gameState.deltaClicks}`;
    if (gameState.deltaClicks >= 10) {
        setTimeout(() => {
            screens.delta.classList.add('hidden');
            screens.cs2.classList.remove('hidden');
            startCS2Shake();
        }, 300);
    }
});

// === CS2：摇一摇 ===
let lastX = 0, lastY = 0, lastZ = 0;
function startCS2Shake() {
    window.addEventListener('devicemotion', handleCS2Shake);
}

function handleCS2Shake(event) {
    const { x, y, z } = event.accelerationIncludingGravity;
    const dx = Math.abs(x - lastX);
    const dy = Math.abs(y - lastY);
    const dz = Math.abs(z - lastZ);

    if (dx > 10 || dy > 10 || dz > 15) {
        gameState.cs2Shakes++;
        cs2Shake.textContent = `颠簸: ${gameState.cs2Shakes}/10`;
        if (navigator.vibrate) navigator.vibrate(50);
    }

    lastX = x; lastY = y; lastZ = z;

    if (gameState.cs2Shakes >= 10) {
        window.removeEventListener('devicemotion', handleCS2Shake);
        screens.cs2.classList.add('hidden');
        screens.terraria.classList.remove('hidden');
    }
}

// === 泰拉瑞亚：长按 ===
let terrariaInterval = null;
terrariaBtn.addEventListener('mousedown', startTerrariaHold);
terrariaBtn.addEventListener('touchstart', startTerrariaHold);

function startTerrariaHold(e) {
    e.preventDefault();
    gameState.terrariaHeld = 0;
    terrariaProgress.style.width = '0%';
    
    terrariaInterval = setInterval(() => {
        gameState.terrariaHeld += 1;
        terrariaProgress.style.width = (gameState.terrariaHeld * 20) + '%';
        
        if (gameState.terrariaHeld >= 5) {
            clearInterval(terrariaInterval);
            screens.terraria.classList.add('hidden');
            screens.naruto.classList.remove('hidden');
        }
    }, 100);
}

// 停止长按
window.addEventListener('mouseup', () => { if (terrariaInterval) clearInterval(terrariaInterval); });
window.addEventListener('touchend', () => { if (terrariaInterval) clearInterval(terrariaInterval); });

// === 火影：连打 ===
narutoBtn.addEventListener('click', () => {
    gameState.narutoClicks++;
    narutoCounter.textContent = `连打: ${gameState.narutoClicks}/20`;
    if (gameState.narutoClicks >= 20) {
        screens.naruto.classList.add('hidden');
        screens.genshin.classList.remove('hidden');
        setupGenshinSwipe();
    }
});

// === 原神：滑动 ===
let isTouching = false;
function setupGenshinSwipe() {
    genshinArea.addEventListener('touchstart', () => isTouching = true);
    genshinArea.addEventListener('touchend', handleSwipe);
    genshinArea.addEventListener('touchcancel', () => isTouching = false);
    
    // PC 鼠标模拟（可选）
    genshinArea.addEventListener('mousedown', () => isTouching = true);
    genshinArea.addEventListener('mouseup', handleSwipe);
}

function handleSwipe() {
    if (isTouching) {
        isTouching = false;
        gameState.genshinSwipes++;
        genshinCounter.textContent = `已收集: ${gameState.genshinSwipes}/5`;
        if (gameState.genshinSwipes >= 5) {
            screens.genshin.classList.add('hidden');
            screens.award.classList.remove('hidden');
        }
    }
}