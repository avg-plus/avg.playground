import * as React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/xcode';
// import "brace/theme/ambiance";
import 'brace/theme/monokai';
import bind from 'bind-decorator';
import {ISplitPanProps} from '../../layouts/globalService';
import {Editor} from 'brace';
import {saveCommand} from './command/save';

class CodeEditor extends React.Component<ISplitPanProps> {
  static readonly ID = 'CodeEditor';

  private editor: Editor;

  state = {
    code: '',
  };

  render() {
    return (
      <AceEditor
        ref={this.handleEditorRef}
        defaultValue={this.state.code}
        style={{width: '100%', height: '100%'}}
        mode="javascript"
        theme={this.props.global.isDark ? 'monokai' : 'xcode'}
        name="code-editor"
        editorProps={{$blockScrolling: true}}
        showPrintMargin={false}
        enableLiveAutocompletion={true}
        fontSize={16}
      />
    );
  }

  @bind
  private handleEditorRef(ref: any) {
    if (this.editor === ref) {
      return;
    }

    this.editor = ref.editor;
    this.props.global.setRef(ref.editor);
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
