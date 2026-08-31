import { ComponentFactory, DefaultEventMap, MinMaxAttr, mixinDOMProperties, NullableString, Orientation, StepAttr } from "@vanilla-ts/core";
import { Input } from "./Input.js";


/**
 * Range input component (`<input type="range">`).
 */
export class RangeInput<EventMap extends DefaultEventMap = DefaultEventMap> extends Input<EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;
    protected _orientation: Orientation;
    protected minMaxObserver: MutationObserver;

    /**
     * Create RangeInput component. In addition to the original `HTMLInputElement` this component
     * reflects its current percentage value in the `--range-input-percentage` CSS variable and the
     * `data-percent` attribute.
     * @param id The id (attribute) of the range input. If `id` is `undefined` or omitted, a unique
     * ID will be generated. If `id` is explicitely set to `null` or an empty string, no id
     * attribute will be set. Any other value will be used as the id attribute.
     * @param value The value of the range input.
     * @param name The name (attribute) of the range input.
     * @param min The minimum value of the range input.
     * @param max The maximum value of the range input.
     * @param step The step garnularity of the range input.
     * @param orientation The orientation of the range input.
     */
    constructor(id?: NullableString, value?: string, name?: string, min: string = "0", max: string = "100", step: string | "any" = "1", orientation: Orientation = Orientation.HORIZONTAL) { // eslint-disable-line @typescript-eslint/no-redundant-type-constituents
        super("range", id, value, name);
        this.orientation(orientation)
            .min(min)
            .max(max)
            .step(step)
            .updatePercentage()
            .on("input", () => this.updatePercentage());
        this.supportOnValueCallbacks(this);
        this.minMaxObserver = new MutationObserver((records: MutationRecord[]) => {
            for (const record of records) {
                if (record.target === this._dom && (record.attributeName === "min" || record.attributeName === "max")) {
                    this.updatePercentage();
                    break;
                }
            }
        });
        this.minMaxObserver.observe(this._dom, { attributes: true, attributeFilter: ["min", "max"] }); // eslint-disable-line jsdoc/require-jsdoc
    }

    /**
     * `Readonly` isn't supported by `RangeInput`, using this (overridden) property has no effect)!
     */
    public override get Readonly(): boolean {
        return false;
    }
    /** @inheritdoc */
    public override set Readonly(_v: boolean) { }

    /**
     * `Readonly` isn't supported by `RangeInput`, using this (overridden) function has no effect)!
     * @param _v The readonly attribute value to be set.
     * @returns This instance.
     */
    public override readonly(_v: boolean): this {
        return this;
    }

    /**
     * `Required` isn't supported by `RangeInput`, using this (overridden) property has no effect)!
     */
    public override get Required(): boolean {
        return false;
    }
    /** @inheritdoc */
    public override set Required(_v: boolean) { }

    /**
     * `Required` isn't supported by `RangeInput`, using this (overridden) function has no effect)!
     * @param _v The required attribute value to be set.
     * @returns This instance.
     */
    public override required(_v: boolean): this {
        return this;
    }

    /**
     * Get/set the orientation of the range input.
     */
    public get Orientation(): Orientation {
        return this._orientation;
    }
    /** @inheritdoc */
    public set Orientation(v: Orientation) {
        this.orientation(v);
    }

    /**
     * Sets the orientation of the range input.
     * @param orientation The new orientation.
     * @returns This instance.
     */
    public orientation(orientation: Orientation): this {
        if (this._orientation !== orientation) {
            this._orientation = orientation;
            this._orientation === Orientation.HORIZONTAL
                ? this.removeClass("vertical").addClass("horizontal")
                : this.removeClass("horizontal").addClass("vertical");
        }
        return this;
    }

    /** @inheritdoc */
    protected override onValue(): this {
        this.updatePercentage();
        return this;
    }

    /** @inheritdoc */
    protected override onValueAsNumber(): this {
        this.updatePercentage();
        return this;
    }

    /**
     * Update the `--range-input-percentage` CSS variable to reflect the current percentage value of
     * the range input.
     * @returns This instance.
     */
    protected updatePercentage(): this {
        const min = parseFloat(this._dom.min) || 0;
        const max = parseFloat(this._dom.max) || 100;
        const percentage = (parseFloat(this._dom.value) - min) / (max - min) * 100;
        this._dom.style.setProperty("--range-input-percentage", percentage + "%");
        this._dom.setAttribute("data-percent", percentage.toString());
        return this;
    }

    /** @inheritdoc */
    public override dispose(): void {
        this.minMaxObserver.disconnect();
        super.dispose();
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            MinMaxAttr<HTMLInputElement>,
            StepAttr<HTMLInputElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface RangeInput<EventMap extends DefaultEventMap = DefaultEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    MinMaxAttr<HTMLInputElement, EventMap>,
    StepAttr<HTMLInputElement, EventMap> { }

/**
 * Factory for `RangeInput` components.
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
     * @param orientation The orientation of the range input.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns RangeInput component.
     */
    public rangeInput(id?: string, value?: string, name?: string, min: string = "0", max: string = "100", step: string | "any" = "1", orientation: Orientation = Orientation.HORIZONTAL, data?: T): RangeInput { // eslint-disable-line @typescript-eslint/no-redundant-type-constituents
        return this.setupComponent(new RangeInput(id, value, name, min, max, step, orientation), data);
    }
}
