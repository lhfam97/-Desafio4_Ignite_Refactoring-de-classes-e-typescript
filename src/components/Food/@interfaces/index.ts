import { FoodType } from "../../../@types/FoodType";

export interface IFoodProps {
  food: FoodType;
  handleEditFood: (food: FoodType) => void;
  handleDelete: (id: number) => void;
}
