# Heading Level Changer

**Heading Level Changer** is an Obsidian plugin that allows you to easily adjust the heading levels in your notes. With this plugin, you can increment or decrement heading levels either in your selection or on the current line if no text is selected. Improve your markdown editing speed with customizable commands, keyboard shortcuts, and context menu integration.

## Demo
![Demo](explain.gif)

## Features

- **Adjust heading levels:**  
  Increase or decrease the number of `#` characters at the beginning of a markdown heading.
  
- **Selection-based and cursor-based processing:**  
  - **When text is selected:** The plugin adjusts heading levels for each selected line.  
  - **When no text is selected:** If the line where the cursor is located starts with a heading, its level is modified accordingly.
  
- **Command palette integration:**  
  Access the commands via Obsidian's command palette and easily assign your preferred keyboard shortcuts.
  
- **Context menu integration:**  
  Use the right-click editor menu to quickly trigger heading adjustments.

## Installation

### From the Community Plugins Folder

1. Open Obsidian.
2. Go to **Settings > Community plugins**.
3. Disable **Restricted mode** if it is enabled.
4. Click on **Browse** and search for **Heading Level Changer**.
5. Install and then enable the plugin.

### Manual Installation

1. Download the latest release (ZIP file) from the [GitHub releases page](https://github.com/your-username/heading-level-changer/releases).
2. Extract the ZIP file.
3. Copy the extracted folder into your vault’s plugins folder:  
   **Path:** `<your-vault>/.obsidian/plugins/heading-level-changer`
4. Restart Obsidian (or reload plugins) and enable **Heading Level Changer** under **Settings > Community plugins**.

## Usage

Once installed and enabled, the plugin provides two primary commands:

### Changing Selected Text / Cursor Line

- **Command:** `Increase Heading Level` / `Decrease Heading Level`
- **Behavior 1:**  
  When you select one or more lines in a note and run the command, the plugin will adjust the heading level for each selected line.
- **Behavior 2:**  
  When no text is selected and the cursor is located in a line that starts with markdown heading syntax, the plugin will adjust the heading level for that line.

These commands are also accessible via the right-click context menu within the editor.

### Example

Given the following line in your note:

#### Cursor on Heading line
##### Running **Increase Heading Level** converts it to:
```md
## ha -> ### ha
```

##### Running **Decrease Heading Level** converts it to:
```md
## ha -> # ha 
# hb -> # hb
```

#### Selected multiple lines
If you select multiple heading lines, the command processes all accordingly.
##### Increase
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
##### Decrease
level 2,3 -> level 1,2:
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

level 1,2 -> level 1,1:
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

## Development

### Requirements

- Node.js (v14 or later recommended)
- TypeScript
- Rollup

### Building the Plugin

1. Clone the repository:
 ```bash
 git clone https://github.com/rifumi/heading-level-changer.git
 cd heading-level-changer
```

2. Install dependencies:
```bash
npm install
```

3. Build the project using Rollup:
The built file will be available at dist/main.js.
```bash
npx rollup --config
```

4. Copy dist/main.js along with manifest.json and, if applicable, others into your Obsidian plugins folder:
```bash
cp ./dist/* <your-vault>/.obsidian/plugins/heading-level-changer/
```

### Testing

1. Enable Developer Mode in Obsidian.

2. Use your preferred command or reload(off -> on) the plugin to see the changes in real-time.

### License
This plugin is licensed under the MIT License.
