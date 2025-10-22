import { ComponentFactory, ElementComponentWithChildren, ForAttr, mixinDOMProperties, Phrase, Phrases } from "@vanilla-ts/core";


/**
 * Label component (`<label>`).
 */
export class Label<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLLabelElement, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create `<label>` component.
     * @param for_ Content of the `for` attribute (single target ID or space separated target IDs).
     * @param phrase The phrasing content for the `<label>` element.
     */
    constructor(for_?: string, ...phrase: Phrases) {
        super("label");
        for_ && this.for(for_);
        phrase.length > 0 && this.phrase(...phrase);
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            ForAttr<HTMLLabelElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Label<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    ForAttr<HTMLLabelElement, EventMap> { }

/**
 * Factory for `Label` components.
 */
export class LabelFactory<T> extends ComponentFactory<Label> {
    /**
     * Create, set up and return Label component.
     * @param for_ Content of the `for` attribute (single target ID or space separated target IDs).
     * @param phrase The phrasing content for the `<label>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Label component.
     */
    public label(for_?: string, phrase?: Phrase | Phrases, data?: T): Label {
        return this.setupComponent(
            !phrase
                ? new Label(for_)
                : Array.isArray(phrase)
                    ? new Label(for_, ...phrase)
                    : new Label(for_, phrase),
            data
        );
    }
}
