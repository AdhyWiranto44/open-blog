import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterPosts } from "../../actions/posts";


export default function MobileSearchBar() {
  const [display, setDisplay] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/") setDisplay("d-none");
  }, []);

  function handleFilter(e) {
    e.preventDefault();
    dispatch(filterPosts(e.target.value));
  }

  return (
    <div className="container">
      <div className="row my-3">
        <div className="col-md-8">
          <form
            action="/"
            method="POST"
            className={[`container-form bg-white rounded shadow ${display}`]}
          >
            <input
              className="form-control bg-white border-0 rounded-right"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="search"
              onChange={handleFilter}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
