import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteJobDetails, fetchAllJobs } from "../features/job/jobSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.job);
  const [searchValue, setSearchValue] = useState("");

  const filteredJobs = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div>
        <p className="text-center my-3">Loading...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <p className="text-center my-3">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row py-2">
        <div className="col-12 col-md-6">
          <input
            type="search"
            className="form-control"
            placeholder="Search by job title..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="py-2">
          <h2>All Jobs</h2>
        </div>

        <div>
          {filteredJobs.length > 0 ? (
            <div className="row">
              {filteredJobs.map((job) => (
                <div key={job._id} className="col-md-4">
                  <div className="card me-2 my-1 p-3">
                    <div className="card-body">
                      <h3>{job.jobTitle}</h3>
                      <p>
                        <strong>Company name: </strong>
                        {job.companyName}
                      </p>
                      <p>
                        <strong>Location: </strong>
                        {job.location}
                      </p>
                      <p>
                        <strong>Job Type: </strong>
                        {job.jobType}
                      </p>
                      <div className="row">
                        <Link
                          className="btn btn-primary col-12 col-lg-5 me-3 my-2"
                          to={`/jobDetails/${job._id}`}
                        >
                          See Details
                        </Link>
                        <button
                          className="btn btn-danger col-12 col-lg-5 me-3 my-2"
                          onClick={() => dispatch(deleteJobDetails(job._id))}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
