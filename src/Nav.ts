import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, FlowContent } from "@vanilla-ts/core";
import { Text } from "./Text.js";


/**
 * Navigation component Nav (`<nav>`).
 */
export class Nav<Child extends FlowContent = FlowContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Nav component.
     * @param children The content for the `<nav>` element.
     */
    constructor(...children: Children) {
        super("nav");
        this.append(...children.map(child => typeof child === "string" ? <Child><unknown>new Text(child) : child));
    }
}

/**
 * Factory for Nav components.
 */
export class NavFactory<Child extends FlowContent = FlowContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Nav<Child>> {
    /**
     * Create, set up and return Nav component.
     * @param children The content for the `<nav>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Nav component.
     */
    public nav(children?: string | Child | Children, data?: T): Nav<Child> {
        return this.setupComponent(
            !children
                ? new Nav<Child>()
                : Array.isArray(children)
                    ? new Nav<Child>(...children)
                    : new Nav<Child>(children),
            data
        );

    }
}
