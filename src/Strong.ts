import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, PhrasingContent } from "@vanilla-ts/core";


/**
 * Strong component (`<strong>`).
 */
export class Strong<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Strong component.
     * @param phrase The phrasing content for the `<strong>` element.
     */
    constructor(...phrase: Children) {
        super("strong");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * Factory for `Strong` components.
 */
export class StrongFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Strong<Child>> {
    /**
     * Create, set up and return Strong component.
     * @param phrase The phrasing content for the `<strong>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Strong component.
     */
    public strong(phrase?: string | Child | Children, data?: T): Strong<Child> {
        return this.setupComponent(
            !phrase
                ? new Strong<Child>()
                : Array.isArray(phrase)
                    ? new Strong<Child>(...phrase)
                    : new Strong<Child>(phrase),
            data
        );
    }
}
