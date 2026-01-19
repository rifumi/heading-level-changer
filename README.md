# Heading Level Changer

**Heading Level Changer** is an Obsidian plugin that allows you to intuitively increase or decrease heading levels (`#` count) within your notes.  
If text is selected, the plugin adjusts headings within the selection.  
If no text is selected, it adjusts the heading level of the line where the cursor is located.

The latest version includes an improvement where **the selection is preserved after execution**, making repeated heading adjustments smooth and efficient.

## Demo

![Demo](explain.gif)

## Features

- **Increase or decrease heading levels**  
  Adjust the number of leading `#` characters in Markdown headings.

- **Works with selections or cursor position**  
  - **When text is selected:**  
    All heading lines within the selection are processed.  
    The selection remains active after execution.
  - **When no text is selected:**  
    If the cursor is on a heading line, that heading level is adjusted.  
    The cursor position is preserved.

- **Indented headings are ignored**  
  Example:  
      ## Indented heading  
  Such lines are not treated as headings and will not be modified.

- **Command palette support**  
  Access `Increase Heading Level` and `Decrease Heading Level` from the command palette.  
  You can assign custom hotkeys.

- **Context menu support**  
  Commands are also available from the editor's right‑click context menu.

- Selection is preserved after execution for repeated operations.

## Installation

### ~~From Community Plugins~~

1. ~~Open Obsidian.~~
2. ~~Go to **Settings > Community plugins**.~~
3. ~~Disable **Restricted mode** if enabled.~~
4. ~~Click **Browse** and search for **Heading Level Changer**.~~
5. ~~Install and enable the plugin.~~

### Manual Installation

1. Download the latest ZIP from the [GitHub Releases](https://github.com/rifumi/heading-level-changer/releases) page.
2. Extract the ZIP.
3. Place the extracted folder into:  
   `<your-vault>/.obsidian/plugins/heading-level-changer`
4. Restart Obsidian or reload plugins.

## Usage

Once enabled, the plugin provides two commands:

### Heading Level Adjustment

- Increase Heading Level  
- Decrease Heading Level

#### When text is selected  

Only lines recognized as headings are modified.
The selection remains active after execution, allowing repeated adjustments.

#### When no text is selected  

If the cursor is on a heading line, that heading is modified.  
The cursor position is preserved.

### Examples

#### When the cursor is on a heading line

Increase Heading Level  

```markdown
## head  ->  ### head
```

Decrease Heading Level  

```markdown
## ha  ->  # ha  
# hb   ->  # hb
```

#### When multiple lines are selected

Increase example  

```markdown
# ha  
abcd  
efg...  
## hb  
hijk  
lmn...  
```

->

```markdown
## ha  
abcd  
efg...  
### hb  
hijk  
lmn...
```

Decrease example (levels 2,3 → 1,2)

```markdown
## ha
abcd
efg...
### hb
hijk
lmn...
```

->

```markdown
# ha
abcd
efg...
## hb
hijk
lmn...
```

Decrease example (levels 1,2 → 1,1)

```markdown
# ha
abcd
efg...
## hb
hijk
lmn...
```

->

```markdown
# ha  
abcd  
efg...  
# hb  
hijk  
lmn...
```

## Development

### Requirements

- Node.js (v18+ recommended)
- TypeScript
- esbuild (included in the project)

### Build

```sh
    git clone https://github.com/rifumi/heading-level-changer.git
    cd heading-level-changer
    npm install
    npm run build
```

Build output is generated in the `dist/` directory.

### Development mode (watch)

```sh
    npm run dev
```

Automatically rebuilds on file save.

### Testing (Vitest)

```sh
    npm run test
```

### Manual deployment

```sh
    cp ./dist/* <your-vault>/.obsidian/plugins/heading-level-changer/
```

## License

MIT License
