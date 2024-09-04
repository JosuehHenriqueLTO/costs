// import {faFacebook, faInstagram, faLinkedin} from 'react-icons'
import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul>
                {/* <li className={styles.social_list}><faFacebook className={styles.itesocial_list}cebook /></li>
                <li className={styles.social_list}><faInstagram /></li>
                <li className={styles.social_list}><faLinkedin /></li> */}
                <p><span>Costs</span> &copy; 2024</p>
            </ul>
        </footer>
    )
}
export default Footer