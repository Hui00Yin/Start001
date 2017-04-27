import { Injectable } from '@angular/core';

// Define our content interface
export interface IDisplay {
  name: string;
  src: string;
}

@Injectable()
export class DisplayResourceService {

  constructor() { }

  static contents: IDisplay[] = [
    {
      name: 'Chrysanthemum',
      src: '/assets/imgs/cat.jpg'
    },
    {
      name: 'Desert',
      src: '/assets/imgs/1387.jpg'
    },
    {
      name: 'Hydrangeas',
      src: '/assets/imgs/clif.jpg'
    },
    {
      name: 'Jellyfish',
      src: '/assets/imgs/flower1.jpg'
    },
    {
      name: 'Koala',
      src: '/assets/imgs/flower2.jpeg'
    },
    {
      name: 'Lighthouse',
      src: '/assets/imgs/sky.jpg'
    },
    {
      name: 'Penguins',
      src: '/assets/imgs/bird1.jpeg'
    },
    {
      name: 'Tulips',
      src: '/assets/imgs/bird2.jpeg'
  }]

  loadImgByName(name: string){
    let i = DisplayResourceService.contents.find((item) => {
      return item.name === name;
    });

    return i? Promise.resolve(i.src): Promise.resolve('');  
  }
}
