import React, { useEffect, useState } from "react";
import "../DisplayText/DisplayText.css";

export const DisplayText = () => {
  const [data, setData] = useState([]);
  const url = `https://backend-code-mancers.herokuapp.com/post`;

  const getData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log("30", res);
        setData(res.reverse());
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2 className="Heading">Inbox</h2>
      <div className="Container">
        {data.map((d) => (
          <div className="PostContainer" key={d.id}>
            <div className="Post">
              {d.file && <img src={d.file} alt="" />}
              {d.text && <p>{d.text}</p>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
