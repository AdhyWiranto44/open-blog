export default function Tag({ tag, findByTag }) {
    return (
        <a className="text-dark" onClick={findByTag}><span className="btn btn-sm btn-light mb-2 px-2 mb-1"><span className="ti-tag"></span> {tag}</span></a>
    );
}