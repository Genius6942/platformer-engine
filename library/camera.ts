import GameObject from "./object";
import Renderer from "./renderer";

export default class Camera {
  renderer: Renderer;
  lockedObject: GameObject | null;
  defaultPos: { x: number; y: number };
  pos: { x: number; y: number };
  minimums: { x: number; y: number };
  constructor(renderer: Renderer, defaultPos?: { x: number; y: number }) {
    this.renderer = renderer;
    this.lockedObject = null;

    this.defaultPos = defaultPos || {
      x: renderer.width / 2,
      y: renderer.height / 2,
    };

    this.pos = this.defaultPos;
    this.minimums = { x: Infinity, y: Infinity };
  }

  lock(
    object: GameObject,
    {
      minXSpace = Infinity,
      minYSpace = Infinity,
    }: { minXSpace?: number; minYSpace?: number } = {}
  ) {
    this.lockedObject = object;
    this.minimums = {
      x: minXSpace,
      y: minYSpace,
    };
  }

  unlock() {
    this.lockedObject = null;
    this.pos = this.defaultPos;
  }

  update() {
    if (this.lockedObject) {
      if (this.minimums.x >= this.renderer.width / 2) {
        this.pos.x = this.lockedObject.x;
      } else if (
        this.lockedObject.x - this.pos.x + this.renderer.width / 2 <
        this.minimums.x
      ) {
        this.pos.x =
          this.lockedObject.x - this.minimums.x + this.renderer.width / 2;
      } else if (
        this.lockedObject.x - this.pos.x >
        this.renderer.width / 2 - this.minimums.x
      ) {
        this.pos.x =
          this.lockedObject.x + this.minimums.x - this.renderer.width / 2;
      }

      if (this.minimums.y >= this.renderer.height / 2) {
        this.pos.y = this.lockedObject.y;
      } else if (
        this.lockedObject.y - this.pos.y + this.renderer.height / 2 <
        this.minimums.y
      ) {
        this.pos.y =
          this.lockedObject.y - this.minimums.y + this.renderer.height / 2;
      } else if (
        this.lockedObject.y - this.pos.y >
        this.renderer.height / 2 - this.minimums.y
      ) {
        this.pos.y =
          this.lockedObject.y + this.minimums.y - this.renderer.height / 2;
      }
    }

    return this.pos;
  }
}
