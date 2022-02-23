import { useEffect } from 'react';
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

import { getTags } from '../../actions/tags';
import { getPosts, findByTag } from '../../actions/posts';
import Navbar from '../../components/frontend/Navbar';
import Footer from '../../components/frontend/Footer';
import MobileSearchBar from '../../components/frontend/MobileSearchBar';
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
        <div className='bg-light'>
            <Head>
                <meta name="description" content="Open Blog: an open source blogging app for everyone." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossOrigin="anonymous" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css" />
                <title>Open Blog: an open source blogging app for everyone.</title>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js" integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF" crossOrigin="anonymous"></script>
                <script src="/js/script.js"></script>
            </Head>
            <Navbar />
            <MobileSearchBar filterPosts={(e) => setTerm(e.target.value)} />
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
            <Footer />
        </div>
    )
}
