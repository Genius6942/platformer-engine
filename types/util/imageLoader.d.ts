declare function loadImage(name: string, url: string, onProgress?: (loaded: number, total: number) => void): Promise<{
    name: string;
    img: HTMLImageElement;
}>;
declare function loadImages<T extends {
    [key: string]: string;
}>(images: T, onProgress?: (loaded: number, total: number) => void): Promise<{
    [K in keyof T]: HTMLImageElement;
}>;
export default loadImages;
export { loadImage };
//# sourceMappingURL=imageLoader.d.ts.map