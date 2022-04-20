import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Tag from '../components/frontend/Tag';
import Post from '../components/frontend/Post';
import FrontendLayout from '../layouts/frontend';
import { getPosts } from '../api/posts';
import { getTags } from '../api/tags';


export default function Home() {
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);

    const handleGetPosts = () => {
      getPosts().then(({data}) => {
        setPosts([...data.data.posts]);
      }).catch(err => {
        console.log(err);
      });
    }

    const handleGetTags = () => {
      getTags().then(({data}) => {
        setTags([...data.data.tags]);
      }).catch(err => {
        console.log(err);
      });
    }

    useEffect(() => {
      handleGetPosts();
    }, []);

    useEffect(() => {
      handleGetTags();
    }, []);

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
                            {!posts.length ? <h2>Post not found</h2> : posts.map(post => {
                                return <Post key={post._id} post={post} />
                            })}
                        </div>
                    </div>
                </div>
            }
        />
    );
}
