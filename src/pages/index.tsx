import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

import Spinner from '@/components/containers/Spinner';
import { useEffect, useState } from 'react';

const Configure = dynamic(() => import('@/modules/build/Configure'), { loading: Spinner });
const Credentials = dynamic(() => import('@/modules/build/Credentials'), { loading: Spinner });
const Logs = dynamic(() => import('@/modules/build/logs'), { loading: Spinner });
const Trend = dynamic(() => import('@/modules/build/trend'), { loading: Spinner });
const CurrentStatus = dynamic(() => import('@/modules/build/CurrentStatus'), { loading: Spinner });

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [progress, setProgress] = useState(0);

  function mockProgress() {
    setProgress((prev) => {
      if (prev >= 100) {
        return 0;
      }
      return prev + 1;
    });
  }

  useEffect(() => {
    const interval = setInterval(mockProgress, 2000);
    return () => clearInterval(interval);
  }, [])

  return (
    <main className={`${inter.className} p-page flex flex-col lg:flex-row gap-4`}>
      <section className="flex-1 flex flex-col gap-4">
        <Credentials />
        <Configure />
        <CurrentStatus progress={progress} />
      </section>
      <section className="flex-[2] flex flex-col gap-4">
        <Trend />
        <Logs
          data={[
            {
              id: '1',
              message: 'Starting build',
              timestamp: '2024-09-27T22:52:18.070Z',
            },
            {
              id: '1',
              message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              timestamp: '2024-09-27T22:52:18.070Z',
            },
            {
              id: '1',
              message: 'Starting build',
              timestamp: '2024-09-27T22:52:18.070Z',
            },
          ]}
        />
      </section>
    </main>
  );
}
