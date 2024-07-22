import { ComponentFactory, ElementComponentWithChildren, Phrase, ValueAttr, mixinDOMAttributes } from "@vanilla-ts/core";


/**
 * List item component (`<li>`) for ordered lists (`<ol>`).
 */
export class LiOl<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLLIElement, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create LiOl component.
     * @param value The numeric value for the `<li>` element.
     * @param phrase The phrasing content for the `<li>` element.
     */
    constructor(value?: number, ...phrase: Phrase[]) {
        super("li");
        value !== undefined
            ? this.value(value)
            : undefined;
        phrase.length === 0 || this.phrase(...phrase);
    }

    static {
        /** Mixin additional DOM attributes. */
        mixinDOMAttributes(
            LiOl,
            ValueAttr<HTMLLIElement>
        );
    }
}

/** Augment class definition with the DOM attributes introduced by `mixinDOMAttributes()` above. */
export interface LiOl<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    ValueAttr<HTMLLIElement, EventMap> { }

/**
 * Factory for LiOl components (for ordered lists (`<ol>`)).
 */
export class LiOlFactory<T> extends ComponentFactory<LiOl> {
    /**
     * Create, set up and return LiOl component.
     * @param value The numeric value for the `<li>` element.
     * @param phrase The phrasing content for the `<li>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns LiOl component.
     */
    public liOl(value?: number, phrase?: Phrase | Phrase[], data?: T): LiOl {
        return this.setupComponent(
            !phrase
                ? new LiOl(value)
                : Array.isArray(phrase)
                    ? new LiOl(value, ...phrase)
                    : new LiOl(value, phrase),
            data
        );
    }
}
