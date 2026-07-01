import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, FlowContent } from "@vanilla-ts/core";
import { Text } from "./Text.js";


/**
 * Main component (`<main>`).
 */
export class Main<Child extends FlowContent = FlowContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Main component.
     * @param children The content for the `<main>` element.
     */
    constructor(...children: Children) {
        super("main");
        this.append(...children.map(child => typeof child === "string" ? <Child><unknown>new Text(child) : child));
    }
}

/**
 * Factory for `Main` components.
 */
export class MainFactory<Child extends FlowContent = FlowContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Main<Child>> {
    /**
     * Create, set up and return Main component.
     * @param children The content for the `<main>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Main component.
     */
    public main(children?: string | Child | Children, data?: T): Main<Child> {
        return this.setupComponent(
            !children
                ? new Main<Child>()
                : Array.isArray(children)
                    ? new Main<Child>(...children)
                    : new Main<Child>(children),
            data
        );
    }
}
