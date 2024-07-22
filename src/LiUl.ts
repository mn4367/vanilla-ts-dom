import { AnyType, ComponentFactory, ElementComponentWithChildren } from "@vanilla-ts/core";
import { mixinDOMProps, TextProp } from "./DOMProperties.js";


/**
 * List item component (`<li>`) for unordered lists (`<ul>`).
 */
export class LiUl extends (<
    new (...args: AnyType[]) =>
        & ElementComponentWithChildren<HTMLLIElement>
        & TextProp<HTMLLIElement>
    >mixinDOMProps(
        ElementComponentWithChildren<HTMLLIElement>,
        TextProp<HTMLLIElement>,
    )) {
    /**
     * Create `<li>` component.
     * @param text The text content for the li element.
     */
    constructor(text?: string) {
        super("li");
        this._dom.textContent = text ? text : null;
    }
}

/**
 * Factory for `<li>` based components.
 */
export class LiUlFactory<T> extends ComponentFactory<LiUl> {
    /**
     * Create, set up and return LiUl component.
     * @param text The text content for the li element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns LiUl component.
     */
    public liUl(text?: string, data?: T): LiUl {
        return this.setupComponent(new LiUl(text), data);
    }
}
