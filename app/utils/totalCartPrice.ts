import formatPrice from './formatPrice';
import { productTypes } from './interfaces';

export default function totalCartPrice(
  cart: Array<{ product: productTypes; quantity: number }>
) {
  const totalPrice = cart?.reduce((acc, product) => {
    const confirmedPrice = +formatPrice(product.product.price)
      .split(',')
      .join('');

    if (product.quantity >= 5) {
      acc += product.quantity * (confirmedPrice - +(0.05 * +confirmedPrice));
    }

    if (product.quantity < 5) acc += product.quantity * +confirmedPrice;
    return acc;
  }, 0);
  return new Intl.NumberFormat().format(totalPrice);
}
