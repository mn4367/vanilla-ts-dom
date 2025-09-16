import { ComponentFactory, DirnameAttr, MinMaxLengthAttr, mixinDOMProperties, MultipleAttr, PatternAttr, PlaceholderAttr, SizeAttr } from "@vanilla-ts/core";
import { Input } from "./Input.js";

/**
 * Email input component (`<input type="email">`).
 */
export class EmailInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends Input<EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create EmailInput component.\
     * To check the validity of the input, this regex pattern can be used (as per HTML spec):\
     * `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/`
     * @param id The id (attribute) of the email input.
     * @param value The value of the email input.
     * @param name The name (attribute) of the email input.
     */
    constructor(id?: string, value?: string, name?: string) {
        super("email", id, value, name);
    }

    /**
     * Selects all text in the input element.
     * @returns This instance.
     */
    public select(): this {
        this._dom.select();
        return this;
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            EmailInput,
            DirnameAttr<HTMLInputElement>,
            MinMaxLengthAttr<HTMLInputElement>,
            MultipleAttr<HTMLInputElement>,
            PatternAttr<HTMLInputElement>,
            PlaceholderAttr<HTMLInputElement>,
            SizeAttr<HTMLInputElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface EmailInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    DirnameAttr<HTMLInputElement, EventMap>,
    MinMaxLengthAttr<HTMLInputElement, EventMap>,
    MultipleAttr<HTMLInputElement, EventMap>,
    PatternAttr<HTMLInputElement, EventMap>,
    PlaceholderAttr<HTMLInputElement, EventMap>,
    SizeAttr<HTMLInputElement, EventMap> { }

/**
 * Factory for `EmailInput` components.
 */
export class EmailInputFactory<T> extends ComponentFactory<EmailInput> {
    /**
     * Create, set up and return EmailInput component.
     * To check the validity of the input, this regex pattern can be used (as per HTML spec):\
     * `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/`
     * @param id The id (attribute) of the email input.
     * @param value The value of the email input.
     * @param name The name (attribute) of the email input.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns EmailInput component.
     */
    public emailInput(id?: string, value?: string, name?: string, data?: T): EmailInput {
        return this.setupComponent(new EmailInput(id, value, name), data);
    }
}
