import { cn } from '@/app/lib/utils';
import Link from 'next/link';

const ProductCategoriesData = [
  {
    text: 'Monitors',
    link: '/shop?category=monitors&id=16225007011&page=1',
    id: 'monitors',
  },

  {
    text: 'Computer Components',
    link: '/shop?category=computer-components&id=16225007013&page=1',
    id: 'computer-components',
  },

  {
    text: 'Laptops',
    link: '/shop?category=laptops&id=16225007012&page=1',
    id: 'laptops',
  },

  {
    text: 'Laptop Accessories',
    link: '/shop?category=laptop-accessories&id=16225007014&page=1',
    id: 'laptop-accessories',
  },

  {
    text: 'Headpones',
    link: '/shop?category=headphones&id=16225007015&page=1',
    id: 'headphones',
  },

  {
    text: 'Cell Phones',
    link: '/shop?category=cell-phones&id=16225007016&page=1',
    id: 'cell-phones',
  },

  {
    text: 'Camera',
    link: '/shop?category=cameras&id=16225007017&page=1',
    id: 'cameras',
  },

  {
    text: 'Computer Accessories',
    link: '/shop?category=computer-accessories&id=16225007018&page=1',
    id: 'computer-accessories',
  },
];

export default function ProductCategories({ id }: { id: string }) {
  return (
    <ul className="flex overflow-auto gap-y-14 py-6 gap-x-4 justify-around sticky top-0 z-20 bg-slate-200 p-4">
      {ProductCategoriesData.map((category) => (
        <li className="text-nowrap" key={category.text}>
          <Badge
            text={category.text}
            href={category.link}
            id={category.id}
            activeId={id}
          />
        </li>
      ))}
    </ul>
  );
}

function Badge({
  text,
  href,
  id,
  activeId,
}: {
  text: string;
  href: string;
  id: string;
  activeId: string;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        `border - 2 border-white py-3 px-4 rounded-full cursor-pointer`,
        activeId === id && 'bg-slate-700 text-white'
      )}
    >
      {text}
    </Link>
  );
}
