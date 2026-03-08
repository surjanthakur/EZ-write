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

  const create_post = async (data) => {
    try {
      const res = await createPost(data);
      if (!res.ok) {
        return res;
      }
      return res;
    } finally {
      setLoading(false);
    }
  };
  const delete_post = async (post_id) => {
    try {
      const res = await deletePost(post_id);
      if (!res.ok) {
        return res;
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  return { fetch_posts, loading, delete_post, create_post };
};
