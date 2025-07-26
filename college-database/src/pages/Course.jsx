import React from 'react'
import Foter from '../component/Foter'

const Course = () => {
  return (
     <>
      <div class="container mx-auto p-6 mt-16">
    <h2 class="text-3xl font-bold text-center mb-6">Courses Offered</h2>

    {/* <!-- PG Courses Table --> */}
    <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">🎓 Postgraduate Courses</h3>
        <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-gray-300">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="border border-gray-300 p-3">Course</th>
                        <th class="border border-gray-300 p-3">Fees</th>
                        <th class="border border-gray-300 p-3">Eligibility</th>
                        <th class="border border-gray-300 p-3">Application Deadline</th>
                        <th class="border border-gray-300 p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center">
                        <td class="border border-gray-300 p-3">MBA</td>
                        <td class="border border-gray-300 p-3">₹2,00,000/year</td>
                        <td class="border border-gray-300 p-3">Graduate with 50% marks</td>
                        <td class="border border-gray-300 p-3">30th June</td>
                        <td class="border border-gray-300 p-3">
                            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg">Apply Now</button>
                        </td>
                    </tr>
                    <tr class="text-center">
                        <td class="border border-gray-300 p-3">MSc</td>
                        <td class="border border-gray-300 p-3">₹1,50,000/year</td>
                        <td class="border border-gray-300 p-3">BSc with 50% marks</td>
                        <td class="border border-gray-300 p-3">25th July</td>
                        <td class="border border-gray-300 p-3">
                            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg">Apply Now</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    {/* <!-- UG Courses Table --> */}
    <div>
        <h3 class="text-2xl font-semibold mb-4">🎓 Undergraduate Courses</h3>
        <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-gray-300">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="border border-gray-300 p-3">Course</th>
                        <th class="border border-gray-300 p-3">Fees</th>
                        <th class="border border-gray-300 p-3">Eligibility</th>
                        <th class="border border-gray-300 p-3">Application Deadline</th>
                        <th class="border border-gray-300 p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center">
                        <td class="border border-gray-300 p-3">BCA</td>
                        <td class="border border-gray-300 p-3">₹1,00,000/year</td>
                        <td class="border border-gray-300 p-3">12th with 50% marks</td>
                        <td class="border border-gray-300 p-3">15th June</td>
                        <td class="border border-gray-300 p-3">
                            <button class="bg-green-500 text-white px-4 py-2 rounded-lg">Apply Now</button>
                        </td>
                    </tr>
                    <tr class="text-center">
                        <td class="border border-gray-300 p-3">B.Com</td>
                        <td class="border border-gray-300 p-3">₹90,000/year</td>
                        <td class="border border-gray-300 p-3">12th with Commerce</td>
                        <td class="border border-gray-300 p-3">10th July</td>
                        <td class="border border-gray-300 p-3">
                            <button class="bg-green-500 text-white px-4 py-2 rounded-lg">Apply Now</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>


    <div>
        <Foter/>
    </div>

     </>
  )
}

export default Course