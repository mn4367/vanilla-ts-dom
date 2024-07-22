import { ANodeComponent, ComponentFactory } from "@vanilla-ts/core";

/**
 * Comment component (for DOM comment nodes).
 */
export class Comment<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ANodeComponent<globalThis.Comment, EventMap> {
    /**
     * Create instance based on the `Comment` interface.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Comment
     * @param text The text for the comment node.
     */
    constructor(text: string) {
        super();
        this._dom = document.createComment(text);
    }
}

/**
 * Factory for Comment components.
 */
export class CommentFactory<T> extends ComponentFactory<Comment> {
    /**
     * Create, set up and return Comment component.
     * @param text The content of the comment node.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Text component.
     */
    public comment(text: string, data?: T): Comment {
        return this.setupComponent(new Comment(text), data);
    }
}
