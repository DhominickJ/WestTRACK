// HOME

"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/homeHeader";
import ViewProcessingFilesPage from "@/app/components/RecentDocuments";
import ViewFinishedFilesPage from "@/app/components/CheckedDocuments";
import InteractiveButton from "@/app/components/homeButton";
import Image from 'next/image';
import Link from "next/link";
import AnnouncementList from "@/app/components/announcement";

function RecentDocuments() {

  return <div>

    <h1 className="font-bold opacity-[0.70] text-[12px]">Processing</h1>

    {/* get user files from processing in db */}
    <ViewProcessingFilesPage searchQuery={""} />
    
    <h1 className="font-bold opacity-[0.70] text-[12px] mt-2">Finished</h1>
    {/* get user files from finished in db */}
    <ViewFinishedFilesPage searchQuery={""} />
  </div>;
}

function Announcements() {
  return (
    <><div>Here are the latest announcements...</div>
    <AnnouncementList /></>
  );
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
  const [activeButton, setActiveButton] = useState<string>("Recent Documents");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <>
      <Header onSearch={setSearchQuery} />

      <div className="justify-start h-[325px] w-full bg-homeLightBlueBG bg-opacity-[0.2] p-16 pl-[112px] pt-8 pb-0">
        {/* Other elements */}
      </div>

      <div className="flex pl-12 pt-8 items-center">
        <div className="flex space-x-4">
          <InteractiveButton
            text="Recent Documents"
            isActive={activeButton === "Recent Documents"}
            onClick={() => setActiveButton("Recent Documents")}
          />
          <InteractiveButton
            text="Announcements"
            isActive={activeButton === "Announcements"}
            onClick={() => setActiveButton("Announcements")}
          />
        </div>
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
        {activeButton === "Recent Documents" && (
          <div>
            <h1 className="font-bold opacity-[0.70] text-[12px]">Processing</h1>
            <ViewProcessingFilesPage searchQuery={searchQuery} />
            <h1 className="font-bold opacity-[0.70] text-[12px] mt-2">
              Finished
            </h1>
            <ViewFinishedFilesPage searchQuery={searchQuery} />
          </div>
        )}
        {activeButton === "Announcements" && <Announcements />}
      </div>
    </>
  );
}
