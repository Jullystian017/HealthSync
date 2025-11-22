"use client";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

const Tabs = TabsPrimitive.Root;
const TabsList = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List className={cn("inline-flex h-10 items-center justify-center rounded-2xl bg-slate-100 p-1 text-slate-600", className)} {...props} />
);
const TabsTrigger = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 data-[state=active]:bg-white data-[state=active]:text-slate-900",
      className
    )}
    {...props}
  />
);
const TabsContent = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content className={cn("mt-3 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30", className)} {...props} />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
