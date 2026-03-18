import styles from "./AiAgents.module.css";
import Button from "./ui/Button";

export default function AiAgents() {
  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        <div className={styles.grid}>
          <div className={`${styles.tableWrap} animate-on-scroll`}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>Before Toffee</th>
                  <th>After Toffee</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>AI discoverability</td>
                  <td className={styles.before}>Low</td>
                  <td className={styles.after}>High</td>
                </tr>
                <tr>
                  <td>Product data structure</td>
                  <td className={styles.before}>Inconsistent</td>
                  <td className={styles.after}>Optimized</td>
                </tr>
                <tr>
                  <td>Agent conversion rate</td>
                  <td className={styles.before}>~2%</td>
                  <td className={styles.after}>~12%</td>
                </tr>
                <tr>
                  <td>Revenue from AI channels</td>
                  <td className={styles.before}>Negligible</td>
                  <td className={styles.after}>Growing</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={`${styles.copy} animate-on-scroll`}>
            <h2 className={styles.heading}>
              New shopaholics: AI&nbsp;Agents
            </h2>
            <p className={styles.rhetorical}>
              <em>How do I make my webpage appealing to AI?</em>
            </p>
            <p className={styles.body}>
              AI shopping agents are transforming e-commerce. They don&rsquo;t
              browse like humans — they parse, compare, and decide in
              milliseconds. Toffee ensures your storefront speaks their
              language.
            </p>
            <Button href="/learn-more" variant="text">
              Find Out →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
