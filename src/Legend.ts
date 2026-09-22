import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, PhrasingContent } from "@vanilla-ts/core";


/**
 * Legend component (`<legend>`). Represents a caption for the contents of its parent `<fieldset>`
 * element or, in a customizable `<select>` element, its parent `<optgroup>` element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/legend
 */
export class Legend<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLLegendElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Legend component.
     * @param phrase The phrasing content for the `<legend>` element.
     */
    constructor(...phrase: Children) {
        super("legend");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * Factory for `Legend` components.
 */
export class LegendFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Legend<Child>> {
    /**
     * Create, set up and return Legend component.
     * @param phrase The phrasing content for the `<legend>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Legend component.
     */
    public legend(phrase?: string | Child | Children, data?: T): Legend<Child> {
        return this.setupComponent(
            !phrase
                ? new Legend<Child>()
                : Array.isArray(phrase)
                    ? new Legend<Child>(...phrase)
                    : new Legend<Child>(phrase),
            data
        );
    }
}
