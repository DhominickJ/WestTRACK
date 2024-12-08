"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export interface File {
  id: string;
  fileName: string;
  fileContent: string;
  status: string;
  userId: string;
}

export const useFetchFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setAuthInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!userId) {
        setFiles([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "processing"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const fileData: File[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            fileName: data.fileName,
            fileContent: data.fileContent,
            status: data.status,
            userId: data.userId,
          };
        });

        setFiles(fileData);
      } catch (error) {
        console.error("Error fetching files: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (authInitialized) {
      setLoading(true);
      fetchFiles();
    }
  }, [userId, authInitialized]);

  return { files, loading, userId };
};

export const showFileStatus = (status: string) => {
  alert(`Current Status: ${status}`);

  return status;
};

export const downloadFile = ({ fileName, fileContent }: File) => {
  try {
    // Ensure Base64 padding
    const paddedBase64 = fileContent.padEnd(
      fileContent.length + ((4 - (fileContent.length % 4)) % 4),
      "="
    );

    console.log("Base64 start:", paddedBase64.substring(0, 20)); // First 20 characters
    console.log("Base64 end:", paddedBase64.slice(-20)); // Last 20 characters

    // Decode Base64
    const binary = atob(paddedBase64);

    // Create Uint8Array for binary data
    const binaryArray = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      binaryArray[i] = binary.charCodeAt(i);
    }

    // Create Blob from binary data
    const blob = new Blob([binaryArray], { type: "application/pdf" });

    // Download Blob
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    // Revoke Object URL
    URL.revokeObjectURL(link.href);
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error decoding Base64 or downloading file:",
        error.message
      );
    } else {
      console.error("Error decoding Base64 or downloading file:", error);
    }
  }
};

export const useHandleViewDocument = () => {
  const router = useRouter();

  const handleViewDocument = (file: File) => {
    router.push(`/users/document?fileId=${file.id}`);
  };
  return handleViewDocument;
};

export const getFileById = async (fileId: string): Promise<File> => {
  try {
    const docCol = collection(db, "processing");
    const docRef = doc(docCol, fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        fileName: data.fileName,
        fileContent: data.fileContent,
        status: data.status,
        userId: data.userId,
      };
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};
