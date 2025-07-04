import { ComponentFactory, ElementComponentWithChildren, Phrase, Phrases } from "@vanilla-ts/core";


/**
 * Section component (`<section>`).
 */
export class Section<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLElement, EventMap> {
    /**
     * Create Section component.
     * @param phrase The phrasing content for the `<section>` element.
     */
    constructor(...phrase: Phrases) {
        super("section");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for Section components.
 */
export class SectionFactory<T> extends ComponentFactory<Section> {
    /**
     * Create, set up and return Section component.
     * @param phrase The phrasing content for the `<section>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Section component.
     */
    public section(phrase?: Phrase | Phrases, data?: T): Section {
        return this.setupComponent(
            !phrase
                ? new Section()
                : Array.isArray(phrase)
                    ? new Section(...phrase)
                    : new Section(phrase),
            data
        );
    }
}
