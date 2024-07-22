import { ComponentFactory, TextComponent } from "@vanilla-ts/core";


/**
 * Text component (for DOM text nodes).
 */
export class Text extends TextComponent {
    /**
     * Create text component.
     * @param text The content of the text node.
     */
    constructor(text: string) {
        super(text);
    }
}

/**
 * Factory for text based components.
 */
export class TextFactory<T> extends ComponentFactory<Text> {
    /**
     * Create and return text component.
     * @param text The content of the text node.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Text component.
     */
    public text(text: string, data?: T): Text {
        return this.setupComponent(new Text(text), data);
    }
}
