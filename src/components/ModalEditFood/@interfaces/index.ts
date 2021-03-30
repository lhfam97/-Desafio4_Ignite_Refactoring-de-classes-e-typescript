import { FoodType } from "../../../@types/FoodType";

export interface IModalEditFood {
  handleUpdateFood: (food: FoodType) => void;
  setIsOpen: () => void;
  editingFood: FoodType;
  isOpen: boolean;
}
