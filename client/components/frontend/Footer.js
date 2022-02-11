export default function Footer() {
    return (
        <footer class="text-light mt-4 border-top" style={{backgroundColor: "rgb(27, 27, 27)"}}>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg">
                        <p class="text-center my-4">Open Source Software, {new Date().getFullYear()}</p>
                        <p class="text-center"><span class="ti-github"></span> <a class="text-light" href="http://github.com/AdhyWiranto44/">Visit github</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}