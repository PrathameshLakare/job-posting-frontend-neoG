import { useDispatch, useSelector } from "react-redux";
import { postJobDetails } from "../features/job/jobSlice";
import { useState } from "react";

const PostJob = () => {
  const dispatch = useDispatch();
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [validation, setValidation] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { status, error } = useSelector((state) => state.job);

  const clickHandlerForJobPost = (e) => {
    e.preventDefault();

    if (jobType === "") {
      setValidation("Please select a job type.");
    } else {
      const jobData = {
        jobTitle,
        companyName,
        location,
        salary,
        jobType,
        jobDescription,
        qualifications,
      };
      dispatch(postJobDetails(jobData));
      setSuccessMessage("Job posted successfully.");
      setJobTitle("");
      setCompanyName("");
      setLocation("");
      setSalary("");
      setJobType("");
      setJobDescription("");
      setQualifications("");
      setValidation("");
    }
  };

  return (
    <div className="container py-2">
      <h2>Post a Job</h2>
      <form onSubmit={clickHandlerForJobPost}>
        <label htmlFor="jobTitle" className="form-label">
          Job Title:
        </label>
        <input
          type="text"
          id="jobTitle"
          className="form-control mb-2 "
          required
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <label htmlFor="companyName" className="form-label">
          Company Name:
        </label>
        <input
          type="text"
          id="companyName"
          className="form-control mb-2"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label htmlFor="location" className="form-label">
          Location:
        </label>
        <input
          type="text"
          id="location"
          className="form-control mb-2"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label htmlFor="salary" className="form-label">
          Salary:
        </label>
        <input
          type="number"
          id="salary"
          className="form-control mb-2"
          required
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <label htmlFor="jobType" className="form-label">
          Job Type:
        </label>
        <select
          id="jobType"
          className="form-select mb-2"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="">Select Job Type</option>
          <option value={"Full-time (On-site)"}>Full-time (On-site)</option>
          <option value={"Part-time (On-site)"}>Part-time (On-site)</option>
          <option value={"Full-time (Remote)"}>Full-time (Remote)</option>
          <option value={"Part-time (Remote)"}>Part-time (Remote)</option>
        </select>
        {validation && <p className={"text-danger"}>{validation}</p>}

        <label htmlFor="jobDescription" className="form-label">
          Job Description:
        </label>
        <textarea
          id="jobDescription"
          className="form-control mb-2"
          required
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <label htmlFor="jobQualifications" className="form-label">
          Job Qualifications:
        </label>
        <textarea
          id="jobQualifications"
          className="form-control mb-2"
          required
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
        />

        <button type="submit" className="btn btn-primary my-2">
          Post Job
        </button>

        {successMessage && (
          <p className={"alert alert-success"}>{successMessage}</p>
        )}
        {status === "error" && (
          <p className={"alert alert-danger"}>Failed to post job: {error}</p>
        )}
      </form>
    </div>
  );
};

export default PostJob;
