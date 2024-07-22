import {
    AConstructor,
    ACustomComponentEvent,
    AElementComponent,
    AElementComponentWithChildren,
    Constructor,
    Ctor,
    extend,
    HTMLElementWithAltAttribute,
    HTMLElementWithChildren,
    HTMLElementWithLoadingAttribute,
    HTMLElementWithNameAttribute,
    HTMLElementWithNValueAttribute,
    HTMLElementWithNWidthHeightAttribute,
    HTMLElementWithReadonlyAttribute,
    HTMLElementWithRequiredAttribute,
    HTMLElementWithSrcAttribute,
    HTMLElementWithSValueAttribute,
    HTMLElementWithSWidthHeightAttribute,
    IElementComponent,
    INodeComponent,
    LoadingAttributeValues,
    NullableString,
    UnionToIntersection
} from "@vanilla-ts/core";


/**
 * This file contains various abstract classes that have default implementations of DOM properties
 * that are used in some DOM components. These properties are added as mixins to some DOM components
 * to avoid repeating the code in the components themselves.
 * @todo Extend with more DOM properties.
 */


/**
 * Extends a class with additional DOM properties.
 * @param baseClass The base class that will be extended wit DOM properties.
 * @param properties The classes of the DOM properties to be merged into `baseClass`.
 * @returns A class based on `baseClass` with additional DOM properties given by `properties`.
 * @see Class `Checkbox` in `Checkbox.ts` for an example for using this technique.
 */
export function mixinDOMProps<T extends Ctor<unknown>, R extends T[], EventMap extends HTMLElementEventMap>(
    baseClass: Constructor<IElementComponent<HTMLElement, EventMap>> | AConstructor<IElementComponent<HTMLElement, EventMap>>,
    ...properties: [...R]
): new (_tagName: keyof HTMLElementTagNameMap, _is?: string | undefined) => UnionToIntersection<InstanceType<[...R][number]>> {
    return extend(baseClass, ...properties);
}

/**
 * 'Text' getter/setter and set method returning this instance.
 * 
 * This property is a workaround for the problem that setting `Text` is impossible for instances of
 * `AElementComponentWithChildren` (the setter dosn't exist) and calling `text()` on such instances
 * leads to an exception because the default implementation of `AElementComponentWithChildren`
 * doesn't allow to 'destroy' a components children by setting the DOM property `textContent`. This
 * makes it very inconvenient to set a text/caption for simple elements like a span or button.
 * 
 * This property mixin makes setting text easy again but you have to be aware that setting text on
 * such components (which can have sub-components) will 'destroy' all previously contained
 * components before re-assigning `textContent`.
 * 
 * So this mixin should only be used for components that provide implementations for simple elements
 * like `em`, `strong`, `h1-6`, `label`, `button` etc.
 */
export abstract class TextProp<T extends HTMLElementWithChildren> extends AElementComponentWithChildren<T> {
    /**
     * Get/set text attribute of the component.
     */
    public override get Text(): NullableString {
        return this._dom.textContent;
    }
    /** @inheritdoc */
    public override set Text(v: NullableString) {
        this.text(v);
    }

    /**
     * Set text attribute of the component. This will clear the component first (all children are
     * disposed!) before setting `textContent` to a new value.
     * @param v The text to be set or `null` to remove the text.
     * @returns This instance.
     */
    public override text(v: NullableString): this {
        this.clear();
        this._dom.textContent = v;
        return this;
    }
}

/**
 * 'Name' getter/setter and set method returning this instance.
 */
export abstract class NameProp<T extends HTMLElementWithNameAttribute> extends AElementComponent<T> {
    /**
     * Get/set name attribute of the component.
     */
    public get Name(): string {
        return this._dom.name;
    }
    /** @inheritdoc */
    public set Name(v: string) {
        this._dom.name = v;
    }

