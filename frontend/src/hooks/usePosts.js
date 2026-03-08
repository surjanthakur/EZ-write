import { useState } from "react";
import {
  createPost,
  posts_by_post_type,
  deletePost,
} from "../services/postServices";

export const UsePosts = () => {
  const [loading, setLoading] = useState(false);

  const fetch_posts = async (data) => {
    setLoading(true);
    try {
      const res = await posts_by_post_type(data);
      if (!res.ok) {
        return res;
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  return { fetch_posts, loading };
};
