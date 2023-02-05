import { useState } from 'react';

import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './FeedbackOptions/Section/Section';
import Notification from 'shared/Notification/Notification';

import styles from './feedback.module.scss';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = name => {
    setFeedbacks(prevState => {
      const value = prevState[name];
      return { ...prevState, [name]: value + 1 };
    });
  };
  const { good, neutral, bad } = feedbacks;
  const total = feedbacks.good + feedbacks.neutral + feedbacks.bad;

  const countPositiveFeedbackPercentage = propName => {
    if (!total) {
      return 0;
    }
    const positivePercentage = feedbacks.good;
    const result = ((positivePercentage / total) * 100).toFixed(2);
    return Number(result);
  };

  const positivePercentage = countPositiveFeedbackPercentage('good');

  return (
    <div className={styles.wrapper}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          onLeaveFeedback={onLeaveFeedback}
          options={Object.keys(feedbacks)}
        />
      </Section>
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default Feedback;
