import { ComponentFactory, ElementComponentWithChildren, Phrase } from "@vanilla-ts/core";


/**
 * B component (`<b>`).
 */
export class B<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLElement, EventMap> {
    /**
     * Create B component.
     * @param phrase The phrasing content for the `<b>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("b");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for B components.
 */
export class BFactory<T> extends ComponentFactory<B> {
    /**
     * Create, set up and return B component.
     * @param phrase The phrasing content for the `<b>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns B component.
     */
    public b(phrase?: Phrase | Phrase[], data?: T): B {
        return this.setupComponent(
            !phrase
                ? new B()
                : Array.isArray(phrase)
                    ? new B(...phrase)
                    : new B(phrase),
            data
        );
    }
}
