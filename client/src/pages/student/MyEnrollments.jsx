// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { dummyCourses } from '../../assets/assets';
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer';

const MyEnrollments = () => {
  const { calculateCourseDuration,navigate } = useContext(AppContext);
  const [progressArray, setProgressArray] =useState([
    {lectureCompleted:2,totallectures:4},
    {lectureCompleted:1,totallectures:5},
    {lectureCompleted:3,totallectures:6},
    {lectureCompleted:4,totallectures:3},
    {lectureCompleted:0,totallectures:7},
    {lectureCompleted:5,totallectures:8},
    {lectureCompleted:6,totallectures:4},
    {lectureCompleted:2,totallectures:6},
    {lectureCompleted:4,totallectures:10},
    {lectureCompleted:3,totallectures:5},
    {lectureCompleted:7,totallectures:7},
    {lectureCompleted:1,totallectures:4},
    {lectureCompleted:0,totallectures:2},
    {lectureCompleted:5,totallectures:5},
  ])

  return (
    <>
      <div className='md:px-36 px-8 pt-10'>
        <h1 className='text-2xl font-semibold'>My Enrollments</h1>
        <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
            <tr>
              <th className='px-4 py-3 font-semibold truncate'>Course</th>
              <th className='px-4 py-3 font-semibold truncate'>Duration</th>
              <th className='px-4 py-3 font-semibold truncate'>Completed</th>
              <th className='px-4 py-3 font-semibold truncate'>Status</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {dummyCourses.map((course, index) => (
              <tr className='border-b border-gray-500/20' key={index}>
                <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                  <img
                    className='w-14 sm:w-24 md:w-28'
                    src={course.courseThumbnail}
                    alt={course.courseName}
                  />
                  <div className='flex-1'>
                    <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                    <Line strokewidth={2} percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totallectures: 0}/>
                  </div>
                </td>
                <td className='px-4 py-3 max-sm:hidden'>
                  {calculateCourseDuration(course)}
                </td>
                <td className='px-4 py-3 max-sm:hidden'>
                  {
                    progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totallectures}`
                  }<span>Lectures</span>
                </td>
                <td className='px-4 py-3 max-sm:text-right'>
                  <button className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white' onClick={()=>navigate('/player/' + course._id)}>
                    {
                      progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totallectures===1 ? 'Completed':'On Going'
                    }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );
};

export default MyEnrollments;