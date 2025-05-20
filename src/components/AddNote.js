import { useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();

  const saveNote = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/notes", {
        owner,
        title,
        detail,
        tag,
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token').accessToken}`
        }
      });
      navigate("/notes");
    } catch (error) {
      console.log(error);
      console.log("masuk catch addnote");
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveNote}>
          <div className="field">
            <label className="label">Owner</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="Owner"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Detail</label>
            <div className="control">
              <textarea
                className="textarea"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Detail"
              />
            </div>
          </div>
          <div className="field">
          <label className="label">Tag</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select value={tag} onChange={(e) => setTag(e.target.value)}>
                  <option value="main">Main</option>
                  <option value="tugas">Tugas</option>
                  <option value="casual">Casual</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
