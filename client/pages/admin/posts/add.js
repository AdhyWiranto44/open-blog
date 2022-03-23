import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { insertPost } from '../../../actions/post';
import BackendLayout from '../../../layouts/backend';


export default function AddPostForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [newPost, setNewPost] = useState({
        "title": null,
        "content": null,
        "tags": null,
    });

    const addNewPost = (e) => {
        e.preventDefault();
        dispatch(insertPost(newPost));
        router.push("/admin/posts");
    }

    return (
        <BackendLayout
            pageContent={
                <div class="row">
                    <div class="col-md-8">
                        <div class="card shadow-sm border-0 p-3">
                            <div class="card-body">
                            <form action="/admin/posts/tambah" method="POST" onSubmit={(e) => {addNewPost(e)}}>
                                <div class="form-group">
                                    <input type="text" class="form-control bg-light" id="title" name="title" placeholder="title" onChange={(e) => setNewPost({...newPost, title: e.target.value})} autofocus required />
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control bg-light" id="content" name="content" rows="10" onChange={(e) => setNewPost({...newPost, content: e.target.value})} placeholder="content" required></textarea>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control bg-light" id="tags" name="tags" onChange={(e) => setNewPost({...newPost, tags: e.target.value})} placeholder="tags: nodejs, express, etc" required />
                                </div>
                                <a href="/admin/posts" class="btn btn-outline-secondary mr-2"><span class="ti-arrow-left"></span> Batal</a>
                                <button type="submit" class="btn btn-primary font-weight-bold"><span class="ti-plus"></span> Tambah</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        />
    );
}