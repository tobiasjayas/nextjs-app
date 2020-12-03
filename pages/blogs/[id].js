import axios from "axios";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import { render } from "react-dom";

const Home = ({ blogs, error }) => {
  //console.log(blogs);
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  return (
    <div>
      {blogs.title}

      <ReactMarkdown>{blogs.content}</ReactMarkdown>
      {blogs.image.map(blog_img => (
        <img key={blog_img.id} width="100" src={"http://64.227.108.114" + blog_img.url}></img>
      ))}
    </div>
  );
};

Home.getInitialProps = async ctx => {
  const id = ctx.query.id;
  //console.log(ctx.query.id);
  try {
    const res = await axios.get(`http://64.227.108.114/blogs`, {
      params: { slug: id }
    });
    const blogs = res.data[0];
    //console.log(res.data[0]);
    return { blogs };
  } catch (error) {
    return { error };
  }
};

export default Home;
