import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentInjectService {
  private _container: ComponentRef<any>;

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  getRootViewContainer(): ComponentRef<any> {
    if (this._container) return this._container;

    const rootComponents = this.applicationRef.components;
    if (rootComponents.length) return rootComponents[0];

    throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
  }

  setRootViewContainer(container: ComponentRef<any>): void {
    this._container = container;
  }

  getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  getRootViewContainerNode(): HTMLElement {
    return this.getComponentRootNode(this.getRootViewContainer());
  }

  projectComponentInputs(component: ComponentRef<any>, options: any): ComponentRef<any> {
    if (options) {
      const props = Object.getOwnPropertyNames(options);
      for (const prop of props) {
        component.instance[prop] = options[prop];
      }
    }

    return component;
  }

  appendComponentToBody<T>(
    componentClass: Type<T>,
    options: any = {},
    location: Element
  ): ComponentRef<any> {
    return this.appendComponent(componentClass, options, this.getRootViewContainerNode())
  }

  appendComponent<T>(
    componentClass: Type<T>,
    options: any = {},
    location: Element
  ): ComponentRef<any> {

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    let componentRef = componentFactory.create(this.injector);
    let appRef: any = this.applicationRef;
    let componentRootNode = this.getComponentRootNode(componentRef);

    // project the options passed to the component instance
    this.projectComponentInputs(componentRef, options);

    // ApplicationRef's attachView and detachView methods are in Angular ^2.2.1 but not before.
    // The `else` clause here can be removed once 2.2.1 is released.
    if (appRef['attachView']) {
      appRef.attachView(componentRef.hostView);

      componentRef.onDestroy(() => {
        appRef.detachView(componentRef.hostView);
      });
    } else {
      // When creating a component outside of a ViewContainer, we need to manually register
      // its ChangeDetector with the application. This API is unfortunately not published
      // in Angular <= 2.2.0. The change detector must also be deregistered when the component
      // is destroyed to prevent memory leaks.
      let changeDetectorRef = componentRef.changeDetectorRef;
      appRef.registerChangeDetector(changeDetectorRef);

      componentRef.onDestroy(() => {
        appRef.unregisterChangeDetector(changeDetectorRef);

        // Normally the ViewContainer will remove the component's nodes from the DOM.
        // Without a ViewContainer, we need to manually remove the nodes.
        if (componentRootNode.parentNode) {
          componentRootNode.parentNode.removeChild(componentRootNode);
        }
      });
    }

    location.appendChild(componentRootNode);

    return componentRef;
  }

  destroyComponent(compRef: ComponentRef<any>): void {
    this.applicationRef.detachView(compRef.hostView);
    compRef.destroy();
  }
}
