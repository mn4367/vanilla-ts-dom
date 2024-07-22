import { ComponentFactory, ElementComponentWithChildren, Phrase } from "@vanilla-ts/core";


/**
 * Strong component (`<strong>`).
 */
export class Strong<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLElement, EventMap> {
    /**
     * Create Strong component.
     * @param phrase The phrasing content for the `<strong>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("strong");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for Strong components.
 */
export class StrongFactory<T> extends ComponentFactory<Strong> {
    /**
     * Create, set up and return Strong component.
     * @param phrase The phrasing content for the `<strong>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Strong component.
     */
    public strong(phrase?: Phrase | Phrase[], data?: T): Strong {
        return this.setupComponent(
            !phrase
                ? new Strong()
                : Array.isArray(phrase)
                    ? new Strong(...phrase)
                    : new Strong(phrase),
            data
        );
    }
}
