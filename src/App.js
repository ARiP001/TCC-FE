import {BrowserRouter, Routes, Route} from "react-router-dom";
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import EditNote from "./Components/EditNote";
import DetailNote from "./Components/DetailNote";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/notes" element={
          <PrivateRoute>
            <NoteList/>
          </PrivateRoute>
        }/>
        <Route path="/notes/add" element={
          <PrivateRoute>
            <AddNote/>
          </PrivateRoute>
        }/>
        <Route path="/notes/edit/:id" element={
          <PrivateRoute>
            <EditNote/>
          </PrivateRoute>
        }/>
        <Route path="/notes/detail/:id" element={
          <PrivateRoute>
            <DetailNote/>
          </PrivateRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;