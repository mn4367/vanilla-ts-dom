import { ComponentFactory, DataListAttr, MinMaxAttr, StepAttr, mixinDOMAttributes } from "@vanilla-ts/core";
import { Input } from "./Input.js";


/**
 * Range input component (`<input type="range">`).
 */
export class RangeInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends Input<EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    protected vertical_: boolean;

    /**
     * Create RangeInput component.
     * @param id The id (attribute) of the range input.
     * @param value The value of the range input.
     * @param name The name (attribute) of the range input.
     * @param min The minimum value of the range input.
     * @param max The maximum value of the range input.
     * @param step The step garnularity of the range input.
     * @param vertical `true` if the range input is to be displayed with a vertical orientation,
     * otherwise `false`.
     */
    constructor(id?: string, value?: string, name?: string, min: string = "0", max: string = "100", step: string | "any" = "1", vertical: boolean = false) { // eslint-disable-line @typescript-eslint/no-redundant-type-constituents
        super("range", id, value, name);
        this.min(min)
            .max(max)
            .step(step)
            .vertical(vertical);
    }

    /**
     * Get/set the orientation of the range input (horizontal/vertical).
     */
    public get Vertical(): boolean {
        return this.vertical_;
    }
    /** @inheritdoc */
    public set Vertical(v: boolean) {
        this.vertical(v);
    }

    /**
     * Set the orientation of the range input (horizontal/vertical).
     * @param vertical `true` if the range input is to be displayed with a vertical orientation,
     * otherwise `false`.
     * @returns This instance.
     */
    public vertical(vertical: boolean): this {
        this.vertical_ = vertical;
        if (this.vertical_) {
            this.style("writingMode", "vertical-lr");
            this.data("vertical", "");
        } else {
            this.style("writingMode", "");
            this.data("vertical", null);
        }
        return this;
    }

    static {
        /** Mixin additional DOM attributes. */
        mixinDOMAttributes(
            RangeInput,
            DataListAttr<HTMLInputElement>,
            MinMaxAttr<HTMLInputElement>,
            StepAttr<HTMLInputElement>
        );
    }
}

// Augment class definition with the DOM attributes introduced by `mixinDOMAttributes()` above.
export interface RangeInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging,jsdoc/require-jsdoc
    DataListAttr<HTMLInputElement, EventMap>,
    MinMaxAttr<HTMLInputElement, EventMap>,
    StepAttr<HTMLInputElement, EventMap> { }

/**
 * Factory for RangeInput components.
 */
export class RangeInputFactory<T> extends ComponentFactory<RangeInput> {
    /**
     * Create, set up and return RangeInput component.
     * @param id The id (attribute) of the range input.
     * @param value The value of the range input.
     * @param name The name (attribute) of the range input.
     * @param min The minimum value of the range input.
     * @param max The maximum value of the range input.
     * @param step The step garnularity of the range input.
     * @param vertical `true` if the range input is to be displayed with a vertical orientation,
     * otherwise `false`.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns RangeInput component.
     */
    public rangeInput(id?: string, value?: string, name?: string, min: string = "0", max: string = "100", step: string | "any" = "1", vertical: boolean = false, data?: T): RangeInput { // eslint-disable-line @typescript-eslint/no-redundant-type-constituents
        return this.setupComponent(new RangeInput(id, value, name, min, max, step, vertical), data);
    }
}
