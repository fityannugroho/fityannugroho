import Button from '@/components/Button';
import styles from './contacts.module.css';

/**
 * The contact list component.
 */
export default function Contacts() {
  return (
    <div className={styles.contacts}>
      <Button
        name="Email"
        href="mailto:fityannugroho@gmail.com"
        variant="primary"
        faIcon="fas fa-envelope"
        iconOnlyOnMobile
        target="_blank"
        rel="noopener noreferrer"
      />
      <Button
        name="GitHub"
        href="https://github.com/fityannugroho"
        variant="primary"
        faIcon="fa-brands fa-github"
        iconOnlyOnMobile
        target="_blank"
        rel="noopener noreferrer"
      />
      <Button
        name="YouTube"
        href="https://youtube.com/@fityannugroho"
        variant="primary"
        faIcon="fa-brands fa-youtube"
        iconOnlyOnMobile
        target="_blank"
        rel="noopener noreferrer"
      />
      <Button
        name="Twitter"
        href="https://twitter.com/fityannugroho"
        variant="primary"
        faIcon="fa-brands fa-twitter"
        iconOnlyOnMobile
        target="_blank"
        rel="noopener noreferrer"
      />
      <Button
        name="Instagram"
        href="https://www.instagram.com/fityannugroho"
        variant="primary"
        faIcon="fa-brands fa-instagram"
        iconOnlyOnMobile
        target="_blank"
        rel="noopener noreferrer"
      />
      <Button
        name="Telegram"
        href="https://t.me/fityannugroho"
        variant="primary"
        faIcon="fa-brands fa-telegram"
        iconOnlyOnMobile
        target="_blank"
        rel="noopener noreferrer"
      />
      <Button
        name="Medium"
        href="https://fityannugroho.medium.com"
        variant="primary"
        faIcon="fa-brands fa-medium"
        iconOnlyOnMobile
        target="_blank"
        rel="noopener noreferrer"
      />
    </div>
  );
}
