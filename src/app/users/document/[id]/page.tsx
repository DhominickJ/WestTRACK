"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { Document, Page, pdfjs } from "react-pdf";
import Image from "next/image";
import Link from "next/link";


// Import required styles for annotation and text layers
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure the worker file
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

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
  const [numPages, setNumPages] = useState<number>(0); // Track total pages
  const { user, isLoaded } = useUser();
  const userName = isLoaded ? user?.fullName || user?.emailAddresses[0]?.emailAddress : "Loading...";

  useEffect(() => {
    const fetchDocument = async () => {
      if (!id) return;

      setLoading(true);
      try {
        let collectionName = "processing"; // Default to "processing"

        // Check if the document exists in the "finished" collection
        const docRefFinished = doc(db, "finished", id as string);
        const docSnapFinished = await getDoc(docRefFinished);

        if (docSnapFinished.exists()) {
          collectionName = "finished";
        } else {
          // If not found in "finished", try the "processing" collection
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

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  if (loading) {
    return <div className="text-center text-lg">Loading document...</div>;
  }

  if (!fileData) {
    return <div className="text-center text-lg">Document not found.</div>;
  }

  const handleDelete = async () => {
    if (!id) return;
  
    try {
      const docRef = doc(db, "processing", id as string);
      await deleteDoc(docRef);
      alert("Document deleted successfully.");
      // Optionally, redirect the user after deletion
      window.location.href = "/users/home";
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete the document.");
    }
  };

  return (
    <>
    <div className="w-full h-20 bg-[#d9d9d9] flex items-center justify-center fixed top-0 z-50 flex-shrink-0"> 
      <div className="w-[198px] h-[30px] mr-24 justify-self-auto flex-shrink-0 ml-2">
        <Link href="  /users/home"> 
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

      <div className="flex w-full h-screen items-start mt-20">

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

            <hr style={{ backgroundColor: 'black', opacity: 0.3, height: '1px', border: 'none', marginBottom: "12px", marginTop: "16px"}} />
              <div className="Progress text-black text-lg font-bold mb-3">
              <p className="mb-2">Progress</p>
              <p className="text-base font-medium truncate">{fileData.fileName || "Unknown Document"}</p>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Document Viewer */}
        <div className="flex-grow flex-col mx-auto px-5">
          <div className="relative overflow-hidden w-full h-full flex flex-col items-center">
            <Document
              file={`data:application/pdf;base64,${fileData.fileContent}`}
              onLoadSuccess={handleDocumentLoadSuccess}
              className="w-full flex flex-col items-center"
            >
              {/* Render all pages */}
              {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} className="my-4">
                  <Page pageNumber={index + 1} width={600} />
                </div>
              ))}
            </Document>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[16rem] h-[550px] bg-[#d9d9d9] rounded-lg fixed right-0 top-100 p-5 overflow-y-auto mt-12">
        </div>
      </div>

    </>
  );
}
