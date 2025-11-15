"use client";

import React from "react";
import { Table, Column, RowAction } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Edit, Trash2, Eye, Plus } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  status: "Active" | "Inactive";
  category?: string;
  stock?: number;
  description?: string;
  [key: string]: unknown;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department?: string;
  phone?: string;
  location?: string;
  joinDate?: string;
  [key: string]: unknown;
}

const productData: Product[] = [
  {
    id: 1,
    name: "iPhone 15",
    price: 999,
    status: "Active",
    category: "Electronics",
    stock: 50,
    description: "Latest smartphone with advanced camera system",
  },
  {
    id: 2,
    name: "MacBook Air",
    price: 1299,
    status: "Active",
    category: "Electronics",
    stock: 25,
    description: "Lightweight laptop perfect for professionals",
  },
  {
    id: 3,
    name: "Nike Air Max",
    price: 120,
    status: "Active",
    category: "Footwear",
    stock: 100,
    description: "Comfortable running shoes for daily use",
  },
  {
    id: 4,
    name: "Samsung TV",
    price: 799,
    status: "Inactive",
    category: "Electronics",
    stock: 15,
    description: "55-inch 4K Smart TV with HDR support",
  },
  {
    id: 5,
    name: "Adidas Hoodie",
    price: 80,
    status: "Active",
    category: "Clothing",
    stock: 75,
    description: "Comfortable cotton blend hoodie",
  },
  {
    id: 6,
    name: "Sony Headphones",
    price: 299,
    status: "Active",
    category: "Electronics",
    stock: 40,
    description: "Noise-cancelling wireless headphones",
  },
  {
    id: 7,
    name: "Levi's Jeans",
    price: 89,
    status: "Active",
    category: "Clothing",
    stock: 60,
    description: "Classic fit denim jeans",
  },
  {
    id: 8,
    name: "Dell Monitor",
    price: 349,
    status: "Active",
    category: "Electronics",
    stock: 20,
    description: "27-inch 4K professional monitor",
  },
  {
    id: 9,
    name: "Under Armour Shirt",
    price: 35,
    status: "Active",
    category: "Clothing",
    stock: 120,
    description: "Moisture-wicking athletic shirt",
  },
  {
    id: 10,
    name: "Canon Camera",
    price: 650,
    status: "Inactive",
    category: "Electronics",
    stock: 8,
    description: "Professional DSLR camera kit",
  },
  {
    id: 11,
    name: "Puma Sneakers",
    price: 95,
    status: "Active",
    category: "Footwear",
    stock: 85,
    description: "Casual lifestyle sneakers",
  },
  {
    id: 12,
    name: "HP Laptop",
    price: 899,
    status: "Active",
    category: "Electronics",
    stock: 30,
    description: "Business laptop with SSD storage",
  },
  {
    id: 13,
    name: "H&M Dress",
    price: 45,
    status: "Active",
    category: "Clothing",
    stock: 40,
    description: "Elegant evening dress",
  },
  {
    id: 14,
    name: "Xbox Console",
    price: 499,
    status: "Active",
    category: "Gaming",
    stock: 12,
    description: "Next-gen gaming console",
  },
  {
    id: 15,
    name: "Zara Jacket",
    price: 159,
    status: "Active",
    category: "Clothing",
    stock: 25,
    description: "Stylish winter jacket",
  },
  {
    id: 16,
    name: "Fitbit Watch",
    price: 199,
    status: "Active",
    category: "Electronics",
    stock: 55,
    description: "Fitness tracking smartwatch",
  },
  {
    id: 17,
    name: "Converse Shoes",
    price: 65,
    status: "Active",
    category: "Footwear",
    stock: 90,
    description: "Classic canvas sneakers",
  },
  {
    id: 18,
    name: "LG Refrigerator",
    price: 1200,
    status: "Inactive",
    category: "Appliances",
    stock: 5,
    description: "Smart energy-efficient fridge",
  },
  {
    id: 19,
    name: "Gap T-Shirt",
    price: 25,
    status: "Active",
    category: "Clothing",
    stock: 150,
    description: "Basic cotton t-shirt",
  },
  {
    id: 20,
    name: "Bose Speaker",
    price: 179,
    status: "Active",
    category: "Electronics",
    stock: 35,
    description: "Portable bluetooth speaker",
  },
];

