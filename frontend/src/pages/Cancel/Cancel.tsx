export default function Cancel() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>❌ Payment Canceled</h1>
      <p>Your enrollment has not been processed.</p>
      <a href="/courses">Try again</a>
    </div>
  );
}
