import { Editor, EditorCommand } from 'brace';
import * as $ from 'jquery';

export const saveCommand: EditorCommand = {
  name   : 'save',
  bindKey: { win: 'Ctrl-S', 'mac': 'Cmd-S' },
  exec(editor: Editor) {
    const uriContent = 'data:application/octet-stream;filename=saved.avs,' + encodeURIComponent(editor.session.getValue());
    const $a = $('<a>').attr({ href: uriContent, download: 'saved.avs' }).appendTo('body');
    $a[0].click();
    setTimeout(() => {
      $a.remove();
    });
  },
};

export const loadCommand: EditorCommand = {
  name   : 'load',
  bindKey: { win: 'Ctrl-O', 'mac': 'Cmd-O' },
  exec(editor: Editor) {
    const $a = $('<input type="file" accept=".avs,.txt,.js" >').appendTo('body');
    $a.one('change', () => {
      const input = $a[0] as HTMLInputElement;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (event: any) {
          editor.selection.clearSelection();
          editor.setValue(event.target.result);
        };
        reader.readAsText(input.files[0]);
      }
      $a.remove();
    });
    $a[0].click();
  },
};
