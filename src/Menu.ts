import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren } from "@vanilla-ts/core";
import { LiUl } from "./LiUl.js";


/**
 * Menu component (`<menu>`). Represents an unordered list of items, commonly a group of commands
 * that users can perform or activate.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/menu
 */
export class Menu<Child extends LiUl = LiUl, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | undefined | null)[] = (Child | undefined | null)[]> extends ElementComponentWithChildren<HTMLMenuElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Menu component.
     * @param items Menu items to be appended to this menu.
     */
    constructor(...items: Children) {
        super("menu");
        items && this.append(...items);
    }
}

/**
 * Factory for `Menu` components.
 */
export class MenuFactory<Child extends LiUl = LiUl, T = unknown, Children extends (Child | undefined | null)[] = (Child | undefined | null)[]> extends ComponentFactory<Menu<Child>> {
    /**
     * Create, set up and return Menu component.
     * @param items Menu items to be appended to this menu.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Menu component.
     */
    public menu(items?: Children, data?: T): Menu<Child> {
        return this.setupComponent(new Menu<Child>(...(items || [])), data);
    }
}
