import React from 'react';


function TradeSteps() {


    return (
         <section
         className="bg-accent mx-auto py-6   xl:container  
         justify-center items-center -mt-32 rounded-lg shadow-lg  shadow-gray-300 px-8 sm:px-8 md-px-0
         ">
            <div className="
          flex flex-col md:flex-row justify-center items-center py-6  md:space-x-12 ">
               <div className="mt-4  flex flex-col justify-center items-center  md:justify-start md:w-1/3 ">
               <i className="icon-48 mb-2 material-icons font-material text-dark 
               " >autorenew</i> 

                  <h1 className="text-3xl font-bold text-center text-secondary 
                  font-mainfont  leading-tight md:leading-tight sm:leading-tight
                  ">Trade In</h1>


                  <p className="text-dark text-center mt-2">Got old games? Trade them in for cash or store credit. 

</p>
               </div>
               <div className="mt-4 flex flex-col justify-center items-center  md:justify-start md:w-1/3">
               <i className="icon-48 mb-2 text-dark material-icons 
               
               ">credit_card</i> 

                  <h1 className="text-3xl font-bold text-center text-secondary 
                  font-mainfont  leading-tight md:leading-tight sm:leading-tight
                  ">Get Cash</h1>



                  <p className="text-dark text-center mt-2 
                  ">Get in store credit or cash for your trade in, it&apos;s that easy!
</p>

               </div>
               <div className="mt-4 flex flex-col justify-center items-center md:justify-start md:w-1/3">
               <i className="icon-48 mb-2 text-dark material-icons-outlined ">videogame_asset</i> 


                  <h1 className="text-3xl font-bold text-center text-secondary 
                  font-mainfont  leading-tight md:leading-tight sm:leading-tight
                  ">Game</h1>



                  <p className="text-dark text-center mt-2 ">Now enjoy playing your retro game or console! 
</p>

               </div>
            </div>
         </section>

      )
      
}

export default TradeSteps;
