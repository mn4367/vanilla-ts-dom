import { AnyType, ComponentFactory, ElementComponentWithChildren } from "@vanilla-ts/core";
import { mixinDOMProps, TextProp } from "./DOMProperties.js";


/**
 * Paragraph component (`<p>`).
 */
export class P extends (<
    new (...args: AnyType[]) =>
        & ElementComponentWithChildren<HTMLParagraphElement>
        & TextProp<HTMLParagraphElement>
    >mixinDOMProps(
        ElementComponentWithChildren<HTMLParagraphElement>,
        TextProp<HTMLParagraphElement>,
    )) {
    /**
     * Create `<p>` component.
     * @param text The text content for the p element.
     */
    constructor(text?: string) {
        super("p");
        this._dom.textContent = text ? text : null;
    }
}

/**
 * Factory for `<p>` based components.
 */
export class PFactory<T> extends ComponentFactory<P> {
    /**
     * Create, set up and return P component.
     * @param text The text content for the p element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns P component.
     */
    public p(text?: string, data?: T): P {
        return this.setupComponent(new P(text), data);
    }
}
