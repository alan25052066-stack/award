// script.js

// 工具函数：跳转页面
function goToPage(page) {
  window.location.href = page;
}

// 第一关：火影连打
if (document.getElementById('naruto-btn')) {
  let count = 0;
  const btn = document.getElementById('naruto-btn');
  const counter = document.getElementById('naruto-counter');
  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn';
  nextBtn.textContent = '前往原神世界';
  nextBtn.onclick = () => goToPage('genshin-challenge.html');

  btn.addEventListener('click', () => {
    count++;
    counter.textContent = `连打: ${count} / 20`;
    if (count >= 20) {
      btn.disabled = true;
      btn.textContent = '完成！';
      document.querySelector('.challenge-game').appendChild(nextBtn);
    }
  });
}

// 第二关：原神滑动（简化为点击模拟）
if (document.getElementById('genshin-area')) {
  let collected = 0;
  const area = document.getElementById('genshin-area');
  const counter = document.getElementById('genshin-counter');
  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn';
  nextBtn.textContent = '进入反恐行动';
  nextBtn.onclick = () => goToPage('cs2-challenge.html');

  area.addEventListener('click', () => {
    if (collected < 5) {
      collected++;
      counter.textContent = `已收集: ${collected} / 5`;
      if (collected === 5) {
        area.style.background = 'rgba(0, 255, 0, 0.3)';
        document.querySelector('.challenge-game').appendChild(nextBtn);
      }
    }
  });
}

// 第三关：CS2 摇晃（PC 点击模拟）
if (document.getElementById('cs2-simulate')) {
  let shakes = 0;
  const display = document.getElementById('cs2-shake');
  const simulateBtn = document.getElementById('cs2-simulate');
  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn';
  nextBtn.textContent = '执行三角洲行动';
  nextBtn.onclick = () => goToPage('delta-challenge.html');

  simulateBtn.addEventListener('click', () => {
    shakes++;
    display.textContent = `颠簸: ${shakes} / 10`;
    if (shakes >= 10) {
      simulateBtn.disabled = true;
      document.querySelector('.challenge-game').appendChild(nextBtn);
    }
  });

  // 手机摇晃支持（可选）
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', (e) => {
      if (e.accelerationIncludingGravity) {
        const acc = e.accelerationIncludingGravity;
        const total = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);
        if (total > 15 && shakes < 10) {
          shakes++;
          display.textContent = `颠簸: ${shakes} / 10`;
          if (shakes >= 10) {
            document.querySelector('.challenge-game').appendChild(nextBtn);
          }
        }
      }
    });
  }
}

// 第四关：三角洲快速点击
if (document.getElementById('delta-btn')) {
  let clicks = 0;
  const btn = document.getElementById('delta-btn');
  const counter = document.getElementById('delta-counter');
  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn';
  nextBtn.textContent = '进入泰拉瑞亚';
  nextBtn.onclick = () => goToPage('terraria-challenge.html');

  btn.addEventListener('click', () => {
    clicks++;
    counter.textContent = `点击: ${clicks} / 10`;
    if (clicks >= 10) {
      btn.disabled = true;
      document.querySelector('.challenge-game').appendChild(nextBtn);
    }
  });
}

// 第五关：泰拉瑞亚长按
if (document.getElementById('terraria-btn')) {
  let isHolding = false;
  let progress = 0;
  const btn = document.getElementById('terraria-btn');
  const progressBar = document.getElementById('terraria-progress');
  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn';
  nextBtn.textContent = '参加颁奖典礼';
  nextBtn.onclick = () => goToPage('award-ceremony.html');

  btn.addEventListener('mousedown', () => {
    isHolding = true;
    const interval = setInterval(() => {
      if (isHolding && progress < 100) {
        progress += 5;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
          clearInterval(interval);
          document.querySelector('.challenge-game').appendChild(nextBtn);
        }
      }
    }, 50);
    btn.onmouseup = btn.onmouseleave = () => {
      isHolding = false;
      clearInterval(interval);
    };
  });

  // 移动端 touch 支持
  btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isHolding = true;
    const interval = setInterval(() => {
      if (isHolding && progress < 100) {
        progress += 5;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
          clearInterval(interval);
          document.querySelector('.challenge-game').appendChild(nextBtn);
        }
      }
    }, 50);
  });
  btn.addEventListener('touchend', () => {
    isHolding = false;
  });
}

// 首页开始按钮
if (document.getElementById('start-btn')) {
  document.getElementById('start-btn').addEventListener('click', () => {
    goToPage('naruto-challenge.html');
  });
}

// 重新开始
if (document.getElementById('restart-btn')) {
  document.getElementById('restart-btn').addEventListener('click', () => {
    goToPage('index.html');
  });
}
