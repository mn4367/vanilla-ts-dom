import { ComponentFactory, DirnameAttr, MinMaxLengthAttr, NullableString, PatternAttr, PlaceholderAttr, SelectionEndProp, SelectionStartProp, SizeAttr, mixin, mixinDOMProperties } from "@vanilla-ts/core";
import { Input } from "./Input.js";
import { TextField } from "./TextField.js";


/**
 * Search input component (`<input type="search">`).
 */
export class SearchInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends Input<EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;

    /**
     * Create SearchInput component.
     * @param id The id (attribute) of the search input. If `id` is `undefined` or omitted, a unique
     * ID will be generated. If `id` is explicitely set to `null` or an empty string, no id
     * attribute will be set. Any other value will be used as the id attribute.
     * @param value The value of the search input.
     * @param name The name (attribute) of the search input.
     */
    constructor(id?: NullableString, value?: string, name?: string) {
        super("search", id, value, name);
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            DirnameAttr<HTMLInputElement>,
            MinMaxLengthAttr<HTMLInputElement>,
            PatternAttr<HTMLInputElement>,
            PlaceholderAttr<HTMLInputElement>,
            SizeAttr<HTMLInputElement>,
            SelectionEndProp<HTMLInputElement>,
            SelectionStartProp<HTMLInputElement>
        );
        /** Mixin `TextField` functionality. */
        mixin(false, this, TextField<HTMLInputElement>);
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface SearchInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    DirnameAttr<HTMLInputElement, EventMap>,
    MinMaxLengthAttr<HTMLInputElement, EventMap>,
    PatternAttr<HTMLInputElement, EventMap>,
    PlaceholderAttr<HTMLInputElement, EventMap>,
    SizeAttr<HTMLInputElement, EventMap>,
    SelectionEndProp<HTMLInputElement, EventMap>,
    SelectionStartProp<HTMLInputElement, EventMap>,
    TextField<HTMLInputElement, EventMap> { }

/**
 * Factory for `SearchInput` components.
 */
export class SearchInputFactory<T> extends ComponentFactory<SearchInput> {
    /**
     * Create, set up and return SearchInput component.
     * @param id The id (attribute) of the search input.
     * @param value The value of the search input.
     * @param name The name (attribute) of the search input.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns SearchInput component.
     */
    public searchInput(id?: string, value?: string, name?: string, data?: T): SearchInput {
        return this.setupComponent(new SearchInput(id, value, name), data);
    }
}
