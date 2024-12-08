"use client";

import React from "react";
import Image from "next/image";

interface Announcement {
  id: number;
  officeName: string;
  heading: string;
  time: string;
  content: string;
}

interface AnnouncementProps {
  announcement: Announcement;
}

const AnnouncementComponent: React.FC<AnnouncementProps> = ({ announcement }) => {
  // Map office names to their respective image paths
  const officeImageMap: { [key: string]: string } = {
    "OSA - Office of Student Affairs": "/images/OSA.svg",
    "VPAA - Vice President for Academic Affairs": "/images/VPAA.svg",
    "Director for Academic Affairs": "/images/DAA.svg",
  };

  return (
    <div className="flex justify-between items-start  border-b border-gray-300">
      {/* Left Side: Textual Content */}
      <div className="flex-shrink-0 mr-4 py-2">
        <Image
          src={officeImageMap[announcement.officeName] || "/images/default.svg"}
          alt={announcement.officeName}
          width={80}
          height={80}
          className="rounded-full object-contain"
        />
      </div>
      {/* Right Side: Office Profile Image */}
      <div className="flex-1 pr-8 py-2">
        <h1 className="text-2xl font-bold mb-2">{announcement.heading}</h1>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <span>{announcement.officeName}</span>
          <span className="mx-2">&bull;</span>
          <span>{announcement.time}</span>
        </div>
        <p className="text-gray-700">{announcement.content}</p>
      </div>
    </div>
  );
};

// Sample usage of the component
const AnnouncementList: React.FC = () => {
  const announcements: Announcement[] = [
    {
      id: 0,
      officeName: "OSA - Office of Student Affairs",
      heading: "Update on Permit B Requirements",
      time: "November 23, 2024",
      content:
        "The Office of Student Affairs (OSA) updates the requirements list for Permit B. Please refer to the new guidelines on the portal.",
    },
    {
      id: 1,
      officeName: "VPAA - Vice President for Academic Affairs",
      heading: "Faculty Meeting Scheduled",
      time: "November 20, 2024",
      content:
        "The Vice President for Academic Affairs has scheduled a faculty meeting next week. Attendance is mandatory.",
    },
    {
      id: 2,
      officeName: "Director for Academic Affairs",
      heading: "New Course Proposal Deadline",
      time: "November 15, 2024",
      content:
        "The Director for Academic Affairs reminds all faculty members to submit their new course proposals before the deadline.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {announcements.map((announcement) => (
        <AnnouncementComponent key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
};

export default AnnouncementList;
