import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { proto as questionProto } from "./generated/questions_pb";
import { proto as grpcProto } from "./generated/questions_grpc_web_pb";

const { SearchRequest } = questionProto.questions;
const { QuestionServiceClient } = grpcProto.questions;

const client = new QuestionServiceClient("http://localhost:8080", null, null);

const SearchFilter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const itemsPerPage = 10;

  const fetchPaginatedData = async (title, page, limit) => {
    try {
      setLoading(true);
      const request = new SearchRequest();
      request.setTitle(title);
      request.setPage(page);
      request.setLimit(limit);

      client.searchQuestions(request, {}, (error, response) => {
        if (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
          return;
        }
        const fetchedQuestions = response.getQuestionsList().map((q) => ({
          id: q.getId(),
          title: q.getTitle(),
          description: q.getDescription(),
        }));
        setQuestions(fetchedQuestions);
        setTotalResults(response.getTotalQuestions());
        setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaginatedData(searchQuery, currentPage, itemsPerPage);
  }, [searchQuery, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <p>Total Results: {totalResults}</p>
          <div>
            {questions.length > 0 ? (
              questions.map((question) => (
                <div key={question.id}>
                  <h3>{question.title}</h3>
                  <p>Description: {question.description}</p>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(totalResults / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </>
      )}
    </div>
  );
};

export default SearchFilter;
