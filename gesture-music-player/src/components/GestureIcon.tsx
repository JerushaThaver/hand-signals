import type { SVGProps } from "react";

type GestureType =
  | "thumbs-up"
  | "open-hand"
  | "point-left"
  | "two-fingers";

interface GestureIconProps extends SVGProps<SVGSVGElement> {
  gesture: GestureType;
}

export default function GestureIcon({
  gesture,
  ...props
}: GestureIconProps) {
  const commonProps = {
    width: 28,
    height: 28,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };

  switch (gesture) {
    case "thumbs-up":
      return (
        <svg {...commonProps}>
          <path d="M14 21v18" />
          <path d="M8 21h6v18H8z" />
          <path d="M14 35h20c2 0 3-1 3-3v-7c0-2-1-4-3-4h-8l2-7c.5-2-1-4-3-4-1 0-2 .7-2.5 2L19 18l-5 3" />
          <path d="M14 35l5 4h12c3 0 5-2 5-5" />
        </svg>
      );

    case "open-hand":
      return (
        <svg {...commonProps}>
          <path d="M12 23V12c0-1.5 1-2.5 2.5-2.5S17 10.5 17 12v9" />
          <path d="M17 21V8.5C17 7 18 6 19.5 6S22 7 22 8.5V21" />
          <path d="M22 20V10c0-1.5 1-2.5 2.5-2.5S27 8.5 27 10v11" />
          <path d="M27 21v-8c0-1.5 1-2.5 2.5-2.5S32 11.5 32 13v13" />
          <path d="M32 24v-3c0-1.5 1-2.5 2.5-2.5S37 19.5 37 21v8c0 7-5 12-12 12h-3c-5 0-9-3-11-7l-4-7c-.8-1.5-.3-3 1-3.7 1.2-.7 2.7-.3 3.5.8L15 29" />
        </svg>
      );

    case "point-left":
      return (
        <svg {...commonProps}>
          <path d="M18 20H7c-1.7 0-3-1.3-3-3s1.3-3 3-3h11" />
          <path d="M18 20l8 8v10H15l-7-8c-1-1.2-1-3 .2-4.1 1.1-1 2.9-.9 3.9.2l2.9 3.1V17" />
          <path d="M18 20V9c0-1.7 1.3-3 3-3s3 1.3 3 3v15" />
          <path d="M24 24V12c0-1.7 1.3-3 3-3s3 1.3 3 3v15" />
          <path d="M30 27V15c0-1.7 1.3-3 3-3s3 1.3 3 3v16" />
        </svg>
      );

    case "two-fingers":
      return (
        <svg {...commonProps}>
          <path d="M17 23V10c0-1.7 1.3-3 3-3s3 1.3 3 3v13" />
          <path d="M23 23V7c0-1.7 1.3-3 3-3s3 1.3 3 3v18" />
          <path d="M29 24v-9c0-1.7 1.3-3 3-3s3 1.3 3 3v13" />
          <path d="M17 21l-3-3c-1.2-1.2-3.1-1.2-4.3 0-1.1 1.1-1.1 2.9 0 4l7 8c2.2 2.5 5.3 4 8.6 4H30c5 0 9-4 9-9v-5" />
          <path d="M23 10V7" />
          <path d="M29 10V7" />
        </svg>
      );

    default:
      return null;
  }
}