import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PdfTemplates = () => {
  const downloadPdf = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'download.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const templates = [
    {
      src: "/pdf_templates/StudentOrganizations/Application for Approval-Accreditation of Student Organizations.png",
      alt: "Application for Approval-Accreditation of Student Organizations",
      pdf: "/pdf_templates/StudentOrganizations/Application for Approval-Accreditation of Student Organizations.pdf",
      label: "Application for Approval-Accreditation of Student Organizations"
    },
    {
      src: "/pdf_templates/StudentOrganizations/Parents-Guardians Consent.png",
      alt: "Parents-Guardians Consent",
      pdf: "/pdf_templates/StudentOrganizations/Parents-Guardians Consent.pdf",
      label: "Parents-Guardians Consent"
    },
    {
      src: "/pdf_templates/StudentOrganizations/Permit B to Conduct Non-Academic Student Activities Off-Campus.png",
      alt: "Permit B to Conduct Non-Academic Student Activities Off-Campus",
      pdf: "/pdf_templates/StudentOrganizations/Permit B to Conduct Non-Academic Student Activities Off-Campus.pdf",
      label: "Permit B to Conduct Non-Academic Student Activities Off-Campus"
    },
    {
      src: "/pdf_templates/StudentOrganizations/Permit B to Conduct Non-Academic Student Activities Within Campus.png",
      alt: "Permit B to Conduct Non-Academic Student Activities Within Campus",
      pdf: "/pdf_templates/StudentOrganizations/Permit B to Conduct Non-Academic Student Activities Within Campus.pdf",
      label: "Permit B to Conduct Non-Academic Student Activities Within Campus"
    }
  ];

  return (
    <div>
      <h1 className="font-bold opacity-[0.70] text-[12px]">
        Request a New Document
      </h1>

      <div className="flex flex-row mt-4 justify-evenly">
        <Link href="/users/upload">
          <div className="first w-[180px] mt-2 justify-center align-middle">
            <Image 
              src="/images/AddFiles.png"
              alt="Add File"
              width={130}
              height={10}
              className="cursor-pointer"
            />
            <p className="mt-3 text-[12px] truncate">
              Add File
            </p>
          </div>
        </Link>

        {templates.map((template, index) => (
          <div key={index} className={`template w-[180px] mt-2 justify-center align-middle`}>
            <Image 
              src={template.src}
              alt={template.alt}
              width={130}
              height={10}
              onClick={() => {
                downloadPdf(template.pdf);
                alert("Downloaded File");
              }}
              className="cursor-pointer"
            />
            <p className="mt-3 text-[12px] truncate">
              {template.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfTemplates;