import { AnyType, ComponentFactory, ElementComponentWithChildren, } from "@vanilla-ts/core";
import { mixinDOMProps, NameProp, RequiredProp, StringValueProp } from "./DOMProperties.js";


/**
 * An entry in a drop-down list.
 */
export interface ISelectValues {
    /** The displayed text of the entry. */
    Text: string;
    /** The value of the entry. */
    Value: string;
}

/**
 * Select input component (`<select>`).
 */
export class SelectInput extends (<
    new (...args: AnyType[]) =>
        & ElementComponentWithChildren<HTMLSelectElement>
        & NameProp<HTMLSelectElement>
        & StringValueProp<HTMLSelectElement>
        & RequiredProp<HTMLSelectElement>
    >mixinDOMProps(
        ElementComponentWithChildren<HTMLSelectElement>,
        NameProp<HTMLSelectElement>,
        StringValueProp<HTMLSelectElement>,
        RequiredProp<HTMLSelectElement>
    )) {
    protected _values: ISelectValues[];

    /**
     * Builds the input component.
     * @param values The values to be displayed in the select input.
     * @param id The id (attribute) of the select input.
     * @param value The value of the select input.
     * @param name The name (attribute) of the select input.
     */
    constructor(values: ISelectValues[], id?: string, value?: string, name?: string) {
        super("select");
        this.values(values);
        id ? this.id(id) : undefined;
        value ? this.value(value) : undefined;
        name ? this.name(name) : undefined;
    }

    /**
     * Get/set the values of the drop-down list.
     */
    public get Values(): ISelectValues[] {
        return this._values;
    }
    /** @inheritdoc */
    public set Values(v: ISelectValues[]) {
        this.values(v);
    }

    /**
     * Set the values of the drop-down list.
     * @param v The values for the drop-down list.
     * @returns This instance.
     */
    public values(v: ISelectValues[]): this {
        const oldValue: ISelectValues = { Text: this.TextValue, Value: this.Value }; // eslint-disable-line jsdoc/require-jsdoc
        this._values = v;
        while (this._dom.lastChild) {
            this._dom.lastChild.remove();
        }
        let i = 0;
        let newIndex = -1;
        for (const value of this._values) {
            const option = document.createElement("option");
            option.textContent = value.Text;
            option.value = value.Value;
            this._dom.appendChild(option);
            if ((newIndex === -1) && (value.Text === oldValue.Text) && (value.Value === oldValue.Value)) {
                newIndex = i;
            }
            i++;
        }
        if (newIndex !== -1) {
            this.SelectedIndex = newIndex;
        }
        return this;
    }

    /**
     * Get/set the text that is displayed in the drop-down list. `TextValue` is one of the values
     * behind the drop-down list (e.g. `<option value="open">Open</option>`).
     */
    public get TextValue(): string {
        const result = this._dom.selectedOptions[0] ? this._dom.selectedOptions[0].textContent : undefined;
        return result ? result : "";
    }
    /** @inheritdoc */
    public set TextValue(v: string) {
        this.textValue(v);
    }

    /**
     * Get/set the text that is displayed in the drop-down list. `v` is one of the values behind the
     * drop-down list (e.g. `<option value="open">Open</option>`).
     * @param v The text to be selected in the drop-down list.
     * @returns This instance.
     */
    public textValue(v: string): this {
        let l = this._values.length;
        while (l--) {
            if (this._values[l].Text === v) {
                this.SelectedIndex = l;
                break;
            }
        }
        return this;
    }

    /**
     * Get/set the index of the selected value in the drop-down list.
     */
    public get SelectedIndex(): number {
        return this._dom.selectedIndex;
    }
    /** @inheritdoc */
    public set SelectedIndex(v: number) {
        this._dom.selectedIndex = v;
    }

    /**
     * Set the index of the selected value in the drop-down list.
     * @param v The index of the value to be selected in the drop-down list.
     * @returns This instance.
     */
    public selectedIndex(v: number): this {
        this._dom.selectedIndex = v;
        return this;
    }
}

/**
 * Factory for `<select>` based components.
 */
export class SelectInputFactory<T> extends ComponentFactory<SelectInput> {
    /**
     * Create, set up and return SelectInput component.
     * @param values The values to be displayed in the select input.
     * @param id The id (attribute) of the select input.
     * @param value The value of the select input.
     * @param name The name (attribute) of the select input.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns SelectInput component.
     */
    public selectInput(values: ISelectValues[], id?: string, value?: string, name?: string, data?: T): SelectInput {
        return this.setupComponent(new SelectInput(values, id, value, name), data);
    }
}
