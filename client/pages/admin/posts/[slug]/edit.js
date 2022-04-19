import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPost, updatePost } from "../../../../api/posts";
import BackendLayout from '../../../../layouts/backend';

export default function EditForm() {
  const [formUpdate, setFormUpdate] = useState({
    "title": null,
    "content": null,
    "tags": null,
  });
  const post = {
    "_id": "0",
    "title": "Post Title",
    "slug": "post-slug",
    "content": "lorem ipsum dolor si amet",
    "img": "",
    "tags": [
        "skeleton"
    ]
  }
  const router = useRouter();
  const slug = router.query.slug;

  useEffect( async () => {
    await getPost(slug).then(({data}) => {
      post._id = data.data.post._id;
      post.title = data.data.post.title;
      post.content = data.data.post.content;
      post.img = data.data.post.img;
      post.tags = String(data.data.post.tags);
    });

    setFormUpdate({...post});
  }, []);

  const handleUpdatePost = (e) => {
    e.preventDefault();
    updatePost(slug, formUpdate);
    history.back();
  }

  return (
    <BackendLayout
      pageContent={
        <div class="row">
          <div class="col-md-8">
            <div class="card shadow-sm border-0 p-3">
              <div class="card-body">
              <form action={`/admin/post/${post.slug}`} method="POST" onSubmit={(e) => {handleUpdatePost(e)}}>
                <div class="form-group">
                  <input type="text" class="form-control bg-light" id="title" name="title" placeholder="title" value={formUpdate.title} onChange={(e) => setFormUpdate({...formUpdate, "title": e.target.value})} autofocus required />
                </div>
                <div class="form-group">
                  <textarea class="form-control bg-light" id="content" name="content" rows="10" value={formUpdate.content} onChange={(e) => setFormUpdate({...formUpdate, "content": e.target.value})} placeholder="content" required></textarea>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control bg-light" id="tags" name="tags" value={formUpdate.tags} onChange={(e) => setFormUpdate({...formUpdate, "tags": e.target.value})} placeholder="tags: nodejs, express, etc" required />
                </div>
                  <button type="button" class="btn btn-outline-secondary mr-2" onClick={() => history.back()}><span class="ti-arrow-left"></span> Batal</button>
                <button type="submit" class="btn btn-warning font-weight-bold"><span class="ti-pencil"></span> Ubah</button>
              </form>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}