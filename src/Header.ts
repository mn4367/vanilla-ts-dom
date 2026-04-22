import { ComponentFactory, ElementComponentWithChildren, FlowContent } from "@vanilla-ts/core";
import { Text } from "./Text.js";


/**
 * Header component (`<header>`).
 */
export class Header<Child extends FlowContent = FlowContent, EventMap extends HTMLElementEventMap = HTMLElementEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Header component.
     * @param children The content for the `<header>` element.
     */
    constructor(...children: Children) {
        super("header");
        this.append(...children.map(child => typeof child === "string" ? <Child><unknown>new Text(child) : child));
    }
}

/**
 * Factory for `Header` components.
 */
export class HeaderFactory<Child extends FlowContent = FlowContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Header<Child>> {
    /**
     * Create, set up and return Header component.
     * @param children The content for the `<header>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Header component.
     */
    public header(children?: string | Child | Children, data?: T): Header<Child> {
        return this.setupComponent(
            !children
                ? new Header<Child>()
                : Array.isArray(children)
                    ? new Header<Child>(...children)
                    : new Header<Child>(children),
            data
        );
    }
}
