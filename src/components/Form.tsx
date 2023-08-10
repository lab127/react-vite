import { FormEvent, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// z bisa untu mendefinisikan bentuk atau skema validasi
// penerapan message dan invalid_type_error
const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  age: z
    .number({ invalid_type_error: "Age field is required." })
    .min(18, { message: "Age must be at least 18." }),
});

// cara ekstrak skema object
// fungsi sama seperti `interface FormData`
type ZFormData = z.infer<typeof schema>;

// pass data useForm()
interface FormData {
  name: string;
  age: number;
}

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

  const handleEventSubmit = (event: FormEvent) => {
    event.preventDefault();
    // gunakan if agar tidak error
    if (nameRef.current !== null) person.name = nameRef.current.value;
    if (ageRef.current !== null) person.age = parseInt(ageRef.current.value);
    console.log(person);
  };

  // cara lain kontrol komponen selain ref, yaitu menggunakan useState
  const [people, setPeople] = useState({
    name: "",
    age: "",
  });

  const handlePeopleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(people);
  };

  // destruktur useForm() register, handleSubmit, formState
  // nama sudah tidak bisa diganti-ganti
  // cara destruktur fromState properti
  // bernama nested destructuring
  // useForm<FormData>() pass interface
  // setelah membuat interface FormData
  // saat mengitik `errors.` akan terlihat interface
  // age? name? root?
  // useForm<ZFormData>({ resolver: zodResolver(schema) });
  // penulisan menggunakan zod
  // disable submit button jika form invalid formState: { errors, isValid }
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ZFormData>({ resolver: zodResolver(schema) });

  // hover `data` untuk mengetahui type FieldValues
  const onFormSubmit = (data: FieldValues) => console.log(data);

  return (
    <form
      // onSubmit={handleEventSubmit}
      // onSubmit={handlePeopleSubmit}
      // gunakan useForm object function
      onSubmit={handleSubmit(onFormSubmit)}
      className="p1-6-3 handling-form-submission"
    >
      {/* div.mb-3>label.form-label+input.form-control kemudian tab*/}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          // validasi rule sudah ada di schema
          {...register("name")}
          // {...register("name", { required: true, minLength: 3 })}
          // value={people.name}
          // onChange={(event) =>
          //   setPeople({ ...people, name: event.target.value })
          // }
          // ref={nameRef}
          id="name"
          type="text"
          className="form-control"
        />
        {/* `errors.name?.` adalah optional changing
        artinya akan berjalan jika error mempunyai properti name. jika tidak, maka diabaikan.
        Di bawah ini contoh 1 baris kondisional logic menggunakan && 
        Saat mengetik `errors.` tidak terlihat nama input field, hanya `root?`. ini dikarenakan typescript compiler tidak mengenali input field kita. maka, untuk type safety, kita buat interface untuk definikan property input field*/}
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
        {/* tidak digunakan karena sudah menggukana schema.
        sebagai ganti menggunakan 1 paragraf kondisional seperti di atas dengan mengganti boolean expression
        {errors.name?.type === "minLength" && (
          <p className="text-danger">The name must be at least 3 characters</p>
        )} */}
      </div>
      {/* div.mb-3>label.form-label+input[type=number].form-control */}
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          // { valueAsNumber: true } agar value selalu number
          {...register("age", { valueAsNumber: true })}
          // age tidak perlu parse int, karena initail value people.age = ""
          // value={people.age}
          // onChange={(event) =>
          //   setPeople({ ...people, age: event.target.value })
          // }
          // ref={ageRef}
          id="age"
          type="number"
          className="form-control"
        />
        {/* di bawah ini menggunakan zod */}
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
      {/* button.btn.btn-primary cara menulis 2 className dalam 1 tag */}
      <button disabled={!isValid} className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
