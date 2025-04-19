import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { MdEmail } from 'react-icons/md';

export default function NewsLetter() {
  return (
    <section className="py-14">
      <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1 max-sm:gap-2">
        <div className="bg-gray-200 flex flex-col items-center gap-3 py-5 px-3">
          <MdEmail className="text-3xl" />
          <p className="uppercase text-3xl font-bold text-center max-md:text-xl">
            Sign up for our newsletter
          </p>
          <p>Enter your email address here</p>

          <div>
            <Input />
          </div>
          <Button>subscribe</Button>
        </div>

        <div className="bg-black flex justify-center items-center relative py-20">
          <p className="text-white uppercase font-bold text-2xl w-3/5 max-md:text-xl max-lg:w-full text-center px-3">
            free shipping on All order of $100
          </p>
          <Button
            variant="secondary"
            className="absolute top-0 right-0 rounded-none"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
}
