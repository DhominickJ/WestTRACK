"use client";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  useFetchFiles,
  showFileStatus,
  downloadFile,
} from "@/app/api/fileOperations";

interface File {
  id: string;
  fileName: string;
  status: string;
  fileContent: string;
  transactionInfo?: {
    claimedBy: string;
    claimedAt: string;
  };
  userId: string;
}

const Admin = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!userId) {
        setIsAdmin(false);
        return;
      }

      try {
        const adminCollection = collection(db, "admin");
        const adminSnapshot = await getDocs(adminCollection);
        const isAdminUser = adminSnapshot.docs.some((doc) => doc.id === userId);
        setIsAdmin(isAdminUser);
        console.log(isAdminUser);
      } catch (error) {
        console.error("Error checking admin status: ", error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [userId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!isAdmin) return;
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "processing"));
        const fetchedFiles = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            fileName: data.fileName || "",
            status: data.status || "",
            base64: data.base64 || "",
            fileContent: data.fileContent || "",
            transactionInfo: data.transactionInfo || {
              claimedBy: "",
              claimedAt: "",
            },
            userId: data.userId ?? "",
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
  }, [isAdmin]);

  const updateFileStatus = async (fileId: string, newStatus: string) => {
    try {
      const fileRef = doc(db, "processing", fileId);
      const updatedData: Partial<File> = { status: newStatus };

      // If the status is "claimed," remove the PDF content
      if (newStatus === "claimed") {
        updatedData.fileContent = ""; // Remove the Base64 content
        updatedData.transactionInfo = {
          claimedBy: auth.currentUser?.email || "Admin",
          claimedAt: new Date().toISOString(),
        };
        await updateDoc(fileRef, updatedData);
        await addDoc(collection(db, "finished"), {
          // Add to the finished transaction collection
          fileId: fileId,
          claimedBy: auth.currentUser?.email || "Admin",
          claimedAt: new Date().toISOString(),
        });
      }
      // Create another update on the file itself to reflect on the database

      // Update the state to reflect the changes
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === fileId ? { ...file, ...updatedData } : file
        )
      );

      alert(`File status updated to: ${newStatus}`);
    } catch (error) {
      console.error("Error updating file status:", error);
      alert("Failed to update file status. Please try again.");
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              <strong>{file.fileName}</strong> (Status: {file.status})
              <button onClick={() => downloadFile(file)}>Download</button>
              <button onClick={() => showFileStatus(file.status)}>
                Show Status
              </button>
              <select
                title="File Selector"
                onChange={(e) => updateFileStatus(file.id, e.target.value)}
                defaultValue="Select Status"
                name="fileUpdater"
              >
                <option value="" disabled>
                  Change Status
                </option>
                <option value="processing">Processing</option>
                <option value="finished">Finished</option>
                <option value="conflict">Conflict</option>
                <option value="claimed">Claimed</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admin;
