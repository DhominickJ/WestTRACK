"use client";

import { useState } from "react";
import Header from "@/app/components/homeHeader";
import InteractiveButton from "@/app/components/homeButton";

function About(){
    return(
      <>
      <Header />
      
      <div
        className="relative h-[540px] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
      >
        <div className="absolute inset-0 bg-[hsla(var(--primary-color),0.7)]"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4">
          <h1 className="text-white font-bold text-4xl md:text-6xl text-center">
            We are WestTRACK.
          </h1>
          <h1 className="text-white font-light text-base md:text-2xl text-center">
            Transforming document processing to make your life easier.
          </h1>
        </div>
        </div>

        <div className="relative w-full px-8 py-16 bg-[hsl(var(--secondary-color))]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h1 className="text-[40px] md:ml-[0px] md:text-[60px] mt-[-20px] text-center font-bold text-[hsl(var(--primary-color))] leading-tight">
                Our Story
              </h1>
              <p className="text-lg sm:text-base md:text-lg md:pt-[30px] p-[20px] md:pr-[10px] md:pl-[60px] md:text-1xl text-black">
                WestTrack began as a simple idea from a group of six students, inspired by the challenges students face when processing paperwork. Recognizing these struggles, the group envisioned a way to simplify transactions and speed up processes across various WVSU offices.
              </p>
                <p className="text-lg sm:text-base md:text-lg p-[20px] md:pr-[10px] md:pl-[60px] md:mt-[0px] md:text-1xl text-black">
                Motivated by shared frustrations, the team brought WestTrack to life as more than a solution—it’s a platform designed to save time, reduce stress, and showcase what students can achieve when united by a common goal.
              </p>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center md:justify-start space-y-5">
              <div className="flex justify-center mt-8">
                <img src="/Graphics/icon.svg" alt="Our Story Image" className="w-full md:w-[600px] md:mr-[0px] md:mt-[5px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[530px] px-8 py-0 bg-[hsl(var(--primary-color))]">
        <div className="mx-auto flex flex-col md:flex-row-reverse">
          <div className="md:w-1/2 flex flex-col justify-center items-center">
            <h1 className="text-[hsl(var(--secondary-color))] text-[40px] mt-[30px] md:text-[60px] md:ml-[30px] text-center font-bold leading-tight md:mt-[70px]">
              Our Mission
            </h1>

            <p className="text-lg sm:text-base md:text-lg md:pt-[200px] p-[20px] mt-[0px] md:mt-[-160px] md:pr-[10px] md:ml-[70px] md:mr-[10px] md:text-1xl text-white">
              WVSU commits to revolutionize document transactions at West Visayas State University by providing a seamless digital solution. We strive to enhance efficiency and create a hassle-free experience for both students and staff, simplifying paperwork and saving valuable time.
            </p>
            </div>
          <div className="flex flex-col">
              <div className="flex justify-center mt-0">
                <img src="/images/mission.png" alt="Mission" className="w-full mt-[-10px] w-[299px] md:w-[600px] md:ml-[-20px] md:mt-[90px]" />
              </div>
            </div>
        </div>
      </div>

      <div className="relative w-full h-[530px] px-8 py-0 bg-[hsl(var(--secondary-color))]">
        <div className="mx-auto flex flex-col md:flex-row">
          <div className="md:w-1/2 flex flex-col justify-center items-center">
            <h1 className="text-[hsl(var(--primary-color))] text-[40px] mt-[30px] md:text-[60px] md:ml-[0px] md:mr-[-20px] text-center font-bold leading-tight md:mt-[50px]">
              Our Vision
            </h1>

            <p className="text-lg sm:text-base text-[hsl(var(--primary-color))] md:text-lg md:pt-[40px] p-[20px] mt-[0px] md:pr-[10px] md:ml-[40px] md:mr-[0px] md:text-1xl">
              At WestTrack, we aim to improve academic processes at West Visayas State University by creating a simple, student-focused platform. Our goal is to make document transactions more efficient and secure, helping both students and staff complete their tasks with ease.
            </p>
    
          </div>
          <div className="flex flex-col">
              <div className="flex justify-center mt-0">
                <img src="/images/vision.png" alt="Vision" className="w-full mt-[-10px] w-[299px] md:w-[600px] md:ml-[20px] md:mt-[100px]" />
              </div>
            </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center w-full bg-[url('/images/pattern.png')] bg-cover bg-center py-16"> 
        <div className="w-full max-w-4xl h-[530px] bg-none flex flex-col items-center justify-center rounded-lg">
          <div className=" w-full sm:w-[800px] h-auto sm:h-[400px] bg-[hsl(var(--primary-color))] text-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4 md:text-[50px] md:mt-[15px] text-center">How WestTrack Works</h2>
            <p className="text-base mt-[10px] md:text-[20px] md:mt-[40px]">
            WestTrack revolutionizes the way students access official documents with a streamlined and secure process. Requests are submitted through our easy-to-use online platform, automatically routed to the appropriate offices for processing and approval.
            </p>
            <p className="text-base mt-[15px] md:text-[20px] md:mt-[20px]">
            Throughout the transaction, users receive real-time updates, ensuring full transparency and eliminating unnecessary follow-ups. Our system prioritizes security, keeping all personal and document data safe. Once approved, documents are either delivered digitally or made ready for convenient pick-up.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[60px] md:mt-[60px] font-bold text-[hsl(var(--primary-color))]">Meet the Team</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8">
          
          {/* <!-- Bergancia --> */}
          <div className="text-center">
            <img src="/images/Bergancia.png" alt="Team Member 1" className="w-full h-auto rounded-full mb-0"/>
            <h3 className="text-lg font-semibold md:mt-[14px]">Mauricio Manuel Bergancia</h3>
            <h3 className="text-md font-regular text-[hsl(var(--primary-color))]">Full-Stack Developer</h3>
          </div>

          {/* <!-- Billena --> */}
          <div className="text-center">
            <img src="/images/Billena.png" alt="Team Member 2" className="w-full h-auto rounded-full mb-4"/>
            <h3 className="text-lg font-semibold">Dhominick John Billena</h3>
            <h3 className="text-md font-regular text-[hsl(var(--primary-color))]">Full-Stack Developer</h3>
          </div>

          {/* <!-- Calanuga --> */}
          <div className="text-center">
            <img src="/images/Calanuga.png" alt="Team Member 3" className="w-full h-auto rounded-full mb-4"/>
            <h3 className="text-lg font-semibold">Gillie Calanuga</h3>
            <h3 className="text-md font-regular text-[hsl(var(--primary-color))]">Project Manager</h3>
          </div>

          {/* <!-- Chavez --> */}
          <div className="text-center">
            <img src="/images/Chavez.png" alt="Team Member 4" className="w-full h-auto rounded-full mb-4 md:mt-[50px]"/>
            <h3 className="text-lg font-bold">Mherlie Joy Chavez</h3>
            <h3 className="text-md font-regular text-[hsl(var(--primary-color))]">Technical Writer</h3>
          </div>

          {/* <!-- Torreverde --> */}
          <div className="text-center">
            <img src="/images/Torreverde.png" alt="Team Member 5" className="w-full h-auto rounded-full mb-4 md:mt-[50px]"/>
            <h3 className="text-lg font-semibold">Mariane Faith Torreverde</h3>
            <h3 className="text-md font-regular text-[hsl(var(--primary-color))]">Front-End Developer</h3>
          </div>

          {/* <!-- Tuando --> */}
          <div className="text-center">
            <img src="/images/Tuando.png" alt="Team Member 6" className="w-full h-auto rounded-full mb-4 md:mt-[50px]"/>
            <h3 className="text-lg font-semibold">Michael Rey Tuando</h3>
            <h3 className="text-md font-regular text-[hsl(var(--primary-color))]">UI/UX Designer</h3>
          </div>
        </div>
      </div>
      </>
    )
}

export default About;