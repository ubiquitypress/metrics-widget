import type * as React from 'react';

declare module 'react' {
  // Some libraries (e.g., lucide-react) still reference ReactSVG from older React type versions.
  // Provide a lightweight alias to keep type compatibility with React 19 types.
  export interface ReactSVG extends React.SVGProps<SVGSVGElement> {}
}
