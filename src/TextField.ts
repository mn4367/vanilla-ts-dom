import { AElementComponent } from "@vanilla-ts/core";

/**
 * Abstract base class for all input and textarea elements that are based on a text field. This
 * class provides functions, that are to be added as mixins to input and textarea elements.\
 * __Note__: This class is ___not___ meant to be used as a base class for other components!
 */
export abstract class TextField<T extends HTMLInputElement | HTMLTextAreaElement, EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends AElementComponent<T, EventMap> {
    /**
     * Selects all text in the input/textarea element.
     * @returns This instance.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
     */
    public select(): this {
        this._dom.select();
        return this;
    }

    /**
     * Replaces a range of text in an <input> or <textarea> element with a new string.
     * @param replacement The string to insert.
     * @param start The 0-based index of the first character to replace. Defaults to the current
     * selectionStart value (the start of the user's current selection).
     * @param end The 0-based index of the character after the last character to replace. Defaults
     * to the current selectionEnd value (the end of the user's current selection).
     * @param selectionMode A string defining how the selection should be set after the text has
     * been replaced. Possible values:
     * - `select` selects the newly inserted text.
     * - `start` moves the selection to just before the inserted text.
     * - `end` moves the selection to just after the inserted text.
     * - `preserve` attempts to preserve the selection. This is the default.
     * @returns This instance.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setRangeText
     */
    public setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): this {
        this._dom.setRangeText(replacement, start, end, selectionMode);
        return this;
    }

    /**
     * Sets the start and end positions of the current text selection in an <input> or <textarea>
     * element.
     * @param start The 0-based index of the first character in the current selection.
     * @param end The 0-based index of the character after the last character in the current
     * selection.
     * @param direction The direction in which the selection is performed. Possible values are:
     * - `forward` (the selection starts at the start position and moves forward to the end
     *   position)
     * - `backward` (the selection starts at the end position and moves backward to the start
     *   position)
     * - `none` (the selection is collapsed at the start position). This is the default.
     * @returns This instance.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
     */
    public setSelectionRange(start: number | null, end: number | null, direction?: "forward" | "backward" | "none"): this {
        this._dom.setSelectionRange(start, end, direction);
        return this;
    }
}
