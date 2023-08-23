import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { request } from "../request";

interface InputValues {
  title: string;
  user: string;
  message: string;
  whom: string;
}

const ContactP: React.FC = () => {
  const [inputValue, setInputValue] = useState<InputValues>({
    title: "",
    user: "",
    message: "",
    whom: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInputValue((prevInputValue) => ({ ...prevInputValue, [name]: value }));
  };

  useEffect(() => {
    const postData = async () => {
      try {
        await request.post("message", inputValue);
      } catch (err) {
        console.log(err);
      }
    };

    postData();
  }, [inputValue]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <section className="container contact" id="contact">
      <h2 className="heading">
        Contact <span>Me!</span>
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            value={inputValue.title}
            name="title"
            onChange={handleChange}
            type="text"
            placeholder="Message Name"
          />
          <input
            value={inputValue.user}
            name="user"
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
          />
          <input
            value={inputValue.whom}
            name="whom"
            onChange={handleChange}
            type="text"
            placeholder="User id"
          />
        </div>

        <textarea
          value={inputValue.message}
          name="message"
          onChange={handleChange}
          style={{
            height: "100px",
            width: "100%",
            padding: "1.5rem",
            fontSize: "1.6rem",
            color: "white",
            background: "#323946",
            borderRadius: ".8rem",
            margin: ".7rem 0",
          }}
          className="custom"
          placeholder="Your Message"
          cols={30}
          rows={10}
        ></textarea>
        <button type="submit" value="" className="btn">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactP;