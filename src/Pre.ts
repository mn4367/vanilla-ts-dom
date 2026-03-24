import { ComponentFactory, ElementComponentWithChildren, Phrase, Phrases } from "@vanilla-ts/core";


/**
 * Pre component (`<pre>`).
 */
export class Pre<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLPreElement, EventMap> {
    /**
     * Create Pre component.
     * @param phrase The phrasing content for the `<pre>` element.
     */
    constructor(...phrase: Phrases) {
        super("pre");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * Factory for `Pre` components.
 */
export class PreFactory<T> extends ComponentFactory<Pre> {
    /**
     * Create, set up and return Pre component.
     * @param phrase The phrasing content for the `<pre>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Pre component.
     */
    public pre(phrase?: Phrase | Phrases, data?: T): Pre {
        return this.setupComponent(
            !phrase
                ? new Pre()
                : Array.isArray(phrase)
                    ? new Pre(...phrase)
                    : new Pre(phrase),
            data
        );
    }
}
