import { ReactNode } from "react"
import styles from "../components/GameCard.module.css"
interface Props {
    children: ReactNode
}
export default function GameCard({children}: Props) {
    return (
        <div className={styles.gameCard}>
            {children}
        </div>
    )
}