import { ComponentFactory, ElementComponentWithChildren, LabelAttr, mixinDOMProperties, NativeDisabledAttr, Option } from "@vanilla-ts/core";


/**
 * OptGroup component (`<optgroup>`).
 */
export class OptGroup<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLOptGroupElement, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create OptGroup component.
     * @param label The label for the `<optgroup>` element.
     * @param options `Option` components to be added to this `OptGroup` instance.
     */
    constructor(label: string, options: Option[] = []) {
        super("optgroup");
        this
            .label(label)
            .append(...options);
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            LabelAttr<HTMLOptGroupElement>,
            NativeDisabledAttr<HTMLOptGroupElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface OptGroup<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line jsdoc/require-jsdoc
    LabelAttr<HTMLOptGroupElement, EventMap>,
    NativeDisabledAttr<HTMLOptGroupElement, EventMap> { }

/**
 * Factory for `OptGroup` components.
 */
export class OptGroupFactory<T> extends ComponentFactory<OptGroup> {
    /**
     * Create OptGroup component.
     * @param label The label for the `<optgroup>` element.
     * @param options `Option` components to be added to this `OptGroup` instance.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Header component.
     */
    public optGroup(label: string, options: Option[] = [], data?: T): OptGroup {
        return this.setupComponent(new OptGroup(label, options), data);
    }
}
