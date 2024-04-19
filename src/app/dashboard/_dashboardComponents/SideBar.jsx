  "use client"
  import { useSession } from 'next-auth/react';
  import Link from 'next/link';
  import { usePathname } from 'next/navigation';
  import { useRouter } from 'next/router';
  import React, { useEffect, useState } from 'react'

  const SideBar = () => {
    const [trackTab,setTrackTab]=useState(false);
    const [isTabActive,setIsTabActive]=useState([true,false,false])
    const pathname=usePathname();
    const {data}=useSession();
    useEffect(()=>{
      console.log(data)
      let path=pathname;
      path=path.split('/');
      path=path[path.length-1];
      if(path=='addtracks'){
        setIsTabActive([true,false,false])
      }else if(path=='addgenre'){
        setIsTabActive([false,true,false])
      }else{
        setIsTabActive([false,false,true])
      }
    },[pathname])
    return (
      <div className="h-full w-full" style={{backgroundColor:'#232D30'}}>
          <h1 className="text-[#7D8994] text-5xl text-center font-bold px-6 py-4">MusicAL</h1>
          <h2 className='bg-[#1B2123] p-2 font-extrabold '>Dashboard</h2>

          <div className='border-y-2 border-[#2A3539] mt-6 p-1' style={{height:'8%'}}>
            <img className="inline-block" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHElEQVR4nO2YQW7CMBBF5xYsgGVPk2NxAHoLVFWtKpUuWVXcBiQKB3gVwpHcSFZsMDCh/+2cjJN5/rOymRBCCFEZYAK8Anv8sAfegKcSiS1+2QLjHJFjEkc+szbcCGAMLENvLzkb2nFyI9ECTENvO+ujzc+cQm5/tURSA17ru1at8L+J2JW/m0QihYmcO3p4S+ThRKzwv0jk0ROhZ8Ylcq9ErrVOIZEUSiSg0eocyMWF3bra6xQS6TuZLrXe3zyRwYvcCwpE2su5ifm9DtrkFC9C8dKTDKcb0K/Q2yJVtGa4fMcini6rS/mJRVbh4bsNBOAj9LyKHzaR4RwYmVOAEfAc9dt0C2YMj1nKtgljdsAvh9Dj3ySEEEIIO59f3oJv6COVHA8AAAAASUVORK5CYII=" style={{marginLeft:'8%'}}/>
            <span className="text-white font-extrabold" style={{marginLeft:'12%'}}>Insights</span>
          </div>

          <div className='border-y-2 border-[#2A3539] mt-6 ' style={{height:'8%'}}>
            <img className="inline-block " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABm0lEQVR4nO2au0oEMRRAr43KNv6Bja1go4Ur2AlaKIj4KYI/sK5b2fkFfoOCjfgLVlba7LiVj0LEB3okeothibOZx84kktPe5M49JJnMTEYkEok4AUwCPeAON0y7bfEN4JD8vANL4hNAosUtO7Y/0vbXQEt8ASVH+yngSrsdS6giBmABeKV+EqBr1rVUIaL9NlPTsm4OKhNpAqCt5SZBi2TW++9EgAH+M3ARCQrJEHHaED1Z7NiC9oCnEEU8gzgiBQHOgA+9ZZ4AcxXl/cE9UNEFU7yZp2VgC1gEZsrkFedA9SLD3JbJK86B8YsQmsizTqvgRVrANLAHPKUFy+QV50BJbHnNAgfWgN2iHy/wQWSseYki2cQR8WlqARPBjwi/t9rV4ESAWX2GurFtfGULr0UEmAfuh4sPUeQ8SwL4qqL4OkReRog8FsnbhEh/hMhlkbxNiOxnSHwCG0Xy1i6i/XeAU32lNSdZD8AFsF40ZyMidUMUCWhEEo21xXOAFa21bwuaM7nQ6Pz1w0C3wfPAPJh9q2M9DI1EImLjG5HcjLJPgqaPAAAAAElFTkSuQmCC" style={{marginLeft:'8%'}}/>
            <span className="text-white font-extrabold" style={{marginLeft:'12%'}}>Tracks</span>
            <span className='text-white inline-block' onClick={()=>{setTrackTab((prev)=>{
              return !prev;
            })}} style={{marginLeft:'20%',rotate:trackTab?"0deg":"-180deg",transition:"rotate 0.3s ease-in-out"}}>V</span>
          </div>

          <div className="mt-1 bg-red-600" style={{paddingLeft:"20%",display:trackTab?"block":"none"}}>
            {trackTab&&(<>
            
              <Link className={`${isTabActive[0]?'bg-[#1B2123] ':''} py-2 px-2 mt-2 font-bold text-white block absolute`} href={'/dashboard/tracks/addtracks'} style={{height:'6%',width:'13.3%',translate:trackTab?"0px 0px":"0px 0px"}}>
                Add Tracks
              </Link>
              <Link className={`${isTabActive[1]?'bg-[#1B2123] ':''} py-2 px-2 mt-2 font-bold text-white block absolute`} href={'/dashboard/tracks/addgenre'} style={{height:'6%',width:'13.3%',translate:trackTab?"0px 50px":"0px 0px"}}>
                Genre
              </Link>
              <Link className={`${isTabActive[2]?'bg-[#1B2123] ':''} py-2 px-2 font-bold mt-2 text-white block absolute`} href={'/dashboard/tracks/addartists'} style={{height:'6%',width:'13.3%',translate:trackTab?"0px 100px":"0px 0px"}}>
                Artists
              </Link>
            </>
            )}
          </div>
          
          <div className='bg-[#1B2123] p-1' style={{height:'10%',width:"16.5%", position:'fixed',top:'90%'}}>
              <img src={data.user.image} alt="userImg" className='inline-block ms-3 mt-2' style={{height:'70%',border:"2px solid white",borderRadius:'50%'}}/>
              <div className='text-white inline-block ms-8 font-extrabold'>
                <span>
                  {data.user.name}
                </span>
              </div>
          </div>
      </div>

      
    )
  }

  export default SideBar