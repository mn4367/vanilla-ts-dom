import { ComponentFactory, DataListAttr, MinMaxAttr, PlaceholderAttr, StepAttr, mixinDOMAttributes } from "@vanilla-ts/core";
import { Input } from "./Input.js";


/**
 * Number input component (`<input type="number">`).
 */
export class NumberInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends Input<EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create NumberInput component.
     * @param id The id (attribute) of the number input.
     * @param value The value of the number input.
     * @param name The name (attribute) of the number input.
     * @param min The minimum value (attribute) of the number input.
     * @param max The maximum value (attribute) of the number input.
     * @param step The step value (attribute) of the number input.
     */
    constructor(id?: string, value?: string, name?: string, min?: string, max?: string, step?: string) {
        super("number", id, value, name);
        !min || this.min(min);
        !max || this.max(max);
        !step || this.step(step);
    }

    /**
     * Selects all text in the number input.
     * @returns This instance.
     */
    public select(): this {
        this._dom.select();
        return this;
    }

    static {
        /** Mixin additional DOM attributes. */
        mixinDOMAttributes(
            NumberInput,
            DataListAttr<HTMLInputElement>,
            MinMaxAttr<HTMLInputElement>,
            PlaceholderAttr<HTMLInputElement>,
            StepAttr<HTMLInputElement>
        );
    }
}

// Augment class definition with the DOM attributes introduced by `mixinDOMAttributes()` above.
export interface NumberInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    DataListAttr<HTMLInputElement, EventMap>,
    MinMaxAttr<HTMLInputElement, EventMap>,
    PlaceholderAttr<HTMLInputElement, EventMap>,
    StepAttr<HTMLInputElement, EventMap> { }

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
