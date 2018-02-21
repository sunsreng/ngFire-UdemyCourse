import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore'
import { AuthService } from '../core/auth.service'
import { AngularFireStorage } from 'angularfire2/storage'

@Injectable()
export class GalleryService {
  galleryCollection: AngularFirestoreCollection<any>
  galleryDoc: AngularFirestoreDocument<any>

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private storage: AngularFireStorage
  ) {}

  getImages() {
    const uid = this.auth.currentUserId
    this.galleryCollection = this.afs.collection(`users/${uid}/gallery`)
    return this.galleryCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id
        return { id, ...data }
      })
    })
  }

  getImage(id: string) {
    const uid = this.auth.currentUserId
    this.galleryDoc = this.afs.doc(`users/${uid}/gallery/${id}`)
    return this.galleryDoc.valueChanges()
  }

  deleteImage(id: string, name: string) {
    const uid = this.auth.currentUserId
    const imageRef = this.storage
      .ref(`users/${uid}/gallery`)
      .child(name)
      .delete()
    this.afs.doc(`users/${uid}/gallery/${id}`).delete()
    console.log("Image deleted!")
  }
}
