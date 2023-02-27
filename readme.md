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
| -f | --font-name | Set the name of font in the output file. Default is the name of the source directory. '_' are reokaced by ' '. | Name of source directory. |
| -o | --override | Can be set to replace the target file. | '${font-dir-name}.css' |
| -s | --source | Relative path to the font directory. Can be used without any parameter as last argument. | - |
| -t | --target | Relative path to the css file. By default that file is appended to. It is created if it doesn't exist. | - |
| -v | --verbose | Verbose outputs for debugging purposes. | false |

## Limitations

The package checks the filename for the name of the font-weights (e.g. light, bold, black, ...) as well as for the
keyword 'italic'. If that information isn't in the fontname, the tool won't work as expected.