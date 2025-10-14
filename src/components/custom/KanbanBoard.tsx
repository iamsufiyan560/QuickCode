"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface KanbanBoardContextValue {
  draggedCard: string | null;
  draggedFromColumn: string | null;
  setDraggedCard: (id: string | null) => void;
  setDraggedFromColumn: (id: string | null) => void;
  onCardMove?: (
    cardId: string,
    fromColumn: string,
    toColumn: string,
    newIndex: number
  ) => void;
}

const KanbanBoardContext = createContext<KanbanBoardContextValue | undefined>(
  undefined
);

function useKanbanBoard() {
  const context = useContext(KanbanBoardContext);
  if (!context) {
    throw new Error("KanbanBoard components must be used within KanbanBoard");
  }
  return context;
}

interface KanbanBoardProps {
  children: React.ReactNode;
  onCardMove?: (
    cardId: string,
    fromColumn: string,
    toColumn: string,
    newIndex: number
  ) => void;
  className?: string;
}

function KanbanBoardRoot({
  children,
  onCardMove,
  className,
}: KanbanBoardProps) {
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      if (!draggedCard || !containerRef.current) return;

      const container = containerRef.current;
      const scrollSpeed = 8;
      const edgeThreshold = 300;

      let scrollableParent = container.parentElement;
      while (scrollableParent) {
        const style = window.getComputedStyle(scrollableParent);
        const hasOverflow =
          style.overflowX === "auto" || style.overflowX === "scroll";
        const canScroll =
          scrollableParent.scrollWidth > scrollableParent.clientWidth;

        if (hasOverflow && canScroll) {
          break;
        }
        scrollableParent = scrollableParent.parentElement;
      }

      const targetElement = scrollableParent || container;
      const targetRect = targetElement.getBoundingClientRect();

      const distanceFromLeft = e.clientX - targetRect.left;
      const distanceFromRight = targetRect.right - e.clientX;

      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }

      const maxScrollLeft =
        targetElement.scrollWidth - targetElement.clientWidth;

      if (distanceFromLeft < edgeThreshold && targetElement.scrollLeft > 0) {
        const intensity = 1 - distanceFromLeft / edgeThreshold;
        const speed = Math.ceil(scrollSpeed * intensity);
        scrollIntervalRef.current = window.setInterval(() => {
          if (targetElement.scrollLeft <= 0) {
            if (scrollIntervalRef.current) {
              clearInterval(scrollIntervalRef.current);
              scrollIntervalRef.current = null;
            }
            return;
          }
          targetElement.scrollLeft = Math.max(
            0,
            targetElement.scrollLeft - speed
          );
        }, 16);
      } else if (
        distanceFromRight < edgeThreshold &&
        targetElement.scrollLeft < maxScrollLeft
      ) {
        const intensity = 1 - distanceFromRight / edgeThreshold;
        const speed = Math.ceil(scrollSpeed * intensity);
        scrollIntervalRef.current = window.setInterval(() => {
          if (targetElement.scrollLeft >= maxScrollLeft) {
            if (scrollIntervalRef.current) {
              clearInterval(scrollIntervalRef.current);
              scrollIntervalRef.current = null;
            }
            return;
          }
          targetElement.scrollLeft = Math.min(
            maxScrollLeft,
            targetElement.scrollLeft + speed
          );
        }, 16);
      }
    };

    const handleDragEnd = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };

    if (draggedCard) {
      document.addEventListener("dragover", handleDragOver);
      document.addEventListener("dragend", handleDragEnd);
      document.addEventListener("drop", handleDragEnd);
    }

    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("dragend", handleDragEnd);
      document.removeEventListener("drop", handleDragEnd);
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };
  }, [draggedCard]);

  return (
    <KanbanBoardContext.Provider
      value={{
        draggedCard,
        draggedFromColumn,
        setDraggedCard,
        setDraggedFromColumn,
        onCardMove,
      }}
    >
      <div
        ref={containerRef}
        className={cn(
          "flex p-4 gap-4 overflow-x-auto pb-4",
          "[&::-webkit-scrollbar]:h-2",
          "[&::-webkit-scrollbar-track]:bg-muted",
          "[&::-webkit-scrollbar-thumb]:bg-muted-foreground/20",
          "[&::-webkit-scrollbar-thumb]:rounded",
          "[&::-webkit-scrollbar-thumb]:hover:bg-muted-foreground/30",
          className
        )}
        role="region"
        aria-label="Kanban board"
      >
        {children}
      </div>
    </KanbanBoardContext.Provider>
  );
}

interface KanbanColumnProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

