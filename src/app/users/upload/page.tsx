"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "@clerk/nextjs";
import { CloudUpload, UploadIcon, Trash2Icon } from "lucide-react";

export default function UploadPage() {
  const { userId, isLoaded } = useAuth(); // Clerk's useAuth hook for userId
  const [fileName, setFileName] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  interface Base64Data {
    base64Data: string;
    fileName: string;
  }

  // File Selection Handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setMessage("Please select a file!");
      return;
    }

    // Preparing for Storage by converting the file to base64
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string; // Converting to String
      const base64Data = base64.split(",")[1];
      localStorage.setItem("uploadedFile", base64Data);
      localStorage.setItem("uploadedFileName", file.name);
      setFileName(file.name);
      setFilePreview(base64);
      setMessage(`File '${file.name}' saved to localStorage`);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = async ({ base64Data, fileName }: Base64Data) => {
    if (!isLoaded || !userId) {
      setMessage("User not authenticated. Please log in.");
      return;
    }

    setUploading(true);

    try {
      await addDoc(collection(db, "processing"), {
        userId: userId, // Clerk's authenticated userId
        fileName: fileName,
        fileType: "application/pdf",
        fileContent: base64Data,
        status: "processed",
        createdAt: new Date(),
      });

      alert("File Uploaded Successfully!");
    } catch (error) {
      console.error("Error uploading file: ", error);
      alert("File Upload Failed!");
    } finally {
      setUploading(false);
    }
  };

  // Clearing the LocalStorage of the file system
  const clearStorage = () => {
    localStorage.removeItem("uploadedFile");
    localStorage.removeItem("uploadedFileName");
    setFileName(null);
    setFilePreview(null);
    setMessage("Cleared PDF!");
    (document.getElementById("fileUpload") as HTMLInputElement).value = "";
  };

  // return (
  //   <div className="container">
  //     <h1>Upload a File!</h1>
  //     <label htmlFor="fileUpload">Upload File:</label>
  //     <input
  //       id="fileUpload"
  //       type="file"
  //       onChange={handleFileChange}
  //       title="Choose a file"
  //     />
  //     {fileName && (
  //       <>
  //         <p>Stored File: {fileName}</p>
  //         {filePreview && (
  //           <div>
  //             <strong>Preview:</strong>
  //             <embed
  //               src={filePreview}
  //               type="application/pdf"
  //               width="600"
  //               height="400"
  //             />
  //           </div>
  //         )}
  //         <button
  //           onClick={() =>
  //             handleUploadClick({
  //               base64Data: localStorage.getItem("uploadedFile") || "",
  //               fileName: localStorage.getItem("uploadedFileName") || "",
  //             })
  //           }
  //           disabled={uploading}
  //         >
  //           {uploading ? "Uploading..." : "Upload PDF"}
  //         </button>
  //       </>
  //     )}
  //     <button onClick={clearStorage} style={{ marginTop: "10px" }}>
  //       Clear Storage
  //     </button>
  //     {message && <p>{message}</p>}
  //   </div>
  // );

  return (
    <div className="flex flex-row items-center justify-center min-h-screen py-2 bg-gray-100 sm:text-sm transition duration-500 ease-in-out transform hover:scale-102">
      <div className="w-full max-w-md p-8 space-y-6 bg-homeLightBlueBG rounded shadow-md text-white">
        <h1 className="text-2xl font-bold text-center">Ready to Upload!</h1>
        <label
          htmlFor="fileUpload"
          className="text-sm font-medium text-white flex"
        >
          <UploadIcon className="mr-2" />
          Upload File:
        </label>
        <input
          id="fileUpload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-500 ease-in-out transform hover:scale-105"
        />
        {fileName && (
          <>
            <p className="mt-2 text-sm text-white">Stored File: {fileName}</p>
            <button
              onClick={() =>
                handleUploadClick({
                  base64Data: localStorage.getItem("uploadedFile") || "",
                  fileName: localStorage.getItem("uploadedFileName") || "",
                })
              }
              disabled={uploading}
              className={`w-full px-4 py-2 text-white bg-goldAccent rounded-md flex items-center justify-center ${
                uploading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-yellow-700"
              }`}
            >
              <CloudUpload className="mr-2" />
              {uploading ? "Uploading..." : "Upload PDF"}
            </button>
          </>
        )}
        <button
          onClick={clearStorage}
          className="w-full px-4 py-2 text-white bg-destructive rounded-md hover:bg-red-700 flex items-center justify-center"
        >
          <Trash2Icon className="mr-2" />
          Clear Storage
        </button>
        {message && (
          <p className="mt-4 text-sm text-center text-white">{message}</p>
        )}
      </div>
      {filePreview && (
        <div className="ml-10 w-1/2 sm:text-sm transition duration-500 ease-in-out transform hover:scale-105">
          <embed
            src={filePreview}
            type="application/pdf"
            width="100%"
            height="600"
            className="border border-gray-300 rounded-md"
          />
        </div>
      )}
    </div>
  );
}
