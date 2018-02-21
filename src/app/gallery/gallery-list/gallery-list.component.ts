import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  images: Observable<any[]>

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.getImages()
  }

  getImages() {
    this.images =  this.galleryService.getImages()
  }

}
