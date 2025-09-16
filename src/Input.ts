import { AutocompleteAttr, DataListAttr, ElementComponentVoid, HTMLInputTypes, mixinDOMProperties, NameAttr, NativeDisabledAttr, ReadonlyAttr, RequiredAttr, ValueAttr } from "@vanilla-ts/core";


/**
 * Abstract base Input component (`<input>`).\
 * __Note:__ This class has mixins for the properties `readonly`, `required`, `dirName`, `multiple`
 * and `value`, however, some input elements don't support these attributes, but since the vast
 * majority supports them, they are included here. Nevertheless some derived classes may have to
 * override the properties, e.g. `readonly` isn't supported for checkboxes, `dirName` isn't
 * supported  for `datetime-local`, `multiple` only exist for the types `email` and `file` etc.
 */
export abstract class Input<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentVoid<HTMLInputElement, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    protected type: HTMLInputTypes;

    /**
     * Create Input component.
     * @param type The type (attribute) of the input component.
     * @param id The id (attribute) of the input component.
     * @param value The value of the input element.
     * @param name The name (attribute) of the input component.
     */
    constructor(type: HTMLInputTypes, id?: string, value?: string, name?: string) {
        super("input");
        this.type = type;
        this._dom.type = this.type;
        id && this.id(id);
        // Otherwise this will be "on" (for checkboxes, radiobuttons, ...).
        // this.value(value ? value : ""); // eslint-disable-line @typescript-eslint/no-unsafe-call
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

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            Input,
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
export interface Input<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    AutocompleteAttr<HTMLInputElement, EventMap>,
    DataListAttr<HTMLInputElement, EventMap>,
    NameAttr<HTMLInputElement, EventMap>,
    ValueAttr<HTMLInputElement, EventMap>,
    NativeDisabledAttr<HTMLInputElement, EventMap>,
    RequiredAttr<HTMLInputElement, EventMap>,
    ReadonlyAttr<HTMLInputElement, EventMap> { }
