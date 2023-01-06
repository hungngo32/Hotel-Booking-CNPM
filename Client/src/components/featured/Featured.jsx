import useFetch from "../../hooks/useFetch";
import "./featured.css";
import React from "react";
const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/get/countByCity?cities=Gia Lai,Da Nang,Ha Noi"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://apecgroup.net/upload/news/ymaf_2020-02-13-xu-huong-nhuong-quyen-khach-san-tai-viet-nam-len-ngoidocx-1581570047724.jpeg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Gia Lai</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Da Nang</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ha Noi</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;