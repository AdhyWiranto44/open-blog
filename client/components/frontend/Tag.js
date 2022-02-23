import { useDispatch } from "react-redux";
import Link from 'next/link';

import { findByTag } from "../../actions/posts";


export default function Tag({ tag }) {
    const dispatch = useDispatch();

    function handleFiler() {
        dispatch(findByTag(tag));
    }

    return (
        <Link href={`/tag/${tag}`}>
            <a className="text-dark" onClick={handleFiler}><span className="btn btn-sm btn-light mb-2 px-2 mb-1"><span className="ti-tag"></span> {tag}</span></a>
        </Link>
    );
}