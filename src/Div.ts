import { ComponentFactory, ElementComponentWithChildren, FlowContent } from "@vanilla-ts/core";
import { Text } from "./Text.js";


/**
 * Div component (`<div>`).
 */
export class Div<Child extends FlowContent = FlowContent, EventMap extends HTMLElementEventMap = HTMLElementEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLDivElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Div component.
     * @param children The content for the `<div>` element.
     */
    constructor(...children: Children) {
        super("div");
        this.append(...children.map(child => typeof child === "string" ? <Child><unknown>new Text(child) : child));
    }
}

/**
 * Factory for `Div` components.
 */
export class DivFactory<Child extends FlowContent = FlowContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Div<Child>> {
    /**
     * Create, set up and return Div component.
     * @param children The content for the `<div>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Div component.
     */
    public div(children?: string | Child | Children, data?: T): Div<Child> {
        return this.setupComponent(
            !children
                ? new Div<Child>()
                : Array.isArray(children)
                    ? new Div<Child>(...children)
                    : new Div<Child>(children),
            data
        );
    }
}
