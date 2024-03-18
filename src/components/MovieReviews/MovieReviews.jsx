import { useEffect, useState } from "react";
import { urlSearchMovieReviews } from "../axiosAPI"

export default function MovieReviews({ movieId }) {
    const [review, setReview] = useState(null);

    useEffect(() => {
        async function fetchMovieReviews() {
            try {
                if (!movieId) return;

                const movieData = await urlSearchMovieReviews(movieId);
                setReview(movieData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchMovieReviews();
    }, [movieId]);

    return (
    <>
        {review && review.results && review.results.length === 0
            ? (<p>We don&apos;t have any reviews for this movie</p>)
            : (
                review &&
                review.results &&
                review.results.map((rew) => (
                    <div key={rew.id}>
                        <p><b>{rew.author}</b></p>
                        <p>{rew.content}</p>
                    </div>
                ))
            )
        }
    </>
)
}
