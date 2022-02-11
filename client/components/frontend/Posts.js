import { useState, useEffect } from 'react';
import axios from 'axios';

import Post from './Post';
import Tag from './Tag';


export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const url = 'http://localhost:4000/posts';

    useEffect(() => {
        axios.get(url).then(foundPosts => {
            setPosts(foundPosts.data.data.posts);
        });
    }, []);

    useEffect(() => {
        axios.get(`${url}/tags`).then(foundTags => {
            setTags(foundTags.data.data.tags);
        })
    }, []);

    return (
        <div class="container">
            <div class="row">
                <div class="col-md-4 order-md-2">
                    {tags.map(tag => {
                        return <Tag tag={tag} />
                    })}
                </div>
                <div class="col-md-8">
                    {posts.map(post => {
                        return <Post post={post} />
                    })}
                </div>
            </div>
        </div>
    );
}