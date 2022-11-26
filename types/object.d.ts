import { rect } from "./util/tools/collision";
declare type emptyRenderFunction = (this: GameObject, ctx: CanvasRenderingContext2D, self: GameObject) => void;
declare class GameObject {
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
    onCollide: (object: GameObject) => void;
    constructor({ x, y, rotation, width, height, image, color, layer, render, update, onCollide }?: {
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
        onCollide?: (object: GameObject) => void;
    });
    _render(ctx: CanvasRenderingContext2D): void;
    collides(object: rect): boolean;
}
export default GameObject;
export type { emptyRenderFunction };
//# sourceMappingURL=object.d.ts.map