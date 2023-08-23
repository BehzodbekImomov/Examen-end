import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { request } from "../request";
import Cookies from "js-cookie";

import { ID } from "../constants";
import { useForm } from "antd/es/form/Form";

interface DataSourceItem {
  name: string;
  percent: string;
  _id?: string | undefined;
  values?: string | undefined;
  key?:string|undefined
}

const SkillsP = () => {
  const id = Cookies.get(ID);
  const [exp, setExp] = useState([] as DataSourceItem[]);
  const [selected, setSelected] = useState<string | null>(null);
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
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
    },
    

    {
      title: "Actions",
      render: ({ _id }) => (
        <div className="d-grid col-1 gap-2">
          <Button onClick={() => editSkills(_id)} type="primary">
            Edit
          </Button>
          <Button danger onClick={() => deleteSkills(_id)} type="primary">
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
        ? await request.put(`skills/${selected}`, values)
        : await request.post("skills", values);

      setIsModalOpen(false);

      getSkills();
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
    getSkills();
  }, []);

  async function getSkills() {
    try {
      setLoading(true);
      const res = await request.get(`skills?user=${id}`);

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

  const editSkills = async (_id: string) => {
    setSelected(_id);
    try {
      const res = await request.put(`skills/${_id}`);

      form.setFieldsValue(res?.data);
      showModal();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSkills = async (_id: string) => {
    try {
      await request.delete(`skills/${_id}`);
      message.success("deleted successfully");
      getSkills();
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
            <h1 style={{ color: "white" }}>My Skills</h1>
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
        okText={selected ? "Save skills" : "Add"}
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
            label=" Name"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="React js" />
          </Form.Item>

          <Form.Item<DataSourceItem>
            label="Percent"
            name="percent"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input placeholder="80" />
          </Form.Item>

         
        </Form>
      </Modal>
    </>
  );
};

export default SkillsP;
