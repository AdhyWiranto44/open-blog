import Link from "next/link";


export default function Navbar() {
    return (
        <header>
            <div className="header-content">
                <button className="btn btn-dark btn-sm">
                    <Link href="/">
                        <a><span className="ti-arrow-left"></span> Logout</a>
                    </Link>
                </button>
                <div className="header-img"></div>
            </div>
        </header>
    );
}