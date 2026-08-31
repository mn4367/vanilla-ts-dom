import { AutocompleteAttr, cid, DataListAttr, DefaultEventMap, ElementComponentVoid, HTMLInputTypes, mixinDOMProperties, NameAttr, NativeDisabledAttr, NullableString, ReadonlyAttr, RequiredAttr, ValueAttr } from "@vanilla-ts/core";


/**
 * Abstract base Input component (`<input>`).\
 * __Note:__ This class has mixins for the properties `readonly`, `required`, `dirName`, `multiple`
 * and `value`, however, some input elements don't support these attributes, but since the vast
 * majority supports them, they are included here. Nevertheless some derived classes may have to
 * override the properties, e.g. `readonly` isn't supported for checkboxes, `dirName` isn't
 * supported  for `datetime-local`, `multiple` only exist for the types `email` and `file` etc.
 */
export abstract class Input<EventMap extends DefaultEventMap = DefaultEventMap> extends ElementComponentVoid<HTMLInputElement, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    protected static valuePropDesc: PropertyDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!;
    protected static valueAsDatePropDesc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "valueAsDate")!;
    protected static valueAsNumberPropDesc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "valueAsNumber")!;
    // @ts-expect-error ---
    #brand;
    protected type: HTMLInputTypes;

    /**
     * Create Input component.
     * @param type The type (attribute) of the input component.
     * @param id The id (attribute) of the input component. If `id` is `undefined` or omitted, a
     * unique ID will be generated. If `id` is explicitely set to `null` or an empty string, no id
     * attribute will be set. Any other value will be used as the id attribute.
     * @param value The value of the input element.
     * @param name The name (attribute) of the input component.
     */
    constructor(type: HTMLInputTypes, id?: NullableString, value?: string, name?: string) {
        super("input");
        this.type = type;
        this._dom.type = this.type;
        id === undefined
            ? this.id(cid())
            : id && this.id(id);
        value && this.value(value);
        name && this.name(name);
    }

    /**
     * Get type (attribute) of the input element.
     */
    public get Type(): HTMLInputTypes {
        return this.type;
    }

    /**
     * Get validity of the input element.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/validity
     */
    public get Validity(): ValidityState {
        return this._dom.validity;
    }

    /**
     * Get validation constraints that the `<input>` component does not satisfy (if any).
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/validationMessage
     */
    public get ValidationMessage(): string {
        return this._dom.validationMessage;
    }

    /**
     * Get/set the `valueAsDate` attribute of the component.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsDate
     */
    public get ValueAsDate(): Date | null {
        return this._dom.valueAsDate;
    }
    /** @inheritdoc */
    public set ValueAsDate(v: Date | null) {
        this.valueAsDate(v);
    }

    /**
     * Set the `valueAsDate` attribute of the component.
     * @param v The value to be set.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsDate
     * @returns This instance.
     */
    public valueAsDate(v: Date | null): this {
        this._dom.valueAsDate = v;
        return this;
    }

    /**
     * Get/set the `valueAsNumber` attribute of the component.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsNumber
     */
    public get ValueAsNumber(): number {
        return this._dom.valueAsNumber;
    }
    /** @inheritdoc */
    public set ValueAsNumber(v: number) {
        this.valueAsNumber(v);
    }

    /**
     * Set the `valueAsNumber` attribute of the component.
     * @param v The value to be set.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsNumber
     * @returns This instance.
     */
    public valueAsNumber(v: number): this {
        this._dom.valueAsNumber = v;
        return this;
    }

    /**
     * If available, this method is called when the `value` property of the underlying DOM element
     * is set. Implementing classes can override this method to react to changes of the `value`
     * property. The method is called after the `value` property is actually set, so the original
     * behavior of the DOM element is preserved.
     * @returns This instance.
     */
    protected onValue?(): this;

    /**
     * If available, this method is called when the `valueAsDate` property of the underlying DOM
     * element is set. Implementing classes can override this method to react to changes of the
     * `valueAsDate` property. The method is called after the `valueAsDate` property is actually
     * set, so the original behavior of the DOM element is preserved.
     * @returns This instance.
     */
    protected onValueAsDate?(): this;

    /**
     * If available, this method is called when the `valueAsNumber` property of the underlying DOM
     * element is set. Implementing classes can override this method to react to changes of the
     * `valueAsNumber` property. The method is called after the `valueAsNumber` property is actually
     * set, so the original behavior of the DOM element is preserved.
     * @returns This instance.
     */
    protected onValueAsNumber?(): this;

    /**
     * Patch the `value`, `valueAsDate` and `valueAsNumber` properties of the underlying DOM element
     * to call the corresponding `onValue*()` function of the owner component when they are set.
     * @param owner The owner component.
     * @returns This instance.
     */
    protected supportOnValueCallbacks(owner: Input): this {
        /* eslint-disable jsdoc/require-jsdoc */
        Object.defineProperty(this._dom, "value", {
            enumerable: true,
            configurable: true,
            get(this: HTMLInputElement): string { return Input.valuePropDesc?.get?.call(this) as string; },
            set(this: HTMLInputElement, newVal: string): void { Input.valuePropDesc?.set?.call(this, newVal); owner.onValue?.(); }
        });
        Object.defineProperty(this._dom, "valueAsDate", {
            enumerable: true,
            configurable: true,
            get(this: HTMLInputElement): Date | null { return Input.valueAsDatePropDesc?.get?.call(this) as Date | null; },
            set(this: HTMLInputElement, newVal: Date | null): void { Input.valueAsDatePropDesc?.set?.call(this, newVal); owner.onValueAsDate?.(); }
        });
        Object.defineProperty(this._dom, "valueAsNumber", {
            enumerable: true,
            configurable: true,
            get(this: HTMLInputElement): number { return Input.valueAsNumberPropDesc?.get?.call(this) as number; },
            set(this: HTMLInputElement, newVal: number): void { Input.valueAsNumberPropDesc?.set?.call(this, newVal); owner.onValueAsNumber?.(); }
        });
        /* eslint-enable jsdoc/require-jsdoc */
        return this;
    }

    /**
     * Restore the original `value`, `valueAsDate` and `valueAsNumber` properties of the underlying
     * DOM element.
     * @see {@link Input.supportOnValueCallbacks}
     * @returns This instance.
     */
    protected unsupportOnValueCallbacks(): this {
        Object.defineProperty(this._dom, "value", Input.valuePropDesc);
        Object.defineProperty(this._dom, "valueAsDate", Input.valueAsDatePropDesc);
        Object.defineProperty(this._dom, "valueAsNumber", Input.valueAsNumberPropDesc);
        return this;
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            AutocompleteAttr<HTMLInputElement>,
            DataListAttr<HTMLInputElement>,
            NameAttr<HTMLInputElement>,
            ValueAttr<HTMLInputElement>,
            NativeDisabledAttr<HTMLInputElement>,
            RequiredAttr<HTMLInputElement>,
            ReadonlyAttr<HTMLInputElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Input<EventMap extends DefaultEventMap = DefaultEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    AutocompleteAttr<HTMLInputElement, EventMap>,
    DataListAttr<HTMLInputElement, EventMap>,
    NameAttr<HTMLInputElement, EventMap>,
    ValueAttr<HTMLInputElement, EventMap>,
    NativeDisabledAttr<HTMLInputElement, EventMap>,
    RequiredAttr<HTMLInputElement, EventMap>,
    ReadonlyAttr<HTMLInputElement, EventMap> { }
