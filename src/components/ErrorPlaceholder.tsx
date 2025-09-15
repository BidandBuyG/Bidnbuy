/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { cn } from "@/lib/utils";

const Icons = {
  // Example icon, replace or add more as needed
  exclamation: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <rect x="11" y="7" width="2" height="6" rx="1" fill="currentColor" />
      <rect x="11" y="15" width="2" height="2" rx="1" fill="currentColor" />
    </svg>
  ),
};

export function ErrorPlaceholder({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex min-h-[200px] flex-col shadow-sm items-center justify-center rounded-md border border-dashed border-red-100 bg-red-50/20 p-6 text-center animate-in fade-in-50",
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

interface ErrorPlaceholderIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "name"> {
  name: keyof typeof Icons;
}

ErrorPlaceholder.Icon = function ErrorPlaceHolderIcon({
  name,
  className,
  ...props
}: ErrorPlaceholderIconProps) {
  const Icon = Icons[name];

  if (!Icon) {
    return null;
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
      <Icon className={cn("h-8 w-8 text-red-600", className)} />
    </div>
  );
};

ErrorPlaceholder.Title = function ErrorPlaceholderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("mt-4 text-xl font-semibold text-red-600", className)}
      {...props}
    />
  );
};

ErrorPlaceholder.Description = function ErrorPlaceholderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "mb-5 mt-1 text-center text-sm font-normal leading-6 text-red-400",
        className
      )}
      {...props}
    />
  );
};
