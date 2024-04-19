"use client"
import { useSession } from 'next-auth/react';
import SideBar from './_dashboardComponents/SideBar'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './_dashboardComponents/Navbar'
import './_dashboardCss/Tracks.css'
export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    const [isLoading,setIsLoading]=useState(true);
    const [priv,setPriv]=useState(false);
    const session=useSession();
    const router=useRouter();
    const sessionOtherThings=async()=>{
      console.log(session);
      if(!session || session.status=="unauthenticated"){
        router.push('/auth/login')
      }
      else{
        const getStatus=await fetch('/api/auth/privlage',{
          method:'POST',
          body:JSON.stringify({
            email:session.data?.user?.email
          }),
          headers:{
            "Content-Type": "application/json",
          }
        })
        const data=await getStatus.json();
        if(data.isAdmin){
          setPriv(true);
          
        }
        setIsLoading(false);
      }
    
   }
   
   useEffect(()=>{
    sessionOtherThings();
   },[])
   
   if(isLoading){
    return (
      <>
        <h1>Loading....</h1>
      </>
    )
   }

   if(priv==false){
    return(
      <>
        <h1>You do not have enough privlage</h1>
      </>
    )
   }

    return (
      <>
          <div className="h-screen w-screen grid grid-cols-12">
              <div className="col-span-2">
                  <SideBar/>
              </div>
              <div className="col-span-10 grid grid-rows-12">
                  <div className='row-span-1'>
                    <Navbar/>
                  </div>
                  <div className="row-span-11">
                    {children}
                  </div>
              </div>
          </div>
      </>
    );
  }
  