import bg from '../_publicFiles/backgroundImg.jpg'
export default function Auth({
    children,
  }: {
    children: React.ReactNode
  }) {
    return(
        <>
            <div className="absolute authBackProp m-0 p-0 h-screen w-screen z-0" style={{backgroundImage:`url(${bg.src})`}}>

            </div>
            <div className=" m-0 p-0 h-screen w-screen absolute" >
                <div className="bg-white relative rounded-3xl p-3 z-10" style={{top:'5%',left:"10%",height:"90%",width:'80%',boxShadow:"0px 0px 5px white",borderTopRightRadius:'40%',borderBottomRightRadius:'40%'}}>
                <img src="/backgroundImg.jpg" className="rounded-3xl inline-block" alt="" style={{height:'100%',width:'60%'}}/>
                <div className="absolute top-0 bg-white rounded-3xl p-4" style={{zIndex:3,left:'50%',height:'100%',width:'50%',borderRadius:'12%'}}>
                  <div className="AuthLoginForm h-full flex flex-col items-center pt-10">
                    {children}
                  </div>
                </div>
                    
                </div>
            </div>
        </>
    )
  }