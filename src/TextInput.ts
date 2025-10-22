import { ComponentFactory, DirnameAttr, MinMaxLengthAttr, PatternAttr, PlaceholderAttr, SelectionEndProp, SelectionStartProp, SizeAttr, mixin, mixinDOMProperties } from "@vanilla-ts/core";
import { Input } from "./Input.js";
import { TextField } from "./TextField.js";


/**
 * Text input component (`<input type="text">`).
 */
export class TextInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends Input<EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create TextInput component.
     * @param id The id (attribute) of the text input.
     * @param value The value of the text input.
     * @param name The name (attribute) of the text input.
     */
    constructor(id?: string, value?: string, name?: string) {
        super("text", id, value, name);
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            DirnameAttr<HTMLInputElement>,
            MinMaxLengthAttr<HTMLInputElement>,
            PatternAttr<HTMLInputElement>,
            PlaceholderAttr<HTMLInputElement>,
            SizeAttr<HTMLInputElement>,
            SelectionEndProp<HTMLInputElement>,
            SelectionStartProp<HTMLInputElement>
        );
        /** Mixin `TextField` functionality. */
        mixin(false, this, TextField<HTMLInputElement>);
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface TextInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    DirnameAttr<HTMLInputElement, EventMap>,
    MinMaxLengthAttr<HTMLInputElement, EventMap>,
    PatternAttr<HTMLInputElement, EventMap>,
    PlaceholderAttr<HTMLInputElement, EventMap>,
    SizeAttr<HTMLInputElement, EventMap>,
    SelectionEndProp<HTMLInputElement, EventMap>,
    SelectionStartProp<HTMLInputElement, EventMap>,
    TextField<HTMLInputElement, EventMap> { }

/**
 * Factory for `TextInput` components.
 */
export class TextInputFactory<T> extends ComponentFactory<TextInput> {
    /**
     * Create, set up and return TextInput component.
     * @param id The id (attribute) of the text input.
     * @param value The value of the text input.
     * @param name The name (attribute) of the text input.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns TextInput component.
     */
    public textInput(id?: string, value?: string, name?: string, data?: T): TextInput {
        return this.setupComponent(new TextInput(id, value, name), data);
    }
}
