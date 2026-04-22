import { ComponentFactory, ElementComponentWithChildren, PhrasingContent } from "@vanilla-ts/core";


/**
 * Span component (`<span>`).
 */
export class Span<Child extends PhrasingContent = PhrasingContent, EventMap extends HTMLElementEventMap = HTMLElementEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLSpanElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Span component.
     * @param phrase The phrasing content for the `<span>` element.
     */
    constructor(...phrase: Children) {
        super("span");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * Factory for `Span` components.
 */
export class SpanFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Span<Child>> {
    /**
     * Create, set up and return Span component.
     * @param phrase The phrasing content for the `<span>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Span component.
     */
    public span(phrase?: string | Child | Children, data?: T): Span<Child> {
        return this.setupComponent(
            !phrase
                ? new Span<Child>()
                : Array.isArray(phrase)
                    ? new Span<Child>(...phrase)
                    : new Span<Child>(phrase),
            data
        );
    }
}
