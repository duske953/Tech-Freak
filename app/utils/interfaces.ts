export interface productTypes {
  _id: string;
  title: string;
  price: number;
  rating: string;
  image: string;
  images: string[];
  link: string;
  details: {
    productSpecs: Array<{ name: string; value: string }>;
    aboutProduct: [string];
  };
  asin: string;
}

export interface pageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
