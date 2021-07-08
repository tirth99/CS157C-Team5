import Head from "next/head";
import styles from "../styles/Home.module.css";
import Login from "../components/UserManagemnet/Login";
import camp from "../public/images/homepage.png";
import Image from 'next/image'

function Home() {
  return <Image src={camp} alt="" height={280}/>;
}
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Home;
