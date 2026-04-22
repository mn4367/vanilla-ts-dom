import { ComponentFactory, ElementComponentWithChildren } from "@vanilla-ts/core";
import { LiUl } from "./LiUl.js";


/**
 * Unordered list component Ul (`<ul>`).
 */
export class Ul<Child extends LiUl = LiUl, EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLUListElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create Ul component.
     * @param listItems Unordered list items to be appended to this list.
     */
    constructor(...listItems: (Child | undefined | null)[]) {
        super("ul");
        listItems && this.append(...listItems);
    }
}

/**
 * Factory for Ul components.
 */
export class UlFactory<Child extends LiUl = LiUl, T = unknown> extends ComponentFactory<Ul<Child>> {
    /**
     * Create, set up and return Ul component.
     * @param listItems Unordered list items to be appended to this list.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Ul component.
     */
    public ul(listItems?: (Child | undefined | null)[], data?: T): Ul<Child> {
        return this.setupComponent(new Ul<Child>(...(listItems || [])), data);
    }
}
