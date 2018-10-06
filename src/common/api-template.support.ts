import { TextEscape } from '../types/textEscape';

export interface ITemplate {
  text: string;
  cursorStart: number;
  cursorEnd: number;
}

export function parseTemplate(text: string): ITemplate {
  text = text.trim();

  const ret = {
    text       : '',
    cursorStart: -1,
    cursorEnd  : -1,
  };
  const textMarker = /%{([a-z]+)}/ig;

  while (true) {
    const m = textMarker.exec(text);
    if (!m) {
      break;
    }

    switch (m[1]) {
      case TextEscape.CursorStart:
        ret.cursorStart = m.index;
        text = text.replace(m[0], '');
        break;
      case TextEscape.CursorEnd:
        ret.cursorEnd = m.index;
        text = text.replace(m[0], '');
        break;
      default:
        console.error('unknown text structure: %s', m[0]);
    }
  }

  ret.text = text + '\n';

  return ret;
}
