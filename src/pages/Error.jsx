import React from "react";
import Wrapper from "../assets/wrappers/ErrorPage";
import notfound from "../assets/not-found.svg";
import { Link, useRouteError } from "react-router-dom";
const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={notfound} alt="error" />
          <h3>Ohh!</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to="/">Back Home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>Masla Hgya Bhai!</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
