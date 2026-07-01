import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, FlowContent } from "@vanilla-ts/core";
import { Text } from "./Text.js";


/**
 * Section component (`<section>`).
 */
export class Section<Child extends FlowContent = FlowContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Section component.
     * @param children The content for the `<section>` element.
     */
    constructor(...children: Children) {
        super("section");
        this.append(...children.map(child => typeof child === "string" ? <Child><unknown>new Text(child) : child));
    }
}

/**
 * Factory for `Section` components.
 */
export class SectionFactory<Child extends FlowContent = FlowContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Section<Child>> {
    /**
     * Create, set up and return Section component.
     * @param children The content for the `<section>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Section component.
     */
    public section(children?: string | Child | Children, data?: T): Section<Child> {
        return this.setupComponent(
            !children
                ? new Section<Child>()
                : Array.isArray(children)
                    ? new Section<Child>(...children)
                    : new Section<Child>(children),
            data
        );
    }
}
