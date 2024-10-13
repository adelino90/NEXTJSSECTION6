import PostForm from '@/components/post-form';
import { CreatePost } from '@/action/posts';


export default function NewPostPage() {
  
  
  
  return <PostForm action={CreatePost}/>
}
