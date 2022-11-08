declare type rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

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
    _render(ctx: CanvasRenderingContext2D): void;
    collides(object: rect): boolean;
}
//# sourceMappingURL=object.d.ts.map

declare class PhysicalBody extends GameObject {
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

declare class ControlledBody extends PhysicalBody {
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
    constructor({ x, y, rotation, width, height, image, color, layer, mass, render, update, maxXSpeed, jumpVel, maxJumps, wallJump, wallPushOffSpeed, }: {
        x?: number;
        y?: number;
        rotation?: number;
        width?: number;
        height?: number;
        image?: HTMLImageElement | null;
        color?: string | null;
        layer?: number;
        mass?: number;
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

declare class Camera {
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

declare class Renderer extends HTMLCanvasElement {
    ctx: CanvasRenderingContext2D;
    objects: GameObject[];
    physics?: {
        gravity: number;
    };
    camera: Camera;
    forceNotInObject: boolean;
    private beforeRenderFuncs;
    constructor();
    beforeRender(func: () => void): this;
    /**
     * Makes images not blur when scaled
     */
    enablePixelated(): this;
    enablePhysics({ gravity }: {
        gravity?: number | undefined;
    }): void;
    enableFixedPosition(): this;
    resize(): void;
    add(object: GameObject): GameObject;
    destroy(item: GameObject | number): void;
    /**
     * Mounts renderer to the dom
     */
    mount(container: HTMLElement): this;
    update(mulitplier?: number): void;
    render(): void;
}
//# sourceMappingURL=renderer.d.ts.map

declare class StaticBody extends GameObject {
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

declare function loadImages(images: {
    [key: string]: string;
}, onProgress?: (loaded: number, total: number) => void): Promise<{
    [key: string]: HTMLImageElement;
}>;
//# sourceMappingURL=imageLoader.d.ts.map

export { ControlledBody, GameObject, PhysicalBody, Renderer, StaticBody, loadImages };
