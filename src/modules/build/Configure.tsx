import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play } from 'lucide-react';
import { ComponentPropsWithoutRef, FormEvent, memo, useState } from 'react';

type Config = {
  serviceBranchName: string;
  environment: 'staging' | 'prod' | 'msndev' | 'msnuat' | 'msnprod' | undefined;
  targetCluster: 'eks' | 'gke' | undefined;
  helmChartsBranchName: string;
};
const InitialStateData: Config = {
  serviceBranchName: '',
  environment: undefined,
  targetCluster: undefined,
  helmChartsBranchName: '',
};
const Fields = [
  {
    title: 'Service Branch Name',
    helperText: 'This is the branch that will be deployed',
    required: true,
    name: 'serviceBranchName',
    fieldType: 'text',
    placeholder: 'Enter branch name to deploy',
  },
  {
    title: 'Environment',
    helperText: 'Select the environment to deploy to',
    required: true,
    name: 'environment',
    fieldType: 'select',
    options: [
      {
        label: 'Staging',
        value: 'staging',
      },
      {
        label: 'Production',
        value: 'prod',
      },
      {
        label: 'MSN Dev',
        value: 'msndev',
      },
      {
        label: 'MSN UAT',
        value: 'msnuat',
      },
      {
        label: 'MSN Prod',
        value: 'msnprod',
      },
    ],
  },
  {
    title: 'Target Cluster',
    helperText: 'Select the target cluster',
    required: true,
    name: 'targetCluster',
    fieldType: 'select',
    options: [
      {
        label: 'EKS',
        value: 'eks',
      },
      {
        label: 'GKE',
        value: 'gke',
      },
    ],
  },
  {
    title: 'Helm Charts Branch Name',
    helperText: 'This is the branch that contains the helm charts',
    required: true,
    name: 'helmChartsBranchName',
    fieldType: 'text',
    placeholder: 'Enter branch name for helm charts',
  },
];
export default memo(function Configure() {
  const [config, setConfig] = useState(InitialStateData);
  const [reset, setReset] = useState(false);

  function handleChange<T extends unknown>(key: keyof Config, value: T) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  function onResetInit() {
    setReset(true);
  }

  function onResetConfirm() {
    setConfig(InitialStateData);
    setReset(false);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Do something with the config
  }
  return (
    <>
      <Card className="h-fit w-full">
        <CardHeader>
          <CardTitle className="font-black md:text-2xl lg:text-3xl">Configure</CardTitle>
          <CardDescription>Enter the configuration to start a new build</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {Fields.map(({ helperText, name, required, title, fieldType, options, placeholder }) => {
              return (
                <span key={name} className="flex flex-col gap-2">
                  {title ? (
                    <Label aria-required={required}>
                      {title}
                      {required ? <span className="text-destructive">*</span> : false}
                    </Label>
                  ) : (
                    false
                  )}
                  {fieldType === 'text' ? (
                    <Input
                      value={config[name as keyof Config]}
                      placeholder={placeholder}
                      onChange={(e) => handleChange<string>(name as keyof Config, e.target.value)}
                    />
                  ) : (
                    false
                  )}
                  {fieldType === 'select' ? (
                    <Select
                      value={config[name as keyof Config]}
                      onValueChange={(v) => handleChange<string>(name as keyof Config, v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {options?.map(({ label, value }) => (
                          <SelectItem value={value} key={value} id={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    false
                  )}
                  {helperText ? <span className="text-xs text-slate-500">{helperText}</span> : false}
                </span>
              );
            })}
            <section className="flex gap-4 mt-8 justify-end">
              <AlertDialog open={reset}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={'ghost'}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={onResetInit}
                    size={"sm"}
                  >
                    Reset
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-accent">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will reset all the fields to their initial state. Are you sure you want to proceed?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setReset(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onResetConfirm}>
                        Reset Configuration
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button variant={'success'} size={"sm"}>
                <Play size={16} className="mr-1" />
                Start Build
              </Button>
            </section>
          </form>
        </CardContent>
      </Card>
    </>
  );
});
