import { type Menu, Notice } from 'obsidian';
import { Plugin, Editor } from 'obsidian';

type EditorInstance = InstanceType<typeof Editor>;
const CMD_NAME_INC_HEAD_LEVEL = 'Increase Heading Level';
const CMD_NAME_DEC_HEAD_LEVEL = 'Decrease Heading Level';

export default class HeadingLevelChanger extends Plugin {
    async onload() {
        this.addCommand({
            id: 'increase-heading-level',
            name: CMD_NAME_INC_HEAD_LEVEL,
            editorCallback: (editor: EditorInstance) => {
                this.changeHeadingLevel(editor, 1);
            }
        });

        this.addCommand({
            id: 'decrease-heading-level',
            name: CMD_NAME_DEC_HEAD_LEVEL,
            editorCallback: (editor: EditorInstance) => {
                this.changeHeadingLevel(editor, -1);
            }
        });

        this.registerEvent(
            this.app.workspace.on("editor-menu", (menu: Menu, editor: EditorInstance) => {
                menu.addItem((item) => {
                    item.setTitle(CMD_NAME_INC_HEAD_LEVEL)
                        .setIcon("arrow-up")
                        .onClick(() => this.changeHeadingLevel(editor, 1));
                });
                menu.addItem((item) => {
                    item.setTitle(CMD_NAME_DEC_HEAD_LEVEL)
                        .setIcon("arrow-down")
                        .onClick(() => this.changeHeadingLevel(editor, -1));
                });
            })
        );
    }

    /**
     * 選択範囲またはカーソル行の heading level を変更し、
     * 選択範囲を維持したまま連続実行できるようにする
     */
    private changeHeadingLevel(editor: EditorInstance, delta: number) {
        const selectedText = editor.getSelection();

        if (selectedText) {
            // 選択範囲あり
            const startPos = editor.getCursor("from");
            const endPos = editor.getCursor("to");

            const fullStartPos = { line: startPos.line, ch: 0 };
            const fullEndLineText = editor.getLine(endPos.line);
            const fullEndPos = { line: endPos.line, ch: fullEndLineText.length };

            const fullText = editor.getRange(fullStartPos, fullEndPos);

            let totalDeltaChars = 0;

            const newText = fullText.split('\n').map((line) => {
                const before = line;
                const after = this.transformHeadingLine(line, delta);

                // 行頭 # の増減量を計算
                const diff = after.length - before.length;
                totalDeltaChars += diff;

                return after;
            }).join('\n');

            editor.replaceRange(newText, fullStartPos, fullEndPos);

            // 選択範囲を復元（終了位置のみ補正）
            const newStart = startPos;
            const newEnd = { line: endPos.line, ch: endPos.ch + totalDeltaChars };

            editor.setSelection(newStart, newEnd);

        } else {
            // 選択範囲なし → カーソル行のみ
            const cursor = editor.getCursor();
            const lineText = editor.getLine(cursor.line);

            const transformedLine = this.transformHeadingLine(lineText, delta);

            if (transformedLine !== lineText) {
                const from = { line: cursor.line, ch: 0 };
                const to = { line: cursor.line, ch: lineText.length };

                editor.replaceRange(transformedLine, from, to);

                // カーソル位置を維持
                editor.setCursor(cursor);
            } else {
                new Notice("現在行は見出しではないので、変更対象ではありません。");
            }
        }
    }

    /**
     * 行頭スペース付き見出しは対象外
     * 見出し行のみ heading level を変更
     */
    private transformHeadingLine(line: string, delta: number): string {
        // 行頭スペースがある場合は対象外
        if (/^\s+/.test(line)) {
            return line;
        }

        const match = line.match(/^(#+)(\s.*)?$/);
        if (match) {
            let hashes = match[1];
            const rest = match[2] ?? '';

            const currentLevel = hashes.length;
            const newLevel = Math.max(1, currentLevel + delta);
            hashes = '#'.repeat(newLevel);

            return hashes + rest;
        }

        return line;
    }

    async onunload() { }
}
