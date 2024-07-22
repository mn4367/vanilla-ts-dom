import { CheckedAttr, CheckedEvent, ComponentFactory, DEFAULT_EVENT_INIT_DICT, mixinDOMAttributes } from "@vanilla-ts/core";
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
export class RadioButton<EventMap extends RadioButtonEventMap = RadioButtonEventMap> extends Input<EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    protected _toggle: boolean = false;

    /**
     * Create RadioButton component.
     * @param id The id (attribute) of the radio button.
     * @param value The value of the radio button.
     * @param name The name (attribute) of the radio button.
     * @param checked `true`, if the radio button should be checked, otherwise false.
     */
    constructor(id?: string, value?: string, name?: string, checked?: boolean) {
        super("radio", id, value, name);
        this._dom.checked = checked ?? false;
        this.on("keyup", this.#onSpaceOrEnter.bind(this));
        this.on("click", this.#onClick.bind(this));
        // Emit additional `checked` event on changes.
        this.on("change", () => this.emit(
            new CheckedEvent(
                "checked",
                this,
                /* eslint-disable jsdoc/require-jsdoc */
                { Checked: this._dom.checked },
                DEFAULT_EVENT_INIT_DICT
            )
            /* eslint-enable */
        ));
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
        // Toggling support is off => add support for the enter key (which sets the state to
        // `checked` once). For the space key this isn't necessary since it is the default behavior.
        if (!this._toggle) {
            if (event.key === "Enter" && !this.Checked) {
                this.checked(true);
                this.#emitEvents();
            }
        }
        // Toggling support is on => support space and enter key.
        else if ((event.key === " ") || (event.key === "Enter")) {
            this.checked(!this.Checked);
            // It seems that radio buttons are toggled on space, prevent that here.
            if (event.key === " ") {
                event.preventDefault();
            }
            this.#emitEvents();
        }
    }

    /**
     * Toggle by click.
     * @param event The mouse or pointer event.
     */
    #onClick(event: MouseEvent | PointerEvent) {
        // Gecko and Blink create a click event if the space bar or one of the arrow keys are
        // pressed. Ignore this here.
        if (((<PointerEvent>event).pointerId === -1) && ((<PointerEvent>event).pointerType === "")) {
            return;
        }
        if (this._toggle) {
            event.preventDefault();
            setTimeout(() => {
                this.checked(!this.Checked);
                this.#emitEvents();
            }, 0);
        }
    }

    /**
     * Emit `input` and `change` events.
     */
    #emitEvents(): void {
        this.emit(new Event("input", DEFAULT_EVENT_INIT_DICT));
        this.emit(new Event("change", DEFAULT_EVENT_INIT_DICT));
    }

    static {
        /** Mixin additional DOM attributes. */
        mixinDOMAttributes(
            RadioButton,
            CheckedAttr<HTMLInputElement, RadioButtonEventMap>
        );
    }
}

/** Augment class definition with the DOM attributes introduced by `mixinDOMAttributes()` above. */
export interface RadioButton<EventMap extends RadioButtonEventMap = RadioButtonEventMap> extends // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    CheckedAttr<HTMLInputElement, EventMap> { }

/**
 * Factory for RadioButton components.
 */
export class RadioButtonFactory<T> extends ComponentFactory<RadioButton> {
    /**
     * Create, set up and return RadioButton component.
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
