export type NavItemId = "dashboard" | "courses" | "analytics" | "settings";

export type NavItem = {
  id: NavItemId;
  label: string;
};

export const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "courses", label: "Courses" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" },
];
