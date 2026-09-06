import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, EventMapVoid, INodeComponent, LabelAttr, mixinDOMProperties, NativeDisabledAttr, Phrase, Phrases, ValueAttr } from "@vanilla-ts/core";


/**
 * Option component (`<option>`).
 */
export class Option<Child extends INodeComponent<Node> = INodeComponent<Node>, EventMap extends EventMapVoid = DefaultEventMap> extends ElementComponentWithChildren<HTMLOptionElement, Child, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create Option component.
     * @param phrase The phrasing content for the `<option>` element. Due to the limited styling
     * capabilities of `<option>` elements, it is strongly recommended to use a text string text
     * only.
     */
    constructor(...phrase: Phrases) {
        super("option");
        phrase.length > 0 && this.phrase(...phrase);
    }

    /**
     * Get/set the `selected` attribute value of the component.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/option#selected
     */
    public get Selected(): boolean {
        return this._dom.selected;
    }
    /** @inheritdoc */
    public set Selected(v: boolean) {
        this._dom.selected = v;
    }

    /**
     * Set `selected` attribute value of the component.
     * @param v The value to be set.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/option#selected
     * @returns This instance.
     */
    public selected(v: boolean): this {
        this._dom.selected = v;
        return this;
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            LabelAttr<HTMLOptionElement>,
            NativeDisabledAttr<HTMLOptionElement>,
            ValueAttr<HTMLOptionElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Option<Child extends INodeComponent<Node> = INodeComponent<Node>, EventMap extends EventMapVoid = DefaultEventMap> extends // eslint-disable-line jsdoc/require-jsdoc,@typescript-eslint/no-unused-vars
    LabelAttr<HTMLOptionElement, EventMap>,
    ValueAttr<HTMLOptionElement, EventMap>,
    NativeDisabledAttr<HTMLOptionElement, EventMap> { }

/**
 * Factory for `Option` components.
 */
export class OptionFactory<T> extends ComponentFactory<Option> {
    /**
     * Create Option component.
     * @param phrase The phrasing content for the `<option>` element. Due to the limited styling
     * capabilities of `<option>` elements, it is strongly recommended to use a text string text
     * only.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Option component.
     */
    public option(phrase?: Phrase | Phrases, data?: T): Option {
        return this.setupComponent(
            !phrase
                ? new Option()
                : Array.isArray(phrase)
                    ? new Option(...phrase)
                    : new Option(phrase),
            data
        );
    }
}
