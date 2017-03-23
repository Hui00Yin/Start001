// Define our content interface
export interface IContent {
  name: string;
  avatar: string;
}

/**
 * Content Data Service
 *
 * Uses embedded, hard-coded data model; acts asynchronously to simulate remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 * @ngInject
 */
export class ContentDataService {
  static contents: IContent[] = [
    {
      name: 'Chrysanthemum',
      avatar: 'svg-1'
    },
    {
      name: 'Desert',
      avatar: 'svg-2'
    },
    {
      name: 'Hydrangeas',
      avatar: 'svg-3'
    },
    {
      name: 'Jellyfish',
      avatar: 'svg-4'
    },
    {
      name: 'Koala',
      avatar: 'svg-1'
    },
    {
      name: 'Lighthouse',
      avatar: 'svg-2'
    },
    {
      name: 'Penguins',
      avatar: 'svg-3'
    },
    {
      name: 'Tulips',
      avatar: 'svg-4'
    }
  ];

  private $q:ng.IQService;

  constructor($q:ng.IQService) {
    this.$q = $q;

    return this;
  }

  /**
   * Returns a promise which asynchronously loads the list of content.
   *
   * @returns {IPromise<{name: string, avatar: string, content}[]>}
   */
  loadAllContent() {
    // Simulate async nature of real remote calls
    return this.$q.when(ContentDataService.contents);
  }
}

