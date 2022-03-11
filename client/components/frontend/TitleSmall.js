import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { getPost } from '../../actions/post';


export default function TitleSmall({ title, slug, renderPost }) {
    const dispatch = useDispatch();

    return (
        <Link href={`/post/${slug}`}>
            <a className="text-dark text-underline-dark" onClick={() => dispatch(getPost(slug))}>
                <h5 className="card-title mb-0 font-weight-bold">{title}</h5>
            </a>
        </Link>
    );
}