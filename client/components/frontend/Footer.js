export default function Footer() {
    return (
        <footer className="text-light mt-4 border-top" style={{backgroundColor: "rgb(27, 27, 27)"}}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg">
                        <p className="text-center my-4">Open Source Software, {new Date().getFullYear()}</p>
                        <p className="text-center"><span className="ti-github"></span> <a className="text-light" href="http://github.com/AdhyWiranto44/">Visit github</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}