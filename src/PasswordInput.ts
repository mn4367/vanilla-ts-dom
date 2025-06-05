import { ComponentFactory, DataListAttr, MinMaxLengthAttr, PatternAttr, PlaceholderAttr, SizeAttr, mixinDOMAttributes } from "@vanilla-ts/core";
import { Input } from "./Input.js";


/**
 * Password input component (`<input type="password">`) extended with  `MinLength`, `MaxLength` `DataList`
 * and `Placeholder` getters/setters and set methods.
 */
export class PasswordInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends Input<EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create PasswordInput component.
     * @param id The id (attribute) of the password input.
     * @param value The value of the password input.
     * @param name The name (attribute) of the password input.
     */
    constructor(id?: string, value?: string, name?: string) {
        super("password", id, value, name);
    }

    /**
     * Selects all text in the password input.
     * @returns This instance.
     */
    public select(): this {
        this._dom.select();
        return this;
    }

    /**
     * Get/set the `Disclosed` state of the component. If 'true', the password is displayed in plain
     * text instead of in masked form.
     */
    public get Disclosed(): boolean {
        return this._dom.type === "text";
    }
    /** @inheritdoc */
    public set Disclosed(v: boolean) {
        this._dom.type = v ? "text" : "password";
    }

    /**
     * Set the `Disclosed` state of the component.
     * @param v The value to be set. If 'true', the password is displayed in plain text instead of
     * in masked form.
     * @returns This instance.
     */
    public disclosed(v: boolean): this {
        this._dom.type = v ? "text" : "password";
        return this;
    }

    static {
        /** Mixin additional DOM attributes. */
        mixinDOMAttributes(
            PasswordInput,
            DataListAttr<HTMLInputElement>,
            MinMaxLengthAttr<HTMLInputElement>,
            PatternAttr<HTMLInputElement>,
            PlaceholderAttr<HTMLInputElement>,
            SizeAttr<HTMLInputElement>
        );
    }
}

// Augment class definition with the DOM attributes introduced by `mixinDOMAttributes()` above.
export interface PasswordInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    DataListAttr<HTMLInputElement, EventMap>,
    MinMaxLengthAttr<HTMLInputElement, EventMap>,
    PatternAttr<HTMLInputElement, EventMap>,
    PlaceholderAttr<HTMLInputElement, EventMap>,
    SizeAttr<HTMLInputElement, EventMap> { }

/**
 * Factory for PasswordInput components.
 */
export class PasswordInputFactory<T> extends ComponentFactory<PasswordInput> {
    /**
     * Create, set up and return PasswordInput component.
     * @param id The id (attribute) of the password input.
     * @param value The value of the password input.
     * @param name The name (attribute) of the password input.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns PasswordInput component.
     */
    public passwordInput(id?: string, value?: string, name?: string, data?: T): PasswordInput {
        return this.setupComponent(new PasswordInput(id, value, name), data);
    }
}
