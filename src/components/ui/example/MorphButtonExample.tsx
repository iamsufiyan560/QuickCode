"use client";

import React, { useState } from "react";
import { MorphButton } from "@/components/animated/MorphButton";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Upload, Save, Send } from "lucide-react";

export const FormSubmissionExample = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (Math.random() > 0.3) {
      return; // Success
    } else {
      throw new Error("Network error");
    }
  };

  const handleSuccess = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage("Form submitted successfully! Redirecting...");
  };

  const handleError = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessage("Retrying submission...");
  };

  const formSubmissionCode = `
import { MorphButton } from "@/components/ui/MorphButton";
import { Send } from "lucide-react";
import { useState } from "react";

export const FormSubmissionExample = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (Math.random() > 0.3) {
      return; // Success
    } else {
      throw new Error("Network error");
    }
  };

  const handleSuccess = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessage("Form submitted successfully! Redirecting...");
  };

  const handleError = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessage("Retrying submission...");
  };

  return (
    <div className="space-y-4 p-4 border border-border rounded-lg max-w-md">
      <h3 className="font-semibold">Contact Form</h3>
      <textarea
        placeholder="Enter your message..."
        className="w-full p-3 border rounded-md resize-none"
        rows={3}
      />
      <MorphButton
        onClick={handleSubmit}
        onSuccess={handleSuccess}
        onError={handleError}
        idleText="Send Message"
        loadingText="Sending..."
        successText="Message Sent!"
        errorText="Failed - Retry?"
        idleIcon={Send}
        className="w-full"
      />
      {message && (
        <span className="text-sm text-muted-foreground block mt-2">
          {message}
        </span>
      )}
    </div>
  );
};
`;

  return (
    <SnippetPreview
      title="Form Submission with All Handlers"
      code={formSubmissionCode}
    >
      <div className="space-y-4 p-4 border border-border rounded-lg max-w-md">
        <h3 className="font-semibold">Contact Form</h3>
        <textarea
          placeholder="Enter your message..."
          className="w-full p-3 border rounded-md resize-none"
          rows={3}
        />
        <MorphButton
          onClick={handleSubmit}
          onSuccess={handleSuccess}
          onError={handleError}
          idleText="Send Message"
          loadingText="Sending..."
          successText="Message Sent!"
          errorText="Failed - Retry?"
          idleIcon={Send}
          className="w-full"
        />
        {message && (
          <span className="text-sm text-muted-foreground block mt-2">
            {message}
          </span>
        )}
      </div>
    </SnippetPreview>
  );
};

export const FileUploadExample = () => {
  const [statusMessage, setStatusMessage] = useState("");

  const handleUpload = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (Math.random() > 0.2) {
      return; // Success
    } else {
      throw new Error("Upload failed");
    }
  };

  const handleSuccess = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatusMessage(
      "File processed successfully. Click to upload another file."
    );
  };

  const handleError = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatusMessage("Attempting to recover upload...");
  };

  const fileUploadCode = `
import { MorphButton } from "@/components/ui/MorphButton";
import { Upload } from "lucide-react";
import { useState } from "react";

export const FileUploadExample = () => {
  const [statusMessage, setStatusMessage] = useState("");

  const handleUpload = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    if (Math.random() > 0.2) {
      return; // Success
    } else {
      throw new Error("Upload failed");
    }
  };

  const handleSuccess = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setStatusMessage("File processed successfully. Click to upload another file.");
  };

  const handleError = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatusMessage("Attempting to recover upload...");
  };

  return (
    <div className="space-y-4 p-4 border border-border rounded-lg max-w-md">
      <h3 className="font-semibold">Document Upload</h3>
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-4">
          Select or drag files here
        </p>
        <MorphButton
          onClick={handleUpload}
          onSuccess={handleSuccess}
          onError={handleError}
          idleText="Upload Files"
          loadingText="Uploading..."
          successText="Upload Complete"
          errorText="Upload Failed"
          idleIcon={Upload}
        />
      </div>
      {statusMessage && (
        <span className="text-sm text-blue-600 block">
          {statusMessage}
        </span>
      )}
    </div>
  );
};
`;

  return (
    <SnippetPreview
      title="File Upload with State Management"
      code={fileUploadCode}
    >
      <div className="space-y-4 p-4 border border-border rounded-lg max-w-md">
        <h3 className="font-semibold">Document Upload</h3>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-4">
            Select or drag files here
          </p>
          <MorphButton
            onClick={handleUpload}
            onSuccess={handleSuccess}
            onError={handleError}
            idleText="Upload Files"
            loadingText="Uploading..."
            successText="Upload Complete"
            errorText="Upload Failed"
            idleIcon={Upload}
          />
        </div>
        {statusMessage && (
          <span className="text-sm text-blue-600 block">{statusMessage}</span>
        )}
      </div>
    </SnippetPreview>
  );
};

