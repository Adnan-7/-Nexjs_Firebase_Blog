import React,{useEffect , useState} from 'react'
import {v4 as uuidv4} from 'uuid';
import {storage, db, serverTimeStam} from '../firebase'

const CreateBlog = ({user}) => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')


useEffect(() => {
  if(url){
    try{
    db.collection('blogs').add({
      title,
      body,
      imageUrl:url,
      postedBy:user.uid,
      createdAt:serverTimeStam()

    })
    M.toast({html:'Blog created', classes:'green'})
  } catch(err){
    M.toast({html:err.message, classes:'red'})
  }}


}, [url])

   const onSubmitPost = () => {
     if(!title || !body || !image){
     M.toast({html:'Please add all the fields', classes:'red'})
     return
     }

     var uploadTask = storage.ref().child(`images/${uuidv4()}`).put(image);

uploadTask.on('state_changed', 
  (snapshot) => {
    
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    if(progress == 100)   M.toast({html:'Image Uploaded', classes:'green'})
    
  }, 
  (error) => {
    M.toast({html:error.message, classess:'red'})
  }, 
  () => {
     
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
      setUrl(downloadURL)
    });
  }
);


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
    <button className='btn #388e3c green darken-2' onClick={onSubmitPost}>Submit Post</button>

    </div>
        </div>
    )
}

export default CreateBlog
