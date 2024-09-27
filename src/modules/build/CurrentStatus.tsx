import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { X } from 'lucide-react';
import { memo } from 'react';

export default memo(function CurrentStatus({progress}: {progress: number}) {
  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle className="font-black md:text-2xl lg:text-3xl">Running Build</CardTitle>
        <CardDescription>
            Monitor the progress of the ongoing build
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <Progress className='h-3' value={progress} />
        <Label>Build progress: {progress}%</Label>
        <Button variant='destructive' className='self-end' size={"sm"}>
            <X size={16} className='mr-1' />
            Terminate
        </Button>
      </CardContent>
    </Card>
  );
});
