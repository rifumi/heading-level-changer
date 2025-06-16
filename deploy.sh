#!/bin/sh
set -e
# npm install -g npm@11.4.2
# npm install tslib
# npm i --save-dev @types/node

# コンパイルの実行
echo "Compiling the plugin..."
npm run build
# or npx rollup --config
echo "Compilation completed successfully."

# 配置先プラグインフォルダパス（環境に合わせて修正してください）
PLUGIN_DIR="./dist"

# 配置先ディレクトリが存在しない場合は作成する
if [ ! -d "$PLUGIN_DIR" ]; then
    echo "Creating plugin directory at: $PLUGIN_DIR"
    mkdir -p "$PLUGIN_DIR"
fi

# manifest.json とコンパイル結果（dist 以下）をプラグインフォルダにコピー
echo "Copying manifest.json and compiled files to plugin directory..."
cp manifest.json "$PLUGIN_DIR/"

# 出力ZIPファイル名（バージョン番号などを自動で付与する場合は変数利用可能）
DIST_DIR="$PLUGIN_DIR"
ZIP_FILE="heading-level-changer.zip"

# 既存のZIPファイルがあれば削除する
if [ -f "$ZIP_FILE" ]; then
    rm "$ZIP_FILE"
fi

# dist/ 以下の全ファイルをZIPにまとめる
zip -r "$ZIP_FILE" "$DIST_DIR"/*

echo "ZIP file '$ZIP_FILE' has been created successfully."

echo "Deployment completed successfully."
