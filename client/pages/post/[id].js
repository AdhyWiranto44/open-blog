import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import MobileSearchBar from "../../components/frontend/MobileSearchBar";
import Title from "../../components/frontend/Title";
import TitleSmall from "../../components/frontend/TitleSmall";
import BodyFull from "../../components/frontend/BodyFull";
import Time from "../../components/frontend/Time";
import Tag from "../../components/frontend/Tag";
import DefaultImage from "../../components/frontend/DefaultImage";
import { getPosts } from "../../actions/posts";
import { getPost } from "../../actions/post";
import FrontendLayout from "../../layouts/frontend";


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
        <FrontendLayout
            pageContent={
                <div className="container">
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
            }
         />
    );
}