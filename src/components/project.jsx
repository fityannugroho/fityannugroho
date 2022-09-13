import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import Button from './button';
import styles from './project.module.css';

/**
 * The project component.
 *
 * Use `data` prop to pass the project data (required).
 *
 * @param {Object} props The component props.
 * @return {JSX.Element} The project component.
 */
export default function Project({data}) {
  const {locale} = useRouter();

  // Get the project data based on the locale.
  data.title = data[locale]?.title ?? data.title;
  data.description = data[locale]?.description ?? data.description;

  return (
    <div className={styles.project}>
      <h3 className={styles.title}>{data.title}</h3>
      <p>{data.description}</p>
      <div className={styles.buttons}>
        {data.github && (
          <Button
            href={`https://github.com/${data.github}`}
            name='GitHub'
            style='light-outline'
            faIcon='fa-brands fa-github'
            iconOnly={true}
            target='_blank'
            rel='noopener noreferrer'
          />
        )}
        {data.deploy && (
          <Button
            href={data.deploy}
            name='Demo'
            style='light-outline'
            faIcon='fa-solid fa-play'
            iconOnlyOnMobile={true}
            target='_blank'
            rel='noopener noreferrer'
          />
        )}
        {data.download && (
          <Button
            href={data.download}
            name='Download'
            style='light-outline'
            faIcon='fa-solid fa-download'
            iconOnlyOnMobile={true}
            target='_blank'
            rel='noopener noreferrer'
          />
        )}
      </div>
    </div>
  );
}

Project.propTypes = {
  data: PropTypes.object.isRequired,
};
