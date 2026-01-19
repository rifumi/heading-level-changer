// tests/mocks/obsidian.ts

export class Plugin {
    constructor(public app: any, public manifest: any) { }
}

export class Editor { }

export class Notice {
    constructor(public message: string) { }
}

export type MarkdownView = any;
export type MarkdownFileInfo = any;
export type Menu = any;
