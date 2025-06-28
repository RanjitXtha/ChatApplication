import React from 'react';
import Search from '../Components/Search';
import Friends from '../Components/Friends';
import ChatSection from '../Sections/ChatSection';

const Home = () => {


  return (
    <div className="p-4">
      <Search />
      <Friends />
      <ChatSection />
    </div>
  );
};

export default Home;
