import { ComponentFactory, ElementComponentWithChildren, PhrasingContent } from "@vanilla-ts/core";


/**
 * B component (`<b>`).
 */
export class B<Child extends PhrasingContent = PhrasingContent, EventMap extends HTMLElementEventMap = HTMLElementEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create B component.
     * @param phrase The phrasing content for the `<b>` element.
     */
    constructor(...phrase: Children) {
        super("b");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * Factory for `B` components.
 */
export class BFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<B<Child>> {
    /**
     * Create, set up and return B component.
     * @param phrase The phrasing content for the `<b>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns B component.
     */
    public b(phrase?: string | Child | Children, data?: T): B<Child> {
        return this.setupComponent(
            !phrase
                ? new B<Child>()
                : Array.isArray(phrase)
                    ? new B<Child>(...phrase)
                    : new B<Child>(phrase),
            data
        );
    }
}
