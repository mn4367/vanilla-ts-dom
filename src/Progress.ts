import { ACustomComponentEvent, ComponentFactory, DEFAULT_EVENT_INIT_DICT, ElementComponentWithChildren, Phrase, Phrases } from "@vanilla-ts/core";


/** Custom 'progress-value' event for progress components. */
export class ProgressValueEvent extends ACustomComponentEvent<"progress-value", Progress, {
    /** The old value of the progress component. */
    OldValue: number;
    /** The new (current) value of the progress component. */
    NewValue: number;
}> {
    /**
     * Create ProgressValueEvent event.
     * @param sender The event emitter (always `Progress`).
     * @param oldValue The old value of the progress component.
     * @param newValue The new (current) value of the progress component.
     * @param customEventInitDict Optional event properties.
     */
    constructor(sender: Progress, oldValue: number, newValue: number, customEventInitDict: EventInit = DEFAULT_EVENT_INIT_DICT) {
        super("progress-value", sender, { OldValue: oldValue, NewValue: newValue }, customEventInitDict); // eslint-disable-line jsdoc/require-jsdoc
    }
}

/** Additional event(s) for `Progress`. */
export interface ProgressEventMap extends HTMLElementEventMap {
    /**
     * The value of the progress component has changed. This event is purely informative and can't
     * be canceled.
     */
    "progress-value": ProgressValueEvent;
}

/**
 * Progress component (`<progress>`).
 */
export class Progress<EventMap extends ProgressEventMap = ProgressEventMap> extends ElementComponentWithChildren<HTMLProgressElement, EventMap> {
    protected valueObserver?: MutationObserver;
    /**
     * Create, set up and return Progress component.
     * @param max The maximum value for the component. For the setter the value must be greater than
     * `0` (it is automatically corrected to `1` if it is lower than or equal to `0`). Default: `1`.
     * @param value The current value for the element. The value must be greater than or equal to
     * `0` and less than or equal to the maximum value (it is automatically corrected so that it
     * complies with these limit values). If the value is undefined, the component shows an
     * 'indeterminate' state.
     * @param phrase The phrasing content for the `<progress>` element.
     */
    constructor(max: number = 1, value?: number, ...phrase: Phrases) {
        super("progress");
        this
            .max(max)
            .value(value);
        phrase.length === 0 || this.phrase(...phrase);
        this.valueObserver = new MutationObserver((records: MutationRecord[]) => {
            for (const record of records) {
                if (record.type === "attributes" && record.attributeName === "value") {
                    this.emit(new ProgressValueEvent(this, parseFloat(record.oldValue ?? "0"), this._dom.value));
                    break;
                }
            }
        });
        this.valueObserver?.observe(this._dom, { attributes: true, attributeOldValue: true, attributeFilter: ["value"] }); // eslint-disable-line jsdoc/require-jsdoc
    }

    /**
     * Get/set the indeterminate state of the component. If the property is set to `true`, the
     * `value` attribute is removed, otherwise the value attribute is set to `0`, if the component
     * has no value attribute, or the current `value` attribute is unchanged.
     */
    public get Indeterminate(): boolean {
        return !this._dom.hasAttribute("value");
    }
    /** @inheritdoc */
    public set Indeterminate(v: boolean) {
        this.indeterminate(v);
    }

    /**
     * Sets the indeterminate state of the component.
     * @param indeterminate `true`, if the state of the component should be indeterminate, otherwise
     * false. If `indeterminate` is `true`, the `value` attribute is removed, otherwise the value
     * attribute is set to `0`, if the component has no value attribute, or the current `value`
     * attribute is unchanged.
     * @returns This instance.
     */
    public indeterminate(indeterminate: boolean): this {
        indeterminate
            ? this._dom.removeAttribute("value")
            : this._dom.hasAttribute("value") || this._dom.setAttribute("value", "0");
        return this;
    }

    /**
     * Get/set the `max` attribute value of the component. For the setter the value must be greater
     * than `0` (it is automatically corrected to `1` if it is lower than or equal to `0`).
     */
    public get Max(): number {
        return this._dom.max;
    }
    /** @inheritdoc */
    public set Max(v: number) {
        this.max(v);
    }

    /**
     * Get/set the `max` attribute value of the component. The value must be greater than `0` (it is
     * automatically corrected to `1` if it is lower than or equal to `0`). If the new maximum value
     * is also greater than the current value, the current value is set to the maximum value.
     * @param v The value to be set.
     * @returns This instance.
     */
    public max(v: number) {
        const oldVal = this._dom.value;
        this._dom.max = v <= 0 ? 1 : v;
        !(oldVal > this._dom.max) || (this._dom.value = this._dom.max);
        return this;
    }

    /**
     * Get/set the `value` attribute value of the component. For the setter, the value must be
     * greater than or equal to `0` and less than or equal to the maximum value (it is automatically
     * corrected so that it lies between these limits). If the component has no `value` attribute
     * (it is in an 'indeterminate' state), the return value of the getter is nevertheless always
     * `0`. If `Value` is set to `undefined`, the `value` attribute is removed.
     */
    public get Value(): number {
        return this._dom.value;
    }
    /** @inheritdoc */
    public set Value(v: number | undefined) {
        this.value(v);
    }

    /**
     * Get/set the `value` attribute value of the component. The value must be greater than or equal
     * to `0` and less than or equal to the maximum value (it is automatically corrected so that it
     * lies between these limits). If `v` is omitted or is `undefined`, the `value` attribute is
     * removed.
     * @param v The value to be set.
     * @returns This instance.
     */
    public value(v?: number) {
        v === undefined
            ? this._dom.removeAttribute("value")
            : this._dom.value = Math.max(0, Math.min(v, this._dom.max));
        return this;
    }

    /** @inheritdoc */
    public override dispose(): void {
        this.valueObserver?.disconnect();
        this.valueObserver = undefined;
        super.dispose();
    }
}

/**
 * Factory for Progress components.
 */
export class ProgressFactory<T> extends ComponentFactory<Progress> {
    /**
     * Create, set up and return Progress component.
     * @param max The maximum value for the component. For the setter the value must be greater than
     * `0` (it is automatically corrected to `1` if it is lower than or equal to `0`). Default: `1`.
     * @param value The current value for the element. The value must be greater than or equal to
     * `0` and less than or equal to the maximum value (it is automatically corrected so that it
     * complies with these limit values). If the value is undefined, the component shows an
     * 'indeterminate' state.
     * @param phrase The phrasing content for the `<progress>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Progress component.
     */
    public progress(max: number = 1, value?: number, phrase?: Phrase | Phrases, data?: T): Progress {
        return this.setupComponent(
            !phrase
                ? new Progress(max, value)
                : Array.isArray(phrase)
                    ? new Progress(max, value, ...phrase)
                    : new Progress(max, value, phrase),
            data
        );
    }
}
