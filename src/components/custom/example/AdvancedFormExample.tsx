"use client";

import React, { useEffect, useState } from "react";
import { AdvancedForm } from "@/components/custom/AdvancedForm";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const ComprehensiveFormExample = () => {
  const handleSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const formCode = `import { AdvancedForm } from "@/components/ui/AdvancedForm";

export const ComprehensiveFormExample = () => {
  const handleSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <AdvancedForm
        onSubmit={handleSubmit}
        onChange={(data) => console.log("Form changed:", data)}
        autoSave
        autoSaveKey="comprehensive-form"
        className="max-w-5xl mx-auto"
      >
        <AdvancedForm.Header
          title="Advanced Form Demo"
          description="Experience all form features in one place"
        />

        <AdvancedForm.StepperProgress />

        <AdvancedForm.Form onSubmit={handleSubmit}>
          <AdvancedForm.Step
            id="personal"
            title="Personal Info"
            description="Tell us about yourself"
          >
            <AdvancedForm.Group className="grid md:grid-cols-2 gap-4">
              <AdvancedForm.Field
                id="name"
                validation={{
                  required: true,
                  minLength: 2,
                  minLengthError: "Name must be at least 2 characters",
                }}
              >
                <AdvancedForm.Label required>Full Name</AdvancedForm.Label>
                <AdvancedForm.Input type="text" placeholder="John Doe" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="email" validation={{ required: true }}>
                <AdvancedForm.Label required>Email Address</AdvancedForm.Label>
                <AdvancedForm.Input
                  type="email"
                  placeholder="john@example.com"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="phone">
                <AdvancedForm.Label>Phone Number</AdvancedForm.Label>
                <AdvancedForm.Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="website">
                <AdvancedForm.Label>Website</AdvancedForm.Label>
                <AdvancedForm.Input
                  type="url"
                  placeholder="https://johndoe.com"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="age"
                validation={{ required: true, min: 18, max: 100 }}
              >
                <AdvancedForm.Label required>Age</AdvancedForm.Label>
                <AdvancedForm.Input type="number" placeholder="25" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="birthDate"
                validation={{ required: true }}
              >
                <AdvancedForm.Label required>Date of Birth</AdvancedForm.Label>
                <AdvancedForm.DatePicker placeholder="Select your birth date" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="password"
                validation={{ required: true }}
                className="md:col-span-2"
              >
                <AdvancedForm.Label required>Password</AdvancedForm.Label>
                <AdvancedForm.PasswordInput placeholder="Enter a strong password" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>
            </AdvancedForm.Group>
          </AdvancedForm.Step>

          <AdvancedForm.Step
            id="preferences"
            title="Preferences"
            description="Customize your experience"
          >
            <AdvancedForm.Group className="space-y-6">
              <AdvancedForm.Field id="userType" validation={{ required: true }}>
                <AdvancedForm.Label required>Account Type</AdvancedForm.Label>
                <AdvancedForm.RadioGroup>
                  <div className="flex items-center gap-3">
                    <AdvancedForm.RadioGroup.Item
                      id="individual"
                      value="individual"
                    ></AdvancedForm.RadioGroup.Item>
                    <AdvancedForm.Label htmlFor="individual">
                      individual
                    </AdvancedForm.Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <AdvancedForm.RadioGroup.Item
                      id="business"
                      value="business"
                    ></AdvancedForm.RadioGroup.Item>
                    <AdvancedForm.Label htmlFor="business">
                      business
                    </AdvancedForm.Label>
                  </div>
                </AdvancedForm.RadioGroup>
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="companyName"
                validation={{ required: true, minLength: 2 }}
                conditional={(values) => values.userType === "business"}
              >
                <AdvancedForm.Label required>Company Name</AdvancedForm.Label>
                <AdvancedForm.Input type="text" placeholder="Acme Corp" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="interests">
                <AdvancedForm.Label>Interests</AdvancedForm.Label>
                <AdvancedForm.MultiSelect placeholder="Select your interests">
                  <AdvancedForm.MultiSelect.Item value="technology">
                    Technology
                  </AdvancedForm.MultiSelect.Item>
                  <AdvancedForm.MultiSelect.Item value="design">
                    Design
                  </AdvancedForm.MultiSelect.Item>
                  <AdvancedForm.MultiSelect.Item value="marketing">
                    Marketing
                  </AdvancedForm.MultiSelect.Item>
                  <AdvancedForm.MultiSelect.Item value="finance">
                    Finance
                  </AdvancedForm.MultiSelect.Item>
                  <AdvancedForm.MultiSelect.Item value="health">
                    Health
                  </AdvancedForm.MultiSelect.Item>
                </AdvancedForm.MultiSelect>
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="skills" validation={{ max: 10 }}>
                <AdvancedForm.Label>Skills (Tags)</AdvancedForm.Label>
                <AdvancedForm.MultiInput
                  placeholder="Type and press Enter to add skills"
                  max={10}
                />

                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="notifications">
                <AdvancedForm.Label>
                  Notification Preferences
                </AdvancedForm.Label>
                <AdvancedForm.CheckboxGroup>
                  <AdvancedForm.CheckboxGroup.Item
                    value="email"
                    label="Email notifications"
                  />
                  <AdvancedForm.CheckboxGroup.Item
                    value="sms"
                    label="SMS notifications"
                  />
                  <AdvancedForm.CheckboxGroup.Item
                    value="push"
                    label="Push notifications"
                  />
                </AdvancedForm.CheckboxGroup>
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="budget" validation={{ required: true }}>
                <AdvancedForm.Label required>Budget Range</AdvancedForm.Label>
                <AdvancedForm.Select placeholder="Select your budget">
                  <AdvancedForm.Select.Item value="under-1k">
                    Under $1,000
                  </AdvancedForm.Select.Item>
                  <AdvancedForm.Select.Item value="1k-5k">
                    $1,000 - $5,000
                  </AdvancedForm.Select.Item>
                  <AdvancedForm.Select.Item value="over-5k">
                    Over $5,000
                  </AdvancedForm.Select.Item>
                </AdvancedForm.Select>
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="projectDuration">
                <AdvancedForm.Label>Project Duration</AdvancedForm.Label>
                <AdvancedForm.DateRangePicker placeholder="Select project timeline" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="experience"
                validation={{ required: true }}
                defaultValue={1}
              >
                <AdvancedForm.Label required>
                  Experience Level (1-10)
                </AdvancedForm.Label>
                <AdvancedForm.Slider min={1} max={10} step={1} />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="priceRange" defaultValue={[100, 5000]}>
                <AdvancedForm.Label>Price Range ($)</AdvancedForm.Label>
                <AdvancedForm.RangeSlider min={100} max={5000} step={50} />
                <AdvancedForm.Error />
              </AdvancedForm.Field>
            </AdvancedForm.Group>
          </AdvancedForm.Step>

          <AdvancedForm.Step
            id="final"
            title="Final Details"
            description="Complete your profile"
          >
            <AdvancedForm.Group className="space-y-6">
              <AdvancedForm.Field id="bio" validation={{ maxLength: 500 }}>
                <AdvancedForm.Label>Bio</AdvancedForm.Label>
                <AdvancedForm.Textarea
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
                <AdvancedForm.Description>
                  Maximum 500 characters
                </AdvancedForm.Description>
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="customField"
                validation={{
                  required: true,
                  custom: (value: any) => {
                    if (!value?.startsWith("PRJ-"))
                      return "Code must start with 'PRJ-'";
                    if (value.length < 6)
                      return "Code must be at least 6 characters";
                    return null;
                  },
                }}
              >
                <AdvancedForm.Label required>Project Code</AdvancedForm.Label>
                <AdvancedForm.Input
                  type="text"
                  placeholder="Must start with 'PRJ-'"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="emailNotifications" defaultValue={false}>
                <AdvancedForm.Label>Email Notifications</AdvancedForm.Label>
                <AdvancedForm.Switch id="emailNotifications" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="newsletter" defaultValue={false}>
                <AdvancedForm.Label>Newsletter</AdvancedForm.Label>
                <AdvancedForm.Checkbox
                  id="newsletter"
                  label="Subscribe to Newsletter"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="terms" validation={{ required: true }}>
                <AdvancedForm.Label required>
                  Terms & Conditions
                </AdvancedForm.Label>
                <AdvancedForm.Checkbox
                  id="terms"
                  label="I agree to Terms & Conditions"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>
            </AdvancedForm.Group>
          </AdvancedForm.Step>

          <AdvancedForm.Actions>
            <div className="flex gap-3">
              <AdvancedForm.BackButton />
              <AdvancedForm.ResetButton />
            </div>
            <div className="flex gap-3">
              <AdvancedForm.NextButton />
              <AdvancedForm.SubmitButton>
                Complete Registration
              </AdvancedForm.SubmitButton>
            </div>
          </AdvancedForm.Actions>
        </AdvancedForm.Form>
      </AdvancedForm>
   
  );
};`;

  return (
    <SnippetPreview title="Complete Advanced Form" code={formCode}>
      <AdvancedForm
        onSubmit={handleSubmit}
        // onChange={(data) => console.log("Form changed:", data)}
        autoSave
        autoSaveKey="comprehensive-form"
        className="max-w-5xl mx-auto"
      >
        <AdvancedForm.Header
          title="Advanced Form Demo"
          description="Experience all form features in one place"
        />

        <AdvancedForm.StepperProgress />

        <AdvancedForm.Form onSubmit={handleSubmit}>
          <AdvancedForm.Step
            id="personal"
            title="Personal Info"
            description="Tell us about yourself"
          >
            <AdvancedForm.Group className="grid md:grid-cols-2 gap-4">
              <AdvancedForm.Field
                id="name"
                validation={{
                  required: true,
                  minLength: 2,
                  minLengthError: "Name must be at least 2 characters",
                }}
              >
                <AdvancedForm.Label required>Full Name</AdvancedForm.Label>
                <AdvancedForm.Input type="text" placeholder="John Doe" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="email" validation={{ required: true }}>
                <AdvancedForm.Label required>Email Address</AdvancedForm.Label>
                <AdvancedForm.Input
                  type="email"
                  placeholder="john@example.com"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="phone">
                <AdvancedForm.Label>Phone Number</AdvancedForm.Label>
                <AdvancedForm.Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="website">
                <AdvancedForm.Label>Website</AdvancedForm.Label>
                <AdvancedForm.Input
                  type="url"
                  placeholder="https://johndoe.com"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="age"
                validation={{ required: true, min: 18, max: 100 }}
              >
                <AdvancedForm.Label required>Age</AdvancedForm.Label>
                <AdvancedForm.Input type="number" placeholder="25" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="birthDate"
                validation={{ required: true }}
              >
                <AdvancedForm.Label required>Date of Birth</AdvancedForm.Label>
                <AdvancedForm.DatePicker placeholder="Select your birth date" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="password"
                validation={{ required: true }}
                className="md:col-span-2"
              >
                <AdvancedForm.Label required>Password</AdvancedForm.Label>
                <AdvancedForm.PasswordInput placeholder="Enter a strong password" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>
            </AdvancedForm.Group>
          </AdvancedForm.Step>

          <AdvancedForm.Step
            id="preferences"
            title="Preferences"
            description="Customize your experience"
          >
            <AdvancedForm.Group className="space-y-6">
              <AdvancedForm.Field id="userType" validation={{ required: true }}>
                <AdvancedForm.Label required>Account Type</AdvancedForm.Label>
                <AdvancedForm.RadioGroup>
                  <div className="flex items-center gap-3">
                    <AdvancedForm.RadioGroup.Item
                      id="individual"
                      value="individual"
                    ></AdvancedForm.RadioGroup.Item>
                    <AdvancedForm.Label htmlFor="individual">
                      individual
                    </AdvancedForm.Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <AdvancedForm.RadioGroup.Item
                      id="business"
                      value="business"
                    ></AdvancedForm.RadioGroup.Item>
                    <AdvancedForm.Label htmlFor="business">
                      business
                    </AdvancedForm.Label>
                  </div>
                </AdvancedForm.RadioGroup>
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="companyName"
                validation={{ required: true, minLength: 2 }}
                conditional={(values) => values.userType === "business"}
              >
                <AdvancedForm.Label required>Company Name</AdvancedForm.Label>
                <AdvancedForm.Input type="text" placeholder="Acme Corp" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="interests">
                <AdvancedForm.Label>Interests</AdvancedForm.Label>
                <AdvancedForm.MultiSelect placeholder="Select your interests">
                  <AdvancedForm.MultiSelect.Item value="technology">
                    Technology
                  </AdvancedForm.MultiSelect.Item>
                  <AdvancedForm.MultiSelect.Item value="design">
                    Design
                  </AdvancedForm.MultiSelect.Item>
                  <AdvancedForm.MultiSelect.Item value="marketing">
                    Marketing
                  </AdvancedForm.MultiSelect.Item>
                  <AdvancedForm.MultiSelect.Item value="finance">
                    Finance
                  </AdvancedForm.MultiSelect.Item>
                  <AdvancedForm.MultiSelect.Item value="health">
                    Health
                  </AdvancedForm.MultiSelect.Item>
                </AdvancedForm.MultiSelect>
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="skills" validation={{ max: 10 }}>
                <AdvancedForm.Label>Skills (Tags)</AdvancedForm.Label>
                <AdvancedForm.MultiInput
                  placeholder="Type and press Enter to add skills"
                  max={10}
                />

                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="notifications">
                <AdvancedForm.Label>
                  Notification Preferences
                </AdvancedForm.Label>
                <AdvancedForm.CheckboxGroup>
                  <AdvancedForm.CheckboxGroup.Item
                    value="email"
                    label="Email notifications"
                  />
                  <AdvancedForm.CheckboxGroup.Item
                    value="sms"
                    label="SMS notifications"
                  />
                  <AdvancedForm.CheckboxGroup.Item
                    value="push"
                    label="Push notifications"
                  />
                </AdvancedForm.CheckboxGroup>
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="budget" validation={{ required: true }}>
                <AdvancedForm.Label required>Budget Range</AdvancedForm.Label>
                <AdvancedForm.Select placeholder="Select your budget">
                  <AdvancedForm.Select.Item value="under-1k">
                    Under $1,000
                  </AdvancedForm.Select.Item>
                  <AdvancedForm.Select.Item value="1k-5k">
                    $1,000 - $5,000
                  </AdvancedForm.Select.Item>
                  <AdvancedForm.Select.Item value="over-5k">
                    Over $5,000
                  </AdvancedForm.Select.Item>
                </AdvancedForm.Select>
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="projectDuration">
                <AdvancedForm.Label>Project Duration</AdvancedForm.Label>
                <AdvancedForm.DateRangePicker placeholder="Select project timeline" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="experience"
                validation={{ required: true }}
                defaultValue={1}
              >
                <AdvancedForm.Label required>
                  Experience Level (1-10)
                </AdvancedForm.Label>
                <AdvancedForm.Slider min={1} max={10} step={1} />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="priceRange" defaultValue={[100, 5000]}>
                <AdvancedForm.Label>Price Range ($)</AdvancedForm.Label>
                <AdvancedForm.RangeSlider min={100} max={5000} step={50} />
                <AdvancedForm.Error />
              </AdvancedForm.Field>
            </AdvancedForm.Group>
          </AdvancedForm.Step>

          <AdvancedForm.Step
            id="final"
            title="Final Details"
            description="Complete your profile"
          >
            <AdvancedForm.Group className="space-y-6">
              <AdvancedForm.Field id="bio" validation={{ maxLength: 500 }}>
                <AdvancedForm.Label>Bio</AdvancedForm.Label>
                <AdvancedForm.Textarea
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
                <AdvancedForm.Description>
                  Maximum 500 characters
                </AdvancedForm.Description>
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="customField"
                validation={{
                  required: true,
                  custom: (value: any) => {
                    if (!value?.startsWith("PRJ-"))
                      return "Code must start with 'PRJ-'";
                    if (value.length < 6)
                      return "Code must be at least 6 characters";
                    return null;
                  },
                }}
              >
                <AdvancedForm.Label required>Project Code</AdvancedForm.Label>
                <AdvancedForm.Input
                  type="text"
                  placeholder="Must start with 'PRJ-'"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="emailNotifications" defaultValue={false}>
                <AdvancedForm.Label>Email Notifications</AdvancedForm.Label>
                <AdvancedForm.Switch id="emailNotifications" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="newsletter" defaultValue={false}>
                <AdvancedForm.Label>Newsletter</AdvancedForm.Label>
                <AdvancedForm.Checkbox
                  id="newsletter"
                  label="Subscribe to Newsletter"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field id="terms" validation={{ required: true }}>
                <AdvancedForm.Label required>
                  Terms & Conditions
                </AdvancedForm.Label>
                <AdvancedForm.Checkbox
                  id="terms"
                  label="I agree to Terms & Conditions"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>
            </AdvancedForm.Group>
          </AdvancedForm.Step>

          <AdvancedForm.Actions>
            <div className="flex gap-3">
              <AdvancedForm.BackButton />
              <AdvancedForm.ResetButton />
            </div>
            <div className="flex gap-3">
              <AdvancedForm.NextButton />
              <AdvancedForm.SubmitButton>
                Complete Registration
              </AdvancedForm.SubmitButton>
            </div>
          </AdvancedForm.Actions>
        </AdvancedForm.Form>
      </AdvancedForm>
    </SnippetPreview>
  );
};

