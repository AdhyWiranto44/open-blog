export default function MobileSearchBar() {
    return (
        <div class="container">
            <div class="row my-3">
                <div class="col-md-8">
                    <form action="/" method="POST" class="container-form bg-white border rounded">
                        <input class="form-control bg-white border-0 rounded-right" type="search" placeholder="Search" aria-label="Search" name="search" />
                        <button class="btn btn-primary px-3 border-0 rounded-right"><span class="ti-search"></span></button>
                    </form>
                </div>
            </div>
        </div>
    );
}