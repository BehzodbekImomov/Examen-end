import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { request } from "../request";
import Cookies from "js-cookie";

import { ID } from "../constants";
interface DataSourceItem {
    name: string;
    url: string;
    photo: string;
    description: string;
    _id?: string | undefined;
    values?: string | undefined;
    key?: string | undefined;
  }
const PortfoliosConP = () => {
    const id = Cookies.get(ID);
    const [exp, setExp] = useState([] as DataSourceItem[]);

    useEffect(() => {
        getPort();
      }, []);
    
      async function getPort() {
        try {
    
          const res = await request.get(`portfolios?user=${id}`);
    
          let data = res?.data?.data;
    
          data = data.map((ct: DataSourceItem) => {
            ct.key = ct?._id;
            return ct;
          });
          setExp(data);
        } catch (err) {
          console.log(err);
        } 
      }

  return (
   <section className="portfolio container" id="partfolio">
    <h2 className="heading">Lates <span>Project</span></h2>
    <div className="portfolio-container">

        {exp.map((i)=>(

        <div key={i?._id} className="portfolio-box">
            <img src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" alt="" />
            <div className="porfolio-layer">
                <h4>{i?.name}</h4>
                <p>{i?.description}</p>
                <Link to={i?.url}><i className='bx bx-link-external' ></i></Link>
            </div>
        </div>

        ))}
        
        
        
      
    </div>
   </section>
  )
}

export default PortfoliosConP