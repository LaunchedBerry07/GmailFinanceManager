import { Link, useLocation } from "wouter";
import { 
  Mail, 
  FileText, 
  Tag, 
  Users, 
  Settings,
  BarChart3
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();

  const menuItems = [
    { href: "/", icon: BarChart3, label: "Dashboard", active: location === "/" },
    { href: "/emails", icon: Mail, label: "Emails" },
    { href: "/documents", icon: FileText, label: "Documents" },
    { href: "/labels", icon: Tag, label: "Labels" },
  ];

  const managementItems = [
    { href: "/users", icon: Users, label: "Users" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 gradient-bg shadow-2xl border-r border-primary-600/30">
      <div className="p-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-xl font-bold text-white">B</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">DataBerry</h1>
            <p className="text-sm text-purple-200">Finance Manager</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-3">
            Main Menu
          </div>
          
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <a className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  item.active 
                    ? "bg-white/20 backdrop-blur-sm text-white" 
                    : "text-purple-200 hover:bg-white/10 hover:text-white"
                }`}>
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </Link>
            );
          })}

          <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-3 mt-6">
            Management
          </div>

          {managementItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <a className="flex items-center space-x-3 p-3 rounded-xl text-purple-200 transition-all duration-200 hover:bg-white/10 hover:text-white">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full gradient-pink-magenta flex items-center justify-center">
            <span className="text-sm font-semibold text-white">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-purple-300 truncate">Accounting Technician</p>
          </div>
        </div>
      </div>
    </div>
  );
}
