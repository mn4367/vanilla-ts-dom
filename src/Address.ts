import { ComponentFactory, ElementComponentWithChildren, Phrase } from "@vanilla-ts/core";


/**
 * Address component (`<address>`).
 */
export class Address<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLElement, EventMap> {
    /**
     * Create Address component.
     * @param phrase The phrasing content for the `<address>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("address");
        phrase.length === 0 || this.phrase(...phrase);
    }
}

/**
 * Factory for Address components.
 */
export class AddressFactory<T> extends ComponentFactory<Address> {
    /**
     * Create, set up and return Header component.
     * @param phrase The phrasing content for the `<address>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Header component.
     */
    public address(phrase?: Phrase | Phrase[], data?: T): Address {
        return this.setupComponent(
            !phrase
                ? new Address()
                : Array.isArray(phrase)
                    ? new Address(...phrase)
                    : new Address(phrase),
            data
        );
    }
}
