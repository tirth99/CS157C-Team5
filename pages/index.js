import camping from "../public/images/camping_homepage.jpg";
import Image from "next/image";

function Home() {
  return (
    <Image
      style={{ objectFit: "fill" }}
      src={camping}
      alt="Camping Beside The Fire"
      layout="fill"
    />
  );
}
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Home;
