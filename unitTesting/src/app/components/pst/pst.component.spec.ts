import { Post } from 'src/app/post';
import { PstComponent } from './pst.component';
import { first } from 'rxjs';

describe('pst Component', () => {
  let comp: PstComponent;

  beforeEach(() => (comp = new PstComponent()));

  it('should raise an event when the delete post is clicked', () => {
    const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
    comp.post = post;
    comp.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(post);
    });

    comp.onDeletePost();
  });
});
