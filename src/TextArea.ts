import { AutocompleteAttr, ComponentFactory, DirnameAttr, ElementComponentWithChildren, MinMaxLengthAttr, mixinDOMAttributes, NameAttr, NativeDisabledAttr, PlaceholderAttr, ReadonlyAttr, RequiredAttr, ValueAttr } from "@vanilla-ts/core";


/**
 * Textarea component (`<textarea>`).
 */
export class TextArea<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLTextAreaElement, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    protected _rows: number;
    protected _cols: number;

    /**
     * Create TextArea component.
     * @param text The text content for the textarea element.
     * @param rows The number of visible text lines for the control.
     * @param cols The visible width of the text control, in average character widths.
     * @param id The `id` attribute for the textarea element.
     * @param name The `name` attribute for the textarea element.
     */
    constructor(text?: string, rows?: number, cols?: number, id?: string, name?: string) {
        super("textarea");
        this.rows(rows !== undefined ? Math.max(rows, 1) : 2)
            .cols(cols !== undefined ? Math.max(cols, 1) : 20);
        !text || this.text(text);
        !id || this.id(id);
        !name || this.name(name);
    }

    /**
     * Get/set the `rows` attribute of the component.
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
     * Set the `rows` attribute of the component.
     * @param v The value to be set.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows
     * @returns This instance.
     */
    public rows(v: number): this {
        this._dom.rows = Math.max(v, 1);
        return this;
    }

    /**
     * Get/set the `cols` attribute of the component.
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
     * Set the `cols` attribute of the component.
     * @param v The value to be set.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#cols
     * @returns This instance.
     */
    public cols(v: number): this {
        this._dom.cols = Math.max(v, 1);
        return this;
    }

    /**
     * Get/set the `defaultValue` attribute of the component.
     */
    public get DefaultValue(): string {
        return this._dom.defaultValue;
    }
    /** @inheritdoc */
    public set DefaultValue(v: string) {
        this._dom.defaultValue = v;
    }

    /**
     * Set the `defaultValue` attribute of the component.
     * @param v The value to be set.
     * @returns This instance.
     */
    public defaultValue(v: string): this {
        this._dom.defaultValue = v;
        return this;
    }

    /**
     * Selects all text in the textarea.
     * @returns This instance.
     */
    public select(): this {
        this._dom.select();
        return this;
    }

    static {
        /** Mixin additional DOM attributes. */
        mixinDOMAttributes(
            TextArea,
            AutocompleteAttr<HTMLTextAreaElement>,
            DirnameAttr<HTMLTextAreaElement>,
            MinMaxLengthAttr<HTMLTextAreaElement>,
            NameAttr<HTMLTextAreaElement>,
            PlaceholderAttr<HTMLTextAreaElement>,
            NativeDisabledAttr<HTMLTextAreaElement>,
            ReadonlyAttr<HTMLTextAreaElement>,
            RequiredAttr<HTMLTextAreaElement>,
            ValueAttr<HTMLTextAreaElement>
        );
    }
}

/** Augment class definition with the DOM attributes introduced by `mixinDOMAttributes()` above. */
export interface TextArea<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    AutocompleteAttr<HTMLTextAreaElement, EventMap>,
    DirnameAttr<HTMLTextAreaElement, EventMap>,
    MinMaxLengthAttr<HTMLTextAreaElement, EventMap>,
    NameAttr<HTMLTextAreaElement, EventMap>,
    PlaceholderAttr<HTMLTextAreaElement, EventMap>,
    NativeDisabledAttr<HTMLTextAreaElement, EventMap>,
    ReadonlyAttr<HTMLTextAreaElement, EventMap>,
    RequiredAttr<HTMLTextAreaElement, EventMap>,
    ValueAttr<HTMLTextAreaElement, EventMap> { }

/**
 * Factory for TextArea components.
 */
export class TextAreaFactory<T> extends ComponentFactory<TextArea> {
    /**
     * Create, set up and return TextArea component.
     * @param text The text content for the textarea element.
     * @param rows The number of visible text lines for the control.
     * @param cols The visible width of the text control, in average character widths.
     * @param id The `id` attribute for the textarea element.
     * @param name The `name` attribute for the textarea element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns TextArea component.
     */
    public textArea(text?: string, rows?: number, cols?: number, id?: string, name?: string, data?: T): TextArea {
        return this.setupComponent(new TextArea(text, rows, cols, id, name), data);
    }
}
