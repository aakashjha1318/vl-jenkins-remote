import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';

export default memo(function Trend() {
  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle className="font-black md:text-2xl lg:text-3xl">Trend</CardTitle>
        <CardDescription>Understand how your builds are performing over time</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-slate-500 text-sm">No data available yet. Start a build to see the trend.</p>
      </CardContent>
    </Card>
  );
});
