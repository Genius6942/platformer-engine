import GameObject, { emptyRenderFunction } from "./object";

export default class StaticBody extends GameObject {
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
      update,
    });
  }
}
