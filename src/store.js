import Vuex from 'vuex'
import Vue from "vue";

Vue.use(Vuex);

function splitUpAndSortByFirstLetter(itemList) {
  const entriesByFirstLetter = []
  itemList.map(item => {
    const firstLetter = item.name.charAt(0).toUpperCase()
    const index = entriesByFirstLetter.findIndex((arr) => arr[0] === firstLetter)

    if (index === -1) {
      entriesByFirstLetter.push([firstLetter, item])
    } else {
      entriesByFirstLetter[index].push(item)
    }
  })
  return entriesByFirstLetter
}

function newGroceryItemId(state) {
  if (state.groceryList && state.groceryList.length) {
    return (
      Math.max.apply(
        Math,
        state.groceryList.map(function (item) {
          return item.id;
        })
      ) + 1
    );
  } else return 0
}

function newMealId(state) {
  if (state.mealPlan && state.mealPlan.length) {
    return (
      Math.max.apply(
        Math,
        state.mealPlan.map(function (item) {
          return item.id;
        })
      ) + 1
    );
  } else return 0;
}

export default new Vuex.Store({
    state: {
      groceryList: [],
      mealPlan: [],
    },
    mutations: {
      setGroceryList(state, newList){
        if (newList === undefined) return
        state.groceryList = newList
        localStorage.setItem("grocerylist", JSON.stringify(state.groceryList))
      },
      setMealPlan(state, newPlan){
        if (newPlan === undefined) return
        state.mealPlan = newPlan
        localStorage.setItem("mealPlan", JSON.stringify(state.mealPlan))
      },
      setItemPlanned(state, index){
        const clonedWithNewState = [...state.groceryList]
        const isPlanned = clonedWithNewState[index].planned
        clonedWithNewState[index].planned = !isPlanned
        state.groceryList = clonedWithNewState
        if (clonedWithNewState === undefined) return
        localStorage.setItem("grocerylist", JSON.stringify(state.groceryList))
      },
      addNewItem(state, name){
        const clonedList = [...state.groceryList]
        let index = clonedList.findIndex(
          (listItem) => listItem.name === name
        )
        if (name === undefined || name.length === 0) return
        if (index == -1) {
          clonedList.push({
            name: name,
            planned: true,
            id: newGroceryItemId(state),
          })
        } else {
          clonedList[index].planned = true
        }
        state.groceryList = clonedList
        localStorage.setItem("grocerylist", JSON.stringify(state.groceryList));
      },
      deleteSingleItem(state, element) {
        const index = state.groceryList
          .map(function (entry) {
            return entry.name
          })
          .indexOf(element.name)
        state.groceryList.splice(index, 1)
        localStorage.setItem("grocerylist", JSON.stringify(state.groceryList))
      },
      checkSingleItem(state, element) {
          const indexGrocerylist = state.groceryList
            .map(function (element) {
              return element.name
            })
            .indexOf(element.name)
          if (state.groceryList[indexGrocerylist]) {
            state.groceryList[indexGrocerylist].planned = false
            state.groceryList[indexGrocerylist].quantity = ''
          }
          localStorage.setItem("grocerylist", JSON.stringify(state.groceryList))
      },
      addNewMeal(state, payload) {
        const clonedList = [...state.mealPlan]
        let index = state.mealPlan.findIndex((listItem) => listItem.name === payload.mealName);
        if (index == -1) {
          clonedList.push({
            name: payload.mealName,
            planned: true,
            id: newMealId(state),
            ingredients: payload.ingredients,
          })
        } else {
          clonedList[index].planned = true
        }
        state.mealPlan = clonedList
        localStorage.setItem("mealPlan", JSON.stringify(state.mealPlan))
      },
      setMealPlanned(state, index) {
        const clonedWithNewState = [...state.mealPlan]
        const isPlanned = clonedWithNewState[index].planned
        clonedWithNewState[index].planned = !isPlanned
        state.mealPlan = clonedWithNewState
        if (clonedWithNewState === undefined) return
        localStorage.setItem("mealPlan", JSON.stringify(state.mealPlan))
      },
      deleteSingleMeal(state, element) {
        const index = state.mealPlan
        .map(function (entry) {
          return entry.name
        })
        .indexOf(element.name)
      state.mealPlan.splice(index, 1)
      localStorage.setItem("mealPlan", JSON.stringify(state.mealPlan))
      },
    },
    getters: {
        getGroceryList: (state) => {
            return state.groceryList.sort((a, b) => a.name.localeCompare(b.name))
        },
        getMealPlan: (state) => {
            return state.mealPlan.sort((a, b) => a.name.localeCompare(b.name))
        },
        getSplitItemsByFirstLetter: (state) => {
            return splitUpAndSortByFirstLetter(state.groceryList)
        },
        getSplitMealsByFirstLetter: (state) => {
            return splitUpAndSortByFirstLetter(state.mealPlan)
        }
    },
})