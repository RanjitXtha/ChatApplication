import React from 'react';
import Search from '../Components/Search';
import Friends from '../Sections/Friends';
import ChatSection from '../Sections/ChatSection';
import SideBar from '../Sections/SideBar';
const Home = () => {


  return (
    <div className="grid grid-cols-[1fr_3fr] h-screen  ">
      <SideBar />
      <div>Hello</div>
      {/* <Search />
      <Friends />
      <ChatSection /> */}
    </div>
  );
};

export default Home;
