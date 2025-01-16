import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJobDetails } from "../features/job/jobSlice";

const JobDetails = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const { jobDetails } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(fetchJobDetails(jobId));
  }, [dispatch, jobId]);

  return (
    <div className="container py-2">
      {jobDetails ? (
        <div>
          <h2>{jobDetails.jobTitle}</h2>
          <div className="card my-3">
            <div className="card-body">
              <p>
                <strong>Company name: </strong>
                {jobDetails.companyName}
              </p>
              <p>
                <strong>Location: </strong>
                {jobDetails.location}
              </p>
              <p>
                <strong>Salary: </strong>
                {jobDetails.salary}
              </p>
              <p>
                <strong>Job Type: </strong>
                {jobDetails.jobType}
              </p>
              <p>
                <strong>Description: </strong>
                {jobDetails.jobDescription}
              </p>
              <div>
                <strong>Qualifications: </strong>
                <ol>
                  {jobDetails.qualifications
                    .split(", ")
                    .map((qualification, index) => (
                      <li key={index}>{qualification}.</li>
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Job details not available.</div>
      )}
    </div>
  );
};

export default JobDetails;
