import Link from 'next/link';


export default function Body({ content, slug }) {
    return (
        <p class="card-text">{content.substring(0, 70)} ...
            <Link href={`/post/${slug}`}>
                <a>read more</a>
            </Link>
        </p>
    );
}