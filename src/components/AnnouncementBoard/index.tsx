import * as React from "react";
import { Dialog, Classes, AnchorButton, Button, Intent } from "@blueprintjs/core";

class AnnouncementBoard extends React.Component<any> {
  state = {
    isOpen: true
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <Dialog className="" icon="info-sign" isOpen={this.state.isOpen} title="通知">
        <div className={Classes.DIALOG_BODY}>AVGPlus 还在测试阶段，如有任何问题，请前往论坛告知我们。</div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={this.handleClose}>我知道了</Button>
            <AnchorButton intent={Intent.PRIMARY} href="http://bbs.avg-engine.com" target="_blank">
              前往 AVGPlus 社区
            </AnchorButton>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default AnnouncementBoard;
