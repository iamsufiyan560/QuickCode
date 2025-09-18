"use client";

import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "accept"> {
  className?: string;
  onImageChange?: (file: File | null) => void;
  previewClassName?: string;
  showRemoveButton?: boolean;
  previewUrl?: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  className,
  onImageChange,
  previewClassName,
  showRemoveButton = true,
  onChange,
  value,
  previewUrl,
  ...props
}) => {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onImageChange?.(file);
    onChange?.(e);
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageChange?.(null);

    const fakeEvent = {
      target: { files: null, value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(fakeEvent);
  };

  useEffect(() => {
    setPreview(previewUrl || null);
  }, [previewUrl]);

  return (
    <div className="flex  gap-3">
      {preview && (
        <div className={cn("relative flex-shrink-0", previewClassName)}>
          <img
            src={preview}
            alt="Preview"
            className="w-12 h-12 object-cover rounded-md border border-border"
          />
          {showRemoveButton && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs hover:bg-destructive/80 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      <div className="flex-1 space-y-1">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={cn(
            "file:text-primary/80 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive file:cursor-pointer",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
};