export const DataSaveExample = () => {
  const [saveStatus, setSaveStatus] = useState("");

  const handleSave = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (Math.random() > 0.4) {
      return; // Success
    } else {
      throw new Error("Save failed");
    }
  };

  const handleSuccess = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSaveStatus("Data saved to cloud. All changes synced.");
  };

  const handleError = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSaveStatus("Attempting auto-recovery...");
    // Simulate retry logic
    if (Math.random() > 0.5) {
      return; // Success on retry
    } else {
      throw new Error("Auto-retry failed");
    }
  };

  const dataSaveCode = `
import { MorphButton } from "@/components/ui/MorphButton";
import { Save } from "lucide-react";
import { useState } from "react";

export const DataSaveExample = () => {
  const [saveStatus, setSaveStatus] = useState("");

  const handleSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (Math.random() > 0.4) {
      return; // Success
    } else {
      throw new Error("Save failed");
    }
  };

  const handleSuccess = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setSaveStatus("Data saved to cloud. All changes synced.");
  };

  const handleError = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaveStatus("Attempting auto-recovery...");
    // Simulate retry logic
    if (Math.random() > 0.5) {
      return; // Success on retry
    } else {
      throw new Error("Auto-retry failed");
    }
  };

  return (
    <div className="space-y-4 p-4 border border-border rounded-lg max-w-md">
      <h3 className="font-semibold">Project Settings</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Project Name"
          className="w-full p-2 border rounded"
          defaultValue="My Awesome Project"
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 border rounded"
          defaultValue="Building something amazing"
        />
      </div>
      <MorphButton
        onClick={handleSave}
        onSuccess={handleSuccess}
        onError={handleError}
        idleText="Save Changes"
        loadingText="Saving..."
        successText="Saved Successfully"
        errorText="Save Failed - Retry"
        idleIcon={Save}
        className="w-full"
      />
      {saveStatus && (
        <span className="text-sm text-green-600 block">
          {saveStatus}
        </span>
      )}
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Data Save with Error Recovery" code={dataSaveCode}>
      <div className="space-y-4 p-4 border border-border rounded-lg max-w-md">
        <h3 className="font-semibold">Project Settings</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Project Name"
            className="w-full p-2 border rounded"
            defaultValue="My Awesome Project"
          />
          <input
            type="text"
            placeholder="Description"
            className="w-full p-2 border rounded"
            defaultValue="Building something amazing"
          />
        </div>
        <MorphButton
          onClick={handleSave}
          onSuccess={handleSuccess}
          onError={handleError}
          idleText="Save Changes"
          loadingText="Saving..."
          successText="Saved Successfully"
          errorText="Save Failed - Retry"
          idleIcon={Save}
          className="w-full"
        />
        {saveStatus && (
          <span className="text-sm text-green-600 block">{saveStatus}</span>
        )}
      </div>
    </SnippetPreview>
  );
};
