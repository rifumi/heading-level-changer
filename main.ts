import { type MarkdownView, type MarkdownFileInfo, type Menu, Notice } from 'obsidian';
const { Plugin, Editor } = require('obsidian');

type EditorInstance = InstanceType<typeof Editor>;
const CMD_NAME_INC_HEAD_LEVEL = 'Increase Heading Level';
const CMD_NAME_DEC_HEAD_LEVEL = 'Decrease Heading Level';

export default class HeadingLevelChanger extends Plugin {
    // onload 内でコマンドを登録
    async onload() {
        // 見出しレベルを上げるコマンド: 例として「##」を「###」に変換する
        this.addCommand({
            id: 'increase-heading-level',
            name: CMD_NAME_INC_HEAD_LEVEL,
            editorCallback: (editor: EditorInstance, view: MarkdownView | MarkdownFileInfo) => {
                this.changeHeadingLevel(editor, 1); // 1 を意味は「レベルを1段階上げる」
            }
        });

        // 見出しレベルを下げるコマンド: 例として「###」を「##」に変換する
        this.addCommand({
            id: 'decrease-heading-level',
            name: CMD_NAME_DEC_HEAD_LEVEL,
            editorCallback: (editor: EditorInstance, view: MarkdownView | MarkdownFileInfo) => {
                this.changeHeadingLevel(editor, -1); // -1 を意味は「レベルを1段階下げる」
            }
        });

        // コンテキストメニューに登録
        this.registerEvent(
            this.app.workspace.on("editor-menu", (menu: Menu, editor: EditorInstance, info: MarkdownView | MarkdownFileInfo) => {
                menu.addItem((item) => {
                    item
                        .setTitle(CMD_NAME_INC_HEAD_LEVEL)
                        .setIcon("arrow-up") // 任意のアイコン、アイコン名は Obsidian のアイコンセットから選択
                        .onClick(() => {
                            // ここで、先ほど登録したコマンドの処理を実行するか、同じロジックを記述します。
                            this.changeHeadingLevel(editor, 1);
                        });
                });
                menu.addItem((item) => {
                    item
                        .setTitle(CMD_NAME_DEC_HEAD_LEVEL)
                        .setIcon("arrow-down") // 任意のアイコン、アイコン名は Obsidian のアイコンセットから選択
                        .onClick(() => {
                            // ここで、先ほど登録したコマンドの処理を実行するか、同じロジックを記述します。
                            this.changeHeadingLevel(editor, -1);
                        });
                });
            })
        );
    }

    /**
     * 全体のテキストを行ごとに処理し、各行の先頭にある # の数を変更する
     * @param editor エディタインスタンス
     * @param delta  +1（増やす）または -1（減らす）
     */
    private changeHeadingLevel(editor: EditorInstance, delta: number) {
        const selectedText: string = editor.getSelection();

        if (selectedText) {
            // 選択範囲の開始行の先頭から、終了行の行末までの全範囲を定義
            const startPos = editor.getCursor("from");
            const endPos   = editor.getCursor("to");
            const fullStartPos = { line: startPos.line, ch: 0 };
            const fullEndLineText = editor.getLine(endPos.line);
            const fullEndPos = { line: endPos.line, ch: fullEndLineText.length };

            // 指定範囲のテキストを取得（この場合は選択されている行全体）
            const fullText: string = editor.getRange(fullStartPos, fullEndPos);
            const text = fullText;
            console.debug('target is:', text);

            // 行ごとに分割して処理する
            const newText = text.split('\n').map((line) => {
                // 正規表現で行の先頭にある空白と # の塊をキャプチャする
                return this.transformHeadingLine(line, delta);
            }).join('\n');

            editor.replaceRange(newText, fullStartPos, fullEndPos);
        } else {
            // 選択範囲がない場合は、カーソル位置の行を対象とする
            const cursor = editor.getCursor();
            const lineText = editor.getLine(cursor.line);

            // 行が見出しかどうかチェック
            const transformedLine = this.transformHeadingLine(lineText, delta);

            if (transformedLine !== lineText) {
                // 行が見出しだった場合、行全体を置換する
                const from = { line: cursor.line, ch: 0 };
                const to = { line: cursor.line, ch: lineText.length };
                editor.replaceRange(transformedLine, from, to);
            } else {
                new Notice("現在行は見出しではないので、変更対象ではありません。");
            }
        }
    }

    /**
     * 行テキストが見出しの場合に、delta分だけレベルを変更する関数
     * 見出しでなければ元のテキストをそのまま返す
     */
    private transformHeadingLine(line: string, delta: number): string {
        const match = line.match(/^(\s*)(#+)(\s.*)?$/);
        if (match) {
            const indent = match[1] ?? '';
            let hashes = match[2];
            const rest = match[3] ?? '';

            // heading レベルの変更：deltaが正なら # を追加、負なら # を削除
            // ただし、# が1未満にならないようにする。
            const currentLevel = hashes.length;
            const newLevel = Math.max(1, currentLevel + delta);
            hashes = '#'.repeat(newLevel);

            return indent + hashes + (rest ? rest : '');
        }

        // heading でない行はそのまま返す
        return line;
    }

    async onunload() {
        // プラグインのアンロード時にクリーンアップするコードがあればここに記述
    }
}
