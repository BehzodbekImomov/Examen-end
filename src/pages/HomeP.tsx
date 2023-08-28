import { Link } from "react-router-dom";

import "./page.scss";
import { useCallback, useEffect, useState } from "react";
import { request } from "../request";
import ServicesP from "./ServicesP";
import PortfoliosConP from "./PortfoliosConP";
import ContactP from "./ContactP";

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

const HomeP = () => {
 const [user, setUser] = useState<FieldType | null>(null);
//  const [loading, setLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    try {
      // setLoading(true)
      const response = await request.get<FieldType>("auth/me");
      const data = response.data;

      setUser(data);
    } catch (error) {
      console.error(error);
    } finally{
      // setLoading(false)
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
     <section className="home container" id="home">
        <div className="home-content ">
          <h3>Hello, It's Me</h3>
          <h1>{user?.firstName+ " "+user?.lastName}</h1>
          <h3>
            And I'm a <span>Fronted Developer</span>
          </h3>
          <p>
           {user?.info}
          </p>
          <div className="social-media">
            <a href={user?.facebook}>
              <i className="bx bxl-facebook"></i>
            </a>
            <a href={user?.youtube}>
              <i className="bx bxl-twitter"></i>
            </a>
            <a href={user?.telegram}>
              <i className="bx bxl-telegram"></i>
            </a>
            <a href={user?.instagram}>
              <i className="bx bxl-instagram-alt"></i>
            </a>
          </div>
          <a className="btn" href="#">
            Download CV
          </a>
        </div>
        <div className="home-img img-fluid">
          <img src="https://images.unsplash.com/photo-1693000911292-e0902cefb402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="" />
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-img">
          <img src="https://images.unsplash.com/photo-1693000911292-e0902cefb402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="" />
        </div>
        <div className="about-content">
            <h2 className="heading">About <span>Me</span></h2>
            <h3>Frontend Devoloper</h3>
            <p>{user?.info}</p>
            <Link className="btn" to="/about">Read more</Link>
        </div>
      </section>
      <ServicesP/>
      <PortfoliosConP/>
      <ContactP/>
    </>
  );
};

export default HomeP;
