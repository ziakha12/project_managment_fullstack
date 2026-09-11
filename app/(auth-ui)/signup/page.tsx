import SignupFormDemo from '@/components/signup-form-demo'
import React from 'react'

export default function page() {
  return (
    <div className='h-screen bg-linear-to-b from-white to-neutral-100 flex justify-center items-center dark:from-neutral-950 dark:to-neutral-800'> 
      <SignupFormDemo/>
    </div>
  )
}
