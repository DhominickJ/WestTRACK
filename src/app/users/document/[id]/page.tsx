"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { Document, Page, pdfjs } from "react-pdf";

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

  return (
    <>
      <div className="w-full h-20 bg-[#d9d9d9] flex items-center justify-around fixed top-0 z-50">
        <div className="w-[198px] h-[30px] bg-[#0b5ca6] rounded-lg"></div>
        <div className="w-[837px] h-[50px] bg-neutral-100 rounded-lg"></div>
        <div className="w-[115px] h-[30px] bg-[#0b5ca6] rounded-lg"></div>
        <div className="w-[94px] h-[30px] bg-[#d61212] rounded-lg"></div>
      </div>

      <div className="flex w-full h-screen items-start mt-20">
        {/* Left Sidebar */}
        <div className="w-[15rem] h-[calc(100vh-5rem)] bg-[#d9d9d9] rounded-lg fixed left-0 top-20 p-5 overflow-y-auto">
          <div className="document flex flex-col">
            <div className="DocumentInfo text-black text-lg font-bold mb-5">
              <p className="mb-2">Document Info</p>
              <p className="text-base font-medium truncate">{fileData.fileName || "Unknown Document"}</p>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-black font-normal">Requested by:</p>
                <p className="text-black font-bold">{userName}</p>
              </div>
              <div>
                <p className="text-black font-normal">Date:</p>
                <p className="text-black font-bold">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-black font-normal">Time:</p>
                <p className="text-black font-bold">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="flex-grow flex-col ml-[15rem] px-5">
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
        <div className="w-[15rem] h-[calc(100vh-5rem)] bg-[#d9d9d9] rounded-lg fixed right-0 top-20"></div>
      </div>
    </>
  );
}
