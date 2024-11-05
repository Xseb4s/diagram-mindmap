/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
// import { Chip } from "@mui/material";
import { DeleteForever, Download, Folder, Refresh } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
// import { Link } from "react-router-dom";
import { ChatbotContext } from "@/context/";
import { ReadInteract } from "../../services/interact.routes";
import { Link } from "react-router-dom";
import { excel } from "../../services/api.routes";

const setIdDataTable = (data) =>
  data.map((row, index) => ({ ...row, id: index + 1 }));

const DataTable = ({ data, onRefresh }) => {
    const {handleOpenModal} = useContext(ChatbotContext);

    const handleClick = (id) => {
      handleOpenModal(id);
    };

    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (event) => {
      const searchTerm = event.target.value.toLowerCase();
      const filteredResults = data.filter((row) =>
        Object.values(row).some(
          (value) =>
            value !== null && value.toString().toLowerCase().includes(searchTerm)
        )
      );
      setSearchTerm(searchTerm);
      setFilteredData(setIdDataTable(filteredResults));
    };
  
    useEffect(() => {
      setFilteredData(setIdDataTable(data));
    }, [data]);

  const columns = [
    {field: "id",headerName: "#",width: 75,},
    {field: "cedula",headerName: "CEDULA",width: 150,},
    {field:"edad",headerName:"EDAD",width:100,},
    {field: "semestre",headerName: "SEMESTRE",width: 150,},
    {field: "programa",headerName: "PROGRAMA",width: 250,},
    {field: "fecha",headerName: "FECHA",width: 115,},
    {
      field: "tipo_busqueda",
      headerName: "BUSQUEDA",
      width: 150,
      renderCell:(params) => {
        return params.row.tipo_busqueda ? params.row.tipo_busqueda : "Nulo"
      }
    
    },
    {
      field: "ACTIONS",
      headerName: "ACCIONES",
      width: 150,
      renderCell: (params) => (
        <div className="flex flex-row justify-between">
             <Link to={`/home/${params.row.fk_mapa_uso}`} target="_blank">
              <button type="button" > <Download className="text-green-700"/> </button>
            </Link>
            <button type="button" onClick={() => handleClick(params.row.id_int)}><DeleteForever className="text-red-600" /></button>
        </div>
      ),
    },
  ];
  
  return (
    <div className="w-full" style={{ height: "80vh" }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={8}>
          <TextField
            id="search"
            label="Buscar"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginBottom: "16px" }}
          />
        </Grid>
        <Grid xs={12} sm={8}>
          <Link to={excel} target="_blank">
            <button type="button" className="text-white bg-green-700 p-2 rounded-md"><Folder/>Exportar Excel</button>
          </Link>
        </Grid>
        <Grid xs={12} sm={8}>
          <button type="button" onClick={onRefresh} className="text-white bg-blue-500 p-2 rounded-md"><Refresh/> Refrescar</button>
        </Grid>
      </Grid>
      <DataGrid
        style={{
          borderRadius: 10,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          border: "0px solid #E5E7EB",
        }}
        rows={filteredData}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
};

function Interactions() {
  const [data, setData] = useState([]);

  const getData = async () => {

    const response = await ReadInteract();
    // console.log(response) 
    
    const { data, error } = response;
    error ? console.log(error) : setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <div className="w-full">

      <div className="flex flex-col items-center justify-center ms-5 mt-5 p-4 rounded-md">
        <h1 className="font-bold text-2xl">Interacciones</h1>
        <DataTable data={data} onRefresh={getData}/>
      </div>
    </div>
    </>
  );
}

export default Interactions;