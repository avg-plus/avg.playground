import * as React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/xcode';
// import "brace/theme/ambiance";
import 'brace/theme/monokai';
import bind from 'bind-decorator';
import { CodeEditorService } from './controller';
import { Editor } from 'brace';
import { saveCommand } from './command/save';

export interface ICodeEditorProps {
  code: string;
  isDark: boolean;
  controller: CodeEditorService;
  onCodeChanged?: (code: string) => void;
}

class CodeEditor extends React.Component<ICodeEditorProps> {
  private editor: Editor;

  state = {
    code: '',
  };

  render() {
    return (
      <AceEditor
        ref={this.handleEditorRef}
        defaultValue={this.state.code}
        value={this.props.code}
        style={{ width: '100%', height: '100%' }}
        mode="javascript"
        theme={this.props.isDark? 'monokai' : 'xcode'}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={false}
        // tslint:disable-next-line:jsx-no-bind
        onChange={this.handleChange.bind(this)}
        enableLiveAutocompletion={true}
        fontSize={16}
      />
    );
  }

  private handleChange(value: string, event?: any) {
    this.props.onCodeChanged && this.props.onCodeChanged(value);
  }

  @bind
  private handleEditorRef(ref: any) {
    if (this.editor === ref) {
      return;
    }

    this.editor = ref.editor;
    this.props.controller.setRef(ref.editor);
    this.registerCommands();
  }

  private registerCommands() {
    const editor = this.editor;
    editor.commands.addCommands([
      saveCommand,
    ]);
  }
}

export default CodeEditor;
