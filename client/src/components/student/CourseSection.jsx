// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import { AppContext } from '../../context/AppContext';

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>
        Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-0 md:py-16 my-10'>
        {allCourses?.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <Link
        to={'/course-list'}
        onClick={() => window.scrollTo(0, 0)}
        className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded hover:bg-gray-100 transition-colors duration-300'
        aria-label='Show all courses'
      >
        Show all courses
      </Link>
    </div>
  );
};

CourseSection.propTypes = {
  allCourses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      courseThumbnail: PropTypes.string.isRequired,
      courseTitle: PropTypes.string.isRequired,
      educator: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      coursePrice: PropTypes.number.isRequired,
      discount: PropTypes.number,
      rating: PropTypes.number,
    })
  ).isRequired,
};

export default CourseSection;