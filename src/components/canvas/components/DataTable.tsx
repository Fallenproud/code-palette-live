import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader, 
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

interface TableData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActive: string;
}

interface DataTableProps {
  title?: string;
  data?: TableData[];
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  actions?: boolean;
}

const defaultData: TableData[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
    lastActive: '2024-01-20'
  },
  {
    id: '2', 
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'active',
    joinDate: '2023-03-22',
    lastActive: '2024-01-19'
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com', 
    role: 'Viewer',
    status: 'inactive',
    joinDate: '2023-07-10',
    lastActive: '2024-01-10'
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    role: 'Editor',
    status: 'pending',
    joinDate: '2024-01-05',
    lastActive: '2024-01-18'
  },
  {
    id: '5',
    name: 'Eva Davis',
    email: 'eva@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-05-18',
    lastActive: '2024-01-20'
  }
];

type SortField = keyof TableData;
type SortDirection = 'asc' | 'desc';

export function DataTable({
  title = "User Management",
  data = defaultData,
  searchable = true,
  sortable = true,
  filterable = true,
  actions = true
}: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    if (sortable) {
      filtered.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchQuery, sortField, sortDirection, statusFilter]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          
          <div className="flex flex-col sm:flex-row gap-2">
            {searchable && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
            )}
            
            {filterable && (
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'active' ? 'default' : 'outline'}
                  size="sm" 
                  onClick={() => setStatusFilter('active')}
                >
                  Active
                </Button>
                <Button
                  variant={statusFilter === 'pending' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('pending')}
                >
                  Pending
                </Button>
              </div>
            )}
            
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className={`cursor-pointer select-none ${sortable ? 'hover:bg-muted/50' : ''}`}
                  onClick={() => sortable && handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Name
                    {sortable && <SortIcon field="name" />}
                  </div>
                </TableHead>
                <TableHead 
                  className={`cursor-pointer select-none ${sortable ? 'hover:bg-muted/50' : ''}`}
                  onClick={() => sortable && handleSort('role')}
                >
                  <div className="flex items-center gap-2">
                    Role
                    {sortable && <SortIcon field="role" />}
                  </div>
                </TableHead>
                <TableHead 
                  className={`cursor-pointer select-none ${sortable ? 'hover:bg-muted/50' : ''}`}
                  onClick={() => sortable && handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {sortable && <SortIcon field="status" />}
                  </div>
                </TableHead>
                <TableHead 
                  className={`cursor-pointer select-none ${sortable ? 'hover:bg-muted/50' : ''}`}
                  onClick={() => sortable && handleSort('joinDate')}
                >
                  <div className="flex items-center gap-2">
                    Join Date
                    {sortable && <SortIcon field="joinDate" />}
                  </div>
                </TableHead>
                <TableHead 
                  className={`cursor-pointer select-none ${sortable ? 'hover:bg-muted/50' : ''}`}
                  onClick={() => sortable && handleSort('lastActive')}
                >
                  <div className="flex items-center gap-2">
                    Last Active
                    {sortable && <SortIcon field="lastActive" />}
                  </div>
                </TableHead>
                {actions && <TableHead className="w-20">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(item.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(item.lastActive).toLocaleDateString()}
                  </TableCell>
                  {actions && (
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredAndSortedData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No results found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div>
            Showing {filteredAndSortedData.length} of {data.length} entries
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}