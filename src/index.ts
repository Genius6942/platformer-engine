import { ControlledBody, Renderer, loadImages, StaticBody } from "../library";
// @ts-ignore
import playerLeftImg from "./img/dragon.png";
// @ts-ignore
import playerRightImg from "./img/dragon-flipped.png";

const renderer = new Renderer();
renderer
  .mount(document.body)
  .enableFixedPosition()
  .enablePixelated()
  .enablePhysics({});

loadImages(
  {
    playerLeft: playerLeftImg,
    playerRight: playerRightImg,
  },
  (loaded, total) => console.log("Image progress:", (loaded / total) * 100, "%")
).then((images) => {
  const player = new ControlledBody({
    x: 30,
    y: 30,
    width: 30,
    height: 30,
    image: images.playerLeft,
    layer: 1,
    wallJump: true,
    update: (self) => {
      if (
        (self.keys.a || self.keys.left) &&
        !(self.keys.d || self.keys.right)
      ) {
        self.image = images.playerLeft;
      } else if (
        !(self.keys.a || self.keys.left) &&
        (self.keys.d || self.keys.right)
      ) {
        self.image = images.playerRight;
      }
    },
  });
  player.bindKeyboardControls({ arrowKeys: false, spaceJump: false });
  renderer.add(player);
  renderer.camera.lock(player, { minXSpace: 300, minYSpace: 250 });

  const player2 = new ControlledBody({
    x: 70,
    y: 30,
    width: 30,
    height: 30,
    image: images.playerLeft,
    layer: 1,
    wallJump: true,
    mass: 2,
    update: (self) => {
      if (
        (self.keys.a || self.keys.left) &&
        !(self.keys.d || self.keys.right)
      ) {
        self.image = images.playerLeft;
      } else if (
        !(self.keys.a || self.keys.left) &&
        (self.keys.d || self.keys.right)
      ) {
        self.image = images.playerRight;
      }
    },
  });
  player2.bindKeyboardControls({ wasd: false, spaceJump: false });
  renderer.add(player2);
  renderer.camera.lock(player2, { minXSpace: 300, minYSpace: 250 });

  renderer.add(
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

      dragStart.x += -renderer.width / 2 + renderer.camera.pos.x;
      dragStart.y += -renderer.height / 2 + renderer.camera.pos.y;

      dragEnd.x += -renderer.width / 2 + renderer.camera.pos.x;
      dragEnd.y += -renderer.height / 2 + renderer.camera.pos.y;

      const x =
        Math.min(dragStart.x, dragEnd.x) +
        Math.abs(dragEnd.x - dragStart.x) / 2;
      const y =
        Math.min(dragStart.y, dragEnd.y) +
        Math.abs(dragEnd.y - dragStart.y) / 2;
      const width = Math.abs(dragEnd.x - dragStart.x);
      const height = Math.abs(dragEnd.y - dragStart.y);

      renderer.add(new StaticBody({ x, y, width, height, color: "black" }));
    }
  });

  const animationLoop = () => {
    renderer.update();
    if (player.y - player.height / 2 > renderer.height) {
      player.v.y = 0;
      player.v.x = 0;
      player.x = 30;
      player.y = 30;
    }
    if (player2.y - player2.height / 2 > renderer.height) {
      player2.v.y = 0;
      player2.v.x = 0;
      player2.x = 30;
      player2.y = 30;
    }

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
});
