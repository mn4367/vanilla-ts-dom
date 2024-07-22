import { AnyType, ComponentFactory, ElementComponentWithChildren } from "@vanilla-ts/core";
import { mixinDOMProps, NumberValueProp, TextProp } from "./DOMProperties.js";


/**
 * List item component (`<li>`) for ordered lists (`<ol>`).
 */
export class LiOl extends (<
    new (...args: AnyType[]) =>
        & ElementComponentWithChildren<HTMLLIElement>
        & NumberValueProp<HTMLLIElement>
        & TextProp<HTMLLIElement>
    >mixinDOMProps(
        ElementComponentWithChildren<HTMLLIElement>,
        NumberValueProp<HTMLLIElement>,
        TextProp<HTMLLIElement>,
    )) {
    /**
     * Create <li> component.
     * @param text The text content for the li element.
     * @param value The numeric value for the li element.
     */
    constructor(text?: string, value?: number) {
        super("li");
        this._dom.textContent = text ? text : null;
        if (value !== undefined) {
            this.value(value);
        }
    }
}

/**
 * Factory for `<li>` based components.
 */
export class LiOlFactory<T> extends ComponentFactory<LiOl> {
    /**
     * Create, set up and return LiOl component.
     * @param text The text content for the li element.
     * @param value The numeric value for the li element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns LiOl component.
     */
    public liOl(text?: string, value?: number, data?: T): LiOl {
        return this.setupComponent(new LiOl(text, value), data);
    }
}
