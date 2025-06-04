import { ComponentFactory, DataListAttr, MinMaxLengthAttr, PatternAttr, PlaceholderAttr, SizeAttr, mixinDOMAttributes } from "@vanilla-ts/core";
import { Input } from "./Input.js";


/**
 * Text input component (`<input type="text">`) extended with  `MinLength`, `MaxLength` `DataList`
 * and `Placeholder` getters/setters and set methods.
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

    /**
     * Selects all text in the text input.
     * @returns This instance.
     */
    public select(): this {
        this._dom.select();
        return this;
    }

    static {
        /** Mixin additional DOM attributes. */
        mixinDOMAttributes(
            TextInput,
            DataListAttr<HTMLInputElement>,
            MinMaxLengthAttr<HTMLInputElement>,
            PatternAttr<HTMLInputElement>,
            PlaceholderAttr<HTMLInputElement>,
            SizeAttr<HTMLInputElement>
        );
    }
}

/** Augment class definition with the DOM attributes introduced by `mixinDOMAttributes()` above. */
export interface TextInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    DataListAttr<HTMLInputElement, EventMap>,
    MinMaxLengthAttr<HTMLInputElement, EventMap>,
    PatternAttr<HTMLInputElement, EventMap>,
    PlaceholderAttr<HTMLInputElement, EventMap>,
    SizeAttr<HTMLInputElement, EventMap> { }

/**
 * Factory for TextInput components.
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
