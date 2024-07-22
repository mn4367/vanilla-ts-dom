import { ComponentFactory, ElementComponentVoid } from "@vanilla-ts/core";


/**
 * Br component (`<br>`).
 */
export class Br<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentVoid<HTMLBRElement, EventMap> {
    /**
     * Create Br component.
     */
    constructor() {
        super("br");
    }
}

/**
 * Factory for Br components.
 */
export class BrFactory<T> extends ComponentFactory<Br> {
    /**
     * Create, set up and return Br component.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Br component.
     */
    public br(data?: T): Br {
        return this.setupComponent(new Br(), data);
    }
}
