import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

function RatingForm({ movie }) {
  const { id, category } = useParams();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [existingRating, setExistingRating] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${category}/${id}/rating?api_key=${API_KEY}`
      )
      .then((response) => {
        setExistingRating(response.data);
        setRating(response.data.value);
        setFeedback(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      value: rating,
      content: feedback,
    };
    if (existingRating) {
      axios
        .put(
          `https://api.themoviedb.org/3/${category}/${id}/rating?api_key=${API_KEY}`,
          data
        )
        .then((response) => {
          console.log(response);
          setExistingRating(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(
          `https://api.themoviedb.org/3/${category}/${id}/rating?api_key=${API_KEY}`,
          data
        )
        .then((response) => {
          console.log(response);
          setExistingRating(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input
          type="number"
          min="0"
          max="10"
          value={rating}
          onChange={handleRatingChange}
        />
      </label>
      <br />
      <label>
        Feedback:
        <textarea value={feedback} onChange={handleFeedbackChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
      {existingRating && (
        <p>
          Your rating: {existingRating.value}, Your feedback:{" "}
          {existingRating.content}
        </p>
      )}
    </form>
  );
}

export default RatingForm;
