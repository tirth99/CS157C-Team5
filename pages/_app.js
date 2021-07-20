import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store";
import Helmet from "react-helmet";
import "antd/dist/antd.css";
import { Layout } from "antd";
import HeaderComponent from "../components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Helmet>
        <title>California State Park</title>
      </Helmet>
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
        integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc"
        crossOrigin="anonymous"
      />
      <Layout style={{ height: "100%" }}>
        <HeaderComponent />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
