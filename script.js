// 关卡状态管理
const levels = {
  naruto: { completed: false },
  genshin: { completed: false },
  cs2: { completed: false },
  delta: { completed: false },
  terraria: { completed: false }
};

// 按需加载背景图（防卡顿）
function loadBackgroundWhenVisible() {
  const sections = document.querySelectorAll('.level-section[data-bg]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const bg = section.getAttribute('data-bg');
        if (bg && !section.style.backgroundImage) {
          section.style.backgroundImage = `url('${bg}')`;
          observer.unobserve(section);
        }
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
}

// 解锁下一关
function unlockNextLevel(currentLevel) {
  const levelOrder = ['naruto', 'genshin', 'cs2', 'delta', 'terraria'];
  const currentIndex = levelOrder.indexOf(currentLevel);
  if (currentIndex !== -1 && currentIndex < levelOrder.length - 1) {
    const nextLevel = levelOrder[currentIndex + 1];
    const nextSection = document.getElementById(`${nextLevel}-section`);
    nextSection.setAttribute('data-unlocked', 'true');
    nextSection.querySelector('.start-btn').disabled = false;
    nextSection.querySelector('.start-btn').textContent = '开始挑战';
  }
}

// 完成关卡
function completeLevel(levelName) {
  levels[levelName].completed = true;
  const section = document.getElementById(`${levelName}-section`);
  section.classList.add('completed');

  // 显示通关提示（可选）
  const gameDiv = section.querySelector('.challenge-game');
  const descDiv = section.querySelector('.challenge-desc');
  if (gameDiv) gameDiv.classList.add('hidden');
  if (descDiv) descDiv.innerHTML = '<p style="color:#00ff00;">✅ 挑战成功！</p>';

  unlockNextLevel(levelName);

  // 检查是否全通关
  const allCompleted = Object.values(levels).every(l => l.completed);
  if (allCompleted) {
    document.getElementById('award-message').classList.remove('hidden');
  }
}

// ===== 第一关：火影连打 =====
document.querySelector('#naruto-section .start-btn').addEventListener('click', () => {
  document.querySelector('#naruto-section .challenge-desc').classList.add('hidden');
  document.querySelector('#naruto-section .challenge-game').classList.remove('hidden');
});

let narutoCount = 0;
document.getElementById('naruto-btn').addEventListener('click', () => {
  narutoCount++;
  document.getElementById('naruto-counter').textContent = `连打: ${narutoCount} / 20`;
  if (narutoCount >= 20) {
    completeLevel('naruto');
  }
});

// ===== 第二关：原神滑动 =====
document.querySelector('#genshin-section .start-btn').addEventListener('click', () => {
  document.querySelector('#genshin-section .challenge-desc').classList.add('hidden');
  document.querySelector('#genshin-section .challenge-game').classList.remove('hidden');
});

let genshinCount = 0;
document.getElementById('genshin-area').addEventListener('click', () => {
  genshinCount++;
  document.getElementById('genshin-counter').textContent = `已收集: ${genshinCount} / 5`;
  if (genshinCount >= 5) {
    completeLevel('genshin');
  }
});

// ===== 第三关：CS2 摇晃 =====
document.querySelector('#cs2-section .start-btn').addEventListener('click', () => {
  document.querySelector('#cs2-section .challenge-desc').classList.add('hidden');
  document.querySelector('#cs2-section .challenge-game').classList.remove('hidden');
});

let cs2Count = 0;
const updateCS2 = () => {
  cs2Count++;
  document.getElementById('cs2-shake').textContent = `颠簸: ${cs2Count} / 10`;
  if (cs2Count >= 10) {
    completeLevel('cs2');
  }
};

// 手机摇晃事件
window.addEventListener('devicemotion', (e) => {
  if (e.accelerationIncludingGravity) {
    const acc = e.accelerationIncludingGravity;
    const force = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);
    if (force > 20) updateCS2();
  }
});

// PC 模拟按钮
document.getElementById('cs2-simulate').addEventListener('click', updateCS2);

// ===== 第四关：三角洲点击 =====
document.querySelector('#delta-section .start-btn').addEventListener('click', () => {
  document.querySelector('#delta-section .challenge-desc').classList.add('hidden');
  document.querySelector('#delta-section .challenge-game').classList.remove('hidden');
});

let deltaCount = 0;
document.getElementById('delta-btn').addEventListener('click', () => {
  deltaCount++;
  document.getElementById('delta-counter').textContent = `点击: ${deltaCount} / 10`;
  if (deltaCount >= 10) {
    completeLevel('delta');
  }
});

// ===== 第五关：泰拉瑞亚长按 =====
document.querySelector('#terraria-section .start-btn').addEventListener('click', () => {
  document.querySelector('#terraria-section .challenge-desc').classList.add('hidden');
  document.querySelector('#terraria-section .challenge-game').classList.remove('hidden');
});

let pressTimer = null;
document.getElementById('terraria-btn').addEventListener('mousedown', () => {
  let progress = 0;
  pressTimer = setInterval(() => {
    progress += 2;
    document.getElementById('terraria-progress').style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(pressTimer);
      completeLevel('terraria');
    }
  }, 10);
});

document.getElementById('terraria-btn').addEventListener('mouseup', () => {
  clearInterval(pressTimer);
  document.getElementById('terraria-progress').style.width = '0%';
});
document.getElementById('terraria-btn').addEventListener('mouseleave', () => {
  clearInterval(pressTimer);
  document.getElementById('terraria-progress').style.width = '0%';
});

// 触屏设备支持
document.getElementById('terraria-btn').addEventListener('touchstart', (e) => {
  e.preventDefault();
  let progress = 0;
  pressTimer = setInterval(() => {
    progress += 2;
    document.getElementById('terraria-progress').style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(pressTimer);
      completeLevel('terraria');
    }
  }, 10);
});
document.getElementById('terraria-btn').addEventListener('touchend', () => {
  clearInterval(pressTimer);
  document.getElementById('terraria-progress').style.width = '0%';
});

// ===== 重新开始功能 =====
document.getElementById('restart-btn').addEventListener('click', () => {
  const levelKeys = ['naruto', 'genshin', 'cs2', 'delta', 'terraria'];
  levelKeys.forEach(key => {
    levels[key].completed = false;
    const section = document.getElementById(`${key}-section`);
    section.querySelector('.challenge-game')?.classList.add('hidden');
    section.querySelector('.challenge-desc')?.classList.remove('hidden');
    section.classList.remove('completed', 'unlocked');
    
    const btn = section.querySelector('.start-btn');
    if (key === 'naruto') {
      btn.disabled = false;
      btn.textContent = '开始挑战';
    } else {
      btn.disabled = true;
      btn.textContent = '🔒 请先完成上一关';
    }
  });

  document.getElementById('award-message').classList.add('hidden');
  document.getElementById('naruto-section').scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  loadBackgroundWhenVisible();
});
