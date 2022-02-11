import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Navbar from '../components/frontend/Navbar';
import Footer from '../components/frontend/Footer';
import Posts from '../components/frontend/Posts';
import MobileSearchBar from '../components/frontend/MobileSearchBar';

export default function Home() {
    return (
        <div class='bg-light'>
            <Head>
                <meta name="description" content="Open Blog: an open source blogging app for everyone." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css" />
                <title>Open Blog: an open source blogging app for everyone.</title>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js" integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF" crossorigin="anonymous"></script>
                <script src="/js/script.js"></script>
            </Head>
            <Navbar />
            <MobileSearchBar />
            <Posts />
            <Footer />
        </div>
    )
}
