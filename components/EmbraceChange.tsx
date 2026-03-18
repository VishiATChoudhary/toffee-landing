import styles from "./EmbraceChange.module.css";

const steps = [
  {
    number: "01",
    title: "Analyze",
    description:
      "We audit your storefront through the eyes of AI agents — evaluating product data structure, metadata quality, and machine readability.",
  },
  {
    number: "02",
    title: "Learn",
    description:
      "Our platform identifies exactly what AI shopping agents look for and where your competitors are already optimized.",
  },
  {
    number: "03",
    title: "Optimize",
    description:
      "Toffee applies targeted changes that make your products discoverable, comparable, and purchasable by AI agents.",
  },
];

export default function EmbraceChange() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={`${styles.heading} animate-on-scroll`}>
          Embrace change,
          <br />
          increase revenue
        </h2>

        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.number} className={`${styles.step} animate-on-scroll`}>
              <span className={styles.number}>{step.number}</span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
