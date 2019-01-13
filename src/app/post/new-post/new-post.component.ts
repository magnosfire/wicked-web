import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../../shared';
import { PostService } from '../../shared/services/post.service';
import { map } from 'rxjs/operators/map';
import { ClubService } from '../../shared/services/club.service';
import { ImageCropperComponent } from '../../shared/image-cropper/image-cropper.component';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  clubName: String = '';
  clubView;
  postForm: FormGroup;
  token;
  

  /* IMAGE UPLOAD */

  @ViewChild('cropper') cropper: ImageCropperComponent;

  private dataURI: any = '';
  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private imageChangedEventUpload: File = null;
  private cropperReady = false;
  private url:any;
  private imageName: any = '';
  
  selectedFile: File;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private jwtService: JwtService,
    private postService: PostService,
    private clubService: ClubService
  ) {

    clubService.clubView$.subscribe((clubV) => {
      this.clubView = clubV;
    });

    this.postForm = this.fb.group({
      'post': [''],
    });

    this.token = JSON.parse(this.jwtService.getToken());

    this.activatedRoute.params.subscribe((params: Params) => {
      this.clubName = params['clubName'];
    });


  }

  ngOnInit() {

  }

  submitForm() {

    const postData = {
      text: this.postForm.value.post.replace(new RegExp('\n', 'g'), "<br />"),
      club_id: this.clubView.id,
      token: this.token.token
    }

    const fd = new FormData;
    fd.append('picture', this.url || '');
    fd.append('pictureName', this.imageName || '');
    fd.append('text', this.postForm.value.post.replace(new RegExp('\n', 'g'), "<br />"));
    fd.append('club_id', this.clubView.id);
    fd.append('token', this.token.token);

    this.postService.savePost(fd).subscribe(
      /*data => {

        this.postService.postList[0].unshift(data.post[0]);
        this.postService.addPostInPostList(data.post);

        this.postForm.reset();

      }, err => {

      }*/
      
    );

  }

    /* IMAGE UPLOAD */

  fileChangeEvent(event: any): void {
    if(event.target.files[0]){

      this.imageChangedEvent = event;
      this.imageChangedEventUpload = <File>event.target.files[0];
      this.fileChangeListener(event);
      
    }
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  imageLoaded() {
    this.cropperReady = true;
  }

  fileChangeListener($event) {

    console.log($event.target.files[0]);

    if($event.target.files[0]) {

      const image: any = new Image();
      const file: File = $event.target.files[0];
      const that = this;
      const myReader: FileReader = new FileReader();

      myReader.onloadend = function (loadEvent: any) {

        image.src = loadEvent.target.result;
        that.dataURI = image.src;

      };
      myReader.readAsDataURL(file);

    }

  }

  readUrl(event:any) {

    if (event.target.files && event.target.files[0]) {

      var reader = new FileReader();
  
      reader.onload = (eventProgress: ProgressEvent) => {

        this.imageName = <File>event.target.files[0].name;
        this.url = (<FileReader>eventProgress.target).result;

      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
