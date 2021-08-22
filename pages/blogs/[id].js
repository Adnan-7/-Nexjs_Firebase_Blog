import React,{useState} from 'react'
import {db} from '../../firebase'
import {useRouter} from 'next/router'

const BlogPage = ({blog,user,allComments}) => {

    const [myComment, setMyComment] = useState('')
    const [allCommentsBlog, setAllCommentsBlog] = useState(allComments)

    const router = useRouter();
    const {id} = router.query;

    const makeComent = async () => {
      db.collection('blogs').doc(id).collection('comments').add({
          text:myComment,
          name:user.displayName
      })
      const ComentQuery= await db.collection('blogs').doc(id).collection('comments').get();
      setAllCommentsBlog(ComentQuery.docs.map((comSnap)=>comSnap.data()))
      setMyComment('')
    }
    

    return (
        <div className='container center'>
            <h3>{blog.title}</h3>
            <h5>Created On - { new Date(blog.createdAt).toDateString()}</h5>
            <img src={blog.imageUrl} alt={blog.title} />
            <p>{blog.body}</p>

             {user?
             <>
              <div className='input-field'>
                <input type="text"
                 placeholder='add a comment' 
                 value={myComment} 
                 onChange={(e)=>setMyComment(e.target.value)}/>
            </div>
            <button className='btn #388e3c green darken-2' onClick={makeComent}>Make a Comment</button>
             </>: <h5>Please login to make comments!</h5>
            }

           
            <hr />
            <div className='left-align'>
                {allCommentsBlog.map((item)=> <h6 key={item.name+1}><span>{item.name}:</span> {item.text}</h6>  )}
            </div>

            <style jsx>
                {
                    `
                    span{
                        font-weight:500;
                    }
                    img{
                        width:100%;
                    }
                    `
                }

            </style>
            
        </div>
    )
}

export default BlogPage



export const getServerSideProps= async ({params:{id}}) =>{

    const result =  await db.collection('blogs').doc(id).get();
    const allComentsSnap= await db.collection('blogs').doc(id).collection('comments').get();
    const allComments = allComentsSnap.docs.map((commentSnap)=>commentSnap.data())
    
      return {
        props:{ 
            blog:{
                ...result.data(),
                createdAt:result.data().createdAt.toMillis(),
            },
            allComments
        }
      }
      
    }