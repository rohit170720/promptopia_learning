"use client"
import {useEffect, useState} from 'react' ;
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
const MyProfile = () => {

    const router = useRouter() ; 

    const {data: session} = useSession() ;
    const [posts, setPosts] = useState([]) ; 
   
    const handleEdit=(post)=> {
      router.push(`/update-prompt?id=${post._id}`)

    }
    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
      if(hasConfirmed){
        try{
          await fetch(`/api/promt/${post._id.toString()}`, {
            method:'DELETE'
          })  ; 

          const filteredPosts = posts.filter((p)=>post._id!==p._id) ;
          setPosts(filteredPosts) ; 
        }
        catch (err)
        {
          console.log(err) ; 
        }
      }

    }

    useEffect(()=>{
    
        const fetchPosts =async () => {
          const response =await fetch(`/api/users/${session?.user.id}/posts`) ; 
       
          const data = response.ok? await response.json():[] ; 
          setPosts(data)
        }
        if(session?.user.id){fetchPosts()} ; 
      }, [])
    
  return (
    <Profile
    name="My"
    desc="Welcome to your personalized profile"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
     />
  )
}

export default MyProfile ; 