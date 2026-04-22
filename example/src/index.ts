console.time("app init");

import { WrappedDOMElementComponentWithChildren } from "@vanilla-ts/core";
import { Br } from "../../src/Br.js";
import { Code } from "../../src/Code.js";
import { Div } from "../../src/Div.js";
import { Footer } from "../../src/Footer.js";
import { Header } from "../../src/Header.js";
import { LiUl } from "../../src/LiUl.js";
import { Main } from "../../src/Main.js";
import { Nav } from "../../src/Nav.js";
import { P } from "../../src/P.js";
import { Text } from "../../src/Text.js";
import { Ul } from "../../src/Ul.js";


const now = () => new Date().toLocaleString(navigator.language, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
});

const header = new Header("Header");

const footer = new Footer("Footer");

const sideBar = new Div()
    .addClass("sidebar")
    .append(
        new Nav()
            .append(
                new Text("Navigation"),
                new Ul(
                    new LiUl("Intro"),
                    new LiUl("Usage"),
                    new LiUl("Components")
                )
            )
    );

let date: Text;
const content = new Div()
    .addClass("content")
    .append(
        new P(
            "Hello  world!",
            new Br(), new Br(),
            "Example usage for the ",
            new Code("Vanilla.ts DOM"),
            " components.",
            new Br(), new Br(),
            date = new Text(now())
        )
    );

setInterval(() => {
    date.text(now());
}, 1000);

const main = new Main()
    .append(
        sideBar,
        content
    );

const appRoot = new WrappedDOMElementComponentWithChildren(document.body);
appRoot.append(header, main, footer);

console.timeEnd("app init");
