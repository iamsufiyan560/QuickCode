import React from "react";
import { ScrollView } from "@/components/custom/ScrollView";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const defaultCode = `import { ScrollView } from '@/components/ui/ScrollView';

const names = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Brown',
  'Diana Prince',
  'Edward Norton',
  'Fiona Apple',
  'George Martin',
  'Hannah Montana',
  'Isaac Newton',
  'Julia Roberts',
  'Kevin Hart',
  'Laura Palmer',
  'Michael Jordan',
  'Nancy Drew',
  'Oscar Wilde',
  'Patricia Smith',
  'Quincy Jones',
  'Rachel Green',
  'Samuel Jackson',
  'Tina Turner',
];

export default function Example() {
  return (
    <ScrollView className="h-72 w-64 rounded-lg border border-input bg-card">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-semibold text-foreground">
          Team Members
        </h4>
        {names.map((name, index) => (
          <div key={index}>
            <div className="py-2 text-sm text-foreground hover:text-primary transition-colors">
              {name}
            </div>
            {index < names.length - 1 && (
              <div className="border-b border-border" />
            )}
          </div>
        ))}
      </div>
    </ScrollView>
  );
}`;

const horizontalCode = `import { ScrollView } from '@/components/ui/ScrollView';

const artworks = [
  {
    id: 1,
    title: 'Mountain Landscape',
    artist: 'Sarah Miller',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Ocean Sunset',
    artist: 'David Chen',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Forest Path',
    artist: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Desert Dunes',
    artist: 'Michael Brown',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'City Lights',
    artist: 'Lisa Anderson',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=300&h=400&fit=crop',
  },
];

export default function Example() {
  return (
    <ScrollView 
      orientation="horizontal" 
      className="w-full max-w-2xl rounded-lg border border-input bg-card"
    >
      <div className="flex gap-4 p-4">
        {artworks.map((artwork) => (
          <figure key={artwork.id} className="flex-shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="h-64 w-48 object-cover transition-transform hover:scale-105"
              />
            </div>
            <figcaption className="mt-2 w-48">
              <p className="text-sm font-medium text-foreground">
                {artwork.title}
              </p>
              <p className="text-xs text-muted-foreground">
                by {artwork.artist}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollView>
  );
}`;

const names = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Brown",
  "Diana Prince",
  "Edward Norton",
  "Fiona Apple",
  "George Martin",
  "Hannah Montana",
  "Isaac Newton",
  "Julia Roberts",
  "Kevin Hart",
  "Laura Palmer",
  "Michael Jordan",
  "Nancy Drew",
  "Oscar Wilde",
  "Patricia Smith",
  "Quincy Jones",
  "Rachel Green",
  "Samuel Jackson",
  "Tina Turner",
];

const artworks = [
  {
    id: 1,
    title: "Mountain Landscape",
    artist: "Sarah Miller",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Ocean Sunset",
    artist: "David Chen",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Forest Path",
    artist: "Emma Wilson",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Desert Dunes",
    artist: "Michael Brown",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&h=400&fit=crop",
  },
  {
    id: 5,
    title: "City Lights",
    artist: "Lisa Anderson",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=300&h=400&fit=crop",
  },
];

export const DefaultExample = () => {
  return (
    <SnippetPreview code={defaultCode}>
      <ScrollView className="h-72 w-64 rounded-lg border border-input bg-card">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-semibold text-foreground">
            Team Members
          </h4>
          {names.map((name, index) => (
            <div key={index}>
              <div className="py-2 text-sm text-foreground hover:text-primary transition-colors">
                {name}
              </div>
              {index < names.length - 1 && (
                <div className="border-b border-border" />
              )}
            </div>
          ))}
        </div>
      </ScrollView>
    </SnippetPreview>
  );
};

export const HorizontalExample = () => {
  return (
    <SnippetPreview code={horizontalCode}>
      <ScrollView
        orientation="horizontal"
        className="w-full max-w-2xl rounded-lg border border-input bg-card"
      >
        <div className="flex gap-4 p-4 ">
          {artworks.map((artwork) => (
            <figure key={artwork.id} className="flex-shrink-0">
              <div className="overflow-hidden rounded-md">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="h-64 w-48 object-cover transition-transform hover:scale-105"
                />
              </div>
              <figcaption className="mt-2 w-48">
                <p className="text-sm font-medium text-foreground">
                  {artwork.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  by {artwork.artist}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </ScrollView>
    </SnippetPreview>
  );
};
