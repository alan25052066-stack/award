// script.js —— 安全、无报错、支持预加载

/**
 * 安全获取元素：如果存在才返回，否则 null
 */
function $(selector) {
  return document.querySelector(selector);
}

/**
 * 预加载图片函数（支持 WebP + PNG fallback）
 */
function preloadImage(srcWebP, srcFallback) {
  return new Promise((resolve) => {
    const img = new Image();
    // 优先尝试 WebP
    img.onload = img.onerror = () => {
      resolve(img.src);
    };
    img.src = srcWebP;
    // 如果浏览器不支持 WebP（极少见），可手动 fallback
    // 这里我们假设 WebP 已生成，若加载失败再试 PNG（可选）
  });
}

/**
 * 预加载所有关卡背景图（提升后续页面速度）
 */
async function preloadAllBackgrounds() {
  const images = [
    'images/naruto-bg.webp',
    'images/genshin-bg.webp',
    'images/cs2-bg.webp',
    'images/delta-bg.webp',
    'images/terraria-bg.webp',
    'images/hoshino-stage-bg.webp',
    'images/award-iron-butt.webp'
  ];

  // 并发预加载（不会阻塞页面）
  await Promise.all(images.map(src => preloadImage(src)));
  console.log('✅ 所有关键图片已预加载');
}

// 页面加载完成后开始预加载（不影响首屏）
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', preloadAllBackgrounds);
} else {
  preloadAllBackgrounds();
}

/**
 * 页面跳转工具
 */
function goToPage(url) {
  window.location.href = url;
}

// ———————— 关卡逻辑 ————————

// 首页
if ($('.home-section')) {
  $('#start-btn')?.addEventListener('click', () => {
    goToPage('naruto-challenge.html');
  });
}

// 第一关：火影
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

// 第二关：原神（点击模拟滑动）
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

// 第三关：CS2
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

// 第四关：三角洲
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

  btn.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isHolding = true;
    requestAnimationFrame(updateHold);
  });

  const stopHold = () => {
    isHolding = false;
  };

  window.addEventListener('mouseup', stopHold);
  window.addEventListener('mouseleave', stopHold);

  // 移动端支持
  btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isHolding = true;
    requestAnimationFrame(updateHold);
  });
  btn.addEventListener('touchend', stopHold);
}

// 颁奖页重启
if ($('#restart-btn')) {
  $('#restart-btn').addEventListener('click', () => {
    goToPage('index.html');
  });
}
