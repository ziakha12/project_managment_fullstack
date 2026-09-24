"use client"
import GoogleSvg from '@/components/Svgs'
import { app_name } from '@/constant'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function page() {

  type errorProps = {
    message: string
  }

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)


  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: "POST",
        body: JSON.stringify({
          username,
          password
        })
      })

      const result = await response.json()

      if (!result.success) {
        toast.error(result.error)
      }

      if (result.success) {
        toast.success(result.message)
      }
    } catch (error) {
      setIsError(true)
      // @ts-ignore
      toast.error(error.message)
    }
  }


  return (
    <div className='h-screen bg-[url(/BG.png)] bg-no-repeat bg-cover flex items-center justify-center'>
      <div className='flex flex-col gap-4 max-w-100 text-center w-full'>
        <div className="flex flex-col gap-1 text-center">
          <h5 className='text-3xl font-nunito font-bold text-neutral-800'>Welcome to {app_name}!</h5>
          <p className='text-md font-inter font-medium text-neutral-500 '>Don't have account ? <Link className='font-medium font-nunito underline  text-primary' href={'/signup'}>Sign Up</Link>
          </p>
        </div>

        <button className='flex flex-row gap-2 items-center py-2 px-4  justify-center bg-white/80 rounded-lg shadow shadow-neutral-300'><GoogleSvg /> <span className='text-md font-inter font-medium text-neutral-500 '>Sign up with google</span></button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-400/80" />

          <span className="text-sm text-neutral-500 font-nunito">OR</span>

          <div className="h-px flex-1 bg-neutral-400/80" />
        </div>

        <form className='mt-2 w-full flex flex-col gap-5' onSubmit={onLogin}>
          <div className='flex flex-col gap-2'>
            <input type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='py-2  w-full px-4 rounded-lg text-neutral-800 ring ring-offset-1 ring-neutral-500/30 shadow-md shadow-neutral-600/40 focus:ring-primary/40  focus:ring-2 outline-0'
              placeholder='ziakhan@gmail.com or ziakhan10'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className="relative w-full">
              <input type={isPasswordShow ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='py-2 w-full px-4 rounded-lg relative w-full text-neutral-800 ring ring-offset-1 ring-neutral-500/30 shadow-md shadow-neutral-600/40 focus:ring-primary/40 focus:ring-2 outline-0'
                placeholder='z__*******'
              />
              <i className={`absolute text-xl right-2 top-2 ${isPasswordShow ? 'ri-eye-off-line' : 'ri-eye-2-line'}`} onClick={() => setIsPasswordShow(!isPasswordShow)}></i>
            </div>
          </div>

          <button type='submit' className='py-2 px-4 text-center gradient-bg text-white text-md  font-semibold font-nunito rounded-lg hover:bg-primary shadow-md shadow-neutral-600/40'>Login</button>
        </form>
      </div>
    </div>
  )
}
