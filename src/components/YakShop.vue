<template>
  <div>    
    <label for="type">Type </label>
    <input type="text" id="type" v-model="type">
    <br />
    <label for="name">Name </label>
    <input type="text" id="name" v-model="name">
    <br />
    <label for="age">Age </label>
    <input type="number" id="age" v-model="age">
    <br />
    <button v-on:click="addNewAnimal()" :disabled="this.isAddNewAnimalD()">Add new animal</button>
    <button v-on:click="loadNewHerd()" :disabled="this.isHerdDisabled()" >Add new herd</button>
    <button v-on:click="resetHerd()">Reset herd</button>

    <ul >
    <li v-for="animal in newHerd" :key="animal.id">
      Type : {{animal.type}},
      Name : {{animal.name}},
      Age : {{animal.age}} yak years or {{yakYearsToDays(animal.age)}} human days
    </li>
  </ul>

  <label for="days">Days </label>
  <input type="number" id="days" v-model="daysStock">
  <br />
  <button v-on:click="getStock()">Get stock</button>

  <ul v-if="outcomeStock.milk && outcomeStock.skins">
    <li>
      Milk: {{outcomeStock.milk}} liters
    </li>
    <li>
      Skins: {{outcomeStock.skins}}
    </li>

  </ul>
  </div>
  
</template>

<script>
export default {
  name: 'YakShop',
  props: {
    type: String,
    name: String,
    age: Number,
    counterId: Number,
    daysStock: Number,
  },
  data: function() {
    return {
      newHerd: [],
      outcomeStock: {}
    }
  },
  created: async function() {
    const response = await fetch("http://localhost:3000/yak-shop/all", 
        { 
          method: 'GET', 
          headers: { 'Content-Type': 'application/json' },
        });
      const data = await response.json();
      this.newHerd = data;
  },
  methods: {
    resetHerd: async function() {
      const response = await fetch(`http://localhost:3000/yak-shop/reset`, 
        { 
          method: 'GET', 
          headers: { 'Content-Type': 'application/json' },
        });
      const data = await response.json();
      this.newHerd = data;
    },
    getStock: async function() {
      const response = await fetch(`http://localhost:3000/yak-shop/stock/${this.daysStock}`, 
        { 
          method: 'GET', 
          headers: { 'Content-Type': 'application/json' },
        });
      const data = await response.json();
      this.outcomeStock = data;
    },
    yakYearsToDays: function(age) {
      return age * 100;
    },
    isHerdDisabled: function() {
      return !this.newHerd.length;
    },
    isAddNewAnimalD: function() {
      if (this.type && this.name && this.age >= 0) {
        return false;
      }
      return true;
    },
    addNewAnimal: function() {
      if (!this.counterId) {
        this.counterId = 0;
      }
      this.counterId++;

      const data = {id: this.counterId, type: this.type, name: this.name, age: this.age};
      this.newHerd.push(data);
      this.resetForm();
    },
    resetForm: function() {
      this.type = '';
      this.age = null;
      this.name = '';
    },
    loadNewHerd: async function() {
        const response = await fetch("http://localhost:3000/yak-shop/load", 
          { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.newHerd)
          });
        const data = await response.json();
        // this.newHerd = data;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
    list-style-type: none;
}
</style>
