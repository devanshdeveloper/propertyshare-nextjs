"use client";

import Image from "next/image";
import { useState } from "react";

export function FilesInput({ className, defaultImages, ...props }) {
  console.log(defaultImages);

  const [files, setFiles] = useState<null | FileList>(null);

  return (
    <div className={`${className} `}>
      <label htmlFor="filesInput" className="">
        Select Images
      </label>
      <div className="flex gap-5">
        {defaultImages && (
          <Image src={defaultImages} alt={"none"} width={400} height={400} />
        )}
        {files &&
          [...files].map((file) => (
            <Image
              key={file.name}
              src={URL.createObjectURL(file)}
              alt={file.name}
              width={400}
              height={400}
            />
          ))}
      </div>
      <input
        type="file"
        id="filesInput"
        {...props}
        className="hidden"
        onChange={(e) => setFiles(e.target.files)}
      />
    </div>
  );
}
