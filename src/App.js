import axios from 'axios';
import './App.css';
import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';

function App() {
  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(10);

  useEffect(() => {
    async function fetchPosts () {
      setLoading(true);
      const result = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(result.data);
      setLoading(false);
    }
    fetchPosts()
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
          <Posts posts={currentPosts} loading={loading} />
    </div>
  );
}

export default App;
