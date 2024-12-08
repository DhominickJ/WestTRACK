// This page will be used to view the document to be signed by the student

"use client";

import { File } from "@/app/api/fileOperations";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getFileById } from "@/app/api/fileOperations";
import { useUser } from "@clerk/nextjs";
import {
  FaRegFileAlt,
  FaRegIdCard,
  FaRegCalendarAlt,
  FaRegClock,
  FaUserGraduate,
} from "react-icons/fa";

function DocumentContent() {
  const searchParams = useSearchParams();
  const fileId = searchParams.get("fileId");
  const [file, setFile] = useState<File | null>(null);
  const { user, isLoaded } = useUser();
  const userName = isLoaded ? user?.fullName || user?.emailAddresses[0]?.emailAddress : null;

  useEffect(() => {
    if (fileId) {
      getFileById(fileId as string)
        .then(setFile)
        .catch(console.error);
    }
  }, [fileId]);

  return (
    <>
      <div className="w-full h-20 bg-[#d9d9d9] flex items-center justify-around ">
        <div className="w-[198px] h-[30px] bg-[#0b5ca6] rounded-lg"></div>
        <div className="w-[837px] h-[50px] bg-neutral-100 rounded-lg"></div>
        <div className="w-[115px] h-[30px] bg-[#0b5ca6] rounded-lg"></div>
        <div className="w-[94px] h-[30px] bg-[#d61212] rounded-lg"></div>
      </div>
      <div className="flex w-full h-screen items-center justify-center">
        <div className="w-[15rem] h-[90vh] bg-[#d9d9d9] rounded-lg">
          <div className="document flex flex-col pt-5">
            <div className="DocumentInfo w-72 h-6 pb-10 pl-2 text-black text-2xl font-bold">
              <p>Document Info</p>
              <div className="flex items-center ">
                <FaRegFileAlt className="ml-2" />
                <p className="PermitToUseFacilities pl-5 text-black text-base font-bold ">
                  Permit to Use Facilities
                </p>
              </div>
            </div>
            <div className="pl-10 pt-5 text-ms">
              <div className="flex items-center">
                <FaRegIdCard className="mr-5" />
                <p className="text-black font-normal  underline">
                  Requested by:{" "}
                </p>
              </div>
              <p className="text-black font-bold underline ml-5">
                {userName || "Loading..."}
              </p>
              <div className="flex items-center">
                <FaRegCalendarAlt className="mr-5" />
                <p className="text-black font-normal underline">
                  Date:{" "}
                </p>
              </div>
              <p className="text-black font-bold underline ml-5">
                November 14, 2024
              </p>
              <div className="flex items-center">
                <FaRegClock className="mr-5" />
                <p className="text-black font-normal underline">
                  Time:{" "}
                </p>
              </div>
              <p className="text-black font-bold underline ml-5">
                12:51 PM
              </p>
              <div className="flex items-center">
                <FaUserGraduate className="mr-5" />
                <p className="text-black font-normal underline">
                  Program:{" "}
                </p>
              </div>
              <p className="text-black font-bold underline ml-5">
                BSCS 3-A AI
              </p>
            </div>
          </div>
          <div className="document flex flex-col pt-5">
            <div className="DocumentInfo w-72 h-6 pb-10 pl-2 text-black text-2xl font-bold">
              <p>Downloadables</p>
              <div className="flex items-center ">
                <FaRegFileAlt className="ml-2" />
                <p className="PermitToUseFacilities pl-5 text-black text-base font-bold">
                  Permit Templates
                </p>
              </div>
              <div className="flex items-center w-40">
                <FaRegFileAlt className="ml-5 w-9" />
                <p className="LetterDean pl-5 text-black font-normal text-sm">
                  Letter of the Dean Template
                </p>
              </div>
            </div>
          </div>
        </div>
        {
          <div className="flex-grow flex-col w-full mt-[-5]">
            {file ? (
              <iframe
                title="Document Viewer"
                src={`data:application/pdf;base64,${file?.fileContent || ""}`}
                width="100%"
                height="600px"
              />
            ) : (
              <h2> File Loading! </h2>
            )}
          </div>
        }
        <div>
          <div className="w-[15rem] h-[90vh] bg-[#d9d9d9] rounded-lg"></div>
        </div>
      </div>
    </>
  );
}

export default function DocView() {
  return (
    <Suspense fallback={<div> Loading... </div>}>
      <DocumentContent />
    </Suspense>
  );
}
