const Form = () => {
  return (
    <form action="">
      {/* div.mb-3>label.form-label+input.form-control kemudian tab*/}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input id="name" type="text" className="form-control" />
      </div>
      {/* div.mb-3>label.form-label+input[type=number].form-control */}
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input id="age" type="number" className="form-control" />
      </div>
      {/* button.btn.btn-primary cara menulis 2 className dalam 1 tag */}
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
