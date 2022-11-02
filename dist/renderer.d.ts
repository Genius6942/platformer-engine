import Camera from "./camera";
import GameObject from "./object";
declare class Renderer extends HTMLCanvasElement {
    ctx: CanvasRenderingContext2D;
    objects: GameObject[];
    physics?: {
        gravity: number;
    };
    camera: Camera;
    constructor();
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
export default Renderer;
//# sourceMappingURL=renderer.d.ts.map