export const JobApplicationFormExample = () => {
  const handleSubmit = async (data: any) => {
    // console.log("Application submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const formCode = `import { AdvancedForm } from "@/components/ui/AdvancedForm";

export const JobApplicationFormExample = () => {
  const handleSubmit = async (data: any) => {
    console.log("Application submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <AdvancedForm
      onSubmit={handleSubmit}
      autoSave
      autoSaveKey="job-application"
      className="max-w-2xl mx-auto"
    >
      <AdvancedForm.Header
        title="Job Application"
        description="Apply for our open position"
      />

      <AdvancedForm.Form onSubmit={handleSubmit}>
        <AdvancedForm.Group className="space-y-6">
          
          <AdvancedForm.Field 
            id="fullName" 
            validation={{ required: true, minLength: 2, minLengthError: "Name must be at least 2 characters" }}
          >
            <AdvancedForm.Label required>Full Name</AdvancedForm.Label>
            <AdvancedForm.Input type="text" placeholder="Enter your full name" />
            <AdvancedForm.Error />
          </AdvancedForm.Field>

          <AdvancedForm.Field 
            id="email" 
            validation={{ required: true, emailError: "Please enter a valid email address" }}
          >
            <AdvancedForm.Label required>Email Address</AdvancedForm.Label>
            <AdvancedForm.Input type="email" placeholder="your.email@example.com" />
            <AdvancedForm.Error />
          </AdvancedForm.Field>

          <AdvancedForm.Field 
            id="resume" 
            validation={{ required: true, maxSize: 5000000, customFileError: "Resume file must be under 5MB" }}
          >
            <AdvancedForm.Label required>Resume/CV</AdvancedForm.Label>
            <AdvancedForm.FileInput accept=".pdf,.doc,.docx" />
            <AdvancedForm.Error />
          </AdvancedForm.Field>

          <AdvancedForm.Field 
            id="githubUrl" 
            validation={{ urlError: "Please enter a valid GitHub URL" }}
          >
            <AdvancedForm.Label>GitHub Profile</AdvancedForm.Label>
            <AdvancedForm.Input type="url" placeholder="https://github.com/username" />
            <AdvancedForm.Error />
          </AdvancedForm.Field>

          <AdvancedForm.Field id="experience" validation={{ required: true }}>
            <AdvancedForm.Label required>Years of Experience</AdvancedForm.Label>
            <AdvancedForm.Select placeholder="Select your experience">
              <AdvancedForm.Select.Item value="0-1">0-1 years</AdvancedForm.Select.Item>
              <AdvancedForm.Select.Item value="2-3">2-3 years</AdvancedForm.Select.Item>
              <AdvancedForm.Select.Item value="4-5">4-5 years</AdvancedForm.Select.Item>
              <AdvancedForm.Select.Item value="6-10">6-10 years</AdvancedForm.Select.Item>
              <AdvancedForm.Select.Item value="10+">10+ years</AdvancedForm.Select.Item>
            </AdvancedForm.Select>
            <AdvancedForm.Error />
          </AdvancedForm.Field>
        </AdvancedForm.Group>

        <AdvancedForm.Actions>
          <div></div>
          <AdvancedForm.SubmitButton>Submit Application</AdvancedForm.SubmitButton>
        </AdvancedForm.Actions>
      </AdvancedForm.Form>
    </AdvancedForm>
  );
};`;

  return (
    <SnippetPreview title="Job Application Form" code={formCode}>
      <AdvancedForm
        onSubmit={handleSubmit}
        autoSave
        autoSaveKey="job-application"
        className="max-w-2xl mx-auto"
      >
        <AdvancedForm.Header
          title="Job Application"
          description="Apply for our open position"
        />

        <AdvancedForm.Form onSubmit={handleSubmit}>
          <AdvancedForm.Group className="space-y-6">
            <AdvancedForm.Field
              id="fullName"
              validation={{
                required: true,
                minLength: 2,
                minLengthError: "Name must be at least 2 characters",
              }}
            >
              <AdvancedForm.Label required>Full Name</AdvancedForm.Label>
              <AdvancedForm.Input
                type="text"
                placeholder="Enter your full name"
              />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field
              id="email"
              validation={{
                required: true,
                emailError: "Please enter a valid email address",
              }}
            >
              <AdvancedForm.Label required>Email Address</AdvancedForm.Label>
              <AdvancedForm.Input
                type="email"
                placeholder="your.email@example.com"
              />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field
              id="resume"
              validation={{
                required: true,
                maxSize: 5000000,
                customFileError: "Resume file must be under 5MB",
              }}
            >
              <AdvancedForm.Label required>Resume/CV</AdvancedForm.Label>
              <AdvancedForm.FileInput accept=".pdf,.doc,.docx" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field
              id="githubUrl"
              validation={{ urlError: "Please enter a valid GitHub URL" }}
            >
              <AdvancedForm.Label>GitHub Profile</AdvancedForm.Label>
              <AdvancedForm.Input
                type="url"
                placeholder="https://github.com/username"
              />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field id="experience" validation={{ required: true }}>
              <AdvancedForm.Label required>
                Years of Experience
              </AdvancedForm.Label>
              <AdvancedForm.Select placeholder="Select your experience">
                <AdvancedForm.Select.Item value="0-1">
                  0-1 years
                </AdvancedForm.Select.Item>
                <AdvancedForm.Select.Item value="2-3">
                  2-3 years
                </AdvancedForm.Select.Item>
                <AdvancedForm.Select.Item value="4-5">
                  4-5 years
                </AdvancedForm.Select.Item>
                <AdvancedForm.Select.Item value="6-10">
                  6-10 years
                </AdvancedForm.Select.Item>
                <AdvancedForm.Select.Item value="10+">
                  10+ years
                </AdvancedForm.Select.Item>
              </AdvancedForm.Select>
              <AdvancedForm.Error />
            </AdvancedForm.Field>
          </AdvancedForm.Group>

          <AdvancedForm.Actions>
            <div></div>
            <AdvancedForm.SubmitButton>
              Submit Application
            </AdvancedForm.SubmitButton>
          </AdvancedForm.Actions>
        </AdvancedForm.Form>
      </AdvancedForm>
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

  const handleSubmit = async (data: any) => {
    // console.log("Updated profile data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch("https://randomuser.me/api/");
    const result = await response.json();
    const updatedUser = result.results[0];
    setUserData(updatedUser);
  };

  const formCode = `import { AdvancedForm } from "@/components/ui/AdvancedForm";
import { useState, useEffect } from "react";

export const UserProfileFormExample = () => {
  const [userData, setUserData] = useState(null);
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

  const handleSubmit = async (data) => {
    console.log("Updated profile data:", data);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <AdvancedForm
      onSubmit={handleSubmit}
      initialValues={{
        name: \`\${userData?.name?.first || ""} \${userData?.name?.last || ""}\`.trim(),
        username: userData?.login?.username || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        dateOfBirth: userData?.dob?.date ? userData.dob.date.split("T")[0] : "",
        gender: userData?.gender || "",
        country: userData?.location?.country || "",
        city: userData?.location?.city || "",
        notifications: true,
        newsletter: false,
      }}
      autoSave
      autoSaveKey="user-profile"
      isFormLoading={loading}
      skeletonProps={{ fields: 12, columns: 2 }}
      className="max-w-4xl mx-auto"
    >
      <AdvancedForm.Header
        title="Edit Profile"
        description={userData ? \`Welcome back, \${userData.name.first}! Update your profile information below.\` : "Update your profile information"}
      />

      <AdvancedForm.Form onSubmit={handleSubmit}>
        <AdvancedForm.Group className="space-y-6">
          
          <AdvancedForm.Field 
            id="profilePicture" 
            validation={{ required: true, maxSize: 2000000 }}
            defaultValue={userData?.picture?.large || ""}
          >
            <AdvancedForm.Label required>Profile Picture</AdvancedForm.Label>
            <AdvancedForm.ImageInput previewUrl={userData?.picture?.large} />
            <AdvancedForm.Description>Upload a profile picture (max 2MB)</AdvancedForm.Description>
            <AdvancedForm.Error />
          </AdvancedForm.Field>

          <div className="grid md:grid-cols-2 gap-6">
            <AdvancedForm.Field 
              id="name" 
              validation={{ required: true, minLength: 2 }}
              defaultValue={\`\${userData?.name?.first || ""} \${userData?.name?.last || ""}\`.trim()}
            >
              <AdvancedForm.Label required>Full Name</AdvancedForm.Label>
              <AdvancedForm.Input type="text" placeholder="John Doe" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field 
              id="username" 
              validation={{ required: true, minLength: 3 }}
              defaultValue={userData?.login?.username || ""}
            >
              <AdvancedForm.Label required>Username</AdvancedForm.Label>
              <AdvancedForm.Input type="text" placeholder="johndoe" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field 
              id="email" 
              validation={{ required: true }}
              defaultValue={userData?.email || ""}
            >
              <AdvancedForm.Label required>Email</AdvancedForm.Label>
              <AdvancedForm.Input type="email" placeholder="john@example.com" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field 
              id="phone"
              defaultValue={userData?.phone || ""}
            >
              <AdvancedForm.Label>Phone</AdvancedForm.Label>
              <AdvancedForm.Input type="tel" placeholder="+1 (555) 123-4567" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field 
              id="dateOfBirth"
              defaultValue={userData?.dob?.date ? userData.dob.date.split("T")[0] : ""}
            >
              <AdvancedForm.Label>Date of Birth</AdvancedForm.Label>
              <AdvancedForm.DatePicker placeholder="Select your birth date" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field 
              id="gender"
              defaultValue={userData?.gender || ""}
            >
              <AdvancedForm.Label>Gender</AdvancedForm.Label>
              <AdvancedForm.Select placeholder="Select gender">
                <AdvancedForm.Select.Item value="male">Male</AdvancedForm.Select.Item>
                <AdvancedForm.Select.Item value="female">Female</AdvancedForm.Select.Item>
                <AdvancedForm.Select.Item value="other">Other</AdvancedForm.Select.Item>
                <AdvancedForm.Select.Item value="not-specified">Prefer not to say</AdvancedForm.Select.Item>
              </AdvancedForm.Select>
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field 
              id="country"
              defaultValue={userData?.location?.country || ""}
            >
              <AdvancedForm.Label>Country</AdvancedForm.Label>
              <AdvancedForm.Input type="text" placeholder="United States" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field 
              id="city"
              defaultValue={userData?.location?.city || ""}
            >
              <AdvancedForm.Label>City</AdvancedForm.Label>
              <AdvancedForm.Input type="text" placeholder="New York" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>
          </div>

          <AdvancedForm.Field 
            id="bio" 
            validation={{ maxLength: 500 }}
          >
            <AdvancedForm.Label>Bio</AdvancedForm.Label>
            <AdvancedForm.Textarea placeholder="Tell us about yourself..." rows={4} />
            <AdvancedForm.Description>Brief description about yourself (max 500 characters)</AdvancedForm.Description>
            <AdvancedForm.Error />
          </AdvancedForm.Field>

       <AdvancedForm.Field id="notifications" defaultValue={true}>
              <AdvancedForm.Label>Notifications</AdvancedForm.Label>
              <AdvancedForm.Switch id="notifications" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

         <AdvancedForm.Field id="newsletter" defaultValue={false}>
              <AdvancedForm.Label>Newsletter</AdvancedForm.Label>
              <AdvancedForm.Checkbox
                id="newsletter"
                label="Subscribe to Newsletter"
              />
              <AdvancedForm.Error />
            </AdvancedForm.Field>
        </AdvancedForm.Group>

        <AdvancedForm.Actions>
          <AdvancedForm.ResetButton />
          <AdvancedForm.SubmitButton>Update Profile</AdvancedForm.SubmitButton>
        </AdvancedForm.Actions>
      </AdvancedForm.Form>
    </AdvancedForm>
  );
};`;

  return (
    <SnippetPreview title="Profile Form with Image Support" code={formCode}>
      <AdvancedForm
        key={userData?.login?.uuid || "profile-form"}
        onSubmit={handleSubmit}
        initialValues={{
          name: `${userData?.name?.first || ""} ${
            userData?.name?.last || ""
          }`.trim(),
          username: userData?.login?.username || "",
          email: userData?.email || "",
          phone: userData?.phone || "",
          dateOfBirth: userData?.dob?.date
            ? userData.dob.date.split("T")[0]
            : "",
          gender: userData?.gender || "",
          country: userData?.location?.country || "",
          city: userData?.location?.city || "",
          notifications: true,
          newsletter: false,
        }}
        autoSave
        autoSaveKey="user-profile"
        isFormLoading={loading}
        skeletonProps={{ fields: 12, columns: 2 }}
        className="max-w-4xl mx-auto"
      >
        <AdvancedForm.Header
          title="Edit Profile"
          description={
            userData
              ? `Welcome back, ${userData.name.first}! Update your profile information below.`
              : "Update your profile information"
          }
        />

        <AdvancedForm.Form onSubmit={handleSubmit}>
          <AdvancedForm.Group className="space-y-6">
            <AdvancedForm.Field
              id="profilePicture"
              validation={{ required: true, maxSize: 2000000 }}
              defaultValue={userData?.picture?.large || ""}
            >
              <AdvancedForm.Label required>Profile Picture</AdvancedForm.Label>
              <AdvancedForm.ImageInput previewUrl={userData?.picture?.large} />
              <AdvancedForm.Description>
                Upload a profile picture (max 2MB)
              </AdvancedForm.Description>
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <div className="grid md:grid-cols-2 gap-6">
              <AdvancedForm.Field
                id="name"
                validation={{ required: true, minLength: 2 }}
                defaultValue={`${userData?.name?.first || ""} ${
                  userData?.name?.last || ""
                }`.trim()}
              >
                <AdvancedForm.Label required>Full Name</AdvancedForm.Label>
                <AdvancedForm.Input type="text" placeholder="John Doe" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="username"
                validation={{ required: true, minLength: 3 }}
                defaultValue={userData?.login?.username || ""}
              >
                <AdvancedForm.Label required>Username</AdvancedForm.Label>
                <AdvancedForm.Input type="text" placeholder="johndoe" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="email"
                validation={{ required: true }}
                defaultValue={userData?.email || ""}
              >
                <AdvancedForm.Label required>Email</AdvancedForm.Label>
                <AdvancedForm.Input
                  type="email"
                  placeholder="john@example.com"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="phone"
                defaultValue={userData?.phone || ""}
              >
                <AdvancedForm.Label>Phone</AdvancedForm.Label>
                <AdvancedForm.Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="dateOfBirth"
                defaultValue={
                  userData?.dob?.date ? userData.dob.date.split("T")[0] : ""
                }
              >
                <AdvancedForm.Label>Date of Birth</AdvancedForm.Label>
                <AdvancedForm.DatePicker placeholder="Select your birth date" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="gender"
                defaultValue={userData?.gender || ""}
              >
                <AdvancedForm.Label>Gender</AdvancedForm.Label>
                <AdvancedForm.Select placeholder="Select gender">
                  <AdvancedForm.Select.Item value="male">
                    Male
                  </AdvancedForm.Select.Item>
                  <AdvancedForm.Select.Item value="female">
                    Female
                  </AdvancedForm.Select.Item>
                  <AdvancedForm.Select.Item value="other">
                    Other
                  </AdvancedForm.Select.Item>
                  <AdvancedForm.Select.Item value="not-specified">
                    Prefer not to say
                  </AdvancedForm.Select.Item>
                </AdvancedForm.Select>
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="country"
                defaultValue={userData?.location?.country || ""}
              >
                <AdvancedForm.Label>Country</AdvancedForm.Label>
                <AdvancedForm.Input type="text" placeholder="United States" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>

              <AdvancedForm.Field
                id="city"
                defaultValue={userData?.location?.city || ""}
              >
                <AdvancedForm.Label>City</AdvancedForm.Label>
                <AdvancedForm.Input type="text" placeholder="New York" />
                <AdvancedForm.Error />
              </AdvancedForm.Field>
            </div>

            <AdvancedForm.Field id="bio" validation={{ maxLength: 500 }}>
              <AdvancedForm.Label>Bio</AdvancedForm.Label>
              <AdvancedForm.Textarea
                placeholder="Tell us about yourself..."
                rows={4}
              />
              <AdvancedForm.Description>
                Brief description about yourself (max 500 characters)
              </AdvancedForm.Description>
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field id="notifications" defaultValue={true}>
              <AdvancedForm.Label>Notifications</AdvancedForm.Label>
              <AdvancedForm.Switch id="notifications" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field id="newsletter" defaultValue={false}>
              <AdvancedForm.Label>Newsletter</AdvancedForm.Label>
              <AdvancedForm.Checkbox
                id="newsletter"
                label="Subscribe to Newsletter"
              />
              <AdvancedForm.Error />
            </AdvancedForm.Field>
          </AdvancedForm.Group>

          <AdvancedForm.Actions>
            <AdvancedForm.ResetButton />
            <AdvancedForm.SubmitButton>
              Update Profile
            </AdvancedForm.SubmitButton>
          </AdvancedForm.Actions>
        </AdvancedForm.Form>
      </AdvancedForm>
    </SnippetPreview>
  );
};
