import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, PhrasingContent } from "@vanilla-ts/core";


/**
 * H1 component (`<h1>`).
 */
export class H1<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLHeadingElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create H1 component.
     * @param phrase The phrasing content for the `<h1>` element.
     */
    constructor(...phrase: Children) {
        super("h1");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * H2 component (`<h2>`).
 */
export class H2<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLHeadingElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create H2 component.
     * @param phrase The phrasing content for the `<h2>` element.
     */
    constructor(...phrase: Children) {
        super("h2");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * H3 component (`<h3>`).
 */
export class H3<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLHeadingElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create H3 component.
     * @param phrase The phrasing content for the `<h3>` element.
     */
    constructor(...phrase: Children) {
        super("h3");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * H4 component (`<h4>`).
 */
export class H4<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLHeadingElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create H4 component.
     * @param phrase The phrasing content for the `<h4>` element.
     */
    constructor(...phrase: Children) {
        super("h4");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * H5 component (`<h5>`).
 */
export class H5<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLHeadingElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create H5 component.
     * @param phrase The phrasing content for the `<h5>` element.
     */
    constructor(...phrase: Children) {
        super("h5");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * H6 component (`<h6>`).
 */
export class H6<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLHeadingElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create H6 component.
     * @param phrase The phrasing content for the `<h6>` element.
     */
    constructor(...phrase: Children) {
        super("h6");
        phrase.length > 0 && this.phrase(...phrase);
    }
}

/**
 * Factory for `H1` - `H6` components.
 */
export class HxFactory<
    Child1 extends PhrasingContent = PhrasingContent,
    Child2 extends PhrasingContent = PhrasingContent,
    Child3 extends PhrasingContent = PhrasingContent,
    Child4 extends PhrasingContent = PhrasingContent,
    Child5 extends PhrasingContent = PhrasingContent,
    Child6 extends PhrasingContent = PhrasingContent,
    T = unknown,
    Children1 extends (Child1 | string)[] = (Child1 | string)[],
    Children2 extends (Child2 | string)[] = (Child2 | string)[],
    Children3 extends (Child3 | string)[] = (Child3 | string)[],
    Children4 extends (Child4 | string)[] = (Child4 | string)[],
    Children5 extends (Child5 | string)[] = (Child5 | string)[],
    Children6 extends (Child6 | string)[] = (Child6 | string)[]
>
    extends ComponentFactory<H1<Child1> | H2<Child2> | H3<Child3> | H4<Child4> | H5<Child5> | H6<Child6>> {

    /**
     * Create, set up and return H1 component.
     * @param phrase The phrasing content for the `<h1>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H1 component.
     */
    public h1(phrase?: string | Child1 | Children1, data?: T): H1<Child1> {
        return <H1<Child1>>this.setupComponent(
            !phrase
                ? new H1<Child1>()
                : Array.isArray(phrase)
                    ? new H1<Child1>(...phrase)
                    : new H1<Child1>(phrase),
            data
        );
    }

    /**
     * Create, set up and return H2 component.
     * @param phrase The phrasing content for the `<h2>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H2 component.
     */
    public h2(phrase?: string | Child2 | Children2, data?: T): H2<Child2> {
        return <H2<Child2>>this.setupComponent(
            !phrase
                ? new H2<Child2>()
                : Array.isArray(phrase)
                    ? new H2<Child2>(...phrase)
                    : new H2<Child2>(phrase),
            data
        );
    }

    /**
     * Create, set up and return H3 component.
     * @param phrase The phrasing content for the `<h3>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H3 component.
     */
    public h3(phrase?: string | Child3 | Children3, data?: T): H3<Child3> {
        return <H3<Child3>>this.setupComponent(
            !phrase
                ? new H3<Child3>()
                : Array.isArray(phrase)
                    ? new H3<Child3>(...phrase)
                    : new H3<Child3>(phrase),
            data
        );
    }

    /**
     * Create, set up and return H4 component.
     * @param phrase The phrasing content for the `<h4>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H4 component.
     */
    public h4(phrase?: string | Child4 | Children4, data?: T): H4<Child4> {
        return <H4<Child4>>this.setupComponent(
            !phrase
                ? new H4<Child4>()
                : Array.isArray(phrase)
                    ? new H4<Child4>(...phrase)
                    : new H4<Child4>(phrase),
            data
        );
    }

    /**
     * Create, set up and return H5 component.
     * @param phrase The phrasing content for the `<h5>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H5 component.
     */
    public h5(phrase?: string | Child5 | Children5, data?: T): H5<Child5> {
        return <H5<Child5>>this.setupComponent(
            !phrase
                ? new H5<Child5>()
                : Array.isArray(phrase)
                    ? new H5<Child5>(...phrase)
                    : new H5<Child5>(phrase),
            data
        );
    }

    /**
     * Create, set up and return H6 component.
     * @param phrase The phrasing content for the `<h6>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H6 component.
     */
    public h6(phrase?: string | Child6 | Children6, data?: T): H6<Child6> {
        return <H6<Child6>>this.setupComponent(
            !phrase
                ? new H6<Child6>()
                : Array.isArray(phrase)
                    ? new H6<Child6>(...phrase)
                    : new H6<Child6>(phrase),
            data
        );
    }
}
