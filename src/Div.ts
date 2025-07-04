import { ComponentFactory, ElementComponentWithChildren, Phrase, Phrases } from "@vanilla-ts/core";


/**
 * Div component (`<div>`).
 */
export class Div<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLDivElement, EventMap> {
    /**
     * Create Div component.
     * @param phrase The phrasing content for the `<div>` element.
     */
    constructor(...phrase: Phrases) {
        super("div");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for Div components.
 */
export class DivFactory<T> extends ComponentFactory<Div> {
    /**
     * Create, set up and return Div component.
     * @param phrase The phrasing content for the `<div>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Div component.
     */
    public div(phrase?: Phrase | Phrases, data?: T): Div {
        return this.setupComponent(
            !phrase
                ? new Div()
                : Array.isArray(phrase)
                    ? new Div(...phrase)
                    : new Div(phrase),
            data
        );
    }
}
