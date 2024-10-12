import Link from 'next/link'
import '../globals.css'

export default function DashboardLayout({children}){
    return(
      <html>
          <body>
              <div className={"min-h-screen"}>
                <div className={"p-4 flex border-2 border-r-100 justify-between"}>
                   <h1>Manage Your LMS</h1>
                   <h1>Menu</h1>
                </div>
                <div className='flex h-dvh'>
                  <div className='w-1/4 border-2 flex flex-col gap-3'>
                  <Link className='block p-2 hover:bg-sky-500 hover:text-white' href={'/admin'}>Dashboard</Link>
                     <Link className='block p-2 hover:bg-sky-500 hover:text-white' href={'/admin/batches'}>Batches</Link>
                     <Link  className='block p-2 hover:bg-sky-500 hover:text-white' href={'/admin/courses'}>Courses</Link>
                  </div>
                <div>
                 {children}
                 </div>
                </div>
              </div>
          </body>
      </html>
    )
  }