import Link from 'next/link';


export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-md navbar-light bg-light py-3 border-bottom sticky-top py-4">
            <div class="container-fluid">
                <Link href="/">
                    <a class="navbar-brand font-weight-bold"><i class="fas fa-arrow-left"></i> Open Blog</a>
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    );
}