import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [searchOwner, setSearchOwner] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes");
      setNotes(response.data);
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching notes:", error);
      if (error.response) {
        if (error.response.status === 403) {
          setError("You don't have permission to access these notes. Please try logging in again.");
          // Clear token and redirect to login after a short delay
          localStorage.removeItem('token');
          setTimeout(() => navigate('/'), 2000);
        } else {
          setError("An error occurred while fetching notes. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  const searchNotes = async () => {
    if (searchOwner.trim() === "") {
      getNotes(); // If search is empty, reload all notes
      return;
    }
    try {
      const response = await axiosInstance.get(`/notes/search/${searchOwner}`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error searching notes:", error);
      setNotes([]); // Clear results if no matches found
    }
  };

  const deleteNote = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;
  
    try {
      await axiosInstance.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id)); // Remove deleted note from UI
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="is-flex is-justify-content-flex-end mb-4">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('userId');
              navigate('/');
            }}
            className="button is-danger"
          >
            Logout
          </button>
        </div>
        {error && (
          <div className="notification is-danger">
            {error}
          </div>
        )}
        <Link to="add" className="button is-success mb-3">Add New Note</Link>
        <div className="field mt-3">
          <label className="label">Search by Owner</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={searchOwner}
              onChange={(e) => setSearchOwner(e.target.value)}
              placeholder="Enter owner's name"
            />
          </div>
          <button onClick={searchNotes} className="button is-primary mt-2">
            Search
          </button>
        </div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={note.id}>
                <td>{index + 1}</td>
                <td>{note.title}</td>
                <td>{note.owner}</td>
                <td>
                  <Link to={`edit/${note.id}`} className="button is-small is-info mr-2">Edit</Link>
                  <button onClick={() => deleteNote(note.id)} className="button is-small is-danger">Delete</button>
                  <Link to={`detail/${note.id}`} className="button is-small is-primary ml-2">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoteList;