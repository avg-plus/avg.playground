import * as React from "react";
import CodeEditor from "../components/CodeEditor";
import * as GoldenLayout from "golden-layout";
import * as $ from "jquery";
import axios from "axios";

import "golden-layout/src/css/goldenlayout-base.css";
// import "golden-layout/src/css/goldenlayout-light-theme.css";
import "golden-layout/src/css/goldenlayout-dark-theme.css";
import GamePreviewer from "../components/GamePreviewer";
import {
  Navbar,
  NavbarGroup,
  Alignment,
  NavbarHeading,
  NavbarDivider,
  Button,
  Classes,
  ButtonGroup,
  Toaster,
  Intent,
  Popover,
  Menu,
  Position,
  MenuItem,
  IconName
} from "@blueprintjs/core";
import { APITemplate } from "../common/api-template";

class Playground extends React.Component {
  instance: GoldenLayout;
  editorRef: CodeEditor;

  state = {
    code: "",
    theme: "bp3-dark"
  };

  async componentDidMount() {
    this.setState({
      code: (await axios.get("example-scripts/hello-world.avs")).data
    });

    this.instance = new GoldenLayout(
      {
        settings: {
          // hasHeaders: false
          showMaximiseIcon: false,
          showPopoutIcon: false
        },
        content: [
          {
            type: "row",
            content: [
              {
                type: "react-component",
                title: "代码编辑器",
                component: "code-editor",
                isClosable: false,
                width: 14,
                props: {
                  onEditorRef: (ref: any) => (this.editorRef = ref),
                  code: this.state.code,
                  onCodeChanged: this.handleCodeChanged.bind(this)
                }
              },
              {
                type: "react-component",
                title: "实时",
                component: "game-previewer",
                isClosable: false,
                width: 18,
                props: {}
              }
            ]
          }
        ]
      },
      $("#layout-containter")
    );

    this.instance.registerComponent("code-editor", CodeEditor);
    this.instance.registerComponent("game-previewer", GamePreviewer);
    $(window).resize(() => {
      this.instance.updateSize();
    });

    this.instance.init();
  }

  handleCodeChanged(value: string, event?: any) {
    this.setState({ code: value });
  }

  handleRun = () => {
    const playFrame = $("#avg-player")[0] as HTMLIFrameElement;
    const contentWin = playFrame.contentWindow;
    if (contentWin) {
      contentWin.postMessage({ OP: "RunStory", data: { script: this.state.code } }, "*");

      Toaster.create({ autoFocus: true, usePortal: true }, document.body).show({
        message: "运行成功",
        icon: "tick",
        intent: Intent.SUCCESS
      });
    }
  };

  handleTheme = () => {
    this.setState({
      theme: this.state.theme === "bp3-dark" ? "" : "bp3-dark"
    });
  };

  handleReload = () => {
    const playFrame = $("#avg-player")[0] as HTMLIFrameElement;
    const contentWin = playFrame.contentWindow;
    if (contentWin) {
      contentWin.postMessage({ OP: "ReloadPlayer" }, "*");
    }
  };

  handleGo = (url: string) => {
    window.open(url);
  };

  handleDocumentClick = () => {
    window.open();
  };

  getAPIMenus = () => {
    const menus: any[] = [];
    let apis: any[] = [];

    APITemplate.forEach(apiClass => {
      menus.push(
        <Popover
          content={
            <Menu>
              {(apis = [])}
              {apiClass.apis.forEach(api => {
                apis.push(
                  <MenuItem
                    text={api.name}
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={() => {
                      console.log(api.template);
                    }}
                  />
                );
              })}
            </Menu>
          }
          position={Position.BOTTOM}
        >
          <Button icon={apiClass.icon as IconName} rightIcon="caret-down" text={apiClass.class} />
        </Popover>
      );
    });

    return menus;
  };

  render() {
    return (
      <div id="main" style={{ width: "100%", height: "100%" }} className={this.state.theme}>
        {/* <AnnouncementBoard /> */}
        <Navbar fixedToTop={true}>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>AVGPlus Playground</NavbarHeading>
            <NavbarDivider />

            <ButtonGroup minimal={false}>
              <Button icon="play" intent="success" text="运行" onClick={this.handleRun} />
              <Button icon="refresh" intent="danger" text="重新加载" onClick={this.handleReload} />
            </ButtonGroup>
            <NavbarDivider />
            {this.getAPIMenus()}
          </NavbarGroup>

          {/* <Navbar.Group align={Alignment.LEFT}></Navbar.Group> */}

          <Navbar.Group align={Alignment.RIGHT}>
            <Button icon="flash" minimal={false} onClick={this.handleTheme} />

            <Button
              className={Classes.MINIMAL}
              icon="home"
              text="首页"
              onClick={this.handleGo.bind(this, "http://avg-engine.com")}
            />
            <Button
              className={Classes.MINIMAL}
              icon="manual"
              text="使用文档"
              onClick={this.handleGo.bind(this, "http://docs.avg-engine.com")}
            />
          </Navbar.Group>
        </Navbar>
        <div id="layout-containter" style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }
}

export default Playground;
