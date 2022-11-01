import GameObject from "./object";
import Renderer from "./renderer";
export default class Camera {
    renderer: Renderer;
    lockedObject: GameObject | null;
    defaultPos: {
        x: number;
        y: number;
    };
    pos: {
        x: number;
        y: number;
    };
    minimums: {
        x: number;
        y: number;
    };
    constructor(renderer: Renderer, defaultPos?: {
        x: number;
        y: number;
    });
    lock(object: GameObject, { minXSpace, minYSpace, }?: {
        minXSpace?: number;
        minYSpace?: number;
    }): void;
    unlock(): void;
    update(): {
        x: number;
        y: number;
    };
}
//# sourceMappingURL=camera.d.ts.map