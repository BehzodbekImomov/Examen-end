import { Tabs, Spin } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useState, useEffect } from "react";
import { request } from "../request";

interface TabItem {
  label: string;
  key: string;
  children: React.ReactNode;
}

interface Whom {
  lastName?: string;
  firstName?: string;
}

interface DataSourceItemMessage {
  message?: string;
  title?: string;
  show?: boolean;
  user?: string;
  _id?: string | undefined;
  values?: string | undefined;
  key?: string | undefined;
  whom?: Whom;
  answer?: string;
}

const MessagesP: React.FC = () => {
  const items: TabItem[] = [
    {
      label: "Answered",
      key: "answered",
      children: <Answer />,
    },
    {
      label: "Unanswered",
      key: "unanswered",
      children: <UnAnswer />,
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

const Answer: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [answerMessage, setAnswerMessage] = useState<DataSourceItemMessage[]>([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await request.get("messages?answer[gt]");
      let data = res?.data?.data;
      console.log(data);

      setAnswerMessage(data);
      setLoading(false);

      data = data.map((ct: DataSourceItemMessage) => {
        ct.key = ct?._id;
        return ct;
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div className="unanswer">
          {answerMessage.map((e) => (
            <div key={e._id} className="box">
              <h3>{e?.whom?.lastName} {e?.whom?.firstName}</h3>
              <span>{e?.user}</span>
              <p>{e?.title}</p>
              <span>{e?.message}</span>
              <h4 className="text-danger">Answer:<span className="text">{e?.answer}</span></h4>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const UnAnswer: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [unAnswerMessage, setUnAnswerMessage] = useState<DataSourceItemMessage[]>([]);

  useEffect(() => {
    getUnData();
  }, []);

  async function getUnData() {
    try {
      const res = await request.get("messages?answer");
      let data = res?.data?.data;

      setUnAnswerMessage(data);
      setLoading(false);

      data = data.map((ct: DataSourceItemMessage) => {
        ct.key = ct?._id;
        return ct;
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div className="unanswer">
          {unAnswerMessage.map((e: DataSourceItemMessage) => (
            <div key={e._id} className="box">
              <h3>{e?.whom?.lastName} {e?.whom?.firstName}</h3>
              <span>{e?.user}</span>
              <p>{e?.title}</p>
              <span>{e?.message}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MessagesP;