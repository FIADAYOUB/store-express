/** Dispatch event on click outside of node */
export function clickOutside(node) {
  const handleClick = event => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('click_outside', node)
      )
    }
  }

	document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
	}
}

export function ripple(node) {
  function addRipple(event) {
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const width = event.target.offsetWidth;
    const height = event.target.offsetHeight;
    const max = Math.max(width, height)

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.height = ripple.style.width = `${max}px`;

    node.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  node.addEventListener('click', addRipple);

  return {
    destroy() {
      node.removeEventListener('click', addRipple);
    },
  };
}
