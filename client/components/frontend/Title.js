import Link from 'next/link';


export default function Title({ title, slug }) {
    return (
        <Link href={`/post/${slug}`}>
            <a class="text-dark text-underline-dark">
                <h4 class="card-title mb-0 font-weight-bold">{title}</h4>
            </a>
        </Link>
    );
}