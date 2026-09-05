import { ComponentFactory, DefaultEventMap, ElementComponentWithChildren, Option } from "@vanilla-ts/core";


/**
 * DataList component (`<datalist>`).
 */
export class DataList<Child extends Option = Option, EventMap extends DefaultEventMap = DefaultEventMap, Children extends Child[] = Child[]> extends ElementComponentWithChildren<HTMLDataListElement, Child, EventMap> {
    // @ts-expect-error ---
    #brand;

    /**
     * Create DataList component.
     * @param options The option elements for the `<datalist>` element.
     */
    constructor(...options: Children) {
        super("datalist");
        options.length > 0 && this.append(...options);
    }
}

/**
 * Factory for `DataList` components.
 */
export class DataListFactory<Child extends Option = Option, T = unknown, Children extends Child[] = Child[]> extends ComponentFactory<DataList<Child>> {
    /**
     * Create, set up and return DataList component.
     * @param options The option elements for the `<datalist>` element.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns DataList component.
     */
    public dataList(options?: Children, data?: T): DataList<Child> {
        return this.setupComponent(
            options
                ? new DataList<Child>(...options)
                : new DataList<Child>(),
            data
        );
    }
}
