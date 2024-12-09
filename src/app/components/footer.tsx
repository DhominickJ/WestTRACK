import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f5f5f5",
        padding: "1rem 2rem",
        borderTop: "2px solid #FFD700",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Logo and Tagline */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Image
            src="/images/logo_icon.png"
            alt="WestTrack Logo Icon"
            width={40}
            height={40}
            priority
          />
          <Image
            src="/images/logo_name.png"
            alt="WestTrack Logo Text"
            width={120}
            height={40}
          />
        </div>

        {/* Tagline */}
        <div style={{ textAlign: "left", marginTop: "0.5rem" }}>
          <p style={{ margin: 0, fontStyle: "italic", color: "#333" }}>
            Transact like never before
          </p>
        </div>

        {/* Navigation Links */}
        <div style={{ textAlign: "right" }}>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              gap: "1.5rem",
              fontSize: "14px",
            }}
          >
            <li>
              <a
                href="/users/home"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/users/about"
                style={{ textDecoration: "none", color: "#333" }}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#notifications"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Notifications
              </a>
            </li>
            <li>
              <a
                href="/users/home"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Edit a Document
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <p
        style={{
          marginTop: "1rem",
          fontSize: "14px",
          color: "#666",
        }}
      >
        © 2024 WESTTRACK. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
