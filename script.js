// script.js —— 安全、无报错、预加载 PNG 图片

function $(selector) {
  return document.querySelector(selector);
}

// 预加载所有关键 PNG 图片（根目录）
async function preloadAllImages() {
  const files = [
    'naruto-bg.png',
    'genshin-bg.png',
    'cs2-bg.png',
    'delta-bg.png',
    'terraria-bg.png',
    'hoshino-stage-bg.png',
    'award-iron-butt.png'
  ];

  await Promise.all(files.map(file => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = img.onerror = resolve;
      img.src = file;
    });
  }));
  console.log('✅ 所有 PNG 图片已预加载');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', preloadAllImages);
} else {
  preloadAllImages();
}

function goToPage(url) {
  window.location.href = url;
}

// ========== 关卡逻辑 ==========

// 首页
if ($('.home-section')) {
  $('#start-btn')?.addEventListener('click', () => goToPage('naruto-challenge.html'));
}

// 第一关：火影（连打20次）
if ($('#naruto-btn')) {
  let count = 0;
  const btn = $('#naruto-btn');
  const counter = $('#naruto-counter');
  btn.addEventListener('click', () => {
    count++;
    counter.textContent = `连打: ${count} / 20`;
    if (count >= 20) {
      btn.disabled = true;
      btn.textContent = '完成！';
      const next = document.createElement('button');
      next.className = 'btn';
      next.textContent = '前往原神世界';
      next.onclick = () => goToPage('genshin-challenge.html');
      btn.parentNode.appendChild(next);
    }
  });
}

// 第二关：原神（点击5次）
if ($('#genshin-area')) {
  let collected = 0;
  const area = $('#genshin-area');
  const counter = $('#genshin-counter');
  area.addEventListener('click', () => {
    if (collected < 5) {
      collected++;
      counter.textContent = `已收集: ${collected} / 5`;
      if (collected === 5) {
        const next = document.createElement('button');
        next.className = 'btn';
        next.textContent = '进入反恐行动';
        next.onclick = () => goToPage('cs2-challenge.html');
        area.parentNode.appendChild(next);
      }
    }
  });
}

// 第三关：CS2（点10次）
if ($('#cs2-simulate')) {
  let shakes = 0;
  const display = $('#cs2-shake');
  const btn = $('#cs2-simulate');
  btn.addEventListener('click', () => {
    shakes++;
    display.textContent = `颠簸: ${shakes} / 10`;
    if (shakes >= 10) {
      btn.disabled = true;
      const next = document.createElement('button');
      next.className = 'btn';
      next.textContent = '执行三角洲行动';
      next.onclick = () => goToPage('delta-challenge.html');
      btn.parentNode.appendChild(next);
    }
  });
}

// 第四关：三角洲（点10次）
if ($('#delta-btn')) {
  let clicks = 0;
  const btn = $('#delta-btn');
  const counter = $('#delta-counter');
  btn.addEventListener('click', () => {
    clicks++;
    counter.textContent = `点击: ${clicks} / 10`;
    if (clicks >= 10) {
      btn.disabled = true;
      const next = document.createElement('button');
      next.className = 'btn';
      next.textContent = '进入泰拉瑞亚';
      next.onclick = () => goToPage('terraria-challenge.html');
      btn.parentNode.appendChild(next);
    }
  });
}

// 第五关：泰拉瑞亚（长按）
if ($('#terraria-btn')) {
  let isHolding = false;
  let progress = 0;
  const btn = $('#terraria-btn');
  const bar = $('#terraria-progress');

  const updateHold = () => {
    if (isHolding && progress < 100) {
      progress += 4;
      bar.style.width = `${Math.min(progress, 100)}%`;
      if (progress >= 100) {
        const next = document.createElement('button');
        next.className = 'btn';
        next.textContent = '参加颁奖典礼';
        next.onclick = () => goToPage('award-ceremony.html');
        bar.parentNode.appendChild(next);
      } else {
        requestAnimationFrame(updateHold);
      }
    }
  };

  btn.addEventListener('mousedown', e => {
    e.preventDefault();
    isHolding = true;
    requestAnimationFrame(updateHold);
  });

  const stopHold = () => { isHolding = false; };
  window.addEventListener('mouseup', stopHold);
  window.addEventListener('mouseleave', stopHold);
  btn.addEventListener('touchstart', e => {
    e.preventDefault();
    isHolding = true;
    requestAnimationFrame(updateHold);
  });
  btn.addEventListener('touchend', stopHold);
}

// 颁奖页重启
if ($('#restart-btn')) {
  $('#restart-btn')?.addEventListener('click', () => goToPage('index.html'));
}
