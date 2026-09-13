import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, MinMaxAttr, mixinDOMProperties, Orientation, OrientationAttr, PhrasingContent, ValueAttr } from "@vanilla-ts/core";


/**
 * Meter component (`<meter>`).\
 * Represents a scalar measurement within a known range. Phrasing content must not contain
 * descendant `<meter>` elements.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meter
 */
export class Meter<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLMeterElement, Child, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;

    /**
     * Create, set up and return Meter component.
     * @param max The maximum value for the component. Default: `1`.
     * @param value The current value for the element. The DOM getter limits the value to the
     * current minimum and maximum. Default: `0`.
     * @param min The minimum value for the component. Default: `0`.
     * @param low The upper boundary of the low range. If omitted, the DOM getter defaults to
     * the current minimum.
     * @param high The lower boundary of the high range. If omitted, the DOM getter defaults to
     * the current maximum.
     * @param optimum The optimum value. If omitted, the DOM getter defaults to the midpoint of
     * the current range.
     * @param phrase The phrasing content for the `<meter>` element.
     */
    constructor(max: number = 1, value: number = 0, min: number = 0, low?: number, high?: number, optimum?: number, ...phrase: Children) {
        super("meter");
        this
            .orientation(Orientation.HORIZONTAL)
            .min(min)
            .max(max)
            .low(low)
            .high(high)
            .optimum(optimum)
            .value(value);
        phrase.length > 0 && this.phrase(...phrase);
    }

    /**
     * Get/set the `low` attribute value of the component.
     * The getter defaults to the minimum and is limited to the current minimum and maximum.
     * Setting `undefined` removes the attribute.
     */
    public get Low(): number {
        return this._dom.low;
    }
    /** @inheritdoc */
    public set Low(v: number | undefined) {
        this.low(v);
    }

    /**
     * Set the `low` attribute value of the component. The native DOM property handles range
     * limits when reading the value; the supplied attribute value is preserved.
     * @param v The value to be set. If omitted or `undefined`, the attribute is removed.
     * @returns This instance.
     */
    public low(v?: number): this {
        v === undefined
            ? this._dom.removeAttribute("low")
            : this._dom.low = v;
        return this;
    }

    /**
     * Get/set the `high` attribute value of the component.
     * The getter defaults to the maximum and is limited to the current low boundary and maximum.
     * Setting `undefined` removes the attribute.
     */
    public get High(): number {
        return this._dom.high;
    }
    /** @inheritdoc */
    public set High(v: number | undefined) {
        this.high(v);
    }

    /**
     * Set the `high` attribute value of the component. The native DOM property handles range
     * limits when reading the value; the supplied attribute value is preserved.
     * @param v The value to be set. If omitted or `undefined`, the attribute is removed.
     * @returns This instance.
     */
    public high(v?: number): this {
        v === undefined
            ? this._dom.removeAttribute("high")
            : this._dom.high = v;
        return this;
    }

    /**
     * Get/set the `optimum` attribute value of the component.
     * The getter defaults to the midpoint of the range and is limited to the current minimum and maximum.
     * Setting `undefined` removes the attribute.
     */
    public get Optimum(): number {
        return this._dom.optimum;
    }
    /** @inheritdoc */
    public set Optimum(v: number | undefined) {
        this.optimum(v);
    }

    /**
     * Set the `optimum` attribute value of the component. The native DOM property handles range
     * limits when reading the value; the supplied attribute value is preserved.
     * @param v The value to be set. If omitted or `undefined`, the attribute is removed.
     * @returns This instance.
     */
    public optimum(v?: number): this {
        v === undefined
            ? this._dom.removeAttribute("optimum")
            : this._dom.optimum = v;
        return this;
    }

    /**
     * Get the live list of label elements associated with this component (read-only).
     */
    public get Labels(): NodeListOf<HTMLLabelElement> {
        return this._dom.labels;
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            MinMaxAttr<HTMLMeterElement>,
            OrientationAttr<HTMLMeterElement>,
            ValueAttr<HTMLMeterElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Meter<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends // eslint-disable-line @typescript-eslint/no-unused-vars,jsdoc/require-jsdoc
    MinMaxAttr<HTMLMeterElement, EventMap>,
    OrientationAttr<HTMLMeterElement, EventMap>,
    ValueAttr<HTMLMeterElement, EventMap> { }

/**
 * Factory for `Meter` components.
 */
export class MeterFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Meter<Child>> {
    /**
     * Create, set up and return Meter component.
     * @param max The maximum value for the component. Default: `1`.
     * @param value The current value for the element. The DOM getter limits the value to the
     * current minimum and maximum. Default: `0`.
     * @param min The minimum value for the component. Default: `0`.
     * @param low The upper boundary of the low range. If omitted, the DOM getter defaults to
     * the current minimum.
     * @param high The lower boundary of the high range. If omitted, the DOM getter defaults to
     * the current maximum.
     * @param optimum The optimum value. If omitted, the DOM getter defaults to the midpoint of
     * the current range.
     * @param phrase The phrasing content for the `<meter>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Meter component.
     */
    public meter(max: number = 1, value: number = 0, min: number = 0, low?: number, high?: number, optimum?: number, phrase?: string | Child | Children, data?: T): Meter<Child> {
        return this.setupComponent(
            !phrase
                ? new Meter<Child>(max, value, min, low, high, optimum)
                : Array.isArray(phrase)
                    ? new Meter<Child>(max, value, min, low, high, optimum, ...phrase)
                    : new Meter<Child>(max, value, min, low, high, optimum, phrase),
            data
        );
    }
}
