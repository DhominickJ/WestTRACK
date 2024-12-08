// HOME

"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/homeHeader";
import ViewProcessingFilesPage from "@/app/components/RecentDocuments";
import ViewFinishedFilesPage from "@/app/components/CheckedDocuments";
import InteractiveButton from "@/app/components/homeButton";
import Image from 'next/image';
import Link from "next/link";

function RecentDocuments() {

  return <div>

    <h1 className="font-bold opacity-[0.70] text-[12px]">Processing</h1>

    {/* get user files from processing in db */}
    <ViewProcessingFilesPage />
    
    <h1 className="font-bold opacity-[0.70] text-[12px] mt-2">Finished</h1>
    {/* get user files from finished in db */}
    <ViewFinishedFilesPage />
  </div>;
}

function Announcements() {


  return <div>Here are the latest announcements...</div>;

  
}

function downloadPdf(fileName: string) {
  const link = document.createElement('a');
  link.href = fileName;
  link.download = fileName.split('/').pop() || 'default-filename'; // Extracts the filename from the path
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Home() {
    // Set "Recent Documents" as the default active button
    const [activeButton, setActiveButton] = useState<string>("Recent Documents"); 

  return (
    <>
      <Header />

      <div className="justify-start h-[325px] w-full bg-homeLightBlueBG bg-opacity-[0.2] p-16 pl-[112px] pt-8 pb-0">
        
        
        <h1 className="font-bold opacity-[0.70] text-[12px]">
          Request a New Document
        </h1>

        {/* <iframe
          src={`${filePreview}#toolbar=0&navpanes=0&scrollbar=0`}
          // type="application/pdf"
          width="600"
          height="400"
          style={{
            border: 'none',
            overflow: 'hidden', // Prevents scrolling within the iframe
            display: 'block',
          }}
        ></iframe> */}
        <div className="flex flex-row mt-4 justify-evenly ">

          <Link href="/users/upload">
          <div className="first w-[180px] mt-2 justify-center align-middle"> {/* Set a fixed width for the container */}
            <Image 
              src="/images/AddFiles.png"
              alt="Add File"
              width={130}
              height={10}
              className="cursor-pointer"
            />
            <p className="mt-3 text-[12px] truncate"> {/* 'truncate' class will apply the necessary styles */}
              Add File
            </p>
          </div>
              </Link>

          <div className="second w-[180px] mt-2 justify-center align-middle"> {/* Set a fixed width for the container */}
            <Image 
              src="/pdf_templates/StudentOrganizations/Application for Approval-Accreditation of Student Organizations.png"
              alt="Add File"
              width={130}
              height={10}
              onClick={() =>{
                downloadPdf("/pdf_templates/StudentOrganizations/Application for Approval-Accreditation of Student Organizations.pdf");
                alert("Downloaded File");
              }}
              className="cursor-pointer"
            />
            <p className="mt-3 text-[12px] truncate"> {/* 'truncate' class will apply the necessary styles */}
              Application for Approval-Accreditation of Student Organizations
            </p>
          </div>

          {/* <div className="third w-[180px] mt-2 justify-center align-middle"> 
            <Image 
              src="/pdf_templates/StudentOrganizations/Medical Health Record Form.png"
              alt="Medical Health Record Form"
              width={130}
              height={10}
              onClick={() => alert("Add File")}
              className="cursor-pointer"
            />
            <p className="mt-3 text-[12px] truncate"> 
            Medical Health Record Form
            </p>
          </div> */}

          <div className="fourth w-[180px] mt-2 justify-center align-middle"> {/* Set a fixed width for the container */}
            <Image 
              src="/pdf_templates/StudentOrganizations/Parents-Guardians Consent.png"
              alt="Parents-Guardians Consent"
              width={130}
              height={10} 
              onClick={() => {
                downloadPdf("/pdf_templates/StudentOrganizations/Parents-Guardians Consent.pdf");
                alert("Downloaded File");
              }}
              className="cursor-pointer"
            />
            <p className="mt-3 text-[12px] truncate"> {/* 'truncate' class will apply the necessary styles */}
            Parents-Guardians Consent
            </p>
          </div>

          <div className="fifth w-[180px] mt-2 justify-center align-middle"> {/* Set a fixed width for the container */}
            <Image 
              src="/pdf_templates/StudentOrganizations/Permit B to Conduct Non-Academic Student Activities Off-Campus.png"
              alt="Permit B to Conduct Non-Academic Student Activities Off-Campus"
              width={130}
              height={10}
              onClick={() => {
                downloadPdf("/pdf_templates/StudentOrganizations/Permit B to Conduct Non-Academic Student Activities Off-Campus.pdf");
                alert("Downloaded File");
              }}
              className="cursor-pointer"
            />
            <p className="mt-3 text-[12px] truncate"> {/* 'truncate' class will apply the necessary styles */}
            Permit B to Conduct Non-Academic Student Activities Off-Campus
            </p>
          </div>

          <div className="sixth w-[180px] mt-2 justify-center align-middle"> {/* Set a fixed width for the container */}
            <Image 
              src="/pdf_templates/StudentOrganizations/Permit B to Conduct Non-Academic Student Activities Within Campus.png"
              alt="Permit B to Conduct Non-Academic Student Activities Within Campus"
              width={130}
              height={10}
              onClick={() => {
                downloadPdf("/pdf_templates/StudentOrganizations/Permit B to Conduct Non-Academic Student Activities Within Campus.pdf");
                alert("Downloaded File");
              }}
              className="cursor-pointer"
            />
            <p className="mt-3 text-[12px] truncate"> {/* 'truncate' class will apply the necessary styles */}
            Permit B to Conduct Non-Academic Student Activities Within Campus
            </p>
          </div>
      </div>
        
      </div>

      <div className="flex pl-12 pt-8 items-center">
        {/* Left-aligned Buttons */}
        <div className="flex space-x-4">
          {/* Button 1: Recent Documents */}
          <InteractiveButton
            text="Recent Documents"
            isActive={activeButton === "Recent Documents"}
            onClick={() => setActiveButton("Recent Documents")}
          />

          {/* Button 2: Announcements */}
          <InteractiveButton
            text="Announcements"
            isActive={activeButton === "Announcements"}
            onClick={() => setActiveButton("Announcements")}
          />
        </div>

        {/* Button 3 - Files Route */}
        <Link href="/users/files" className="ml-auto mr-10">
          <Image 
            src={"/images/Folder.svg"}
            alt={"Folder Icon"}
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </Link>
      </div>


      <div className="p-8 ml-5">
        {/* Render different components based on the active button */}
        {activeButton === "Recent Documents" && <RecentDocuments />}
        {activeButton === "Announcements" && <Announcements />}
      </div>
    </>
  );
}