    /**
     * Set name attribute of the component.
     * @param v The name to be set or `null` to remove the attribute.
     * @returns This instance.
     */
    public name(v: string): this {
        this._dom.name = v;
        return this;
    }
}

/**
 * 'Value' (string) getter/setter and set method returning this instance.\
 * __Notes:__
 * - For some input elements the value is the content of the `value` attribute, for others like
 *   `input="text"` there is no `value` attribute.
 * - The getter always returns a string, even if there is no `value` attribute. If, for example,
 *   an `input="checkbox"`has no `value` attribute, the result of the property `Value` is an
 *   empty string.
 * - The setter allows a string or `null` to be passed and uses `attrib()` internally, i.e. if
 *   `null` is set, the `value` attribute is removed. Setting `null` also works for input
 *   elements such as `input="text"` (no `value` attribute). Ultimately, this means that calling
 *   `<input>.value(null).value` always results in an empty string for all input types.
 * - The property `Value` must be overridden by input elements of type `image` since `value`
 *   isn't avaliable for this type, so using `Value` should do nothing.
 */
export abstract class StringValueProp<T extends HTMLElementWithSValueAttribute> extends AElementComponent<T> {
    /**
     * Get/set the value of the component.
     */
    public get Value(): string {
        return this._dom.value;
    }
    /** @inheritdoc */
    public set Value(v: string) {
        this._dom.value = v;
    }

    /**
     * Get/set the value of the component.
     * @param v The value to be set.
     * @returns This instance.
     */
    public value(v: string) {
        this._dom.value = v;
        return this;
    }
}

/**
 * 'Value' (number) getter/setter and set method returning this instance.
 */
export abstract class NumberValueProp<T extends HTMLElementWithNValueAttribute> extends AElementComponent<T> {
    /**
     * Get/set the value of the component.
     */
    public get Value(): number {
        return this._dom.value;
    }
    /** @inheritdoc */
    public set Value(v: number) {
        this._dom.value = v;
    }

    /**
     * Get/set the value of the component.
     * @param v The value to be set.
     * @returns This instance.
     */
    public value(v: number) {
        this._dom.value = v;
        return this;
    }
}

/**
 * 'Required' getter/setter and set method returning this instance.
 */
export abstract class RequiredProp<T extends HTMLElementWithRequiredAttribute> extends AElementComponent<T> {
    /**
     * Get/set the required attribute value of the component.
     */
    public get Required(): boolean {
        return this._dom.required;
    }
    /** @inheritdoc */
    public set Required(v: boolean) {
        this._dom.required = v;
    }

    /**
     * Set required attribute value of the component.
     * @param v The required attribute value to be set.
     * @returns This instance.
     */
    public required(v: boolean): this {
        this._dom.required = v;
        return this;
    }
}

/**
 * 'Readonly' getter/setter and set method returning this instance.
 */
export abstract class ReadonlyProp<T extends HTMLElementWithReadonlyAttribute> extends AElementComponent<T> {
    /**
     * Get/set the readonly attribute value of the component.\
     * __Note:__ Not supported for the input elements of the types `hidden`, `range`, `color`,
     * `checkbox`, `radio`, and `button`, so it should be overrideen with a `noop` property there.
     */
    public get Readonly(): boolean {
        return this._dom.readOnly;
    }
    /** @inheritdoc */
    public set Readonly(v: boolean) {
        this._dom.readOnly = v;
    }

    /**
     * Set readonly attribute value of the component.
     * @param v The readonly attribute value to be set.
     * __Note:__ Not supported for the input elements of the types `hidden`, `range`, `color`,
     * `checkbox`, `radio`, and `button`, so it should be overrideen with a `noop` property there.
     * @returns This instance.
     */
    public readonly(v: boolean): this {
        this._dom.readOnly = v;
        return this;
    }
}

/**
 * Custom 'checked' event for checkboxes and radio buttons.
 */
