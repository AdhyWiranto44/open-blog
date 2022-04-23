import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/auth/Navbar";
import Footer from "../components/frontend/Footer";
import { register as registerUser } from "../api/users";
import { useRouter } from 'next/router';

export default function register() {
  const [confPassDis, setConfPassDis] = useState("d-none");
  const [formInput, setFormInput] = useState({
    "username": "",
    "password": "",
    "confirm_password": ""
  });
  const router = useRouter();

  const handleRegistration = async (e) => {
    e.preventDefault();
    
    registerUser(formInput).then((res) => {
      alert("Registration success");
      router.push("/login");
    }).catch(err => {
      alert(err.response.data.message);
    });
  }

  useEffect(() => {
    if (formInput.password !== formInput.confirm_password) {
      setConfPassDis("");
    } else {
      setConfPassDis("d-none");
    }
  });

  return (
    <div className="bg-light">
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossorigin="anonymous"
        />
        <link rel="stylesheet" href="../css/styles.css" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossorigin="anonymous"
        />

        <title>Open Blog: an open source blogging app for everyone.</title>
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
          integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"
          integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF"
          crossorigin="anonymous"
        ></script>
      </Head>
      <Navbar />
      <div class="row mt-5">
        <div class="col-lg-4 col-md-6 offset-lg-4 offset-md-3">
          <div class="card p-3 mb-3 bg-transparent border-0">
            <div class="card-body">
              <h4 class="card-title font-weight-bold text-center mb-5">
                Register
              </h4>
              <form action="/register" method="POST" class="text-center" onSubmit={(e) => handleRegistration(e)}>
                <div class="form-group">
                  <input
                    type="username"
                    class="form-control bg-white"
                    id="username"
                    name="username"
                    placeholder="username"
                    autofocus
                    onChange={(e) => setFormInput({...formInput, "username": e.target.value})}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control bg-white"
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setFormInput({...formInput, "password": e.target.value})}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control bg-white"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="confirm password"
                    onChange={(e) => setFormInput({...formInput, "confirm_password": e.target.value})}
                  />
                  <span className={`text-danger ${confPassDis}`}>Konfirmasi Password tidak sama dengan password !</span>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary w-100 my-3 font-weight-bold"
                >
                  Register
                </button>
                <small>
                  Sudah punya akun?
                  <Link href="/login">
                    <a class="text-primary"> Login</a>
                  </Link>
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
