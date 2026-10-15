import { ACustomComponentEvent, ComponentFactory, DEFAULT_CANCELABLE_EVENT_INIT_DICT, DefaultEventMap, ElementComponentWithChildren, INodeComponent, NameAttr, NativeDisabledAttr, PhrasingContent, ValueAttr, mixinDOMProperties } from "@vanilla-ts/core";


/**
 * Custom 'pressed' event for buttons.
 */
export class PressedEvent<S extends INodeComponent<Node>, D extends object = {
    /**
     * `Pressed` reflects the _future_ pressed state of the button, not the state it currently has!
     * Event handlers can prevent changing the `Pressed` state by calling `preventDefault()`.
     */
    Pressed: boolean;
}> extends ACustomComponentEvent<"pressed", S, D> { }


/** Additional event(s) for `Button`. */
export interface ButtonEventMap extends DefaultEventMap {
    /**
     * A button is pressed/unpressed. Event handlers can prevent changing the `Pressed` state by
     * calling `preventDefault()`.
     */
    "pressed": PressedEvent<Button>;
}

/**
 * Button component (`<button>`). Represents an interactive control that users can activate to
 * perform an action, such as submitting a form or opening a dialog.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button
 */
export class Button<Child extends PhrasingContent = PhrasingContent, EventMap extends ButtonEventMap = ButtonEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLButtonElement, Child, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;

    /**
     * Create Button component.
     * @param phrase The phrasing content for the `<button>` element.
     */
    constructor(...phrase: Children) {
        super("button");
        phrase.length > 0 && this.phrase(...phrase);
        this.on("click", () => {
            if (this.Pressed !== undefined) {
                this.dispatch(new PressedEvent("pressed", this, { Pressed: !this.Pressed }, DEFAULT_CANCELABLE_EVENT_INIT_DICT)) && this.pressed(!this.Pressed); // eslint-disable-line jsdoc/require-jsdoc
            }
        });
    }

    /**
     * Get/set the persistent pressed state of the button through the `aria-pressed` attribute.
     * `undefined` (the default) represents a regular button without `aria-pressed`; `false` and
     * `true` represent an unpressed and pressed toggle button. If `true` or `false` is passed, a
     * click on the button as well as pressing the space or enter keys will toggle its pressed
     * state.\
     * __Note:__ Setting `true` or `false` also sets the `type` attribute to `"button"`. `undefined`
     * removes the `type` attribute.
     */
    public get Pressed(): boolean | undefined {
        const pressed = this._dom.getAttribute("aria-pressed");
        return pressed === "true" ? true : pressed === "false" ? false : undefined;
    }
    /** @inheritdoc */
    public set Pressed(v: boolean | undefined) {
        this.pressed(v);
    }

    /**
     * Set the persistent pressed state of the button through the `aria-pressed` attribute.
     * `undefined` (the default) represents a regular button without `aria-pressed`; `false` and
     * `true` represent an unpressed and pressed toggle button. If `true` or `false` is passed, a
     * click on the button as well as pressing the space or enter keys will toggle its pressed
     * state.\
     * __Note:__ Setting `true` or `false` also sets the `type` attribute to `"button"`. `undefined`
     * removes the `type` attribute.
     * @param v `true` for pressed, `false` for unpressed, or `undefined` for a regular button.
     * @returns This instance.
     */
    public pressed(v: boolean | undefined): this {
        if (v !== this.Pressed) {
            v === undefined
                ? this
                    .attrib("aria-pressed", null)
                    .attrib("type", null)
                    .removeClass("pressed", "not-pressed")
                : this
                    .attrib("aria-pressed", v ? "true" : "false")
                    .attrib("type", "button")
                    .addClass(v ? "pressed" : "not-pressed")
                    .removeClass(v ? "not-pressed" : "pressed");
        }
        return this;
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            NameAttr<HTMLButtonElement>,
            NativeDisabledAttr<HTMLButtonElement>,
            ValueAttr<HTMLButtonElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Button<Child extends PhrasingContent = PhrasingContent, EventMap extends ButtonEventMap = ButtonEventMap, Children extends (Child | string)[] = (Child | string)[]> extends // eslint-disable-line @typescript-eslint/no-empty-object-type,@typescript-eslint/no-unused-vars,jsdoc/require-jsdoc
    NameAttr<HTMLButtonElement, EventMap>,
    NativeDisabledAttr<HTMLButtonElement, EventMap>,
    ValueAttr<HTMLButtonElement, EventMap> { }

/**
 * Factory for `Button` components.
 */
export class ButtonFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Button<Child>> {
    /**
     * Create, set up and return Button component.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component.
     */
    public button(phrase?: string | Child | Children, data?: T): Button<Child> {
        return this.setupComponent(
            !phrase
                ? new Button<Child>()
                : Array.isArray(phrase)
                    ? new Button<Child>(...phrase)
                    : new Button<Child>(phrase),
            data
        );
    }

    /**
     * Create, set up and return Button component. Identical to {@link button()}, but the class
     * name `regular` is added to the returned button.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component (with the class name `regular` added).
     */
    public buttonRegular(phrase?: string | Child | Children, data?: T): Button<Child> {
        return this.setupComponent(
            (!phrase
                ? new Button<Child>()
                : Array.isArray(phrase)
                    ? new Button<Child>(...phrase)
                    : new Button<Child>(phrase)
            ).addClass("regular"),
            data
        );
    }

    /**
     * Create, set up and return Button component. Identical to {@link button()}, but the class
     * names `regular` and `default` are added to the returned button.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component (with the class name `regular` added).
     */
    public buttonDefault(phrase?: string | Child | Children, data?: T): Button<Child> {
        return this.setupComponent(
            (!phrase
                ? new Button<Child>()
                : Array.isArray(phrase)
                    ? new Button<Child>(...phrase)
                    : new Button<Child>(phrase)
            ).addClass("regular", "default"),
            data
        );
    }

    /**
     * Create, set up and return Button component. Identical to {@link button()}, but the class
     * names `regular` and `warn` are added to the returned button.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component (with the class name `regular` added).
     */
    public buttonWarn(phrase?: string | Child | Children, data?: T): Button<Child> {
        return this.setupComponent(
            (!phrase
                ? new Button<Child>()
                : Array.isArray(phrase)
                    ? new Button<Child>(...phrase)
                    : new Button<Child>(phrase)
            ).addClass("regular", "warn"),
            data
        );
    }

    /**
     * Create, set up and return a toggle Button component. Identical to {@link buttonRegular()},
     * but additionally the property `Pressed` is set to the value of the `pressed` parameter
     * (`true` or `false` but not `undefined`).
     * @param pressed Whether the toggle button is initially pressed or not.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Toggle button component (with the class name `regular` added; the class name
     * `pressed` is also added if the `pressed` parameter is `true`).
     */
    public buttonToggle(pressed: boolean, phrase?: string | Child | Children, data?: T): Button<Child> {
        return this.setupComponent(
            (!phrase
                ? new Button<Child>()
                : Array.isArray(phrase)
                    ? new Button<Child>(...phrase)
                    : new Button<Child>(phrase)
            )
                .addClass("regular")
                .pressed(pressed),
            data
        );
    }
}
