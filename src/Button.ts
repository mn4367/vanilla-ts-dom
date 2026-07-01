import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, NameAttr, NativeDisabledAttr, PhrasingContent, ValueAttr, mixinDOMProperties } from "@vanilla-ts/core";


/**
 * Button component (`<button>`).
 */
export class Button<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLButtonElement, Child, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;

    /**
     * Create Button component.
     * @param phrase The phrasing content for the `<button>` element.
     */
    constructor(...phrase: Children) {
        super("button");
        phrase.length > 0 && this.phrase(...phrase);
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            NameAttr<HTMLButtonElement>,
            NativeDisabledAttr<HTMLButtonElement>,
            ValueAttr<HTMLButtonElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Button<Child extends PhrasingContent = PhrasingContent, EventMap extends DefaultEventMap = DefaultEventMap, Children extends (Child | string)[] = (Child | string)[]> extends // eslint-disable-line @typescript-eslint/no-empty-object-type,@typescript-eslint/no-unused-vars,jsdoc/require-jsdoc
    NativeDisabledAttr<HTMLButtonElement, EventMap> { }

/**
 * Factory for `Button` components.
 */
export class ButtonFactory<Child extends PhrasingContent = PhrasingContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Button<Child>> {
    /**
     * Create, set up and return Button component.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component.
     */
    public button(phrase?: string | Child | Children, data?: T): Button<Child> {
        return this.setupComponent(
            !phrase
                ? new Button<Child>()
                : Array.isArray(phrase)
                    ? new Button<Child>(...phrase)
                    : new Button<Child>(phrase),
            data
        );
    }

    /**
     * Create, set up and return Button component. Identical to {@link button()}, but the class
     * name `regular` is added to the returned button.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component (with the class name `regular` added).
     */
    public buttonRegular(phrase?: string | Child | Children, data?: T): Button<Child> {
        return this.setupComponent(
            (!phrase
                ? new Button<Child>()
                : Array.isArray(phrase)
                    ? new Button<Child>(...phrase)
                    : new Button<Child>(phrase)
            ).addClass("regular"),
            data
        );
    }

    /**
     * Create, set up and return Button component. Identical to {@link button()}, but the class
     * names `regular` and `default` are added to the returned button.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component (with the class name `regular` added).
     */
    public buttonDefault(phrase?: string | Child | Children, data?: T): Button<Child> {
        return this.setupComponent(
            (!phrase
                ? new Button<Child>()
                : Array.isArray(phrase)
                    ? new Button<Child>(...phrase)
                    : new Button<Child>(phrase)
            ).addClass("regular", "default"),
            data
        );
    }

    /**
     * Create, set up and return Button component. Identical to {@link button()}, but the class
     * names `regular` and `warn` are added to the returned button.
     * @param phrase The phrasing content for the `<button>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Button component (with the class name `regular` added).
     */
    public buttonWarn(phrase?: string | Child | Children, data?: T): Button<Child> {
        return this.setupComponent(
            (!phrase
                ? new Button<Child>()
                : Array.isArray(phrase)
                    ? new Button<Child>(...phrase)
                    : new Button<Child>(phrase)
            ).addClass("regular", "warn"),
            data
        );
    }
}
