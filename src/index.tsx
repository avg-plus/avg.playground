import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import registerServiceWorker from "./registerServiceWorker";
import { FocusStyleManager } from "@blueprintjs/core";

window.React = React;
window.ReactDOM = ReactDOM;

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
