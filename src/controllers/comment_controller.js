const Comment = require('../models/comment');


exports.store = (req, res) => {
    const currentPostSlug = req.params.currentPostSlug;

    const newComment = new Comment({
        name: req.body.name,
        body: req.body.comment,
        postSlug: currentPostSlug,
        hidden : 0,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime()
    });

    newComment.save()

    .then(() => {
        res.redirect("/post/" + currentPostSlug);
    })

    .catch(err => {
        console.log(err);
    });
}

exports.hide = (req, res) => {
    const currentPostSlug = req.params.currentPostSlug;

    Comment.findOneAndUpdate(
        {body: req.body.deleteComment, postSlug: currentPostSlug}, 
        {hidden: 1}).exec()

    .then(() => {
        res.redirect("/post/" + currentPostSlug);
    })

    .catch(err => {
        console.log(err);
    });
}

exports.destroy = (req, res) => {
    Comment.findByIdAndRemove({_id: req.body.permanentDeleteComment}).exec()

    .then(() => {
        res.redirect("/post/" + req.params.currentPostSlug);
    })

    .catch(err => {
        console.log(err);
    });
}

exports.activate = (req, res) => {
    const currentPostSlug = req.params.currentPostSlug;

    Comment.findOneAndUpdate(
        {hidden: 1, postSlug: currentPostSlug}, 
        {hidden: 0}).exec()

    .then(() => {
        res.redirect("/post/" + currentPostSlug);
    })

    .catch(err => {
        console.log(err);
    });
}