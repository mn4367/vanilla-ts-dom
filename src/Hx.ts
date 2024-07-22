import { ComponentFactory, ElementComponentWithChildren, Phrase } from "@vanilla-ts/core";


/**
 * H1 component (`<h1>`).
 */
export class H1<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLHeadingElement, EventMap> {
    /**
     * Create H1 component.
     * @param phrase The phrasing content for the `<h1>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("h1");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * H2 component (`<h2>`).
 */
export class H2<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLHeadingElement, EventMap> {
    /**
     * Create H2 component.
     * @param phrase The phrasing content for the `<h2>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("h2");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * H3 component (`<h3>`).
 */
export class H3<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLHeadingElement, EventMap> {
    /**
     * Create H3 component.
     * @param phrase The phrasing content for the `<h3>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("h3");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * H4 component (`<h4>`).
 */
export class H4<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLHeadingElement, EventMap> {
    /**
     * Create H4 component.
     * @param phrase The phrasing content for the `<h4>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("h4");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * H5 component (`<h5>`).
 */
export class H5<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLHeadingElement, EventMap> {
    /**
     * Create H5 component.
     * @param phrase The phrasing content for the `<h5>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("h5");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * H6 component (`<h6>`).
 */
export class H6<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLHeadingElement, EventMap> {
    /**
     * Create H6 component.
     * @param phrase The phrasing content for the `<h6>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("h6");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for H1 - H6 components.
 */
export class HxFactory<T> extends ComponentFactory<H1 | H2 | H3 | H4 | H5 | H6> {
    /**
     * Create, set up and return H1 component.
     * @param phrase The phrasing content for the `<h1>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H1 component.
     */
    public h1(phrase?: Phrase | Phrase[], data?: T): H1 {
        return this.setupComponent(
            !phrase
                ? new H1()
                : Array.isArray(phrase)
                    ? new H1(...phrase)
                    : new H1(phrase),
            data
        );
    }

    /**
     * Create, set up and return H2 component.
     * @param phrase The phrasing content for the `<h2>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H2 component.
     */
    public h2(phrase?: Phrase | Phrase[], data?: T): H2 {
        return this.setupComponent(
            !phrase
                ? new H2()
                : Array.isArray(phrase)
                    ? new H2(...phrase)
                    : new H2(phrase),
            data
        );
    }

    /**
     * Create, set up and return H3 component.
     * @param phrase The phrasing content for the `<h3>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H3 component.
     */
    public h3(phrase?: Phrase | Phrase[], data?: T): H3 {
        return this.setupComponent(
            !phrase
                ? new H3()
                : Array.isArray(phrase)
                    ? new H3(...phrase)
                    : new H3(phrase),
            data
        );
    }

    /**
     * Create, set up and return H4 component.
     * @param phrase The phrasing content for the `<h4>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H4 component.
     */
    public h4(phrase?: Phrase | Phrase[], data?: T): H4 {
        return this.setupComponent(
            !phrase
                ? new H4()
                : Array.isArray(phrase)
                    ? new H4(...phrase)
                    : new H4(phrase),
            data
        );
    }

    /**
     * Create, set up and return H5 component.
     * @param phrase The phrasing content for the `<h5>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H5 component.
     */
    public h5(phrase?: Phrase | Phrase[], data?: T): H5 {
        return this.setupComponent(
            !phrase
                ? new H5()
                : Array.isArray(phrase)
                    ? new H5(...phrase)
                    : new H5(phrase),
            data
        );
    }

    /**
     * Create, set up and return H6 component.
     * @param phrase The phrasing content for the `<h6>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H6 component.
     */
    public h6(phrase?: Phrase | Phrase[], data?: T): H6 {
        return this.setupComponent(
            !phrase
                ? new H6()
                : Array.isArray(phrase)
                    ? new H6(...phrase)
                    : new H6(phrase),
            data
        );
    }
}
