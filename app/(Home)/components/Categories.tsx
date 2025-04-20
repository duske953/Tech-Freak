import Link from 'next/link';
import { ReactNode } from 'react';
import {
  FaCamera,
  FaComputer,
  FaHeadphones,
  FaLaptop,
  FaPhone,
} from 'react-icons/fa6';

const categoryData = [
  {
    icon: <FaComputer />,
    title: 'Computer Components',
    link: '/shop?category=computer-components&id=193870013&page=1',
  },

  {
    icon: <FaCamera />,
    title: 'Camera',
    link: '/shop?category=cameras&id=16225007017&page=1',
  },

  {
    icon: <FaPhone />,
    title: 'Smartphone',
    link: '/shop?category=cell-phones&id=16225007016&page=1',
  },

  {
    icon: <FaHeadphones />,
    title: 'Headphone',
    link: '/shop?category=headphones&id=16225007015&page=1',
  },

  {
    icon: <FaLaptop />,
    title: 'Laptop',
    link: '/shop?category=laptops&id=16225007012&page=1',
  },
];

export default function Categories() {
  return (
    <section className="py-16">
      <ul className="flex justify-around flex-wrap gap-10">
        {categoryData.map((category) => (
          <CategoryList
            key={category.title}
            icon={category.icon}
            title={category.title}
            link={category.link}
          />
        ))}
      </ul>
    </section>
  );
}

function CategoryList({
  icon,
  title,
  link,
}: {
  icon: ReactNode;
  title: string;
  link: string;
}) {
  return (
    <li>
      <Link className="flex flex-col items-center gap-3" href={link}>
        <span className="text-3xl">{icon}</span>
        <span>{title}</span>
      </Link>
    </li>
  );
}
