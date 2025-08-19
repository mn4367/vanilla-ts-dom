import { ComponentFactory, DataListAttr, MinMaxLengthAttr, PatternAttr, PlaceholderAttr, SizeAttr, mixinDOMAttributes } from "@vanilla-ts/core";
import { Input } from "./Input.js";


/**
 * Search input component (`<input type="search">`) extended with  `MinLength`, `MaxLength` `DataList`
 * and `Placeholder` getters/setters and set methods.
 */
export class SearchInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends Input<EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create SearchInput component.
     * @param id The id (attribute) of the search input.
     * @param value The value of the search input.
     * @param name The name (attribute) of the search input.
     */
    constructor(id?: string, value?: string, name?: string) {
        super("search", id, value, name);
    }

    /**
     * Selects all text in the search input.
     * @returns This instance.
     */
    public select(): this {
        this._dom.select();
        return this;
    }

    static {
        /** Mixin additional DOM attributes. */
        mixinDOMAttributes(
            SearchInput,
            DataListAttr<HTMLInputElement>,
            MinMaxLengthAttr<HTMLInputElement>,
            PatternAttr<HTMLInputElement>,
            PlaceholderAttr<HTMLInputElement>,
            SizeAttr<HTMLInputElement>
        );
    }
}

// Augment class definition with the DOM attributes introduced by `mixinDOMAttributes()` above.
export interface SearchInput<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    DataListAttr<HTMLInputElement, EventMap>,
    MinMaxLengthAttr<HTMLInputElement, EventMap>,
    PatternAttr<HTMLInputElement, EventMap>,
    PlaceholderAttr<HTMLInputElement, EventMap>,
    SizeAttr<HTMLInputElement, EventMap> { }

/**
 * Factory for SearchInput components.
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
