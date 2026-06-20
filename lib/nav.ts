import {
  BarChart3,
  BookOpen,
  Home,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItemId = "dashboard" | "courses" | "analytics" | "settings";

export type NavItem = {
  id: NavItemId;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];
