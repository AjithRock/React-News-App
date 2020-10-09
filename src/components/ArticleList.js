import React from "react";
import { Link } from "react-router-dom";

//renders the list of the Article
export default function ArticleList(props) {
  return (
    <>
      <div>
        <h2>Top News Articles</h2>
      </div>
      <div className="row">
        <>
          {props.data.map((x, i) => {
            return (
              <div className="card" key={i}>
                <Link
                  className="artical-container element-animate fadeIn element-animated"
                  to={{
                    pathname: "/article",
                    state: x,
                  }}
                >
                  <img src={x.urlToImage} alt="CardImage" />
                  <div className="artical-content-body">
                    <div className="artical-meta">
                      <h4 className="artical-title">{x.title}</h4>
                      <h5 className="artical-description">{x.description}</h5>
                    </div>
                    <div className="artical-footer">
                      By {x.author} {"   on  "}
                      {new Date(x.publishedAt)
                        .toString()
                        .replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, "$2-$1-$3")}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </>
      </div>

      {props.isLoading ? <div className="loader"></div> : null}
      {props.errMsg.length > 0 ? (
        <div className="err-msg">{props.errMsg}</div>
      ) : null}
    </>
  );
}
