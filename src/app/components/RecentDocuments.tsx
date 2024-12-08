"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { Document, Page, pdfjs } from "react-pdf";

// Import required styles for annotation and text layers
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure the worker file
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

interface FileData {
  id: string;
  fileName: string;
  fileContent: string; // Base64 encoded string
}

interface PdfViewerProps {
  searchQuery: string;
}

export default function PdfViewer({ searchQuery }: PdfViewerProps) {
  const { userId: clerkUserId, isLoaded } = useAuth();
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!clerkUserId || !isLoaded) {
        setFiles([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const q = query(
          collection(db, "processing"),
          where("userId", "==", clerkUserId)
        );
        const querySnapshot = await getDocs(q);

        const fetchedFiles: FileData[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            fileName: data.fileName,
            fileContent: data.fileContent, // Base64 string from Firestore
          };
        });

        setFiles(fetchedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [clerkUserId, isLoaded]);

  // Filter files based on the search query
  const filteredFiles = files.filter((file) =>
    file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container flex justify-between items-start min-h-96">
      {loading ? (
        <p>Loading files...</p>
      ) : filteredFiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className="border p-4 text-center truncate max-w-[300px] justify-self-center self-start ml-24"
            >
              <div className="relative overflow-hidden w-[250px] h-[350px] border border-black cursor-pointer transition-all duration-300 hover:border-homeLightBlueBG hover:shadow-lg">
                <Document
                  file={`data:application/pdf;base64,${file.fileContent}`}
                  className="w-full h-full flex justify-center"
                >
                  <Page pageNumber={1} scale={1} width={250} />
                </Document>
              </div>
              <p className="mt-2 text-[12px] text-left">{file.fileName}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-[12px] text-left">No files found.</p>
      )}
    </div>
  );
}
