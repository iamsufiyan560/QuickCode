"use client";

import React from "react";
import { Filter } from "@/components/ui/Filter";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { RadioGroupItem } from "@/components/ui/RadioGroup";
import { SelectItem } from "@/components/ui/Select";
import { MultiSelectItem } from "@/components/ui/MultiSelect";
import { Label } from "@/components/ui/Label";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const ComprehensiveFilterExample = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [inStock, setInStock] = React.useState(false);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState("");
  const [freeShipping, setFreeShipping] = React.useState(false);
  const [brand, setBrand] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [discount, setDiscount] = React.useState(0);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 5000,
  ]);
  const [releaseDate, setReleaseDate] = React.useState<Date | null>(null);

  interface DateRange {
    start: Date | null;
    end: Date | null;
  }

  const [promotionPeriod, setPromotionPeriod] = React.useState<DateRange>({
    start: null,
    end: null,
  });
  const handleClear = () => {
    setSearchQuery("");
    setMinPrice("");
    setDescription("");
    setInStock(false);
    setCategories([]);
    setSortBy("");
    setFreeShipping(false);
    setBrand("");
    setTags([]);
    setKeywords([]);
    setDiscount(0);
    setPriceRange([0, 5000]);
    setReleaseDate(null);
    setPromotionPeriod({ start: null, end: null });
  };

  const handleApply = () => {
    const filterData = {
      search: searchQuery,
      minPrice,
      description,
      inStock,
      categories,
      sortBy,
      freeShipping,
      brand,
      tags,
      keywords,
      discount,
      priceRange,
      releaseDate,
      promotionPeriod,
    };
  };

  const code = `import { Filter } from "@/components/ui/Filter";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { RadioGroupItem } from "@/components/ui/RadioGroup";
import { SelectItem } from "@/components/ui/Select";
import { MultiSelectItem } from "@/components/ui/MultiSelect";
import { Label } from "@/components/ui/Label";

export const ComprehensiveFilterExample = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [inStock, setInStock] = React.useState(false);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState("");
  const [freeShipping, setFreeShipping] = React.useState(false);
  const [brand, setBrand] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [discount, setDiscount] = React.useState(0);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 5000]);
  const [releaseDate, setReleaseDate] = React.useState<Date | null>(null);
   interface DateRange {
    start: Date | null;
    end: Date | null;
  }

  const [promotionPeriod, setPromotionPeriod] = React.useState<DateRange>({
    start: null,
    end: null,
  });

  const handleClear = () => {
    setSearchQuery("");
    setMinPrice("");
    setDescription("");
    setInStock(false);
    setCategories([]);
    setSortBy("");
    setFreeShipping(false);
    setBrand("");
    setTags([]);
    setKeywords([]);
    setDiscount(0);
    setPriceRange([0, 5000]);
    setReleaseDate(null);
    setPromotionPeriod({ start: null, end: null });
  };

  const handleApply = () => {
    const filterData = {
      search: searchQuery,
      minPrice,
      description,
      inStock,
      categories,
      sortBy,
      freeShipping,
      brand,
      tags,
      keywords,
      discount,
      priceRange,
      releaseDate,
      promotionPeriod,
    };
    console.log("Applied filters:", filterData);
  };

  return (
     <div className="w-full max-w-2xl mx-auto p-6 border border-border rounded-lg bg-card">
        <Filter onClear={handleClear} onApply={handleApply}>
          <Filter.Header
            title="Product Filters"
            description="All filter types in one place"
          />

          <Filter.Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search products..."
          />

          <Filter.Separator />

          <Filter.Group title="Price Filters" collapsible>
            <Filter.Input
              label="Minimum Price"
              value={minPrice}
              onChange={setMinPrice}
              placeholder="Enter min price"
              type="number"
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Description">
            <Filter.Textarea
              label="Product Description"
              value={description}
              onChange={setDescription}
              placeholder="Enter description keywords..."
              rows={3}
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Stock Status">
            <Filter.Checkbox
              id="in-stock"
              checked={inStock}
              onChange={setInStock}
              label="In Stock Only"
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Categories" collapsible>
            <Filter.CheckboxGroup
              value={categories}
              onValueChange={setCategories}
            >
              <CheckboxGroup.Item value="Electronics" label="Electronics" />
              <CheckboxGroup.Item value="Clothing" label="Clothing" />
              <CheckboxGroup.Item value="Home & Garden" label="Home & Garden" />
              <CheckboxGroup.Item value="Sports" label="Sports" />
            </Filter.CheckboxGroup>
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Sort By">
            <Filter.RadioGroup value={sortBy} onValueChange={setSortBy}>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="price-low" id="sort-1" />
                <Label htmlFor="sort-1">Price: Low to High</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="price-high" id="sort-2" />
                <Label htmlFor="sort-2">Price: High to Low</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="newest" id="sort-3" />
                <Label htmlFor="sort-3">Newest First</Label>
              </div>
            </Filter.RadioGroup>
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Shipping Options">
            <Filter.Switch
              id="free-shipping"
              checked={freeShipping}
              onCheckedChange={setFreeShipping}
              label="Free Shipping"
              description="Show only items with free shipping"
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Brand">
            <Filter.Select
              value={brand}
              onValueChange={setBrand}
              placeholder="Select brand"
            >
              <SelectItem value="Apple">Apple</SelectItem>
              <SelectItem value="Samsung">Samsung</SelectItem>
              <SelectItem value="Sony">Sony</SelectItem>
              <SelectItem value="Nike">Nike</SelectItem>
            </Filter.Select>
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Tags">
            <Filter.MultiSelect
              values={tags}
              onValuesChange={setTags}
              placeholder="Select tags"
            >
              <MultiSelectItem value="New Arrival">New Arrival</MultiSelectItem>
              <MultiSelectItem value="Best Seller">Best Seller</MultiSelectItem>
              <MultiSelectItem value="Trending">Trending</MultiSelectItem>
              <MultiSelectItem value="Sale">Sale</MultiSelectItem>
            </Filter.MultiSelect>
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Keywords">
            <Filter.MultiInput
              label="Search Keywords"
              value={keywords}
              onChange={setKeywords}
              placeholder="Add keywords..."
              max={10}
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Discount">
            <Filter.Slider
              label="Minimum Discount"
              defaultValue={0}
              value={discount}
              onChange={setDiscount}
              min={0}
              max={100}
              step={5}
               formatValue={(v) => \`\${v}%\`}
         
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Price Range">
            <Filter.Range
              label="Minimum Range"
              defaultValue={[0, 5000]}
              value={priceRange}
              onChange={setPriceRange}
              min={0}
              max={5000}
              step={100}
              formatValue={(v) => \`\${v}%\`}
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Release Date">
            <Filter.Date
              label="After Date"
              value={releaseDate}
              onChange={setReleaseDate}
              placeholder="Select release date"
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Promotion Period">
            <Filter.DateRange
              label="Promotion Dates"
              value={promotionPeriod}
              onChange={setPromotionPeriod}
              placeholder="Select date range"
            />
          </Filter.Group>

          <Filter.Actions />
        </Filter>
      </div>
  );
};`;

  return (
    <SnippetPreview title="Complete Filter with All Components" code={code}>
      <div className="w-full max-w-2xl mx-auto p-6 border border-border rounded-lg bg-card">
        <Filter onClear={handleClear} onApply={handleApply}>
          <Filter.Header
            title="Product Filters"
            description="All filter types in one place"
          />

          <Filter.Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search products..."
          />

          <Filter.Separator />

          <Filter.Group title="Price Filters" collapsible>
            <Filter.Input
              label="Minimum Price"
              value={minPrice}
              onChange={setMinPrice}
              placeholder="Enter min price"
              type="number"
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Description">
            <Filter.Textarea
              label="Product Description"
              value={description}
              onChange={setDescription}
              placeholder="Enter description keywords..."
              rows={3}
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Stock Status">
            <Filter.Checkbox
              id="in-stock"
              checked={inStock}
              onChange={setInStock}
              label="In Stock Only"
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Categories" collapsible>
            <Filter.CheckboxGroup
              value={categories}
              onValueChange={setCategories}
            >
              <CheckboxGroup.Item value="Electronics" label="Electronics" />
              <CheckboxGroup.Item value="Clothing" label="Clothing" />
              <CheckboxGroup.Item value="Home & Garden" label="Home & Garden" />
              <CheckboxGroup.Item value="Sports" label="Sports" />
            </Filter.CheckboxGroup>
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Sort By">
            <Filter.RadioGroup value={sortBy} onValueChange={setSortBy}>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="price-low" id="sort-1" />
                <Label htmlFor="sort-1">Price: Low to High</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="price-high" id="sort-2" />
                <Label htmlFor="sort-2">Price: High to Low</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="newest" id="sort-3" />
                <Label htmlFor="sort-3">Newest First</Label>
              </div>
            </Filter.RadioGroup>
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Shipping Options">
            <Filter.Switch
              id="free-shipping"
              checked={freeShipping}
              onCheckedChange={setFreeShipping}
              label="Free Shipping"
              description="Show only items with free shipping"
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Brand">
            <Filter.Select
              value={brand}
              onValueChange={setBrand}
              placeholder="Select brand"
            >
              <SelectItem value="Apple">Apple</SelectItem>
              <SelectItem value="Samsung">Samsung</SelectItem>
              <SelectItem value="Sony">Sony</SelectItem>
              <SelectItem value="Nike">Nike</SelectItem>
            </Filter.Select>
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Tags">
            <Filter.MultiSelect
              values={tags}
              onValuesChange={setTags}
              placeholder="Select tags"
            >
              <MultiSelectItem value="New Arrival">New Arrival</MultiSelectItem>
              <MultiSelectItem value="Best Seller">Best Seller</MultiSelectItem>
              <MultiSelectItem value="Trending">Trending</MultiSelectItem>
              <MultiSelectItem value="Sale">Sale</MultiSelectItem>
            </Filter.MultiSelect>
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Keywords">
            <Filter.MultiInput
              label="Search Keywords"
              value={keywords}
              onChange={setKeywords}
              placeholder="Add keywords..."
              max={10}
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Discount">
            <Filter.Slider
              label="Minimum Discount"
              defaultValue={0}
              value={discount}
              onChange={setDiscount}
              min={0}
              max={100}
              step={5}
              formatValue={(v) => `${v}%`}
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Price Range">
            <Filter.Range
              label="Minimum Range"
              defaultValue={[0, 5000]}
              value={priceRange}
              onChange={setPriceRange}
              min={0}
              max={5000}
              step={100}
              formatValue={(v) => `$${v}`}
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Release Date">
            <Filter.Date
              label="After Date"
              value={releaseDate}
              onChange={setReleaseDate}
              placeholder="Select release date"
            />
          </Filter.Group>

          <Filter.Separator />

          <Filter.Group title="Promotion Period">
            <Filter.DateRange
              label="Promotion Dates"
              value={promotionPeriod}
              onChange={setPromotionPeriod}
              placeholder="Select date range"
            />
          </Filter.Group>

          <Filter.Actions />
        </Filter>
      </div>
    </SnippetPreview>
  );
};
