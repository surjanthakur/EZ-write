import axios from "axios";

const API_URL = axios.create({
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

const posts_by_post_type = async (data) => {
  try {
    const res = await API_URL.get("/search", { params: data });
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

const createPost = async (data) => {
  try {
    const res = await API_URL.post("/newStory", data);
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

const post_By_Id = async (post_id) => {
  try {
    const res = await API_URL.delete(`view/${post_id}`);
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

const deletePost = async (post_id) => {
  try {
    const res = await API_URL.delete(`delete/${post_id}`);
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

export { createPost, deletePost, posts_by_post_type, post_By_Id };
