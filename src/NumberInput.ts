import { ComponentFactory, MinMaxAttr, NullableString, PlaceholderAttr, StepAttr, mixin, mixinDOMProperties } from "@vanilla-ts/core";
import { Input } from "./Input.js";
import { TextField } from "./TextField.js";


/**
 * Number input component (`<input type="number">`).
 */
export class NumberInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends Input<EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;

    /**
     * Create NumberInput component.
     * @param id The id (attribute) of the number input. If `id` is `undefined` or omitted, a unique
     * ID will be generated. If `id` is explicitely set to `null` or an empty string, no id
     * attribute will be set. Any other value will be used as the id attribute.
     * @param value The value of the number input.
     * @param name The name (attribute) of the number input.
     * @param min The minimum value (attribute) of the number input.
     * @param max The maximum value (attribute) of the number input.
     * @param step The step value (attribute) of the number input.
     */
    constructor(id?: NullableString, value?: string, name?: string, min?: string, max?: string, step?: string) {
        super("number", id, value, name);
        min && this.min(min);
        max && this.max(max);
        step && this.step(step);
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
            this,
            MinMaxAttr<HTMLInputElement>,
            PlaceholderAttr<HTMLInputElement>,
            StepAttr<HTMLInputElement>
        );
        /** Mixin `TextField` functionality. */
        mixin(false, this, TextField<HTMLInputElement>);
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface NumberInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    MinMaxAttr<HTMLInputElement, EventMap>,
    PlaceholderAttr<HTMLInputElement, EventMap>,
    StepAttr<HTMLInputElement, EventMap>,
    TextField<HTMLInputElement, EventMap> { }

/**
 * Factory for `NumberInput` components.
 */
export class NumberInputFactory<T> extends ComponentFactory<NumberInput> {
    /**
     * Create, set up and return NumberInput component.
     * @param id The id (attribute) of the number input.
     * @param value The value of the number input.
     * @param name The name (attribute) of the number input.
     * @param min The minimum value (attribute) of the number input.
     * @param max The maximum value (attribute) of the number input.
     * @param step The step value (attribute) of the number input.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns NumberInput component.
     */
    public numberInput(id?: string, value?: string, name?: string, min?: string, max?: string, step?: string, data?: T): NumberInput {
        return this.setupComponent(new NumberInput(id, value, name, min, max, step), data);
    }
}
