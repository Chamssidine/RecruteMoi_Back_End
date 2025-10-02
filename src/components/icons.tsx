import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 12c0-3.33-2-5-5-5" />
      <path d="M10 12c0 3.33 2 5 5 5" />
      <path d="M14 7v1.5" />
      <path d="M9 12h1" />
      <path d="M15 12h-1" />
      <path d="M10 15.5V17" />
      <path d="M4 6h16" />
      <path d="M4 18h16" />
      <path d="M6 4v2" />
      <path d="M18 4v2" />
      <path d="M6 20v-2" />
      <path d="M18 20v-2" />
    </svg>
  );
}
