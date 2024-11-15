'use client' // Error boundaries must be Client Components
 
import Image from 'next/image';
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('error=>', error);
  }, [error])
 
  return (
    <div className='flex justify-center items-center flex-col h-dvh'>
        <Image src={require('../assets/browser.png')} height={100} width={100} />
      <h2 className='text-2xl font-semibold mt-4'> {error?.message}</h2>
      <button
      className='mt-4 border-2 border-[#ccc] py-2 px-2'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}