function KanbanColumn({
  id,
  title,
  children,
  className,
  headerClassName,
  bodyClassName,
}: KanbanColumnProps) {
  const {
    draggedCard,
    draggedFromColumn,
    setDraggedCard,
    setDraggedFromColumn,
    onCardMove,
  } = useKanbanBoard();
  const [isDragOver, setIsDragOver] = useState(false);
  const columnRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedCard) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (
      e.currentTarget === e.target ||
      !e.currentTarget.contains(e.relatedTarget as Node)
    ) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (!draggedCard || !draggedFromColumn) return;

    const draggedElement = document.querySelector(
      `[data-kanban-card="${draggedCard}"]`
    );
    if (!draggedElement) return;

    const cardElements = Array.from(
      columnRef.current?.querySelectorAll("[data-kanban-card]") || []
    );
    const dropIndex = cardElements.indexOf(draggedElement as Element);

    if (onCardMove) {
      onCardMove(
        draggedCard,
        draggedFromColumn,
        id,
        dropIndex >= 0 ? dropIndex : cardElements.length
      );
    }

    setDraggedCard(null);
    setDraggedFromColumn(null);
  };

  const childrenArray = React.Children.toArray(children);
  const cardCount = childrenArray.length;

  return (
    <section
      ref={columnRef}
      data-kanban-column={id}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "flex min-w-[320px] max-w-[320px] flex-col rounded-lg border border-border bg-muted/30  max-h-[95vh]",
        isDragOver && "ring-2 ring-primary",
        className
      )}
      aria-label={`${title || id} column`}
    >
      {title && (
        <header
          className={cn(
            "flex items-center justify-between border-b border-border px-4 py-3",
            headerClassName
          )}
        >
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
            {cardCount}
          </span>
        </header>
      )}
      <div
        className={cn(
          "flex-1 space-y-3 overflow-y-auto p-4",
          "[&::-webkit-scrollbar]:w-2",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:bg-muted-foreground/20",
          "[&::-webkit-scrollbar-thumb]:rounded",
          bodyClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

interface KanbanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  children: React.ReactNode;
  className?: string;
  showDragHandle?: boolean;
  draggable?: boolean;
}

function KanbanCard({
  id,
  children,
  className,
  showDragHandle = true,
  draggable = true,
  ...props
}: KanbanCardProps) {
  const { draggedCard, setDraggedCard, setDraggedFromColumn } =
    useKanbanBoard();
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    if (!draggable || !cardRef.current) return;

    const column = cardRef.current.closest("[data-kanban-column]");
    const columnId = column?.getAttribute("data-kanban-column");
    if (columnId) {
      setDraggedFromColumn(columnId);
    }

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);

    const original = cardRef.current;
    const clone = original.cloneNode(true) as HTMLElement;

    clone.style.position = "fixed";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    clone.style.width = `${original.offsetWidth}px`;
    clone.style.height = "auto";
    clone.style.margin = "0";
    clone.style.pointerEvents = "none";
    clone.style.transform = "rotate(2deg)";
    clone.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.25)";

    clone.classList.remove(
      "group",
      "transition-all",
      "hover:shadow-md",
      "hover:border-primary/50"
    );

    const dragHandle = clone.querySelector('[aria-hidden="true"]');
    if (dragHandle) {
      (dragHandle as HTMLElement).style.display = "none";
    }

    const contentWrapper = clone.querySelector("div");
    if (contentWrapper && showDragHandle) {
      contentWrapper.style.paddingLeft = "1rem";
    }

    document.body.appendChild(clone);

    const rect = original.getBoundingClientRect();
    e.dataTransfer.setDragImage(
      clone,
      e.clientX - rect.left,
      e.clientY - rect.top
    );

    requestAnimationFrame(() => {
      document.body.removeChild(clone);
      setIsDragging(true);
      setDraggedCard(id);
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedCard(null);
    setDraggedFromColumn(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedCard || draggedCard === id) return;

    const cardElement = cardRef.current;
    if (!cardElement) return;

    const rect = cardElement.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const isAfter = e.clientY > midpoint;

    const column = cardElement.closest("[data-kanban-column]");
    if (!column) return;

    const draggedElement = column.querySelector(
      `[data-kanban-card="${draggedCard}"]`
    );

    if (!draggedElement || draggedElement === cardElement) return;

    const allCards = Array.from(column.querySelectorAll("[data-kanban-card]"));
    const draggedIndex = allCards.indexOf(draggedElement as Element);
    const targetIndex = allCards.indexOf(cardElement);

    if (draggedIndex === -1 || targetIndex === -1) return;

    if (isAfter && draggedIndex < targetIndex) {
      cardElement.after(draggedElement);
    } else if (!isAfter && draggedIndex > targetIndex) {
      cardElement.before(draggedElement);
    }
  };

  return (
    <article
      ref={cardRef}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      data-kanban-card={id}
      className={cn(
        "group relative cursor-move rounded-lg border border-border bg-card p-4 shadow-sm transition-all",
        "hover:shadow-md hover:border-primary/50",
        isDragging && "opacity-40",
        !draggable && "cursor-default",
        className
      )}
      role="article"
      aria-label={`Card ${id}`}
      tabIndex={0}
      {...props}
    >
      {showDragHandle && draggable && (
        <div
          className="absolute left-2 top-2 cursor-grab text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        >
          <GripVertical className="h-4 w-4" />
        </div>
      )}
      <div className={cn(showDragHandle && draggable && "pl-6")}>
        {children}
      </div>
    </article>
  );
}

interface KanbanCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

function KanbanCardHeader({
  children,
  className,
  ...props
}: KanbanCardHeaderProps) {
  return (
    <div
      className={cn("mb-2 flex items-start justify-between gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface KanbanCardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

function KanbanCardTitle({
  children,
  className,
  ...props
}: KanbanCardTitleProps) {
  return (
    <h4
      className={cn("text-sm font-semibold text-foreground", className)}
      {...props}
    >
      {children}
    </h4>
  );
}

interface KanbanCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

function KanbanCardContent({
  children,
  className,
  ...props
}: KanbanCardContentProps) {
  return (
    <div className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
}

interface KanbanCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

function KanbanCardFooter({
  children,
  className,
  ...props
}: KanbanCardFooterProps) {
  return (
    <div className={cn("mt-3 flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}

const KanbanBoard = Object.assign(KanbanBoardRoot, {
  Column: Object.assign(KanbanColumn, {
    displayName: "KanbanBoard.Column",
  }),
  Card: Object.assign(KanbanCard, {
    Header: KanbanCardHeader,
    Title: KanbanCardTitle,
    Content: KanbanCardContent,
    Footer: KanbanCardFooter,
    displayName: "KanbanBoard.Card",
  }),
});

export { KanbanBoard };
