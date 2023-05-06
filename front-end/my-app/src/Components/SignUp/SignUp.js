import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';


const SignUp = () => {
    return (
        <div className={styles.signUp}>
            <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
    )
}

export default SignUp;