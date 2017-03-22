export class RootComponent {
  // Define our AppComponent's name
  static componentName:string = "myRoot";

  // Define our AppComponent's config
  static componentConfig:ng.IComponentOptions = {
    bindings: {},
    controller: RootComponent,
    templateUrl: 'src/boot/root.html'
  };


    static $inject = [];
    constructor() {
        
    }

    private $onInit = () => {}

    private $onDestroy = () => { }

    private $postLink = () => { }
}


