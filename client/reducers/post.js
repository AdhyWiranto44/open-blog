const skeletonPost = {
    "_id": "0",
    "title": "Post Title",
    "slug": "post-slug",
    "content": "lorem ipsum dolor si amet",
    "img": "",
    "tags": [
        "skeleton"
    ]
}

export default (post = skeletonPost, action) => {
    switch (action.type) {
        case 'GET_POST':
            return action.payload;
        default:
            return post;
    }
}