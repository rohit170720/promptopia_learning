"use client"
import React from 'react' ; 
import Image from "next/image";

import { useEffect, useState } from 'react';


const UrlFeed = ({submitting}) => {

    

    const [sites, setSites] = useState([])  ;
    
    const handleDelete = async (site) => {
        const hasConfirmed = confirm("Are you sure you want to delete this site?")
        if(hasConfirmed){
          try{
            await fetch(`/api/site/${site._id.toString()}`, {
              method:'DELETE'
            })  ; 
  
            const filteredPosts = sites.filter((s)=>site._id!==s._id) ;
            setSites(filteredPosts) ; 
          }
          catch (err)
          {
            console.log(err) ; 
          }
        }
  
      }
    

    useEffect(()=>{
    
        const fetchSites =async () => {
          const response =await fetch('/api/site') ; 
       
          const data = response.ok? await response.json():[] ; 
          setSites(data)
        
        }
        fetchSites() ; 
      }, [submitting]) ;

      
  return (
    <div className='mt-5 flex flex-wrap gap-3'>
        {
            sites.map((obj,index)=>(<div className='glassmorphism  lg:max-w-[340px]' key={index}>

<div className="flex justify-between items-start gap-3">
<div className="flex-1 flex justify-start items-center gap-2 cursor-pointer max-w-[83%]">
          <Image
          src={obj.siteIcon} 
          alt ="user_image"
          width={20}
          height={20}
          className="rounded-full object-contain"
          />
          
            <p className="font-inter text-sm text-gray-500 break-all">
              {obj.siteUrl}
            </p>

        </div>

        <div className="copy_btn" onClick={()=>{handleDelete&&handleDelete(obj)}}>
          <Image
          
          src={'/assets/icons/delete.png'}
          width={12}
          height={12}
          alt="copy btn"


          />

        </div>

        
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">
            {obj.siteDesc}
        </p>
                
                
                </div>))
        }
      
    </div>
  )
}

export default UrlFeed
