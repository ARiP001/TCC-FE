import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

const DetailNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    getNoteById();
  }, []);

  const getNoteById = async () => {
    try {
      const response = await axiosInstance.get(`/notes/${id}`);
      setNote(response.data);
    } catch (error) {
      console.error("Error fetching note details:", error);
    }
  };

  if (!note) {
    return <p>Loading note details...</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="title">Note Details</h1>
      <div className="box">
        <p><strong>ID     :</strong> {note.id}</p>
        <p><strong>Owner  :</strong> {note.owner}</p>
        <p><strong>Title  :</strong> {note.title}</p>
        <p><strong>Detail :</strong> {note.detail}</p>
        <p><strong>Tag    :</strong> {note.tag}</p>
      </div>
      <Link to="/notes" className="button is-primary">Back to Notes</Link>
    </div>
  );
};

export default DetailNote;
