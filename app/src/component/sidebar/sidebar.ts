export class SidebarComponent {
  // Define our AppComponent's name
  static componentName:string = "mySidebar";

  // Define our AppComponent's config
  static componentConfig:ng.IComponentOptions = {
    bindings: {},
    controller: SidebarComponent,
    templateUrl: 'src/component/sidebar/sidebar.html'
  };


    static $inject = [];
    constructor() {
        
    }

    private $onInit = () => {}

    private $onDestroy = () => { }

    private $postLink = () => { }
}