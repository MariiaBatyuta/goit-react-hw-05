import { useEffect, useState } from "react";
import { urlSearchMovieReviews } from "../axiosAPI";
import { useParams } from "react-router-dom";

export default function MovieReviews() {
    const [review, setReview] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchMovieReviews() {
            try {
                if (!id) return;

                const movieData = await urlSearchMovieReviews(id);
                setReview(movieData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchMovieReviews();
    }, [id]);

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
