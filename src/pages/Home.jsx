import HeroSection from "../components/HeroSection";
import memory from "../assets/img/memory.jpeg"
function Home() {
  return (
   <>
   
   <HeroSection/>

   {/* Book list */}
   <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-3">
     {[1,2,3,4,5,6,7,9].map(()=>(
      <div className="p-4 border border-1 ">
        <img src={memory} alt="" className="mx-auto" />
        <div className="text-center space-y-2 mt-3">
        <h1>Book title</h1>
        <p>description</p>
        {/* genres */}
        <div className="flex flex-wrap ">
          {['travel','knowledge','travel','knowledge'].map(genre => (
            <span className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500">{genre}</span>
          ))}
        </div>
        </div>
      </div>
     ))}
   </div>

   <div></div>
   </>
   
  );
}

export default Home;
