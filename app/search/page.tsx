import { tryCatchGet } from '../utils/tryCatch';
import ProductsList from '../components/ProductsList';
import ErrorPage from '../components/ErrorPage';
import Pagination from '../components/Pagination';
import { pageProps } from '../utils/interfaces';

export default async function Page({ searchParams }: pageProps) {
  const { page } = await searchParams;
  const { q } = await searchParams;
  if (!page || +page < 0 || !Number.isFinite(+page) || !q) return <ErrorPage />;
  const [response, err] = await tryCatchGet(
    `products/search/?q=${q}&page=${page}`
  );
  if (err) return <ErrorPage msg={err} />;
  return (
    <section className="py-16 px-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">
          Results for {q.slice(0, 30)}
        </h1>
        <ProductsList
          products={response.data.searchedProduct}
          key={q as string}
        />
        <Pagination totalPages={response.data.totalPages} />
      </div>
    </section>
  );
}
