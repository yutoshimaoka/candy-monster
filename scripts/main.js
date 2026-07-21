/*
 * トップページの挙動
 * イベントは document 単位の委譲で1箇所に集約し、重複登録を避ける
 */

const SELECTOR = {
  drawerToggle: '.header__toggle',
  drawer: '.header__drawer',
  drawerLink: '.header__drawer-link',
  tryButton: '.try-card__button',
};

/** ドロワーの開閉状態を反映する */
function setDrawerState(toggle, drawer, isOpen) {
  toggle.setAttribute('aria-expanded', String(isOpen));
  drawer.hidden = !isOpen;
  toggle.querySelector('.visually-hidden').textContent = isOpen
    ? 'メニューを閉じる'
    : 'メニューを開く';
}

function closeDrawer() {
  const toggle = document.querySelector(SELECTOR.drawerToggle);
  const drawer = document.querySelector(SELECTOR.drawer);
  if (!toggle || !drawer || toggle.getAttribute('aria-expanded') !== 'true') return;
  setDrawerState(toggle, drawer, false);
}

/** クリックの委譲。対象が増えてもこの1箇所だけを更新する */
function handleClick(event) {
  const toggle = event.target.closest(SELECTOR.drawerToggle);
  if (toggle) {
    const drawer = document.querySelector(SELECTOR.drawer);
    if (drawer) {
      setDrawerState(toggle, drawer, toggle.getAttribute('aria-expanded') !== 'true');
    }
    return;
  }

  // ドロワー内のリンクを押したら閉じる（同一ページ内リンクのため）
  if (event.target.closest(SELECTOR.drawerLink)) {
    closeDrawer();
    return;
  }

  const tryButton = event.target.closest(SELECTOR.tryButton);
  if (tryButton) {
    const isPressed = tryButton.getAttribute('aria-pressed') === 'true';
    tryButton.setAttribute('aria-pressed', String(!isPressed));
    return;
  }

  // ドロワーの外側を押したら閉じる
  if (!event.target.closest(SELECTOR.drawer)) {
    closeDrawer();
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeDrawer();
  }
}

document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeydown);
