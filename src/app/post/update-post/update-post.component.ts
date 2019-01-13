import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from '../../shared';
import { ListPostComponent } from '../list-post/list-post.component';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  @Input() postID;
  @Input() postElement;
  @Input() postText;

  editPostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private listPostComponent: ListPostComponent
  ) {

    this.editPostForm = this.fb.group({
      'editPost': [this.postText],
    });

   }

  ngOnInit() {

  }

  submitForm() {

    const postInformation = {
      post_id: this.postID,
      text: this.editPostForm.value.editPost.replace(new RegExp('\n', 'g'), "<br />")
    }

    this.postService.updatePost(postInformation).subscribe( updatePostResponse => {

      this.listPostComponent.postList[this.postElement].text = updatePostResponse.post.text;
      this.listPostComponent.postList[this.postElement].edit = updatePostResponse.post.edit;
      this.listPostComponent.postList[this.postElement].edit_date = updatePostResponse.post.edit_date;

      this.listPostComponent.postEdit(this.postElement, this.postID);

    });



  }

}
