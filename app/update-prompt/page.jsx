'use client'; 
import { useState, useEffect } from 'react'; 
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';



const UpdatePrompt = () => {
    const [submitting, setSubmitting ] = useState(false) ;
    const router = useRouter() ; 
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id')

     const [post, setPost ]= useState({
        prompt:'', 
        tag:'' 
     }); 


     useEffect(()=>{
        const getPromptDetails = async ()=>{
            const response = await fetch(`/api/promt/${promptId}`) ;
            const data = await response.json() ;

            setPost({
                prompt: data.prompt, 
                tag: data.tag 
            })




        }

        if(promptId){
            getPromptDetails() ;
        }

     }, [promptId]) ; 

     const updatePrompt= async (e)=> {
        e.preventDefault() ; 
        setSubmitting(true) ;

        if(!promptId) return alert('Prompt ID not Found')

        try{
            const response = await fetch(`/api/promt/${promptId}`, {
                method:'PATCH', 
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
                })
            });
            
            if(response.ok){
                router.push('/'); 
                
            }
        }
        catch(err){
           console.log(err);
        }
        finally{
            setSubmitting(false)
        }

    }

    
  
    return (
        <Form

        type ="Edit"
        post ={post} 
        setPost={setPost}
        submitting={submitting} 
        handleSubmit={updatePrompt}

        />
    
  )
}

export default UpdatePrompt