export class CheckedEvent<S extends INodeComponent<Node>, D extends object = {
    /** `true`, if the checkbox/radio button is checked, otherwise `false`. */
    Checked: boolean;
}> extends ACustomComponentEvent<"checked", S, D> { }

/**
 * 'Checked' getter/setter and set method returning this instance.
 */
export abstract class CheckedProp<T extends HTMLInputElement> extends AElementComponent<T> {
    /**
     * Get/set the checked attribute value of the component (`checkbox` or `radio`).\
     * __Note:__ Only supported for the input elements of the types `checkbox` and `radio`.
     */
    public get Checked(): boolean {
        return this._dom.checked;
    }
    /** @inheritdoc */
    public set Checked(v: boolean) {
        this.checked(v);
    }

    /**
     * Set checked attribute value of the component (`checkbox` or `radio`).
     * @param v The checked attribute value to be set.
     * __Note:__ Only supported for the input elements of the types `checkbox` and `radio`.
     * @returns This instance.
     */
    public checked(v: boolean): this {
        // Only valid for `checkbox` but causes no problems for `radio`.
        this._dom.indeterminate = false;
        this._dom.checked = v;
        //  Fire an event which supports checking if the state of the component was changed.
        this._dom.dispatchEvent(new CheckedEvent("checked", this, { Checked: this._dom.checked })); // eslint-disable-line jsdoc/require-jsdoc
        return this;
    }

    /**
     * Toggle the checked attribute value of the component (`checkbox` or `radio`).
     * __Note:__ Only supported for the input elements of the types `checkbox` and `radio`.
     * @returns This instance.
     */
    public toggleChecked(): this {
        this.checked(!this.Checked);
        return this;
    }
}

/**
 * 'MinLength/MaxLength' getters/setters and set methods returning this instance.
 */
export abstract class MinMaxLengthProp<T extends HTMLInputElement | HTMLTextAreaElement> extends AElementComponent<T> {
    /**
     * Get/set the minLength DOM property of this input.
     */
    public get MinLength(): number {
        return this._dom.minLength;
    }
    /** @inheritdoc */
    public set MinLength(v: number) {
        this.minLength(v);
    }

    /**
     * Set the minLength DOM property of this input.
     * @param v The value to be set.
     * @returns This instance.
     */
    public minLength(v: number): this {
        if (v <= 0) {
            this._dom.minLength = -1;
            return this;
        }
        const maxLength = this.MaxLength;
        // maxLength not set, no further check.
        if (maxLength === -1) {
            this._dom.minLength = v;
            return this;
        }
        // Adapt maxLength DOM property to have a valid range (in this case a fixed length).
        if (v > maxLength) {
            this._dom.maxLength = v;
        }
        this._dom.minLength = v;
        return this;
    }

    /**
     * Get/set the maxlength attribute value of this input.
     */
    public get MaxLength(): number {
        return this._dom.maxLength;
    }
    /** @inheritdoc */
    public set MaxLength(v: number) {
        this.maxLength(v);
    }

    /**
     * Set the maxLength DOM property of this input.
     * @param v The value to be set.
     * @returns This instance.
     */
    public maxLength(v: number): this {
        if (v <= 0) {
            this._dom.maxLength = -1;
            return this;
        }
        const minLength = this._dom.minLength;
        // minLength not set, no further check.
        if (minLength === -1) {
            this._dom.maxLength = v;
            return this;
        }
        // Adapt minLength DOM property to have a valid range (in this case a fixed length).
        if (v < minLength) {
            this._dom.minLength = v;
        }
        this._dom.maxLength = v;
        return this;
    }
}

/**
 * 'Min/Max' getter/setter and set method returning this instance.
 */
export abstract class MinMaxProp<T extends HTMLInputElement> extends AElementComponent<T> {
    /**
     * Get/set the min attribute value of the component.
     */
    public get Min(): string {
        return this._dom.min;
    }
    /** @inheritdoc */
    public set Min(v: string) {
        this._dom.min = v;
    }

