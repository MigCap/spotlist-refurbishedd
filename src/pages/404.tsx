import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo templateTitle='Not Found' />

      <div className='bg-gradient-to-b flex flex-col from-gray-800 items-center justify-center layout min-h-screen text-center text-white to-black w-[100%]'>
        <h1 className='text-4xl md:text-6xl'>Content Not Found</h1>
      </div>
    </>
  );
}
