declare module "@lightningtv/solid" {
  // Augment the FocusManager KeyMap interface with our custom keys
  interface KeyMap {
    Announcer: (string | number)[];
    Menu: (string | number)[];
    Escape: (string | number)[];
    Backspace: (string | number)[];
  }
  interface ElementNode {
    heroContent?: boolean;
    backdrop?: any;
    entityInfo?: any;
    href?: string;
  }
}