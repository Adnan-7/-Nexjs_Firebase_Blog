import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {db} from '../firebase'
import Link from 'next/link'

export default function Home({allBlogs}) {
  return (
    <div className='container'>

      {allBlogs.map((blog)=>{
        return(
          <div className="card" key={blog.id}>
          <div className="card-image">
            <img src={blog.imageUrl} />
            <span className="card-title">{blog.title}</span>
          </div>
          <div className="card-content">
            <p>{blog.body}</p>
          </div>
          <div className="card-action">
           <Link href={`/blog/${blog.id}`}><a>Read More</a></Link> 
          </div>
        </div>
        )
      })}

      <style jsx>
        {
          
          `
           
          p{
            display:-webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient:vertical;
          }
          `
        }

      </style>
         
    </div>  
  )
}


export const getServerSideProps= async (context) =>{

const querySnap =  await db.collection('blogs').orderBy('createdAt','desc').get()

const allBlogs = querySnap.docs.map((docSnap)=>{
  return{
    ...docSnap.data(),
    createdAt:docSnap.data().createdAt.toMillis(),
    id:docSnap.id

  }
})

  return {
    props:{allBlogs}
  }
  
}
