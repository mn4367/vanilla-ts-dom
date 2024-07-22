import { AnyType, ComponentFactory, IElementComponent } from "@vanilla-ts/core";
import { CheckedEvent, CheckedProp, mixinDOMProps } from "./DOMProperties.js";
import { Input } from "./Input.js";


/**
 * Additional event(s) for `Checkbox`.
 */
export interface CheckboxEventMap extends HTMLElementEventMap {
    /** A checkbox is checked/unchecked. */
    "checked": CheckedEvent<Checkbox>; // eslint-disable-line jsdoc/require-jsdoc
}

/** 
 * Checkbox component (`<input type="checkbox">`) extended with a 'Checked' getter/setter and set
 * method and also with a custom event `checked` that signals checking/unchecking the checkbox.
 */
export class Checkbox extends (<
    new (...args: AnyType[]) =>
        & Input
        & CheckedProp<HTMLInputElement>
        // 'Injects' events from `CheckboxEventMap`.
        & IElementComponent<HTMLInputElement, CheckboxEventMap>
    >mixinDOMProps(
        Input,
        CheckedProp<HTMLInputElement>,
    )) {

    /**
     * Builds the checkbox component.
     * @param id The id (attribute) of the checkbox.
     * @param value The value of the checkbox.
     * @param name The name (attribute) of the checkbox.
     * @param checked `true`, if the checkbox should be checked, otherwise false.
     */
    constructor(id?: string, value?: string, name?: string, checked?: boolean) {
        new Event("click",);
        super("checkbox", id, value, name);
        this._dom.checked = checked ?? false;
        this.on("change", () => this._dom.dispatchEvent(new CheckedEvent("checked", this, { Checked: this._dom.checked }))); // eslint-disable-line jsdoc/require-jsdoc
    }

    /**
     * Get/set the indeterminate state of the checkbox.
     */
    public get Indeterminate(): boolean {
        return this._dom.indeterminate;
    }
    /** @inheritdoc */
    public set Indeterminate(v: boolean) {
        this._dom.indeterminate = v;
    }

    /**
     * Sets the indeterminate state of the checkbox to indeterminate/determinate.
     * @param indeterminate `true`, if the state of the checkbox should be indeterminate, otherwise
     * false.
     * @returns This instance.
     */
    public indeterminate(indeterminate: boolean): this {
        this._dom.indeterminate = indeterminate;
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
}

/**
 * Factory for `<input type="checkbox">` components.
 */
export class CheckboxFactory<T> extends ComponentFactory<Checkbox> {
    /**
     * Create and return Checkbox component.
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
}
