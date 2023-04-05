import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Post } from 'src/app/post';
import { PostComponent } from './post.component';
import { of } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

describe('Posts Component', () => {
  let Posts: Post[];
  let component: PostComponent;
  let mockPostService: any;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(() => {
    Posts = [
      {
        id: 1,
        body: 'body 1',
        title: 'title 1',
      },
      {
        id: 2,
        body: 'body 2',
        title: 'title 2',
      },
      {
        id: 3,
        body: 'body 3',
        title: 'title 3',
      },
    ];

    mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost']);

    TestBed.configureTestingModule({
      declarations: [PostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    });

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
  });

  describe('deletePost', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true)); //this will return observable
      component.posts = Posts;
    });
    it('should delete the post', () => {
      component.delete(Posts[1]);
      expect(component.posts.length).toBe(2);
    });
    it('should call deletePost method in service once', () => {
      component.delete(Posts[1]);
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });
  });

  it('should set post from post service', () => {
    mockPostService.getPosts.and.returnValue(of(Posts));
    // fixture.detectChanges();
    component.ngOnInit();
    expect(component.posts.length).toBe(3);
  });
});
