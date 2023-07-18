"use client"
import React from 'react'
import Feed from '@components/Feed';
import { useEffect, useState } from 'react';
// import UrlForm from '@components/UrlForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from "next/link"
import UrlFeed from '@components/UrlFeed';


function isValidHttpUrl(string) {
    try {
      const newUrl = new URL(string);
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (err) {
      return false;
    }
  }

const AddUrl = () => {

  
    const [submitting, setSubmitting ] = useState(false) ;
    
    const {data: session} = useSession() ; 
    const router = useRouter() ; 
    const [url, setUrl] = useState('') ; 

      
    const handleSubmit = async (e)=> {
        e.preventDefault() ; 
        setSubmitting(true) ;


        if(isValidHttpUrl(url)){

        try{
            const response = await fetch('/api/site/new', {
                method:'POST', 
                body:JSON.stringify({
                    userId: session?.user.id,
                    siteUrl:url,
                    siteIcon:"https://www.gstatic.com/devrel-devsite/prod/va1f717a97b905b2c8de529cdc78ca43b19ecb0645cb4b2109baf3f0a02fcaa4b/firebase/images/favicon.png",
                    siteDesc: "Build and deploy your websites and apps without managing any infrastructure. Preview, deploy, and roll back with one single command. Feel at ease with dedicated support and frequent updates."
                    
                })
            });
            
            if(response.ok){
                router.push('/add-url'); 
                alert('Added successfully!'); 
                setUrl('') ;
                
            }
        }
        catch(err){
           console.log(err);
           alert('Could not add the site')
        }
        finally{
            setSubmitting(false)

        }
    }
    else {
        alert("Enter a Valid Url!") ;
        setSubmitting(false)
        
        return ; 
    }

    } 

  return (
    <section className="w-full flex-center flex-col min-h-screen">
        <h1 className="head_text text-center">
            Ingest your Url
            <br className="max-md:hidden"/>
            {/* <span className="orange_gradient text-center">AI-Powered Prompts</span> */}
        </h1>
        <p className="desc text-center" >
         Enter the Url you want to ingest and get the data of the site.  
        </p>


        <form onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Url of the site
            </span>
            
          
          <input
            value={url}
            onChange ={(e)=> setUrl(e.target.value)} 
            placeholder="Enter Url" 
            required 
            className="form_input"
            />
            </label>

           

            <div className="flex-end mx-3 mb-5 gap-4">
              <Link href="/" className="text-gray-500 text-sm">
                Cancel
              </Link>
              <button type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
                {submitting?`${"Ingesting"}...`:"Ingest"}
                
              </button>

            </div>

        </form>

        <UrlFeed submitting={submitting}/>

      

    </section>
  )
}

export default AddUrl ; 
