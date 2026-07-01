import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, FlowContent, mixinDOMProperties, ValueAttr } from "@vanilla-ts/core";
import { Text } from "./Text.js";


/**
 * List item component (`<li>`) for ordered lists (`<ol>`).
 */
export class LiOl<Child extends FlowContent = FlowContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLLIElement, Child, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;

    /**
     * Create LiOl component.
     * @param value The numeric value for the `<li>` element.
     * @param children The content for the `<li>` element.
     */
    constructor(value?: number, ...children: Children) {
        super("li");
        value !== undefined && this.value(value);
        this.append(...children.map(child => typeof child === "string" ? <Child><unknown>new Text(child) : child));
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            ValueAttr<HTMLLIElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface LiOl<Child extends FlowContent = FlowContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends // eslint-disable-line jsdoc/require-jsdoc,@typescript-eslint/no-empty-object-type,@typescript-eslint/no-unused-vars
    ValueAttr<HTMLLIElement, EventMap> { }

/**
 * Factory for `LiOl` components (for ordered lists (`<ol>`)).
 */
export class LiOlFactory<Child extends FlowContent = FlowContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<LiOl<Child>> {
    /**
     * Create, set up and return LiOl component.
     * @param value The numeric value for the `<li>` element.
     * @param children The content for the `<li>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns LiOl component.
     */
    public liOl(value?: number, children?: string | Child | Children, data?: T): LiOl<Child> {
        return this.setupComponent(
            !children
                ? new LiOl<Child>(value)
                : Array.isArray(children)
                    ? new LiOl<Child>(value, ...children)
                    : new LiOl<Child>(value, children),
            data
        );
    }
}
