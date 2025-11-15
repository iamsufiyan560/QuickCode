import { Alert } from "@/components/ui/Alert";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { InfoIcon, StarIcon, ZapIcon } from "lucide-react";

const code = `import { InfoIcon, StarIcon, ZapIcon } from "lucide-react";
import { Alert } from "@/components/ui/Alert";

export default function AlertExample() {
  return (
   <div className="grid w-full max-w-xl items-start gap-4">
        <Alert>
          <StarIcon />
          <Alert.Title>Achievement unlocked!</Alert.Title>
          <Alert.Description>
            You've just completed your first task streak. Keep up the momentum
            and collect more badges.
          </Alert.Description>
        </Alert>

        <Alert>
          <InfoIcon />
           <Alert.Title>
            New update available! Please refresh the page to get the latest
          </Alert.Title>
        </Alert>
        <Alert variant="destructive">
          <ZapIcon />
          <Alert.Title>Connection lost</Alert.Title>
          <Alert.Description>
            <p>
              Your device is not connected to the server. Try the following:
            </p>
            <ul className="list-inside list-disc text-sm">
              <li>Check your Wi-Fi or mobile network</li>
              <li>Restart the app</li>
              <li>Contact support if the problem persists</li>
            </ul>
          </Alert.Description>
        </Alert>
      </div>
  );
}`;

export function DefaultExample() {
  return (
    <SnippetPreview title="Default Example" code={code}>
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert>
          <StarIcon />
          <Alert.Title>Achievement unlocked!</Alert.Title>
          <Alert.Description>
            You've just completed your first task streak. Keep up the momentum
            and collect more badges.
          </Alert.Description>
        </Alert>

        <Alert>
          <InfoIcon />
          <Alert.Title>
            New update available! Please refresh the page to get the latest
          </Alert.Title>
        </Alert>
        <Alert variant="destructive">
          <ZapIcon />
          <Alert.Title>Connection lost</Alert.Title>
          <Alert.Description>
            <p>
              Your device is not connected to the server. Try the following:
            </p>
            <ul className="list-inside list-disc text-sm">
              <li>Check your Wi-Fi or mobile network</li>
              <li>Restart the app</li>
              <li>Contact support if the problem persists</li>
            </ul>
          </Alert.Description>
        </Alert>
      </div>
    </SnippetPreview>
  );
}
