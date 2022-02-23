import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { getPosts, filterPosts } from '../../actions/posts';


export default function Navbar() {
    const dispatch = useDispatch();

    function handleFilter(e) {
        e.preventDefault();
        dispatch(filterPosts(e.target.value));
    }

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white py-3 shadow-sm sticky-top">
            <div className="container-fluid">
                <Link href="/">
                    <a className="navbar-brand font-weight-bold" onClick={() => dispatch(getPosts())}>Open Blog</a>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                        <form action="/" className="navbar-form mr-3 bg-light border rounded" onSubmit={handleFilter}>
                            <input className="form-control bg-light border-0 rounded" type="search" placeholder="Search" aria-label="Search" name="search" onChange={handleFilter} />
                        </form>
                        <Link href="/login">
                            <a className="nav-link text-light btn btn-dark px-3 border-0 rounded shadow-sm">Login</a>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}