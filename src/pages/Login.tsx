import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";
import Header from "../components/Header";
import MetaDecorator from "../components/meta";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 3000));
    message.success("Login succesfully !");
    localStorage.setItem("user", values);
    setLoading(false);
    window.location.href = "/profile";
  };

  return (
    <>
      <MetaDecorator
        description={`Login trello website`}
        imageAlt={`Login trello website`}
        imageUrl={"https://miro.medium.com/max/1400/0*zO3ZCv5-5TkLjMNM.jpg"}
        title={"Login trello website"}
      />

      <Header />

      <div className="login">
        <h1 className="login__title">Trello clone application</h1>
        <Row justify="center" align="middle" className="login__main">
          <Col span={12}>
            <img
              src={require("../assets/images/undraw_Scrum_board_re_wk7v.png")}
              alt=""
            />
          </Col>
          <Col span={8}>
            <Form
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="on"
              size="large"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
