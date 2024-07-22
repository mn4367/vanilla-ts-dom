import { AnyType, ComponentFactory } from "@vanilla-ts/core";
import { DataListProp, MinMaxLengthProp, mixinDOMProps, PlaceHolderProp } from "./DOMProperties.js";
import { Input } from "./Input.js";


/**
 * Text input component (`<input type="text">`) extended with  `MinLength`, `MaxLength` `DataList`
 * and `Placeholder` getters/setters and set methods.
 */
export class TextInput extends (<
    new (...args: AnyType[]) =>
        & Input
        & MinMaxLengthProp<HTMLInputElement>
        & PlaceHolderProp<HTMLInputElement>
        & DataListProp<HTMLInputElement>
    >mixinDOMProps(
        Input,
        MinMaxLengthProp<HTMLInputElement>,
        PlaceHolderProp<HTMLInputElement>,
        DataListProp<HTMLInputElement>
    )) {
    /**
     * Builds the input component.
     * @param id The id (attribute) of the text input.
     * @param value The value of the text input.
     * @param name The name (attribute) of the text input.
     */
    constructor(id?: string, value?: string, name?: string) {
        super("text", id, value, name);
    }
}

/**
 * Factory for `<input type="text">` components.
 */
export class TextInputFactory<T> extends ComponentFactory<TextInput> {
    /**
     * Create and return TextInput component.
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
