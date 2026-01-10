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

// 解锁下一关并跳转
function unlockAndScrollToNextLevel(currentLevel) {
  const levelOrder = ['naruto', 'genshin', 'cs2', 'delta', 'terraria'];
  const currentIndex = levelOrder.indexOf(currentLevel);
  if (currentIndex !== -1 && currentIndex < levelOrder.length - 1) {
    const nextLevel = levelOrder[currentIndex + 1];
    const nextSection = document.getElementById(`${nextLevel}-section`);
    nextSection.setAttribute('data-unlocked', 'true');
    nextSection.querySelector('.start-btn').disabled = false;
    nextSection.querySelector('.start-btn').textContent = '开始挑战';
    nextSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    // 所有关卡完成，跳转到颁奖页面
    document.getElementById('final-award-section').scrollIntoView({ behavior: 'smooth' });
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

  unlockAndScrollToNextLevel(levelName);
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

// 其他关卡逻辑省略...

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
  document.getElementById('home-section').scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  loadBackgroundWhenVisible();
  
  // 处理首页开始按钮
  document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('naruto-section').scrollIntoView({ behavior: 'smooth' });
  });
});
