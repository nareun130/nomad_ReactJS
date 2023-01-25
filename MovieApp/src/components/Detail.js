import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Movie.module.css"
function Detail() {
  const { id } = useParams(); //ReactRoute가 id값을 찾아오는 곳
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  // console.log(id);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    // console.log(json);
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.movie}>
          <img src={movie.medium_cover_image} alt={movie.title} className={styles.movie__img}/>
          <div>
          <h1 className={styles.movie__title}>{movie.title}</h1>
          <p>{movie.description_intro}</p>
          <b>genres</b>
          <br />
          <ul className={styles.movie__genres}>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;
