import React from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useLocation } from "react-router-dom";

//details of the Article
export default function ArticleDetail() {
  const history = useHistory();
  let location = useLocation(); // used to get the data object from the list
  const articleData = location.state;
  return (
    <>
      <h2 className="detail-heading">
        <span onClick={() => history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} color="#000" />
        </span>
        {articleData.title}
      </h2>
      <div className="row">
        <div className="detail-img-wrapper">
          <img src={articleData.urlToImage} alt="CardImage" />
        </div>
        <div className="details-content">{articleData.content}</div>
      </div>
    </>
  );
}
