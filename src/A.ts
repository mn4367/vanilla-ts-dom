import { ComponentFactory, DownloadAttr, ElementComponentWithChildren, FlowContent, HrefAttr, HreflangAttr, mixinDOMProperties, NullableString, PingAttr, ReferrerPolicyAttr, RelAttr, TargetAttr } from "@vanilla-ts/core";
import { Text } from "./Text.js";


/**
 * A component (`<a>`).
 */
export class A<Child extends FlowContent = FlowContent, EventMap extends HTMLElementEventMap = HTMLElementEventMap, Children extends (Child | string)[] = (Child | string)[]> extends ElementComponentWithChildren<HTMLAnchorElement, Child, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    // @ts-expect-error ---
    #brand;

    /**
     * Create A component.
     * @param href The `href` attribute for the `<a>` element.
     * @param children The content for the `<a>` element. If the length of `children` is `0`, the
     * content of the `<a>` element will be set to the value of `href`.
     */
    constructor(href: string, ...children: Children) {
        super("a");
        this.href(href);
        children.length === 0
            ? this.append(<Child><unknown>new Text(href))
            : this.append(...children.map(child => typeof child === "string" ? <Child><unknown>new Text(child) : child));
    }

    /**
     * Get/set `type` attribute value of underlying HTML element.
     */
    public get Type(): NullableString {
        return this.attr("type");
    }
    /** @inheritdoc */
    public set Type(v: NullableString) {
        this.type(v);
    }

    /**
     * Set `type` attribute of underlying HTML element.
     * @param v The `type` attribute to be set or `null` to remove the attribute.
     * @returns This instance.
     */
    public type(v: NullableString): this {
        this.attrib("type", v);
        return this;
    }

    static {
        /** Mixin additional DOM attributes/properties. */
        mixinDOMProperties(
            this,
            DownloadAttr<HTMLAnchorElement>,
            HrefAttr<HTMLAnchorElement>,
            HreflangAttr<HTMLAnchorElement>,
            PingAttr<HTMLAnchorElement>,
            ReferrerPolicyAttr<HTMLAnchorElement>,
            RelAttr<HTMLAnchorElement>,
            TargetAttr<HTMLAnchorElement>
        );
    }
}

// Augment class definition with the DOM attributes/properties introduced by `mixinDOMProperties()`
// above.
export interface A<Child extends FlowContent = FlowContent, EventMap extends HTMLElementEventMap = HTMLElementEventMap, Children extends (Child | string)[] = (Child | string)[]> extends // eslint-disable-line jsdoc/require-jsdoc,@typescript-eslint/no-unused-vars
    DownloadAttr<HTMLAnchorElement, EventMap>,
    HrefAttr<HTMLAnchorElement, EventMap>,
    HreflangAttr<HTMLAnchorElement, EventMap>,
    PingAttr<HTMLAnchorElement, EventMap>,
    ReferrerPolicyAttr<HTMLAnchorElement, EventMap>,
    RelAttr<HTMLAnchorElement, EventMap>,
    TargetAttr<HTMLAnchorElement, EventMap> { }

/**
 * Factory for `A` components.
 */
export class AFactory<Child extends FlowContent = FlowContent, T = unknown, Children extends (Child | string)[] = (Child | string)[]> extends ComponentFactory<A<Child>> {
    /**
     * Create, set up and return A component.
     * @param href The `href` attribute for the `<a>` element.
     * @param children The content for the `<a>` element. If the length of `children` is `0`, the
     * content of the `<a>` element will be set to the value of `href`.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns A component.
     */
    public a(href: string, children?: string | Child | Children, data?: T): A<Child> {
        return this.setupComponent(
            !children
                ? new A<Child>(href)
                : Array.isArray(children)
                    ? new A<Child>(href, ...children)
                    : new A<Child>(href, children),
            data
        );
    }
}
