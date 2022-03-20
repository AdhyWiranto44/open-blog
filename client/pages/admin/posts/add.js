import BackendLayout from '../../../layouts/backend';


export default function AddPostForm() {
    return (
        <BackendLayout
            pageContent={
                <div class="row">
                    <div class="col-md-8">
                        <div class="card shadow-sm border-0 p-3">
                            <div class="card-body">
                            <form action="/admin/posts/tambah" method="POST">
                                <div class="form-group">
                                    <input type="text" class="form-control bg-light" id="title" name="title" placeholder="title" autofocus required />
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control bg-light" id="content" name="content" rows="10" placeholder="content" required></textarea>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control bg-light" id="tags" name="tags" placeholder="tags: nodejs, express, etc" required />
                                </div>
                                {/* <div class="form-group">
                                    <input type="file" accept="image/*" class="form-control bg-light" id="image" name="image" />
                                </div> */}
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