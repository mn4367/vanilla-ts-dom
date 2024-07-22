import { AnyType, ComponentFactory, ElementComponentWithChildren } from "@vanilla-ts/core";
import { mixinDOMProps, TextProp } from "./DOMProperties.js";


/**
 * Button component (`<button>`).
 */
export class Button extends (<
    new (...args: AnyType[]) =>
        & ElementComponentWithChildren<HTMLButtonElement>
        & TextProp<HTMLButtonElement>
    >mixinDOMProps(
        ElementComponentWithChildren<HTMLButtonElement>,
        TextProp<HTMLButtonElement>,
    )) {
    /**
     * Create `<button>` component.
     * @param caption The caption for the button.
     */
    constructor(caption?: string) {
        super("button");
        caption ? this.text(caption) : undefined;
    }
}

/**
 * Factory for `<button>` based components.
 */
export class ButtonFactory<T> extends ComponentFactory<Button> {
    /**
     * Create, set up and return Button component.
     * @param caption The button caption.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component.
     */
    public button(caption?: string, data?: T): Button {
        return this.setupComponent(new Button(caption), data);
    }
}
