import { AnyType, ComponentFactory, ElementComponentVoid } from "@vanilla-ts/core";
import { AltProp, LoadingProp, mixinDOMProps, NumberWidthHeightProp, SrcProp } from "./DOMProperties.js";


/**
 * Img component (`<img>`).
 */
export class Img extends (<
    new (...args: AnyType[]) =>
        & ElementComponentVoid<HTMLImageElement>
        & SrcProp<HTMLImageElement>
        & AltProp<HTMLImageElement>
        & NumberWidthHeightProp<HTMLImageElement>
        & LoadingProp<HTMLImageElement>
    >mixinDOMProps(
        ElementComponentVoid<HTMLImageElement>,
        SrcProp<HTMLImageElement>,
        AltProp<HTMLImageElement>,
        NumberWidthHeightProp<HTMLImageElement>,
        LoadingProp<HTMLImageElement>,
    )) {
    protected naturalWidth: number = 0;
    protected naturalHeight: number = 0;
    protected _scale: number = 0;

    /**
     * Create `<img>` component.
     * @param src The source/URL of the image.
     * @param width The width of the image.
     * @param height The height of the image.
     * @param alt Text for the `alt` attribute of the image.
     * @param lazyLoad `true` (the default) turns on lazy loading (equivalent to `loading("lazy")`),
     * `false` turns off lazy loading (equivalent to `loading("eager")`).
     */
    constructor(src: string, width?: number, height?: number, alt?: string, lazyLoad: boolean = true) {
        super("img");
        width !== undefined ? this.width(width) : undefined;
        height !== undefined ? this.height(height) : undefined;
        alt !== undefined ? this.alt(alt) : undefined;
        this
            .lazyLoad(lazyLoad)
            .on("load", (_ev) => {
                if (this._dom.complete && (this._dom.naturalWidth !== 0) && (this._dom.naturalHeight !== 0)) {
                    this.naturalWidth = this._dom.naturalWidth;
                    this.naturalHeight = this._dom.naturalHeight;
                }
            })
            .on("error", (_ev) => {
                if (this._dom.complete && (this._dom.naturalWidth !== 0) && (this._dom.naturalHeight !== 0)) {
                    this.naturalWidth = this._dom.naturalWidth;
                    this.naturalHeight = this._dom.naturalHeight;
                }
            })
            .src(src);
    }

    /**
     * Actual width of the image.
     */
    public get NaturalWidth(): number {
        return this.naturalWidth;
    }

    /**
     * Actual height of the image.
     */
    public get NaturalHeight(): number {
        return this.naturalHeight;
    }

    /**
     * Get/set the lazy loading behavior of the image. `true` is equivalent to `loading("lazy")`,
     * `false` is equivalent to `loading("eager")`.
     */
    public get LazyLoad(): boolean {
        return this._dom.loading === "lazy";
    }
    /** @inheritdoc */
    public set LazyLoad(v: boolean) {
        this.lazyLoad(v);
    }

    /**
     * Set the lazy loading behavior of the image.
     * @param lazyLoad `true` turns on lazy loading (equivalent to `loading("lazy")`), `false` turns off
     * lazy loading (equivalent to `loading("eager")`).
     * @returns This instance.
     */
    public lazyLoad(lazyLoad: boolean): this {
        lazyLoad ? this._dom.loading = "lazy" : this._dom.loading = "eager";
        return this;
    }

    /**
     * Get/set the scaling of the image in relation to the actual image size (the setter sets the
     * attributes `width` and `height`). If `scale` is less than or equal to `0`, the `width` and
     * `height` attributes are removed.
     */
    public get Scale(): number {
        return this._scale;
    }
    /** @inheritdoc */
    public set Scale(v: number) {
        this.scale(v);
    }

    /**
     * Scales the image (sets the attributes `width` and `height`).
     * @param scale The scaling factor in relation to the actual image size. If `scale` is less than
     * or equal to `0`, the `width` and `height` attributes are removed.
     * @returns This instance.
     */
    public scale(scale: number): this {
        if (scale <= 0) {
            this._scale = 0;
            this.attribN("width", null).attribN("height", null);
        } else if ((this.naturalWidth !== 0) && (this.naturalHeight !== 0)) {
            this._scale = scale;
            this.width(this.naturalWidth * this._scale);
            this.height(this.naturalHeight * this._scale);
        } else {
            this._scale = 0;
            this.attribN("width", null).attribN("height", null);
        }
        return this;
    }

    /** @inheritdoc */
    public override dispose(): void {
        this.src("");
        super.dispose();
    }
}

/**
 * Factory for `<img>` based components.
 */
export class ImgFactory<T> extends ComponentFactory<Img> {
    /**
     * Create, set up and return Img component.
     * @param src The source/URL of the image.
     * @param width The width of the image.
     * @param height The height of the image.
     * @param alt Text for the `alt` attribute of the image.
     * @param lazyLoad `true` (the default) turns on lazy loading (equivalent to `loading("lazy")`),
     * `false` turns off lazy loading (equivalent to `loading("eager")`).
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Img component.
     */
    public img(src: string, width?: number, height?: number, alt?: string, lazyLoad: boolean = true, data?: T): Img {
        return this.setupComponent(new Img(src, width, height, alt, lazyLoad), data);
    }
}
