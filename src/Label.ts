import { AnyType, ComponentFactory, ElementComponentWithChildren, NullableString } from "@vanilla-ts/core";
import { mixinDOMProps, TextProp } from "./DOMProperties.js";


/**
 * Label component (`<label>`).
 */
export class Label extends (<
    new (...args: AnyType[]) =>
        & ElementComponentWithChildren<HTMLLabelElement>
        & TextProp<HTMLLabelElement>
    >mixinDOMProps(
        ElementComponentWithChildren<HTMLLabelElement>,
        TextProp<HTMLLabelElement>,
    )) {
    /**
     * Create `<label>` component.
     * @param text The text content for the label.
     * @param for_ Content of the `for` attribute.
     */
    constructor(text?: string, for_?: string) {
        super("label");
        text ? this._dom.textContent = text : undefined;
        for_ ? this.for(for_) : undefined;
    }

    /**
     * Get/set `for` attribute value of underlying HTML element.
     */
    public get For(): NullableString {
        return this.attr("for");
    }
    /** @inheritdoc */
    public set For(v: NullableString) {
        this.for(v);
    }

    /**
     * Set for attribute of underlying HTML element.
     * @param v The for attribute to be set or `null` to remove the attribute.
     * @returns This instance.
     */
    public for(v: NullableString): this {
        this.attrib("for", v);
        return this;
    }
}

/**
 * Factory for `<label>` based components.
 */
export class LabelFactory<T> extends ComponentFactory<Label> {
    /**
     * Create, set up and return Label component.
     * @param text The text content for the label.
     * @param for_ Content of the `for` attribute.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Label component.
     */
    public label(text?: string, for_?: string, data?: T): Label {
        return this.setupComponent(new Label(text, for_), data);
    }
}
