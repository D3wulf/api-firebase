<template>
  
  <input type="text"
    class="form-control my-2"
    placeholder="Escriba su nombre"
    v-model.trim="tarea.nombre"
    >
  <div class="form-check form-check-inline">
    <input
    type="checkbox"
    id="check-1"
    class="form-check-input"
    v-model="tarea.categorias"
    value="Javascript"
    >
    <label for="check-1" class="form-check-label"> Javascript</label>

    <input
    type="checkbox"
    id="check-2"
    class="form-check-input"
    v-model="tarea.categorias"
    value="Node"
    >
    <label for="check-2" class="form-check-label"> Node</label>

    <input
    type="checkbox"
    id="check-3"
    class="form-check-input"
    v-model="tarea.categorias"
    value="Vue"
    >
    <label for="check-3" class="form-check-label">Vue</label>

    <input
    type="checkbox"
    id="check-4"
    class="form-check-input"
    v-model="tarea.categorias"
    value="Laravel"
    >
    <label for="check-4" class="form-check-label"> Laravel</label>

  </div>
  <hr>

  <div class="mt-2">
    <div class="form-check form-check-inline">

      <input 
      type="radio"
      id="radio-1"
      class="form-check-input"
      v-model="tarea.estado"
      value="Junior"
      >
      <label for="radio-1"> Principiante </label>

    </div>

    <div class="form-check form-check-inline">

      <input 
      type="radio"
      id="radio-2"
      class="form-check-input"
      v-model="tarea.estado"
      value="Senior"
      >
      <label for="radio-2"> Experto</label>

    </div>

    <div class="mt-2">

      <input 
      type="number"
      v-model.number="tarea.numero"
      >
    </div>

  </div>
  <hr>
  <button class="btn mt-2 btn-dark btn-block" type="submit" :disabled="bloquear">Enviar</button>

</template>

<script>
export default {
    props: {
    tarea:Object
    },
    computed:{
    bloquear(){
      return this.tarea.nombre.trim() === "" ? true : false;
    }
  }

}
</script>
