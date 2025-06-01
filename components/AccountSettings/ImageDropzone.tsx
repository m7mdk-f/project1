import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

type Props = {
  image: File | null | undefined;
  setImage: (file: File | null) => void;
};

export default function ImageDropzone({ image, setImage }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

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

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div
      {...getRootProps()}
      className={`border-2 flex justify-center items-center border-dashed p-4 rounded cursor-pointer text-center ${isDragActive ? "border-indigo-600 bg-indigo-50" : "border-gray-300"
        }`}
      dir="rtl"
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative w-[200px] h-[200px]">
          <Image
            fill
            src={preview}
            alt="معاينة الصورة"
            style={{ objectFit: "cover", borderRadius: "0.375rem" }}
          />
        </div>
      ) : (
        <p className="text-gray-500">اسحب الصورة هنا أو انقر للاختيار</p>
      )}
    </div>
  );
}
