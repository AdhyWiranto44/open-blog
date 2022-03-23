import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../../actions/posts';
import BackendLayout from '../../../layouts/backend';
import Link from 'next/link';
import Time from '../../../components/frontend/Time';


export default function PostsPage() {
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <BackendLayout
            pageContent={
                <>
                    <div class="row">
                        <div class="col-lg">
                            <table class="table table-bordered table-striped overflow-auto">
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
                                                    <img src="../img/post/defaultimg2.png" alt="post" style={{ maxWidth: "75px" }} />
                                                </td>
                                                <td>
                                                    <Link href={`/admin/post/${post.slug}`}>
                                                        <a>{post.title}</a>
                                                    </Link>
                                                </td>
                                                <td class="post-body">{post.content}</td>
                                                <td>
                                                    <div class="tag-list my-2">
                                                        {post.tags.map(tag => {
                                                            return (
                                                                <Link href={`/admin/tag/${tag}`}>
                                                                    <a class="text-dark"><span class="btn btn-sm btn-light mb-1"><span class="ti-tag"></span> {tag}</span></a>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </td>
                                                <td>
                                                    <Time created_at={post.created_at} />
                                                </td>
                                                <td class="d-flex">
                                                    <Link href={`/admin/posts/${post.slug}/update`}>
                                                        <a class="btn btn-warning mr-2"><span class="ti-pencil-alt"></span> Ubah</a>
                                                    </Link>
                                                    <form action="/admin/posts/post-slug/archive" method="POST">
                                                        <button type="submit" class="btn btn-outline-danger" onClick="return confirm('Yakin ingin mengarsipkan post ini?"><span class="ti-archive"></span> Arsip</button>
                                                    </form>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            }
        />
    );
}