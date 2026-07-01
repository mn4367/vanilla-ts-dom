import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, ForAttr, mixinDOMProperties, PhrasingContent } from "@vanilla-ts/core";


/**
 * Label component (`<label>`).
 */
export class Label<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLLabelElement, Child, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand: never;

    /**
     * Create `<label>` component.
     * @param for_ Content of the `for` attribute (single target ID or space separated target IDs).
     * @param phrase The phrasing content for the `<label>` element.
     */
    constructor(for_?: string, ...phrase: Children) {
        super("label");
        for_ && this.for(for_);
        phrase.length > 0 && this.phrase(...phrase);
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            ForAttr<HTMLLabelElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Label<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends // eslint-disable-line jsdoc/require-jsdoc,@typescript-eslint/no-empty-object-type,@typescript-eslint/no-unused-vars
    ForAttr<HTMLLabelElement, EventMap> { }

/**
 * Factory for `Label` components.
 */
export class LabelFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Label<Child>> {
    /**
     * Create, set up and return Label component.
     * @param for_ Content of the `for` attribute (single target ID or space separated target IDs).
     * @param phrase The phrasing content for the `<label>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Label component.
     */
    public label(for_?: string, phrase?: string | Child | Children, data?: T): Label<Child> {
        return this.setupComponent(
            !phrase
                ? new Label<Child>(for_)
                : Array.isArray(phrase)
                    ? new Label<Child>(for_, ...phrase)
                    : new Label<Child>(for_, phrase),
            data
        );
    }
}
