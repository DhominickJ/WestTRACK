"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, Suspense, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

// Import necessary styles
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function DocView() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DocumentContent />
    </Suspense>
  );
}

function DocumentContent() {
  const { id } = useParams(); // Retrieve document ID from URL
  const [fileData, setFileData] = useState<{ fileName: string; fileContent: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();
  const userName = isLoaded ? user?.fullName || user?.emailAddresses[0]?.emailAddress : "Loading...";

  // Ref to prevent repeated state updates
  const isUpdating = useRef(false);

  // Fetch document data when the component mounts
  useEffect(() => {
    const fetchDocument = async () => {
      if (!id) return;

      setLoading(true);
      try {
        let collectionName = "processing"; // Default to "processing"

        const docRefFinished = doc(db, "finished", id as string);
        const docSnapFinished = await getDoc(docRefFinished);

        if (docSnapFinished.exists()) {
          collectionName = "finished";
        } else {
          const docRefProcessing = doc(db, "processing", id as string);
          const docSnapProcessing = await getDoc(docRefProcessing);

          if (docSnapProcessing.exists()) {
            collectionName = "processing";
          } else {
            console.error("No document found with the given ID in both collections.");
            setLoading(false);
            return;
          }
        }

        const docRef = doc(db, collectionName, id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFileData({
            fileName: data.fileName,
            fileContent: data.fileContent, // Base64-encoded PDF
          });
        } else {
          console.error("No document found with the given ID.");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg">Loading document...</div>;
  }

  if (!fileData) {
    return <div className="text-center text-lg">Document not found.</div>;
  }

  function handleDelete(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen bg-[#605D5D]">
      <div className="w-full h-20 bg-[#d9d9d9] flex items-center justify-center fixed top-0 z-50 flex-shrink-0">
        <div className="w-[198px] h-[30px] mr-24 justify-self-auto flex-shrink-0 ml-2">
          <Link href="/users/home">
            <Image
              src="/images/back.svg"
              alt="Logo"
              width={175}
              height={30}
              className="cursor-pointer"
            />
          </Link>
        </div>

        <div className="w-[837px] h-[50px] bg-neutral-100 rounded-lg flex items-center justify-center">
          <h1 className="text-base font-bold truncate">
            {fileData.fileName || "Unknown Document"}
          </h1>
        </div>

        <div className="flex flex-row ml-24 justify-self-end justify-between">
          <div className="w-[115px] h-[30px] mr-3">
            <Image
              src="/images/Download.svg"
              alt="Download"
              width={115}
              height={30}
              className="cursor-pointer"
              onClick={() => {
                const link = document.createElement('a');
                link.href = `data:application/pdf;base64,${fileData.fileContent}`;
                link.download = fileData.fileName || "download.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            />
          </div>

          <div className="w-[115px] h-[30px]">
            <Image
              src="/images/delete.svg"
              alt="delete"
              width={100}
              height={30}
              className="cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full h-full items-start mt-20">
        {/* Left Sidebar */}
        <div className="w-[16rem] h-[550px] bg-[#d9d9d9] rounded-lg fixed left-0 top-100 p-5 overflow-y-auto mt-12">
          <div className="document flex flex-col">
            <div className="DocumentInfo text-black text-lg font-bold mb-3">
              <p className="mb-2">Document Info</p>
              <p className="text-base font-medium truncate">ℹ️ {fileData.fileName || "Unknown Document"}</p>
            </div>
            <div className="space-y-4 text-sm mt-2">
              <div>
                <p className="text-black font-normal">Requested by:</p>
                <p className="text-black font-bold">👨🏽‍🎓 {userName}</p>
              </div>
              <div>
                <p className="text-black font-normal">Date:</p>
                <p className="text-black font-bold">📅 {new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-black font-normal">Time:</p>
                <p className="text-black font-bold">🕒 {new Date().toLocaleTimeString()}</p>
              </div>
              <hr style={{ backgroundColor: 'black', opacity: 0.3, height: '1px', border: 'none', marginBottom: "12px", marginTop: "16px" }} />
              <div className="Progress text-black text-lg font-bold mb-3">
                <p className="mb-2">Progress</p>
                <p className="text-base font-medium truncate">{fileData.fileName || "Unknown Document"}</p>
              </div>
            </div>
          </div>
        </div>

          {/* Document Viewer */}
          <div className="flex-grow flex flex-col items-center justify-center mx-auto px-5 mt-6">
          <div className="relative overflow-hidden w-6/12 h-full flex flex-col items-center justify-center">
            {/* Embed PDF in an iframe */}
            <iframe
              src={`data:application/pdf;base64,${fileData.fileContent}`}
              width="100%"
              height="800px" // Adjust as needed
              className="border border-gray-300 shadow-lg"
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[16rem] h-[550px] bg-[#d9d9d9] rounded-lg fixed right-0 top-100 p-5 overflow-y-auto mt-12 ">
          <div className="EditAndSign text-black text-lg font-bold mb-3">
            <p className="mb-2 items-end justify-end">Edit and Sign PDF</p>
            <div className="flex flex-col items-center justify-center right-0">

            <Image 
              src="/images/editpdf.svg" 
              alt="Edit"  
              width={200} 
              height={200} 
              className="cursor-pointer mb-2"
              onClick={() => alert("Edit PDF")} //change this functionn please
              />

            <Image 
              src="/images/signpdf.svg" 
              alt="Edit" 
              width={200} 
              height={200} 
              className="cursor-pointer"
              onClick={() => alert("Edit PDF")} //change this functionn please
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
