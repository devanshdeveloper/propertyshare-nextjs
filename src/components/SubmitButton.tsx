function SubmitButton({ submit }) {
  return (
    <button onClick={() => submit()} className="btn btn-default">
      Save
    </button>
  );
}

export default SubmitButton;
