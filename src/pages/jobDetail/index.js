import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import { getJobDetail } from "../../services";

export default function Details() {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState({});
  const history = useHistory();
  useEffect(() => {
    getJobDetail(id).then((e) => setData(e?.data));
  }, [id]);
  return (
    <>
      <Navbar />
      <div className="detail">
        <p
          onClick={() => (window.location.href = "/jobs")}
          style={{ cursor: "pointer" }}
        >
          Kembali
        </p>
        <div className="detail-container">
          <p className="detail-type">
            {data?.type} / {data?.location}
          </p>
          <p className="detail-title">{data?.title}</p>
          <div className="detail-wording">
            <p
              className="detail-wording-description"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            />
            <div className="detail-wording-img">
              <div className="detail-wording-img-el">
                <h4 style={{ margin: "8px" }}>How to Apply?</h4>
                <p
                  className="apply"
                  dangerouslySetInnerHTML={{ __html: data?.["how_to_apply"] }}
                ></p>
              </div>
              <div className="detail-wording-img-el">
                <h4 style={{ margin: "8px" }}>Company Profile</h4>
                <img
                  style={{
                    minHeight: "100px",
                    width: "100%",
                    marginBottom: "8px",
                  }}
                  src={data?.["company_logo"]}
                  alt="company logo"
                />
                <a className="apply" href={data?.["company_url"]}>{data?.["company_url"]}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
