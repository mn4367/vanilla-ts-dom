import { ComponentFactory, ElementComponentWithChildren, PhrasingContent } from "@vanilla-ts/core";


/**
 * Code component (`<code>`).
 */
export class Code<Child extends PhrasingContent = PhrasingContent, EventMap extends HTMLElementEventMap = HTMLElementEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Code component.
     * @param phrase The phrasing content for the `<code>` element.
     */
    constructor(...phrase: Children) {
        super("code");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * Factory for `Code` components.
 */
export class CodeFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Code<Child>> {
    /**
     * Create, set up and return Code component.
     * @param phrase The phrasing content for the `<code>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Code component.
     */
    public code(phrase?: string | Child | Children, data?: T): Code<Child> {
        return this.setupComponent(
            !phrase
                ? new Code<Child>()
                : Array.isArray(phrase)
                    ? new Code<Child>(...phrase)
                    : new Code<Child>(phrase),
            data
        );
    }
}
