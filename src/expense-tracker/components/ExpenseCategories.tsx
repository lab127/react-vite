interface CategoriesProps {
  onSelectCategory: (category: string) => void;
}

const ExpenseCategories = ({ onSelectCategory }: CategoriesProps) => {
  return (
    <select
      name="category"
      id="category"
      className="mb-3 form-select"
      onChange={(event) => onSelectCategory(event.target.value)}
    >
      <option value="">- Categories -</option>
      <option value="Groceries">Groceries</option>
      <option value="Utilities">Utilities</option>
      <option value="Entertainment">Entertainment</option>
    </select>
  );
};

export default ExpenseCategories;
