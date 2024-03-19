import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { urlSearchMovieCast } from "../axiosAPI";
import { TiUser } from "react-icons/ti";
import css from "./MovieCast.module.css";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieCast() {
    const { id } = useParams(); 
    const [castInfo, setCastInfo] = useState(null);

    useEffect(() => {
        async function fetchMovieCast() {
            try {
                if (!id) return;
                
                const movieData = await urlSearchMovieCast(id);
                setCastInfo(movieData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchMovieCast();
    }, [id]);

    return (
        <ul className={css.castList}>
            {castInfo && castInfo.cast.map((actor) => (
                <li key={actor.id} className={css.castItem}>
                    <div className={css.actorImage}>
                        {actor.profile_path ? (
                            <img 
                                src={baseUrl + actor.profile_path} 
                                alt={actor.original_name} 
                                width={100} 
                                height={100} 
                            />
                        ) : (
                            <div className={css.placeholderIcon}>
                                <TiUser />
                            </div>
                        )}
                    </div>
                    <div className={css.actorDetails}>
                        <p>{actor.original_name}</p>
                        <p>
                            <b>Character: </b><br />
                            {actor.character}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}
