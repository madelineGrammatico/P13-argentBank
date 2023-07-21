import { useSelector } from "react-redux"

import { StorageOver } from '../../features/utils/storage'
import { getData } from '../../features/utils/getData'

import styles from "./Accueil.module.css"
import chatIcon from "../../assets/icons/icon-chat.png"

export function Accueil() {
  const user = useSelector((state) => state.user)
  if (StorageOver.isStorage("jwtToken") && !user.connected) {
    getData()
  }
  
  return (
      <main>
    <div className={styles.hero}>
      <section className={styles["hero-content"]}>
        <h2 className="sr-only">Promoted Content</h2>
        <p className={styles.subtitle}>No fees.</p>
        <p className={styles.subtitle}>No minimum deposit.</p>
        <p className={styles.subtitle}>High interest rates.</p>
        <p className={styles.text}>Open a savings account with Argent Bank today!</p>
      </section>
    </div>
    <section className={styles.features}>
      <h2 className={styles["sr-only"]}>Features</h2>
      <div className={styles["feature-item"]}>
        <img src={chatIcon} alt="Chat Icon" className={styles["feature-icon"]} />
        <h3 className="feature-item-title">You are our #1 priority</h3>
        <p>
          Need to talk to a representative? You can get in touch through our
          24/7 chat or through a phone call in less than 5 minutes.
        </p>
      </div>
      <div className={styles["feature-item"]}>
        <img
          src={chatIcon}
          alt="Chat Icon"
          className={styles["feature-icon"]}
        />
        <h3 className="feature-item-title">More savings means higher rates</h3>
        <p>
          The more you save with us, the higher your interest rate will be!
        </p>
      </div>
      <div className={styles["feature-item"]}>
        <img
          src={chatIcon}
          alt="Chat Icon"
          className={styles["feature-icon"]}
        />
        <h3 className="feature-item-title">Security you can trust</h3>
        <p>
          We use top of the line encryption to make sure your data and money
          is always safe.
        </p>
      </div>
    </section>
  </main>
      
      
  )
}