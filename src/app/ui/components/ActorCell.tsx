import Movie from "@/app/classes/Movie";
import Actor from "@/app/classes/Actor";
import styles from "@/app/ui/components/actorCell.module.css";
interface props {
    actor: Actor;
}
export function ActorCell( {actor}: props) {
    return (
        <div className={styles.actorCell}>
            <img src={actor.profilePath ?? "/default-profile.jpeg" } width={145} height={25} alt={"icon"} className={styles.actor_image}/>
            <div className={styles.actorInfo}>
                <h1 className={styles.actorName}>{actor.name}</h1>
                <p className={styles.actorRole}>{actor.character}</p>
            </div>
        </div>
    );
}