"use client";
import React, { useEffect } from "react";
import { useSignIn } from "@clerk/nextjs";
import Image from "next/image";

export function CustomGoogleOneTap() {
  const { signIn, isLoaded } = useSignIn();

  const handleGoogleSignIn = async () => {
    try {
      if (!isLoaded) {
        throw new Error("Clerk is not loaded yet");
      }

      if (!signIn) {
        throw new Error("signIn is undefined");
      }

      console.log("Initiating Google sign-in...");

      // Authenticate with Google OAuth
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrlComplete: "/users/home",
        redirectUrl: ""
      });

      console.log("Google sign-in initiated successfully");
    } catch (err) {
      console.error("Error during Google sign-in:", err);
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleGoogleSignIn}>
      <Image
        src="/images/google.svg"
        alt="Sign in with Google"
        width={20}
        height={20}
      />
    </div>
  );
}
