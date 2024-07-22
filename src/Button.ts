import { ComponentFactory, ElementComponentWithChildren, NameAttr, NativeDisabledAttr, Phrase, ValueAttr, mixinDOMAttributes } from "@vanilla-ts/core";


/**
 * Button component (`<button>`).
 */
export class Button<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLButtonElement, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create Button component.
     * @param phrase The phrasing content for the `<button>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("button");
        phrase.length === 0 || this.phrase(...phrase);
    }

    static {
        /** Mixin additional DOM attributes. */
        mixinDOMAttributes(
            Button,
            NameAttr<HTMLButtonElement>,
            NativeDisabledAttr<HTMLButtonElement>,
            ValueAttr<HTMLButtonElement>
        );
    }
}

/** Augment class definition with the DOM attributes introduced by `mixinDOMAttributes()` above. */
export interface Button<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging,jsdoc/require-jsdoc
    NativeDisabledAttr<HTMLButtonElement, EventMap> { }

/**
 * Factory for Button components.
 */
export class ButtonFactory<T> extends ComponentFactory<Button> {
    /**
     * Create, set up and return Button component.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component.
     */
    public button(phrase?: Phrase | Phrase[], data?: T): Button {
        return this.setupComponent(
            !phrase
                ? new Button()
                : Array.isArray(phrase)
                    ? new Button(...phrase)
                    : new Button(phrase),
            data
        );
    }
}
