"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";

function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      // Start the sign-up process using the provided details
      await signUp.create({
        emailAddress,
        password,
        username,
        firstName,
        lastName,
      });

      // Send a verification email to the user
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true); // Display the verification form
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "An unexpected error occurred.");
    }
  };

  // Handle submission of the email verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/users/home");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  if (verifying) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
            Verify Your Email
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Enter the verification code sent to your email.
          </p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleVerify}>
            <input
              type="text"
              placeholder="Verification Code"
              className="w-full p-3 mb-4 border border-gray-300 rounded text-black"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-semibold py-3 rounded shadow-lg transition duration-300 hover:bg-yellow-600"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden max-w-[900px] w-full">
        <div className="w-1/2 bg-[#0b5ca6] flex flex-col justify-center items-center text-white p-8">
          <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
          <h2 className="text-3xl font-bold mt-4">Sign Up</h2>
        </div>
        <div className="w-1/2 bg-white p-8 relative">
          <button
            className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-black"
            onClick={() => router.back()}
          >
            <span className="mr-2 text-lg">&larr;</span>
            Back
          </button>
          <h3 className="text-2xl font-bold mb-6 mt-10 text-gray-700">
            Create a new account
          </h3>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="flex w-1/2 p-3 mr-2 border border-gray-300 rounded text-black"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-3 border border-gray-300 rounded text-black"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded text-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border border-gray-300 rounded text-black"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-semibold py-3 rounded shadow-lg transition duration-300 hover:bg-yellow-600"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage;