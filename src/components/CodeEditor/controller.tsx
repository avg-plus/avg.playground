import { Editor } from 'brace';
import bind from 'bind-decorator';
import { ITemplate } from '../../common/api-template.support';

export class CodeEditorService {
  private editor: Editor;

  @bind
  setRef(ref: Editor) {
    Object.assign(window, { __editor: ref }); // for debug
    this.editor = ref;
  }

  @bind
  public flushCode() {
    this.editor.clearSelection();
    this.editor.session.getUndoManager().reset();
    this.editor.moveCursorTo(0, 0);
  }

  @bind
  public insert(text: ITemplate) {
    this.editor.focus();

    const pos = this.editor.getCursorPosition();
    const nextLine = pos.row + 1;

    this.editor.session.insert(
      {
        row   : nextLine,
        column: 0,
      },
      text.text,
    );
    this.editor.clearSelection();

    if (text.cursorStart === -1) {
      this.editor.moveCursorTo(nextLine, 0);
    } else {
      if (text.cursorEnd === -1) {
        this.editor.moveCursorTo(nextLine, text.cursorStart);
      } else {
        this.editor.selection.moveCursorTo(nextLine, text.cursorStart);
        this.editor.selection.selectTo(nextLine, text.cursorEnd);
        this.editor.moveCursorTo(nextLine, text.cursorEnd);
      }
    }
  }

  @bind
  focus() {
    this.editor.renderer.getContainerElement().focus();
    this.editor.focus();
    this.editor.onFocus();
  }
}
