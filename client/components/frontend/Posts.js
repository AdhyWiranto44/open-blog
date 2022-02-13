import { useState, setState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Post from './Post';
import Tag from './Tag';


export default function Posts({ term }) {
    let [posts, setPosts] = useState([]);
    let [currentPosts, setCurrentPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const url = 'http://localhost:4000/posts';

    useEffect(() => {
        axios.get(url).then(foundPosts => {
            setPosts(foundPosts.data.data.posts);
            setCurrentPosts(foundPosts.data.data.posts);
        });
    }, []);

    useEffect(() => {
        axios.get(`${url}/tags`).then(foundTags => {
            setTags(foundTags.data.data.tags);
        })
    }, []);

    const findByTag = (tag) => {
        console.log("find by tag");
        axios.get(`${url}/tags/${tag}`).then(foundPosts => {
            setPosts(foundPosts.data.data.posts);
        });
    }
    
    const filterPosts = (data) => {
        let foundPost = posts.filter(p => p.title.match(new RegExp(data, 'g')));
        return foundPost;
    }

    useEffect(() => {
        let foundPost = filterPosts(term);
        if (foundPost.length > 0) {
            setPosts(foundPost);
        } else {
            setPosts(currentPosts);
        }
    }, [term]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 order-md-2 my-4 my-md-0">
                    {tags.map(tag => {
                        return (
                            <Tag key={uuidv4()} tag={tag} findByTag={() => findByTag(tag)} />
                        );
                    })}
                </div>
                <div className="col-md-8">
                    {posts.map(post => {
                        return <Post key={post._id} post={post} findByTag={() => findByTag(tag)} />
                    })}
                </div>
            </div>
        </div>
    );
}