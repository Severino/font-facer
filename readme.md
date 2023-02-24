# CSS-Font-Facer

Tool to generate css-font-face rules from a folder structure.

## Usage

Install the package globally.

```cmd
npm install -g font-facer
```

Run the tool from the root of your web project

```cmd
font-facer -n fonts.css -f FontName ./path/to/yourfont
```

The tool generates the file 'font.css' with all font-faces
for the font files inside the target folder.

## Parameters

| short | long | description | default |
| --- | --- | --- | --- |
| -d | --directory | Relative path to the font directory. Can be used without any parameter as last argument. | - |
| -o | --out | Relative output directory of the css file. | "." |
| -n | --file-name | Name of the output file. | '${font-dir-name}.css' |
| -v | --verbose | Verbose outputs for debugging purposes. | false |

## Limitations

The package checks the filename for the name of the font-weights (e.g. light, bold, black, ...) as well as for the
keyword 'italic'. If that information isn't in the fontname, the tool won't work as expected.