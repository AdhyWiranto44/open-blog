import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { getPosts } from '../actions/posts';
import { getTags } from '../actions/tags';
import Tag from '../components/frontend/Tag';
import Post from '../components/frontend/Post';
import FrontendLayout from '../layouts/frontend';
import Head from 'next/head';
import Navbar from '../components/frontend/Navbar';
import Footer from '../components/frontend/Footer';
import MobileSearchBar from '../components/frontend/MobileSearchBar';


export default function Home() {
    const posts = useSelector(state => state.posts);
    const tags = useSelector(state => state.tags);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
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
    );
}
