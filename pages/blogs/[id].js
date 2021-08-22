import React from 'react'
import {db} from '../../firebase'

const BlogPage = ({blog}) => {
    return (
        <div className='container center'>
            <h3>{blog.title}</h3>
            <h5>Created On - { new Date(blog.createdAt).toDateString()}</h5>
            <img src={blog.imageUrl} alt={blog.title} />
            <p>{blog.body}</p>

            <style jsx>
                {
                    `
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

    const result =  await db.collection('blogs').doc(id).get()
    
      return {
        props:{ 
            blog:{
                ...result.data(),
                createdAt:result.data().createdAt.toMillis(),
            }
        }
      }
      
    }