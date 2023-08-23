import { Progress, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { request } from "../request";
import { ID } from "../constants";
import Cookies from "js-cookie";

interface DataSourceItem {
  name: string;
  percent: string;
  _id?: string;
  values?: string;
}

interface FieldType {
  username?: string;
  password?: string;
  lastName?: string;
  firstName?: string;
  address?: string;
  phoneNumber?: string;
  info?: string;
  telegram?: string;
  instagram?: string;
  youtube?: string;
  github?: string;
  email?: string;
  facebook?: string;
  birthday?: string;
  fields?: string;
  photo?: string;
  file?: string;
}

const AboutP: React.FC = () => {
  const [user, setUser] = useState<FieldType | null>(null);
  const [skills, setSkills] = useState<DataSourceItem[]>([]);

  const getData = useCallback(async () => {
    try {
      const response = await request.get<FieldType>("auth/me");
      const data = response.data;
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getSkills();
  }, []);

  const id = Cookies.get(ID);

  async function getSkills() {
    try {
      const res = await request.get(`skills?user=${id}`);
      const data = res?.data?.data;
      if (data) {
        data.forEach((ct: DataSourceItem) => {
          ct.key = ct._id;
        });
        setSkills(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <div className="about-contents">
        <div className="img-section">
          <img src="/public/user.jpg" alt="" />
        </div>

        <div className="info-section">
          <h1>About me</h1>
          <h2>Professional web Designer</h2>
          <p>{user?.info}</p>
          <div className="personal-info">
            <div>
              <span>Name:</span>{" "}
              <span>
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <div>
              <span>Age:</span> <span>{user?.birthday}</span>
            </div>
            <div>
              <span>Email:</span> <span>{user?.email}</span>
            </div>
            <div>
              <span>Address:</span> <span>{user?.address}</span>
            </div>
          </div>
          <div className="button">
            <button>Download CV</button>
          </div>
        </div>

        <div className="skillsSection">
          {skills.map((e) => (
            <div key={e._id} className="skill">
              <div className="subject">{e.name}</div>
              <Space style={{ marginLeft: "230px", marginTop: "30px" }}>
                <Progress
                  className="progres"
                  type="circle"
                  percent={parseFloat(e.percent)}
                  strokeColor={{ "0%": "#108ee9", "100%": "#0ef" }}
                />
              </Space>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutP;