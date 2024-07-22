import { ComponentFactory, ElementComponentWithChildren } from "@vanilla-ts/core";


/**
 * Div component (`<div>`).
 */
export class Div extends ElementComponentWithChildren<HTMLDivElement> {
    /**
     * Create `<div>` component.
     */
    constructor() {
        super("div");
    }
}

/**
 * Factory for `<div>` based components.
 */
export class DivFactory<T> extends ComponentFactory<Div> {
    /**
     * Create, set up and return Div component.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Div component.
     */
    public div(data?: T): Div {
        return this.setupComponent(new Div(), data);
    }
}
