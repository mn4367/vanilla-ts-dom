import { AutocompleteAttr, cid, ComponentFactory, DefaultEventMap, DirnameAttr, ElementComponentWithChildren, MinMaxLengthAttr, mixin, mixinDOMProperties, NameAttr, NativeDisabledAttr, NullableString, PlaceholderAttr, ReadonlyAttr, RequiredAttr, SelectionEndProp, SelectionStartProp, ValueAttr } from "@vanilla-ts/core";
import { Text } from "./Text.js";
import { TextField } from "./TextField.js";


/**
 * Textarea component (`<textarea>`).
 */
export class TextArea<Child extends Text = Text, EventMap extends DefaultEventMap = DefaultEventMap> extends ElementComponentWithChildren<HTMLTextAreaElement, Child, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;
    protected _rows: number;
    protected _cols: number;

    /**
     * Create TextArea component.
     * @param text The text content for the textarea element.
     * @param rows The number of visible text lines for the control.
     * @param cols The visible width of the text control, in average character widths.
     * @param id The id (attribute) of the textarea element. If `id` is `undefined` or omitted, a
     * unique ID will be generated. If `id` is explicitely set to `null` or an empty string, no id
     * attribute will be set. Any other value will be used as the id attribute.
     * @param name The `name` attribute for the textarea element.
     */
    constructor(text?: string, rows?: number, cols?: number, id?: NullableString, name?: string) {
        super("textarea");
        id === undefined
            ? this.id(cid())
            : id && this.id(id);
        name && this.name(name);
        this.rows(Math.max(rows ?? 2, 1))
            .cols(Math.max(cols ?? 20, 1));
        text && this.text(text);
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
     * Get/set the `wrap` attribute of the component.
     */
    public get Wrap(): "hard" | "soft" | "off" {
        return this._dom.wrap as "hard" | "soft" | "off";
    }
    /** @inheritdoc */
    public set Wrap(v: "hard" | "soft" | "off") {
        this._dom.wrap = v;
    }

    /**
     * Set the `wrap` attribute of the component.
     * @param v The value to be set.
     * @returns This instance.
     */
    public wrap(v: "hard" | "soft" | "off"): this {
        this._dom.wrap = v;
        return this;
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            AutocompleteAttr<HTMLTextAreaElement>,
            DirnameAttr<HTMLTextAreaElement>,
            MinMaxLengthAttr<HTMLTextAreaElement>,
            NameAttr<HTMLTextAreaElement>,
            PlaceholderAttr<HTMLTextAreaElement>,
            NativeDisabledAttr<HTMLTextAreaElement>,
            ReadonlyAttr<HTMLTextAreaElement>,
            RequiredAttr<HTMLTextAreaElement>,
            ValueAttr<HTMLTextAreaElement>,
            SelectionEndProp<HTMLTextAreaElement>,
            SelectionStartProp<HTMLTextAreaElement>
        );
        /** Mixin `TextField` functionality. */
        mixin(false, this, TextField<HTMLTextAreaElement>);
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface TextArea<Child extends Text = Text, EventMap extends DefaultEventMap = DefaultEventMap> extends // eslint-disable-line @typescript-eslint/no-unused-vars,jsdoc/require-jsdoc
    AutocompleteAttr<HTMLTextAreaElement, EventMap>,
    DirnameAttr<HTMLTextAreaElement, EventMap>,
    MinMaxLengthAttr<HTMLTextAreaElement, EventMap>,
    NameAttr<HTMLTextAreaElement, EventMap>,
    PlaceholderAttr<HTMLTextAreaElement, EventMap>,
    NativeDisabledAttr<HTMLTextAreaElement, EventMap>,
    ReadonlyAttr<HTMLTextAreaElement, EventMap>,
    RequiredAttr<HTMLTextAreaElement, EventMap>,
    ValueAttr<HTMLTextAreaElement, EventMap>,
    SelectionEndProp<HTMLTextAreaElement, EventMap>,
    SelectionStartProp<HTMLTextAreaElement, EventMap>,
    TextField<HTMLTextAreaElement, EventMap> { }

/**
 * Factory for `TextArea` components.
 */
export class TextAreaFactory<Child extends Text = Text, T = unknown> extends ComponentFactory<TextArea<Child>> {
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
    public textArea(text?: string, rows?: number, cols?: number, id?: string, name?: string, data?: T): TextArea<Child> {
        return this.setupComponent(new TextArea<Child>(text, rows, cols, id, name), data);
    }
}
