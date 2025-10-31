"use client";

import React from "react";
import {
  Pagination,
  PaginationList,
  PaginationButton,
  PaginationPrev,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/custom/Pagination";

import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const PaginationBasicExample = () => {
  const paginationCode = `
import {
  Pagination,
  PaginationList,
  PaginationButton,
  PaginationPrev,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/Pagination";

export const PaginationBasicExample = () => {
  return (
    <Pagination>
      <PaginationList>
        <PaginationPrev />
        <PaginationButton>1</PaginationButton>
        <PaginationButton isActive>2</PaginationButton>
        <PaginationButton>3</PaginationButton>
        <PaginationEllipsis />
        <PaginationNext />
      </PaginationList>
    </Pagination>
  );
};
`;

  return (
    <SnippetPreview title="Basic Pagination" code={paginationCode}>
      <Pagination>
        <PaginationList>
          <PaginationPrev></PaginationPrev>
          <PaginationButton>1</PaginationButton>
          <PaginationEllipsis />

          <PaginationButton isActive>10</PaginationButton>
          <PaginationButton>11</PaginationButton>
          <PaginationButton>12</PaginationButton>
          <PaginationButton>13</PaginationButton>
          <PaginationButton>14</PaginationButton>

          <PaginationNext />
        </PaginationList>
      </Pagination>
    </SnippetPreview>
  );
};
