<template>
    <div id="app">
        <transition name="fade">
            <Navbar v-if="menuShown" :menuShown="menuShown" :toggleFunction="showMenu" />
        </transition>
    
        <button v-if="!menuShown" id="toggle-nav-BTN" class="btn" style="font-size: 2.5em" @click="showMenu">
                                              🍔
                                            </button>
    
        <h1 class="p-5 text-white mb-5">Meal Planner</h1>
        <form action="post" class="d-grid gap-2" style="width: 400px; max-width: 95vw; margin: 0 auto">
            <input class="form-control mb-2" type="text" v-model="newMeal" placeholder="Add new dish" maxlength="30" />
            <input class="form-control mb-2" type="text" v-model="newGroceryItem" placeholder="Add new grocery item" maxlength="30" />
            <button class="btn btn-primary mb-2" @click="formSubmit">Add</button>
        </form>
    
        <br />
        <br />
    
        <div class="container">
            <div class="row justify-content-center">
                <transition name="fade">
                    <Meallist v-if="!cookbookShown && !itemlistShown" :cookBook="cookBook" :function2="checkSingleMeal" :function3="showCookbook" />
                </transition>
                <transition name="fade">
                    <div v-if="!cookbookShown && !itemlistShown" class="col-lg-1"></div>
                </transition>
                <transition name="fade">
                    <GroceryList v-if="!itemlistShown && !cookbookShown" :groceryList="groceryList" :function2="checkSingleItem" :function3="showItemlist" />
                </transition>
                <transition name="fade">
                    <Cookbook v-if="cookbookShown && !itemlistShown" :cookBook="cookBook" :function="showCookbook" :pushMealFromCookbook="pushNewMealfromCookbook" :function2="deleteCookbook" :function3="deleteSingleItem" />
                </transition>
                <transition name="fade">
                    <Supplylist v-if="itemlistShown && !cookbookShown" :groceryList="groceryList" :function="showItemlist" :someFunction="pushNewItemfromList" :function2="deleteGrocerylist" :function3="deleteSingleItem" />
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "./components/Navigation.vue";
import GroceryList from "./components/Grocerylist.vue";
import Meallist from "./components/Meallist.vue";
import Cookbook from "./components/Cookbook.vue";
import Supplylist from "./components/Supplylist.vue";
import supplylist from "./static/supplylist.json";
import cookbook from "./static/cookbook.json";





export default {
    name: "App",
    components: {
        Navbar,
        GroceryList,
        Meallist,
        Cookbook,
        Supplylist,
    },
    data: function() {
        return {
            groceryList: JSON.parse(localStorage.getItem("grocerylist")) || supplylist,
            menuShown: false,
            cookbookShown: false,
            itemlistShown: false,
            newMeal: "",
            newGroceryItem: "",
            cookBook: JSON.parse(localStorage.getItem("cookbook")) || cookbook,
        };
    },
    methods: {

        showMenu: function() {
            this.menuShown = !this.menuShown;
        },
        showCookbook: function() {
            this.cookbookShown = !this.cookbookShown;
        },
        showItemlist: function() {
            this.itemlistShown = !this.itemlistShown;
        },
        pushNewMeal: function() {
            let index = this.cookBook.findIndex(item => item.name === this.newMeal);
            if (index == -1) {
                this.cookBook.push({ name: this.newMeal, planned: true });
            } else {
                this.cookBook[index].planned = true;
            }

            localStorage.setItem("cookbook", JSON.stringify(this.cookBook));
            this.newMeal = "";
        },
        pushNewGroceryItem: function() {
            let index = this.groceryList.findIndex(item => item.name === this.newGroceryItem);
            if (index == -1) {
                this.groceryList.push({ name: this.newGroceryItem, planned: true, id: Math.random() });
            } else {

                this.groceryList[index].planned = true;
            }

            localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
            this.newGroceryItem = "";
        },
        pushNewMealfromCookbook: function(element) {
            const index = this.cookBook
                .map(function(element) {
                    return element.name;
                })
                .indexOf(element);
            if (this.cookBook[index].planned == false) {
                this.cookBook[index].planned = true;
            } else {
                this.cookBook[index].planned = false;
            }


        },
        pushNewItemfromList: function(element) {
            const index = this.groceryList.map(function(element) {
                return element.name;
            }).indexOf(element);
            if (this.groceryList[index].planned == false) {
                this.groceryList[index].planned = true;
            } else {
                this.groceryList[index].planned = false;
            }

            console.log(this.groceryList);
        },
        formSubmit: function(event) {
            event.preventDefault();
            if (this.newGroceryItem.length > 0) {
                this.pushNewGroceryItem();
            }
            if (this.newMeal.length > 0) {
                this.pushNewMeal();
            }
        },
        deleteGrocerylist: function() {
            let confirmed = confirm("Do you really want to delete your list?");
            if (confirmed) {
                this.groceryList = [];
                localStorage.removeItem("grocerylist");
                this.itemlistShown = false;
            }
        },
        deleteCookbook: function() {
            let confirmed = confirm("Do you really want to delete your list?");
            if (confirmed) {
                this.cookBook = [];
                localStorage.removeItem("cookbook");
                this.cookbookShown = false;
            }
        },
        deleteSingleItem: function(array, element) {
            const index = array
                .map(function(element) {
                    return element.name;
                })
                .indexOf(element);
            array.splice(index, 1);
            localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
        },
        checkSingleMeal: function(element) {


            const indexCookbook = this.cookBook.map(function(element) {
                return element.name;
            }).indexOf(element);
            if (this.cookBook[indexCookbook]) {
                this.cookBook[indexCookbook].planned = false;
            }
            localStorage.setItem("cookbook", JSON.stringify(this.cookBook));
        },

        checkSingleItem: function(element) {
            const indexGrocerylist = this.groceryList.map(function(element) {
                return element.name;
            }).indexOf(element);
            if (this.groceryList[indexGrocerylist]) {
                this.groceryList[indexGrocerylist].planned = false;
            }
            localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
        }
    },

};
</script>

<style>
@font-face {
    font-family: "niceFont";
    src: url("./assets/niceFont.ttf");
}

h1 {
    font-family: niceFont;
    font-weight: bolder;
    background-image: linear-gradient( to bottom, rgba(23, 23, 24, 0.52), rgba(31, 21, 28, 0.73)), url("./assets/food-header.jpg");
}

h3 {
    font-weight: bolder;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    min-height: 100vh;
    background-image: linear-gradient(to right, #ff8008, #ffc837);
}

#toggle-nav-BTN {
    position: absolute;
    right: 2px;
    top: 2px;
}

li {
    list-style-type: none;
}

ul {
    padding: 0;
}

p {
    font-size: 1.5em;
}

.illustration {
    width: 30%;
    min-width: 150px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

    {
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */

    {
    transform: translateX(20px) translateY(5px) scale(0.5);
    opacity: 0;
}

.btn-success {
    border-radius: 0;
}

svg {
    color: white;
    margin-right: 8px;
}
</style>
