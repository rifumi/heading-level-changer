import { describe, it, expect, beforeEach, vi } from "vitest";
import HeadingLevelChanger from "../main";


function createMockPlugin() {
    const mockApp = {
        workspace: {
            on: () => { },
        },
    };

    const mockManifest = {
        id: "test-plugin",
        name: "Test Plugin",
        version: "1.0.0",
        minAppVersion: "1.0.0",
    };

    return new HeadingLevelChanger(mockApp as any, mockManifest as any);
}

// ----------------------
// Mock Editor
// ----------------------
function createMockEditor(initialText: string, selection: { from: any, to: any } | null = null) {
    const lines = initialText.split("\n");

    let currentSelection = selection;
    let cursor = selection ? selection.to : { line: 0, ch: 0 };

    return {
        getSelection: () => {
            if (!currentSelection) return "";
            const { from, to } = currentSelection;
            if (from.line === to.line) {
                return lines[from.line].slice(from.ch, to.ch);
            }
            const selectedLines = [];
            selectedLines.push(lines[from.line].slice(from.ch));
            for (let i = from.line + 1; i < to.line; i++) {
                selectedLines.push(lines[i]);
            }
            selectedLines.push(lines[to.line].slice(0, to.ch));
            return selectedLines.join("\n");
        },

        getCursor: (pos: "from" | "to" | undefined = undefined) => {
            if (!currentSelection) return cursor;
            return pos === "from" ? currentSelection.from : currentSelection.to;
        },

        getLine: (line: number) => lines[line],

        getRange: (from: any, to: any) => {
            const selectedLines = [];
            selectedLines.push(lines[from.line].slice(from.ch));
            for (let i = from.line + 1; i < to.line; i++) {
                selectedLines.push(lines[i]);
            }
            selectedLines.push(lines[to.line].slice(0, to.ch));
            return selectedLines.join("\n");
        },

        replaceRange: (newText: string, from: any, to: any) => {
            const before = lines.slice(0, from.line);
            const after = lines.slice(to.line + 1);

            const newLines = newText.split("\n");
            lines.splice(0, lines.length, ...before, ...newLines, ...after);
        },

        setSelection: vi.fn((from, to) => {
            currentSelection = { from, to };
        }),

        setCursor: vi.fn((pos) => {
            cursor = pos;
        }),

        _getFullText: () => lines.join("\n"),
        _getSelection: () => currentSelection
    };
}

// ----------------------
// Tests
// ----------------------
describe("HeadingLevelChanger", () => {
    let plugin: HeadingLevelChanger;

    beforeEach(() => {
        plugin = createMockPlugin();
    });

    it("選択範囲の heading level を増加させる", () => {
        const editor = createMockEditor(
            "## A\n### B",
            { from: { line: 0, ch: 0 }, to: { line: 1, ch: 5 } }
        );

        plugin["changeHeadingLevel"](editor as any, 1);

        expect(editor._getFullText()).toBe("### A\n#### B");

        // 選択範囲が維持されている
        const sel = editor._getSelection();
        expect(sel).not.toBeNull();
        if (!sel) return; // TS のためのガード

        expect(sel.from.line).toBe(0);
        expect(sel.to.line).toBe(1);
    });

    it("行頭スペース付き見出しは対象外", () => {
        const editor = createMockEditor(
            "  ## A\n## B",
            { from: { line: 0, ch: 0 }, to: { line: 1, ch: 4 } }
        );

        plugin["changeHeadingLevel"](editor as any, 1);

        expect(editor._getFullText()).toBe("  ## A\n### B");
    });

    it("カーソル行のみの場合、カーソル位置を維持する", () => {
        const editor = createMockEditor("## A");
        editor.getCursor = () => ({ line: 0, ch: 3 });

        plugin["changeHeadingLevel"](editor as any, 1);

        expect(editor._getFullText()).toBe("### A");
        expect(editor.setCursor).toHaveBeenCalledWith({ line: 0, ch: 3 });
    });

    it("複数行選択で heading level を減少させる", () => {
        const editor = createMockEditor(
            "### A\n## B\n# C",
            { from: { line: 0, ch: 0 }, to: { line: 2, ch: 3 } }
        );

        plugin["changeHeadingLevel"](editor as any, -1);

        expect(editor._getFullText()).toBe("## A\n# B\n# C");

        const sel = editor._getSelection();
        expect(sel).not.toBeNull();
        if (!sel) return; // TS のためのガード
        
        expect(sel.from.line).toBe(0);
        expect(sel.to.line).toBe(2);
    });
});
