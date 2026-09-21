"use client"
import AnimatedTooltipPreview from '@/components/animated-tooltip-demo'
import SignupFormDemo from '@/components/signup-form-demo'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { app_name } from '@/constant'
import React, { useState } from 'react'

export default function page() {

  const onLogin = (e: any) => {
    e.preventDefault()
  }


  return (
    <div className='h-screen flex lg:flex-row items-center flex-col md:px-40 md:py-25 p-12'>
      <div className='flex flex-col gap-4 w-1/2'>
        <h5 className='text-4xl font-nunito font-bold text-neutral-800'>Welcome to {app_name}</h5>
        <p className='text-lg font-inter font-medium text-neutral-600 w-[80%]'>We empower developers and technical teams to create, simulate, and manage AI-driven workflows visually
        </p>
        <form className='my-3.5 lg:w-[80%] w-full flex flex-col gap-5' onSubmit={onLogin}>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-nunito text-neutral-900'>Email or Username</label>
            <input type='text'
              className='py-2 px-4 rounded-lg text-neutral-800 ring ring-offset-1 ring-neutral-500/30 shadow-md shadow-neutral-600/40 focus:ring-primary/40 focus:ring-2 outline-0'
              placeholder='ziakhan@gmail.com or ziakhan10'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-nunito text-neutral-900'>Password</label>
            <input type='password'
              className='py-2 px-4 rounded-lg text-neutral-800 ring ring-offset-1 ring-neutral-500/30 shadow-md shadow-neutral-600/40 focus:ring-primary/40 focus:ring-2 outline-0'
              placeholder='z__*******'
            />
          </div>

          <button type='submit' className='py-2 px-4 text-center gradient-bg text-white text-lg font-medium font-nunito rounded-lg hover:bg-primary shadow-md shadow-neutral-600/40'>Login</button>
        </form>
      </div>
      <div className='flex flex-col gap-4 w-1/2 p-4 opacity-90 border-2 border-dashed border-neutral-300 h-full'>
        <div className='relative animated-gradient px-5 h-full w-full'>
          <div className="pointer-events-none absolute top-0 right-0 w-[300px] h-[300px]">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/15 blur-3xl animate-pulse" />
            <div className="absolute top-10 right-10 w-28 h-28 rounded-full 
                    bg-white/10 border border-white/20 backdrop-blur-sm
                    animate-float" />

            <div className="absolute top-32 right-36 w-4 h-4 rounded-full 
                    bg-white/70 shadow-[0_0_20px_rgba(255,255,255,0.8)]
                    animate-float-delayed" />
            <div className="absolute top-20 right-24 w-1.5 h-1.5 rounded-full bg-white/80" />

          </div>
          <div className='flex flex-col gap-3 absolute bottom-4 left-4'>
            <div className='flex flex-row gap-1.5 items-center'>
              <div className='bg-white/80 rounded-lg p-1 px-4 text-md font-nunito font-bold'>AI Project Managment</div>
              <div className='bg-white/80 rounded-lg p-1 px-4 text-md font-nunito font-bold'>AI Mini HR</div>
            </div>
            <div className='bg-white/80 rounded-lg p-2 w-[90%]'>
              <h3 className='text-2xl font-nunito font-bold'>{app_name}</h3>
              <p className='text-lg font-inter mt-2'>We empower developers and technical teams to create, simulate, and manage AI-driven workflows visually</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
