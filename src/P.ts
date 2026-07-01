import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, PhrasingContent } from "@vanilla-ts/core";


/**
 * Paragraph component (`<p>`).
 */
export class P<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLParagraphElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create P component.
     * @param phrase The phrasing content for the `<p>` element.
     */
    constructor(...phrase: Children) {
        super("p");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * Factory for `P` components.
 */
export class PFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<P<Child>> {
    /**
     * Create, set up and return P component.
     * @param phrase The phrasing content for the `<p>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns P component.
     */
    public p(phrase?: string | Child | Children, data?: T): P<Child> {
        return this.setupComponent(
            !phrase
                ? new P<Child>()
                : Array.isArray(phrase)
                    ? new P<Child>(...phrase)
                    : new P<Child>(phrase),
            data
        );
    }
}
