import { AnyType, ElementComponentVoid, HTMLInputTypes } from "@vanilla-ts/core";
import { mixinDOMProps, NameProp, ReadonlyProp, RequiredProp, StringValueProp } from "./DOMProperties.js";


/**
 * Abstract base input component (`<input>`).\
 * __Note:__ This class has mixins for the properties `readonly`, `required` and `value`, however,
 * some input elements don't support these attributes, but since the vast majority supports them,
 * they are included here. Nevertheless some derived classes may have to override properties, e.g.
 * `readonly` isn't supported for checkboxes.
 */
export class Input extends (<
    new (...args: AnyType[]) =>
        ElementComponentVoid<HTMLInputElement>
        & NameProp<HTMLInputElement>
        & StringValueProp<HTMLInputElement>
        & RequiredProp<HTMLInputElement>
        & ReadonlyProp<HTMLInputElement>
    >mixinDOMProps(
        ElementComponentVoid<HTMLInputElement>,
        NameProp<HTMLInputElement>,
        StringValueProp<HTMLInputElement>,
        RequiredProp<HTMLInputElement>,
        ReadonlyProp<HTMLInputElement>
    )) {
    protected type: HTMLInputTypes;

    /**
     * Builds the `input` component.
     * @param type The type (attribute) of the input component.
     * @param id The id (attribute) of the input component.
     * @param value The value of the input element.
     * @param name The name (attribute) of the input component.
     */
    constructor(type: HTMLInputTypes, id?: string, value?: string, name?: string) {
        super("input");
        this.type = type;
        this._dom.type = this.type;
        id
            ? this.id(id)
            : undefined;
        value
            ? this.value(value)
            : this.value(""); // Otherwise this will be "on" (for checkboxes, radiobuttons, ...).
        name
            ? this.name(name)
            : undefined;
    }

    /**
     * Get type (attribute) of the input element.
     */
    public get Type(): HTMLInputTypes {
        return this.type;
    }
}
