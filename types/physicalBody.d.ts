import GameObject, { emptyRenderFunction } from "./object";
export default class PhysicalBody extends GameObject {
    v: {
        x: number;
        y: number;
    };
    isOnBody: boolean;
    friction: number;
    mass: number;
    interactsWithPhysicalBodies: boolean;
    constructor({ x, y, rotation, width, height, image, color, layer, mass, interactsWithPhysicalBodies, friction, render, update, }: {
        x?: number;
        y?: number;
        rotation?: number;
        width?: number;
        height?: number;
        image?: HTMLImageElement | null;
        color?: string | null;
        layer?: number;
        mass?: number;
        interactsWithPhysicalBodies?: boolean;
        friction?: number;
        render?: emptyRenderFunction | null;
        update?: (multiplier: number, self: PhysicalBody) => void;
    });
    applyFriction(multiplier: number): void;
}
//# sourceMappingURL=physicalBody.d.ts.map