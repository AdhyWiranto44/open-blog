const skeletonTags = ["tag1", "tag2", "tag3"];

export default (tags = skeletonTags, action) => {
    switch (action.type) {
        case 'GET_TAGS':
            return action.payload;
        default:
            return tags;
    }
}