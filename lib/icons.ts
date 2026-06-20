import {
  BookOpen,
  Code,
  Layers,
  Monitor,
  Palette,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Code,
  Layers,
  Monitor,
  Palette,
};

export function getLucideIcon(name: string): LucideIcon {
  return iconMap[name] ?? BookOpen;
}
