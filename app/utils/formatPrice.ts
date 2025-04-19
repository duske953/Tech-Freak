export default function formatPrice(productPrice: number) {
  return `${new Intl.NumberFormat().format(productPrice)}`;
}
