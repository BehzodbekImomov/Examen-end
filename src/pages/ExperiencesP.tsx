import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { request } from "../request";
import Cookies from "js-cookie";

import { ID } from "../constants";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";

interface DataSourceItem {
  companyName: string;
  workName: string;
  description: string;
  startDate: string;
  endDate: string;
  _id?: string | undefined;
  values?: string | undefined;
  key?:string|undefined
}

const ExperiencesP = () => {
  const id = Cookies.get(ID);
  const [exp, setExp] = useState([] as DataSourceItem[]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const columns: ColumnsType<DataSourceItem> = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Work Name",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },

    {
      title: "Actions",
      render: ({ _id }) => (
        <div className="d-grid col-1 gap-2">
          <Button onClick={() => editExp(_id)} type="primary">
            Edit
          </Button>
          <Button danger onClick={() => deleteExp(_id)} type="primary">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const openUserModal = () => {
    showModal();
    setSelected(null);
    form.resetFields();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (): Promise<void> => {
    try {
      const values = await form.validateFields();

      selected
        ? await request.put(`experiences/${selected}`, values)
        : await request.post("experiences", values);

      setIsModalOpen(false);

      getExp();
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
    getExp();
  }, []);

  async function getExp() {
    try {
      setLoading(true);
      const res = await request.get(`experiences?user=${id}`);

      let data = res?.data?.data;

      data = data.map((ct:DataSourceItem) => {
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

  const editExp = async (_id: string) => {
    setSelected(_id);
    try {
      const res = await request.put(`experiences/${_id}`);

      form.setFieldsValue(res?.data);
      showModal();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExp = async (_id: string) => {
    try {
      await request.delete(`experiences/${_id}`);
      message.success("deleted successfully");
      getExp();
    } catch (err) {
      message.error("Error");
    }
  };

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
            <h1 style={{ color: "white" }}>My Experiences</h1>
            <Button type="primary" onClick={openUserModal}>
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
          <Form.Item<DataSourceItem>
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Najot Ta'lim" />
          </Form.Item>

          <Form.Item<DataSourceItem>
            label="Work Name"
            name="workName"
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

          <Form.Item<DataSourceItem>
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Please input your date!" }]}
          >
            <Input placeholder="1999-10-02" />
          </Form.Item>

          <Form.Item<DataSourceItem>
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input placeholder="2023-08-24" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ExperiencesP;
