'use client';
import { useEffect, useRef, useState } from 'react';
import { Button, buttonVariants } from '../../components/ui/button';
import { motion } from 'motion/react';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Link from 'next/link';
import { cn } from '@/app/lib/utils';
export default function InitAccount() {
  const [switchAuth, setSwitchAuth] = useState<'Login' | 'Signup'>('Signup');
  const accountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!accountRef.current) return;
      accountRef?.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 200);
    return () => clearTimeout(timer);
  }, [switchAuth]);

  return (
    <section className="py-20 px-8 bg-gray-100 max-sm:px-4">
      <div className="grid grid-cols-2 max-md:grid-cols-1">
        <motion.div
          className={cn(
            `bg-slate-900 p-16 text-white relative max-sm:p-8 max-sm:px-2`
          )}
          transition={{ duration: 0.3 }}
          layout
          style={{ order: switchAuth === 'Login' ? 2 : 1 }}
        >
          <div className="flex flex-col gap-4 items-center max-sm:gap-2 max-sm:mt-5">
            <p className="text-3xl font-bold max-sm:text-xl">
              {switchAuth === 'Signup' ? 'Join Us Today!' : 'Welcome Back!'}
            </p>
            {switchAuth === 'Login' && (
              <Link
                href="/forgot-password"
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'absolute top-0 right-0 rounded-none text-white'
                )}
              >
                Forgot password?
              </Link>
            )}
            <p className="text-2xl text-center mb-5 max-sm:text-lg">
              {switchAuth === 'Signup'
                ? 'Create an account in seconds and unlock exclusive features.'
                : 'Log in to continue where you left off.'}
            </p>
            <Button
              onClick={() =>
                setSwitchAuth(switchAuth === 'Signup' ? 'Login' : 'Signup')
              }
              variant="secondary"
              className="cursor-pointer"
            >
              {switchAuth === 'Signup' ? 'Login' : 'Sign Up'}
            </Button>
          </div>
        </motion.div>

        <motion.div
          ref={accountRef}
          className="p-6 bg-white"
          transition={{ duration: 0.3 }}
          layout
          style={{ order: switchAuth === 'Login' ? 1 : 2 }}
        >
          <h1 className="text-center font-bold text-3xl mb-4">
            {switchAuth === 'Signup' ? 'Create Account' : 'Login'}
          </h1>
          {switchAuth === 'Signup' ? <Signup /> : <Login />}
        </motion.div>
      </div>
    </section>
  );
}
