import React, { useState, useEffect } from "react";
import { getAllCompanies } from "../api/companySnapshot";
import { DataGrid, GridColumnHeaderParams } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const columns = [
  {
    field: "details",
    headerName: "DETAILS",
    width: 100,
    renderHeader: () => (
      <strong className="font-extrabold text-transparent text-[14px] bg-clip-text  bg-orange-400">
        DETAILS
      </strong>
    ),
    renderCell: (params) => {
      return (
        <Link
          className="p-2 rounded-md bg-gray-100 shadow-lg hover:bg-gray-500"
          to={`/companydetails/${params.id}`}
        >
          Details
        </Link>
      );
    },
  },
  {
    field: "usdot",
    sortable: true,
    headerName: "USDOT",
    renderHeader: () => (
      <strong className="font-extrabold text-transparent text-[14px] bg-clip-text bg-gradient-to-r from-orange-400 to-orange-900">
        USDOT
      </strong>
    ),
  },
  {
    field: "legal_name",
    minWidth: 150,
    headerName: "LEGAL NAME",
    flex: 1,
    renderHeader: () => (
      <strong className="font-extrabold text-transparent text-[14px] bg-clip-text bg-gradient-to-r from-orange-400 to-orange-900">
        LEGAL NAME
      </strong>
    ),
  },
  {
    field: "dba_name",
    headerName: "DBA NAME",
    minWidth: 150,
    flex: 1,
    renderHeader: () => (
      <strong className="font-extrabold text-transparent text-[14px] bg-clip-text bg-gradient-to-r from-orange-400 to-orange-900">
        DBA NAME
      </strong>
    ),
  },
  {
    field: "email",
    headerName: "EMAIL",
    minWidth: 150,
    flex: 1,
    renderHeader: () => (
      <strong className="font-extrabold text-transparent text-[14px] bg-clip-text bg-gradient-to-r from-orange-400 to-orange-900">
        EMAIL
      </strong>
    ),
  },
  {
    field: "address",
    minWidth: 150,
    headerName: "ADDRESS",
    flex: 1,
    renderHeader: () => (
      <strong className="font-extrabold text-transparent text-[14px] bg-clip-text bg-gradient-to-r from-orange-400 to-orange-900">
        ADDRESS
      </strong>
    ),
  },
  {
    field: "mcs_150_form_date",
    minWidth: 150,
    headerName: "MCS 150 FORM DATE",
    flex: 1,
    renderHeader: () => (
      <strong className="font-extrabold text-transparent text-[14px] bg-clip-text bg-gradient-to-r from-orange-400 to-orange-900">
        MCS 150 FORM DATE
      </strong>
    ),
  },
  {
    field: "operating_status",
    minWidth: 150,
    headerName: "OPERATING STATUS",
    flex: 1,
    renderHeader: () => (
      <strong className="font-extrabold text-transparent text-[14px] bg-clip-text bg-gradient-to-r from-orange-400 to-orange-900">
        OPERATING STATUS
      </strong>
    ),
  },
];

