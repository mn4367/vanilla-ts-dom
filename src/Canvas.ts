import { ComponentFactory, ElementComponentWithChildren, INodeComponent, mixinDOMProperties, WidthHeightAttr } from "@vanilla-ts/core";
import { Text } from "./Text.js";


/**
 * Canvas component (`<canvas>`).
 */
export class Canvas<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLCanvasElement, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create Canvas component.
     * @param alternativeContent Alternative content for the `<canvas>` element.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas#alternative_content
     */
    constructor(...alternativeContent: (string | INodeComponent<Node>)[]) {
        super("canvas");
        alternativeContent.length > 0 && this.append(...alternativeContent.map(e => typeof e === "string" ? new Text(e) : e));
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            WidthHeightAttr<HTMLCanvasElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Canvas<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging,jsdoc/require-jsdoc
    WidthHeightAttr<HTMLCanvasElement, EventMap> { }

/**
 * Factory for `Canvas` components.
 */
export class CanvasFactory<T> extends ComponentFactory<Canvas> {
    /**
     * Create, set up and return Canvas component.
     * @param alternativeContent Alternative content for the `<canvas>` element.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas#alternative_content
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Canvas component.
     */
    public canvas(alternativeContent?: string | INodeComponent<Node> | (string | INodeComponent<Node>)[], data?: T): Canvas {
        return this.setupComponent(
            !alternativeContent
                ? new Canvas()
                : Array.isArray(alternativeContent)
                    ? new Canvas(...alternativeContent)
                    : new Canvas(alternativeContent),
            data
        );
    }
}
