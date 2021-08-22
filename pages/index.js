import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {db} from '../firebase'
import Link from 'next/link'
import {useState} from 'react'

export default function Home({allBlogs}) {

const [blogs, setBlogs] = useState(allBlogs)
const [end, setEnd] = useState(false)

const loadMore= async () => {
  const last = blogs[blogs.length-1];

  const res =  await db.collection('blogs').orderBy('createdAt','desc').startAfter(new Date(last.createdAt)).limit(3).get()

const newBlogs = res.docs.map((docSnap)=>{
  return{
    ...docSnap.data(),
    createdAt:docSnap.data().createdAt.toMillis(),
    id:docSnap.id

  }
})
setBlogs(blogs.concat(newBlogs))

if(newBlogs.length < 3){
  setEnd(true)
}

}


  return (
    <div className='container center'>

      {blogs.map((blog)=>{
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
           <Link href={`/blogs/${blog.id}`}><a>Read More</a></Link> 
          </div>
        </div>
        )
      })}

      {end === false?
       <button className='btn #388e3c green darken-2' onClick={loadMore}>Load More</button>
      : <h4>You have reached end</h4>
    }
 
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

const querySnap =  await db.collection('blogs').orderBy('createdAt','desc').limit(3).get()

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
