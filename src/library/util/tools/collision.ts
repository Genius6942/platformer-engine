export type rect = { x: number; y: number; width: number; height: number };

export const aabb = (object1: rect, object2: rect) => {
  // AABB collision with x and y as center
  return (
    object1.x - object1.width / 2 < object2.x + object2.width / 2 &&
    object1.x + object1.width / 2 > object2.x - object2.width / 2 &&
    object1.y - object1.height / 2 < object2.y + object2.height / 2 &&
    object1.y + object1.height / 2 > object2.y - object2.height / 2
  );
};
