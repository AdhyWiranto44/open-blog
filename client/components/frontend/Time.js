import moment from 'moment';


export default function Time({ created_at }) {
    return (
        <>
            <small class="text-muted">{moment(created_at).fromNow()}</small><br />
        </>
    );
}