import { signIn } from 'next-auth/react'

export default function LoginButton() {
  return (
   <button onClick={()=>signIn('github')} className='btn'>
        Sign in with GitHub
   </button>
  )
}