    /**
     * Set min attribute value of the component.
     * @param v The min attribute value to be set.
     * @returns This instance.
     */
    public min(v: string): this {
        this._dom.min = v;
        return this;
    }

    /**
     * Get/set the max attribute value of the component.
     */
    public get Max(): string {
        return this._dom.max;
    }
    /** @inheritdoc */
    public set Max(v: string) {
        this._dom.max = v;
    }

    /**
     * Set max attribute value of the component.
     * @param v The max attribute value to be set.
     * @returns This instance.
     */
    public max(v: string): this {
        this._dom.max = v;
        return this;
    }
}

/**
 * 'Step' getter/setter and set method returning this instance.
 */
export abstract class StepProp<T extends HTMLInputElement> extends AElementComponent<T> {
    /**
     * Get/set the setp attribute value of the component.
     */
    public get Step(): string {
        return this._dom.step;
    }
    /** @inheritdoc */
    public set Step(v: string) {
        this._dom.step = v;
    }

    /**
     * Set step attribute value of the component.
     * @param v The step attribute value to be set.
     * @returns This instance.
     */
    public step(v: string): this {
        this._dom.step = v;
        return this;
    }
}

/**
 * 'Placeholder' getter/setter and set method returning this instance.
 */
export abstract class PlaceHolderProp<T extends HTMLInputElement | HTMLTextAreaElement> extends AElementComponent<T> {
    /**
     * Get/set the placeholder attribute value of the component.
     */
    public get Placeholder(): string {
        return this._dom.placeholder;
    }
    /** @inheritdoc */
    public set Placeholder(v: string) {
        this._dom.placeholder = v;
    }

    /**
     * Set placeholder attribute value of the component.
     * @param v The placeholder attribute value to be set.
     * @returns This instance.
     */
    public placeholder(v: string): this {
        this._dom.placeholder = v;
        return this;
    }
}

/**
 * 'DataList' (suggestion values) getter/setter and set method returning this instance.\
 * __Note:__ Only some inputs can have a 'DataList' property (`list` attribute).
 * @see `@vanilla-ts/core HTMLInputsWithDataList`
 */
export abstract class DataListProp<T extends HTMLInputElement> extends AElementComponent<T> {
    /**
     * Get/set the datalist (suggestion values) of the component.
     */
    public get DataList(): string[] {
        const result: string[] = [];
        const dataListID = this.attr("list");
        if (dataListID) {
            const dataList = this._dom.querySelector("#" + dataListID);
            if (dataList) {
                for (const option of dataList.querySelectorAll("option")) {
                    result.push(option.value);
                }
            }
        }
        return result;
    }
    /** @inheritdoc */
    public set DataList(v: string[]) {
        this.dataList(v);
    }

    /**
     * Set new suggestion values.
     * @param values The new suggestion values.
     * @returns This instance.
     */
    public dataList(values: string[]): this {
        let dataListID = this.attr("list");
        if (!dataListID) {
            if (values.length === 0) {
                return this;
            }
            dataListID = `dl${Date.now().valueOf()}${Math.floor(Math.random() * 1000)}`;
        }
        let dataList = document.getElementById(dataListID);
        if (dataList && values.length === 0) {
            this.attrib("list", null);
            dataList.remove();
            return this;
        }
        if (!dataList) {
            dataList = document.createElement("datalist");
            dataList.id = dataListID;
            this.attrib("list", dataListID);
            this._dom.appendChild(dataList);
        }
        while (dataList.lastChild) {
            dataList.lastChild.remove();
        }
        for (const value of values) {
            const option = document.createElement("option");
            option.value = value;
            dataList.append(option);
        }
        return this;
    }
}

/**
 * 'Width' and 'Height' (string) getter/setter and set method returning this instance.
 */
