// script.js - 铁腚奖挑战系统
document.addEventListener('DOMContentLoaded', () => {
  // 关卡状态
  const levels = {
    naruto: { completed: false, next: 'genshin' },
    genshin: { completed: false, next: 'cs2' },
    cs2: { completed: false, next: 'delta' },
    delta: { completed: false, next: 'terraria' },
    terraria: { completed: false, next: 'award' }
  };

  // 初始化：绑定“开始挑战”按钮
  document.querySelectorAll('.start-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.level-section');
      section.querySelector('.challenge-desc').classList.add('hidden');
      section.querySelector('.challenge-game').classList.remove('hidden');
      
      // 根据关卡类型启动对应游戏
      if (index === 0) startNaruto();
      else if (index === 1) startGenshin();
      else if (index === 2) startCS2();
      else if (index === 3) startDelta();
      else if (index === 4) startTerraria();
    });
  });

  // ===== 火影：连打 =====
  let narutoClicks = 0;
  function startNaruto() {
    const btn = document.getElementById('naruto-btn');
    const counter = document.getElementById('naruto-counter');
    narutoClicks = 0;
    btn.onclick = () => {
      narutoClicks++;
      counter.textContent = `连打: ${narutoClicks} / 20`;
      if (narutoClicks >= 20) {
        completeLevel('naruto');
      }
    };
  }

  // ===== 原神：滑动 =====
  let genshinSwipes = 0;
  function startGenshin() {
    const area = document.getElementById('genshin-area');
    const counter = document.getElementById('genshin-counter');
    genshinSwipes = 0;
    
    const handleSwipe = () => {
      genshinSwipes++;
      counter.textContent = `已收集: ${genshinSwipes} / 5`;
      if (genshinSwipes >= 5) {
        completeLevel('genshin');
      }
    };
    
    area.addEventListener('click', handleSwipe);
    area.addEventListener('touchstart', handleSwipe);
  }

  // ===== CS2：摇晃（含PC模拟） =====
  let cs2Shakes = 0;
  function startCS2() {
    const counter = document.getElementById('cs2-shake');
    const simulateBtn = document.getElementById('cs2-simulate');
    cs2Shakes = 0;
    
    // 手机摇晃
    const handleMotion = (e) => {
      if (!e.accelerationIncludingGravity) return;
      const { x, y, z } = e.accelerationIncludingGravity;
      if (Math.abs(x) > 8 || Math.abs(y) > 8 || Math.abs(z) > 12) {
        addShake();
      }
    };
    
    // PC模拟按钮
    simulateBtn.onclick = addShake;
    
    // 添加一次摇晃
    function addShake() {
      cs2Shakes++;
      counter.textContent = `颠簸: ${cs2Shakes} / 10`;
      if (navigator.vibrate) navigator.vibrate(50);
      if (cs2Shakes >= 10) {
        window.removeEventListener('devicemotion', handleMotion);
        completeLevel('cs2');
      }
    }
    
    window.addEventListener('devicemotion', handleMotion);
  }

  // ===== 三角洲：快速点击 =====
  let deltaClicks = 0;
  function startDelta() {
    const btn = document.getElementById('delta-btn');
    const counter = document.getElementById('delta-counter');
    deltaClicks = 0;
    btn.onclick = () => {
      deltaClicks++;
      counter.textContent = `点击: ${deltaClicks} / 10`;
      if (deltaClicks >= 10) {
        completeLevel('delta');
      }
    };
  }

  // ===== 泰拉瑞亚：长按 =====
  let terrariaInterval = null;
  function startTerraria() {
    const btn = document.getElementById('terraria-btn');
    const progress = document.getElementById('terraria-progress');
    
    const startHold = (e) => {
      e.preventDefault();
      let held = 0;
      progress.style.width = '0%';
      terrariaInterval = setInterval(() => {
        held += 1;
        progress.style.width = (held * 20) + '%';
        if (held >= 5) {
          clearInterval(terrariaInterval);
          completeLevel('terraria');
        }
      }, 100);
    };
    
    const stopHold = () => {
      if (terrariaInterval) clearInterval(terrariaInterval);
    };
    
    btn.addEventListener('mousedown', startHold);
    btn.addEventListener('touchstart', startHold);
    window.addEventListener('mouseup', stopHold);
    window.addEventListener('touchend', stopHold);
  }

  // ===== 通用：完成关卡 =====
  function completeLevel(levelKey) {
    levels[levelKey].completed = true;
    const section = document.getElementById(`${levelKey}-section`);
    section.classList.add('completed');
    
    // 解锁下一关
    const nextKey = levels[levelKey].next;
    if (nextKey === 'award') {
      // 显示颁奖区
      document.getElementById('award-message').classList.remove('hidden');
      document.getElementById('final-award-section').scrollIntoView({ behavior: 'smooth' });
    } else {
      const nextSection = document.getElementById(`${nextKey}-section`);
      nextSection.classList.add('unlocked');
      nextSection.querySelector('.start-btn').disabled = false;
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});
