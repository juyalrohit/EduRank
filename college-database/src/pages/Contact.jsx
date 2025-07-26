import React from 'react'
import Foter from '../component/Foter'

const Contact = () => {
  return (
    <div className='w-full mt-12'>
            <div className='sm:px-20 sm:py-14 py-3'>
              <div class="max-w-2xl w-full md:mx-auto px-4 text-center py-5 ">
                <h2 class="text-3xl font-bold mb-4">Contact Us</h2>
                <p class=" mb-8">Have any questions? Reach out to us, and we'll get back to you shortly!</p>

                <form className=" shadow-lg rounded-2xl p-6 space-y-4">
                  
                  <div>
                    <label class="block text-left  font-semibold">Your Name</label>
                    <input type="text" placeholder="Enter your name" className="text-white  w-full mt-1 p-3 rounded-lg outline-none"/>
                  </div>

            
                  <div>
                    <label class="block text-left  font-semibold">Your Email</label>
                    <input type="email" placeholder="Enter your email" className="text-white w-full mt-1 p-3  0 rounded-lg  outline-none"/>
                  </div>

                  <div>
                    <label class="block text-left  font-semibold">Your Message</label>
                    <textarea placeholder="Type your message here..." rows="4" className="text-white w-full mt-1 p-3  rounded-lg  outline-none"></textarea>
                  </div>

            
                  <button type="submit" class="btn w-full bg-gradient-to-r from-red-400 to-red-700 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                    Send Message
                  </button>
                </form>
              </div>
          </div>

      <div>
      <Foter/>
      </div>
    </div>
    
  )
}

export default Contact