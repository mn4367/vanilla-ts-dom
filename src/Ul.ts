import { AnyType, ComponentFactory, ElementComponentWithChildren } from "@vanilla-ts/core";
import { LiUl } from "./LiUl.js";


/**
 * Unordered list component Ul (`<ul>`).
 */
export class Ul<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLUListElement, EventMap> {
    /**
     * Create Ul component.
     * @param listItems Unordered list items to be appended to this list.
     */
    constructor(listItems: (LiUl | undefined | null)[]) {
        super("ul");
        this.append(...listItems);
    }
}

/**
 * Factory for Ul components.
 */
export class UlFactory extends ComponentFactory<Ul> {
    /**
     * Create, set up and return Ul component.
     * @param listItems Unordered list items to be appended to this list.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Ul component.
     */
    public ul(listItems: LiUl[], data?: AnyType): Ul {
        return this.setupComponent(new Ul(listItems), data);
    }
}
