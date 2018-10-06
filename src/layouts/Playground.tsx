import * as React from 'react';
import CodeEditor from '../components/CodeEditor';
import * as $ from 'jquery';

import GamePreviewer from '../components/GamePreviewer';
import {
  Alignment,
  Button,
  ButtonGroup,
  Classes,
  IconName,
  Intent,
  Menu,
  MenuItem,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Popover,
  Position,
  Toaster,
} from '@blueprintjs/core';
import { APITemplate } from '../common/api-template';
import bind from 'bind-decorator';
import { SplitPan } from './splitPan';
import { CodeEditorService } from '../components/CodeEditor/controller';
import { Memoize } from 'lodash-decorators';

class Playground extends React.Component {
  state = {
    isDark: !!localStorage.getItem('isDark'),
    code  : '',
  };
  private editorController: CodeEditorService;

  componentWillMount() {
    this.editorController = new CodeEditorService;
  }

  async componentDidMount() {
    this.setState({
      code: await fetch('example-scripts/hello-world.avs').then(resp => resp.text()),
    });
    this.editorController.flushCode();
  }

  @bind
  handleCodeChanged(value: string, event?: any) {
    this.setState({ code: value });
  }

  handleRun = () => {
    const playFrame = $('#avg-player')[0] as HTMLIFrameElement;
    const contentWin = playFrame.contentWindow;
    if (contentWin) {
      contentWin.postMessage({ OP: 'RunStory', data: { script: this.state.code } }, '*');

      Toaster.create({ autoFocus: true, usePortal: true }, document.body).show({
        message: '运行成功',
        icon   : 'tick',
        intent : Intent.SUCCESS,
      });
    }
  };

  @bind
  private handleTheme() {
    const isDark = !this.state.isDark;
    this.setState({ isDark });
    localStorage.setItem('isDark', isDark? 'dark' : '');
  };

  handleReload = () => {
    const playFrame = $('#avg-player')[0] as HTMLIFrameElement;
    const contentWin = playFrame.contentWindow;
    if (contentWin) {
      contentWin.postMessage({ OP: 'ReloadPlayer' }, '*');
    }
  };

  handleGo = (url: string) => {
    window.open(url);
  };

  handleDocumentClick = () => {
    window.open();
  };

  @Memoize
  private getAPIMenus() {
    return APITemplate.map((apiClass, index) => {
      const subMenus = apiClass.apis.map((api, index) => {
        const handler = () => {
          this.editorController.insert(api.template);
          setTimeout(() => {
            this.editorController.focus();
          }, 0);
        };

        return <MenuItem
          key={'menu_item_' + index}
          text={api.name}
          onClick={handler}
        />;
      });

      return <Popover
        key={'menu_pop_' + index}
        content={<Menu>{subMenus}</Menu>}
        position={Position.BOTTOM}
      >
        <Button icon={apiClass.icon as IconName} rightIcon="caret-down" text={apiClass.class}/>
      </Popover>;
    });
  };

  render() {
    return (
      <div id="main" style={{ width: '100%', height: '100%' }} className={this.state.isDark? 'bp3-dark' : ''}>
        {/* <AnnouncementBoard /> */}
        <Navbar fixedToTop={true}>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>AVGPlus Playground</NavbarHeading>
            <NavbarDivider/>

            <ButtonGroup minimal={false}>
              <Button icon="play" intent="success" text="运行" onClick={this.handleRun}/>
              <Button icon="refresh" intent="danger" text="重新加载" onClick={this.handleReload}/>
            </ButtonGroup>
            <NavbarDivider/>
            {this.getAPIMenus()}
          </NavbarGroup>

          {/* <Navbar.Group align={Alignment.LEFT}></Navbar.Group> */}

          <Navbar.Group align={Alignment.RIGHT}>
            <Button icon="flash" minimal={false} onClick={this.handleTheme}/>

            <Button
              className={Classes.MINIMAL}
              icon="home"
              text="首页"
              onClick={this.handleGo.bind(this, 'http://avg-engine.com')}
            />
            <Button
              className={Classes.MINIMAL}
              icon="manual"
              text="使用文档"
              onClick={this.handleGo.bind(this, 'http://docs.avg-engine.com')}
            />
          </Navbar.Group>
        </Navbar>
        <div id="layout-containter" style={{ width: '100%', height: '100%' }}>
          <SplitPan isDark={this.state.isDark}>
            <CodeEditor
              controller={this.editorController}
              isDark={this.state.isDark}
              code={this.state.code}
              onCodeChanged={this.handleCodeChanged}
            />
            <GamePreviewer/>
          </SplitPan>
        </div>
      </div>
    );
  }
}

export default Playground;
