import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Button, Col, Form, Input, Row, Tabs, Upload, message } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { request } from "../request";
import { useForm } from "antd/es/form/Form";
import { IMG_URL } from "../constants";
import { setAuthCookies } from "../utils/setAuthCookies";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
const { TextArea } = Input;
const { TabPane } = Tabs;
interface TabItem {
  label: string;
  key: string;
  children: React.ReactNode;
}

type ImageUploadFile = UploadFile<File>;
const InformationP: React.FC = () => {
  const items: TabItem[] = [
    {
      label: "Information",
      key: "info",
      children: <Info />,
    },
    {
      label: "Password",
      key: "pass",
      children: <Pass />,
    },
  ];

  return (
    <Tabs className="tabs" defaultActiveKey="info" centered>
      {items.map((item) => (
        <TabPane key={item.key} tab={item.label}>
          {item.children}
        </TabPane>
      ))}
    </Tabs>
  );
};

type FieldType = {
  username?: string | undefined;
  password?: string | undefined;
  lastName?: string | undefined;
  firstName?: string | undefined;
  address?: string | undefined;
  phoneNumber?: string | undefined;
  info?: string | undefined;
  telegram?: string | undefined;
  instagram?: string | undefined;
  youtoube?: string | undefined;
  github?: string | undefined;
  email?: string | undefined;
  facebook?: string | undefined;
  youtube?: string | undefined;
  birthday?: string | undefined;
  fields?: string | undefined;
  photo?: string | undefined;
  file?: string | undefined;
};

const Info: React.FC = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await request.get<FieldType>("auth/me", {});
      const data = response.data;

      form.setFieldsValue(data);
      setImageUrl(data.photo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onFinish = async (values: FieldType) => {
    try {
      setLoading(true);
      await request.put("auth/updatedetails", values);
      message.success("Edited succesfull!");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (
    e: UploadChangeParam<ImageUploadFile>
  ): Promise<void> => {
    try {
      setImgLoading(true);
      const form = new FormData();
      const file: RcFile | undefined = e?.file?.originFileObj;
      const fieldValue = file ?? "";
      form.append("file", fieldValue);
      await request.post("auth/upload", form);
    } catch (err) {
      console.log(err);
    } finally {
      setImgLoading(false);
    }
  };
  return (
    <Row>
      <Col lg={8}>
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              className="uploadImg"
              src={IMG_URL + imageUrl}
              alt="avatar"
              style={{ width: "100%" }}
            />
          ) : (
            <div>
              {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Col>
      <Col lg={16}>
        {loading ? (
          "...Loading"
        ) : (
          <Form
            form={form}
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: 1000 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="formInfo"
          >
            <Form.Item<FieldType>
              label="First name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Lastname"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Birthday"
              name="birthday"
              rules={[
                { required: true, message: "Please input your birthday!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Facebook"
              name="facebook"
              rules={[
                {
                  required: true,
                  message: "Please enter your facebook account!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Github"
              name="github"
              rules={[
                {
                  required: true,
                  message: "Please enter your github account!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Instagram"
              name="instagram"
              rules={[
                {
                  required: true,
                  message: "Please enter your instagram account!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Telegram"
              name="telegram"
              rules={[
                {
                  required: true,
                  message: "Please enter your telegram account!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="You tube"
              name="youtube"
              rules={[
                {
                  required: true,
                  message: "Please enter your you toube account!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Phone number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Info"
              name="info"
              rules={[{ required: true, message: "Please input your info!" }]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item<FieldType>
              label="Fields"
              name="fields"
              rules={[{ required: true, message: "Please input your fields!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item >
              <Button  loading={loading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Col>
    </Row>
  );
};

interface FormValues {
  currentPassword: string;
  newPassword: string;
}

const Pass = () => {
  const [form] = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const submit = async (values: FormValues) => {
    try {
      setLoading(true);
      const { data } = await request.put("auth/updatepassword", values);
      setAuthCookies(data);
      message.success("Changed successfully!");
      form.resetFields();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        message.error(err.response?.data?.message);
      } else {
        throw err;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form 
      form={form}
      layout="vertical"
      autoComplete="off"
      className="formInfo"
      onFinish={submit}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: "Please fill this field!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="currentPassword"
        label="Current Password"
        rules={[
          {
            required: true,
            message: "Please fill this field!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="New password"
        rules={[
          {
            required: true,
            message: "Please fill this field!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} htmlType="submit" type="primary">
          Change password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InformationP;
