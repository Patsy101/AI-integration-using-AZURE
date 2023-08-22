import styles from '../Sheena/NavbarST.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'



export default function NavbarST() {
  

  return (
    <div className={styles.nav_bar}>
      <nav>
        <label className={styles.logo}>Turners - Find Your Car</label>

        <ul className={styles.nav_menu}>
          <li>
            <a href='#'>Home</a>
          </li>
          <li>
            <a href='#'>About</a>
          </li>
          <li>
            <a href='#'>Services</a>
          </li>
          <li>
            <a href='#'>Contact</a>
          </li>
          <li>
            <a href='#'>Feedback</a>
          </li>
        </ul>
        <FontAwesomeIcon icon={faBars} />
      </nav>
    </div>
  );
}
