console.time("app init");

import { WrappedDOMElementComponentWithChildren } from "@vanilla-ts/core";
import { P } from "../../src/P.js";


const appRoot = new WrappedDOMElementComponentWithChildren(document.getElementById("app") || document.body);
appRoot.append(
    new P("Hello world!")
);

console.timeEnd("app init");
