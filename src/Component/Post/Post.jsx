import "../Post/Post.css";
import CancelIcon from "@mui/icons-material/Cancel";
import GifIcon from "@mui/icons-material/Gif";
import { useEffect, useState } from "react";

export default function Post() {
  const [giphyData, setGiphyData] = useState([]);
  const [hide, setHide] = useState(false);
  const [giphySearch, setGiphySearch] = useState("");
  const [form, setForm] = useState({
    text: "",
    file: "",
  });

  const key = "tQ3mECRqR41dV8wUOgpsAep2NfNINw8a";
  const url = `http://api.giphy.com/v1/gifs/search?&api_key=${key}&q=${giphySearch}&limit=20`;

  useEffect(() => {
    // return () => {
    if (giphySearch !== "") {
      console.log("21", giphySearch);
      fetch(url)
        .then((res) => res.json())
        .then(
          (res) => {
            setGiphyData(res.data);
          },
          [giphySearch]
        )
        .catch((err) => console.log(err));
    }
    // };
  }, [giphySearch, url]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("31", form);
    fetch(`https://backend-code-mancers.herokuapp.com/post`, {
      method: "post",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("30", res);
        setForm({
          text: "",
          file: "",
        });
        setHide(false);
      })
      .catch((err) => console.log(err));
  };
  console.log(giphyData);

  return (
    <>
      <div className="share">
        <div className="shareWrapper">
          <form className="shareBottom" onSubmit={submitHandler}>
            <div className="inputSection">
              <div className="Input">
                <input
                  type="text"
                  name="text"
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  placeholder="Write Somthing Here"
                />
              </div>
              {form.file && (
                <div className="shareImgContainer">
                  <img className="shareImg" src={form.file} alt="" />
                  <CancelIcon
                    className="shareCancelImg"
                    onClick={() => setForm({ ...form, file: "" })}
                  />
                </div>
              )}
            </div>
            <hr className="shareHr" />
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <GifIcon
                  htmlColor="tomato"
                  className="shareIcon"
                  fontSize="large"
                  style={{ border: "2px solid black" }}
                  onClick={() => {
                    setHide(true);
                    // console.log("89", hide);
                  }}
                />
                {hide && (
                  <div className="inputGifSection">
                    <div className="InputGifHeaderSection">
                      <div className="shareOptionText">GIF</div>
                      <input
                        type="text"
                        name="giphy"
                        onChange={(e) => setGiphySearch(e.target.value)}
                      />
                      <CancelIcon
                        onClick={() => {
                          setHide(false);
                        }}
                      />
                    </div>
                    <div>
                      {giphyData.map((d) => (
                        <img
                          key={d.id}
                          src={d.images.preview_gif.url}
                          style={{ width: "25%" }}
                          alt={giphySearch}
                          onClick={(e) => {
                            setForm({
                              ...form,
                              file: d.images.preview_gif.url,
                            });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </label>
              <input className="shareButton" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
