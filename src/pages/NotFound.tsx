import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MetaDecorator from "../components/meta";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <MetaDecorator
        description={`Sorry, this page doesn't exist !`}
        imageAlt={`Sorry, this page doesn't exist !`}
        imageUrl={
          "https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-page-templates.jpg"
        }
        title={"Sorry, this page doesn't exist !"}
      />

      <Header />
      <div
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Result
          status="404"
          title="404"
          subTitle="Sorry, this page doesn't exist !"
          extra={
            <Button type="primary" onClick={() => navigate("/")}>
              Back to home page
            </Button>
          }
        />
      </div>
    </>
  );
};

export default NotFound;
