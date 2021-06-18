import React, { useContext, useState } from "react";
import "./Write.css";
import AddIcon from "@material-ui/icons/Add";
import { Context } from "../../contexts/Context";
import axios from "axios";

function Write() {
  const [Data, setData] = useState({
    title: "",
    desc: "",
  });
  const [file, setfile] = useState();
  const { user } = useContext(Context);

  const inputhandler = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const Submitt = async (e) => {
    e.preventDefault();
    const newPost = {
      title: Data.title,
      username: user.username,
      desc: Data.desc,
    };

    if (file) {
      const data = new FormData();
      const filename = "post_"+Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {}
      try {
        const res = await axios.post("/posts", newPost);
        window.location.replace("/post/" + res.data._id);
      } catch (error) {}
    }
  };
  return (
    <>
      <div className="Write">
        {file && (
          <img src={URL.createObjectURL(file)} alt="" className="Writeimg" />
        )}

        <form className="WriteForm" onSubmit={Submitt}>
          <div className="WriteFormGroup">
            <label htmlFor="fileinput">
              <AddIcon className="WriteIcon" />
            </label>
            <input
              type="file"
              id="fileinput"
              style={{ display: "none" }}
              onChange={(e) => setfile(e.target.files[0])}
            />
            <input
              type="text"
              className="Writeinput"
              placeholder="Title"
              name="title"
              onChange={inputhandler}
              value={Data.title}
            />
          </div>
          <div className="WriteFormGroup">
            <textarea
              placeholder="Tell Your Story Here.........."
              className="Writeinput Textinput"
              name="desc"
              onChange={inputhandler}
              value={Data.desc}
            ></textarea>
          </div>

          <button type="submit" className="WriteSubmit">
            Publish
          </button>
        </form>
      </div>
    </>
  );
}

export default Write;
