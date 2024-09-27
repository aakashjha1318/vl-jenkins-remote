import { memo } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type Log } from './Item';
import dynamic from 'next/dynamic';
import Spinner from '@/components/containers/Spinner';

const LogItem = dynamic(() => import('./Item'), { loading: Spinner, ssr: false });

export type LogsProps = {
  data: Log[] | undefined;
};

export default memo(function History({ data }: LogsProps) {
  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle className="font-black md:text-2xl lg:text-3xl">History</CardTitle>
        <CardDescription>Recent builds and their outcomes</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        {!data || !data.length ? (
          <p className="text-slate-500 text-sm">No logs available</p>
        ) : (
          data.map((log) => <LogItem key={log.id} {...log} />)
        )}
      </CardContent>
    </Card>
  );
});
