"use client";

import React, { useState } from "react";
import { Calendar, MessageSquare, User } from "lucide-react";
import { KanbanBoard } from "@/components/custom/KanbanBoard";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  assignee: string;
  dueDate: string;
  comments: number;
  status: string;
}

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Design new landing page",
    description:
      "Create wireframes and mockups for the new product landing page",
    priority: "high",
    assignee: "Sarah Chen",
    dueDate: "2025-10-15",
    comments: 3,

    status: "todo",
  },
  {
    id: "task-2",
    title: "Update API documentation",
    description: "Add examples for new authentication endpoints",
    priority: "medium",
    assignee: "Mike Johnson",
    dueDate: "2025-10-12",
    comments: 1,
    status: "todo",
  },
  {
    id: "task-3",
    title: "Fix mobile navigation bug",
    description: "Menu not closing properly on iOS devices",
    priority: "urgent",
    assignee: "Alex Kumar",
    dueDate: "2025-10-08",
    comments: 5,
    status: "in-progress",
  },
  {
    id: "task-4",
    title: "Implement dark mode toggle",
    description: "Add theme switching functionality across all pages",
    priority: "low",
    assignee: "Emma Wilson",
    dueDate: "2025-10-20",
    comments: 2,
    status: "in-progress",
  },
  {
    id: "task-5",
    title: "Database migration",
    description: "Migrate user data to new PostgreSQL instance",
    priority: "high",
    assignee: "David Park",
    dueDate: "2025-10-10",
    comments: 7,
    status: "review",
  },
  {
    id: "task-6",
    title: "User onboarding flow",
    description: "Create interactive tutorial for new users",
    priority: "medium",
    assignee: "Lisa Anderson",
    dueDate: "2025-10-25",
    comments: 4,
    status: "done",
  },
  {
    id: "task-7",
    title: "Performance optimization",
    description: "Reduce initial page load time by 40%",
    priority: "high",
    assignee: "Tom Roberts",
    dueDate: "2025-10-18",
    comments: 6,

    status: "done",
  },
];

const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];

const priorityConfig = {
  low: {
    label: "Low",
    className: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  },
  medium: {
    label: "Medium",
    className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  },
  high: {
    label: "High",
    className: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  },
  urgent: {
    label: "Urgent",
    className: "bg-red-500/10 text-red-700 dark:text-red-400",
  },
};

export const ComprehensiveExample = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleCardMove = (
    cardId: string,
    fromColumn: string,
    toColumn: string
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === cardId ? { ...task, status: toColumn } : task
      )
    );
  };

  const getTasksByStatus = (status: string) =>
    tasks.filter((task) => task.status === status);

  const comprehensiveExampleCode = `
"use client";
import React, { useState } from "react";
import { Calendar, MessageSquare, Paperclip, User } from "lucide-react";
import { KanbanBoard } from "@/components/ui/KanbanBoard";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  assignee: string;
  dueDate: string;
  comments: number;
  status: string;
}

const initialTasks: Task[] = ${JSON.stringify(initialTasks, null, 2)};

const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];


const priorityConfig = {
  low: {
    label: "Low",
    className: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  },
  medium: {
    label: "Medium",
    className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  },
  high: {
    label: "High",
    className: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  },
  urgent: {
    label: "Urgent",
    className: "bg-red-500/10 text-red-700 dark:text-red-400",
  },
};


export const ComprehensiveExample = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

   const handleCardMove = (
    cardId: string,
    fromColumn: string,
    toColumn: string
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === cardId ? { ...task, status: toColumn } : task
      )
    );
  };

  const getTasksByStatus = (status: string) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="h-[600px]">
      <KanbanBoard onCardMove={handleCardMove}>
        {columns.map((column) => (
          <KanbanBoard.Column key={column.id} id={column.id} title={column.title}>
            {getTasksByStatus(column.id).map((task) => (
              <KanbanBoard.Card key={task.id} id={task.id}>
                <KanbanBoard.Card.Header>
                  <KanbanBoard.Card.Title>{task.title}</KanbanBoard.Card.Title>
                  <span
                    className={\`rounded-full px-2 py-0.5 text-xs font-medium \${priorityConfig[task.priority].className}\`}
                  >
                    {priorityConfig[task.priority].label}
                  </span>
                </KanbanBoard.Card.Header>
                <KanbanBoard.Card.Content>
                  <p className="line-clamp-2">{task.description}</p>
                </KanbanBoard.Card.Content>
                <KanbanBoard.Card.Footer>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{task.assignee}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{task.dueDate}</span>
                  </div>
                  <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
                    {task.comments > 0 && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{task.comments}</span>
                      </div>
                    )}
                    {task.attachments > 0 && (
                      <div className="flex items-center gap-1">
                        <Paperclip className="h-3 w-3" />
                        <span>{task.attachments}</span>
                      </div>
                    )}
                  </div>
                </KanbanBoard.Card.Footer>
              </KanbanBoard.Card>
            ))}
          </KanbanBoard.Column>
        ))}
      </KanbanBoard>
    </div>
  );
};
`;

  return (
    <SnippetPreview
      title="Full-Featured Kanban Board"
      code={comprehensiveExampleCode}
      className="items-start justify-start"
    >
      <div>
        <KanbanBoard onCardMove={handleCardMove}>
          {columns.map((column) => (
            <KanbanBoard.Column
              key={column.id}
              id={column.id}
              title={column.title}
            >
              {getTasksByStatus(column.id).map((task) => (
                <KanbanBoard.Card key={task.id} id={task.id}>
                  <KanbanBoard.Card.Header>
                    <KanbanBoard.Card.Title>
                      {task.title}
                    </KanbanBoard.Card.Title>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        priorityConfig[task.priority].className
                      }`}
                    >
                      {priorityConfig[task.priority].label}
                    </span>
                  </KanbanBoard.Card.Header>
                  <KanbanBoard.Card.Content>
                    <p className="line-clamp-2">{task.description}</p>
                  </KanbanBoard.Card.Content>
                  <KanbanBoard.Card.Footer>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{task.dueDate}</span>
                    </div>
                    <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
                      {task.comments > 0 && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{task.comments}</span>
                        </div>
                      )}
                    </div>
                  </KanbanBoard.Card.Footer>
                </KanbanBoard.Card>
              ))}
            </KanbanBoard.Column>
          ))}
        </KanbanBoard>
      </div>
    </SnippetPreview>
  );
};
