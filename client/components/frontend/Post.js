import DefaultImage from './DefaultImage';
import Body from './Body';
import Tag from './Tag';
import Time from './Time';
import Title from './Title';


export default function Post({ post }) {
    return (
        <div class="card mb-3 border-0 bg-transparent">
            <div class="row no-gutters d-flex align-items-center">
                <div class="col-md-4">
                    <DefaultImage />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <Title title={post.title} slug={post.slug} />
                        <Time created_at={post.created_at} />
                        <div class="tag-list my-2">
                            {post.tags.map(tag => {
                                return <Tag tag={tag} />
                            })}
                        </div>
                        <Body content={post.content} slug={post.slug} />
                    </div>
                </div>
            </div>
        </div>
    );
}