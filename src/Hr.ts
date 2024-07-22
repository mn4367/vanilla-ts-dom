import { ComponentFactory, ElementComponentVoid } from "@vanilla-ts/core";


/**
 * Hr component (`<hr>`).
 */
export class Hr<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentVoid<HTMLHRElement, EventMap> {
    /**
     * Create Hr component.
     */
    constructor() {
        super("hr");
    }
}

/**
 * Factory for Hr components.
 */
export class HrFactory<T> extends ComponentFactory<Hr> {
    /**
     * Create, set up and return Hr component.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Hr component.
     */
    public hr(data?: T): Hr {
        return this.setupComponent(new Hr(), data);
    }
}
