import { Mail, User, Bell } from "lucide-react";
import {
  Cell,
  CellMedia,
  CellContent,
  CellTitle,
  CellDescription,
  CellActions,
  CellGroup,
} from "@/components/ui/Cell";
import { Button } from "@/components/ui/Button";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const cellExamplesCode = `import { Mail, User, Bell } from "lucide-react"
import {
  Cell,
  CellMedia,
  CellContent,
  CellTitle,
  CellDescription,
  CellActions,
  CellGroup,
  
} from "@/components/ui/Cell"
import { Button } from "@/components/ui/button"

export function CellExamples() {
  return (
    <div className="flex flex-col gap-6">
        <CellGroup>
          <Cell>
            <CellContent>
              <CellTitle>Basic Cell</CellTitle>
              <CellDescription>Simple content layout.</CellDescription>
            </CellContent>
          </Cell>
        </CellGroup>

        <CellGroup>
          <Cell variant="outline">
            <CellContent>
              <CellTitle>With Action</CellTitle>
              <CellDescription>
                Includes button in actions slot.
              </CellDescription>
            </CellContent>
            <CellActions>
              <Button size="sm" variant="outline">
                Open
              </Button>
            </CellActions>
          </Cell>
        </CellGroup>

        <CellGroup>
          <Cell variant="outline">
            <CellMedia>
              <Mail className="size-5" />
            </CellMedia>
            <CellContent>
              <CellTitle>Unread Emails</CellTitle>
              <CellDescription>5 new messages</CellDescription>
            </CellContent>
          </Cell>
        </CellGroup>

        <CellGroup>
          <Cell size="sm" asChild>
            <a href="#">
              <CellMedia>
                <User className="size-4" />
              </CellMedia>
              <CellContent>
                <CellTitle>Profile</CellTitle>
                <CellDescription>Manage your account</CellDescription>
              </CellContent>
              <CellActions>
                <Bell className="size-4" />
              </CellActions>
            </a>
          </Cell>
        </CellGroup>
      </div>
  )
}
`;

export function CellExamples() {
  return (
    <SnippetPreview code={cellExamplesCode}>
      <div className="flex flex-col gap-6">
        <CellGroup>
          <Cell>
            <CellContent>
              <CellTitle>Basic Cell</CellTitle>
              <CellDescription>Simple content layout.</CellDescription>
            </CellContent>
          </Cell>
        </CellGroup>

        <CellGroup>
          <Cell variant="outline">
            <CellContent>
              <CellTitle>With Action</CellTitle>
              <CellDescription>
                Includes button in actions slot.
              </CellDescription>
            </CellContent>
            <CellActions>
              <Button size="sm" variant="outline">
                Open
              </Button>
            </CellActions>
          </Cell>
        </CellGroup>

        <CellGroup>
          <Cell variant="outline">
            <CellMedia>
              <Mail className="size-5" />
            </CellMedia>
            <CellContent>
              <CellTitle>Unread Emails</CellTitle>
              <CellDescription>5 new messages</CellDescription>
            </CellContent>
          </Cell>
        </CellGroup>

        <CellGroup>
          <Cell size="sm" asChild>
            <a href="#">
              <CellMedia>
                <User className="size-4" />
              </CellMedia>
              <CellContent>
                <CellTitle>Profile</CellTitle>
                <CellDescription>Manage your account</CellDescription>
              </CellContent>
              <CellActions>
                <Bell className="size-4" />
              </CellActions>
            </a>
          </Cell>
        </CellGroup>
      </div>
    </SnippetPreview>
  );
}
