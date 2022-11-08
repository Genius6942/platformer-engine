import Camera from "./camera";
import GameObject from "./object";
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
    }): this;
    enableFixedPosition(): this;
    resize(): this;
    add(object: GameObject): GameObject;
    destroy(item: GameObject | number): number | GameObject;
    /**
     * Mounts renderer to the dom
     */
    mount(container: HTMLElement): this;
    update(mulitplier?: number): void;
    render(): void;
}
export default Renderer;
//# sourceMappingURL=renderer.d.ts.map