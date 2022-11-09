function loadImage(
  name: string,
  url: string,
  onProgress: (loaded: number, total: number) => void = () => {}
): Promise<{ name: string; img: HTMLImageElement }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // img.addEventListener('load', () => {
    // 	resolve({name: name, img: img});
    // });
    // img.addEventListener('error', (e) => reject(e));
    // img.src = url;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response]);
        img.addEventListener("load", () => {
          resolve({ name: name, img: img });
        });
        img.addEventListener("error", () => {
          reject("image failed to load");
        });
        img.src = URL.createObjectURL(blob);
      } else {
        reject("failed status: " + xhr.status.toString());
      }
    });

    xhr.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        onProgress(e.loaded, e.total);
      } else {
        // average image size
        onProgress(0, 8.1 * 1000); // https://www.pingdom.com/blog/new-facts-and-figures-about-image-format-use-on-websites/#:~:text=Average%20image%20size%20per%20format,a%20Web%20page%20on%20average.
      }
    });

    xhr.addEventListener("error", () => {
      reject("Network error or blocked by cors");
    });

    xhr.send();
  });
}
async function loadImages(
  images: { [key: string]: string },
  onProgress: (loaded: number, total: number) => void = () => {}
) {
  const loadedNumbers = Object.keys(images).map(() => 0);
  const totalNumbers = Object.keys(images).map(() => 1);

  const imgs = Object.keys(images).map((key, idx) =>
    loadImage(key, images[key], (loaded, total) => {
      // console.log(key, (loaded / total) * 100);
      loadedNumbers[idx] = loaded;
      totalNumbers[idx] = total;
      onProgress(
        loadedNumbers.reduce((a, b) => a + b),
        totalNumbers.reduce((a, b) => a + b)
      );
    })
  );
  const loadedImgs = await Promise.all(imgs);

  const finishedImgs: { [key: string]: HTMLImageElement } = {};

  loadedImgs.forEach(
    ({ name, img }: { name: string; img: HTMLImageElement }) => {
      finishedImgs[name] = img;
    }
  );
  return finishedImgs;
}

export default loadImages;
export { loadImage };
