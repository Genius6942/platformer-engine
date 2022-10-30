import { emptyRenderFunction } from "./object";
import PhysicalBody from "./physicalBody";

export default class ControlledBody extends PhysicalBody {
  maxXSpeed: number;
  jumpVel: number;
  keys: {
    w: boolean;
    a: boolean;
    s: boolean;
    d: boolean;
    top: boolean;
    bottom: boolean;
    right: boolean;
    left: boolean;
  };
  xAcceleration: number;
  jumps: number;
  maxJumps: number;
  wallJumps: boolean;
  wallPushOffSpeed: number;
  /**
   * 0 for left, 1 for center, 2 for right
   */
  wallSide: 0 | 1 | 2;
  constructor({
    x = 0,
    y = 0,
    rotation = 0,
    width = 0,
    height = 0,
    image = null,
    color = null,
    layer = 0,
    render = null,
    update = () => {},
    maxXSpeed = 5,
    jumpVel = 13,
    maxJumps = 1,
    wallJump = false,
    wallPushOffSpeed = 3,
  }: {
    x?: number;
    y?: number;
    rotation?: number;
    width?: number;
    height?: number;
    image?: HTMLImageElement | null;
    color?: string | null;
    layer?: number;
    render?: emptyRenderFunction | null;
    update?: (self: ControlledBody) => void;
    maxXSpeed?: number;
    jumpVel?: number;
    maxJumps?: number;
    wallJump?: boolean;
    wallPushOffSpeed?: number;
  }) {
    super({
      x,
      y,
      rotation,
      width,
      height,
      image,
      color,
      layer,
      render,
      update: (mulitplier: number) => {
        update(this);
        this.updateHorizontalMovement(mulitplier);
      },
    });

    this.maxXSpeed = maxXSpeed;
    this.jumpVel = jumpVel;
    this.maxJumps = maxJumps;
    this.jumps = 0;

    this.wallJumps = wallJump;
    this.wallPushOffSpeed = wallPushOffSpeed;
    this.wallSide = 1;

    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
      top: false,
      bottom: false,
      right: false,
      left: false,
    };

    this.xAcceleration = 0.3;
  }

  getPreventFriction() {
    let val = 0;
    if (this.keys.right) val++;
    if (this.keys.left) val--;
    if (this.keys.d) val++;
    if (this.keys.a) val--;
    return val !== 0;
  }

  jump() {
    if (this.jumps < this.maxJumps) {
      this.v.y = -this.jumpVel;
      this.jumps++;
      if (this.wallSide === 0) {
        this.v.x = -this.wallPushOffSpeed;
      } else if (this.wallSide === 2) {
        this.v.x = this.wallPushOffSpeed;
      }
    }
  }

  bindKeyboardControls({ wasd = true, arrowKeys = true, spaceJump = true }) {
    if (wasd) {
      window.addEventListener("keydown", this.wasdKeyListener.bind(this), true);
      window.addEventListener("keyup", this.wasdKeyListener.bind(this), true);
    }
    if (arrowKeys) {
      window.addEventListener(
        "keydown",
        this.arrowKeyListener.bind(this),
        true
      );

      window.addEventListener("keyup", this.arrowKeyListener.bind(this), true);
    }
    if (spaceJump) {
      window.addEventListener(
        "keydown",
        this.spaceKeyListener.bind(this),
        true
      );
      window.addEventListener("keyup", this.spaceKeyListener.bind(this), true);
    }
  }

  private wasdKeyListener({ key, repeat, type }: KeyboardEvent) {
    if (repeat) return;
    const val = type === "keydown";
    if (val && key.toLowerCase() === "w") {
      this.jump();
    }
    if (key.toLowerCase() === "d") {
      this.keys.d = val;
    }
    if (key.toLowerCase() === "s") {
      // maybe do something?
      this.keys.left = val;
    }
    if (key.toLowerCase() === "a") {
      this.keys.a = val;
    }
  }
  private arrowKeyListener({ key, type, repeat }: KeyboardEvent) {
    if (repeat) return;
    const val = type === "keydown";
    if (val && key === "ArrowUp") {
      this.jump();
    }
    if (key === "ArrowRight") {
      this.keys.right = val;
    }
    if (key === "ArrowDown") {
      this.keys.bottom = val;
    }
    if (key === "ArrowLeft") {
      this.keys.left = val;
    }
  }
  private spaceKeyListener({ key, repeat, type }: KeyboardEvent) {
    const val = type === "keydown";
    if (repeat) return;
    if (val && key === " ") {
      this.jump();
    }
  }
  private updateHorizontalMovement(mulitplier: number) {
    if (this.keys.a || this.keys.left) {
      this.v.x -= this.xAcceleration * mulitplier;
    }
    if (this.keys.d || this.keys.right) {
      this.v.x += this.xAcceleration * mulitplier;
    }
    this.v.x = Math.max(-this.maxXSpeed, Math.min(this.maxXSpeed, this.v.x));
  }
}
