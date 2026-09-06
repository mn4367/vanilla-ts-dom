import { AutocompleteAttr, cid, ComponentFactory, DefaultEventMap, ElementComponentWithChildren, mixinDOMProperties, MultipleAttr, NameAttr, NativeDisabledAttr, NullableString, RequiredAttr, SizeAttr, ValueAttr } from "@vanilla-ts/core";
import { Hr } from "./Hr.js";
import { OptGroup } from "./OptGroup.js";
import { Option } from "./Option.js";


/** Allowed types of entries in a drop-down list. */
export type SelectChild = Option | OptGroup | Hr;

/**
 * Select component (`<select>`).
 */
export class Select<Child extends SelectChild = SelectChild, EventMap extends DefaultEventMap = DefaultEventMap> extends ElementComponentWithChildren<HTMLSelectElement, Child, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;

    /**
     * Create Select component.
     * @param options The option elements to be displayed in the select.
     * @param id The id (attribute) of the select. If `id` is `undefined` or omitted, a unique ID
     * will be generated. If `id` is explicitely set to `null` or an empty string, no id attribute
     * will be set. Any other value will be used as the id attribute.
     * @param value The value of the select.
     * @param name The name (attribute) of the select.
     */
    constructor(options?: Child[], id?: NullableString, value?: string, name?: string) {
        super("select");
        this.options(options ?? []);
        id === undefined
            ? this.id(cid())
            : id && this.id(id);
        value && this.value(value);
        name && this.name(name);
    }

    /**
     * Get/set the options of the drop-down list.
     * - The __getter__ _only_ returns all `Option` instances which are child components of this
     *   `Select` instance list. If there are any `OptGroup` instances in the list, their child
     *   `Option` instances will also be included in the returned array, but not the `OptGroup`
     *   instances themselves (or instances of `Hr`, if any).
     * - The __setter__ will _replace_ all child components of this `Select` instance with the
     *   specified values; these child components are also disposed of(!), so if they are needed or
     *   referenced somewhere else they must be extracted or removed before calling the setter
     *   (using `<selectInstance>.extract()`, `<selectInstance>.remove()`).
     */
    public get Options(): Option[] {
        const result: Option[] = [];
        const addOptions = (children: Iterable<SelectChild>): void => { // eslint-disable-line jsdoc/require-jsdoc
            for (const child of children) {
                if (child instanceof Option) {
                    result.push(child);
                } else if (child instanceof OptGroup) {
                    addOptions(child.Children);
                }
            }
        };
        addOptions(this.Children);
        return result;
    }
    /** @inheritdoc */
    public set Options(v: Child[]) {
        this.options(v);
    }

    /**
     * Set the options of the drop-down list. __Note:__ this will _replace_ all child components of
     * this `Select` instance with the specified values; these child components are also disposed
     * of(!), so if they are needed or referenced somewhere else they must be extracted or removed
     * before calling the setter (using `<selectInstance>.extract()`, `<selectInstance>.remove()`).
     * @param v The options for the drop-down list.
     * @returns This instance.
     */
    public options(v: Child[]): this {
        const oldValue = this.Value;
        const extracted: Child[] = [];
        this.extract(extracted);
        for (const component of extracted) {
            component.dispose();
        }
        this._dom.replaceChildren();
        this.append(...v);
        this.value(oldValue);
        return this;
    }

    /**
     * Get/set the text that is displayed in the drop-down list. `TextValue` is one of the values
     * behind the drop-down list (e.g. `<option value="open">Open</option>`).
     */
    public get TextValue(): string {
        const result = this._dom.selectedOptions[0] ? this._dom.selectedOptions[0].textContent : undefined;
        return result ? result : "";
    }
    /** @inheritdoc */
    public set TextValue(v: string) {
        this.textValue(v);
    }

    /**
     * Get/set the text that is displayed in the drop-down list. `v` is one of the values behind the
     * drop-down list (e.g. `<option value="open">Open</option>`).
     * @param v The text to be selected in the drop-down list.
     * @returns This instance.
     */
    public textValue(v: string): this {
        const options = this.Options;
        let l = options.length;
        while (l--) {
            if (options[l].Value === v) {
                this.SelectedIndex = l;
                break;
            }
        }
        return this;
    }

    /**
     * Get/set the index of the selected value in the drop-down list. If `Multiple` is set to
     * `true`, this will be the index of the first selected value.
     * - The __getter__ returns `-1` if no value is selected.
     * - The __setter__ will select the value at the specified index, and deselect all other values.
     */
    public get SelectedIndex(): number {
        return this._dom.selectedIndex;
    }
    /** @inheritdoc */
    public set SelectedIndex(v: number) {
        this._dom.selectedIndex = v;
    }

    /**
     * Set the index of the selected value in the drop-down list. If `Multiple` is set to `true`,
     * this will deselect all other values.
     * @param v The index of the value to be selected in the drop-down list.
     * @returns This instance.
     */
    public selectedIndex(v: number): this {
        this._dom.selectedIndex = v;
        return this;
    }

    /**
     * Get the selected option in the drop-down list. If `Multiple` is set to `true`, this will be
     * the first selected option. If no option is selected, this will return `undefined`.\
     * __Note:__ There is no setter and also no `selectedOption()` function for this property since
     * it is just easier to use the `Options` property and set the `Selected` property of the
     * desired `Option` instance in the returned array.
     */
    public get SelectedOption(): Option | undefined {
        const index = this._dom.selectedIndex;
        return index >= 0 ? this.Options[index] : undefined;
    }

    /**
     * Get/set the zero-based indexes of the selected options in `Options`, including options
     * inside option groups.
     * - The __getter__ returns the indexes in option order, or an empty array if none are selected.
     * - The __setter__ selects options whose indexes are included in the array and deselects the
     *   others. Indexes that do not match an option are ignored.
     * - `Multiple` must be `true` to select more than one option; otherwise, the native select
     *   element's single-selection behavior applies.
     */
    public get SelectedIndexes(): number[] {
        const result: number[] = [];
        const options = this.Options;
        for (let i = 0; i < options.length; i++) {
            options[i].Selected && result.push(i);
        }
        return result;
    }
    /** @inheritdoc */
    public set SelectedIndexes(v: number[]) {
        this.selectedIndexes(v);
    }

    /**
     * Select options by their zero-based indexes in `Options`, including options inside option
     * groups, and deselect all other options. Indexes that do not match an option are ignored.
     * `Multiple` must be `true` to select more than one option; otherwise, the native select
     * element's single-selection behavior applies.
     * @param v The indexes of the options to select. An empty array deselects all options when
     * `Multiple` is `true`.
     * @returns This instance.
     */
    public selectedIndexes(v: number[]): this {
        const options = this.Options;
        for (let i = 0; i < options.length; i++) {
            options[i].Selected = v.includes(i);
        }
        return this;
    }

    /**
     * Get the selected options in the drop-down list. If `Multiple` is set to `true`, this will be
     * all selected options. If no option is selected, this will return an empty array.\
     * __Note:__ There is no setter and also no `selectedOptions()` function for this property since
     * it is just easier to use the `Options` property and set the `Selected` property of the
     * individual `Option` instances in the returned array.
     */
    public get SelectedOptions(): Option[] {
        return this.Options.filter(option => option.Selected);
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            AutocompleteAttr<HTMLSelectElement>,
            MultipleAttr<HTMLSelectElement>,
            NameAttr<HTMLSelectElement>,
            NativeDisabledAttr<HTMLSelectElement>,
            RequiredAttr<HTMLSelectElement>,
            SizeAttr<HTMLSelectElement>,
            ValueAttr<HTMLSelectElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Select<Child extends SelectChild = SelectChild, EventMap extends DefaultEventMap = DefaultEventMap> extends // eslint-disable-line @typescript-eslint/no-unused-vars,jsdoc/require-jsdoc
    AutocompleteAttr<HTMLSelectElement, EventMap>,
    MultipleAttr<HTMLSelectElement, EventMap>,
    NameAttr<HTMLSelectElement, EventMap>,
    NativeDisabledAttr<HTMLSelectElement, EventMap>,
    RequiredAttr<HTMLSelectElement, EventMap>,
    SizeAttr<HTMLSelectElement, EventMap>,
    ValueAttr<HTMLSelectElement, EventMap> { }

/**
 * Factory for `Select` components.
 */
export class SelectFactory<Child extends SelectChild = SelectChild, T = unknown> extends ComponentFactory<Select<Child>> {
    /**
     * Create, set up and return Select component.
     * @param options The option elements to be displayed in the select.
     * @param id The id (attribute) of the select.
     * @param value The value of the select.
     * @param name The name (attribute) of the select.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Select component.
     */
    public select(options: Child[], id?: string, value?: string, name?: string, data?: T): Select<Child> {
        return this.setupComponent(new Select<Child>(options, id, value, name), data);
    }
}
