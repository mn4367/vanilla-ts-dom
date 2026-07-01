import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, PhrasingContent } from "@vanilla-ts/core";


/**
 * I component (`<i>`).
 */
export class I<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create I component.
     * @param phrase The phrasing content for the `<i>` element.
     */
    constructor(...phrase: Children) {
        super("i");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * Factory for `I` components.
 */
export class IFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<I<Child>> {
    /**
     * Create, set up and return I component.
     * @param phrase The phrasing content for the `<i>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns I component.
     */
    public i(phrase?: string | Child | Children, data?: T): I<Child> {
        return this.setupComponent(
            !phrase
                ? new I<Child>()
                : Array.isArray(phrase)
                    ? new I<Child>(...phrase)
                    : new I<Child>(phrase),
            data
        );
    }
}
