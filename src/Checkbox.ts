import { AutocompleteAttributeValues, CheckedAttr, CheckedEvent, ComponentFactory, DefaultEventMap, mixinDOMProperties, NullableString } from "@vanilla-ts/core";
import { Input } from "./Input.js";


/** Additional event(s) for `Checkbox`. */
export interface CheckboxEventMap extends DefaultEventMap {
    /** A checkbox is checked/unchecked. */
    "checked": CheckedEvent<Checkbox>;
}

/**
 * Checkbox component (`<input type="checkbox">`) extended with a 'Checked' getter/setter and set
 * method and also with a custom event `checked` that signals checking/unchecking the checkbox.
 */
export class Checkbox<EventMap extends CheckboxEventMap = CheckboxEventMap> extends Input<EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;

    /**
     * Create Checkbox component.
     * @param id The id (attribute) of the checkbox. If `id` is `undefined` or omitted, a unique ID
     * will be generated. If `id` is explicitely set to `null` or an empty string, no id attribute
     * will be set. Any other value will be used as the id attribute.
     * @param value The value of the checkbox. If omitted, it defaults to the value `on` (see
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox#value_2).
     * @param name The name (attribute) of the checkbox.
     * @param checked `true`, if the checkbox should be checked, otherwise false.
     */
    constructor(id?: NullableString, value?: string, name?: string, checked?: boolean) {
        super("checkbox", id, value, name);
        this._dom.checked = checked ?? false;
        this.on("change", () => this.emit(new CheckedEvent("checked", this, { Checked: this._dom.checked }))); // eslint-disable-line jsdoc/require-jsdoc
    }

    /**
     * Get/set the indeterminate state of the checkbox. If set to `true` this also sets the checked
     * state to `false`.
     */
    public get Indeterminate(): boolean {
        return this._dom.indeterminate;
    }
    /** @inheritdoc */
    public set Indeterminate(v: boolean) {
        this.indeterminate(v);
    }

    /**
     * Sets the indeterminate state of the checkbox to indeterminate/determinate. If set to `true`
     * this also sets the checked state to `false`.
     * @param indeterminate `true`, if the state of the checkbox should be indeterminate, otherwise
     * false.
     * @returns This instance.
     */
    public indeterminate(indeterminate: boolean): this {
        indeterminate && this._dom.checked && (this._dom.checked = false);
        this._dom.indeterminate = indeterminate;
        return this;
    }

    /**
     * `DataList` isn't supported by `Checkbox`, using this (overridden) property has no effect)!
     */
    public override get DataList(): string[] {
        return [];
    }
    /** @inheritdoc */
    public override set DataList(_v: string[]) { }

    /**
     * `DataList` isn't supported by `Checkbox`, using this (overridden) function has no effect)!
     * @param _v The list attribute value to be set.
     * @returns This instance.
     */
    public override dataList(_v: string[]): this {
        return this;
    }

    /**
     * `Autocomplete` isn't supported by `Checkbox`, using this (overridden) property has no
     * effect)!
     */
    public override get Autocomplete(): AutocompleteAttributeValues {
        return null;
    }
    /** @inheritdoc */
    public override set Autocomplete(_v: boolean) { }

    /**
     * `Autocomplete` isn't supported by `Checkbox`, using this (overridden) function has no
     * effect)!
     * @param _v The autocomplete attribute value to be set.
     * @returns This instance.
     */
    public override autocomplete(_v: AutocompleteAttributeValues): this {
        return this;
    }

    /**
     * `Readonly` isn't supported by `Checkbox`, using this (overridden) property has no effect)!
     */
    public override get Readonly(): boolean {
        return false;
    }
    /** @inheritdoc */
    public override set Readonly(_v: boolean) { }

    /**
     * `Readonly` isn't supported by `Checkbox`, using this (overridden) function has no effect)!
     * @param _v The readonly attribute value to be set.
     * @returns This instance.
     */
    public override readonly(_v: boolean): this {
        return this;
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            CheckedAttr<HTMLInputElement, CheckboxEventMap>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Checkbox<EventMap extends CheckboxEventMap = CheckboxEventMap> extends // eslint-disable-line @typescript-eslint/no-empty-object-type,jsdoc/require-jsdoc
    CheckedAttr<HTMLInputElement, EventMap> { }

/**
 * Factory for `Checkbox` components (`<input type="checkbox">`).
 */
export class CheckboxFactory<T> extends ComponentFactory<Checkbox> {
    /**
     * Create, set up and return Checkbox component.
     * @param id The id (attribute) of the checkbox.
     * @param value The value of the checkbox.
     * @param name The name (attribute) of the checkbox.
     * @param checked `true`, if the checkbox should be checked, otherwise false.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Checkbox component.
     */
    public checkbox(id?: string, value?: string, name?: string, checked?: boolean, data?: T): Checkbox {
        return this.setupComponent(new Checkbox(id, value, name, checked), data);
    }

    /**
     * Create, set up and return Checkbox component. Identical to {@link checkbox()}, but the class
     * name `switch` is added to the returned checkbox.
     * @param id The id (attribute) of the checkbox.
     * @param value The value of the checkbox.
     * @param name The name (attribute) of the checkbox.
     * @param checked `true`, if the checkbox should be checked, otherwise false.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Checkbox component.
     */
    public switch(id?: string, value?: string, name?: string, checked?: boolean, data?: T): Checkbox {
        return this.setupComponent(new Checkbox(id, value, name, checked).addClass("switch"), data);
    }
}
