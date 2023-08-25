type SidebarItem4ShortcutString = string;
type SidebarItem4ShortcutTuple = [SidebarItem4ShortcutString, string]
type SidebarItem4Shortcut =
  | SidebarItem4ShortcutString
  | SidebarItem4ShortcutTuple;
export interface SidebarItem4Group {
    /**
   * Sidebar's title
   */
  title: string;
  /**
   * Sidebar's link, should be an absolute path and must exist
   */
  path?: string;
  /**
   * Whether current sidebar is collapsable
   */
  collapsable?: boolean;
  /**
   * Sidebar's depth.
   */
  sidebarDepth?: number;
  /**
   * By default the first subgroup is opened initially.
   * You can change this using the `initialOpenGroupIndex`:
   * Specify an index to open another subgroup or use `-1` for no open group.
   *
   * @default 0
   */
  initialOpenGroupIndex?: number;
  /**
   * Sidebar children.
   */
  children?: Array<SidebarItem4Shortcut | SidebarItem4Group>;
}

export type SidebarItem = [SidebarItem4ShortcutString, string] | SidebarItem4Group;

export interface LocaleConfig {
    /**
     * Locale's lang
     */
    lang: Lang;
    /**
     * Locale's title
     */
    title: string;
    /**
     * Locale's description
     */
    description: string;
}

export type Locales = { [path: string]: LocaleConfig }

export interface Options {
  value: number | string,
  label: string
}

export interface RemoteParams {
  value: string | number,
  paging: { 
    offset:number, 
    limit:number 
  }
}