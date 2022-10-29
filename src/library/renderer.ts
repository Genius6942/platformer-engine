import GameObject from "./object";
import PhysicalBody from "./physicalBody";
import StaticBody from "./staticBody";

class Renderer extends HTMLCanvasElement {
  ctx: CanvasRenderingContext2D;
  objects: GameObject[];
  physics?: { gravity: number };
  constructor() {
    super();

    this.resize();
    window.addEventListener("resize", () => this.resize());

    this.ctx = this.getContext("2d") as CanvasRenderingContext2D;

    this.objects = [];

    this.render = this.render.bind(this);
  }

  /**
   * Makes images not blur when scaled
   */
  enablePixelated() {
    // allow for pixelated look when scaling
    // @ts-ignore
    this.ctx.webkitImageSmoothingEnabled = false;
    // @ts-ignore
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
    return this;
  }

  enablePhysics({ gravity = .7 }) {
    this.physics = {
      gravity,
    };
  }

  enableFixedPosition() {
    this.style.position = "fixed";
    this.style.top = "0px";
    this.style.left = "0px";
    return this;
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  add(object: GameObject) {
    this.objects.push(object);
    return object;
  }

  destroy(item: GameObject | number) {
    if (typeof item === "number") {
      this.objects.filter((object) => object._randomId === item);
    } else {
      this.objects = this.objects.filter((object) => object !== item);
    }
  }

  /**
   * Mounts renderer to the dom
   */
  mount(container: HTMLElement) {
    container.appendChild(this);
    return this;
  }

  update(mulitplier = 1) {
    this.objects.forEach((object) => {
      if (this.physics) {
        if (object instanceof PhysicalBody) {
          object.v.y += this.physics.gravity;
          object.update(mulitplier);

          const { x: startX, y: startY } = object;

          object.x += object.v.x;
          object.y += object.v.y;

          const bigX = (startX + object.x) / 2;
          const bigY = (startY + object.y) / 2;
          const bigWidth = Math.abs(startX - object.x) + object.width;
          const bigHeight = Math.abs(startY - object.y) + object.height;

          const big = {
            x: bigX,
            y: bigY,
            width: bigWidth,
            height: bigHeight,
          };

          object.isOnBody = false;
          for (const body of this.objects) {
            if (body instanceof StaticBody) {
              if (body.collides(big)) {
                // if started above then on platform
                if (startY + object.height / 2 <= body.y - body.height / 2) {
                  object.y = body.y - body.height / 2 - object.height / 2;
                  object.v.y = 0;
                  object.isOnBody = true;
                } else if (
                  startY - object.height / 2 >=
                  body.y + body.height / 2
                ) {
                  object.y = body.y + body.height / 2 + object.height / 2;
                  object.v.y = 0;
                } else if (
                  startX + object.width / 2 <=
                  body.x - body.width / 2
                ) {
                  object.x = body.x - body.width / 2 - object.width / 2;
                  object.v.x = 0;
                } else if (
                  startX - object.width / 2 >=
                  body.x + body.width / 2
                ) {
                  object.x = body.x + body.width / 2 + object.width / 2;
                  object.v.x = 0;
                }
              }
            }
          }
        }
      }
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.objects
      .sort((a, b) => a.layer - b.layer)
      .forEach((object) => object._render(this.ctx));
  }
}

customElements.define("game-renderer", Renderer, { extends: "canvas" });

export default Renderer;
