import { ComponentFactory, DownloadAttr, ElementComponentWithChildren, HrefAttr, HreflangAttr, mixinDOMAttributes, NullableString, Phrase, PingAttr, ReferrerPolicyAttr, RelAttr, TargetAttr } from "@vanilla-ts/core";


/**
 * A component (`<a>`).
 */
export class A<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends ElementComponentWithChildren<HTMLAnchorElement, EventMap> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    /**
     * Create A component.
     * @param href The `href` attribute for the `<a>` element.
     * @param phrase The phrasing content for the `<a>` element.
     */
    constructor(href: string, ...phrase: Phrase[]) {
        super("a");
        this.href(href);
        phrase.length === 0
            ? this.phrase(href)
            : this.phrase(...phrase);
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
        /** Mixin additional DOM attributes. */
        mixinDOMAttributes(
            A,
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

/** Augment class definition with the DOM attributes introduced by `mixinDOMAttributes()` above. */
export interface A<EventMap extends HTMLElementEventMap = HTMLElementEventMap> extends // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging,jsdoc/require-jsdoc
    DownloadAttr<HTMLAnchorElement, EventMap>,
    HrefAttr<HTMLAnchorElement, EventMap>,
    HreflangAttr<HTMLAnchorElement, EventMap>,
    PingAttr<HTMLAnchorElement, EventMap>,
    ReferrerPolicyAttr<HTMLAnchorElement, EventMap>,
    RelAttr<HTMLAnchorElement, EventMap>,
    TargetAttr<HTMLAnchorElement, EventMap> { }

/**
 * Factory for A components.
 */
export class AFactory<T> extends ComponentFactory<A> {
    /**
     * Create, set up and return A component.
     * @param href The `href` attribute for the `<a>` element.
     * @param phrase The phrasing content for the `<a>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns B component.
     */
    public a(href: string, phrase?: Phrase | Phrase[], data?: T): A {
        return this.setupComponent(
            !phrase
                ? new A(href)
                : Array.isArray(phrase)
                    ? new A(href, ...phrase)
                    : new A(href, phrase),
            data
        );
    }
}
