import {
  HoverImageLink,
  HoverImageLinkItem,
} from "@/components/animated/HoverImageLink";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const defaultCode = `import { HoverImageLink, HoverImageLinkItem } from "@/components/ui/HoverImageLink";

export default function DefaultExample() {
  return (
    <HoverImageLink>
      <HoverImageLinkItem
        heading="Projects"
        subheading="Explore our latest work"
        imageSrc="/imgs/projects.jpg"
        href="/projects"
      />
      <HoverImageLinkItem
        heading="Team"
        subheading="Meet the people behind the magic"
        imageSrc="/imgs/team.jpg"
        href="/team"
      />
      <HoverImageLinkItem
        heading="Case Studies"
        subheading="Real results from real clients"
        imageSrc="/imgs/case-studies.jpg"
        href="/case-studies"
      />
      <HoverImageLinkItem
        heading="Contact"
        subheading="Let's start a conversation"
        imageSrc="/imgs/contact.jpg"
        href="/contact"
      />
    </HoverImageLink>
  );
}`;

export function DefaultExample() {
  return (
    <SnippetPreview title="Default Example" code={defaultCode}>
      <div className="bg-background p-4 md:p-8 w-full">
        <HoverImageLink>
          <HoverImageLinkItem
            heading="Projects"
            subheading="Explore our latest work"
            imageSrc="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80"
            href="#"
          />
          <HoverImageLinkItem
            heading="Team"
            subheading="Meet the people behind the magic"
            imageSrc="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
            href="#"
          />
          <HoverImageLinkItem
            heading="Case Studies"
            subheading="Real results from real clients"
            imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
            href="#"
          />
          <HoverImageLinkItem
            heading="Contact"
            subheading="Let's start a conversation"
            imageSrc="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
            href="#"
          />
        </HoverImageLink>
      </div>
    </SnippetPreview>
  );
}
