import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Dashboard() {
    return (
        <h1>/admin/dashboard</h1>
    );
}

export const getServerSideProps = withPageAuthRequired();