import { useEffect, useState } from "react";
import { Avatar, Button, Layout, Menu } from "antd";

import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  MessageOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExperimentFilled,
  SignalFilled,
  BookFilled,
  FilePdfFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import { ID } from "../../constants";
import { useAuth } from "../../states/auth";
import { request } from "../../request";

interface DataSourceItemMessage {
  message: string;
  title: string;
  show: boolean;
  user: string;
  _id?: string | undefined;
  values?: string | undefined;
  key?: string | undefined;
}

const ClientLayout = () => {
  const [key, setKey] = useState(location.pathname);
  useEffect(() => {
    setKey(location.pathname);
  }, []);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    getUnAnswermessage();
  }, []);

  async function getUnAnswermessage() {
    try {
      const res = await request.get("messages?whom[in]");
      let data = res?.data?.data;
      setMessage(data);

      data = data.map((ct: DataSourceItemMessage) => {
        ct.key = ct?._id;
        return ct;
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container1">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu
            className="menu "
            theme="dark"
            mode="inline"
            selectedKeys={[key]}
            onClick={({ key }) => {
              setKey(key);
            }}
            items={[
              {
                key: "/experiences",
                icon: <ExperimentFilled />,
                label: <Link to="/client/experiences">Experiences</Link>,
              },
              {
                key: "/skills",
                icon: <SignalFilled />,
                label: <Link to="/client/skills">Skills</Link>,
              },
              {
                key: "/education",
                icon: <BookFilled />,
                label: <Link to="/client/education">Education</Link>,
              },
              {
                key: "/partfolios",
                icon: <FilePdfFilled />,
                label: <Link to="/client/partfolios">Parfolios</Link>,
              },
              {
                key: "/home",
                icon: <FilePdfFilled />,
                label: <Link to="/home">My Portfolios Site</Link>,
              },

              {
                key: "/",
                icon: <LogoutOutlined />,
                label: (
                  <Button
                    type="primary"
                    danger
                    onClick={() => logout(navigate)}
                  >
                    Logout
                  </Button>
                ),
              },
            ]}
          />
        </Sider>
        <Layout>
          <div className="container">
            <Header
              style={{
                padding: 0,
                background: "black",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                className="btn_menu"
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <div className="d-flex justify-content-end  ">
                <Link to="/client/message">
                  <Avatar
                    className="mx-4 "
                    size={36}
                    shape="square"
                    icon={<MessageOutlined />}
                  />
                  <p className="message_num">{message?.length}</p>
                </Link>

                <Link to="/client/information">
                  <Avatar
                    className="mx-4 "
                    size={36}
                    shape="square"
                    icon={<UserOutlined />}
                  />
                </Link>
                <p className=" d-flex userId">User id :{Cookies.get(ID)}</p>

              </div>
            </Header>
          </div>

          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "#323946",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default ClientLayout;
