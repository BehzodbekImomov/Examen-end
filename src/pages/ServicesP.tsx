import {  useEffect, useState } from "react";
import { request } from "../request";
import { ID } from "../constants";
import Cookies from "js-cookie";


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


const ServicesP = () => {
  const id = Cookies.get(ID);
  const [exp, setExp] = useState([] as DataSourceItem[]);
  const [loading, setLoading] = useState<boolean>(false);

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


  return (
    <section className="services container" id="services">
      <h2 className="heading">Experiences</h2>

      <div className="services-container">
      {loading?"...Loading":exp.map((i)=>(
  
        <div key={i._id} className="services-box">
          <i className='bx bx-code-alt'></i>
          <h3>{i?.companyName}</h3>
          <h4>{i?.workName}</h4>
          <p>{i?.description}</p>
          <button>Download CV</button>
        </div>
  ))}
        
      
      </div>
    </section>
  );
};

export default ServicesP;
