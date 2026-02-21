import { ComponentFactory, ElementComponentWithChildren, NameAttr, NativeDisabledAttr, Phrase, Phrases, ValueAttr, mixinDOMProperties } from "@vanilla-ts/core";


/**
 * Button component (`<button>`).
 */
export class Button<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLButtonElement, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create Button component.
     * @param phrase The phrasing content for the `<button>` element.
     */
    constructor(...phrase: Phrases) {
        super("button");
        phrase.length > 0 && this.phrase(...phrase);
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            NameAttr<HTMLButtonElement>,
            NativeDisabledAttr<HTMLButtonElement>,
            ValueAttr<HTMLButtonElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Button<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging,jsdoc/require-jsdoc
    NativeDisabledAttr<HTMLButtonElement, EventMap> { }

/**
 * Factory for `Button` components.
 */
export class ButtonFactory<T> extends ComponentFactory<Button> {
    /**
     * Create, set up and return Button component.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component.
     */
    public button(phrase?: Phrase | Phrases, data?: T): Button {
        return this.setupComponent(
            !phrase
                ? new Button()
                : Array.isArray(phrase)
                    ? new Button(...phrase)
                    : new Button(phrase),
            data
        );
    }

    /**
     * Create, set up and return Button component. Identical to {@link button()}, but the class
     * name `regular` is added to the returned button.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component (with the class name `regular` added).
     */
    public buttonRegular(phrase?: Phrase | Phrases, data?: T): Button {
        return this.setupComponent(
            (!phrase
                ? new Button()
                : Array.isArray(phrase)
                    ? new Button(...phrase)
                    : new Button(phrase)
            ).addClass("regular"),
            data
        );
    }

    /**
     * Create, set up and return Button component. Identical to {@link button()}, but the class
     * names `regular` and `default` are added to the returned button.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component (with the class name `regular` added).
     */
    public buttonDefault(phrase?: Phrase | Phrases, data?: T): Button {
        return this.setupComponent(
            (!phrase
                ? new Button()
                : Array.isArray(phrase)
                    ? new Button(...phrase)
                    : new Button(phrase)
            ).addClass("regular", "default"),
            data
        );
    }

    /**
     * Create, set up and return Button component. Identical to {@link button()}, but the class
     * names `regular` and `warn` are added to the returned button.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component (with the class name `regular` added).
     */
    public buttonWarn(phrase?: Phrase | Phrases, data?: T): Button {
        return this.setupComponent(
            (!phrase
                ? new Button()
                : Array.isArray(phrase)
                    ? new Button(...phrase)
                    : new Button(phrase)
            ).addClass("regular", "warn"),
            data
        );
    }
}
