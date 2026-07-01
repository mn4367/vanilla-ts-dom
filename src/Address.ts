import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, FlowContent } from "@vanilla-ts/core";
import { Text } from "./Text.js";


/**
 * Address component (`<address>`).
 */
export class Address<Child extends FlowContent = FlowContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Address component.
     * @param children The content for the `<address>` element.
     */
    constructor(...children: Children) {
        super("address");
        this.append(...children.map(child => typeof child === "string" ? <Child><unknown>new Text(child) : child));
    }
}

/**
 * Factory for `Address` components.
 */
export class AddressFactory<Child extends FlowContent = FlowContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Address<Child>> {
    /**
     * Create, set up and return Address component.
     * @param children The content for the `<address>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Address component.
     */
    public address(children?: string | Child | Children, data?: T): Address<Child> {
        return this.setupComponent(
            !children
                ? new Address<Child>()
                : Array.isArray(children)
                    ? new Address<Child>(...children)
                    : new Address<Child>(children),
            data
        );
    }
}
