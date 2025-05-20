import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [tag, setTag] = useState("main");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getNoteById();
  }, []);

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`/notes/${id}`, {
        owner,
        title,
        detail,
        tag,
      });
      navigate("/notes");
    } catch (error) {
      console.log(error);
    }
  };

  const getNoteById = async () => {
    try {
      const response = await axiosInstance.get(`/notes/${id}`);
      setOwner(response.data.owner);
      setTitle(response.data.title);
      setDetail(response.data.detail);
      setTag(response.data.tag);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateNote}>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
