const items = document.querySelectorAll(".menu li");
let currentIndex = 0;

function updateActive() {
  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentIndex);
  });
}

// Симуляция прокрутки колесом (временно стрелками)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    currentIndex = (currentIndex + 1) % items.length;
    updateActive();
  } else if (e.key === "ArrowUp") {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateActive();
  } else if (e.key === "Enter") {
    alert(`Вы выбрали: ${items[currentIndex].textContent}`);
  }
});

updateActive();