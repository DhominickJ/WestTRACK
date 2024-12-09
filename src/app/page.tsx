"use client";

import { useEffect } from "react";
import Image from "next/image";
import Header from "./components/header";
import RequestBtn from "./components/request";
import ContentLoader from "./components/content-loader";
import LandingSection from "./components/landingSection";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <RequestBtn
      text="Request a Document"
      isActive={true}
      redirectTo="/users/home" // The URL to navigate to
      />
      <LandingSection />

      {/* Features Section */}
      <ContentLoader
        header="Fast and Reliable"
        content="Every request goes through a seamless process, giving you updates in real-time – no more endless waiting."
        imgSrc="/icons/paper_fast.png"
        imgPos="right"
        bgColor="white"
      />
      <ContentLoader
        header="Effortless Experience"
        content="Our system guides your requests from start to finish with clarity and ease – making the process straightforward and stress-free."
        imgSrc="/icons/easy.png"
        imgPos="left"
        bgColor="[#0b5ca6]"
      />
      <ContentLoader
        header="Protected at Every Step"
        content="We prioritize your privacy with comprehensive encryption and strict data handling standards."
        imgSrc="/icons/secure.png"
        imgPos="right"
        bgColor="white"
      />

      {/* Trusted Offices Section */}
      <div
        style={{
          maxHeight: "700px",
          backgroundColor: "#133683",
          color: "#ffffff",
          padding: "2rem",
          height: "700",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Trusted by Administrative Offices
        </h1>
        <p style={{ textAlign: "center", marginBottom: "2rem" }}>
          Our platform is trusted by administrative offices for its reliability,
          security, and efficiency in handling document requests.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Image
              src="/icons/gso.png"
              alt="General Services Office"
              width={80}
              height={80}
            />
            <p>General Services Office (GSO)</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Image
              src="/icons/osa.png"
              alt="Office of Student Affairs"
              width={80}
              height={80}
            />
            <p>Office of Student Affairs (OSA)</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Image
              src="/icons/op.png"
              alt="Office of the President"
              width={80}
              height={80}
            />
            <p>Office of the President (OP)</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Image
              src="/icons/oniclub.png"
              alt="Mommy Oni Club PH"
              width={80}
              height={80}
            />
            <p>
              Mommy Oni Club PH - Western Visayas Chapter (50th Anniversary)
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div
        style={{
          maxHeight: "700px",
          backgroundColor: "#f9f9f9",
          padding: "2rem 1rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#133683", marginBottom: "1rem" }}>
          What Users Think
        </h1>
        <p style={{ marginBottom: "2rem" }}>
          Explore honest reviews and ratings from users who’ve experienced our
          seamless process firsthand.
        </p>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "1.5rem",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            position: "relative",
          }}
        >
          <Image
            src="/images/member.png"
            alt="User Profile"
            width={60}
            height={60}
            style={{
              borderRadius: "50%",
              margin: "0 auto",
              display: "block",
            }}
          />
          <p style={{ fontWeight: "bold", marginTop: "1rem" }}>
            Tanya T., Administrative Officer
          </p>
          <div
            style={{
              color: "#FFC107",
              fontSize: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            ★★★★★
          </div>
          <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
            I've never been a fan of paperwork, but with WestTrack, it's like a
            breath of fresh air! The whole process is faster than my morning
            coffee, and the real-time updates keep me in the loop. No more
            waiting around for ages to get things done. I can finally enjoy my
            lunch without stressing over documents. Highly recommend – this is
            the future of paperwork, folks!
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
