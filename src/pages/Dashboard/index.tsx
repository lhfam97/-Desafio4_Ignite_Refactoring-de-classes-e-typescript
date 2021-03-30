import { useState, useEffect } from "react";
import React from "react";
import { Header } from "../../components/Header";
import api from "../../services/api";
import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import { FoodType } from "../../@types/FoodType";

export function Dashboard() {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [editingFood, setEditingFood] = useState<FoodType>({} as FoodType);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     foods: [],
  //     editingFood: {},
  //     modalOpen: false,
  //     editModalOpen: false,
  //   }
  // }

  // async componentDidMount() {
  //   const response = await api.get('/foods');

  //   this.setState({ foods: response.data });
  // }

  useEffect(() => {
    async function getFood() {
      const response = await api.get("/foods");
      setFoods(response.data);
    }
    getFood();
  }, []);

  async function handleAddFood(food: FoodType): Promise<void> {
    try {
      const response = await api.post<FoodType>("/foods", {
        ...food,
        available: true
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: FoodType): Promise<void> => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food
      });

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );
      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  // handleUpdateFood = async food => {
  //   const { foods, editingFood } = this.state;

  //   try {
  //     const foodUpdated = await api.put(
  //       `/foods/${editingFood.id}`,
  //       { ...editingFood, ...food },
  //     );

  //     const foodsUpdated = foods.map(f =>
  //       f.id !== foodUpdated.data.id ? f : foodUpdated.data,
  //     );

  //     this.setState({ foods: foodsUpdated });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);
    setFoods(foodsFiltered);
  };
  // handleDeleteFood = async id => {
  //   const { foods } = this.state;

  //   await api.delete(`/foods/${id}`);

  //   const foodsFiltered = foods.filter(food => food.id !== id);

  //   this.setState({ foods: foodsFiltered });
  // }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEditFood = (food: FoodType) => {
    setEditingFood(food);
    setIsEditModalOpen(!isEditModalOpen);
  };
  // handleEditFood = food => {
  //   this.setState({ editingFood: food, editModalOpen: true });
  // }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={isModalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={isEditModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
