"use client";
import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  JSX,
  useCallback,
  useEffect,
} from "react";
import {
  ChevronUp,
  ChevronDown,
  Search,
  Download,
  MoreVertical,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/custom/Button";
import { Checkbox } from "@/components/custom/Checkbox";
import { Input } from "./Input";

export interface Column<T extends Record<string, unknown>> {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  align?: "left" | "center" | "right";
  sticky?: boolean;
  tooltip?: string;
  className?: string;
}

export interface RowAction<T extends Record<string, unknown>> {
  label: string;
  onClick: (row: T, index: number) => void;
  icon?: React.ReactNode;
  color?: string;
  disabled?: (row: T) => boolean;
  tooltip?: string;
}

export interface SortState {
  column: string;
  direction: "asc" | "desc";
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface TableCallbacks<T extends Record<string, unknown>> {
  onSort?: (sorts: SortState[]) => void;
  onSearch?: (query: string) => void;
  onPageChange?: (pagination: PaginationState) => void;
  onRowSelect?: (selectedRows: T[], row: T, isSelected: boolean) => void;
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  onRowExpand?: (row: T, isExpanded: boolean) => void;
  onExport?: (type: "csv" | "json", data: T[]) => void;
}

const generateCheckboxId = (
  type: "select-all" | "row",
  identifier?: string | number
) => {
  return `table-checkbox-${type}${identifier ? `-${identifier}` : ""}`;
};

interface TableContextValue<T extends Record<string, unknown>> {
  data: T[];
  filteredData: T[];
  paginatedData: T[];
  columns: Column<T>[];
  selectedRows: Set<number>;
  expandedRows: Set<number>;
  sortStates: SortState[];
  searchQuery: string;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  error?: string;
  columnFilters: Record<string, string>;
  columnWidths: Record<string, number>;
  onSort: (columnKey: string) => void;
  onRowSelect: (rowIndex: number, row: T) => void;
  onSelectAll: () => void;
  onRowExpand: (rowIndex: number, row: T) => void;
  onSearch: (query: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onColumnFilter: (columnKey: string, value: string) => void;
  onColumnResize: (columnKey: string, width: number) => void;
  onExportData: (type: "csv" | "json") => void;
  options: {
    selectable?: boolean;
    expandable?: boolean;
    multiSort?: boolean;
    stickyHeader?: boolean;
    showPagination?: boolean;
    showSearch?: boolean;
    showExport?: boolean;
    columnResizable?: boolean;
    rowActions?: RowAction<T>[];
    searchPlaceholder?: string;
    emptyMessage?: string;
    pageSize?: number;
    serverSide?: boolean;
  };
  callbacks: TableCallbacks<T>;
}

const TableContext = createContext<TableContextValue<
  Record<string, unknown>
> | null>(null);

function useTable<T extends Record<string, unknown>>(): TableContextValue<T> {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Table components must be used within Table.Root");
  }
  return context as TableContextValue<T>;
}

const getNestedValue = (
  obj: Record<string, unknown>,
  path: string
): unknown => {
  return path.split(".").reduce((value: unknown, key: string) => {
    if (value && typeof value === "object" && key in value) {
      return (value as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

const highlightText = (text: string, searchQuery: string): React.ReactNode => {
  if (!searchQuery || !text) return text;
  const regex = new RegExp(`(${searchQuery})`, "gi");
  const parts = text.toString().split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-900 px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const exportToCSV = <T extends Record<string, unknown>>(
  data: T[],
  columns: Column<T>[],
  filename = "table-data.csv"
): void => {
  const headers = columns.map((col) => col.title);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      columns
        .map((col) => {
          const value = getNestedValue(row, col.key as string);
          return `"${value?.toString()?.replace(/"/g, '""') || ""}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};

const exportToJSON = <T extends Record<string, unknown>>(
  data: T[],
  filename = "table-data.json"
): void => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};

export interface TableRootProps<T extends Record<string, unknown>>
  extends React.ComponentProps<"div"> {
  data: T[];
  columns: Column<T>[];
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  error?: string;
  totalItems?: number;
  serverSide?: boolean;
  selectable?: boolean;
  expandable?: boolean;
  multiSort?: boolean;
  stickyHeader?: boolean;
  showPagination?: boolean;
  showSearch?: boolean;
  showExport?: boolean;
  columnResizable?: boolean;
  rowActions?: RowAction<T>[];
  searchPlaceholder?: string;
  emptyMessage?: string;
  pageSize?: number;
  onSort?: (sorts: SortState[]) => void;
  onSearch?: (query: string) => void;
  onPageChange?: (pagination: PaginationState) => void;
  onRowSelect?: (selectedRows: T[], row: T, isSelected: boolean) => void;
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  onRowExpand?: (row: T, isExpanded: boolean) => void;
  onExport?: (type: "csv" | "json", data: T[]) => void;
}

function TableRoot<T extends Record<string, unknown>>({
  data,
  columns,
  children,
  className,
  loading = false,
  error,
  totalItems,
  serverSide = false,
  selectable = false,
  expandable = false,
  multiSort = false,
  stickyHeader = false,
  showPagination = true,
  showSearch = true,
  showExport = false,
  columnResizable = false,
  rowActions = [],
  searchPlaceholder = "Search...",
  emptyMessage = "No data available",
  pageSize = 10,
  onSort,
  onSearch,
  onPageChange,
  onRowSelect,
  onRowClick,
  onRowDoubleClick,
  onRowExpand,
  onExport,
  ...props
}: TableRootProps<T>): JSX.Element {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [sortStates, setSortStates] = useState<SortState[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {}
  );
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  const callbacks: TableCallbacks<T> = {
    onSort,
    onSearch,
    onPageChange,
    onRowSelect,
    onRowClick,
    onRowDoubleClick,
    onRowExpand,
    onExport,
  };

  const filteredData = useMemo(() => {
    if (serverSide) return data;

    let filtered = [...data];

    if (searchQuery) {
      filtered = filtered.filter((row) => {
        return Object.values(row).some((value) =>
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    Object.entries(columnFilters).forEach(([columnKey, filterValue]) => {
      if (filterValue) {
        filtered = filtered.filter((row) => {
          const value = getNestedValue(row, columnKey);
          return value
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        });
      }
    });

    if (sortStates.length > 0) {
      filtered.sort((a, b) => {
        for (const { column, direction } of sortStates) {
          const aVal = getNestedValue(a, column);
          const bVal = getNestedValue(b, column);

          let comparison = 0;
          if (aVal === null || aVal === undefined) comparison = 1;
          else if (bVal === null || bVal === undefined) comparison = -1;
          else if (aVal < bVal) comparison = -1;
          else if (aVal > bVal) comparison = 1;

          if (comparison !== 0) {
            return direction === "asc" ? comparison : -comparison;
          }
        }
        return 0;
      });
    }

    return filtered;
  }, [data, searchQuery, sortStates, columnFilters, serverSide]);

  const totalPages = serverSide
    ? Math.ceil((totalItems || 0) / currentPageSize)
    : Math.ceil(filteredData.length / currentPageSize);

  const paginatedData = useMemo(() => {
    if (serverSide) return data;
    if (!showPagination) return filteredData;
    const startIndex = (currentPage - 1) * currentPageSize;
    return filteredData.slice(startIndex, startIndex + currentPageSize);
  }, [
    filteredData,
    currentPage,
    currentPageSize,
    showPagination,
    serverSide,
    data,
  ]);

  const handleSort = useCallback(
    (columnKey: string) => {
      setSortStates((prev) => {
        console.log("Previous sortStates:", prev);
        const existing = prev.find((s) => s.column === columnKey);
        let newSorts: SortState[];

        if (!existing) {
          const newSort = { column: columnKey, direction: "asc" as const };
          newSorts = multiSort ? [...prev, newSort] : [newSort];
        } else {
          if (existing.direction === "asc") {
            newSorts = prev.map((s) =>
              s.column === columnKey ? { ...s, direction: "desc" as const } : s
            );
          } else {
            newSorts = prev.filter((s) => s.column !== columnKey);
          }
        }
        console.log("New sortStates:", newSorts);

        return newSorts;
      });
    },
    [multiSort, onSort]
  );

  useEffect(() => {
    onSort?.(sortStates);
  }, [sortStates, onSort]);
  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setCurrentPage(1);
      onSearch?.(query);
    },
    [onSearch]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      const pagination: PaginationState = {
        page,
        pageSize: currentPageSize,
        total: serverSide ? totalItems || 0 : filteredData.length,
      };
      onPageChange?.(pagination);
    },
    [currentPageSize, totalItems, filteredData.length, serverSide, onPageChange]
  );

  const handlePageSizeChange = useCallback(
    (size: number) => {
      setCurrentPageSize(size);
      setCurrentPage(1);
      const pagination: PaginationState = {
        page: 1,
        pageSize: size,
        total: serverSide ? totalItems || 0 : filteredData.length,
      };
      onPageChange?.(pagination);
    },
    [totalItems, filteredData.length, serverSide, onPageChange]
  );

  const handleRowSelect = useCallback(
    (rowIndex: number, row: T) => {
      setSelectedRows((prev) => {
        const newSelected = new Set(prev);
        const actualIndex = showPagination
          ? (currentPage - 1) * currentPageSize + rowIndex
          : rowIndex;

        if (newSelected.has(actualIndex)) {
          newSelected.delete(actualIndex);
        } else {
          newSelected.add(actualIndex);
        }

        const selectedRowsData = Array.from(newSelected)
          .map((idx) => filteredData[idx])
          .filter(Boolean);

        onRowSelect?.(selectedRowsData, row, newSelected.has(actualIndex));
        return newSelected;
      });
    },
    [currentPage, currentPageSize, onRowSelect, filteredData, showPagination]
  );

  const handleSelectAll = useCallback(() => {
    const startIndex = showPagination ? (currentPage - 1) * currentPageSize : 0;
    const pageIndices = Array.from(
      { length: paginatedData.length },
      (_, i) => startIndex + i
    );

    setSelectedRows((prev) => {
      const newSelected = new Set(prev);
      const allPageSelected = pageIndices.every((idx) => newSelected.has(idx));

      if (allPageSelected) {
        pageIndices.forEach((idx) => newSelected.delete(idx));
      } else {
        pageIndices.forEach((idx) => newSelected.add(idx));
      }

      const selectedRowsData = Array.from(newSelected)
        .map((idx) => filteredData[idx])
        .filter(Boolean);

      if (selectedRowsData.length > 0) {
        onRowSelect?.(selectedRowsData, selectedRowsData[0], true);
      }

      return newSelected;
    });
  }, [
    currentPage,
    currentPageSize,
    paginatedData,
    showPagination,
    filteredData,
    onRowSelect,
  ]);

  const handleRowExpand = useCallback(
    (rowIndex: number, row: T) => {
      const actualIndex = showPagination
        ? (currentPage - 1) * currentPageSize + rowIndex
        : rowIndex;
      setExpandedRows((prev) => {
        const newExpanded = new Set(prev);
        const isExpanded = newExpanded.has(actualIndex);

        if (isExpanded) {
          newExpanded.delete(actualIndex);
        } else {
          newExpanded.add(actualIndex);
        }

        onRowExpand?.(row, !isExpanded);
        return newExpanded;
      });
    },
    [currentPage, currentPageSize, onRowExpand, showPagination]
  );

  const handleColumnFilter = useCallback((columnKey: string, value: string) => {
    setColumnFilters((prev) => ({ ...prev, [columnKey]: value }));
    setCurrentPage(1);
  }, []);

  const handleColumnResize = useCallback((columnKey: string, width: number) => {
    setColumnWidths((prev) => ({ ...prev, [columnKey]: width }));
  }, []);

  const handleExportData = useCallback(
    (type: "csv" | "json") => {
      if (onExport) {
        onExport(type, filteredData);
      } else {
        if (type === "csv") {
          exportToCSV(filteredData, columns);
        } else {
          exportToJSON(filteredData);
        }
      }
    },
    [onExport, filteredData, columns]
  );

  const contextValue: TableContextValue<T> = useMemo(
    () => ({
      data,
      filteredData,
      paginatedData,
      columns,
      selectedRows,
      expandedRows,
      sortStates,
      searchQuery,
      currentPage,
      pageSize: currentPageSize,
      totalPages,
      totalItems: serverSide ? totalItems || 0 : filteredData.length,
      isLoading: loading,
      error,
      columnFilters,
      columnWidths,
      onSort: handleSort,
      onRowSelect: handleRowSelect,
      onSelectAll: handleSelectAll,
      onRowExpand: handleRowExpand,
      onSearch: handleSearch,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
      onColumnFilter: handleColumnFilter,
      onColumnResize: handleColumnResize,
      onExportData: handleExportData,
      options: {
        selectable,
        expandable,
        multiSort,
        stickyHeader,
        showPagination,
        showSearch,
        showExport,
        columnResizable,
        rowActions,
        searchPlaceholder,
        emptyMessage,
        pageSize: currentPageSize,
        serverSide,
      },
      callbacks,
    }),
    [
      data,
      filteredData,
      paginatedData,
      columns,
      selectedRows,
      expandedRows,
      sortStates,
      searchQuery,
      currentPage,
      currentPageSize,
      totalPages,
      totalItems,
      loading,
      error,
      columnFilters,
      columnWidths,
      handleSort,
      handleRowSelect,
      handleSelectAll,
      handleRowExpand,
      handleSearch,
      handlePageChange,
      handlePageSizeChange,
      handleColumnFilter,
      handleColumnResize,
      handleExportData,
      selectable,
      expandable,
      multiSort,
      stickyHeader,
      showPagination,
      showSearch,
      showExport,
      columnResizable,
      rowActions,
      searchPlaceholder,
      emptyMessage,
      serverSide,
      callbacks,
    ]
  );
  return (
    <TableContext.Provider
      value={contextValue as TableContextValue<Record<string, unknown>>}
    >
      <div {...props} className={cn("w-full space-y-4", className)}>
        {children}
      </div>
    </TableContext.Provider>
  );
}

export interface TableToolbarProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  className?: string;
}

function TableToolbar({
  children,
  className,
  ...props
}: TableToolbarProps): JSX.Element {
  const { options, onSearch, onExportData, searchQuery } = useTable();

  return (
    <div
      {...props}
      className={cn("flex items-center justify-between gap-4", className)}
    >
      <div className="flex items-center gap-3">
        {options.showSearch && (
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder={options.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-80 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
              aria-label="Search table data"
            />
          </div>
        )}
        {children}
      </div>

      {options.showExport && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExportData("csv")}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExportData("json")}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            JSON
          </Button>
        </div>
      )}
    </div>
  );
}

export interface TableContainerProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

function TableContainer({
  children,
  className,
  ...props
}: TableContainerProps): JSX.Element {
  const { isLoading, error } = useTable();

  if (isLoading) {
    return (
      <div
        {...props}
        className={cn("flex items-center justify-center p-8", className)}
      >
        <div className="flex items-center gap-3">
          <Loader2 size={24} className="animate-spin text-primary" />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("text-center p-8 text-destructive", className)}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border border-border rounded-md overflow-hidden",
        className
      )}
    >
      <div
        className="overflow-auto max-h-screen
      [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent
      "
      >
        <table className="w-full " role="table">
          {children}
        </table>
      </div>
    </div>
  );
}

export interface TableHeaderProps extends React.ComponentProps<"thead"> {
  children: React.ReactNode;
  className?: string;
}

function TableHeader({
  children,
  className,
  ...props
}: TableHeaderProps): JSX.Element {
  const { options } = useTable();

  return (
    <thead
      {...props}
      className={cn(
        "bg-muted",
        options.stickyHeader && "sticky top-0 z-10",
        className
      )}
    >
      {children}
    </thead>
  );
}

export interface TableRowProps extends React.ComponentProps<"tr"> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

function TableRow({
  children,
  className,
  onClick,
  onDoubleClick,
  ...props
}: TableRowProps): JSX.Element {
  return (
    <tr
      {...props}
      className={cn(
        "border-b  border-border  transition-colors hover:bg-muted/50",
        className
      )}
      role="row"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </tr>
  );
}

export interface TableHeadProps<
  T extends Record<string, unknown> = Record<string, unknown>
> extends React.ComponentProps<"th"> {
  children: React.ReactNode;
  column?: Column<T>;
  className?: string;
  sortable?: boolean;
  filterable?: boolean;
}

function TableHead<T extends Record<string, unknown>>({
  children,
  column,
  className,
  sortable,
  filterable,
  ...props
}: TableHeadProps<T>): JSX.Element {
  const {
    sortStates,
    onSort,
    columnFilters,
    onColumnFilter,
    columnWidths,
    options,
  } = useTable();

  const handleSort = () => {
    if (column && (sortable || column.sortable)) {
      onSort(column.key as string);
    }
  };

  const handleFilter = (value: string) => {
    if (column) {
      onColumnFilter(column.key as string, value);
    }
  };

  const sortState = column
    ? sortStates.find((s) => s.column === column.key)
    : undefined;
  const filterValue = column ? columnFilters[column.key as string] || "" : "";
  const width = column
    ? columnWidths[column.key as string] || column.width
    : undefined;

  return (
    <th
      {...props}
      className={cn(
        "px-4 py-3 text-left font-semibold text-foreground",
        column?.align === "center" && "text-center",
        column?.align === "right" && "text-right",
        column?.sticky && "sticky left-0 z-20 bg-muted",
        className
      )}
      style={{
        width: width || "150px",
        minWidth: column?.minWidth || "100px",
        maxWidth: column?.maxWidth || "200px",
      }}
      role="columnheader"
      aria-sort={
        sortState?.direction === "asc"
          ? "ascending"
          : sortState?.direction === "desc"
          ? "descending"
          : "none"
      }
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {sortable || column?.sortable ? (
            <button
              onClick={handleSort}
              className="flex items-center gap-1 hover:text-primary transition-colors group"
              aria-label={`Sort by ${
                typeof children === "string" ? children : "column"
              }`}
            >
              <span>{children}</span>
              {sortState ? (
                sortState.direction === "asc" ? (
                  <ChevronUp size={20} className="text-primary" />
                ) : (
                  <ChevronDown size={20} className="text-primary" />
                )
              ) : (
                <ArrowUpDown
                  size={14}
                  className="opacity-40 group-hover:opacity-70 transition-opacity"
                />
              )}
            </button>
          ) : (
            <span>{children}</span>
          )}
        </div>
      </div>

      {(filterable || column?.filterable) && (
        <input
          type="text"
          placeholder={`Filter...`}
          value={filterValue}
          onChange={(e) => handleFilter(e.target.value)}
          className="mt-2 w-full px-2 py-1 text-xs border border-input rounded bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </th>
  );
}

export interface TableBodyProps extends React.ComponentProps<"tbody"> {
  children?: React.ReactNode;
  className?: string;
  renderExpandedRow?: (row: any, index: number) => React.ReactNode;
}

function TableBody<T extends Record<string, unknown>>({
  className,
  renderExpandedRow,
  ...props
}: TableBodyProps): JSX.Element {
  const { paginatedData, columns, options } = useTable<T>();

  if (paginatedData.length === 0) {
    return (
      <tbody className={cn("bg-background", className)}>
        <tr>
          <td colSpan={100} className="text-center py-12 text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Search size={24} className="text-muted-foreground" />
              </div>
              {options.emptyMessage}
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody
      {...props}
      className={cn("bg-background   divide-y divide-border", className)}
    >
      {paginatedData.map((row, index) => (
        <TableDataRow key={index} row={row} index={index}>
          {renderExpandedRow
            ? (row, index) => renderExpandedRow(row, index)
            : undefined}
        </TableDataRow>
      ))}
    </tbody>
  );
}

export interface TableCellProps extends React.ComponentProps<"td"> {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

function TableCell({
  children,
  className,
  align = "left",
  ...props
}: TableCellProps): JSX.Element {
  return (
    <td
      {...props}
      className={cn(
        "px-4 py-3 text-foreground [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent ",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
      role="cell"
      style={{
        maxWidth: "400px",

        overflow: "auto",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </td>
  );
}

export interface TableDataRowProps<T extends Record<string, unknown>>
  extends Omit<React.ComponentProps<"tr">, "children"> {
  row: T;
  index: number;
  children?: (row: T, index: number) => React.ReactNode;
  className?: string;
}

function TableDataRow<T extends Record<string, unknown>>({
  row,
  index,
  children,
  className,
  ...props
}: TableDataRowProps<T>): JSX.Element {
  const {
    columns,
    selectedRows,
    expandedRows,
    currentPage,
    pageSize,
    searchQuery,
    options,
    callbacks,
    onRowSelect,
    onRowExpand,
  } = useTable<T>();

  const actualIndex = options.showPagination
    ? (currentPage - 1) * pageSize + index
    : index;
  const isSelected = selectedRows.has(actualIndex);
  const isExpanded = expandedRows.has(actualIndex);

  const handleRowClick = () => {
    callbacks.onRowClick?.(row, index);
  };

  const handleRowDoubleClick = () => {
    callbacks.onRowDoubleClick?.(row, index);
  };

  const handleSelect = () => {
    onRowSelect(index, row);
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(
      "Expanding row:",
      row.name,
      "index:",
      index,
      "actualIndex:",
      actualIndex
    );
    onRowExpand(index, row);
  };

  return (
    <>
      <TableRow
        {...props}
        className={cn(
          "cursor-pointer transition-colors  ",
          isSelected && "bg-muted",
          className
        )}
        onClick={handleRowClick}
        onDoubleClick={handleRowDoubleClick}
      >
        {options.selectable && (
          <TableCell className="w-12">
            <Checkbox
              id={generateCheckboxId("row", actualIndex)}
              checked={isSelected}
              onChange={handleSelect}
            />
          </TableCell>
        )}

        {options.expandable && (
          <TableCell className="w-12">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExpand}
              className="p-1"
            >
              <ChevronRightIcon
                size={16}
                className={cn(
                  "transform transition-transform duration-200",
                  isExpanded && "rotate-90"
                )}
              />
            </Button>
          </TableCell>
        )}

        {columns.map((column) => {
          const cellValue = getNestedValue(row, column.key as string);
          const cellContent = column.render
            ? column.render(row, index)
            : searchQuery
            ? highlightText(cellValue?.toString() || "", searchQuery)
            : cellValue?.toString() || "";

          return (
            <TableCell
              key={`${column.key as string}-${index}`}
              align={column.align}
              className={column.className}
            >
              {cellContent}
            </TableCell>
          );
        })}

        {options.rowActions?.map((action, actionIndex) => (
          <TableCell key={actionIndex} align="left">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(row, index);
              }}
              disabled={action.disabled?.(row)}
              className="p-2"
              title={action.tooltip || action.label}
            >
              {action.icon || <MoreVertical size={14} />}
            </Button>
          </TableCell>
        ))}
      </TableRow>

      {options.expandable && isExpanded && children && (
        <tr>
          <td
            colSpan={
              columns.length +
              (options.selectable ? 1 : 0) +
              (options.expandable ? 1 : 0) +
              (options.rowActions?.length || 0)
            }
            className="px-4   py-4 bg-muted/50 border-t border-border"
            role="cell"
          >
            <div className=" transition-all duration-300 ease-in-out">
              {children(row, index)}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export interface TableSelectHeaderProps extends React.ComponentProps<"th"> {
  className?: string;
}

function TableSelectHeader({
  className,
  ...props
}: TableSelectHeaderProps): JSX.Element {
  const {
    paginatedData,
    selectedRows,
    currentPage,
    pageSize,
    options,
    onSelectAll,
  } = useTable();

  if (!options.selectable) return <></>;

  const startIndex = options.showPagination ? (currentPage - 1) * pageSize : 0;
  const pageIndices = Array.from(
    { length: paginatedData.length },
    (_, i) => startIndex + i
  );
  const allPageSelected =
    paginatedData.length > 0 &&
    pageIndices.every((idx) => selectedRows.has(idx));

  return (
    <TableHead {...props} className={cn("w-12", className)}>
      <Checkbox
        id={generateCheckboxId("select-all")}
        checked={allPageSelected}
        onChange={onSelectAll}
      />
    </TableHead>
  );
}

export interface TableExpandHeaderProps extends React.ComponentProps<"th"> {
  className?: string;
}

function TableExpandHeader({
  className,
  ...props
}: TableExpandHeaderProps): JSX.Element {
  const { options } = useTable();

  if (!options.expandable) return <></>;

  return (
    <TableHead {...props} className={cn("w-12", className)}>
      <span className="sr-only">Expand</span>
    </TableHead>
  );
}

export interface TableActionsHeaderProps extends React.ComponentProps<"th"> {
  className?: string;
  children?: React.ReactNode;
}

function TableActionsHeader({
  className,
  children,
  ...props
}: TableActionsHeaderProps): JSX.Element {
  const { options } = useTable();

  if (!options.rowActions?.length) return <></>;

  return (
    <>
      {options.rowActions.map((action, index) => (
        <TableHead
          {...props}
          key={index}
          className={cn("text-center w-full", className)}
        >
          {action.label}
        </TableHead>
      ))}
    </>
  );
}

export interface TablePaginationProps extends React.ComponentProps<"div"> {
  className?: string;
}

function TablePagination({
  className,
  ...props
}: TablePaginationProps): JSX.Element {
  const {
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    options,
    onPageChange,
    onPageSizeChange,
  } = useTable();

  if (!options.showPagination) {
    return (
      <div
        className={cn("flex items-center justify-between py-4 px-2", className)}
      >
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Showing all {totalItems} results</span>
          <div className="flex items-center gap-2">
            <label htmlFor="page-size-all" className="text-sm font-medium">
              Rows per page:
            </label>
            <select
              id="page-size-all"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-3 py-1.5 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
            >
              {[5, 10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          No pagination needed
        </div>
      </div>
    );
  }

  if (totalPages <= 1 && !options.showPagination) return <></>;

  const pageNumbers: number[] = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      {...props}
      className={cn(
        "flex items-center justify-between gap-4 py-4 px-2",
        className
      )}
    >
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results
        </span>
        <div className="flex items-center gap-2">
          <label htmlFor="page-size" className="text-sm font-medium">
            Rows per page:
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-3 py-1.5 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
          >
            {[5, 10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <ChevronsLeft size={16} />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </Button>

        {pageNumbers.map((pageNum) => (
          <Button
            key={pageNum}
            variant={currentPage === pageNum ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(pageNum)}
            aria-label={`Page ${pageNum}`}
            aria-current={currentPage === pageNum ? "page" : undefined}
          >
            {pageNum}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          <ChevronsRight size={16} />
        </Button>
      </div>
    </div>
  );
}

export const Table = {
  Root: TableRoot as typeof TableRoot,
  Toolbar: TableToolbar as typeof TableToolbar,
  Container: TableContainer as typeof TableContainer,
  Header: TableHeader as typeof TableHeader,
  Body: TableBody as typeof TableBody,
  Row: TableRow as typeof TableRow,
  Head: TableHead as typeof TableHead,
  Cell: TableCell as typeof TableCell,
  DataRow: TableDataRow as typeof TableDataRow,
  SelectHeader: TableSelectHeader as typeof TableSelectHeader,
  ExpandHeader: TableExpandHeader as typeof TableExpandHeader,
  ActionsHeader: TableActionsHeader as typeof TableActionsHeader,
  Pagination: TablePagination as typeof TablePagination,
};
export {
  TableRoot,
  TableToolbar,
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableDataRow,
  TableSelectHeader,
  TableExpandHeader,
  TableActionsHeader,
  TablePagination,
  useTable,
};
