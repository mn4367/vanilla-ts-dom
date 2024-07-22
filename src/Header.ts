import { ComponentFactory, ElementComponentWithChildren, Phrase } from "@vanilla-ts/core";


/**
 * Header component (`<header>`).
 */
export class Header<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLElement, EventMap> {
    /**
     * Create Header component.
     * @param phrase The phrasing content for the `<header>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("header");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for Header components.
 */
export class HeaderFactory<T> extends ComponentFactory<Header> {
    /**
     * Create, set up and return Header component.
     * @param phrase The phrasing content for the `<header>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Header component.
     */
    public header(phrase?: Phrase | Phrase[], data?: T): Header {
        return this.setupComponent(
            !phrase
                ? new Header()
                : Array.isArray(phrase)
                    ? new Header(...phrase)
                    : new Header(phrase),
            data
        );
    }
}
