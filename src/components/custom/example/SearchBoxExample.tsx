"use client";

import React from "react";
import { SearchBox } from "@/components/custom/SearchBox";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultSearchBoxExample = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);

  const mockProducts = [
    "iPhone 15 Pro",
    "MacBook Air M2",
    "AirPods Pro",
    "iPad Mini",
    "Apple Watch Series 9",
    "Magic Keyboard",
    "HomePod Mini",
    "Mac Studio",
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(false);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const filtered = mockProducts.filter((product) =>
      product.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filtered);
    setLoading(false);
    setHasSearched(true);
  };

  const code = `import { SearchBox } from "@/components/ui/SearchBox";

export const DefaultSearchBoxExample = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);

  const mockProducts = [
    "iPhone 15 Pro",
    "MacBook Air M2",
    "AirPods Pro",
    "iPad Mini",
    "Apple Watch Series 9",
    "Magic Keyboard",
    "HomePod Mini",
    "Mac Studio",
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(false);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const filtered = mockProducts.filter((product) =>
      product.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filtered);
    setLoading(false);
    setHasSearched(true);
  };

  return (
    <div className="space-y-4">
      <SearchBox
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        loading={loading}
        placeholder="Search products..."
      />

      {query && results.length > 0 && (
        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-sm font-medium text-foreground mb-2">
            Results ({results.length})
          </p>
          <ul className="space-y-2">
            {results.map((product, index) => (
              <li
                key={index}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {product}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasSearched && !loading && results.length === 0 && (
        <p className="text-sm text-muted-foreground">No results found</p>
      )}
    </div>
  );
};`;

  return (
    <SnippetPreview
      className="items-start"
      title="Search with Results"
      code={code}
    >
      <div className="space-y-4">
        <SearchBox
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          loading={loading}
          placeholder="Search products..."
        />

        {query && results.length > 0 && (
          <div className="rounded-md border border-border bg-card p-4">
            <p className="text-sm font-medium text-foreground mb-2">
              Results ({results.length})
            </p>
            <ul className="space-y-2">
              {results.map((product, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {product}
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasSearched && !loading && results.length === 0 && (
          <p className="text-sm text-muted-foreground">No results found</p>
        )}
      </div>
    </SnippetPreview>
  );
};
