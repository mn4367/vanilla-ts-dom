import { ComponentFactory, ElementComponentWithChildren, Phrase } from "@vanilla-ts/core";


/**
 * Footer component (`<footer>`).
 */
export class Footer<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLElement, EventMap> {
    /**
     * Create Footer component.
     * @param phrase The phrasing content for the `<footer>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("footer");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for Footer components.
 */
export class FooterFactory<T> extends ComponentFactory<Footer> {
    /**
     * Create, set up and return Footer component.
     * @param phrase The phrasing content for the `<footer>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Footer component.
     */
    public footer(phrase?: Phrase | Phrase[], data?: T): Footer {
        return this.setupComponent(
            !phrase
                ? new Footer()
                : Array.isArray(phrase)
                    ? new Footer(...phrase)
                    : new Footer(phrase),
            data
        );
    }
}
