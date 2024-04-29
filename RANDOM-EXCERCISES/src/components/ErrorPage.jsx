import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const ErrorPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [redirect, setRedirect] = useState(false);

  const searchHandler = (e) => {
    e.preventDefault();
    setRedirect(true);
  };

  if (redirect) {
    const path = `/profile/${inputValue}`;
    return <Navigate to={path} replace={true} />;
  }

  return (
    <div>
      <h1>You haven't provided a correct profile url</h1>
      <form onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="Enter username:"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ErrorPage;