import { Icons } from '@/components/ui/icons';

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}
export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}
export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}
export type SidebarNavItem = NavItemWithChildren;
export type MainNavItem = NavItemWithOptionalChildren;

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
};
