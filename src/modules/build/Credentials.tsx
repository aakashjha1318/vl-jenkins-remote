import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';

export default memo(function Credentials() {
  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle className="font-black md:text-2xl lg:text-3xl">Welcome Back</CardTitle>
        <CardDescription>Currently logged in as Jane Doe</CardDescription>
      </CardHeader>
    </Card>
  );
});
