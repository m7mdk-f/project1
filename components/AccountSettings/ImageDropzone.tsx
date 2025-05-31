// components/AccountSettings/ImageDropzone.tsx
"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  image: File | null | undefined;
  setImage: (file: File | null) => void;
};

export default function ImageDropzone({ image, setImage }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) setImage(acceptedFiles[0]);
    },
    [setImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-4 rounded cursor-pointer text-center ${
        isDragActive ? "border-indigo-600 bg-indigo-50" : "border-gray-300"
      }`}
      dir="rtl"
    >
      <input {...getInputProps()} />
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="معاينة الصورة"
          className="mx-auto max-h-48 rounded"
        />
      ) : (
        <p className="text-gray-500">اسحب الصورة هنا أو انقر للاختيار</p>
      )}
    </div>
  );
}
