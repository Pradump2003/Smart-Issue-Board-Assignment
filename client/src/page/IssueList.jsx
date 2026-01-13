import useFetchApi from "../hooks/useFetchApi";
import { useState, useEffect } from "react";
import IssueCard from "../components/IssueCard";
import CreateIssue from "../components/CreateIssue";

export default function IssueList() {
  const { fetchApi } = useFetchApi();

  const [issues, setIssues] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const handleStatusChange = (e) => setStatusFilter(e.target.value);
  const handlePriorityChange = (e) => setPriorityFilter(e.target.value);

  useEffect(() => {
    let filtered = [...issues];

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((i) => i.status === statusFilter);
    }

    if (priorityFilter !== "ALL") {
      filtered = filtered.filter((i) => i.priority === priorityFilter);
    }

    setFilteredData(filtered);
  }, [statusFilter, priorityFilter, issues]);

  const fetchIssues = () => {
    fetchApi({ url: "/api/v1/issue/my-issues" })
      .then((res) => {
        if (res?.success) {
          setIssues(res.data || []);
          setFilteredData(res.data || []);
        } else {
          setIssues([]);
          setFilteredData([]);
        }
      })
      .catch(() => {
        setIssues([]);
        setFilteredData([]);
      });
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-6 py-4">
      <div className="mt-24 sm:mt-16 mb-4 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            onChange={handleStatusChange}
            className="border p-2 rounded w-full sm:w-40"
          >
            <option value="ALL">All Status</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Done</option>
          </select>

          <select
            onChange={handlePriorityChange}
            className="border p-2 rounded w-full sm:w-40"
          >
            <option value="ALL">All Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold"
        >
          Create Issue
        </button>
      </div>

      <div className="space-y-4 mb-14">
        {filteredData?.length ? (
          filteredData.map((issue) => (
            <IssueCard
              key={issue._id}
              issue={issue}
              fetchIssues={fetchIssues}
            />
          ))
        ) : (
          <p className="text-gray-700 text-center mt-10">
            No Issues Assigned to You!
          </p>
        )}
      </div>

      {open && <CreateIssue setOpen={setOpen} fetchIssues={fetchIssues} />}
    </div>
  );
}
