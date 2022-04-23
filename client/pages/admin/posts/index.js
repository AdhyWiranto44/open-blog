import { useEffect, useState } from "react";
import BackendLayout from "../../../layouts/backend";
import Link from "next/link";
import Time from "../../../components/frontend/Time";
import { getPosts, updatePost } from "../../../api/posts";
import Searchbar from "../../../components/backend/SearchBar";
import Cookies from "js-cookie";


export default function PostsPage() {
  const token = Cookies.get("X-OPEN-BLOG-TOKEN");
  const [posts, setPosts] = useState([]);

  const handleGetPosts = async (title = "") => {
    await getPosts(title).then(({data}) => {
      setPosts([...data.data.posts]);
    }).catch( err => {
      console.log(err);
    })
  }

  useEffect(() => {
    handleGetPosts();
    console.log(posts.length);
  }, []);

  const handleArchivePost = (slug) => {
    updatePost(slug, token, { "active": 0 }).then(() => {
      window.location.reload();
    }).catch( err => {
      console.log(err);
    });
  }

  const handleFilter = (e) => {
    e.preventDefault();
    handleGetPosts(e.target.value);
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
              posts.length < 1 ? <h1>Post not found</h1> : <table class="table table-bordered table-striped overflow-auto">
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
                  { posts.map((post, i) => {
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
                            class="btn btn-outline-danger"
                            onClick={(e) => handleArchivePost(post.slug)}
                          >
                            <span class="ti-archive"></span> Arsip
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
