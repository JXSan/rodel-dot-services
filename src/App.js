import "./App.css";
import Sidebar from "./components/Sidebar";
import Search from "./pages/Search";
import { Routes, Route } from "react-router-dom";
import AllCompanies from "./pages/AllCompanies";
import CurrentlyDue from "./pages/CurrentlyDue";
import PastDue from "./pages/PastDue";
import { Sales } from "./pages/Sales";

const styles = {
  wrapper: "w-screen h-screen",
  leftSideWrapper: "w-64 flex h-full",
  rightSideWrapper: "w-full",
};

function App() {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-80 flex h-full bg-red-600">
        <Sidebar />
      </div>
      <div className="w-full h-full items-center justify-center flex flex-col bg-slate-50">
        <Routes>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/currentlyDue" element={<CurrentlyDue />}></Route>
          <Route path="/pastDue" element={<PastDue />}></Route>
          <Route path="/sales" element={<Sales />}></Route>
          <Route path="/allcompanies" element={<AllCompanies />}></Route>
          <Route path="*" element={<h1>Page Not Found</h1>}></Route>
          <Route path="/" element={<Search />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
