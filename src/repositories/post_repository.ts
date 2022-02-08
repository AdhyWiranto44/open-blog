import Post from '../models/post';


interface Post {
    title: string,
    slug: string,
    content: string,
    img: string,
    tags: string[],
    author: string,
    active: number,
    views: number,
    vote: string,
    created_at: Date,
    updated_at: Date
}

class PostRepository {
    constructor() {}

    async findOne(filter: any) {
        let post = null;
        await Post.findOne(filter).exec()
            .then(foundPost => {
                post = foundPost;
            })
            .catch(err => {
                console.error(err.message); 
            });
        
        return post;
    }

    // insertOne(data: User) {
    //     const newUser = new User({
    //         username: data.username,
    //         password: hashSync(data.password, ROUNDS),
    //         img: "",
    //         created_at: Date(),
    //         updated_at: Date()
    //     });
    //     newUser.save();
    // }

    // async findOneAndUpdate(filter: any, data: User) {
    //     let user = null;
    //     data.password = hashSync(data.password, ROUNDS);
    //     await User.findOneAndUpdate(filter, data).exec()
    //         .then(oldUser => {
    //             user = oldUser;
    //         })
    //         .catch(err => {
    //             console.error(err.message);
    //         });
        
    //     return user;
    // }

    // async removeUser(data: any) {
    //     let user = null;
    //     await User.findByIdAndRemove(data).exec()
    //         .then(deletedUser => {
    //             user = deletedUser;
    //         })
    //         .catch(err => {
    //             console.error(err.message);
    //         });
        
    //     return user;
    // }
}


export default PostRepository;