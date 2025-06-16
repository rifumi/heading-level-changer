# Heading Level Changer / ヘッディングレベルチェンジャー

**Heading Level Changer** は、Obsidian のノート内で見出しレベルを簡単に調整できるプラグインです。このプラグインを使用すれば、選択範囲内またはテキストが選択されていない場合はカーソル行において、見出しのレベルを増減させることができます。カスタマイズ可能なコマンド、キーボードショートカット、さらにコンテキストメニューとの連携により、Markdown の編集効率を向上させます。

## デモ
![動作デモ](explain.gif)

## 機能

- **見出しレベルの調整：**  
  Markdown の見出し冒頭にある `#` の数を増減させます。

- **選択範囲およびカーソル行に基づく処理：**  
  - **テキストが選択されている場合：**  
    選択された各行の見出しレベルを変更します。  
  - **テキストが選択されていない場合：**  
    カーソルが位置する行が見出しで始まっていれば、その見出しレベルを適切に変更します。

- **コマンドパレットとの連携：**  
  Obsidian のコマンドパレットからコマンドにアクセスでき、好みのキーボードショートカットを簡単に割り当てられます。
  
- **コンテキストメニューとの連携：**  
  エディタ内の右クリックメニューから、見出しの調整コマンドを迅速に実行できます。

## インストール

### コミュニティプラグインフォルダから

1. Obsidian を起動します。
2. **設定 > コミュニティプラグイン** に移動します。
3. 「Restricted mode（制限モード）」が有効なら無効化します。
4. **Browse（閲覧）** をクリックして、**Heading Level Changer** を検索します。
5. プラグインをインストールし、有効化します。

### 手動インストール

1. [GitHub リリースページ](https://github.com/rifumi/heading-level-changer/releases) から最新のリリース（ZIP ファイル）をダウンロードします。
2. ZIP ファイルを解凍します。
3. 解凍したフォルダを、あなたの`Vault`内のプラグインフォルダにコピーします。  
   **パス：** `<your-vault>/.obsidian/plugins/heading-level-changer`
4. Obsidian を再起動（またはプラグインのリロード）し、**設定 > コミュニティプラグイン** から **Heading Level Changer** を有効にします。

## 使用方法

プラグインをインストールして有効化すると、主に以下の 2 種類のコマンドが利用可能になります。

### 選択テキスト / カーソル行 の見出し変更

- **コマンド：** `Increase Heading Level` / `Decrease Heading Level`
- **動作 1：**  
  ノート内で 1 行以上を選択した状態でコマンドを実行すると、プラグインは選択された行に含まれる見出しレベルを変更します。
- **動作 2：**  
  テキストが選択されていない場合、カーソルがある行が Markdown の見出し形式で始まっていれば、その行の見出しレベルを変更します。

これらのコマンドは、エディタの右クリックコンテキストメニューからも実行可能です。

### 例

次のような行がノートにあるとします。

#### カーソルが見出し行にある場合
##### **Increase Heading Level** を実行すると、次のように変換されます:
```md
## head  →  ### head
```
##### Decrease Heading Level を実行すると、次のように変換されます:
```md
## ha  →  # ha
# hb   →  # hb
```
#### 複数行を選択した場合
複数の見出し行を選択すると、コマンドはすべての行を処理します。

##### Increase の例
```md
# ha
abcd
efg...
## hb
hijk
lmn...
```
->
```md
## ha
abcd
efg...
### hb
hijk
lmn...
```
##### Decrease の例
レベル 2,3 → レベル 1,2 :
```md
## ha
abcd
efg...
### hb
hijk
lmn...
```
->
```md
# ha
abcd
efg...
## hb
hijk
lmn...
```
レベル 1,2 → レベル 1,1 :
```md
# ha
abcd
efg...
## hb
hijk
lmn...
```
->
```md
# ha
abcd
efg...
# hb
hijk
lmn...
```
## 開発
### 必要条件

- Node.js（v14 以降推奨）
- TypeScript
- Rollup

### プラグインのビルド

1. リポジトリをクローンします:

```bash
git clone https://github.com/rifumi/heading-level-changer.git
cd heading-level-changer
```
2. 依存パッケージをインストールします:

```bash
npm install
```
3. Rollup を使用してプロジェクトをビルドします: ビルドされたファイルは dist/main.js に出力されます。
```bash
npx rollup --config
```
4. dist/main.js、manifest.json、および必要に応じてその他のファイルを、Obsidian のプラグインフォルダにコピーします:

```bash
cp ./dist/* <your-vault>/.obsidian/plugins/heading-level-changer/
```
### テスト
1. Obsidian で Developer Mode（開発者モード） を有効にします。

2. 任意のコマンドを実行するか、プラグインをオフ→オンに切り替えて、リアルタイムに変更を確認してください。

### ライセンス
このプラグインは MIT ライセンスの下で配布されています。
