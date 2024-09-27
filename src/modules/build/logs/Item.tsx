import { memo } from 'react';

export type Log = {
  id: string;
  message: string;
  timestamp: string;
};

export default memo(function LogItem({ id, message, timestamp }: Log) {
  return (
    <div id={id} className="flex md:items-center md:justify-between flex-col md:flex-row gap-1 md:gap-4">
      <p className='line-clamp-1 md:flex-1'>{message}</p>
      <p className="text-sm line-clamp-1 flex-1 md:text-right">
        {new Date(timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'medium', hour12: true,  })}
      </p>
    </div>
  );
});
