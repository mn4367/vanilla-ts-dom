import { ComponentFactory, ElementComponentWithChildren, Phrase, Phrases } from "@vanilla-ts/core";


/**
 * Main component (`<main>`).
 */
export class Main<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLElement, EventMap> {
    /**
     * Create Main component.
     * @param phrase The phrasing content for the `<main>` element.
     */
    constructor(...phrase: Phrases) {
        super("main");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for Main components.
 */
export class MainFactory<T> extends ComponentFactory<Main> {
    /**
     * Create, set up and return Main component.
     * @param phrase The phrasing content for the `<main>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Main component.
     */
    public main(phrase?: Phrase | Phrases, data?: T): Main {
        return this.setupComponent(
            !phrase
                ? new Main()
                : Array.isArray(phrase)
                    ? new Main(...phrase)
                    : new Main(phrase),
            data
        );
    }
}
