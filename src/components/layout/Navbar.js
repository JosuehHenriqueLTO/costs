import {Link} from "react-router-dom"
import Container from "./Container"
import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'
// import {faFacebook, faInstagram, faLinkedin} from 'react-icons'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/"><img src={logo} alt="Costs" /></Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Home</Link></li>
                    <li className={styles.item}><Link to="/projects">Projects</Link></li>
                    <li className={styles.item}><Link to="/contact">Contact</Link></li>
                    <li className={styles.item}><Link to="/company">Company</Link></li>
                </ul>    
            </Container>
        </nav>
    )

}
export default Navbar