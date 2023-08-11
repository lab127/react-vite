import { FormEvent, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const expenseSchema = z.object({
  // id: z.number(),
  description: z
    .string()
    .min(1, { message: "Description must be at least 3 characters." }),
  amount: z
    .number({ invalid_type_error: "Amount field is required." })
    .min(1, { message: "Amount must be at least 1." }),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

const onExpenseSubmit = (data: FieldValues) => console.log(data);

const ExpenseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(expenseSchema) });

  return (
    <form className="mb-3" onSubmit={handleSubmit(onExpenseSubmit)}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          type="text"
          id="description"
          className="form-control"
        />
        <p className="text-danger">{errors.description?.message}</p>
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
