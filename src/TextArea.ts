import { AnyType, ComponentFactory, ElementComponentWithChildren } from "@vanilla-ts/core";
import { MinMaxLengthProp, mixinDOMProps, NameProp, PlaceHolderProp, ReadonlyProp, RequiredProp, TextProp } from "./DOMProperties.js";


/**
 * Textarea component (`<textarea>`).
 */
export class TextArea extends (<
    new (...args: AnyType[]) =>
        & ElementComponentWithChildren<HTMLTextAreaElement>
        & MinMaxLengthProp<HTMLTextAreaElement>
        & NameProp<HTMLTextAreaElement>
        & PlaceHolderProp<HTMLTextAreaElement>
        & ReadonlyProp<HTMLTextAreaElement>
        & RequiredProp<HTMLTextAreaElement>
        & TextProp<HTMLTextAreaElement>
    >mixinDOMProps(
        ElementComponentWithChildren<HTMLTextAreaElement>,
        MinMaxLengthProp<HTMLTextAreaElement>,
        NameProp<HTMLTextAreaElement>,
        PlaceHolderProp<HTMLTextAreaElement>,
        ReadonlyProp<HTMLTextAreaElement>,
        RequiredProp<HTMLTextAreaElement>,
        TextProp<HTMLTextAreaElement>
    )) {
    protected _rows: number;
    protected _cols: number;

    /**
     * Create `<textarea>` component.
     * @param text The text content for the textarea element.
     * @param rows The number of visible text lines for the control.
     * @param cols The visible width of the text control, in average character widths..
     */
    constructor(text?: string, rows?: number, cols?: number) {
        super("textarea");
        this.rows(rows !== undefined ? Math.max(rows, 1) : 2);
        this.cols(cols !== undefined ? Math.max(cols, 1) : 20);
        this._dom.textContent = text ? text : null;
    }

    /**
     * Get/set the `rows` attribute.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows
     */
    public get Rows(): number {
        return this._dom.rows;
    }
    /** @inheritdoc */
    public set Rows(v: number) {
        this.rows(v);
    }

    /**
     * Get/set the `rows` attribute.
     * @param v The new value for the `rows` attribute.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows
     * @returns This instance.
     */
    public rows(v: number): this {
        this._dom.rows = Math.max(v, 1);
        return this;
    }

    /**
     * Get/set the `cols` attribute.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#cols
     */
    public get Cols(): number {
        return this._dom.cols;
    }
    /** @inheritdoc */
    public set Cols(v: number) {
        this.cols(v);
    }

    /**
     * Get/set the `cols` attribute.
     * @param v The new value for the `cols` attribute.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#cols
     * @returns This instance.
     */
    public cols(v: number): this {
        this._dom.cols = Math.max(v, 1);
        return this;
    }
}

/**
 * Factory for `<textarea>` based components.
 */
export class TextAreaFactory<T> extends ComponentFactory<TextArea> {
    /**
     * Create, set up and return TextArea component.
     * @param text The text content for the textarea element.
     * @param rows The number of visible text lines for the control.
     * @param cols The visible width of the text control, in average character widths..
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns TextArea component.
     */
    public textArea(text?: string, rows?: number, cols?: number, data?: T): TextArea {
        return this.setupComponent(new TextArea(text, rows, cols), data);
    }
}
