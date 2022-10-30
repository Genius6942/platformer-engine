declare function loadImage(name: string, url: string, onProgress?: (loaded: number, total: number) => void): Promise<{
    name: string;
    img: HTMLImageElement;
}>;
declare function loadImages(images: {
    [key: string]: string;
}, onProgress?: (loaded: number, total: number) => void): Promise<{
    [key: string]: HTMLImageElement;
}>;
export default loadImages;
export { loadImage };
//# sourceMappingURL=imageLoader.d.ts.map