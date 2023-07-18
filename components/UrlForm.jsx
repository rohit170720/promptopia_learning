import Link from "next/link"

const UrlForm = ({type,
  url,
  setUrl,
  submitting,
  handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Add Url</span>
        </h1>
       
        <form onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Url of the site
            </span>
            
          
          <input
            value={url}
            onChange ={(e)=> setUrl(e.target.value)} 
            placeholder="write your prompt" 
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
                {submitting?`${"Ingesting"}...`:"Ingetst"}
                
              </button>

            </div>

        </form>
        


    </section>
  )
}

export default UrlForm ; 
