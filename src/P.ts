import { ComponentFactory, ElementComponentWithChildren, Phrase } from "@vanilla-ts/core";


/**
 * Paragraph component (`<p>`).
 */
export class P<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLParagraphElement, EventMap> {
    /**
     * Create P component.
     * @param phrase The phrasing content for the `<p>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("p");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for P components.
 */
export class PFactory<T> extends ComponentFactory<P> {
    /**
     * Create, set up and return P component.
     * @param phrase The phrasing content for the `<p>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns P component.
     */
    public p(phrase?: Phrase | Phrase[], data?: T): P {
        return this.setupComponent(
            !phrase
                ? new P()
                : Array.isArray(phrase)
                    ? new P(...phrase)
                    : new P(phrase),
            data
        );
    }
}
