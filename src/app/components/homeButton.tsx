// homeButton.tsx

"use client";

import { useRouter } from "next/navigation";

interface RedirectButtonProps {
  text: string;
  isActive: boolean;
  redirectTo?: string;
  onClick?: () => void;
}

export default function InteractiveButton({
  text,
  isActive,
  redirectTo,
  onClick,
}: RedirectButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (redirectTo) {
      router.push(redirectTo);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-[50px] transition-colors duration-300 border-[1px] text-[12px] ${
        isActive
          ? "bg-homeLightBlueBG text-white border-transparent" // Active: No visible border
          : "bg-westTrackGray text-black border-black border-opacity-[0.5]" // Inactive: Black border
      }`}
    >
      {text}
    </button>
  );
}
