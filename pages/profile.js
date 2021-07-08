import ApiRoutes from '../util/APIConfig'
import React, { useEffect, useState } from "react";
import UserProfile from "../components/common/Profile";
import axios from "axios";
import jwt_decode from "jwt-decode";
import dynamic from 'next/dynamic'
const { GET_CURRENT_USER } = ApiRoutes


const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/common/Profile'),
  { ssr: false }
)

// send data to profile Component
const Profile = ({ data }) => {
  return (
    <div className="profile__center">
      <div style={{ width: "50vw" }}>
        <DynamicComponentWithNoSSR user={data} /> 
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const username = context.req.rawHeaders[29].substring(context.req.rawHeaders[29].search("username=") + 9  ) //get data from cookie
  const res = await axios
    .get(GET_CURRENT_USER + username)
    return { props: { data : res.data.user} }
}

export default Profile;
