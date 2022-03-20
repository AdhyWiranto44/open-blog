// import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import BackendLayout from "../../layouts/backend";


export default function Dashboard() {
    return (
        <BackendLayout>
            <h1>Dashboard</h1>
        </BackendLayout>
    );
}

// export const getServerSideProps = withPageAuthRequired();