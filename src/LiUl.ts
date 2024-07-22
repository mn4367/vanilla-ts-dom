import { ComponentFactory, ElementComponentWithChildren, Phrase } from "@vanilla-ts/core";


/**
 * List item component (`<li>`) for unordered lists (`<ul>`).
 */
export class LiUl<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLLIElement, EventMap> {
    /**
     * Create LiUl component.
     * @param phrase The phrasing content for the `<li>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("li");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for LiUl components (for unordered lists (`<ul>`)).
 */
export class LiUlFactory<T> extends ComponentFactory<LiUl> {
    /**
     * Create, set up and return LiUl component.
     * @param phrase The phrasing content for the `<li>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns LiUl component.
     */
    public liUl(phrase?: Phrase | Phrase[], data?: T): LiUl {
        return this.setupComponent(
            !phrase
                ? new LiUl()
                : Array.isArray(phrase)
                    ? new LiUl(...phrase)
                    : new LiUl(phrase),
            data
        );
    }
}
