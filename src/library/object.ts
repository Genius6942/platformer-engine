import { aabb, rect } from "./util/tools/collision";

type emptyRenderFunction = (
  this: GameObject,
  ctx: CanvasRenderingContext2D,
  self: GameObject
) => void;

class GameObject {
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  image: HTMLImageElement | null;
  render: emptyRenderFunction | null;
  update: Function;
  color: string | null;
  layer: number;
  _randomId: number;
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
    update?: Function;
  }) {
    this.x = x;
    this.y = y;

    this.rotation = rotation;
    this.width = width;
    this.height = height;

    this.image = image;

    this.color = color;

    this.render = render;

    this.update = update;

    this.layer = layer;

    this._randomId = Math.random();
  }

  _render(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    if (this.render) {
      try {
        this.render.apply(this, [ctx, this]);
      } catch (e) {
        this.render(ctx, this);
      }
    } else if (this.image) {
      ctx.drawImage(
        this.image,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    } else if (this.color) {
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }

    ctx.restore();
  }

  collides(object: rect) {
    return aabb(this, object);
  }
}

export default GameObject;
export type { emptyRenderFunction };
