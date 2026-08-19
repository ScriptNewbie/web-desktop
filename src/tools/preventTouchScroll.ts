const preventTouchScroll = (): (() => void) => {
  const preventTouchMove = (event: TouchEvent) => {
    // Prevent page refresh during touch input
    event.preventDefault();
  };

  document.addEventListener("touchmove", preventTouchMove, { passive: false });

  // Clean up the event listener
  return () => {
    document.removeEventListener("touchmove", preventTouchMove);
  };
};

export default preventTouchScroll;
