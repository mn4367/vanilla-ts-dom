import { ComponentFactory, ElementComponentWithChildren, ForAttr, mixinDOMProperties, NameAttr, PhrasingContent } from "@vanilla-ts/core";


/**
 * Output component (`<output>`).
 */
export class Output<Child extends PhrasingContent = PhrasingContent, EventMap extends HTMLElementEventMap = HTMLElementEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLOutputElement, Child, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;

    /**
     * Create Output component.
     * @param for_ Content of the `for` attribute (single target ID).
     * @param phrase The phrasing content for the `<output>` element.
     */
    constructor(for_?: string, ...phrase: Children) {
        super("output");
        for_ && this.for(for_);
        phrase.length > 0 && this.phrase(...phrase);
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            ForAttr<HTMLOutputElement>,
            NameAttr<HTMLOutputElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Output<Child extends PhrasingContent = PhrasingContent, EventMap extends HTMLElementEventMap = HTMLElementEventMap, Children extends (Child | string)[] = (Child | string)[]> extends // eslint-disable-line @typescript-eslint/no-unused-vars,jsdoc/require-jsdoc
    ForAttr<HTMLOutputElement, EventMap>,
    NameAttr<HTMLOutputElement, EventMap> { }

/**
 * Factory for `Output` components.
 */
export class OutputFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Output<Child>> {
    /**
     * Create, set up and return Output component.
     * @param for_ Content of the `for` attribute (single target ID).
     * @param phrase The phrasing content for the `<output>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Output component.
     */
    public output(for_?: string, phrase?: string | Child | Children, data?: T): Output<Child> {
        return this.setupComponent(
            !phrase
                ? new Output<Child>(for_)
                : Array.isArray(phrase)
                    ? new Output<Child>(for_, ...phrase)
                    : new Output<Child>(for_, phrase),
            data
        );
    }
}
