"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Form } from "@/components/custom/Form";
import { Input } from "@/components/custom/Input";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { Textarea } from "@/components/custom/TextArea";
import { Button } from "@/components/custom/Button";
import { Checkbox } from "@/components/custom/Checkbox";
import { Switch } from "@/components/custom/Switch";
import { RadioGroup, RadioGroupItem } from "@/components/custom/RadioGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custom/Select";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/custom/MultiSelect";
import { Slider } from "@/components/custom/Slider";
import { RangeSlider } from "@/components/custom/RangeSlider";
import { DatePicker } from "@/components/custom/DatePicker";
import { DateRangePicker } from "@/components/custom/DateRangePicker";
import { MultiInput } from "@/components/custom/MultiInput";
import { ImageInput } from "@/components/custom/ImageInput";
import { CheckboxGroup } from "@/components/custom/CheckboxGroup";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/custom/Card";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  website: z.string().url("Please enter a valid URL"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  agreeTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to terms"),
  notifications: z
    .boolean()
    .refine((val) => val === true, "You must enable notifications"),
  gender: z.string().min(1, "Please select a gender"),
  country: z.string().min(1, "Please select a country"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  experience: z.number(),
  priceRange: z.tuple([z.number(), z.number()]),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  tags: z.array(z.string()).min(1, "Add at least one tag"),
  birthDate: z.string().min(1, "Please select your birth date"),
  availability: z
    .object({
      start: z.string().nullable(),
      end: z.string().nullable(),
    })
    .refine(
      (val) => val.start !== null && val.end !== null,
      "Please select availability period"
    ),
  resume: z
    .any()
    .refine((file) => file instanceof File, "Please upload your resume"),
  profileImage: z
    .any()
    .refine((file) => file instanceof File, "Please upload a profile image"),
});

