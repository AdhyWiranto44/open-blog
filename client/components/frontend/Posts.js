import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
        <div className="container">
            <div className="row">
                <div className="col-md-4 order-md-2">
                    {tags.map(tag => {
                        return <Tag key={uuidv4()} tag={tag} />
                    })}
                </div>
                <div className="col-md-8">
                    {posts.map(post => {
                        return <Post key={post._id} post={post} />
                    })}
                </div>
            </div>
        </div>
    );
}