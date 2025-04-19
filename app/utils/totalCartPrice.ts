import formatPrice from './formatPrice';

export default function totalCartPrice(cart: Array<any>) {
  const totalPrice = cart?.reduce((acc, product) => {
    let confirmedPrice = +formatPrice(product.product.price)
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
