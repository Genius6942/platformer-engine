import GameObject, { emptyRenderFunction } from "./object";
export default class StaticBody extends GameObject {
    constructor({ x, y, rotation, width, height, image, color, layer, render, update, }: {
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
    });
}
//# sourceMappingURL=staticBody.d.ts.map