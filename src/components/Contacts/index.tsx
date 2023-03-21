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
        style="primary"
        faIcon="fas fa-envelope"
        iconOnlyOnMobile={true}
        target="_blank"
        rel="noopener noreferrer"
      />
      <Button
        name="GitHub"
        href="https://github.com/fityannugroho"
        style="primary"
        faIcon="fa-brands fa-github"
        iconOnlyOnMobile={true}
        target="_blank"
        rel="noopener noreferrer"
      />
      <Button
        name="YouTube"
        href="https://youtube.com/@fityannugroho"
        style="primary"
        faIcon="fa-brands fa-youtube"
        iconOnlyOnMobile={true}
        target="_blank"
        rel="noopener noreferrer"
      />
      <Button
        name="Twitter"
        href="https://twitter.com/fityannugroho"
        style="primary"
        faIcon="fa-brands fa-twitter"
        iconOnlyOnMobile={true}
        target="_blank"
        rel="noopener noreferrer"
      />
      <Button
        name="Instagram"
        href="https://www.instagram.com/fityannugroho"
        style="primary"
        faIcon="fa-brands fa-instagram"
        iconOnlyOnMobile={true}
        target="_blank"
        rel="noopener noreferrer"
      />
      <Button
        name="Telegram"
        href="https://t.me/fityannugroho"
        style="primary"
        faIcon="fa-brands fa-telegram"
        iconOnlyOnMobile={true}
        target="_blank"
        rel="noopener noreferrer"
      />
      <Button
        name="Medium"
        href="https://fityannugroho.medium.com"
        style="primary"
        faIcon="fa-brands fa-medium"
        iconOnlyOnMobile={true}
        target="_blank"
        rel="noopener noreferrer"
      />
    </div>
  );
}
