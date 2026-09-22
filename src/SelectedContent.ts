import { AElementComponent, ComponentFactory, DefaultEventMap } from "@vanilla-ts/core";


/**
 * SelectedContent component (`<selectedcontent>`). Displays a clone of the currently selected
 * `<option>` content inside the first child `<button>` of a customizable `<select>` element. Its
 * contents are managed by the user agent and therefore cannot be added through the component API.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/selectedcontent
 */
export class SelectedContent<EventMap extends DefaultEventMap = DefaultEventMap> extends AElementComponent<HTMLSelectedContentElement, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create SelectedContent component.
     */
    constructor() {
        super();
        this._dom = document.createElement("selectedcontent");
    }
}

/**
 * Factory for `SelectedContent` components.
 */
export class SelectedContentFactory<T> extends ComponentFactory<SelectedContent> {
    /**
     * Create, set up and return SelectedContent component.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns SelectedContent component.
     */
    public selectedContent(data?: T): SelectedContent {
        return this.setupComponent(new SelectedContent(), data);
    }
}
