import * as React from 'react';
import bind from 'bind-decorator';
import * as GoldenLayout from 'golden-layout'
import {ReactComponentConfig} from 'golden-layout'
import CodeEditor from "../components/CodeEditor";
import GamePreviewer from "../components/GamePreviewer";
import {ISplitPanProps} from "./globalService";
import * as $ from 'jquery';
import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-dark-theme.css";

const layout = {
  settings: {
    hasHeaders: false,
    showMaximiseIcon: false,
    showPopoutIcon: false
  },
  content: [{
    type: "row",
    content: [
      {
        type: "react-component",
        title: "代码编辑器",
        component: CodeEditor.ID,
        isClosable: false,
        width: 14,
      },
      {
        type: "react-component",
        title: "实时",
        component: GamePreviewer.ID,
        isClosable: false,
        width: 18,
      }
    ]
  }]
};

export class SplitPan extends React.Component<any> {
  private instance: GoldenLayout;

  constructor(props: ISplitPanProps) {
    super(props);

    this.setProps(layout.content, props);

    this.instance = new GoldenLayout(layout);

    this.instance.registerComponent(CodeEditor.ID, CodeEditor);
    this.instance.registerComponent(GamePreviewer.ID, GamePreviewer);
  }

  @bind
  private updateRef(ref: any) {
    this.instance.container = $(ref);
  }

  componentDidMount() {
    this.instance.init();
    setTimeout(() => {
      this.resize();
    });
    window.addEventListener('resize', this.resize);
  }

  @bind
  resize() {
    this.instance.updateSize();
  }

  componentWillUnmount() {
    this.instance.destroy();
    window.removeEventListener('resize', this.resize)
  }

  render() {
    return <div
      ref={this.updateRef}
      className="primary"
    />;
  }

  private setProps(config: GoldenLayout.ItemConfigType[], props: any) {
    for (const item of config) {
      if (item && item.content) {
        this.setProps(item.content, props);
      } else {
        (item as ReactComponentConfig).props = props;
      }
    }
  }
}

