import React from "react";
import ApiRoutes from "../util/APIConfig";
import axios from "axios";
import dynamic from "next/dynamic";

const { GET_CURRENT_USER_URL } = ApiRoutes;
const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/common/Profile"),
  { ssr: false }
);

const Profile = ({ data }) => {
  return (
    <div style={{ background: "white" }}>
      <div className="profile__center">
        <div style={{ width: "50vw" }}>
          <DynamicComponentWithNoSSR user={data} />
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  var position;
  context.req.rawHeaders.map((cookie, index) => {
    if (cookie.indexOf("username") != -1) {
      position = index;
    }
  });
  var startIndex = context.req.rawHeaders[position].indexOf("username=") + 9
  const username = context.req.rawHeaders[position].substring(startIndex)
  console.log(username)

  const res = await axios.get(GET_CURRENT_USER_URL + username);
  return { props: { data: res.data.user } };
}

export default Profile;
