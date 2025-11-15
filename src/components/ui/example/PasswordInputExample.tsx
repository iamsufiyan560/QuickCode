import { PasswordInput } from "@/components/ui/PasswordInput";
import { Label } from "@/components/ui/Label";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const defaultCode = `import { PasswordInput } from "@/components/ui/PasswordInput";
import { Label } from "@/components/ui/Label";

export default function PasswordInputDemo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="password">Password</Label>
      <PasswordInput
        id="password"
        placeholder="Enter your password"
      />
    </div>
  );
}`;

export function DefaultExample() {
  return (
    <SnippetPreview title="Default Example" code={defaultCode}>
      <div className=" space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          defaultValue="password"
          id="password"
          placeholder="Enter your password"
        />
      </div>
    </SnippetPreview>
  );
}
