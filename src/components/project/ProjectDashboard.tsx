import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProjectStore, Project } from '@/stores/projectStore';
import { useAuthStore } from '@/stores/authStore';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar,
  Users,
  Star,
  Copy,
  Trash2,
  Eye,
  Edit
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

interface ProjectDashboardProps {
  onSelectProject: (project: Project) => void;
}

export function ProjectDashboard({ onSelectProject }: ProjectDashboardProps) {
  const { projects, createProject, deleteProject, duplicateProject } = useProjectStore();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;
    
    try {
      const project = await createProject(newProject.name, newProject.description);
      toast({ title: 'Project created!', description: `${project.name} is ready to go.` });
      setShowCreateDialog(false);
      setNewProject({ name: '', description: '' });
      onSelectProject(project);
    } catch (error) {
      toast({ title: 'Failed to create project', variant: 'destructive' });
    }
  };

  const handleDeleteProject = async (id: string, name: string) => {
    try {
      await deleteProject(id);
      toast({ title: 'Project deleted', description: `${name} has been removed.` });
    } catch (error) {
      toast({ title: 'Failed to delete project', variant: 'destructive' });
    }
  };

  const handleDuplicateProject = async (id: string) => {
    try {
      const duplicate = await duplicateProject(id);
      toast({ title: 'Project duplicated!', description: `${duplicate.name} created.` });
    } catch (error) {
      toast({ title: 'Failed to duplicate project', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Projects</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.name}. You have {projects.length} projects.
            </p>
          </div>
          
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="My Awesome Project"
                    value={newProject.name}
                    onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    placeholder="Tell us about your project..."
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Project</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description || 'No description provided'}
                    </CardDescription>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onSelectProject(project)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Open
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateProject(project.id)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteProject(project.id, project.name)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs">
                    {project.settings.framework}
                  </Badge>
                  {project.settings.typescript && (
                    <Badge variant="outline" className="text-xs">TS</Badge>
                  )}
                  {project.isPublic && (
                    <Badge variant="outline" className="text-xs">Public</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent 
                className="pt-0 space-y-3"
                onClick={() => onSelectProject(project)}
              >
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  {project.thumbnail ? (
                    <img 
                      src={project.thumbnail} 
                      alt={project.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Eye className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                  {project.collaborators.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {project.collaborators.length}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery ? 'No projects found' : 'No projects yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? 'Try adjusting your search terms' 
                : 'Create your first project to get started'
              }
            </p>
            {!searchQuery && (
              <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Create Your First Project
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}