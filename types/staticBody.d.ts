import GameObject, { emptyRenderFunction } from "./object";
export default class StaticBody extends GameObject {
    constructor({ x, y, rotation, width, height, image, color, layer, render, update, onCollide, }: {
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
}
//# sourceMappingURL=staticBody.d.ts.map