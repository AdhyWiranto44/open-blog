export default function MobileSearchBar() {
    return (
        <div className="container">
            <div className="row my-3">
                <div className="col-md-8">
                    <form action="/" method="POST" className="container-form bg-white border rounded">
                        <input className="form-control bg-white border-0 rounded-right" type="search" placeholder="Search" aria-label="Search" name="search" />
                        <button className="btn btn-primary px-3 border-0 rounded-right"><span className="ti-search"></span></button>
                    </form>
                </div>
            </div>
        </div>
    );
}