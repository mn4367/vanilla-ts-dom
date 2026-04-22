import { ComponentFactory, ElementComponentWithChildren } from "@vanilla-ts/core";
import { LiUl } from "./LiUl.js";


/**
 * Menu component (`<menu>`).
 */
export class Menu<Child extends LiUl = LiUl, EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLMenuElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Menu component.
     * @param items Menu items to be appended to this menu.
     */
    constructor(...items: (Child | undefined | null)[]) {
        super("menu");
        items && this.append(...items);
    }
}

/**
 * Factory for `Menu` components.
 */
export class MenuFactory<Child extends LiUl = LiUl, T = unknown> extends ComponentFactory<Menu<Child>> {
    /**
     * Create, set up and return Menu component.
     * @param items Menu items to be appended to this menu.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Menu component.
     */
    public menu(items?: (Child | undefined | null)[], data?: T): Menu<Child> {
        return this.setupComponent(new Menu<Child>(...(items || [])), data);
    }
}
