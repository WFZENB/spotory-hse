export function bindProfileModal(dialog) {
  const titleEl = dialog.querySelector('.profile-modal__title');
  const bodyEl = dialog.querySelector('.profile-modal__body');
  const closeBtn = dialog.querySelector('.profile-modal__close');

  if (!titleEl || !bodyEl || !closeBtn) {
    return null;
  }

  const close = () => {
    if (dialog.open) {
      dialog.close();
    }
  };

  closeBtn.addEventListener('click', close);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      close();
    }
  });

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });

  const open = (title, content) => {
    titleEl.textContent = title;
    bodyEl.replaceChildren();
    bodyEl.append(content);
    if (!dialog.open) {
      dialog.showModal();
    }
  };

  return { open, close };
}
