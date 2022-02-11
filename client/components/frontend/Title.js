import Link from 'next/link';


export default function Title({ title, slug }) {
    return (
        <Link href={`/post/${slug}`}>
            <a className="text-dark text-underline-dark">
                <h4 className="card-title mb-0 font-weight-bold">{title}</h4>
            </a>
        </Link>
    );
}