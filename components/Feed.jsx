'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'


const PromptCardList = ({data, handleTagClick})=>{
  return (<div className='mt-16 prompt_layout'>
    {
      data.map(post=>(<PromptCard
       key={post._id}
       post={post}
       handleTagClick={handleTagClick}
       />))
    }

  </div>)
  }

const Feed = () => {


 

  const [searchText, setSearchText] = useState('') ;
  const [posts, setPosts] = useState([])
  const handleSearchChange =(e)=>{
    
  }
  
  useEffect(()=>{
    
    const fetchPosts =async () => {
      const response =await fetch('/api/promt') ; 
   
      const data = response.ok? await response.json():[] ; 
      setPosts(data)
    
    }
    fetchPosts() ; 
  }, [])

  return (
    <section className='feed'>
      {/* {console.log('feed,posts', posts)} */}
      <form className='relative w-full flex-center'>
        <input 
        type='text'
         placeholder='search for tag or Username'
         value={searchText}
         onChange={handleSearchChange}
         required 
         className='search_input peer'
        /> 

      </form>
      <PromptCardList
      data={posts}
      handleTagClick={()=>{}} 

      />
      
    </section>
  )
}

export default Feed
