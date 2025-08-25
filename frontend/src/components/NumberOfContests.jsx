export default function NumberOfContests({ numContests, setNumContests }) {
  return (
    <>
      <div>
        <label className="form-label fw-medium bold">Number of contests</label>
        <input
          type="number"
          min="1"
          value={numContests}
          onChange={(e) => setNumContests(Number(e.target.value))}
          className="form-control"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
          required
        />
      </div>
    </>
  );
}