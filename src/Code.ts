import { ComponentFactory, ElementComponentWithChildren, Phrase, Phrases } from "@vanilla-ts/core";


/**
 * Code component (`<code>`).
 */
export class Code<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLElement, EventMap> {
    /**
     * Create Code component.
     * @param phrase The phrasing content for the `<code>` element.
     */
    constructor(...phrase: Phrases) {
        super("code");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * Factory for `Code` components.
 */
export class CodeFactory<T> extends ComponentFactory<Code> {
    /**
     * Create, set up and return Code component.
     * @param phrase The phrasing content for the `<code>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Code component.
     */
    public code(phrase?: Phrase | Phrases, data?: T): Code {
        return this.setupComponent(
            !phrase
                ? new Code()
                : Array.isArray(phrase)
                    ? new Code(...phrase)
                    : new Code(phrase),
            data
        );
    }
}
