import { ComponentFactory, ElementComponentWithChildren, Phrase } from "@vanilla-ts/core";


/**
 * I component (`<i>`).
 */
export class I<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLElement, EventMap> {
    /**
     * Create I component.
     * @param phrase The phrasing content for the `<i>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("i");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for I components.
 */
export class IFactory<T> extends ComponentFactory<I> {
    /**
     * Create, set up and return I component.
     * @param phrase The phrasing content for the `<i>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns I component.
     */
    public i(phrase?: Phrase | Phrase[], data?: T): I {
        return this.setupComponent(
            !phrase
                ? new I()
                : Array.isArray(phrase)
                    ? new I(...phrase)
                    : new I(phrase),
            data
        );
    }
}