const AllCompaniesGrid = () => {
  const [allCompanies, setAllCompanies] = useState();
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");

  const fetchAllCompanies = async () => {
    const response = await getAllCompanies();
    if (response) {
      setAllCompanies(response);
      const allRows = response?.map((company) => {
        return {
          id: company?._id,
          usdot: company?.usdot,
          legal_name: company?.legal_name,
          dba_name: company?.dba_name,
          email: company?.email,
          address: company?.address,
          mcs_150_form_date: new Date(
            company?.mcs_150_form_date
          ).toLocaleDateString(),
          operating_status: company?.operating_status,
        };
      });
      setRows(allRows);
    }
  };

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="p-4 rounded-lg flex items-center justify-center">
        <h1 className="font-extrabold text-transparent md:text-2xl lg:text-4xl bg-clip-text bg-gradient-to-r from-orange-400 to-orange-900">{`All Companies`}</h1>
      </div>
      <div className="mx-24 h-[80vh] flex-grow-[1]">
        <DataGrid
          sx={{ fontSize: 14, p: 0, m: 0 }}
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[20]}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />

        {/* <div className="overflow-x-auto">
          <table className="table table-compact w-full rounded-xl shadow-md">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>company</th>
                <th>location</th>
                <th>Last Login</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>Blue</td>
              </tr>
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Zemlak, Daniel and Leannon</td>
                <td>United States</td>
                <td>12/5/2020</td>
                <td>Purple</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Carroll Group</td>
                <td>China</td>
                <td>8/15/2020</td>
                <td>Red</td>
              </tr>
              <tr>
                <th>4</th>
                <td>Marjy Ferencz</td>
                <td>Office Assistant I</td>
                <td>Rowe-Schoen</td>
                <td>Russia</td>
                <td>3/25/2021</td>
                <td>Crimson</td>
              </tr>
              <tr>
                <th>5</th>
                <td>Yancy Tear</td>
                <td>Community Outreach Specialist</td>
                <td>Wyman-Ledner</td>
                <td>Brazil</td>
                <td>5/22/2020</td>
                <td>Indigo</td>
              </tr>
              <tr>
                <th>6</th>
                <td>Irma Vasilik</td>
                <td>Editor</td>
                <td>Wiza, Bins and Emard</td>
                <td>Venezuela</td>
                <td>12/8/2020</td>
                <td>Purple</td>
              </tr>
              <tr>
                <th>7</th>
                <td>Meghann Durtnal</td>
                <td>Staff Accountant IV</td>
                <td>Schuster-Schimmel</td>
                <td>Philippines</td>
                <td>2/17/2021</td>
                <td>Yellow</td>
              </tr>
              <tr>
                <th>8</th>
                <td>Sammy Seston</td>
                <td>Accountant I</td>
                <td>O'Hara, Welch and Keebler</td>
                <td>Indonesia</td>
                <td>5/23/2020</td>
                <td>Crimson</td>
              </tr>
              <tr>
                <th>9</th>
                <td>Lesya Tinham</td>
                <td>Safety Technician IV</td>
                <td>Turner-Kuhlman</td>
                <td>Philippines</td>
                <td>2/21/2021</td>
                <td>Maroon</td>
              </tr>
              <tr>
                <th>10</th>
                <td>Zaneta Tewkesbury</td>
                <td>VP Marketing</td>
                <td>Sauer LLC</td>
                <td>Chad</td>
                <td>6/23/2020</td>
                <td>Green</td>
              </tr>
              <tr>
                <th>11</th>
                <td>Andy Tipple</td>
                <td>Librarian</td>
                <td>Hilpert Group</td>
                <td>Poland</td>
                <td>7/9/2020</td>
                <td>Indigo</td>
              </tr>
              <tr>
                <th>12</th>
                <td>Sophi Biles</td>
                <td>Recruiting Manager</td>
                <td>Gutmann Inc</td>
                <td>Indonesia</td>
                <td>2/12/2021</td>
                <td>Maroon</td>
              </tr>
              <tr>
                <th>13</th>
                <td>Florida Garces</td>
                <td>Web Developer IV</td>
                <td>Gaylord, Pacocha and Baumbach</td>
                <td>Poland</td>
                <td>5/31/2020</td>
                <td>Purple</td>
              </tr>
              <tr>
                <th>14</th>
                <td>Maribeth Popping</td>
                <td>Analyst Programmer</td>
                <td>Deckow-Pouros</td>
                <td>Portugal</td>
                <td>4/27/2021</td>
                <td>Aquamarine</td>
              </tr>
              <tr>
                <th>15</th>
                <td>Moritz Dryburgh</td>
                <td>Dental Hygienist</td>
                <td>Schiller, Cole and Hackett</td>
                <td>Sri Lanka</td>
                <td>8/8/2020</td>
                <td>Crimson</td>
              </tr>
              <tr>
                <th>16</th>
                <td>Reid Semiras</td>
                <td>Teacher</td>
                <td>Sporer, Sipes and Rogahn</td>
                <td>Poland</td>
                <td>7/30/2020</td>
                <td>Green</td>
              </tr>
              <tr>
                <th>17</th>
                <td>Alec Lethby</td>
                <td>Teacher</td>
                <td>Reichel, Glover and Hamill</td>
                <td>China</td>
                <td>2/28/2021</td>
                <td>Khaki</td>
              </tr>
              <tr>
                <th>18</th>
                <td>Aland Wilber</td>
                <td>Quality Control Specialist</td>
                <td>Kshlerin, Rogahn and Swaniawski</td>
                <td>Czech Republic</td>
                <td>9/29/2020</td>
                <td>Purple</td>
              </tr>
              <tr>
                <th>19</th>
                <td>Teddie Duerden</td>
                <td>Staff Accountant III</td>
                <td>Pouros, Ullrich and Windler</td>
                <td>France</td>
                <td>10/27/2020</td>
                <td>Aquamarine</td>
              </tr>
              <tr>
                <th>20</th>
                <td>Lorelei Blackstone</td>
                <td>Data Coordiator</td>
                <td>Witting, Kutch and Greenfelder</td>
                <td>Kazakhstan</td>
                <td>6/3/2020</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default AllCompaniesGrid;
