export interface SidebarItemType {
  link: string;
  Icon: React.FC<React.SVGProps<SVGElement>>;
  name: string;
  authOnly?: boolean;
}
