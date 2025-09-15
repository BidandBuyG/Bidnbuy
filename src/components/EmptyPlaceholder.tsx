/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { cn } from "@/lib/utils";
import { Circle, Search, AlertCircle } from "lucide-react";

// Add more icons as needed
const Icons = {
  circle: Circle,
  search: Search,
  alertCircle: AlertCircle,
};

// Use React.HTMLAttributes<HTMLDivElement> directly for props

export function EmptyPlaceholder({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex min-h-[200px] flex-col shadow-sm items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

interface EmptyPlaceholderIconProps
  extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof Icons;
}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
  name,
  className,
  ...props
}: EmptyPlaceholderIconProps) {
  const Icon = "";

  if (!Icon) {
    return null;
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
      <img className={cn("h-8 w-8", className)} />
    </div>
  );
};

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("mt-6 text-xl font-semibold", className)} {...props} />
  );
};

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      className={cn(
        "mb-6 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};
