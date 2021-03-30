import { FoodType } from "../../../@types/FoodType";

export interface IModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: FoodType) => Promise<void>;
}
