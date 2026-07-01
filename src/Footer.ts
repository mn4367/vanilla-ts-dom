import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, FlowContent } from "@vanilla-ts/core";
import { Text } from "./Text.js";


/**
 * Footer component (`<footer>`).
 */
export class Footer<Child extends FlowContent = FlowContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Footer component.
     * @param children The content for the `<footer>` element.
     */
    constructor(...children: Children) {
        super("footer");
        this.append(...children.map(child => typeof child === "string" ? <Child><unknown>new Text(child) : child));
    }
}

/**
 * Factory for `Footer` components.
 */
export class FooterFactory<Child extends FlowContent = FlowContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Footer<Child>> {
    /**
     * Create, set up and return Footer component.
     * @param children The content for the `<footer>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Footer component.
     */
    public footer(children?: string | Child | Children, data?: T): Footer<Child> {
        return this.setupComponent(
            !children
                ? new Footer<Child>()
                : Array.isArray(children)
                    ? new Footer<Child>(...children)
                    : new Footer<Child>(children),
            data
        );
    }
}
