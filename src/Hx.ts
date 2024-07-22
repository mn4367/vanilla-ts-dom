import { AnyType, ComponentFactory, ElementComponentWithChildren } from "@vanilla-ts/core";
import { mixinDOMProps, TextProp } from "./DOMProperties.js";


/**
 * H1 component (`<h1>`).
 */
export class H1 extends (<
    new (...args: AnyType[]) =>
        & ElementComponentWithChildren<HTMLHeadingElement>
        & TextProp<HTMLHeadingElement>
    >mixinDOMProps(
        ElementComponentWithChildren<HTMLHeadingElement>,
        TextProp<HTMLHeadingElement>,
    )) {
    /**
     * Create `<h1>` component.
     * @param text The text content for the h1 element.
     */
    constructor(text?: string) {
        super("h1");
        this._dom.textContent = text ? text : null;
    }
}

/**
 * H2 component (`<h2>`).
 */
export class H2 extends (<
    new (...args: AnyType[]) =>
        & ElementComponentWithChildren<HTMLHeadingElement>
        & TextProp<HTMLHeadingElement>
    >mixinDOMProps(
        ElementComponentWithChildren<HTMLHeadingElement>,
        TextProp<HTMLHeadingElement>,
    )) {
    /**
     * Create `<h2>` component.
     * @param text The text content for the h2 element.
     */
    constructor(text?: string) {
        super("h2");
        this._dom.textContent = text ? text : null;
    }
}

/**
 * H3 component (`<h3>`).
 */
export class H3 extends (<
    new (...args: AnyType[]) =>
        & ElementComponentWithChildren<HTMLHeadingElement>
        & TextProp<HTMLHeadingElement>
    >mixinDOMProps(
        ElementComponentWithChildren<HTMLHeadingElement>,
        TextProp<HTMLHeadingElement>,
    )) {
    /**
     * Create `<h3>` component.
     * @param text The text content for the h3 element.
     */
    constructor(text?: string) {
        super("h3");
        this._dom.textContent = text ? text : null;
    }
}

/**
 * H4 component (`<h4>`).
 */
export class H4 extends (<
    new (...args: AnyType[]) =>
        & ElementComponentWithChildren<HTMLHeadingElement>
        & TextProp<HTMLHeadingElement>
    >mixinDOMProps(
        ElementComponentWithChildren<HTMLHeadingElement>,
        TextProp<HTMLHeadingElement>,
    )) {
    /**
     * Create `<h4>` component.
     * @param text The text content for the h4 element.
     */
    constructor(text?: string) {
        super("h4");
        this._dom.textContent = text ? text : null;
    }
}

/**
 * H5 component (`<h5>`).
 */
export class H5 extends (<
    new (...args: AnyType[]) =>
        & ElementComponentWithChildren<HTMLHeadingElement>
        & TextProp<HTMLHeadingElement>
    >mixinDOMProps(
        ElementComponentWithChildren<HTMLHeadingElement>,
        TextProp<HTMLHeadingElement>,
    )) {
    /**
     * Create `<h5>` component.
     * @param text The text content for the h5 element.
     */
    constructor(text?: string) {
        super("h5");
        this._dom.textContent = text ? text : null;
    }
}

/**
 * H6 component (`<h6>`).
 */
export class H6 extends (<
    new (...args: AnyType[]) =>
        & ElementComponentWithChildren<HTMLHeadingElement>
        & TextProp<HTMLHeadingElement>
    >mixinDOMProps(
        ElementComponentWithChildren<HTMLHeadingElement>,
        TextProp<HTMLHeadingElement>,
    )) {
    /**
     * Create `<h6>` component.
     * @param text The text content for the h6 element.
     */
    constructor(text?: string) {
        super("h6");
        this._dom.textContent = text ? text : null;
    }
}

/**
 * Factory for `<h1-6>` based components.
 */
export class HxFactory<T> extends ComponentFactory<H1 | H2 | H3 | H4 | H5 | H6> {
    /**
     * Create, set up and return Hx components.
     * @param text The text content for the h1 element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H1-6 component.
     */
    public h1(text?: string, data?: T): H1 {
        return this.setupComponent(new H1(text), data);
    }

    /**
     * Create, set up and return H2 component.
     * @param text The text content for the h2 element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H2 component.
     */
    public h2(text?: string, data?: T): H2 {
        return this.setupComponent(new H2(text), data);
    }

    /**
     * Create, set up and return H3 component.
     * @param text The text content for the h3 element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H3 component.
     */
    public h3(text?: string, data?: T): H3 {
        return this.setupComponent(new H3(text), data);
    }

    /**
     * Create, set up and return H4 component.
     * @param text The text content for the h4 element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H4 component.
     */
    public h4(text?: string, data?: T): H4 {
        return this.setupComponent(new H4(text), data);
    }

    /**
     * Create, set up and return H5 component.
     * @param text The text content for the h5 element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H5 component.
     */
    public h5(text?: string, data?: T): H5 {
        return this.setupComponent(new H5(text), data);
    }

    /**
     * Create, set up and return H6 component.
     * @param text The text content for the h6 element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns H6 component.
     */
    public h6(text?: string, data?: T): H6 {
        return this.setupComponent(new H6(text), data);
    }
}
