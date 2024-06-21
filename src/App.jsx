import "./App.css";
import { AgGridReact, useGridFilter } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import axios from "axios";
const defaultColDef = {
  filter: true,
  sortable: true,
  editable: true,
  filter:true,
  floatingFilter:true,
  pagination:true
};
function App() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    body: "",
    postId: "",
  });

  const [column, setColumns] = useState([
    { field: "id", headerName: "Serial Number" },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "body", headerName: "Body" },
    { field: "postId", headerName: "Post-Id" },
  ]);
let gridData;
  const onGridReady = (params) => {
    gridData=params.api;
    fetch("https://6655d96a3c1d3b60293b564f.mockapi.io/ishanag_grid")
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        gridData.applyTransaction({ add: result });
      });
  };

  const onchange = (e) => {
    setFormData((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("https://6655d96a3c1d3b60293b564f.mockapi.io/ishanag_grid", {
        // id: formData.id,
        name: formData.name,
        email: formData.email,
        body: formData.body,
        id: formData.id,
        postId: formData.postId,
      })
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log("something went wrong"));

    setFormData({
      // id: "",
      name: "",
      email: "",
      body: "",
      postId: "",
    });
  };
  //
const downloadClick=()=>{
  gridData.exportDataAsCsv()
}
  return (
    <div className="ag-theme-quartz-dark " style={{ height: "500px" }}>
      <h1>Raect with Ag-Grid</h1>
      <button onClick={downloadClick}>DownLoad/Export</button>
      <br/><br/>
      <AgGridReact
        // rowData={rowData}
        onGridReady={onGridReady}
        columnDefs={column}
        defaultColDef={defaultColDef}
      />
      <br />
      <br />
      <fieldset>
        <legend>My-Form</legend>
        
        <form onSubmit={submitHandler}>
          {/* <label className="ullu">Id : </label>
          <input
            type="number"
            name="id"
            placeholder="Enter Id..."
            value={formData.id}
            onChange={onchange}
          />
          <br />
          <br /> */}
          <label>Name : </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name..."
            value={formData.name}
            onChange={onchange}
          />
          <br />
          <br />
          <label>Email : </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email..."
            value={formData.email}
            onChange={onchange}
          />
          <br />
          <br />
          <label>Body : </label>
          <input
            type="text"
            name="body"
            placeholder="Enter Body..."
            value={formData.body}
            onChange={onchange}
          />
          <br />
          <br />
          <label>Post-Id : </label>
          <input
            type="number"
            name="postId"
            placeholder="Enter P-Id..."
            value={formData.postId}
            onChange={onchange}
          />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </fieldset>
    </div>
  );
}

export default App;
