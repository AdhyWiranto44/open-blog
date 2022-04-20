import { useRouter } from "next/router";
import Cookies from "js-cookie";


export default function Navbar() {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("X-OPEN-BLOG-TOKEN");
    router.push("/login");
  }

  return (
    <header>
      <div className="header-content">
        <button type="button" className="btn btn-dark btn-sm" onClick={handleLogout}>
          <span className="ti-arrow-left"></span> Logout
        </button>
        <div className="header-img"></div>
      </div>
    </header>
  );
}
