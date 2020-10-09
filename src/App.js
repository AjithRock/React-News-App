import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //method to change the typed value of search bar
  const searchArticals = (e) => {
    setSearchValue(e.target.value);
  };

  //handle the Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setErrMsg("");
      getArticalLists();
    }
  };

  //get the articles data from  newsapi
  const getArticalLists = () => {
    var endpoint = searchValue !== "" ? "everything" : "top-headlines";
    setIsLoading(true);
    axios
      .get("https://newsapi.org/v2/" + endpoint, {
        params: {
          q: searchValue === "" ? "trump" : searchValue,
          apiKey: process.env.REACT_APP_NEWS_API_KEY,
          pageSize: 30,
        },
      })
      .then(function (response) {
        if (response.data.articles.length === 0) {
          setErrMsg(
            `Your search for "${searchValue}" didn't return any results. Try searching for something else`
          );
        }
        setData(response.data.articles);
        setIsLoading(false);
      })
      .catch(function (error) {
        setErrMsg(error.response.data.message);
        setIsLoading(false);
      });
  };

  useEffect(getArticalLists, []);

  return (
    <Router>
      <div className="App">
        <header>
          <div className="header-container">
            <div className="header-wrap">
              <div className="header-title">
                <span>
                  <FontAwesomeIcon icon={faNewspaper} color="#7e7e7e" />
                </span>
                News
              </div>
              <div action="#" className="header-searchbar">
                <div className="search-icon-wrapper">
                  <FontAwesomeIcon icon={faSearch} color="#7e7e7e" />
                </div>
                <input
                  type="text"
                  id="searchBar"
                  placeholder="Press enter to search..."
                  onChange={(e) => searchArticals(e)}
                  value={searchValue}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <ArticleList data={data} isLoading={isLoading} errMsg={errMsg} />
            </Route>
            <Route path="/article">
              <ArticleDetail />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
