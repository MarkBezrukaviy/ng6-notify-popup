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
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  setRootViewContainer(container: ComponentRef<any>): void {
    this._container = container;
  }

  getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
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

  appendComponentToBody<T>(componentClass: Type<T>, options: any = {}): ComponentRef<any> {
    return this.appendComponent(componentClass, options, document.body);
  }

  appendComponent<T>(component: Type<T>, options: any = {}, location: Element): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);
    const componentRootNode = this.getComponentRootNode(componentRef);

    // project the options passed to the component instance
    this.projectComponentInputs(componentRef, options);

    this.appRef.attachView(componentRef.hostView);

    componentRef.onDestroy(() => {
      this.appRef.detachView(componentRef.hostView);
    });

    location.appendChild(componentRootNode);

    return componentRef;
  }

  destroyComponent(compRef: ComponentRef<any>): void {
    compRef.destroy();
  }
}
