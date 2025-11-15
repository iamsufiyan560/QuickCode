"use client";

import React, { useState } from "react";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const HorizontalStepperExample = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { id: "1", title: "Born", description: "Welcome to existence" },
    {
      id: "2",
      title: "Learn to Walk",
      description: "Stumble around confidently",
    },
    {
      id: "3",
      title: "Start School",
      description: "Realize nap time was peak life",
    },
    {
      id: "4",
      title: "Graduate High School",
      description: "Peak of your physical fitness",
    },
    {
      id: "5",
      title: "College",
      description: "Discover instant noodles and debt",
    },
    {
      id: "6",
      title: "Get Degree",
      description: "Expensive piece of paper acquired",
    },
    {
      id: "7",
      title: "Job Hunt",
      description: "Experience existential crisis daily",
    },
    { id: "8", title: "First Job", description: "Coffee becomes a food group" },
    {
      id: "9",
      title: "Career Growth",
      description: "More meetings, less actual work",
    },
    {
      id: "10",
      title: "Retirement",
      description: "Finally time to live... maybe",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsLoading(false);
    setCurrentStep(0);
  };

  const horizontalStepperCode = `
import React, { useState } from "react";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";

export const HorizontalStepperExample = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  
  const steps = [
    { id: "1", title: "Born", description: "Welcome to existence" },
    { id: "2", title: "Learn to Walk", description: "Stumble around confidently" },
    { id: "3", title: "Start School", description: "Realize nap time was peak life" },
    { id: "4", title: "Graduate High School", description: "Peak of your physical fitness" },
    { id: "5", title: "College", description: "Discover instant noodles and debt" },
    { id: "6", title: "Get Degree", description: "Expensive piece of paper acquired" },
    { id: "7", title: "Job Hunt", description: "Experience existential crisis daily" },
    { id: "8", title: "First Job", description: "Coffee becomes a food group" },
    { id: "9", title: "Career Growth", description: "More meetings, less actual work" },
    { id: "10", title: "Retirement", description: "Finally time to live... maybe" }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    setCurrentStep(0);
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="space-y-6">
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="flex justify-between">
        <Button 
          onClick={handlePrevious}
          disabled={currentStep === 0 || isLoading}
          variant="outline"
        >
          Previous
        </Button>
        <Button 
          onClick={isLastStep ? handleSubmit : handleNext}
          isLoading={isLoading}
        >
          {isLastStep ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};
`;

  const isLastStep = currentStep === steps.length - 1;

  return (
    <SnippetPreview
      title="Horizontal Life Journey Stepper"
      code={horizontalStepperCode}
    >
      <div className="space-y-6">
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0 || isLoading}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={isLastStep ? handleSubmit : handleNext}
            isLoading={isLoading}
          >
            {isLastStep ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </SnippetPreview>
  );
};

export const VerticalStepperExample = () => {
  const [currentStep, setCurrentStep] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      id: "1",
      title: "Project Kickoff",
      description: "Gather requirements and set expectations",
    },
    {
      id: "2",
      title: "Research Phase",
      description: "Market analysis and competitor research",
    },
    {
      id: "3",
      title: "Design & Wireframes",
      description: "Create user interface mockups",
    },
    {
      id: "4",
      title: "Development Sprint",
      description: "Build core features and functionality",
    },
    {
      id: "5",
      title: "Testing & QA",
      description: "Bug fixes and quality assurance",
    },
    {
      id: "6",
      title: "Client Review",
      description: "Present demo and gather feedback",
    },
    { id: "7", title: "Revisions", description: "Implement requested changes" },
    {
      id: "8",
      title: "Performance Optimization",
      description: "Speed and efficiency improvements",
    },
    {
      id: "9",
      title: "Launch Preparation",
      description: "Final checks and deployment setup",
    },
    {
      id: "10",
      title: "Go Live",
      description: "Release to production environment",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsLoading(false);
    setCurrentStep(0);
  };

  const verticalStepperCode = `
import React, { useState } from "react";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";

export const VerticalStepperExample = () => {
  const [currentStep, setCurrentStep] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  
  const steps = [
    { id: "1", title: "Project Kickoff", description: "Gather requirements and set expectations" },
    { id: "2", title: "Research Phase", description: "Market analysis and competitor research" },
    { id: "3", title: "Design & Wireframes", description: "Create user interface mockups" },
    { id: "4", title: "Development Sprint", description: "Build core features and functionality" },
    { id: "5", title: "Testing & QA", description: "Bug fixes and quality assurance" },
    { id: "6", title: "Client Review", description: "Present demo and gather feedback" },
    { id: "7", title: "Revisions", description: "Implement requested changes" },
    { id: "8", title: "Performance Optimization", description: "Speed and efficiency improvements" },
    { id: "9", title: "Launch Preparation", description: "Final checks and deployment setup" },
    { id: "10", title: "Go Live", description: "Release to production environment" }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    setCurrentStep(0);
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="space-y-6">
      <Stepper steps={steps} currentStep={currentStep} vertical={true} />
      
      <div className="flex space-x-3">
        <Button 
          onClick={handlePrevious}
          disabled={currentStep === 0 || isLoading}
          variant="outline"
          size="sm"
        >
          Back
        </Button>
        <Button 
          onClick={isLastStep ? handleSubmit : handleNext}
          isLoading={isLoading}
          size="sm"
        >
          {isLastStep ? "Submit" : "Continue"}
        </Button>
      </div>
    </div>
  );
};
`;

  const isLastStep = currentStep === steps.length - 1;

  return (
    <SnippetPreview
      title="Vertical Project Timeline"
      code={verticalStepperCode}
    >
      <div className="space-y-6 w-full  ">
        <div className="max-h-[400px] overflow-auto hide-scrolbar border px-4 py-4 rounded-lg border-border ">
          <Stepper steps={steps} currentStep={currentStep} vertical={true} />
        </div>

        <div className="flex space-x-3 ">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0 || isLoading}
            variant="outline"
            size="sm"
          >
            Back
          </Button>
          <Button
            isLoading={isLoading}
            onClick={isLastStep ? handleSubmit : handleNext}
            size="sm"
          >
            {isLastStep ? "Submit" : "Continue"}
          </Button>
        </div>
      </div>
    </SnippetPreview>
  );
};
