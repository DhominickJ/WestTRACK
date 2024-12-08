"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface RequestBtnProps {
  text: string;
  isActive: boolean;
  redirectTo: string; // The URL to navigate to
}

export default function RequestBtn({
  text,
  isActive,
  redirectTo,
}: RequestBtnProps) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(redirectTo); // Navigate to the specified page
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20%",
        right: "35%",
        zIndex: 2,
      }}
    >
      <Button
        onClick={handleRedirect}
        style={{
          padding: "15px 30px",
          backgroundColor: isActive ? "#FFD700" : "#ccc", // Change color based on active state
          color: isActive ? "#000000" : "#888",
          border: "10px",
          borderRadius: "15px",
          fontWeight: "medium",
          cursor: isActive ? "pointer" : "not-allowed",
          boxShadow: isActive ? "2px 2px 5px rgba(0, 0, 0, 0.3)" : "none",
        }}
        disabled={!isActive} // Disable button if not active
        variant={"outline"}
        className={`rounded-full absolute z-10 ${
          isActive
            ? "bg-homeLightBlueBG text-white border-transparent" // Active: No visible border
            : "bg-westTrackGray text-black border-black border-opacity-[0.5]" // Inactive: Black border
        }`}
      >
        {text}
      </Button>
    </div>
  );
}
