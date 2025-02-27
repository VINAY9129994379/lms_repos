import  { useContext } from 'react';
import PropTypes from 'prop-types';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const formatPrice = (price, currency) => {
  if (currency === 'USD') return `$${price}`;
  if (currency === 'EUR') return `€${price}`;
  return `${currency} ${price}`;
};



const CourseCard = ({ course }) => {
  const { currency,calculateRating } = useContext(AppContext);
  const averageRating = calculateRating(course.rating);

  return (
    <Link
      to={'/course/' + course._id}
      onClick={() => window.scrollTo(0, 0)}
      className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300'
    >
      <img className='w-full' src={course.courseThumbnail} alt={course.courseTitle} />
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
        <p className='text-gray-500'>{course.educator?.name}</p>
        <div className='flex items-center space-x-2'>
          <p>{averageRating.toFixed(1)}</p>
          <div className='flex' aria-label={`Rating: ${averageRating.toFixed(1)} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(averageRating) ? assets.star : assets.star}
                alt={`Star ${i + 1}`}
                className='w-3.5 h-3.5'
              />
            ))}
          </div>
          <p className='text-gray-500'>({course.rating?.length || 0} reviews)</p>
        </div>
        <p className='text-base font-semibold text-gray-800'>
          {formatPrice((course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2), currency)}
        </p>
      </div>
    </Link>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    courseThumbnail: PropTypes.string.isRequired,
    courseTitle: PropTypes.string.isRequired,
    educator: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    coursePrice: PropTypes.number.isRequired,
    discount: PropTypes.number,
    rating: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ]),
  }).isRequired,
};

export default CourseCard;