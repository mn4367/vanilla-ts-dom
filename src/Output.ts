import { ComponentFactory, ElementComponentWithChildren, ForAttr, mixinDOMProperties, NameAttr, Phrase, Phrases } from "@vanilla-ts/core";


/**
 * Output component (`<output>`).
 */
export class Output<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLOutputElement, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create Output component.
     * @param for_ Content of the `for` attribute (single target ID).
     * @param phrase The phrasing content for the `<output>` element.
     */
    constructor(for_?: string, ...phrase: Phrases) {
        super("output");
        for_ && this.for(for_);
        phrase.length > 0 && this.phrase(...phrase);
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            ForAttr<HTMLOutputElement>,
            NameAttr<HTMLOutputElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Output<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    ForAttr<HTMLOutputElement, EventMap>,
    NameAttr<HTMLOutputElement, EventMap> { }

/**
 * Factory for `Output` components.
 */
export class OutputFactory<T> extends ComponentFactory<Output> {
    /**
     * Create, set up and return Output component.
     * @param for_ Content of the `for` attribute (single target ID).
     * @param phrase The phrasing content for the `<output>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Output component.
     */
    public output(for_?: string, phrase?: Phrase | Phrases, data?: T): Output {
        return this.setupComponent(
            !phrase
                ? new Output(for_)
                : Array.isArray(phrase)
                    ? new Output(for_, ...phrase)
                    : new Output(for_, phrase),
            data
        );
    }
}
