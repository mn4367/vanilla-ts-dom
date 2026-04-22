import { ComponentFactory, ElementComponentWithChildren, PhrasingContent } from "@vanilla-ts/core";


/**
 * Em component (`<em>`).
 */
export class Em<Child extends PhrasingContent = PhrasingContent, EventMap extends HTMLElementEventMap = HTMLElementEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Em component.
     * @param phrase The phrasing content for the `<em>` element.
     */
    constructor(...phrase: Children) {
        super("em");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * Factory for `Em` components.
 */
export class EmFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Em<Child>> {
    /**
     * Create, set up and return Em component.
     * @param phrase The phrasing content for the `<em>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Em component.
     */
    public em(phrase?: string | Child | Children, data?: T): Em<Child> {
        return this.setupComponent(
            !phrase
                ? new Em<Child>()
                : Array.isArray(phrase)
                    ? new Em<Child>(...phrase)
                    : new Em<Child>(phrase),
            data
        );
    }
}
