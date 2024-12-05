import React, { useEffect } from 'react';

const AllReviews = () => {
    useEffect(() => {
        document.title = "Add Reviews | Chill Gamer";
      }, []);
    return (
        <div className='text-center my-5'>
            <h2>all review</h2>
        </div>
    );
};

export default AllReviews;