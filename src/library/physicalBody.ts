// import ControlledBody from "./controlledBody";
import GameObject, { emptyRenderFunction } from "./object";

export default class PhysicalBody extends GameObject {
  v: { x: number; y: number };
  isOnBody: boolean;
  friction: number;
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
    update?: (multiplier: number, self: PhysicalBody) => void;
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
      update: (multiplier: number) => {
        update(multiplier, this);
        this.applyFriction(multiplier);
      },
    });

    this.v = {
      x: 0,
      y: 0,
    };

    this.friction = 0.3;

    this.isOnBody = false;
  }

  applyFriction(multiplier: number) {
    if (!this.isOnBody) return;
    // @ts-ignore
    if (this.keys && this.preventFriction) return;
    if (this.friction * multiplier > Math.abs(this.v.x)) {
      this.v.x = 0;
    } else {
      if (this.v.x > 0) {
        this.v.x -= this.friction * multiplier;
      } else {
        this.v.x += this.friction * multiplier;
      }
    }
  }
}
