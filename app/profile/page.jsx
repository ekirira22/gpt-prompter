'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";

const MyProfile = () => {
    const router = useRouter()

    const { data:session } = useSession()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // Fetches Posts 
        const fetchPosts = async() => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await response.json()
          setPosts(data)
          console.log(session?.user.id)

        }
    
        if(session?.user.id) fetchPosts()
      }, [])

    const handleEdit = (post) => {
        // Navigate the user to a place they can edit the post
        router.push(`/update-prompt?id=${post._id}`)
        
    }

    const handleDelete = async(post) => {

    }

  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile