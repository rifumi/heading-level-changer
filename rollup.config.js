import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
    input: 'main.ts', // エントリーポイント
    output: {
        file: 'dist/main.js',
        format: 'cjs',    // Obsidianプラグインは CommonJS モジュール形式
        sourcemap: true,
    },
    external: ['obsidian'],
    plugins: [
        resolve(),      // Nodeモジュールを解決
        commonjs(),     // CommonJSモジュールをESモジュールに変換
        typescript({ tsconfig: './tsconfig.json' }), // tsconfig.jsonの設定を利用してTypeScriptをコンパイル
        terser()        // 圧縮（不要ならこのプラグインは省略可能）
    ]
};
