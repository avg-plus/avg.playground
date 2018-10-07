import * as React from 'react';
import {Editor} from 'brace';
import bind from 'bind-decorator';
import {ITemplate} from '../common/api-template.support';
import {Deferred} from 'jquery';

export class GlobalService {
  private waitDefer = Deferred<Editor>();
  private renderRegister: React.Component<any>[] = [];
  private _isDark: boolean = !!localStorage.getItem('isDark');

  @bind
  setRef(ref: Editor) {
    Object.assign(window, {__editor: ref}); // for debug
    this.waitDefer.resolve(ref)
  }

  @bind
  async getCode() {
    const editor = await this.waitDefer;
    return editor.getValue();
  }

  private doRender() {
    for (const elem of this.renderRegister) {
      elem.forceUpdate();
    }
  }

  register(elem: React.Component<any>) {
    this.renderRegister.push(elem)
  }

  @bind
  public async flushCode(newCode: string) {
    const editor = await this.waitDefer;
    editor.setValue(newCode);
    editor.clearSelection();
    editor.session.getUndoManager().reset();
    editor.moveCursorTo(0, 0);
  }

  @bind
  public async insert(text: ITemplate) {
    const editor = await this.waitDefer;
    editor.focus();

    const pos = editor.getCursorPosition();
    const nextLine = pos.row + 1;

    editor.session.insert(
      {
        row: nextLine,
        column: 0,
      },
      text.text,
    );
    editor.clearSelection();

    if (text.cursorStart === -1) {
      editor.moveCursorTo(nextLine, 0);
    } else {
      if (text.cursorEnd === -1) {
        editor.moveCursorTo(nextLine, text.cursorStart);
      } else {
        editor.selection.moveCursorTo(nextLine, text.cursorStart);
        editor.selection.selectTo(nextLine, text.cursorEnd);
        editor.moveCursorTo(nextLine, text.cursorEnd);
      }
    }
  }

  @bind
  public async focus() {
    const editor = await this.waitDefer;
    editor.renderer.getContainerElement().focus();
    editor.focus();
    editor.onFocus();
  }

  @bind
  toggleTheme() {
    this._isDark = !this._isDark;
    localStorage.setItem('isDark', this._isDark ? 'dark' : '');
    this.doRender();
  }

  get isDark() {
    return this._isDark;
  }
}

export interface ISplitPanProps {
  global: GlobalService
}

export const globalProps: ISplitPanProps = {
  global: new GlobalService()
};
