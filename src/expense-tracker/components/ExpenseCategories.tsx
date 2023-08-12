interface CategoriesProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const ExpenseCategories = ({
  categories,
  onSelectCategory,
}: CategoriesProps) => {
  return (
    <select
      name="category"
      id="category"
      className="mb-3 form-select"
      onChange={(event) => onSelectCategory(event.target.value)}
    >
      <option value="">- Categories -</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default ExpenseCategories;
