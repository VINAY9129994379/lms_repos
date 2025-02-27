

import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext= createContext()

export const AppContextProvider=(props)=>{

const currency = import.meta.env.VITE_CURRENCY
const navigate=useNavigate()

const [allCourses,setAllCourses]= useState([])
const [isEducator,setIsEducator]=useState(true);
const [enrolledCourses,setEnrolledCourses]=useState([])



const calculateChapterTime = (chapter) => {
  let time = 0;
  chapter.chapterContent.forEach((lecture) => {
    time += lecture.lectureDuration;
  });
  return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
};


const calculateCourseDuration = (course) => {
  let time = 0;
  course.courseContent.forEach((chapter) => {
    chapter.chapterContent.forEach((lecture) => {
      time += lecture.lectureDuration;
    });
  });
  return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
};

//Function calculate to no of lectures in the course

const calculateNoOfLectures = (course) => {
  let totalLectures = 0;
  course.courseContent.forEach((chapter) => {
    if (Array.isArray(chapter.chapterContent)) {
      totalLectures += chapter.chapterContent.length;
    }
  });
  return totalLectures;
};



const calculateRating = (rating) => {
  if (Array.isArray(rating)) {
    const total = rating.reduce((sum, r) => sum + r, 0);
    return total / rating.length;
  }
  return rating || 0;
};
//fetch All Courses

const fetchAllCourses= async()=>{
  setAllCourses(dummyCourses)
}

const fetchUserEnrolledCourses= async ()=>{
  setEnrolledCourses(dummyCourses)
}

useEffect(()=>{
  fetchAllCourses()
  setEnrolledCourses()
},[])



  const value={
     currency,
     allCourses,
     navigate,
     isEducator,
     setIsEducator,
     calculateRating,
     calculateChapterTime,
     calculateCourseDuration,
     calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses

  }

  return(
    <AppContext.Provider value={value}>
      
      {props.children}
    </AppContext.Provider>
  )
}