import Link from 'next/link';


export default function TitleSmall({ title, slug }) {
    return (
        <Link href={`/post/${slug}`}>
            <a className="text-dark text-underline-dark">
                <h5 className="card-title mb-0 font-weight-bold">{title}</h5>
            </a>
        </Link>
    );
}