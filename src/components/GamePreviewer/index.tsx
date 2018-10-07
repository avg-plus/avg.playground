import * as React from "react";
import { AVGPlayerURL } from "../../common/common";
import {ISplitPanProps} from "../../layouts/globalService";
// import { ContextMenuTarget, MenuItem, Menu, MenuDivider } from "@blueprintjs/core";

class GamePreviewer extends React.PureComponent<ISplitPanProps> {
  static readonly ID = "game-previewer";

  public state = { isContextMenuOpen: false };

  render() {
    return (
      <iframe
        id="avg-player"
        style={{ width: "100%", height: "100%", border: 0 }}
        // src="http://demo.avg-engine.com/"
        src={AVGPlayerURL}
      />
    );
  }

  // public renderContextMenu(e: React.MouseEvent<HTMLElement>) {
  //   return (
  //     <Menu>
  //       <MenuItem icon="refresh" text="重新加载" />
  //       <MenuDivider />
  //       {/* <MenuItem disabled={true} text={`Clicked at (${e.clientX}, ${e.clientY})`} /> */}
  //     </Menu>
  //   );
  // }
}

export default GamePreviewer;
