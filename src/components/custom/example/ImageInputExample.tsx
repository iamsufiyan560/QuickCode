"use client";

import React, { useState } from "react";
import { ImageInput } from "@/components/custom/ImageInput";
import { Button } from "@/components/custom/Button";
import { Label } from "@/components/custom/Label";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const BasicImageInputExample = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleImageChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      setUploadStatus(
        `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`
      );
    } else {
      setUploadStatus("No file selected");
    }
  };

  const basicImageInputCode = `
import React, { useState } from "react";
import { ImageInput } from "@/components/ui/ImageInput";

export const BasicImageInputExample = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleImageChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      setUploadStatus(\`Selected: \${file.name} (\${(file.size / 1024).toFixed(1)} KB)\`);
    } else {
      setUploadStatus("No file selected");
    }
  };

  return (
    <div className="space-y-4">
      <ImageInput 
        onImageChange={handleImageChange}
        placeholder="Choose profile picture..."
      />
      
      {uploadStatus && (
        <p className="text-sm text-muted-foreground">
          {uploadStatus}
        </p>
      )}
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Basic Image Input" code={basicImageInputCode}>
      <div className="space-y-4">
        <ImageInput
          onImageChange={handleImageChange}
          placeholder="Choose profile picture..."
        />

        {uploadStatus && (
          <p className="text-sm text-muted-foreground">{uploadStatus}</p>
        )}
      </div>
    </SnippetPreview>
  );
};

export const CustomizedImageInputExample = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleProfileChange = (file: File | null) => {
    setProfileImage(file);
  };

  const handleCoverChange = (file: File | null) => {
    setCoverImage(file);
  };

  const handleUpload = async () => {
    if (!profileImage && !coverImage) return;

    setIsUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUploading(false);

    setProfileImage(null);
    setCoverImage(null);
  };

  const customizedImageInputCode = `
import React, { useState } from "react";
import { ImageInput } from "@/components/ui/ImageInput";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

export const CustomizedImageInputExample = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleProfileChange = (file: File | null) => {
    setProfileImage(file);
  };

  const handleCoverChange = (file: File | null) => {
    setCoverImage(file);
  };

  const handleUpload = async () => {
    if (!profileImage && !coverImage) return;
    
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    
    setProfileImage(null);
    setCoverImage(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="profile-input">
            Profile Picture
          </Label>
          <ImageInput
            id="profile-input"
            onImageChange={handleProfileChange}
            placeholder="Upload profile picture..."
            previewClassName="w-16 h-16"
            className="file:text-blue-600"
          />
        </div>

        <div>
          <Label htmlFor="cover-input">
            Cover Image
          </Label>
          <ImageInput
            id="cover-input"
            onImageChange={handleCoverChange}
            placeholder="Upload cover image..."
            showRemoveButton={true}
            previewClassName="w-20 h-12"
          />
        </div>
      </div>

      <Button 
        onClick={handleUpload}
        disabled={!profileImage && !coverImage}
        isLoading={isUploading}
      >
        Save Images
      </Button>

      {(profileImage || coverImage) && (
        <div className="text-sm text-muted-foreground space-y-1">
          {profileImage && <p>Profile: {profileImage.name}</p>}
          {coverImage && <p>Cover: {coverImage.name}</p>}
        </div>
      )}
    </div>
  );
};
`;

  return (
    <SnippetPreview
      title="Customized Image Inputs"
      code={customizedImageInputCode}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="profile-input">Profile Picture</Label>
            <ImageInput
              id="profile-input"
              onImageChange={handleProfileChange}
              placeholder="Upload profile picture..."
              previewClassName="w-16 h-16"
              className="file:text-blue-600"
            />
          </div>

          <div>
            <Label htmlFor="cover-input">Cover Image</Label>
            <ImageInput
              id="cover-input"
              onImageChange={handleCoverChange}
              placeholder="Upload cover image..."
              showRemoveButton={true}
              previewClassName="w-16 h-16"
            />
          </div>
        </div>

        <Button
          onClick={handleUpload}
          disabled={!profileImage && !coverImage}
          isLoading={isUploading}
        >
          Save Images
        </Button>

        {(profileImage || coverImage) && (
          <div className="text-sm text-muted-foreground space-y-1">
            {profileImage && <p>Profile: {profileImage.name}</p>}
            {coverImage && <p>Cover: {coverImage.name}</p>}
          </div>
        )}
      </div>
    </SnippetPreview>
  );
};
