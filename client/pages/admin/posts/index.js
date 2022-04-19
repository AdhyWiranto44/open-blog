import { useEffect, useState } from "react";
import BackendLayout from "../../../layouts/backend";
import Link from "next/link";
import Time from "../../../components/frontend/Time";
import { getPosts, updatePost } from "../../../api/posts";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect( async () => {
    await getPosts().then(({data}) => {
      setPosts([...data.data.posts]);
    }).catch( err => {
      console.log(err);
    })
    console.log(posts.length);
  }, []);

  const handleArchivePost = (slug) => {
    updatePost(slug, { "active": 0 }).then(() => {
      window.location.reload();
    }).catch( err => {
      console.log(err);
    });
  }

  return (
    <BackendLayout
      pageContent={
        <>
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
