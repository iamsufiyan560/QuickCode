import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineDescription,
  TimelineTitle,
} from "@/components/custom/Timeline";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Check, Clock, Circle, Package } from "lucide-react";

const defaultCode = `import { Timeline, TimelineItem, TimelineTitle, TimelineDescription } from "@/components/custom/Timeline";
import { Check, Clock, Circle } from "lucide-react";

export default function OrderTimeline() {
  return (
      <Timeline active={2}>
        <TimelineItem
          bullet={<Check className="h-4 w-4 text-white" />}
          color="bg-yellow-500"
        >
          <TimelineTitle>Order Placed</TimelineTitle>
          <TimelineDescription>
            Your order has been confirmed and is being prepared
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">2 hours ago</p>
        </TimelineItem>

        <TimelineItem
          bullet={<Check className="h-4 w-4 text-white" />}
          color="bg-yellow-500"
        >
          <TimelineTitle>Processing</TimelineTitle>
          <TimelineDescription>
            Your items are being picked and packed
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">1 hour ago</p>
        </TimelineItem>

        <TimelineItem
          bullet={<Clock className="h-4 w-4 text-white" />}
          variant="dashed"
          color="bg-yellow-500"
        >
          <TimelineTitle>Shipped</TimelineTitle>
          <TimelineDescription>
            Package is on its way to your location
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">In progress</p>
        </TimelineItem>

        <TimelineItem
          bullet={<Circle className="h-4 w-4 text-muted-foreground" />}
          lineVariant="dotted"
        >
          <TimelineTitle>Delivered</TimelineTitle>
          <TimelineDescription>
            Package will be delivered to your address
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">
            Estimated: Tomorrow
          </p>
        </TimelineItem>
      </Timeline>
  );
}`;

export function DefaultExample() {
  return (
    <SnippetPreview title="Default Timeline" code={defaultCode}>
      <Timeline active={2}>
        <TimelineItem
          bullet={<Check className="h-4 w-4 text-white" />}
          color="bg-yellow-500"
        >
          <TimelineTitle>Order Placed</TimelineTitle>
          <TimelineDescription>
            Your order has been confirmed and is being prepared
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">2 hours ago</p>
        </TimelineItem>

        <TimelineItem
          bullet={<Check className="h-4 w-4 text-white" />}
          color="bg-yellow-500"
        >
          <TimelineTitle>Processing</TimelineTitle>
          <TimelineDescription>
            Your items are being picked and packed
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">1 hour ago</p>
        </TimelineItem>

        <TimelineItem
          bullet={<Clock className="h-4 w-4 text-white" />}
          variant="dashed"
          color="bg-yellow-500"
        >
          <TimelineTitle>Shipped</TimelineTitle>
          <TimelineDescription>
            Package is on its way to your location
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">In progress</p>
        </TimelineItem>

        <TimelineItem
          bullet={<Circle className="h-4 w-4 text-muted-foreground" />}
          lineVariant="dotted"
        >
          <TimelineTitle>Delivered</TimelineTitle>
          <TimelineDescription>
            Package will be delivered to your address
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">
            Estimated: Tomorrow
          </p>
        </TimelineItem>
      </Timeline>
    </SnippetPreview>
  );
}

const gitCode = `import { Timeline, TimelineItem, TimelineTitle, TimelineDescription } from "@/components/custom/Timeline";
import { Package, Clock, Check } from "lucide-react";

export default function GitTimeline() {
  return (
    <Timeline active={0} dotStyle="outline">
        <TimelineItem variant="dashed">
          <TimelineTitle>Commit Created</TimelineTitle>
          <TimelineDescription>
            You have created a new commit locally
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">Just now</p>
        </TimelineItem>

        <TimelineItem>
          <TimelineTitle>Pushed</TimelineTitle>
          <TimelineDescription>
            Commit has been pushed to the remote repository
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">5 minutes ago</p>
        </TimelineItem>

        <TimelineItem>
          <TimelineTitle>Merged</TimelineTitle>
          <TimelineDescription>
            Your branch has been merged successfully
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">Completed</p>
        </TimelineItem>
      </Timeline>
  );
}`;

export function GitExample() {
  return (
    <SnippetPreview title="Git Timeline" code={gitCode}>
      <Timeline active={0} dotStyle="outline">
        <TimelineItem variant="dashed">
          <TimelineTitle>Commit Created</TimelineTitle>
          <TimelineDescription>
            You have created a new commit locally
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">Just now</p>
        </TimelineItem>

        <TimelineItem>
          <TimelineTitle>Pushed</TimelineTitle>
          <TimelineDescription>
            Commit has been pushed to the remote repository
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">5 minutes ago</p>
        </TimelineItem>

        <TimelineItem>
          <TimelineTitle>Merged</TimelineTitle>
          <TimelineDescription>
            Your branch has been merged successfully
          </TimelineDescription>
          <p className="mt-1 text-xs text-muted-foreground">Completed</p>
        </TimelineItem>
      </Timeline>
    </SnippetPreview>
  );
}
