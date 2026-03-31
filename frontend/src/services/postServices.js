import axios from "axios";

// API service functions for post-related operations
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1.0/posts",
  withCredentials: true,
});

const handleApiError = (err) => {
  const status = err.response?.status || 500;
  const data = err.response?.data;
  const rawDetail = data?.detail ?? data?.message;
  const detail =
    typeof rawDetail === "string"
      ? rawDetail
      : Array.isArray(rawDetail)
        ? rawDetail
            .map((message) =>
              typeof message === "string" ? message : message?.msg
            )
            .join(", ")
        : "Something went wrong";

  return { ok: false, status, data, detail };
};

const request_handler = async (func) => {
  try {
    const res = await func();
    return {
      ok: true,
      data: res.data,
      status: res.status,
      detail: null,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

const posts_by_type = async (data) => {
  return await request_handler(() => api.get("/search", { params: data }));
};

const createPost = async (data) => {
  return await request_handler(() => api.post("/newStory", data));
};

const deletePost = async (post_id) => {
  return await request_handler(() => api.delete(`/delete/${post_id}`));
};

const download_as_pdf = async (post_id) => {
  return await request_handler(() => api.get(`/download/${post_id}/pdf`));
};

export { createPost, deletePost, posts_by_type, download_as_pdf };
