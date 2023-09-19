import Header from "../../components/Header/Header";
import Main from "../../components/Main";

const MainLayout =()=>{
    return(
       <>
           <Header/>

               <div className="container-md">
                   <Main/>
               </div>

       </>

    )
}
export default MainLayout
