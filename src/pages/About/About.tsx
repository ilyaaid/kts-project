import React from 'react';
import Text from 'components/Text';
import styles from './About.module.scss';

const About: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className={styles.inner}>
        <Text view="title" className={styles.title}>
          About Us
        </Text>
        <Text view="p-20" className={styles.about}>
          Welcome to our online store, where quality meets style! We are passionate about bringing you beautifully
          designed, functional products that enhance your everyday life.
        </Text>
        <Text view="subtitle" className={styles.subtitle}>
          Our Story
        </Text>
        <Text view="p-20" color="secondary" className={styles.story}>
          Founded with a vision to create affordable yet high-quality home furnishings, we have grown from a small local
          workshop to a trusted online retailer. Our journey began with a simple idea: to combine natural materials like
          wood and wool into timeless designs that would last for generations.
        </Text>
      </div>
    </div>
  );
};

export default About;
