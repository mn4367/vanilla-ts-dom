import { ComponentFactory, FragmentComponent } from "@vanilla-ts/core";


/**
 * Fragment component.
 * @see FragmentComponent
 */
export class Fragment extends FragmentComponent { }

/**
 * Factory for fragment components.
 */
export class FragmentFactory<T> extends ComponentFactory<FragmentComponent> {
    /**
     * Create and return fragment component.
     * @param data Optional arbitrary data passed to the `setupComponent()` function of the factory.
     * @returns Fragment component.
     */
    public fragment(data?: T): Fragment {
        return this.setupComponent(new Fragment(), data);
    }
}
