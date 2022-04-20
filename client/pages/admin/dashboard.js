// import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import BackendLayout from "../../layouts/backend";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Dashboard() {
  return (
    <BackendLayout>
      <h1>Dashboard</h1>
    </BackendLayout>
  );
}

// export const getServerSideProps = withPageAuthRequired();
