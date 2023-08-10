import { FormEvent, useRef, useState } from "react";

const Form = () => {
  // typescript compiler tidak tau yang diferensikan apa aja
  // karena menggunaka useRef hook bisa mereferensikan apa aja di DOM, tidak pasti input field
  // bisa jadi, button, heading dll
  // gunakan <HTMLInputElement> agar useRef tau menggunakan html element
  // alasan kenapa harus menggunakan null tiap useRef
  // .current property pada ref object, mereferensikan pada Dom Node
  // null value digunakan untuk akses ke DOM
  // pertama kali saat menggunakan useRef tidak bisa akses ke DOM Node, jika kosong maka 'unidentified'
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person = { name: "", age: 0 };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // gunakan if agar tidak error
    if (nameRef.current !== null) person.name = nameRef.current.value;
    if (ageRef.current !== null) person.age = parseInt(ageRef.current.value);
    console.log(person);
  };

  const [people, setPeople] = useState({
    name: "",
    age: "",
  });

  const handlePeopleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(people);
  };

  return (
    <form
      // onSubmit={handleSubmit}
      onSubmit={handlePeopleSubmit}
      className="p1-6-3 handling-form-submission"
    >
      {/* div.mb-3>label.form-label+input.form-control kemudian tab*/}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          value={people.name}
          onChange={(event) =>
            setPeople({ ...people, name: event.target.value })
          }
          // ref={nameRef}
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      {/* div.mb-3>label.form-label+input[type=number].form-control */}
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          value={people.age}
          // age tidak perlu arse int, karena initail value people.age = ""
          onChange={(event) =>
            setPeople({ ...people, age: event.target.value })
          }
          // ref={ageRef}
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      {/* button.btn.btn-primary cara menulis 2 className dalam 1 tag */}
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
