import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArchivePosts } from "../../../actions/posts";
import { removePost, updatePost } from "../../../api/posts";
import Searchbar from "../../../components/backend/SearchBar";
import Time from "../../../components/frontend/Time";
import BackendLayout from "../../../layouts/backend";

export default function ArchivePostPage() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArchivePosts());
  }, [dispatch]);

  const handleActivatePost = (slug) => {
    updatePost(slug, { "active": 1 }).then(() => {
      window.location.reload();
    }).catch( err => {
      console.log(err);
    });
  }

  const handleRemovePost = (id) => {
    removePost(id).then(() => {
      window.location.reload();
    }).catch( err => {
      console.log(err);
    });
  }

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(getArchivePosts(e.target.value));
  }

  return (
    <BackendLayout
      pageContent={
        <>
          <div class="row mb-5">
            <div class="col-md-4">
              <Searchbar handleFilter={(e) => handleFilter(e)} />
            </div>
          </div>

          <div class="row">
            <div class="col-lg">
              {posts.length < 1 ? (
                <h1>Post not found</h1>
              ) : (
                <table class="table table-striped table-bordered overflow-auto">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Gambar</th>
                      <th scope="col">Judul</th>
                      <th scope="col">Body</th>
                      <th scope="col">Tags</th>
                      <th scope="col">Ditambahkan</th>
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, i) => {
                      return (
                        <tr>
                          <th scope="row">{++i}</th>
                          <td>
                            <img
                              src="../img/post/defaultimg2.png"
                              alt="post"
                              style={{ maxWidth: "75px" }}
                            />
                          </td>
                          <td>
                            <Link href={`/admin/post/${post.slug}`}>
                              <a>{post.title}</a>
                            </Link>
                          </td>
                          <td class="post-body">{post.content}</td>
                          <td>
                            <div class="tag-list my-2">
                              {post.tags.map((tag) => {
                                return (
                                  <Link href={`/admin/tag/${tag}`}>
                                    <a class="text-dark">
                                      <span class="btn btn-sm btn-light mb-1">
                                        <span class="ti-tag"></span> {tag}
                                      </span>
                                    </a>
                                  </Link>
                                );
                              })}
                            </div>
                          </td>
                          <td>
                            <Time created_at={post.created_at} />
                          </td>
                          <td class="d-flex">
                            <Link href={`/admin/posts/${post.slug}/edit`}>
                              <a class="btn btn-warning mr-2">
                                <span class="ti-pencil-alt"></span> Ubah
                              </a>
                            </Link>
                            <button
                              type="submit"
                              class="btn btn-primary mr-2 h-100"
                              onClick={(e) => handleActivatePost(post.slug)}
                            >
                              <span class="ti-plus"></span> Aktifkan
                            </button>
                            <button
                              type="submit"
                              class="btn btn-danger border-0 mb-2 h-100"
                              onClick={(e) => handleRemovePost(post._id)}
                            >
                              <span class="ti-trash"></span> Hapus
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      }
    />
  );
}