function CompleteFormDemo() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    website: "",
    bio: "",
    agreeTerms: false,
    notifications: false,
    gender: "",
    country: "",
    languages: [],
    experience: 5,
    priceRange: [20, 80] as [number, number],
    skills: [],
    tags: [],
    birthDate: "",
    availability: { start: null, end: null },
    resume: null,
    profileImage: null,
  });

  const [errors, setErrors] = useState<Record<string, { message?: string }>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: Record<string, { message?: string }> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0] as string] = { message: issue.message };
        }
      });
      setErrors(formattedErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", result.data);
    setIsSubmitting(false);
  };

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      const fieldSchema =
        formSchema.shape[name as keyof typeof formSchema.shape];
      if (fieldSchema) {
        const result = fieldSchema.safeParse(value);
        if (result.success) {
          const { [name]: _, ...rest } = errors;
          setErrors(rest);
        }
      }
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Registration Form</CardTitle>
        <CardDescription>
          Showcase of all available input components
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit} errors={errors}>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <Form.Field name="fullName">
              <Form.Label htmlFor="fullName" required>
                Full Name
              </Form.Label>
              <Form.Control>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="email">
              <Form.Label htmlFor="email" required>
                Email Address
              </Form.Label>
              <Form.Control>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="password">
              <Form.Label htmlFor="password" required>
                Password
              </Form.Label>
              <Form.Control>
                <PasswordInput
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </Form.Control>
              <Form.Description>
                Must be at least 8 characters long
              </Form.Description>
              <Form.Message />
            </Form.Field>

            <Form.Field name="phone">
              <Form.Label htmlFor="phone" required>
                Phone Number
              </Form.Label>
              <Form.Control>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="website">
              <Form.Label htmlFor="website" required>
                Website
              </Form.Label>
              <Form.Control>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                />
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="country">
              <Form.Label htmlFor="country" required>
                Country
              </Form.Label>
              <Form.Control>
                <Select
                  value={formData.country}
                  onValueChange={(value) => handleChange("country", value)}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                  </SelectContent>
                </Select>
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="tags">
              <Form.Label htmlFor="tags" required>
                Tags
              </Form.Label>
              <Form.Control>
                <MultiInput
                  id="tags"
                  value={formData.tags}
                  onChange={(values) => handleChange("tags", values)}
                  placeholder="Add tags..."
                  max={5}
                />
              </Form.Control>
              <Form.Description>
                Press Enter to add tags (max 5)
              </Form.Description>
              <Form.Message />
            </Form.Field>

            <Form.Field name="languages">
              <Form.Label htmlFor="languages" required>
                Languages
              </Form.Label>
              <Form.Control>
                <MultiSelect
                  values={formData.languages}
                  onValuesChange={(values) => handleChange("languages", values)}
                >
                  <MultiSelectTrigger className="max-w-full" id="languages">
                    <MultiSelectValue placeholder="Select languages" />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectItem value="english">English</MultiSelectItem>
                    <MultiSelectItem value="spanish">Spanish</MultiSelectItem>
                    <MultiSelectItem value="french">French</MultiSelectItem>
                    <MultiSelectItem value="german">German</MultiSelectItem>
                    <MultiSelectItem value="chinese">Chinese</MultiSelectItem>
                  </MultiSelectContent>
                </MultiSelect>
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="experience">
              <Form.Label required>
                Years of Experience: {formData.experience}
              </Form.Label>
              <Form.Control>
                <Slider
                  value={formData.experience}
                  onChange={(value) => handleChange("experience", value)}
                  min={0}
                  max={20}
                  step={1}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="priceRange">
              <Form.Label required>
                Price Range: ${formData.priceRange[0]} - $
                {formData.priceRange[1]}
              </Form.Label>
              <Form.Control>
                <RangeSlider
                  value={formData.priceRange}
                  onChange={(value) => handleChange("priceRange", value)}
                  min={0}
                  max={100}
                  step={5}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="birthDate">
              <Form.Label htmlFor="birthDate" required>
                Birth Date
              </Form.Label>
              <Form.Control>
                <DatePicker
                  id="birthDate"
                  value={
                    formData.birthDate ? new Date(formData.birthDate) : null
                  }
                  onChange={(date) =>
                    handleChange(
                      "birthDate",
                      date?.toISOString().split("T")[0] || ""
                    )
                  }
                  placeholder="Select your birth date"
                />
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="availability">
              <Form.Label htmlFor="availability" required>
                Availability Period
              </Form.Label>
              <Form.Control>
                <DateRangePicker
                  id="availability"
                  value={formData.availability}
                  onChange={(range) => handleChange("availability", range)}
                  placeholder="Select date range"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="resume">
              <Form.Label htmlFor="resume" required>
                Resume
              </Form.Label>
              <Form.Control>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    handleChange("resume", e.target.files?.[0] || null)
                  }
                />
              </Form.Control>
              <Form.Description>Upload PDF or Word document</Form.Description>
            </Form.Field>

            <Form.Field name="profileImage">
              <Form.Label htmlFor="profileImage" required>
                Profile Image
              </Form.Label>
              <Form.Control>
                <ImageInput
                  id="profileImage"
                  onChange={(e) =>
                    handleChange("profileImage", e.target.files?.[0] || null)
                  }
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="gender">
              <Form.Label required>Gender</Form.Label>
              <Form.Control>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleChange("gender", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Form.Label htmlFor="male" className="!mb-0">
                      Male
                    </Form.Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Form.Label htmlFor="female" className="!mb-0">
                      Female
                    </Form.Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Form.Label htmlFor="other" className="!mb-0">
                      Other
                    </Form.Label>
                  </div>
                </RadioGroup>
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="bio">
              <Form.Label htmlFor="bio" required>
                Bio
              </Form.Label>
              <Form.Control>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself..."
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                />
              </Form.Control>
              <Form.Description>Minimum 10 characters</Form.Description>
              <Form.Message />
            </Form.Field>

            <Form.Field name="agreeTerms">
              <Form.Control>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={(checked) => handleChange("agreeTerms", checked)}
                  />
                  <Form.Label htmlFor="agreeTerms" required className="!mb-0">
                    I agree to the terms and conditions
                  </Form.Label>
                </div>
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="skills">
              <Form.Label required>Skills</Form.Label>
              <Form.Control>
                <CheckboxGroup
                  value={formData.skills}
                  onValueChange={(values) => handleChange("skills", values)}
                >
                  <CheckboxGroup.Item value="javascript" label="JavaScript" />
                  <CheckboxGroup.Item value="typescript" label="TypeScript" />
                  <CheckboxGroup.Item value="react" label="React" />
                  <CheckboxGroup.Item value="nodejs" label="Node.js" />
                </CheckboxGroup>
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="notifications">
              <Form.Control>
                <div className="flex  flex-col gap-2">
                  <Form.Label
                    htmlFor="notifications"
                    className="!mb-0"
                    required
                  >
                    Enable Notifications
                  </Form.Label>
                  <Switch
                    id="notifications"
                    checked={formData.notifications}
                    onCheckedChange={(checked) =>
                      handleChange("notifications", checked)
                    }
                  />
                </div>
              </Form.Control>
              <Form.Description>Receive email notifications</Form.Description>
              <Form.Message />
            </Form.Field>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full mt-6">
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}

