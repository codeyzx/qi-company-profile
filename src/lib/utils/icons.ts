// Utility for mapping icon names to Lucide components
import {
  Newspaper,
  ListOrdered,
  Lightbulb,
  Video,
  Gamepad2,
  Trophy,
  Zap,
  Target,
  Users,
  Heart,
  Shield,
  Star,
  Flame,
  PlayCircle,
  BookOpen,
  Camera,
  Headphones,
  Palette,
  Code,
  Globe,
} from "lucide-svelte";

export const iconMap: Record<string, any> = {
  // Gaming specific icons
  Newspaper,
  ListOrdered,
  Lightbulb,
  Video,
  Gamepad2,
  Trophy,
  Zap,

  // General icons
  Target,
  Users,
  Heart,
  Shield,
  Star,
  Flame,
  PlayCircle,
  BookOpen,
  Camera,
  Headphones,
  Palette,
  Code,
  Globe,
};

export function getIconComponent(iconName: string): any {
  return iconMap[iconName] || Gamepad2; // Default fallback
}

export function getAvailableIcons(): string[] {
  return Object.keys(iconMap);
}
