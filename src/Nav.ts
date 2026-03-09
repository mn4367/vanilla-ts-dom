import { AnyType, ComponentFactory, ElementComponentWithChildren, INodeComponent } from "@vanilla-ts/core";


/**
 * Navigation component Nav (`<nav>`).
 */
export class Nav<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLElement, EventMap> {
    /**
     * Create Nav component.
     * @param children Children to be appended to this navigation component.
     */
    constructor(...children: (INodeComponent<Node> | undefined | null)[]) {
        super("nav");
        this.append(...children);
    }
}

/**
 * Factory for Nav components.
 */
export class NavFactory extends ComponentFactory<Nav> {
    /**
     * Create, set up and return Nav component.
     * @param children Children to be appended to this navigation component.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Nav component.
     */
    public nav(children?: INodeComponent<Node>[], data?: AnyType): Nav {
        return this.setupComponent(
            children
                ? new Nav(...children)
                : new Nav(),
            data
        );

    }
}
