import * as React from 'react';
import * as $ from 'jquery';
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
import {APITemplate} from '../common/api-template';
import {SplitPan} from './splitPan';
import {GlobalService} from './globalService';
import {Memoize} from 'lodash-decorators';
import bind from "bind-decorator";

class Playground extends React.Component {
  private globalController: GlobalService;

  constructor(props: any) {
    super(props);
    this.globalController = new GlobalService;
    this.globalController.register(this);
  }

  async componentDidMount() {
    const resp = await fetch('example-scripts/hello-world.avs');
    const content = await resp.text();
    await this.globalController.flushCode(content);
  }

  componentWillUnmount() {

  }

  @bind
  async handleRun() {
    const playFrame = $('#avg-player')[0] as HTMLIFrameElement;
    const contentWin = playFrame.contentWindow;
    if (contentWin) {
      contentWin.postMessage({OP: 'RunStory', data: {script: await this.globalController.getCode()}}, '*');

      Toaster.create({autoFocus: true, usePortal: true}, document.body).show({
        message: '运行成功',
        icon: 'tick',
        intent: Intent.SUCCESS,
      });
    }
  };

  handleReload = () => {
    const playFrame = $('#avg-player')[0] as HTMLIFrameElement;
    const contentWin = playFrame.contentWindow;
    if (contentWin) {
      contentWin.postMessage({OP: 'ReloadPlayer'}, '*');
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
        const handler = async () => {
          await this.globalController.insert(api.template);
          await this.globalController.focus();
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
      <div id="main" className={this.globalController.isDark ? 'bp3-dark' : ''}>
        {/* <AnnouncementBoard /> */}
        <Navbar>
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
            <Button icon="flash" minimal={false} onClick={this.globalController.toggleTheme}/>

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
        <SplitPan global={this.globalController}/>
      </div>
    );
  }
}

export default Playground;
