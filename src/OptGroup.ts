import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, LabelAttr, mixinDOMProperties, NativeDisabledAttr } from "@vanilla-ts/core";
import { Legend } from "./Legend.js";
import { Option } from "./Option.js";


/** Allowed types of entries in an `<optgroup>` element. */
export type OptGroupChild = Option | Legend;

/**
 * OptGroup component (`<optgroup>`).
 */
export class OptGroup<Child extends OptGroupChild = OptGroupChild, EventMap extends DefaultEventMap = DefaultEventMap> extends ElementComponentWithChildren<HTMLOptGroupElement, Child, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;

    /**
     * Create OptGroup component.
     * @param label The label for the `<optgroup>` element.
     * @param options `Option` components to be added to this `OptGroup` instance.
     */
    constructor(label: string, ...options: (Child | undefined | null)[]) {
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
export interface OptGroup<Child extends OptGroupChild = OptGroupChild, EventMap extends DefaultEventMap = DefaultEventMap> extends // eslint-disable-line @typescript-eslint/no-unused-vars,jsdoc/require-jsdoc
    LabelAttr<HTMLOptGroupElement, EventMap>,
    NativeDisabledAttr<HTMLOptGroupElement, EventMap> { }

/**
 * Factory for `OptGroup` components.
 */
export class OptGroupFactory<Child extends OptGroupChild = OptGroupChild, T = unknown> extends ComponentFactory<OptGroup<Child>> {
    /**
     * Create OptGroup component.
     * @param label The label for the `<optgroup>` element.
     * @param options `Option` components to be added to this `OptGroup` instance.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns OptGroup component.
     */
    public optGroup(label: string, options: Child[] = [], data?: T): OptGroup<Child> {
        return this.setupComponent(new OptGroup<Child>(label, ...options), data);
    }
}
