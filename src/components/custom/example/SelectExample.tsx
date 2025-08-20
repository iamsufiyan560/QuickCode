"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/custom/Select";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultSelectExample = () => {
  const defaultSelectCode = `
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export const DefaultSelectExample = () => {
  return (
    <Select defaultValue="united-states">
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="united-states">United States</SelectItem>
          <SelectItem value="canada">Canada</SelectItem>
          <SelectItem value="mexico">Mexico</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="united-kingdom">United Kingdom</SelectItem>
          <SelectItem value="germany">Germany</SelectItem>
          <SelectItem value="france">France</SelectItem>
          <SelectItem value="italy">Italy</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="japan">Japan</SelectItem>
          <SelectItem value="south-korea">South Korea</SelectItem>
          <SelectItem value="singapore">Singapore</SelectItem>
          <SelectItem value="india">India</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
`;

  return (
    <SnippetPreview title="Default Select" code={defaultSelectCode}>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="united-states">United States</SelectItem>
            <SelectItem value="canada">Canada</SelectItem>
            <SelectItem value="mexico">Mexico</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="united-kingdom">United Kingdom</SelectItem>
            <SelectItem value="germany">Germany</SelectItem>
            <SelectItem value="france">France</SelectItem>
            <SelectItem value="italy">Italy</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="japan">Japan</SelectItem>
            <SelectItem value="south-korea">South Korea</SelectItem>
            <SelectItem value="singapore">Singapore</SelectItem>
            <SelectItem value="india">India</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </SnippetPreview>
  );
};
