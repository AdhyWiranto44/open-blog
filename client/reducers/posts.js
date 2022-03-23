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

export default (posts = [skeletonPost], action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return action.payload;
        case 'GET_ARCHIVE_POSTS':
            return action.payload;
        case 'FILTER_POSTS':
            return action.payload;
        case 'FIND_BY_TAG':
            return action.payload;
        default:
            return posts;
    }
}