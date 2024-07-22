import { ComponentFactory, ElementComponentWithChildren } from "@vanilla-ts/core";
import { LiOl } from "./LiOl.js";


/**
 * Possible types of the list.
 */
type ListItemType = "a" | "A" | "i" | "I" | 1 | null;

/**
 * Ordered list component (`<ol>`).
 */
export class Ol extends ElementComponentWithChildren<HTMLOListElement> {
    /**
     * Create `<ol>` component.
     * @param listItems Ordered list items to be appended to this list.
     */
    constructor(listItems: LiOl[]) {
        super("ol");
        this.append(...listItems);
    }

    /**
     * Get/set `type` attribute value of the list item.
     */
    public get Type(): ListItemType {
        const type = this.attr("type");
        if (type === null) {
            return null;
        } else if (type === "1") {
            return 1;
        } else if (typeof type === "string") {
            return <ListItemType>type;
        }
        return null;
    }
    /** @inheritdoc */
    public set Type(v: ListItemType) {
        this.type(v);
    }

    /**
     * Set type attribute of the list item.
     * @param v The type attribute to be set or `null` to remove the attribute.
     * @returns This instance.
     */
    public type(v: ListItemType): this {
        if (v === null) {
            return this.attrib("type", null);
        } else if (v === 1) {
            return this.attrib("type", "1");
        } else if (typeof v === "string") {
            return this.attrib("type", v);
        }
        return this;
    }

    /**
     * Get/set start attribute of the list item.
     */
    public get Start(): number {
        return this._dom.start;
    }
    /** @inheritdoc */
    public set Start(v: number) {
        this._dom.start = v;
    }

    /**
     * Set start attribute of the list item.
     * @param v The start to be set or `null` to remove the attribute.
     * @returns This instance.
     */
    public start(v: number): this {
        this._dom.start = v;
        return this;
    }

    /**
     * Get/set the reversed attribute value of the list item.
     */
    public get Reversed(): boolean {
        return this._dom.reversed;
    }
    /** @inheritdoc */
    public set Reversed(v: boolean) {
        this._dom.reversed = v;
    }

    /**
     * Set reversed attribute value on the underlying HTML element.
     * @param reversed The readonly attribute value to be set.
     * @returns This instance.
     */
    public reversed(reversed: boolean): this {
        this._dom.reversed = reversed;
        return this;
    }
}

/**
 * Factory for `<ol>` based components.
 */
export class OlFactory<T> extends ComponentFactory<Ol> {
    /**
     * Create, set up and return Ol component.
     * @param listItems Ordered list items to be appended to this list.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Ol component.
     */
    public ol(listItems: LiOl[], data?: T): Ol {
        return this.setupComponent(new Ol(listItems), data);
    }
}
