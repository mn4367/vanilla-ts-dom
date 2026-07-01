import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, PhrasingContent } from "@vanilla-ts/core";


/**
 * Pre component (`<pre>`).
 */
export class Pre<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLPreElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Pre component.
     * @param phrase The phrasing content for the `<pre>` element.
     */
    constructor(...phrase: Children) {
        super("pre");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * Factory for `Pre` components.
 */
export class PreFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Pre<Child>> {
    /**
     * Create, set up and return Pre component.
     * @param phrase The phrasing content for the `<pre>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Pre component.
     */
    public pre(phrase?: string | Child | Children, data?: T): Pre<Child> {
        return this.setupComponent(
            !phrase
                ? new Pre<Child>()
                : Array.isArray(phrase)
                    ? new Pre<Child>(...phrase)
                    : new Pre<Child>(phrase),
            data
        );
    }
}
