"use client";
import { Button } from "@/components/custom/Button";
import {
  Home,
  Users,
  Settings,
  BookOpen,
  FileText,
  HelpCircle,
  Search,
  Bell,
  Calendar,
  Mail,
  Archive,
  Star,
  Database,
} from "lucide-react";
import { Sidebar, useSidebar } from "@/components/custom/Sidebar";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultExample = () => {
  return (
    <SnippetPreview title="Default Sidebar" code={defaultSidebarCode}>
      <div className="h-[600px] w-full rounded-lg border border-input  overflow-hidden">
        <Sidebar>
          <Sidebar.Root>
            <Sidebar.Header>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  QC
                </div>
                <span className="font-semibold">QuickCode</span>
              </div>
            </Sidebar.Header>

            <Sidebar.Content>
              <Sidebar.Group>
                <Button variant="secondary" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Team
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Projects
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Messages
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendar
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Star className="mr-2 h-4 w-4" />
                  Favorites
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Database className="mr-2 h-4 w-4" />
                  Database
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  More Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Extra Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Final Settings
                </Button>
              </Sidebar.Group>
            </Sidebar.Content>

            <Sidebar.Footer>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold text-sm">
                  JD
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Developer</p>
                </div>
              </div>
            </Sidebar.Footer>
          </Sidebar.Root>

          <Sidebar.Main>
            <header className="flex h-14 items-center gap-4 px-6">
              <Sidebar.Mobile>
                <Sidebar.Content>
                  <Sidebar.Group>
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Team
                    </Button>
                  </Sidebar.Group>
                </Sidebar.Content>
              </Sidebar.Mobile>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </header>

            <main className="flex-1 overflow-y-auto p-6">
              <div className="rounded-lg bg-card p-6">
                <h2 className="text-xl font-semibold mb-4">Welcome</h2>
                <p className="text-muted-foreground">
                  Fixed sidebar on desktop, mobile overlay on smaller screens.
                </p>
              </div>
            </main>
          </Sidebar.Main>
        </Sidebar>
      </div>
    </SnippetPreview>
  );
};

function CollapsibleSidebarContent() {
  const { collapsed } = useSidebar();

  return (
    <>
      <Sidebar.Header>
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                DL
              </div>
              <span className="font-semibold">DevLib</span>
            </div>
          )}
          <Sidebar.Trigger />
        </div>
      </Sidebar.Header>

      <Sidebar.Content>
        <Sidebar.Group>
          <Button
            variant="ghost"
            className={`w-full ${
              collapsed ? "justify-center" : "justify-start"
            }`}
          >
            <Home className={`h-4 w-4 ${!collapsed ? "mr-2" : ""}`} />
            {!collapsed && "Home"}
          </Button>
          <Button
            variant="secondary"
            className={`w-full ${
              collapsed ? "justify-center" : "justify-start"
            }`}
          >
            <BookOpen className={`h-4 w-4 ${!collapsed ? "mr-2" : ""}`} />
            {!collapsed && "Library"}
          </Button>
          <Button
            variant="ghost"
            className={`w-full ${
              collapsed ? "justify-center" : "justify-start"
            }`}
          >
            <Users className={`h-4 w-4 ${!collapsed ? "mr-2" : ""}`} />
            {!collapsed && "Community"}
          </Button>
          <Button
            variant="ghost"
            className={`w-full ${
              collapsed ? "justify-center" : "justify-start"
            }`}
          >
            <HelpCircle className={`h-4 w-4 ${!collapsed ? "mr-2" : ""}`} />
            {!collapsed && "Help"}
          </Button>
        </Sidebar.Group>
      </Sidebar.Content>

      <Sidebar.Footer>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold text-sm">
            SM
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">Sarah Miller</p>
              <p className="text-xs text-muted-foreground">Developer</p>
            </div>
          )}
        </div>
      </Sidebar.Footer>
    </>
  );
}

export const CollapsibleExample = () => {
  return (
    <SnippetPreview title="Collapsible Sidebar" code={collapsibleSidebarCode}>
      <div className="h-[600px] w-full rounded-lg border border-input overflow-hidden">
        <Sidebar>
          <Sidebar.Root>
            <CollapsibleSidebarContent />
          </Sidebar.Root>

          <Sidebar.Main>
            <header className="flex h-14 items-center gap-4 px-6">
              <Sidebar.Mobile>
                <CollapsibleSidebarContent />
              </Sidebar.Mobile>
              <h1 className="text-lg font-semibold">Library</h1>
            </header>

            <main className="flex-1 overflow-y-auto p-6">
              <div className="rounded-lg bg-card p-6">
                <h2 className="text-xl font-semibold mb-2">
                  Collapsible Sidebar
                </h2>
                <p className="text-muted-foreground">
                  Click chevron to toggle width. Mobile uses custom overlay.
                </p>
              </div>
            </main>
          </Sidebar.Main>
        </Sidebar>
      </div>
    </SnippetPreview>
  );
};

