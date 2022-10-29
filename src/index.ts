import { ControlledBody, Renderer, loadImages, StaticBody } from "./library";
import playerLeftImg from "./img/dragon.png";
import playerRightImg from "./img/dragon-flipped.png";

const renderer = new Renderer();
renderer
  .mount(document.body)
  .enableFixedPosition()
  .enablePixelated()
  .enablePhysics({});

const images = await loadImages(
  {
    playerLeft: playerLeftImg,
    playerRight: playerRightImg,
  },
  (loaded, total) => console.log("Image progress:", (loaded / total) * 100, "%")
);

const player = new ControlledBody({
  x: 30,
  y: 30,
  width: 30,
  height: 30,
  image: images.playerLeft,
  layer: 1,
  update: (self) => {
    if (self.v.x < 0) {
      self.image = images.playerLeft;
    } else if (self.v.x > 0) {
      self.image = images.playerRight;
    }
  },
});
player.bindKeyboardControls({});
renderer.add(player);

const body = renderer.add(
  new StaticBody({ x: 0, y: 500, width: 300, height: 100, color: "black" })
);

let dragging = false,
  dragStart = { x: 0, y: 0 },
  dragEnd = { x: 0, y: 0 };

renderer.addEventListener("mousedown", ({ clientX, clientY }) => {
  dragging = true;
  dragStart = dragEnd = { x: clientX, y: clientY };
});

window.addEventListener("mousemove", ({ clientX, clientY }) => {
  if (dragging) {
    dragEnd = { x: clientX, y: clientY };
  }
});

window.addEventListener("mouseup", ({ clientX, clientY }) => {
  if (dragging) {
    dragEnd = { x: clientX, y: clientY };
    dragging = false;
    dragging = false;
    const x =
      Math.min(dragStart.x, dragEnd.x) + Math.abs(dragEnd.x - dragStart.x) / 2;
    const y =
      Math.min(dragStart.y, dragEnd.y) + Math.abs(dragEnd.y - dragStart.y) / 2;
    const width = Math.abs(dragEnd.x - dragStart.x);
    const height = Math.abs(dragEnd.y - dragStart.y);

    renderer.add(new StaticBody({ x, y, width, height, color: "black" }));
  }
});

const animationLoop = () => {
  renderer.update();
  renderer.render();

  if (dragging) {
    renderer.ctx.fillStyle = "blue";
    renderer.ctx.fillRect(
      dragStart.x,
      dragStart.y,
      dragEnd.x - dragStart.x,
      dragEnd.y - dragStart.y
    );
  }

  requestAnimationFrame(animationLoop);
};

requestAnimationFrame(animationLoop);
