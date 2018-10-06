import * as React from "react";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/github";
// import "brace/theme/ambiance";
import "brace/theme/monokai";

class CodeEditor extends React.Component<{
  code: string;
  onCodeChanged: (code: string) => void;
  onEditorRef: (ref: any) => void;
}> {
  // private editor: any;
  private rawEditor: any;

  state = {
    code: ""
  };

  render() {
    return (
      <AceEditor
        ref={r => this.handleEditorRef(r)}
        defaultValue={this.state.code}
        value={this.props.code}
        style={{ width: "100%", height: "100%" }}
        mode="javascript"
        theme="monokai"
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

  handleChange(value: string, event?: any) {
    this.props.onCodeChanged && this.props.onCodeChanged(value);
  }

  handleEditorRef(ref: any) {
    console.log(ref);
    this.rawEditor = ref;
    this.props.onEditorRef && this.props.onEditorRef(this);
  }

  public insert(text: string) {
    const editor = this.rawEditor.editor;
    if (editor) {
      const session = editor.session;
      session.insert(
        {
          row: session.getLength(),
          column: 0
        },
        "\n" + text
      );
    }
  }

  public setTheme(theme: string) {
    // this.rawEditor.props.theme = theme;
    this.rawEditor.editor.setTheme("brace/theme/github");
  }

  public getTheme() {
    return this.rawEditor.props.theme;
  }

  componentDidMount() {}
}

export default CodeEditor;
