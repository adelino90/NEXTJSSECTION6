"use server";
import { redirect } from "next/navigation";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from "next/cache";

export async function CreatePost(prevState,formData) {

  
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');
    let errors = []

    if(!title || title.trim().length === 0){
        errors.push("Title is required");
    }

    if(!content || content.trim().length === 0){
      errors.push("Content is required");
    }

    if(!image || image.size === 0){
      errors.push("Image is required");
    }

    if(errors.length>0){
      return{errors}
    }

    const imageURL = uuidv4() + '.' + image.name.split('.').pop();
    
    await storePost({
      imageUrl: imageURL,
      title,
      image:image,
      content,
      userId: 1
    })
    revalidatePath('/','layout');
    redirect('/feed');

  }

  export async function togglePostLikeStatus(postId){
    await updatePostLikeStatus(postId,2);
    revalidatePath('/','layout');

  }

 