const userData: User[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Manager",
    department: "Engineering",
    phone: "555-0101",
    location: "New York",
    joinDate: "2020-01-15",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@company.com",
    role: "Developer",
    department: "Engineering",
    phone: "555-0102",
    location: "San Francisco",
    joinDate: "2021-03-10",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@company.com",
    role: "Designer",
    department: "Design",
    phone: "555-0103",
    location: "Austin",
    joinDate: "2021-07-22",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david@company.com",
    role: "Analyst",
    department: "Sales",
    phone: "555-0104",
    location: "Seattle",
    joinDate: "2020-11-05",
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa@company.com",
    role: "Developer",
    department: "Engineering",
    phone: "555-0105",
    location: "Boston",
    joinDate: "2022-02-14",
  },
  {
    id: 6,
    name: "James Brown",
    email: "james@company.com",
    role: "Manager",
    department: "Marketing",
    phone: "555-0106",
    location: "Chicago",
    joinDate: "2019-08-30",
  },
  {
    id: 7,
    name: "Anna Davis",
    email: "anna@company.com",
    role: "HR Specialist",
    department: "HR",
    phone: "555-0107",
    location: "Miami",
    joinDate: "2021-12-01",
  },
  {
    id: 8,
    name: "Tom Wilson",
    email: "tom@company.com",
    role: "Developer",
    department: "Engineering",
    phone: "555-0108",
    location: "Denver",
    joinDate: "2020-06-18",
  },
  {
    id: 9,
    name: "Maria Garcia",
    email: "maria@company.com",
    role: "Designer",
    department: "Design",
    phone: "555-0109",
    location: "Los Angeles",
    joinDate: "2022-01-11",
  },
  {
    id: 10,
    name: "Chris Lee",
    email: "chris@company.com",
    role: "Analyst",
    department: "Finance",
    phone: "555-0110",
    location: "Portland",
    joinDate: "2021-09-07",
  },
  {
    id: 11,
    name: "Rachel Green",
    email: "rachel@company.com",
    role: "Manager",
    department: "Sales",
    phone: "555-0111",
    location: "Dallas",
    joinDate: "2020-04-20",
  },
  {
    id: 12,
    name: "Kevin Zhang",
    email: "kevin@company.com",
    role: "Developer",
    department: "Engineering",
    phone: "555-0112",
    location: "Phoenix",
    joinDate: "2022-05-03",
  },
  {
    id: 13,
    name: "Sophie Miller",
    email: "sophie@company.com",
    role: "Coordinator",
    department: "HR",
    phone: "555-0113",
    location: "Atlanta",
    joinDate: "2021-10-15",
  },
  {
    id: 14,
    name: "Ryan Taylor",
    email: "ryan@company.com",
    role: "Specialist",
    department: "Marketing",
    phone: "555-0114",
    location: "Houston",
    joinDate: "2020-12-08",
  },
  {
    id: 15,
    name: "Amy Liu",
    email: "amy@company.com",
    role: "Designer",
    department: "Design",
    phone: "555-0115",
    location: "San Diego",
    joinDate: "2022-03-25",
  },
  {
    id: 16,
    name: "Mark Johnson",
    email: "mark@company.com",
    role: "Developer",
    department: "Engineering",
    phone: "555-0116",
    location: "Nashville",
    joinDate: "2021-06-12",
  },
  {
    id: 17,
    name: "Jessica White",
    email: "jessica@company.com",
    role: "Analyst",
    department: "Finance",
    phone: "555-0117",
    location: "Orlando",
    joinDate: "2020-09-28",
  },
  {
    id: 18,
    name: "Alex Rodriguez",
    email: "alex@company.com",
    role: "Manager",
    department: "Operations",
    phone: "555-0118",
    location: "Las Vegas",
    joinDate: "2019-11-14",
  },
  {
    id: 19,
    name: "Olivia Thompson",
    email: "olivia@company.com",
    role: "Specialist",
    department: "Marketing",
    phone: "555-0119",
    location: "Salt Lake City",
    joinDate: "2022-01-30",
  },
  {
    id: 20,
    name: "Daniel Martinez",
    email: "daniel@company.com",
    role: "Developer",
    department: "Engineering",
    phone: "555-0120",
    location: "Raleigh",
    joinDate: "2021-08-16",
  },
];

