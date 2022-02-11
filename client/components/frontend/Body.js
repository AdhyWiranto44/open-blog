import Link from 'next/link';


export default function Body({ content, slug }) {
    return (
        <p className="card-text">{content.substring(0, 70)} ...
            <Link href={`/post/${slug}`}>
                <a>read more</a>
            </Link>
        </p>
    );
}