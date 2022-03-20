import { useEffect } from 'react';
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

import { getTags } from '../../actions/tags';
import { getPosts, findByTag } from '../../actions/posts';
import FrontendLayout from '../../layouts/frontend';
import Tag from '../../components/frontend/Tag';
import Post from '../../components/frontend/Post';

export default function PostByTag() {
    const posts = useSelector(state => state.posts);
    const tags = useSelector(state => state.tags);
    const dispatch = useDispatch();
    const router = useRouter();
    const tag = router.query.id;

    useEffect(() => {
        dispatch(findByTag(tag));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTags());
    }, [dispatch]);

    return (
        <FrontendLayout
            pageContent={
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 order-md-2 my-4 my-md-0">
                            {tags.map(tag => {
                                return (
                                    <Tag key={uuidv4()} tag={tag} />
                                );
                            })}
                        </div>
                        <div className="col-md-8">
                            {!posts.length ? <h2>Loading ...</h2> : posts.map(post => {
                                return <Post key={post._id} post={post} />
                            })}
                        </div>
                    </div>
                </div>
            }
        />
    )
}
