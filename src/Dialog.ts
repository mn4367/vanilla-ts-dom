import { ComponentFactory, ElementComponentWithChildren, FlowContent, mixinDOMProperties, OpenAttr } from "@vanilla-ts/core";
import { Text } from "./Text.js";


/**
 * Dialog component (`<dialog>`).
 */
export class Dialog<Child extends FlowContent = FlowContent, EventMap extends HTMLElementEventMap = HTMLElementEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLDialogElement, Child, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;

    /**
     * Create Dialog component.\
     * __Note:__ In contrast to the vast majority of other components, instances of `Dialog` usually
     * should not be mounted in another component (with `append()`) since this can cause problems
     * when centering or positioning the dialog relative to the viewport. If an instance of `Dialog`
     * is not mounted in another component, it is automatically added to `document.body` as a child
     * element in `show()`/`showModal()` and removed again in `close()`.
     * @param children The content for the `<dialog>` element.
     */
    constructor(...children: Children) {
        super("dialog");
        this.append(...children.map(child => typeof child === "string" ? <Child><unknown>new Text(child) : child));
    }

    /**
     * Get/set the `returnValue` property of the dialog.
     */
    public get ReturnValue(): string {
        return this._dom.returnValue;
    }
    /** @inheritdoc */
    public set ReturnValue(v: string) {
        this._dom.returnValue = v;
    }

    /**
     * Set the `returnValue` property of the dialog.
     * @param v The value to be set.
     * @returns This instance.
     */
    public returnValue(v: string): this {
        this._dom.returnValue = v;
        return this;
    }

    /**
     * Closes the dialog.
     * @param returnValue An updated value for the `returnValue` of the dialog.
     * @returns This instance.
     */
    public close(returnValue?: string): this {
        this._dom.close(returnValue);
        if (!this.Parent) {
            this._dom.remove();
        }
        return this;
    }

    /**
     * Displays the dialog (non-modal).
     * @throws {DOMException} `DOMException.InvalidStateError` (if the dialog is already open and
     * modal).
     * @returns This instance.
     */
    public show(): this {
        if (!this.Parent) {
            document.body.appendChild(this._dom);
        }
        this._dom.show();
        return this;
    }

    /**
     * Displays the dialog (modal).
     * @throws {DOMException} `DOMException.InvalidStateError` (if the dialog is already open and
     * non-modal).
     * @returns This instance.
     */
    public showModal(): this {
        if (!this.Parent) {
            document.body.appendChild(this._dom);
        }
        this._dom.showModal();
        return this;
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            OpenAttr<HTMLDialogElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface Dialog<Child extends FlowContent = FlowContent, EventMap extends HTMLElementEventMap = HTMLElementEventMap, Children extends (Child | string)[] = (Child | string)[]> extends // eslint-disable-line @typescript-eslint/no-empty-object-type,@typescript-eslint/no-unused-vars,jsdoc/require-jsdoc
    OpenAttr<HTMLDialogElement, EventMap> { }

/**
 * Factory for `Dialog` components.
 */
export class DialogFactory<Child extends FlowContent = FlowContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<Dialog<Child>> {
    /**
     * Create, set up and return Dialog component.
     * @param children The content for the `<dialog>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Dialog component.
     */
    public dialog(children?: string | Child | Children, data?: T): Dialog<Child> {
        return this.setupComponent(
            !children
                ? new Dialog<Child>()
                : Array.isArray(children)
                    ? new Dialog<Child>(...children)
                    : new Dialog<Child>(children),
            data
        );
    }
}
