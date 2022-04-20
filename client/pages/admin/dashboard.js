// import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import BackendLayout from "../../layouts/backend";
import Cookies from "js-cookie";
import { useRouter } from "next/router";


export default function Dashboard() {
  const router = useRouter();
  const token = Cookies.get("X-OPEN-BLOG-TOKEN");
  if (!token || token === "") {
    return router.push("/login");
  }

  return (
    <BackendLayout>
      <h1>Dashboard</h1>
    </BackendLayout>
  );
}

// export const getServerSideProps = withPageAuthRequired();
