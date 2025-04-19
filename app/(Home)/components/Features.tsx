import { ReactNode } from 'react';
import {
  FaBus,
  FaCar,
  FaCarSide,
  FaCreditCard,
  FaMoneyBill,
} from 'react-icons/fa6';

export default function Features() {
  return (
    <section className="py-14">
      <ul className="flex gap-4 justify-around flex-wrap">
        <FeaturesList title="Free Shipping" subtitle="Capped at $60 an hour">
          <FaCarSide />
        </FeaturesList>
        <FeaturesList title="Secure Payments" subtitle="6months installments">
          <FaCreditCard />
        </FeaturesList>
        <FeaturesList title="14 Day Returns" subtitle="Shop with confidence">
          <FaMoneyBill />
        </FeaturesList>
      </ul>
    </section>
  );
}

function FeaturesList({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4 items-center border-2 p-5 rounded-lg">
      <span className="text-5xl">{children}</span>
      <div className="flex flex-col">
        <p className="font-bold">{title}</p>
        <span>{subtitle}</span>
      </div>
    </li>
  );
}
