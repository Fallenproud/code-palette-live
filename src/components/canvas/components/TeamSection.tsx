import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Mail,
  MapPin,
  Calendar
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  location: string;
  joinDate: string;
  skills: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
  featured?: boolean;
}

interface TeamSectionProps {
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
  layout?: 'grid' | 'carousel';
  showSocial?: boolean;
}

const defaultMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years of experience in tech startups and product development.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612d5c6?w=150&h=150&fit=crop&crop=face',
    location: 'San Francisco, CA',
    joinDate: '2020-01-15',
    skills: ['Leadership', 'Strategy', 'Product Vision'],
    social: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson',
      email: 'sarah@company.com'
    },
    featured: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Full-stack architect passionate about scalable systems and cutting-edge technologies.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    location: 'Seattle, WA',
    joinDate: '2020-03-20',
    skills: ['Architecture', 'Cloud', 'AI/ML'],
    social: {
      linkedin: 'https://linkedin.com/in/michaelchen',
      github: 'https://github.com/michaelchen',
      email: 'michael@company.com'
    }
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Head of Design',
    bio: 'Creative designer focused on user experience and beautiful, functional interfaces.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    location: 'Austin, TX',
    joinDate: '2020-06-10',
    skills: ['UI/UX', 'Design Systems', 'Prototyping'],
    social: {
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      twitter: 'https://twitter.com/emilydesigns',
      email: 'emily@company.com'
    }
  },
  {
    id: '4',
    name: 'David Park',
    role: 'Lead Developer',
    bio: 'Senior developer with expertise in modern web technologies and performance optimization.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    location: 'New York, NY',
    joinDate: '2021-02-01',
    skills: ['React', 'Node.js', 'Performance'],
    social: {
      github: 'https://github.com/davidpark',
      linkedin: 'https://linkedin.com/in/davidpark',
      email: 'david@company.com'
    }
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'Head of Marketing',
    bio: 'Growth-focused marketer with a passion for building brands and communities.',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    location: 'Los Angeles, CA',
    joinDate: '2021-05-15',
    skills: ['Growth', 'Content', 'Community'],
    social: {
      twitter: 'https://twitter.com/lisagrowth',
      linkedin: 'https://linkedin.com/in/lisathompson',
      email: 'lisa@company.com'
    }
  },
  {
    id: '6',
    name: 'Alex Kumar',
    role: 'Product Manager',
    bio: 'Strategic product manager focused on user needs and market-driven development.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    location: 'Chicago, IL',
    joinDate: '2021-09-01',
    skills: ['Product Strategy', 'Analytics', 'User Research'],
    social: {
      linkedin: 'https://linkedin.com/in/alexkumar',
      email: 'alex@company.com'
    }
  }
];

export function TeamSection({
  title = "Meet Our Team",
  subtitle = "The brilliant minds behind our success",
  members = defaultMembers,
  layout = 'grid',
  showSocial = true
}: TeamSectionProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className={`${
          layout === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'flex gap-6 overflow-x-auto pb-4'
        } animate-fade-in`}>
          {members.map((member, index) => (
            <Card 
              key={member.id} 
              className={`group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                member.featured ? 'ring-2 ring-primary/20' : ''
              } ${layout === 'carousel' ? 'flex-shrink-0 w-80' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-background shadow-lg"
                    />
                    {member.featured && (
                      <Badge className="absolute -top-1 -right-1 bg-primary">
                        ⭐
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Since {formatDate(member.joinDate)}</span>
                    </div>
                  </div>
                  
                  {showSocial && (
                    <div className="flex justify-center gap-2">
                      {member.social.linkedin && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:text-blue-600"
                          onClick={() => window.open(member.social.linkedin, '_blank')}
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      )}
                      {member.social.twitter && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:text-blue-400"
                          onClick={() => window.open(member.social.twitter, '_blank')}
                        >
                          <Twitter className="h-4 w-4" />
                        </Button>
                      )}
                      {member.social.github && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:text-gray-600"
                          onClick={() => window.open(member.social.github, '_blank')}
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                      {member.social.email && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:text-green-600"
                          onClick={() => window.open(`mailto:${member.social.email}`, '_blank')}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12 animate-fade-in">
          <Button size="lg" variant="outline">
            Join Our Team
          </Button>
        </div>
      </div>
    </section>
  );
}