import React,{useEffect , useState} from 'react'

const createblog = () => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')

   const onSubmitPost = () => {
     if(!title || !body || !image)
     M.toast({html:'Please add all the fields', classess:'red'})
     return
   }
    return (
        <div className='container center'>
        <div className='input-field'>
        <h3>Create A Blog!!!</h3>
       
       <input type="text"  placeholder='Title' vlaue={title} onChange={(e)=>setTitle(e.target.value)}/>
       <textarea  cols="30" rows="10" placeholder='Body' value={body} onChange={(e)=>setBody(e.target.value)}></textarea>

       <div className="file-field input-field">
      <div className="btn #388e3c green darken-2">
        <span>File</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
    <br />
    <button className='btn #388e3c green darken-2'>Submit Post</button>

    </div>
        </div>
    )
}

export default createblog
