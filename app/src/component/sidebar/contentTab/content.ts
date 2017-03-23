import {IContent, ContentDataService} from '../../../services/content.service'
export class ContentTabComponent {
  // Define our AppComponent's name
  static componentName:string = "contentTab";

  // Define component's config
  static componentConfig:ng.IComponentOptions = {
    bindings: {
      selected: '<',
      onUpdate: '&'
    },
    controller: ContentTabComponent,
    templateUrl: 'src/component/sidebar/contentTab/content.html'
  };

  private lists:IContent[] = [];

  private onUpdate;
  private label:string;
  private selected: number;

  static $inject = ["contentService"];
  constructor(private contentService: ContentDataService) {
      
  }

  private $onInit = () => {
    this.contentService.loadAllContent()
    .then((lists) => {
        console.log("execute loadAllContent:" + lists[0].name);
        this.lists = lists;
    });
  }

  private $onDestroy = () => { }

  private $postLink = () => { }

  $onChanges(changes){
  }
}