const code = `"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Textarea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Switch } from "@/components/ui/Switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/MultiSelect";
import { Slider } from "@/components/ui/Slider";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { DatePicker } from "@/components/ui/DatePicker";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { MultiInput } from "@/components/ui/MultiInput";
import { ImageInput } from "@/components/ui/ImageInput";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  website: z.string().url("Please enter a valid URL"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  agreeTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to terms"),
  notifications: z
    .boolean()
    .refine((val) => val === true, "You must enable notifications"),
  gender: z.string().min(1, "Please select a gender"),
  country: z.string().min(1, "Please select a country"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  experience: z.number(),
  priceRange: z.tuple([z.number(), z.number()]),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  tags: z.array(z.string()).min(1, "Add at least one tag"),
  birthDate: z.string().min(1, "Please select your birth date"),
  availability: z
    .object({
      start: z.string().nullable(),
      end: z.string().nullable(),
    })
    .refine(
      (val) => val.start !== null && val.end !== null,
      "Please select availability period"
    ),
  resume: z
    .any()
    .refine((file) => file instanceof File, "Please upload your resume"),
  profileImage: z
    .any()
    .refine((file) => file instanceof File, "Please upload a profile image"),
});

function CompleteFormDemo() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    website: "",
    bio: "",
    agreeTerms: false,
    notifications: false,
    gender: "",
    country: "",
    languages: [],
    experience: 5,
    priceRange: [20, 80] as [number, number],
    skills: [],
    tags: [],
    birthDate: "",
    availability: { start: null, end: null },
    resume: null,
    profileImage: null,
  });

  const [errors, setErrors] = useState<Record<string, { message?: string }>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: Record<string, { message?: string }> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0] as string] = { message: issue.message };
        }
      });
      setErrors(formattedErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", result.data);
    setIsSubmitting(false);
  };

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      const fieldSchema =
        formSchema.shape[name as keyof typeof formSchema.shape];
      if (fieldSchema) {
        const result = fieldSchema.safeParse(value);
        if (result.success) {
          const { [name]: _, ...rest } = errors;
          setErrors(rest);
        }
      }
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Registration Form</CardTitle>
        <CardDescription>
          Showcase of all available input components
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit} errors={errors}>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <Form.Field name="fullName">
              <Form.Label htmlFor="fullName" required>
                Full Name
              </Form.Label>
              <Form.Control>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="email">
              <Form.Label htmlFor="email" required>
                Email Address
              </Form.Label>
              <Form.Control>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="password">
              <Form.Label htmlFor="password" required>
                Password
              </Form.Label>
              <Form.Control>
                <PasswordInput
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </Form.Control>
              <Form.Description>
                Must be at least 8 characters long
              </Form.Description>
              <Form.Message />
            </Form.Field>

            <Form.Field name="phone">
              <Form.Label htmlFor="phone" required>
                Phone Number
              </Form.Label>
              <Form.Control>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="website">
              <Form.Label htmlFor="website" required>
                Website
              </Form.Label>
              <Form.Control>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                />
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="country">
              <Form.Label htmlFor="country" required>
                Country
              </Form.Label>
              <Form.Control>
                <Select
                  value={formData.country}
                  onValueChange={(value) => handleChange("country", value)}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                  </SelectContent>
                </Select>
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="tags">
              <Form.Label htmlFor="tags" required>
                Tags
              </Form.Label>
              <Form.Control>
                <MultiInput
                  id="tags"
                  value={formData.tags}
                  onChange={(values) => handleChange("tags", values)}
                  placeholder="Add tags..."
                  max={5}
                />
              </Form.Control>
              <Form.Description>
                Press Enter to add tags (max 5)
              </Form.Description>
              <Form.Message />
            </Form.Field>

            <Form.Field name="languages">
              <Form.Label htmlFor="languages" required>
                Languages
              </Form.Label>
              <Form.Control>
                <MultiSelect
                  values={formData.languages}
                  onValuesChange={(values) => handleChange("languages", values)}
                >
                  <MultiSelectTrigger className="max-w-full" id="languages">
                    <MultiSelectValue placeholder="Select languages" />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectItem value="english">English</MultiSelectItem>
                    <MultiSelectItem value="spanish">Spanish</MultiSelectItem>
                    <MultiSelectItem value="french">French</MultiSelectItem>
                    <MultiSelectItem value="german">German</MultiSelectItem>
                    <MultiSelectItem value="chinese">Chinese</MultiSelectItem>
                  </MultiSelectContent>
                </MultiSelect>
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="experience">
              <Form.Label required>
                Years of Experience: {formData.experience}
              </Form.Label>
              <Form.Control>
                <Slider
                  value={formData.experience}
                  onChange={(value) => handleChange("experience", value)}
                  min={0}
                  max={20}
                  step={1}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="priceRange">
              <Form.Label required>
                Price Range: $\${formData.priceRange[0]} - $\${formData.priceRange[1]}
              </Form.Label>
              <Form.Control>
                <RangeSlider
                  value={formData.priceRange}
                  onChange={(value) => handleChange("priceRange", value)}
                  min={0}
                  max={100}
                  step={5}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="birthDate">
              <Form.Label htmlFor="birthDate" required>
                Birth Date
              </Form.Label>
              <Form.Control>
                <DatePicker
                  id="birthDate"
                  value={
                    formData.birthDate ? new Date(formData.birthDate) : null
                  }
                  onChange={(date) =>
                    handleChange(
                      "birthDate",
                      date?.toISOString().split("T")[0] || ""
                    )
                  }
                  placeholder="Select your birth date"
                />
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="availability">
              <Form.Label htmlFor="availability" required>
                Availability Period
              </Form.Label>
              <Form.Control>
                <DateRangePicker
                  id="availability"
                  value={formData.availability}
                  onChange={(range) => handleChange("availability", range)}
                  placeholder="Select date range"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="resume">
              <Form.Label htmlFor="resume" required>
                Resume
              </Form.Label>
              <Form.Control>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    handleChange("resume", e.target.files?.[0] || null)
                  }
                />
              </Form.Control>
              <Form.Description>Upload PDF or Word document</Form.Description>
            </Form.Field>

            <Form.Field name="profileImage">
              <Form.Label htmlFor="profileImage" required>
                Profile Image
              </Form.Label>
              <Form.Control>
                <ImageInput
                  id="profileImage"
                  onChange={(e) =>
                    handleChange("profileImage", e.target.files?.[0] || null)
                  }
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="gender">
              <Form.Label required>Gender</Form.Label>
              <Form.Control>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleChange("gender", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Form.Label htmlFor="male" className="!mb-0">
                      Male
                    </Form.Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Form.Label htmlFor="female" className="!mb-0">
                      Female
                    </Form.Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Form.Label htmlFor="other" className="!mb-0">
                      Other
                    </Form.Label>
                  </div>
                </RadioGroup>
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="bio">
              <Form.Label htmlFor="bio" required>
                Bio
              </Form.Label>
              <Form.Control>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself..."
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                />
              </Form.Control>
              <Form.Description>Minimum 10 characters</Form.Description>
              <Form.Message />
            </Form.Field>

            <Form.Field name="agreeTerms">
              <Form.Control>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={(checked) => handleChange("agreeTerms", checked)}
                  />
                  <Form.Label htmlFor="agreeTerms" required className="!mb-0">
                    I agree to the terms and conditions
                  </Form.Label>
                </div>
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="skills">
              <Form.Label required>Skills</Form.Label>
              <Form.Control>
                <CheckboxGroup
                  value={formData.skills}
                  onValueChange={(values) => handleChange("skills", values)}
                >
                  <CheckboxGroup.Item value="javascript" label="JavaScript" />
                  <CheckboxGroup.Item value="typescript" label="TypeScript" />
                  <CheckboxGroup.Item value="react" label="React" />
                  <CheckboxGroup.Item value="nodejs" label="Node.js" />
                </CheckboxGroup>
              </Form.Control>
              <Form.Message />
            </Form.Field>

            <Form.Field name="notifications">
              <Form.Control>
                <div className="flex  flex-col gap-2">
                  <Form.Label
                    htmlFor="notifications"
                    className="!mb-0"
                    required
                  >
                    Enable Notifications
                  </Form.Label>
                  <Switch
                    id="notifications"
                    checked={formData.notifications}
                    onCheckedChange={(checked) =>
                      handleChange("notifications", checked)
                    }
                  />
                </div>
              </Form.Control>
              <Form.Description>Receive email notifications</Form.Description>
              <Form.Message />
            </Form.Field>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full mt-6">
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}`;

export function CompleteFormExample() {
  return (
    <SnippetPreview title="Form Example" code={code}>
      <CompleteFormDemo />
    </SnippetPreview>
  );
}