export const BasicTableExample = () => {
  const [products, setProducts] = React.useState<Product[]>(productData);
  const [selectedRows, setSelectedRows] = React.useState<Product[]>([]);

  const columns: Column<Product>[] = [
    {
      key: "name",
      title: "Product",
      sortable: true,
      render: (row: Product) => <span className="font-medium">{row.name}</span>,
    },
    {
      key: "price",
      title: "Price",
      sortable: true,
      render: (row: Product) => <span className="font-mono">${row.price}</span>,
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (row: Product) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.status === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const rowActions: RowAction<Product>[] = [
    {
      label: "View",
      icon: <Eye size={16} />,
      onClick: (row: Product) => console.log("View:", row.name),
    },
    {
      label: "Edit",
      icon: <Edit size={16} />,
      onClick: (row: Product) => console.log("Edit:", row.name),
    },
    {
      label: "Delete",
      icon: <Trash2 size={16} className="text-destructive" />,
      onClick: (row: Product) => console.log("Delete:", row.name),
      disabled: (row: Product) => row.status === "Inactive",
    },
  ];

  const basicTableCode = `const data = ${JSON.stringify(
    productData.slice(0, 5),
    null,
    2
  )};

export const BasicTableExample = () => {
  const [products, setProducts] = React.useState<Product[]>(data);

  const columns: Column<Product>[] = [
    {
      key: "name",
      title: "Product",
      sortable: true,
      render: (row: Product) => (
        <span className="font-medium">{row.name}</span>
      ),
    },
    {
      key: "price", 
      title: "Price",
      sortable: true,
      render: (row: Product) => (
        <span className="font-mono">$\{row.price}</span>
      ),
    },
    {
      key: "status",
      title: "Status", 
      sortable: true,
      render: (row: Product) => (
        <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium \${
          row.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }\`}>
          {row.status}
        </span>
      ),
    },
  ];

  const rowActions: RowAction<Product>[] = [
    {
      label: "View",
      icon: <Eye size={16} />,
      onClick: (row: Product) => console.log("View:", row.name),
    },
    {
      label: "Edit",
      icon: <Edit size={16} />, 
      onClick: (row: Product) => console.log("Edit:", row.name),
    },
    {
      label: "Delete",
      icon: <Trash2 size={16} />,
      onClick: (row: Product) => console.log("Delete:", row.name),
      disabled: (row: Product) => row.status === "Inactive",
    },
  ];

  return (
    <Table.Root
      data={products}
      columns={columns}
      selectable={true}
      showSearch={true}
      showExport={true}
      rowActions={rowActions}
      onRowSelect={(selectedRows, row, isSelected) => {
        console.log("Selected:", selectedRows.length);
      }}
    >
      <Table.Toolbar>
        <Button size="sm" className="flex items-center gap-2">
          <Plus size={16} />
          Add Product
        </Button>
      </Table.Toolbar>

      <Table.Container>
        <Table.Header>
          <Table.Row>
            <Table.SelectHeader />
            {columns.map((column) => (
              <Table.Head key={column.key as string} column={column}>
                {column.title}
              </Table.Head>
            ))}
            <Table.ActionsHeader />
          </Table.Row>
        </Table.Header>
        <Table.Body />
      </Table.Container>

      <Table.Pagination />
    </Table.Root>
  );
};`;

  return (
    <SnippetPreview title="Basic Table" code={basicTableCode}>
      <div className="space-y-4">
        <Table.Root
          data={products}
          columns={columns}
          selectable={true}
          showSearch={true}
          showExport={true}
          rowActions={rowActions}
          onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
        >
          <Table.Toolbar>
            <Button size="sm" className="flex items-center gap-2">
              <Plus size={16} />
              Add Product
            </Button>
          </Table.Toolbar>

          <Table.Container>
            <Table.Header>
              <Table.Row>
                <Table.SelectHeader />
                {columns.map((column) => (
                  <Table.Head
                    key={column.key as string}
                    column={column}
                    sortable={column.sortable}
                  >
                    {column.title}
                  </Table.Head>
                ))}
                <Table.ActionsHeader />
              </Table.Row>
            </Table.Header>
            <Table.Body />
          </Table.Container>

          <Table.Pagination />
        </Table.Root>
      </div>
    </SnippetPreview>
  );
};

export const ExpandableTableExample = () => {
  const [users, setUsers] = React.useState<User[]>(userData);
  const [selectedRows, setSelectedRows] = React.useState<User[]>([]);

  const columns: Column<User>[] = [
    {
      key: "name",
      title: "Name",
      sortable: true,
      render: (row: User) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
            {row.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      title: "Email",
      sortable: true,
    },
    {
      key: "role",
      title: "Role",
      sortable: true,
      filterable: true,
    },
  ];

  const rowActions: RowAction<User>[] = [
    {
      label: "View",
      icon: <Eye size={16} />,
      onClick: (row: User) => console.log("View:", row.name),
    },
    {
      label: "Edit",
      icon: <Edit size={16} />,
      onClick: (row: User) => console.log("Edit:", row.name),
    },
  ];

  const expandableTableCode = `const data = ${JSON.stringify(
    userData.slice(0, 5),
    null,
    2
  )};

export const ExpandableTableExample = () => {
  const [users, setUsers] = React.useState<User[]>(data);

  const columns: Column<User>[] = [
    {
      key: "name",
      title: "Name", 
      sortable: true,
      render: (row: User) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
            {row.name.split(" ").map(n => n[0]).join("")}
          </div>
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      title: "Email",
      sortable: true,
    },
    {
      key: "role", 
      title: "Role",
      sortable: true,
      filterable: true,
    },
  ];

  const rowActions: RowAction<User>[] = [
    {
      label: "View",
      icon: <Eye size={16} />,
      onClick: (row: User) => console.log("View:", row.name),
    },
    {
      label: "Edit",
      icon: <Edit size={16} />,
      onClick: (row: User) => console.log("Edit:", row.name),
    },
  ];

  return (
    <Table.Root
      data={users}
      columns={columns}
      expandable={true}
      selectable={true}  
      showSearch={true}
      rowActions={rowActions}
    >
      <Table.Toolbar>
        <Button size="sm" className="flex items-center gap-2">
          <Plus size={16} />
          Add User
        </Button>
      </Table.Toolbar>

      <Table.Container>
        <Table.Header>
          <Table.Row>
            <Table.SelectHeader />
            <Table.ExpandHeader />
            {columns.map((column) => (
              <Table.Head key={column.key as string} column={column}>
                {column.title}
              </Table.Head>
            ))}
            <Table.ActionsHeader />
          </Table.Row>
        </Table.Header>
        
        <Table.Body
          renderExpandedRow={(row: User) => (
            <div className="p-4 space-y-2">
              <h4 className="font-semibold">Details for {row.name}</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Department:</strong> {row.department}</div>
                <div><strong>Phone:</strong> {row.phone}</div>
                <div><strong>Location:</strong> {row.location}</div>
                <div><strong>Join Date:</strong> {row.joinDate}</div>
              </div>
            </div>
          )}
        />
      </Table.Container>

      <Table.Pagination />
    </Table.Root>
  );
};`;

  return (
    <SnippetPreview title="Expandable Table" code={expandableTableCode}>
      <div className="space-y-4">
        <Table.Root
          data={users}
          columns={columns}
          expandable={true}
          selectable={true}
          showSearch={true}
          rowActions={rowActions}
          onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
        >
          <Table.Toolbar>
            <Button size="sm" className="flex items-center gap-2">
              <Plus size={16} />
              Add User
            </Button>
          </Table.Toolbar>

          <Table.Container>
            <Table.Header>
              <Table.Row>
                <Table.SelectHeader />
                <Table.ExpandHeader />
                {columns.map((column) => (
                  <Table.Head
                    key={column.key as string}
                    column={column}
                    sortable={column.sortable}
                    filterable={column.filterable}
                  >
                    {column.title}
                  </Table.Head>
                ))}
                <Table.ActionsHeader />
              </Table.Row>
            </Table.Header>

            <Table.Body
              renderExpandedRow={(row: User) => (
                <div className="p-4 space-y-2">
                  <h4 className="font-semibold">Details for {row.name}</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Department:</strong> {row.department}
                    </div>
                    <div>
                      <strong>Phone:</strong> {row.phone}
                    </div>
                    <div>
                      <strong>Location:</strong> {row.location}
                    </div>
                    <div>
                      <strong>Join Date:</strong> {row.joinDate}
                    </div>
                  </div>
                </div>
              )}
            />
          </Table.Container>

          <Table.Pagination />
        </Table.Root>
      </div>
    </SnippetPreview>
  );
};
