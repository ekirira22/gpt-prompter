'use client'

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
 

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const { data:session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  // State for copied or not 
  const [copied, setCopied] = useState('')

  //Handle copy
  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    //Reset state
    setTimeout(() => setCopied(''), 3000)
  }

  return (
    <div className="prompt_card">
      {/* Prompt Header  */}
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        {/* Copy Button  */}

        <div className="copy_btn" onClick={() => handleCopy() }>
          <Image
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
          />
        </div>
      </div>

      {/* Prompt Body  */}
      
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>
        #{post.tag}
      </p>

      {/* Edit and Delete Functionalities. We will pass multiple conditions to ensure it is only editable and
      deletable by the owner and under the pathname '/profile'*/}

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>

        </div>
      )}

    </div>
  )
}

export default PromptCard