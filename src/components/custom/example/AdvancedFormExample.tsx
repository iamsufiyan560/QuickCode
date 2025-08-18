"use client";

import React, { useEffect, useState } from "react";
import { AdvancedForm } from "@/components/custom/AdvancedForm";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const ComprehensiveFormExample = () => {
  const formData = {
    steps: [
      {
        id: "personal",
        title: "Personal Info",
        description: "Tell us about yourself",
        fields: [
          {
            id: "name",
            label: "Full Name",

            type: "text" as const,

            placeholder: "John Doe",
            validation: {
              required: true,
              minLength: 2,
              minLengthError: "Name must be at least 2 characters",
            },
          },
          {
            id: "email",
            label: "Email Address",
            type: "email" as const,
            placeholder: "john@example.com",
            validation: { required: true },
          },
          {
            id: "phone",
            label: "Phone Number",
            type: "tel" as const,
            placeholder: "+1 (555) 123-4567",
            validation: { required: false },
          },
          {
            id: "website",
            label: "Website",
            type: "url" as const,
            placeholder: "https://johndoe.com",
            validation: { required: false },
          },
          {
            id: "age",
            label: "Age",
            type: "number" as const,
            placeholder: "25",
            validation: { required: true, min: 18, max: 100 },
          },
          {
            id: "birthDate",
            label: "Date of Birth",
            type: "date" as const,
            validation: { required: true },
          },
        ],
      },
      {
        id: "preferences",
        title: "Preferences",
        description: "Customize your experience",
        fields: [
          {
            id: "userType",
            label: "Account Type",
            type: "radio" as const,
            options: [
              { label: "Individual", value: "individual" },
              { label: "Business", value: "business" },
            ],
            validation: { required: true },
          },
          {
            id: "companyName",
            label: "Company Name",
            type: "text" as const,
            placeholder: "Acme Corp",
            validation: { required: true, minLength: 2 },
            conditional: (values: Record<string, any>) =>
              values.userType === "business",
          },
          {
            id: "interests",
            label: "Interests",
            type: "multi-select" as const,
            options: ["Technology", "Design", "Marketing", "Finance", "Health"],
            placeholder: "Select your interests",
            validation: { required: false },
          },
          {
            id: "budget",
            label: "Budget Range",
            type: "select" as const,
            options: [
              { label: "Under $1,000", value: "under-1k" },
              { label: "$1,000 - $5,000", value: "1k-5k" },
              { label: "Over $5,000", value: "over-5k" },
            ],
            validation: { required: true },
          },
          {
            id: "experience",
            label: "Experience Level (1-10)",
            type: "slider" as const,
            sliderProps: { min: 1, max: 10, step: 1 },
            validation: { required: true },
          },
          {
            id: "priceRange",
            label: "Price Range ($)",
            type: "range-slider" as const,
            sliderProps: { min: 100, max: 5000, step: 50 },
            validation: { required: false },
          },
        ],
      },
      {
        id: "final",
        title: "Final Details",
        description: "Complete your profile",
        fields: [
          {
            id: "bio",
            label: "Bio",
            type: "textarea" as const,
            placeholder: "Tell us about yourself...",
            validation: { required: false, maxLength: 500 },
          },
          {
            id: "customField",
            label: "Project Code",
            type: "text" as const,
            placeholder: "Must start with 'PRJ-'",
            validation: {
              required: true,
              custom: (value: any) => {
                if (!value?.startsWith("PRJ-"))
                  return "Code must start with 'PRJ-'";
                if (value.length < 6)
                  return "Code must be at least 6 characters";
                return null;
              },
            },
          },
          {
            id: "notifications",
            label: "Enable Email Notifications",
            type: "switch" as const,
            validation: { required: false },
          },
          {
            id: "newsletter",
            label: "Subscribe to Newsletter",
            type: "checkbox" as const,
            validation: { required: false },
          },
          {
            id: "terms",
            label: "I agree to Terms & Conditions",
            type: "checkbox" as const,
            validation: { required: true },
          },
        ],
      },
    ],
    header: {
      title: "Advanced Form Demo",
      description: "Experience all form features in one place",
    },
    submitText: "Complete Registration",
    showReset: true,
    autoSave: true,
  };
  const handleSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  };

  const handleFormChange = (data: any) => {
    if (Object.keys(data).length === 0) {
    }
  };

  const formCode = `import { AdvancedForm } from "@/components/ui/AdvancedForm";

export const ComprehensiveFormExample = () => {
  const handleSubmit = async (data: any) => {
  

    await new Promise((resolve) => setTimeout(resolve, 3000));
   
  };

  const handleFormChange = (data) => {
    if (Object.keys(data).length === 0) {
   
    }
  };

  const ${JSON.stringify(formData, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/"/g, '"')};

  return (
    <AdvancedForm
      steps={formData.steps}
      onSubmit={handleSubmit}
      onChange={handleFormChange}
      header={formData.header}
      submitText={formData.submitText}
      showReset={formData.showReset}
      autoSave={formData.autoSave}
      className="max-w-5xl mx-auto"
    />
  );
};`;

  return (
    <SnippetPreview title="Complete Advanced Form" code={formCode}>
      <AdvancedForm
        steps={formData.steps}
        onSubmit={handleSubmit}
        onChange={handleFormChange}
        header={formData.header}
        submitText={formData.submitText}
        showReset={formData.showReset}
        autoSave={formData.autoSave}
        className="max-w-5xl mx-auto"
      />
    </SnippetPreview>
  );
};

