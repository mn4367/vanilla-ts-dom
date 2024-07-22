import { ComponentFactory, ElementComponentWithChildren, Phrase } from "@vanilla-ts/core";


/**
 * Span component (`<span>`).
 */
export class Span<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLSpanElement, EventMap> {
    /**
     * Create Span component.
     * @param phrase The phrasing content for the `<span>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("span");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for Span components.
 */
export class SpanFactory<T> extends ComponentFactory<Span> {
    /**
     * Create, set up and return Span component.
     * @param phrase The phrasing content for the `<span>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Span component.
     */
    public span(phrase?: Phrase | Phrase[], data?: T): Span {
        return this.setupComponent(
            !phrase
                ? new Span()
                : Array.isArray(phrase)
                    ? new Span(...phrase)
                    : new Span(phrase),
            data
        );
    }
}
