import React, { useEffect } from 'react';

const MyReviews = () => {
    useEffect(() => {
        document.title = "My Reviews | Chill Gamer";
      }, []);
    return (
        <div className='text-center my-5'>
            <h2>My reviews</h2>
            

        </div>
    );
};

export default MyReviews;