export const JobApplicationFormExample = () => {
  const formData = {
    fields: [
      {
        id: "fullName",
        label: "Full Name",
        type: "text" as const,
        placeholder: "Enter your full name",
        validation: {
          required: true,
          minLength: 2,
          minLengthError: "Name must be at least 2 characters",
        },
      },
      {
        id: "email",
        label: "Email Address",
        type: "email" as const,
        placeholder: "your.email@example.com",
        validation: {
          required: true,
          emailError: "Please enter a valid email address",
        },
      },
      {
        id: "resume",
        label: "Resume/CV",
        type: "file" as const,
        inputProps: {
          accept: ".pdf,.doc,.docx",
          multiple: false,
        },
        validation: {
          required: true,
          maxSize: 5000000,
          customFileError: "Resume file must be under 5MB",
        },
      },
      {
        id: "githubUrl",
        label: "GitHub Profile",
        type: "url" as const,
        placeholder: "https://github.com/username",
        validation: {
          required: false,
          urlError: "Please enter a valid GitHub URL",
        },
      },
      {
        id: "experience",
        label: "Years of Experience",
        type: "select" as const,
        options: [
          { label: "0-1 years", value: "0-1" },
          { label: "2-3 years", value: "2-3" },
          { label: "4-5 years", value: "4-5" },
          { label: "6-10 years", value: "6-10" },
          { label: "10+ years", value: "10+" },
        ],
        validation: { required: true },
      },
    ],
    header: {
      title: "Job Application",
      description: "Apply for our open position",
    },
    submitText: "Submit Application",
    autoSave: true,
  };

  const handleSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  };
  const formCode = `import { AdvancedForm } from "@/components/ui/AdvancedForm";

export const JobApplicationForm = () => {
  const handleSubmit = async (data: any) => {
  

    await new Promise((resolve) => setTimeout(resolve, 3000));
   
  };

  const formData = ${JSON.stringify(formData, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/"/g, '"')};

  return (
    <AdvancedForm
      fields={formData.fields}
      onSubmit={handleSubmit}
      header={formData.header}
      submitText={formData.submitText}
      className="max-w-2xl mx-auto"
    />
  );
};`;

  return (
    <SnippetPreview title="Job Application Form" code={formCode}>
      <AdvancedForm
        fields={formData.fields}
        onSubmit={handleSubmit}
        header={formData.header}
        submitText={formData.submitText}
        className="max-w-5xl mx-auto"
        autoSave={formData.autoSave}
      />
    </SnippetPreview>
  );
};

