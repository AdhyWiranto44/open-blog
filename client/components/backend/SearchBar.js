export default function Searchbar({handleFilter}) {
  return (
    <div className="d-flex bg-white border">
      <input
        class="form-control bg-white border-0"
        type="search"
        placeholder="Search"
        aria-label="Search"
        name="search"
        onChange={(e) => handleFilter(e)}
      />
    </div>
  );
}
