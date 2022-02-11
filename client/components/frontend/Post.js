import { v4 as uuidv4 } from 'uuid';

import DefaultImage from './DefaultImage';
import Body from './Body';
import Tag from './Tag';
import Time from './Time';
import Title from './Title';


export default function Post({ post }) {
    return (
        <div className="card mb-3 border-0 bg-transparent">
            <div className="row no-gutters d-flex align-items-center">
                <div className="col-md-4">
                    <DefaultImage />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <Title title={post.title} slug={post.slug} />
                        <Time created_at={post.created_at} />
                        <div className="tag-list my-2">
                            {post.tags.map(tag => {
                                return <Tag key={uuidv4()} tag={tag} />
                            })}
                        </div>
                        <Body content={post.content} slug={post.slug} />
                    </div>
                </div>
            </div>
        </div>
    );
}