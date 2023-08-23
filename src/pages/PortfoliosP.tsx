import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Table,
  Upload,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { request } from "../request";
import Cookies from "js-cookie";

import { ID } from "../constants";
import { useForm } from "antd/es/form/Form";
// import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { getImage } from "../utils/getImage";
import TextArea from "antd/es/input/TextArea";
import { AnyObject } from "antd/es/_util/type";

interface DataSourceItem {
  name: string;
  url: string;
  photo: {_id:string,name:string};
  description: string;
  _id?: string | undefined;
  values?: string | undefined;
  key?: string | undefined;
}
interface Photo {
  _id: string; 
  name:string
}

const PortfoliosP = () => {
  const id = Cookies.get(ID);
  const [exp, setExp] = useState([] as DataSourceItem[]);
  const [selected, setSelected] = useState<string | null>(null);
  const [photo, setPhoto] = useState<Photo|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const columns: ColumnsType<DataSourceItem> = [
    {
      title: " Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      render: (photo) => <Image height={50} src={getImage(photo)} />,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Actions",
      render: ({ _id }) => (
        <div className="d-grid col-1 gap-2">
          <Button onClick={() => editPort(_id)} type="primary">
            Edit
          </Button>
          <Button danger onClick={() => deletePort(_id)} type="primary">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const addCategory = () => {
    setSelected(null);
    form.resetFields();
    setPhoto(null);
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      values.photo = (photo as Photo)?._id;
      console.log(values);

      if (selected) {
        await request.put(`portfolios/${selected}`, values);
      } else {
        await request.post("portfolios", values);
      }

      setIsModalOpen(false);

      getPort();
    } catch (err) {
      if (typeof err === "string") {
        message.error(err.toUpperCase());
      } else if (err instanceof Error) {
        message.error(err.message);
      } else {
        console.log(err);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getPort();
  }, []);

  async function getPort() {
    try {
      setLoading(true);

      const res = await request.get(`portfolios?user=${id}`);

      let data = res?.data?.data;

      data = data.map((ct: DataSourceItem) => {
        ct.key = ct?._id;
        return ct;
      });
      setExp(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const editPort = async (_id: string) => {
    setSelected(_id);
    try {
      const { data } = await request.put(`portfolios/${_id}`);
      console.log(data);

      setPhoto(data?.photo);
      form.setFieldsValue(data);
      showModal();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePort = async (_id: string) => {
    try {
      await request.delete(`portfolios/${_id}`);
      message.success("deleted successfully");
      getPort();
    } catch (err) {
      message.error("Error");
    }
  };

  const handleChange = async (e:AnyObject) => {
    try {
      const formData = new FormData();
      formData.append("file", e.file.originFileObj);
      const { data } = await request.post("upload", formData);
      setPhoto(data);
    } catch (err) {
      console.log(err);
    }
  };

  const beforeUpload = () => {};

  return (
    <>
      <Table
        title={() => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1 style={{ color: "white" }}>My Portfolios</h1>
            <Button type="primary" onClick={addCategory}>
              Add
            </Button>
          </div>
        )}
        loading={loading}
        dataSource={exp}
        columns={columns}
        style={{ marginTop: "100px" }}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        okText={selected ? "Save experiences" : "Add"}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.Item<DataSourceItem>>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {photo ? (
                <img
                  src={getImage(photo)}
                  alt="avatar"
                  style={{ height: "100%" }}
                />
              ) : (
                <div>
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item<DataSourceItem>
            label=" Name"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Najot Ta'lim" />
          </Form.Item>

          <Form.Item<DataSourceItem>
            label="Url"
            name="url"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input placeholder="Devoloper" />
          </Form.Item>

          <Form.Item<DataSourceItem>
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input your Info!" }]}
          >
            <TextArea placeholder="Info" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PortfoliosP;
