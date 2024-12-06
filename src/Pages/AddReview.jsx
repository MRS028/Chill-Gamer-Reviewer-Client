import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    gameCover: "",
    gameTitle: "",
    reviewDescription: "",
    rating: "",
    publishingYear: "",
    genre: "",
  });

  const userEmail = user?.email;
  const userName = user?.displayName;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      gameCover,
      gameTitle,
      publishingYear,
      reviewDescription,
      rating,
      genre,
    } = formData;

    const newReview = {
      gameCover,
      gameTitle,
      publishingYear,
      userEmail,
      reviewDescription,
      rating,
      genre,
      userName,
    };

    // console.log(newReview);


    fetch("http://localhost:5000/allreviews",{
        method: 'POST',
        headers : {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(newReview)
    })
    .then(res=> res.json())
    .then(data=>{
        if(data.insertedId){
            Swal.fire({
                title: "Success!",
                text: "Your review has been submitted successfully.",
                icon: "success",
                confirmButtonText: "OK",
              });

        }
        // console.log(data);
    })

    

    setFormData({
      gameCover: "",
      gameTitle: "",
      reviewDescription: "",
      rating: "",
      publishingYear: "",
      genre: "",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-100 shadow-md border rounded-md mt-10 mb-12">
      <h1 className="text-3xl font-bold mb-6 text-base-content text-center">
        Add New Review
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Column */}
        <div className="space-y-4 font-semibold text-xl text-base-content">
          <div>
            <label className="label">
              <span className="label-text text-base-content">
                Game Cover URL
              </span>
            </label>
            <input
              name="gameCover"
              value={formData.gameCover}
              onChange={handleChange}
              placeholder="https://example.com/cover.jpg"
              className="input input-bordered w-full h-12 bg-base-200 text-base-content"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content">Game Title</span>
            </label>
            <input
              type="text"
              name="gameTitle"
              value={formData.gameTitle}
              onChange={handleChange}
              placeholder="Enter game title"
              className="input input-bordered w-full h-12 bg-base-200 mt-[5px] text-base-content"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content">
                Publishing Year
              </span>
            </label>
            <input
              type="number"
              name="publishingYear"
              value={formData.publishingYear}
              onChange={handleChange}
              placeholder="Ex: 2024"
              className="input input-bordered w-full h-12 bg-base-200 text-base-content"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content">User Email</span>
            </label>
            <input
              type="email"
              value={userEmail}
              readOnly
              className="input input-bordered w-full h-12 bg-base-200 text-base-content "
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 font-semibold text-xl text-base-content">
          <div>
            <label className="label">
              <span className="label-text text-base-content">
                Review Description
              </span>
            </label>
            <textarea
              name="reviewDescription"
              value={formData.reviewDescription}
              onChange={handleChange}
              placeholder="Write a detailed review..."
              className="textarea textarea-bordered w-full h-12 bg-base-200 text-base-content"
              required
            ></textarea>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content">Rating</span>
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rate (1-10)"
              min="1"
              max="10"
              className="input input-bordered w-full h-12 bg-base-200 text-base-content"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content">Genre</span>
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="select select-bordered w-full h-12 bg-base-200 text-base-content"
              required
            >
              <option value="" disabled>
                Select Genre
              </option>
              <option value="Action">Action</option>
              <option value="RPG">RPG</option>
              <option value="race">Race</option>
              <option value="Adventure">Adventure</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="E-Sports">E-Sports</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content">User Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={userName}
              readOnly
              className="input input-bordered w-full h-12 bg-base-200 text-base-content"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="btn bg-[#30beba] text-white font-semibold hover:bg-green-500 w-full h-12"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
