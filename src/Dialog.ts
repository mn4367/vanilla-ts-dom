import { ComponentFactory, ElementComponentWithChildren, mixinDOMAttributes, OpenAttr, Phrase } from "@vanilla-ts/core";


/**
 * Dialog component (`<dialog>`).
 */
export class Dialog<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLDialogElement, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create Dialog component.\
     * __Note:__ In contrast to the vast majority of other components, instances of `Dialog` usually
     * should not be mounted in another component (with `append()`) since this can cause problems
     * when centering or positioning the dialog relative to the viewport. If an instance of `Dialog`
     * is not mounted in another component, it is automatically added to `document.body` as a child
     * element in `show()`/`showModal()` and removed again in `close()`.
     * @param phrase The phrasing content for the `<dialog>` element.
     */
    constructor(...phrase: Phrase[]) {
        super("dialog");
        phrase.length === 0 || this.phrase(...phrase);
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
     * @throws `InvalidStateError` (if the dialog is already open and modal).
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
     * @throws `InvalidStateError` (if the dialog is already open and non-modal).
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
        /** Mixin additional DOM attributes. */
        mixinDOMAttributes(
            Dialog,
            OpenAttr<HTMLDialogElement>
        );
    }
}

// Augment class definition with the DOM attributes introduced by `mixinDOMAttributes()` above.
export interface Dialog<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging,jsdoc/require-jsdoc
    OpenAttr<HTMLDialogElement, EventMap> { }

/**
 * Factory for Dialog components.
 */
export class DialogFactory<T> extends ComponentFactory<Dialog> {
    /**
     * Create, set up and return Dialog component.
     * @param phrase The phrasing content for the `<dialog>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Dialog component.
     */
    public dialog(phrase?: Phrase | Phrase[], data?: T): Dialog {
        return this.setupComponent(
            !phrase
                ? new Dialog()
                : Array.isArray(phrase)
                    ? new Dialog(...phrase)
                    : new Dialog(phrase),
            data
        );
    }
}
