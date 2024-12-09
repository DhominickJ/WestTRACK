import React from "react";
import Image from "next/image";

const LandingSection = () => {
  return (
    <div
      style={{
        position: "relative",
        height: "700px",
        width: "100%",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Background Image */}
      <Image
        src="/images/Home_bg.png"
        alt="Background"
        fill
        style={{ 
          objectFit: "cover",
          margin: 0,
          padding: 0,
         }}
      />

      {/* Logo and Tagline */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          zIndex: 2,
        }}
      >
        {/* Logo */}
        <div>
          <Image
            src="/images/logo.png"
            alt="WestTrack Logo"
            width={350}
            height={250}
          />
        </div>

        {/* Tagline */}
        <p
          style={{
            margin: "25px 10%",
            fontSize: "18px",
            fontStyle: "italic",
            color: "#000000",
            textAlign: "center",
          }}
        >
          Transact like never before
        </p>
      </div>
    </div>
  );
};

export default LandingSection;
