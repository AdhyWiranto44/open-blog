import Link from "next/link";
import { useEffect, useState } from "react";
import { removePost, updatePost, getArchivePosts } from "../../../api/posts";
import Searchbar from "../../../components/backend/SearchBar";
import Time from "../../../components/frontend/Time";
import BackendLayout from "../../../layouts/backend";
import Cookies from "js-cookie";
import defaultImage from "../../../public/img/post/defaultimg2.png";

export default function ArchivePostPage() {
  const token = Cookies.get("X-OPEN-BLOG-TOKEN");
  const [posts, setPosts] = useState([]);

  const handleGetArchivePosts = async (title = "") => {
    await getArchivePosts(title, token).then(({data}) => {
      setPosts([...data.data.posts]);
    }).catch( err => {
      console.log(err);
    })
  }

  useEffect(() => {
    handleGetArchivePosts("");
  }, []);

  const handleActivatePost = (slug) => {
    updatePost(slug, token, { "active": 1 }).then(() => {
      window.location.reload();
    }).catch( err => {
      console.log(err);
    });
  }

  const handleRemovePost = (id) => {
    removePost(id, token).then(() => {
      window.location.reload();
    }).catch( err => {
      console.log(err);
    });
  }

  const handleFilter = (e) => {
    e.preventDefault();
    handleGetArchivePosts(e.target.value, token);
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
              {
                posts.length < 1 ? <h1>Post not found</h1> : <table class="table table-striped table-bordered overflow-auto">
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
                              src={defaultImage.src}
                              alt="post"
                              style={{ maxWidth: "75px" }}
                            />
                          </td>
                          <td>
                            {post.title}
                          </td>
                          <td class="post-body">{post.content}</td>
                          <td>
                            <div class="tag-list my-2">
                              {post.tags.map((tag, i, tags) => {
                                return (<>{tag + (i !== tags.length - 1 ? ", " : "")}</>);
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
              }
            </div>
          </div>
        </>
      }
    />
  );
}
