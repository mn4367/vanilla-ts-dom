import { ComponentFactory, ElementComponentWithChildren } from "@vanilla-ts/core";


/**
 * Menu component (`<menu>`).
 */
export class Menu<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLMenuElement, EventMap> {
    /**
     * Create Menu component.
     */
    constructor() {
        super("menu");
    }
}

/**
 * Factory for Menu components.
 */
export class MenuFactory<T> extends ComponentFactory<Menu> {
    /**
     * Create, set up and return Menu component.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Menu component.
     */
    public menu(data?: T): Menu {
        return this.setupComponent(new Menu(), data);
    }
}