export const UserProfileFormExample = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/");
        const result = await response.json();
        const user = result.results[0];
        setUserData(user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const cleanFormData = {
    fields: [
      {
        id: "profilePicture",
        label: "Profile Picture",
        type: "image" as const,

        validation: {
          required: true,
          maxSize: 2000000,
          acceptedTypes: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
        },
        defaultValue: userData?.picture?.large || "",
        description: "Upload a profile picture (max 2MB)",
      },
      {
        id: "name",
        label: "Full Name",
        type: "text" as const,
        validation: { required: true, minLength: 2 },
        defaultValue: `${userData?.name?.first || ""} ${
          userData?.name?.last || ""
        }`.trim(),
      },
      {
        id: "username",
        label: "Username",
        type: "text" as const,
        validation: { required: true, minLength: 3 },
        defaultValue: userData?.login?.username || "",
      },
      {
        id: "email",
        label: "Email",
        type: "email" as const,
        validation: { required: true },
        defaultValue: userData?.email || "",
      },
      {
        id: "phone",
        label: "Phone",
        type: "tel" as const,
        validation: { required: false },
        defaultValue: userData?.phone || "",
      },
      {
        id: "dateOfBirth",
        label: "Date of Birth",
        type: "date" as const,
        validation: { required: false },
        defaultValue: userData?.dob?.date
          ? userData.dob.date.split("T")[0]
          : "",
      },
      {
        id: "gender",
        label: "Gender",
        type: "select" as const,
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
          { label: "Prefer not to say", value: "not-specified" },
        ],
        validation: { required: false },
        defaultValue: userData?.gender || "",
      },
      {
        id: "country",
        label: "Country",
        type: "text" as const,
        validation: { required: false },
        defaultValue: userData?.location?.country || "",
      },
      {
        id: "city",
        label: "City",
        type: "text" as const,
        validation: { required: false },
        defaultValue: userData?.location?.city || "",
      },
      {
        id: "bio",
        label: "Bio",
        type: "textarea" as const,
        placeholder: "Tell us about yourself...",
        validation: { required: false, maxLength: 500 },
        description: "Brief description about yourself (max 500 characters)",
      },
      {
        id: "notifications",
        label: "Enable Email Notifications",
        type: "switch" as const,
        validation: { required: false },
        defaultValue: true,
      },
      {
        id: "newsletter",
        label: "Subscribe to Newsletter",
        type: "checkbox" as const,
        validation: { required: false },
        defaultValue: false,
      },
    ],
    header: {
      title: "Edit Profile",
      description: userData
        ? `Welcome back, ${userData.name.first}! Update your profile information below.`
        : "Update your profile information",
    },
    submitText: "Update Profile",
    showReset: true,
    autoSave: true,
  };

  const formData = {
    ...cleanFormData,
    header: {
      ...cleanFormData.header,
    },
  };

  const handleSubmit = async (data: any) => {
    console.log("Updated profile data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch("https://randomuser.me/api/");
    const result = await response.json();
    const updatedUser = result.results[0];
    setUserData(updatedUser);
  };

  const formCode = `
export const UserProfileFormExample = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const result = await response.json();
        const user = result.results[0];
        setUserData(user);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (data) => {
    console.log('Updated profile data:', data);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const formData = ${JSON.stringify(cleanFormData, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/"/g, '"')};

  if (loading) {
    return <div className="text-center py-8">Loading profile data...</div>;
  }

  return (
    <AdvancedForm
           skeletonProps={{ fields: 10, columns: 2 }}
        isFormLoading={loading}
      key={userData?.login?.uuid || "profile-form"}
      fields={formData.fields}
      onSubmit={handleSubmit}
      header={formData.header}
      submitText={formData.submitText}
      showReset={formData.showReset}
      autoSave={formData.autoSave}
      className="max-w-4xl mx-auto"
    />
  );
};`;

  return (
    <SnippetPreview title="Profile Form with Image Support" code={formCode}>
      <AdvancedForm
        skeletonProps={{ fields: 10, columns: 2 }}
        isFormLoading={loading}
        key={userData?.login?.uuid || "profile-form"}
        fields={formData.fields}
        onSubmit={handleSubmit}
        header={formData.header}
        submitText={formData.submitText}
        showReset={formData.showReset}
        autoSave={formData.autoSave}
        className="max-w-4xl mx-auto"
      />
    </SnippetPreview>
  );
};
