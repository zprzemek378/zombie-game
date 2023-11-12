addEventListener("mousemove", (e) => {
  moveCrosshair(e);
});

addEventListener("resize", () => {
  resizeStuff();
});

addEventListener("load", (e) => {
  resizeStuff();
});

const resizeStuff = () => {
  const newSize = document.getElementById("backgroundPhoto").offsetWidth;

  const newHeight = document.getElementById("backgroundPhoto").offsetHeight;

  // resize background div
  const photoContainer = document.getElementById("photoContainer");
  photoContainer.style.width = `${newSize}px`;
  photoContainer.style.height = `${newHeight}px`;

  // resize crosshair
  const crosshair = document.getElementById("crosshair");

  crosshair.style.width = `${newSize / 4}px`;
  crosshair.style.height = `${newSize / 4}px`;

  // resize hearts
  const hearts = document.querySelectorAll(".heart");

  hearts.forEach((heart) => {
    heart.style.width = `${newSize / 15}px`;
    heart.style.height = `${newSize / 15}px`;
  });
};

const moveCrosshair = (e) => {
  const crosshair = document.getElementById("crosshair");

  crosshair.style.left = `${e.clientX}px`;
  crosshair.style.top = `${e.clientY}px`;
};
