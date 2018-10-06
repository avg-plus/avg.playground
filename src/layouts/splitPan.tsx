import * as React from 'react';
import * as $ from 'jquery';
import bind from 'bind-decorator';
import SplitPane from 'react-split-pane';

interface ISplitPanProps {
  isDark: boolean;
}

export class SplitPan extends React.Component<ISplitPanProps> {
  private dragMask: JQuery<HTMLElement>;

  @bind
  private fixDrag(): void {
    this.dragMask.show();
  }

  @bind
  private unfixDrag(): void {
    this.dragMask.hide();
  }

  componentWillMount() {
    this.dragMask = $('<div id="theDraggingMask"></div>').appendTo('body');
  }

  componentWillUnmount() {
    this.dragMask.remove();
  }

  @bind
  resize(newSize: number) {
    localStorage.setItem('splitSize', newSize.toString() + 'px');
  }

  render() {
    return <SplitPane
      split="vertical"
      allowResize={true}
      minSize="200px"
      maxSize="80%"
      defaultSize={localStorage.getItem('splitSize') || '30%'}
      onChange={this.resize}
      onDragStarted={this.fixDrag}
      onDragFinished={this.unfixDrag}
      resizerClassName={this.props.isDark? 'dark' : 'light'}
    >
      {this.props.children}
    </SplitPane>;
  }
}