const defaultSidebarCode = `"use client";
import { Button } from "@/components/ui/Button";
import {
  Home,
  Users,
  Settings,
  FileText,
  Mail,
  Calendar,
  Search,
  Bell,
  Archive,
  Star,
  Database,
} from "lucide-react";
import { Sidebar } from "@/components/ui/Sidebar";

export const DefaultExample = () => {
  return (
    <div className="h-[600px] w-full rounded-lg border border-input overflow-hidden">
      <Sidebar>
        <Sidebar.Root>
          <Sidebar.Header>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                QC
              </div>
              <span className="font-semibold">QuickCode</span>
            </div>
          </Sidebar.Header>

          <Sidebar.Content>
            <Sidebar.Group>
              <Button variant="secondary" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Team
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Projects
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Messages
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Star className="mr-2 h-4 w-4" />
                Favorites
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Database
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Sidebar.Group>
          </Sidebar.Content>

          <Sidebar.Footer>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold text-sm">
                JD
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Developer</p>
              </div>
            </div>
          </Sidebar.Footer>
        </Sidebar.Root>

        <Sidebar.Main>
          <header className="flex h-14 items-center gap-4 px-6">
            <Sidebar.Mobile>
              <Sidebar.Content>
                <Sidebar.Group>
                  <Button variant="ghost" className="w-full justify-start">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Team
                  </Button>
                </Sidebar.Group>
              </Sidebar.Content>
            </Sidebar.Mobile>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            <div className="rounded-lg bg-card p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome</h2>
              <p className="text-muted-foreground">
                Fixed sidebar on desktop, mobile overlay on smaller screens.
              </p>
            </div>
          </main>
        </Sidebar.Main>
      </Sidebar>
    </div>
  );
};`;

const collapsibleSidebarCode = `"use client";
import { Button } from "@/components/ui/Button";
import {
  Home,
  Users,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { Sidebar, useSidebar } from "@/components/ui/Sidebar";

function CollapsibleSidebarContent() {
  const { collapsed } = useSidebar();

  return (
    <>
      <Sidebar.Header>
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                DL
              </div>
              <span className="font-semibold">DevLib</span>
            </div>
          )}
          <Sidebar.Trigger />
        </div>
      </Sidebar.Header>

      <Sidebar.Content>
        <Sidebar.Group>
          <Button
            variant="ghost"
            className={\`w-full \${
              collapsed ? "justify-center" : "justify-start"
            }\`}
          >
            <Home className={\`h-4 w-4 \${!collapsed ? "mr-2" : ""}\`} />
            {!collapsed && "Home"}
          </Button>
          <Button
            variant="secondary"
            className={\`w-full \${
              collapsed ? "justify-center" : "justify-start"
            }\`}
          >
            <BookOpen className={\`h-4 w-4 \${!collapsed ? "mr-2" : ""}\`} />
            {!collapsed && "Library"}
          </Button>
          <Button
            variant="ghost"
            className={\`w-full \${
              collapsed ? "justify-center" : "justify-start"
            }\`}
          >
            <Users className={\`h-4 w-4 \${!collapsed ? "mr-2" : ""}\`} />
            {!collapsed && "Community"}
          </Button>
          <Button
            variant="ghost"
            className={\`w-full \${
              collapsed ? "justify-center" : "justify-start"
            }\`}
          >
            <HelpCircle className={\`h-4 w-4 \${!collapsed ? "mr-2" : ""}\`} />
            {!collapsed && "Help"}
          </Button>
        </Sidebar.Group>
      </Sidebar.Content>

      <Sidebar.Footer>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold text-sm">
            SM
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">Sarah Miller</p>
              <p className="text-xs text-muted-foreground">Developer</p>
            </div>
          )}
        </div>
      </Sidebar.Footer>
    </>
  );
}

export const CollapsibleExample = () => {
  return (
    <div className="h-[600px] w-full rounded-lg border border-input overflow-hidden">
      <Sidebar>
        <Sidebar.Root>
          <CollapsibleSidebarContent />
        </Sidebar.Root>

        <Sidebar.Main>
          <header className="flex h-14 items-center gap-4 px-6">
            <Sidebar.Mobile>
              <CollapsibleSidebarContent />
            </Sidebar.Mobile>
            <h1 className="text-lg font-semibold">Library</h1>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            <div className="rounded-lg bg-card p-6">
              <h2 className="text-xl font-semibold mb-2">
                Collapsible Sidebar
              </h2>
              <p className="text-muted-foreground">
                Click chevron to toggle width. Mobile uses custom overlay.
              </p>
            </div>
          </main>
        </Sidebar.Main>
      </Sidebar>
    </div>
  );
};`;
