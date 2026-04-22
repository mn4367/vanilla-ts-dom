import { ComponentFactory, ElementComponentWithChildren, FlowContent } from "@vanilla-ts/core";
import { Text } from "./Text.js";


/**
 * List item component (`<li>`), mainly for unordered lists (`<ul>`) but also other types of lists
 * like, for example, menus (`<menu>`).
 */
export class LiUl<Child extends FlowContent = FlowContent, EventMap extends HTMLElementEventMap = HTMLElementEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLLIElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create LiUl component.
     * @param children The content for the `<li>` element.
     */
    constructor(...children: Children) {
        super("li");
        this.append(...children.map(child => typeof child === "string" ? <Child><unknown>new Text(child) : child));
    }
}

/**
 * Factory for `LiUl` components (for unordered lists (`<ul>`)) but also other types of lists like,
 * for example, menus (`<menu>`).
 */
export class LiUlFactory<Child extends FlowContent = FlowContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<LiUl<Child>> {
    /**
     * Create, set up and return LiUl component.
     * @param children The content for the `<li>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns LiUl component.
     */
    public liUl(children?: string | Child | Children, data?: T): LiUl<Child> {
        return this.setupComponent(
            !children
                ? new LiUl<Child>()
                : Array.isArray(children)
                    ? new LiUl<Child>(...children)
                    : new LiUl<Child>(children),
            data
        );
    }
}
