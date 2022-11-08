import Camera from "./camera";
import ControlledBody from "./controlledBody";
import GameObject from "./object";
import PhysicalBody from "./physicalBody";
import StaticBody from "./staticBody";

class Renderer extends HTMLCanvasElement {
  ctx: CanvasRenderingContext2D;
  objects: GameObject[];
  physics?: { gravity: number };
  camera: Camera;
  forceNotInObject: boolean;
  private beforeRenderFuncs: (() => void)[];
  constructor() {
    super();

    this.resize();
    window.addEventListener("resize", () => this.resize());

    this.ctx = this.getContext("2d") as CanvasRenderingContext2D;

    this.objects = [];

    this.render = this.render.bind(this);

    this.camera = new Camera(this);

    this.forceNotInObject = true;

    this.beforeRenderFuncs = [];
  }

  beforeRender(func: () => void) {
    this.beforeRenderFuncs.push(func);
    return this;
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

  enablePhysics({ gravity = 0.7 }) {
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
          object.v.y += this.physics.gravity * mulitplier;
          object.update(mulitplier);

          const { x: startX, y: startY } = object;

          object.x += object.v.x * mulitplier;
          object.y += object.v.y * mulitplier;

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
          if (object instanceof ControlledBody) object.wallSide = 1;
          for (const body of this.objects) {
            if (
              (body instanceof StaticBody || body instanceof PhysicalBody) &&
              body._randomId !== object._randomId &&
              !(
                body instanceof PhysicalBody &&
                (!body.interactsWithPhysicalBodies ||
                  !object.interactsWithPhysicalBodies)
              )
            ) {
              if (body.collides(big)) {
                // if started above then on platform
                if (startY + object.height / 2 <= body.y - body.height / 2) {
                  object.y = body.y - body.height / 2 - object.height / 2;
                  if (body instanceof PhysicalBody) {
                    body.v.y += (object.v.y * object.mass) / body.mass;
                    object.v.y = 0;
                  } else {
                    object.v.y = 0;
                  }
                  object.isOnBody = true;
                  if (object instanceof ControlledBody) object.jumps = 0;
                } else if (
                  startY - object.height / 2 >=
                  body.y + body.height / 2
                ) {
                  object.y = body.y + body.height / 2 + object.height / 2;
                  if (body instanceof PhysicalBody) {
                    body.v.y += (object.v.y * object.mass) / body.mass;
                    object.v.y = 0;
                  } else {
                    object.v.y = 0;
                  }
                } else if (
                  startX + object.width / 2 <=
                  body.x - body.width / 2
                ) {
                  object.x = body.x - body.width / 2 - object.width / 2;
                  if (body instanceof PhysicalBody) {
                    body.v.x += (object.v.x * object.mass) / body.mass;
                    object.v.x = 0;
                  } else {
                    object.v.x = 0;
                  }
                  if (
                    object instanceof ControlledBody &&
                    !(body instanceof PhysicalBody) &&
                    object.wallJumps
                  ) {
                    object.jumps = 0;
                    object.wallSide = 0;
                  }
                } else if (
                  startX - object.width / 2 >=
                  body.x + body.width / 2
                ) {
                  object.x = body.x + body.width / 2 + object.width / 2;
                  if (body instanceof PhysicalBody) {
                    body.v.x += (object.v.x * object.mass) / body.mass;
                    object.v.x = 0;
                  } else {
                    object.v.x = 0;
                  }
                  if (
                    object instanceof ControlledBody &&
                    !(body instanceof PhysicalBody) &&
                    object.wallJumps
                  ) {
                    object.jumps = 0;
                    object.wallSide = 2;
                  }
                  object.v.x = 0;
                } else {
                  if (this.forceNotInObject) {
                    // started in block
                    const left =
                      object.x - object.width / 2 - (body.x - body.width / 2);
                    const right =
                      body.x + body.width / 2 - (object.x + object.width / 2);
                    const top =
                      body.y - body.height / 2 - (object.y - object.height / 2);
                    const bottom =
                      body.y + body.height / 2 - (object.y + object.height / 2);

                    const val = Math.min(left, right, top, bottom);

                    if (val === top) {
                      object.y = body.y - body.height / 2 - object.height / 2;
                      if (body instanceof PhysicalBody) {
                        body.v.y += (object.v.y * object.mass) / body.mass;
                        object.v.y = 0;
                      } else {
                        object.v.y = 0;
                      }
                      object.isOnBody = true;
                      if (object instanceof ControlledBody) object.jumps = 0;
                    } else if (val === bottom) {
                      object.y = body.y + body.height / 2 + object.height / 2;
                      if (body instanceof PhysicalBody) {
                        body.v.y += (object.v.y * object.mass) / body.mass;
                        object.v.y = 0;
                      } else {
                        object.v.y = 0;
                      }
                    } else if (val === left) {
                      object.x = body.x - body.width / 2 - object.width / 2;
                      if (body instanceof PhysicalBody) {
                        body.v.x += (object.v.x * object.mass) / body.mass;
                        object.v.x = 0;
                      } else {
                        object.v.x = 0;
                      }
                      if (
                        object instanceof ControlledBody &&
                        !(body instanceof PhysicalBody) &&
                        object.wallJumps
                      ) {
                        object.jumps = 0;
                        object.wallSide = 0;
                      }
                    } else {
                      object.x = body.x + body.width / 2 + object.width / 2;
                      if (body instanceof PhysicalBody) {
                        body.v.x += (object.v.x * object.mass) / body.mass;
                        object.v.x = 0;
                      } else {
                        object.v.x = 0;
                      }
                      if (
                        object instanceof ControlledBody &&
                        !(body instanceof PhysicalBody) &&
                        object.wallJumps
                      ) {
                        object.jumps = 0;
                        object.wallSide = 2;
                      }
                      object.v.x = 0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  render() {
    const { x: cameraX, y: cameraY } = this.camera.update();

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.beforeRenderFuncs.forEach((func) => func());

    this.ctx.translate(this.width / 2 - cameraX, this.height / 2 - cameraY);

    this.objects
      .sort((a, b) => a.layer - b.layer)
      .forEach((object) => object._render(this.ctx));

    this.ctx.translate(-this.width / 2 + cameraX, -this.height / 2 + cameraY);
  }
}

customElements.define("game-renderer", Renderer, { extends: "canvas" });

export default Renderer;
