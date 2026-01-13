import { toast } from "react-toastify";
import useFetchApi from "../hooks/useFetchApi";
import { useState } from "react";

export default function CreateIssue({ setOpen, fetchIssues }) {
  const { fetchApi, loading } = useFetchApi();

  const [similarIssues, setSimilarIssues] = useState([]);
  const [pendingIssue, setPendingIssue] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const priority = formData.get("priority");
    const assigned = formData.get("assigned")?.trim();

    if (!title || !description) {
      toast.error("Title and description are required");
      return;
    }

    if (title.length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }

    const payload = { title, description, priority, assigned };

    const res = await fetchApi({
      url: "/api/v1/issue/create-issue",
      method: "POST",
      data: payload,
    });

    if (res.statusCode === 409) {
      setSimilarIssues(res.data.similarIssues);
      setPendingIssue(payload);
      return;
    }

    if (res.success) {
      e.target.reset();
      fetchIssues?.();
      toast.success(res.message || "Issue created successfully");
      setSimilarIssues([]);
      setPendingIssue(null);
      setOpen(false);
      return;
    }

    toast.error(res.message || "Failed to create issue");
  };

  const handleForceCreate = async () => {
    if (!pendingIssue) return;

    const res = await fetchApi({
      url: "/api/v1/issue/create-issue",
      method: "POST",
      data: { ...pendingIssue, forceCreate: true },
    });

    if (res.success) {
      toast.success("Issue created despite duplicates");
      fetchIssues?.();
      setSimilarIssues([]);
      setPendingIssue(null);
      setOpen(false);
    } else {
      toast.error(res.message || "Failed to create issue");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
      <div className="relative bg-white w-[90vw] sm:w-full sm:max-w-lg rounded-xl shadow-lg p-4 sm:p-6">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg sm:text-xl font-semibold mb-4">Create Issue</h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="title"
            className="border p-3 rounded"
            placeholder="Title"
          />
          <textarea
            name="description"
            className="border p-3 rounded min-h-[100px]"
            placeholder="Description"
          />

          <div className="flex gap-3">
            <select
              name="priority"
              defaultValue="MEDIUM"
              className="border p-3 rounded w-1/2"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            <input
              name="assigned"
              className="border p-3 rounded w-1/2"
              placeholder="Assigned To (email)"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-3 rounded"
          >
            {loading ? "Creating..." : "Create Issue"}
          </button>
        </form>
      </div>

      {/* Duplicate Modal */}
      {similarIssues.length > 0 && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70">
          <div className="bg-white w-[90%] max-w-md rounded-xl p-5">
            <h3 className="text-red-600 font-semibold mb-2">
              ⚠ Similar Issues Found
            </h3>

            <div className="max-h-48 overflow-auto border mb-4">
              {similarIssues.map((i) => (
                <div key={i._id} className="p-2 border-b">
                  <b>{i.title}</b>
                  <p className="text-xs">{i.description}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSimilarIssues([]);
                  setPendingIssue(null);
                }}
                className="flex-1 border py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleForceCreate}
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                Create Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
