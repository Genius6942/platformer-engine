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
    constructor({ x, y, rotation, width, height, image, color, layer, render, update, maxXSpeed, jumpVel, maxJumps, wallJump, wallPushOffSpeed, }: {
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
    });
    getPreventFriction(): boolean;
    jump(): void;
    bindKeyboardControls({ wasd, arrowKeys, spaceJump }: {
        wasd?: boolean | undefined;
        arrowKeys?: boolean | undefined;
        spaceJump?: boolean | undefined;
    }): void;
    private wasdKeyListener;
    private arrowKeyListener;
    private spaceKeyListener;
    private updateHorizontalMovement;
}
//# sourceMappingURL=controlledBody.d.ts.map