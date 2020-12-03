import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import ReactMarkdown from 'react-markdown'

const Home = ({  about_us, blogs, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  return (
    <div>
      <ul>
      {blogs.map(blog => (
        <li key={blog.id}>
          {blog.title}
          <Link href="/blogs/[id]" as ={`blogs/${blog.slug}`}><a>Detail</a></Link>
          {blog.image.map(blog_img => (
            <img key={blog_img.id} width="100" src={"http://64.227.108.114"+blog_img.url}></img>
          ))}
          
        </li>
      ))}
    </ul>
    {about_us.title}
    
    <ReactMarkdown>{about_us.intro}</ReactMarkdown>
    <img width="100" src={"http://64.227.108.114"+about_us.aboutus_image.url}></img>
    </div>
  );
};

Home.getInitialProps = async ctx => {
  try {
    const res = await axios.get('http://64.227.108.114/blogs');
    const aboutus = await axios.get('http://64.227.108.114/about-us');
    const blogs = res.data;
    const about_us = aboutus.data;
    //console.log(blogs);
    return { blogs, about_us };
  } catch (error) {
    return { error };
  }
};

export default Home;