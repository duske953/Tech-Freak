export default function ProductMetadata({
  productSpecs,
  aboutProduct,
}: {
  productSpecs: Array<{ name: string; value: string }>;
  aboutProduct: Array<string>;
}) {
  if (aboutProduct.length === 0 && productSpecs.length === 0) return null;
  return (
    <div className="px-7 my-10 py-10 relative bg-gray-50 max-w-2xl mx-auto rounded-lg ">
      <div className="mb-9">
        <p className="font-bold text-blue-600 text-3xl mb-7">Description</p>
        <div className="flex flex-col gap-7">
          {aboutProduct.map((about) => (
            <p key={about}>{about}</p>
          ))}
        </div>
      </div>

      <div>
        <p className="font-bold text-blue-600 text-3xl mb-7">Specifications</p>
        <div className="flex flex-col gap-7 mx-auto">
          {productSpecs.map((spec) => (
            <div key={spec.name} className="flex gap-9">
              <p className="font-bold text-gray-600">{spec.name}</p>
              <p>{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
