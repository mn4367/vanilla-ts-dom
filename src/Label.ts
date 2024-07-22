import { ComponentFactory, ElementComponentWithChildren, NullableString, Phrase } from "@vanilla-ts/core";


/**
 * Label component (`<label>`).
 */
export class Label<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLLabelElement, EventMap> {
    /**
     * Create `<label>` component.
     * @param for_ Content of the `for` attribute.
     * @param phrase The phrasing content for the `<label>` element.
     */
    constructor(for_?: string, ...phrase: Phrase[]) {
        super("label");
        !for_ || this.for(for_);
        phrase.length === 0 || this.phrase(...phrase);
    }

    /**
     * Get/set `for` attribute value of underlying HTML element.
     */
    public get For(): NullableString {
        return this.attr("for");
    }
    /** @inheritdoc */
    public set For(v: NullableString) {
        this.for(v);
    }

    /**
     * Set for attribute of underlying HTML element.
     * @param v The `for` attribute to be set or `null` to remove the attribute.
     * @returns This instance.
     */
    public for(v: NullableString): this {
        this.attrib("for", v);
        return this;
    }
}

/**
 * Factory for Label components.
 */
export class LabelFactory<T> extends ComponentFactory<Label> {
    /**
     * Create, set up and return Label component.
     * @param for_ Content of the `for` attribute.
     * @param phrase The phrasing content for the `<label>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Label component.
     */
    public label(for_?: string, phrase?: Phrase | Phrase[], data?: T): Label {
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