export abstract class StringWidthHeightProp<T extends HTMLElementWithSWidthHeightAttribute> extends AElementComponent<T> {
    /**
     * Get/set the width attribute value of the component.
     */
    public get Width(): string {
        return this._dom.width;
    }
    /** @inheritdoc */
    public set Width(v: string) {
        this._dom.width = v;
    }

    /**
     * Set width attribute value of the component.
     * @param v The width attribute value to be set.
     * @returns This instance.
     */
    public width(v: string): this {
        this._dom.width = v;
        return this;
    }

    /**
     * Get/set the height attribute value of the component.
     */
    public get Height(): string {
        return this._dom.height;
    }
    /** @inheritdoc */
    public set Height(v: string) {
        this._dom.height = v;
    }

    /**
     * Set height attribute value of the component.
     * @param v The height attribute value to be set.
     * @returns This instance.
     */
    public height(v: string): this {
        this._dom.height = v;
        return this;
    }
}

/**
 * 'Width' and 'Height' (number) getter/setter and set method returning this instance.
 */
export abstract class NumberWidthHeightProp<T extends HTMLElementWithNWidthHeightAttribute> extends AElementComponent<T> {
    /**
     * Get/set the width attribute value of the component.
     */
    public get Width(): number {
        return this._dom.width;
    }
    /** @inheritdoc */
    public set Width(v: number) {
        this._dom.width = v;
    }

    /**
     * Set width attribute value of the component.
     * @param v The width attribute value to be set.
     * @returns This instance.
     */
    public width(v: number): this {
        this._dom.width = v;
        return this;
    }

    /**
     * Get/set the height attribute value of the component.
     */
    public get Height(): number {
        return this._dom.height;
    }
    /** @inheritdoc */
    public set Height(v: number) {
        this._dom.height = v;
    }

    /**
     * Set height attribute value of the component.
     * @param v The height attribute value to be set.
     * @returns This instance.
     */
    public height(v: number): this {
        this._dom.height = v;
        return this;
    }
}

/**
 * 'Src' getter/setter and set method returning this instance.
 */
export abstract class SrcProp<T extends HTMLElementWithSrcAttribute> extends AElementComponent<T> {
    /**
     * Get/set the src attribute value of the component.
     */
    public get Src(): string {
        return this._dom.src;
    }
    /** @inheritdoc */
    public set Src(v: string) {
        this._dom.src = v;
    }

    /**
     * Set src attribute value of the component.
     * @param v The src attribute value to be set.
     * @returns This instance.
     */
    public src(v: string): this {
        this._dom.src = v;
        return this;
    }
}

/**
 * 'Alt' getter/setter and set method returning this instance.
 */
export abstract class AltProp<T extends HTMLElementWithAltAttribute> extends AElementComponent<T> {
    /**
     * Get/set the alt attribute value of the component.
     */
    public get Alt(): string {
        return this._dom.alt;
    }
    /** @inheritdoc */
    public set Alt(v: string) {
        this._dom.alt = v;
    }

    /**
     * Set alt attribute value of the component.
     * @param v The alt attribute value to be set.
     * @returns This instance.
     */
    public alt(v: string): this {
        this._dom.alt = v;
        return this;
    }
}

/**
 * 'Loading' getter/setter and set method returning this instance.
 */
export abstract class LoadingProp<T extends HTMLElementWithLoadingAttribute> extends AElementComponent<T> {
    /**
     * Get/set the loading attribute value of the component. Allowed values are `lazy` and `eager`.
     */
    public get Loading(): LoadingAttributeValues {
        return this._dom.loading as LoadingAttributeValues;
    }
    /** @inheritdoc */
    public set Loading(v: LoadingAttributeValues) {
        this._dom.loading = v;
    }

    /**
     * Set loading attribute value of the component. Allowed values are `lazy` and `eager`.
     * @param v The loading attribute value to be set.
     * @returns This instance.
     */
    public loading(v: LoadingAttributeValues): this {
        this._dom.loading = v;
        return this;
    }
}
