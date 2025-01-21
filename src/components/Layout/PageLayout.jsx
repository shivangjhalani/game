import React from 'react';
import { cn } from "@/lib/utils";

const PageLayout = ({ children, noDefaultPadding = false }) => {
  return (
    <main className={cn(
      "container mx-auto overflow-x-hidden",
      !noDefaultPadding && "px-4 md:px-8 pt-32 pb-16"
    )}>
      {children}
    </main>
  );
};

export default PageLayout; 