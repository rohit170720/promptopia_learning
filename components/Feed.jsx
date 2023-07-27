'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

// RegExp.quote = function(str) {
//   return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
// };

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
  const [searchPosts, setSearchPosts] = useState([]) ; 
  const [posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null)

 
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i") ; 
    return posts.filter((item)=>regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt))

  }

  
  const handleSearchChange =(e)=>
{
  clearTimeout(searchTimeout);

    setSearchText(e.target.value) ; 
    
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchPosts(searchResult);
      }, 500)
    );
  };
    
  

const handleTagClick = (tagName) => {
  setSearchText(tagName);
  const searchResult = filterPrompts(tagName);
  setSearchPosts(searchResult);
};

  useEffect(()=>{
    
    const fetchPosts =async () => {
      const response =await fetch('/api/promt') ; 
   
      const data = response.ok? await response.json():[] ; 
      setPosts(data)
    
    }
    fetchPosts() ; 
  }, []) ;

  return (
    <section className='feed'>
      {/* {console.log('feed,posts', posts)} */}
      <form className='relative w-full flex-center' onSubmit={(e)=>{e.preventDefault()}}>
        <input 
        type='text'
         placeholder='search for tag or Username'
         value={searchText}
         onChange={handleSearchChange}
         required 
         className='search_input peer'
        /> 

      </form>
      {searchText?(<PromptCardList
      data={searchPosts}
      handleTagClick={handleTagClick} 

      />) : (<PromptCardList
      data={posts}
      handleTagClick={handleTagClick} 

      />)
}
      
    </section>
  )
}

export default Feed
