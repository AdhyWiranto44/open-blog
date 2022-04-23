import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { insertPost } from "../../../actions/post";
import BackendLayout from "../../../layouts/backend";
import Cookies from "js-cookie";


export default function AddPostForm() {
  const token = Cookies.get("X-OPEN-BLOG-TOKEN");
  const dispatch = useDispatch();
  const router = useRouter();
  const [newPost, setNewPost] = useState({
    title: null,
    content: null,
    tags: null,
    img: null
  });

  const addNewPost = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
    formData.append("tags", newPost.tags);
    formData.append("image", newPost.img);

    dispatch(insertPost(token, formData));
    router.push("/admin/posts");
  };

  return (
    <BackendLayout
      pageContent={
        <div class="row">
          <div class="col-md-8">
            <div class="card shadow-sm border-0 p-3">
              <div class="card-body">
                <form
                  action="/admin/posts/tambah"
                  method="POST"
                  encType="multiple/form-data"
                  onSubmit={(e) => {
                    addNewPost(e);
                  }}
                >
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control bg-light"
                      id="title"
                      name="title"
                      placeholder="title"
                      onChange={(e) =>
                        setNewPost({ ...newPost, title: e.target.value })
                      }
                      autofocus
                      required
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      class="form-control bg-light"
                      id="content"
                      name="content"
                      rows="10"
                      onChange={(e) =>
                        setNewPost({ ...newPost, content: e.target.value })
                      }
                      placeholder="content"
                      required
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control bg-light"
                      id="tags"
                      name="tags"
                      onChange={(e) =>
                        setNewPost({ ...newPost, tags: e.target.value })
                      }
                      placeholder="tags: nodejs, express, etc"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      class="form-control bg-light"
                      id="image"
                      name="image"
                      onChange={(e) =>
                        setNewPost({...newPost, img: e.target.files[0]})
                      }
                    />
                  </div>
                  <a href="/admin/posts" class="btn btn-outline-secondary mr-2">
                    <span class="ti-arrow-left"></span> Batal
                  </a>
                  <button
                    type="submit"
                    class="btn btn-primary font-weight-bold"
                  >
                    <span class="ti-plus"></span> Tambah
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
