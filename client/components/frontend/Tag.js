export default function Tag({ tag }) {
    return (
        <a class="text-dark" href={`/posts/tags/${tag}`}><span class="btn btn-sm btn-light mb-2 px-2 mb-1"><span class="ti-tag"></span> {tag}</span></a>
    );
}