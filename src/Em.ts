import { ComponentFactory, ElementComponentWithChildren, Phrase } from "@vanilla-ts/core";


/**
 * Em component (`<em>`).
 */
export class Em<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLElement, EventMap> {
    /**
     * Create Em component.
     * @param phrase The phrasing content for the `<em>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("em");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for Em components.
 */
export class EmFactory<T> extends ComponentFactory<Em> {
    /**
     * Create, set up and return Em component.
     * @param phrase The phrasing content for the `<em>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Em component.
     */
    public em(phrase?: Phrase | Phrase[], data?: T): Em {
        return this.setupComponent(
            !phrase
                ? new Em()
                : Array.isArray(phrase)
                    ? new Em(...phrase)
                    : new Em(phrase),
            data
        );
    }
}
