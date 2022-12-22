// eslint-disable
import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  TextField,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar";
import { getJobs } from "../../services";

export default function JobsList() {
  const [params, setParams] = useState({ ["full_time"]: false });
  const [toggle, setToggle] = useState(false);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const handleChange = (ev) => {
    setParams({ ...params, [ev.target.name]: ev.target.value });
  };
  useEffect(() => {
    getJobs(params).then((e) => {
      if (
        params?.["full_time"] === true ||
        params?.description ||
        params?.location
      )
        setIsSearching(true);
      else if (
        params?.["full_time"] === false &&
        !params?.description &&
        !params?.location
      )
        setIsSearching(false);

      setLists(e.data);
      setLoading(false);
    });
  }, [toggle]);

  return (
    <>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Navbar />
      <div className="list-container">
        {/* Search Section */}
        <div className="list-search-container">
          {search.map((itm, idx) => {
            return (
              <div key={idx} style={{ display: "block", padding: "0 8px" }}>
                <p style={{ margin: "4px" }}>{itm.text}</p>
                <TextField size="small" fullWidth onChange={handleChange} name={itm.name} />
              </div>
            );
          })}
          <div style={{ display: "inline-flex", alignItems: "center" }}>
            <Checkbox
              onChange={() =>
                setParams({ ...params, ["full_time"]: !params["full_time"] })
              }
              checked={params["full_time"] === true}
            />
            <p style={{ margin: 0 }}>Full Time Only</p>
          </div>
          <Button
            sx={{
              textTransform: "none",
              background: "#393E46",
              color: "white",
              alignSelf: "center",
              padding: "8px 24px",
              "&:hover": {
                background: "#222831",
              },
            }}
            onClick={() => {
              setLoading(true);
              setToggle(!toggle);
            }}
          >
            Search
          </Button>
        </div>

        {/*End  Search Section */}
        {/*========================== */}

      </div>
      {/*list Section */}

      <div className="list-list">
        <h3 className="list-list-title">
          {isSearching ? `Showing ${lists.length} Job(s)` : "Jobs Lists"}
        </h3>
        {lists?.map((itm, idx) => {
          return (
            <div
              key={idx}
              className="list-list-el"
              onClick={() => (window.location.href = `/jobs/${itm.id}`)}
            >
              <div className="list-list-el-left">
                <p className="list-list-el-left-up">{itm?.title}</p>
                <p className="list-list-el-left-down">
                  {itm?.company} -{" "}
                  <strong style={{ color: "green" }}>{itm?.type}</strong>
                </p>
              </div>
              <div className="list-list-el-right">
                <p className="list-list-el-right-up">{itm?.location}</p>
                <p className="list-list-el-right-down">
                  {moment(
                    `${moment(itm?.created_at).format("YYYYMMDD")}`,
                    "YYYYMMDD"
                  ).fromNow()}
                  - {itm?.type}
                </p>
              </div>
            </div>
          );
        })}
        {lists.length <= 0 && (
          <p style={{ textAlign: "center" }}>data kosong</p>
        )}
      </div>
    </>
  );
}

const search = [
  { text: "Job Description", name: "description" },
  { text: "Location", name: "location" },
];
