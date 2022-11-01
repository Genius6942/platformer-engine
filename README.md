# platjs

### A simple engine for platformer games and rendering

---

# Installation:

### npm install

```
npm install platjs
```

```js
import * as plat from "platjs";
```

### script tag

```html
<script src="https://cdn.jsdelivr.net/npm/platjs"></script>
```

# Use:

```js
const { Renderer, ControlledBody, StaticBody } = plat;

// Create a renderer
// This handles physics and rendering for you.
const renderer = new Renderer()
  .mount(document.body)
  .enableFixedPosition()
  .enablePhysics({});

// Create a player
// Giving it a "color" property will make it render as that color.
const player = new ControlledBody({
  x: 30,
  y: 30,
  width: 30,
  height: 30,
  layer: 1,
  color: "blue",
});

// Add the player to the renderer's list of objects to draw / update
renderer.add(player);

// enable keyboard controls
player.bindKeyboardControls({});

// lock the camera to the player (player stays at center of the screen)
renderer.camera.lock(player);

// create a body for the player to land / jump on
renderer.add(
  new StaticBody({ x: 0, y: 500, width: 300, height: 100, color: "black" })
);

// rendering loop
const animationLoop = () => {
  // update physics
  renderer.update();

  // respawn player if needed
  if (player.y - player.height / 2 > renderer.height) {
    player.v.y = 0;
    player.v.x = 0;
    player.x = 30;
    player.y = 30;
  }

  // draw everything
  renderer.render();

  requestAnimationFrame(animationLoop);
};

requestAnimationFrame(animationLoop);
```
