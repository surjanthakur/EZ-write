import { useState } from "react";
import {
  createPost,
  posts_by_type,
  deletePost,
  download_as_pdf,
} from "../services/postServices";

export const UsePosts = () => {
  const [loading, setLoading] = useState(false);

  const request_handler = async (func) => {
    setLoading(true);
    try {
      const res = await func();
      if (!res.ok) {
        return res;
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const fetch_posts = async (data) => {
    return await request_handler(() => posts_by_type(data));
  };

  const create_post = async (data) => {
    return await request_handler(() => createPost(data));
  };

  const delete_post = async (post_id) => {
    return await request_handler(() => deletePost(post_id));
  };

  const download_pdf = async (post_id) => {
    return await request_handler(() => download_as_pdf(post_id));
  };

  return { fetch_posts, loading, delete_post, create_post, download_pdf };
};
