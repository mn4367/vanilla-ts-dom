import { ComponentFactory, MinMaxLengthAttr, PatternAttr, PlaceholderAttr, SelectionEndProp, SelectionStartProp, SizeAttr, mixin, mixinDOMProperties } from "@vanilla-ts/core";
import { Input } from "./Input.js";
import { TextField } from "./TextField.js";


/**
 * Password input component (`<input type="password">`).
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

    /**
     * `DataList` isn't supported by `PasswordInput`, using this (overridden) property has no
     * effect)!
     */
    public override get DataList(): string[] {
        return [];
    }
    /** @inheritdoc */
    public override set DataList(_v: string[]) { }

    /**
     * `DataList` isn't supported by `PasswordInput`, using this (overridden) function has no
     * effect)!
     * @param _v The list attribute value to be set.
     * @returns This instance.
     */
    public override dataList(_v: string[]): this {
        return this;
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            PasswordInput,
            MinMaxLengthAttr<HTMLInputElement>,
            PatternAttr<HTMLInputElement>,
            PlaceholderAttr<HTMLInputElement>,
            SizeAttr<HTMLInputElement>,
            SelectionEndProp<HTMLInputElement>,
            SelectionStartProp<HTMLInputElement>
        );
        /** Mixin `TextField` functionality. */
        mixin(false, PasswordInput, TextField<HTMLInputElement>);
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface PasswordInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    MinMaxLengthAttr<HTMLInputElement, EventMap>,
    PatternAttr<HTMLInputElement, EventMap>,
    PlaceholderAttr<HTMLInputElement, EventMap>,
    SizeAttr<HTMLInputElement, EventMap>,
    SelectionEndProp<HTMLInputElement, EventMap>,
    SelectionStartProp<HTMLInputElement, EventMap>,
    TextField<HTMLInputElement, EventMap> { }

/**
 * Factory for `PasswordInput` components.
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
