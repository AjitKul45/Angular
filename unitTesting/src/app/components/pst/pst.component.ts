import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/post';

@Component({
  selector: 'app-pst',
  templateUrl: './pst.component.html',
  styleUrls: ['./pst.component.css'],
})
export class PstComponent {
  @Input() post!: Post;
  @Output() delete = new EventEmitter();
  onDeletePost() {
    this.delete.emit(this.post);
  }
}
