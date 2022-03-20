import BackendLayout from "../../../layouts/backend";


export default function ArchivePostPage() {
    return (
        <BackendLayout
            pageContent={
                <>
                    <div class="row mb-5">
                        <div class="col-md-4">
                            <form action="/admin/arsip-post" method="POST" class="d-flex bg-white border">
                                <input class="form-control bg-white border-0" type="search" placeholder="Search" aria-label="Search" name="search" />
                                <button class="btn btn-primary px-3 rounded-0"><span class="ti-search"></span></button>
                            </form>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg">
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
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>
                                            <img src="../img/post/defaultimg2.png" alt="post" style={{ maxWidth: "75px" }} />
                                        </td>
                                        <td>Post Title</td>
                                        <td class="post-body">Lorem impsum</td>
                                        <td>
                                            <div class="tag-list my-2">
                                                    <a class="text-dark" href="/admin/tag/tag-name"><span class="btn btn-sm btn-light mb-1"><span class="ti-tag"></span> tag</span></a>
                                            </div>
                                        </td>
                                        <td>
                                            <small>
                                                just now.
                                            </small><br />
                                        </td>
                                        <td class="d-flex">
                                            <a href="/admin/posts/post-slug/update" class="btn btn-warning mr-2"><span class="ti-pencil-alt"></span> Ubah</a>
                                            <form action="/admin/posts/post-slug/activate" method="POST" class="d-inline">
                                                <button type="submit" class="btn btn-primary mr-2 h-100" onClick="return confirm('Aktifkan post ini?"><span class="ti-plus"></span> Aktifkan</button>
                                            </form>
                                            <form action="/admin/posts/post-slug/delete" method="POST" class="d-inline">
                                                <button type="submit" class="btn btn-danger border-0 mb-2 h-100" onClick="return confirm('Yakin ingin menghapus post ini? <%= post.title %>');"><span class="ti-trash"></span> Hapus</button>
                                            </form>    
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            }
        />
    );
}