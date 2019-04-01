import { Component, Input, OnInit } from '@angular/core';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'gallery',
  templateUrl: 'gallery.html'
})
export class GalleryComponent implements OnInit {

  @Input() images: Array<any> = [];

  text: string;

  constructor(public api: ApiProvider) {
    this.text = 'New Gallery';
  }

  ngOnInit() {
    if (this.images.length > 0) {
      this.images = [];
      this.getImages();
    }

    console.log(this.images)
    
  }

  async getImages() {
    this.api.get().then((val) => {
      for (var i in val) {
        this.images.push(val[i]);
      }
    });
  }

}