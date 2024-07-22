import { AnyType, ComponentFactory, IElementComponent } from "@vanilla-ts/core";
import { CheckedEvent, CheckedProp, mixinDOMProps } from "./DOMProperties.js";
import { Input } from "./Input.js";


/**
 * Additional event(s) for `RadioButton`.
 */
export interface RadioButtonEventMap extends HTMLElementEventMap {
    /** A radio button is checked/unchecked. */
    "checked": CheckedEvent<RadioButton>; // eslint-disable-line jsdoc/require-jsdoc
}

/**
 * Radio button component (`<input type="radio">`)  extended with a 'Checked' getter/setter and set
 * method and also with a custom event `checked` that signals checking/unchecking the radio button.
 */
export class RadioButton extends (<
    new (...args: AnyType[]) =>
        & Input
        & CheckedProp<HTMLInputElement>
        // 'Injects' events from `RadioButtonEventMap`.
        & IElementComponent<HTMLInputElement, RadioButtonEventMap>
    >mixinDOMProps(
        Input,
        CheckedProp<HTMLInputElement>
    )) {
    protected _toggle: boolean = false;

    /**
     * Builds the radio button component.
     * @param id The id (attribute) of the radio button.
     * @param value The value of the radio button.
     * @param name The name (attribute) of the radio button.
     * @param checked `true`, if the radio button should be checked, otherwise false.
     */
    constructor(id?: string, value?: string, name?: string, checked?: boolean) {
        super("radio", id, value, name);
        this._dom.checked = checked ?? false;
        this.on("keyup", this.#onSpaceOrEnter.bind(this));
        this.on("click", this.#onClick.bind(this)/*, { capture: true }*/);
    }

    /**
     * `Readonly` isn't supported by `RadioButton`, using this (overridden) property has no effect)!
     */
    public override get Readonly(): boolean {
        return false;
    }
    /** @inheritdoc */
    public override set Readonly(_v: boolean) { }

    /**
     * `Readonly` isn't supported by `RadioButton`, using this (overridden) function has no effect)!
     * @param _v The readonly attribute value to be set.
     * @returns This instance.
     */
    public override readonly(_v: boolean): this {
        return this;
    }

    /**
     * Allow toggling the radio button state.
     */
    public get Toggle(): boolean {
        return this._toggle;
    }
    /** @inheritdoc */
    public set Toggle(v: boolean) {
        this._toggle = v;
    }

    /**
     * Allow or disallow toggling the radio button state.
     * @param toggle `true`, if the radio button can be toggled, otherwise false.
     * @returns This instance.
     */
    public toggle(toggle: boolean): this {
        this._toggle = toggle;
        return this;
    }

    /**
     * Toggle via the space or enter key.
     * @param event The keyboard event.
     */
    #onSpaceOrEnter(event: KeyboardEvent) {
        // Toggling support is off => add support for the enter key.
        if (!this._toggle) {
            if (event.key === "Enter") {
                this.#handleToggleEvent(event, () => { this.Checked = true; });
            }
        }
        // Toggling support is on => support enter and space key.
        else if ((event.key === " ") || (event.key === "Enter")) {
            this.#handleToggleEvent(event, () => { this.Checked = !this.Checked; });
        }
    }

    /**
     * Toggle by click.
     * @param event The mouse or pointer event.
     */
    #onClick(event: MouseEvent | PointerEvent) {
        this._toggle ? this.#handleToggleEvent(event, () => { this.Checked = !this.Checked; }) : undefined;
    }

    /**
     * Handles a toggle event.
     * @param event The original event.
     * @param setChecked A function to be executed on a toggle event.
     */
    #handleToggleEvent(event: KeyboardEvent | MouseEvent | PointerEvent, setChecked: () => void): void { // eslint-disable-line jsdoc/require-jsdoc
        event.preventDefault();
        event.stopPropagation();
        setTimeout(() => {
            setChecked();
            this._dom.dispatchEvent(new Event("input", { bubbles: true, cancelable: true, composed: true })); // eslint-disable-line jsdoc/require-jsdoc
            this._dom.dispatchEvent(new Event("change", { bubbles: true, cancelable: true, composed: true })); // eslint-disable-line jsdoc/require-jsdoc
        }, 0);
    }
}

/**
 * Factory for `<input type="radio">` components.
 */
export class RadioButtonFactory<T> extends ComponentFactory<RadioButton> {
    /**
     * Create and return RadioButton component.
     * @param id The id (attribute) of the radio button.
     * @param value The value of the radio button.
     * @param name The name (attribute) of the radio button.
     * @param checked `true`, if the radio button should be checked, otherwise false.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns RadioButton component.
     */
    public radioButton(id?: string, value?: string, name?: string, checked?: boolean, data?: T): RadioButton {
        return this.setupComponent(new RadioButton(id, value, name, checked), data);
    }
}
