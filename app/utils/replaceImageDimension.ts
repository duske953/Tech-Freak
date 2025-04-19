export default function replaceImgDimension(img: string, dimension: string) {
  if (!img) return null;
  const splitImg = img.split('_');
  splitImg[2] = dimension;
  return splitImg.join('_');
}
