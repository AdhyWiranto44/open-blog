import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Footer from "../../components/frontend/Footer";
import MobileSearchBar from "../../components/frontend/MobileSearchBar";
import Navbar from "../../components/frontend/Navbar";
import Title from "../../components/frontend/Title";
import TitleSmall from "../../components/frontend/TitleSmall";
import BodyFull from "../../components/frontend/BodyFull";
import Time from "../../components/frontend/Time";
import Tag from "../../components/frontend/Tag";
import DefaultImage from "../../components/frontend/DefaultImage";
import { getPosts } from "../../actions/posts";
import { getPost } from "../../actions/post";


export default function Post() {
    const posts = useSelector(state => state.posts);
    const post = useSelector(state => state.post);
    const dispatch = useDispatch();
    const router = useRouter();
    const slug = router.query.id;

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getPost(slug));
    }, [dispatch]);

    return (
        <div class="bg-light">
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

            <Navbar filterPosts={(e) => setTerm(e.target.value)} />
            <div className="container">
                <MobileSearchBar filterPosts={(e) => setTerm(e.target.value)} />
                <div className="row">
                    <div className="col-lg-8">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb bg-transparent p-0">
                                <li className="breadcrumb-item"><Link href="/"><a className="text-dark">Home</a></Link></li>
                                <li className="breadcrumb-item active font-weight-bold" aria-current="page">Halaman post</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-lg border-bottom mb-4">
                                <a className="btn btn-sm btn-danger mb-3" href="/admin/mengubah-post/<%= currentPost.slug %>"><span className="ti-pencil-alt"></span> Ubah</a>
                                <div className="card mb-3 border-0 bg-transparent">
                                    <DefaultImage />
                                    <div className="card-body px-0">
                                        <Title title={post.title} slug={post.slug} />
                                        <Time created_at={post.created_at} />
                                        <div className="tag-list my-2">
                                            {post.tags.map(tag => {
                                                return <Tag key={uuidv4()} tag={tag} />
                                            })}
                                        </div>
                                        <BodyFull content={post.content} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h6 className="mb-3 font-weight-bold">Other Posts</h6>
                        {!posts.length ? <h2>Loading ...</h2> : posts.map((post, i) => {
                            if (i < 3) {
                                return (
                                    <div className="row">
                                        <div className="col-lg">
                                            <div className="card mb-3 border-0 bg-transparent">
                                                <div className="card-body p-0">
                                                    <TitleSmall title={post.title} slug={post.slug} />
                                                    <Time created_at={post.created_at} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}