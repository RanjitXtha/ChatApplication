import React from 'react'
import { LuSend } from "react-icons/lu";
import { FaPaperclip } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const MessageInput = ({setPreview,setSendFile,handleFileChange,setContent,handleMessage,preview,content}) => {
  return (
    <div className="bg-gray-800 border-t border-gray-700 p-4">
        {
          preview &&
          <div className='relative'>
              <img src={preview} alt="preview" className='max-h-[15rem]' />
              <button onClick={
                ()=>{
                  setPreview(null);
                  setSendFile(null)
                }
                
              } className='absolute w-6 h-6 right-0 top-0 flex justify-center items-center bg-gray-900 rounded-full text-white'>
                <p>x</p>
                
              </button>
            </div>        
        }
        <div className="flex items-center space-x-3 text-white">
          <input hidden accept="*/*" type="file" id="upload" onChange={handleFileChange} className="p-3 hover:bg-gray-700 rounded-xl transition-all duration-200" />

          <label htmlFor="upload">
            <FaPaperclip />
          </label>

          <div className="flex-1 relative">

            <input
              type="text"
              placeholder="Send message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleMessage();
                }
              }}
              className="w-full bg-gray-700 border border-gray-600 rounded-2xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none max-h-32"

            />
          </div>
          <button
            onClick={handleMessage}
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 transform active:scale-95"
          >
            <LuSend />
          </button>
        </div>
      </div>
  )
}

export default MessageInput