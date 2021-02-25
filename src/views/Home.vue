<template>
  <!-- el prevent hace que no se ponga a enviar el formulario y enseñe los datos-->
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea"/>
  </form>
  <hr>
  <ListaTareas/>
  <!--
  <p>{{tarea}}</p>
  -->
</template>

<script>
import Input from '../components/Input'
import ListaTareas from '../components/ListaTareas'
import { mapActions } from 'vuex'

const shortid = require ('shortid');



export default {
  name: 'Home',
  components: {
    Input,
    ListaTareas
    
  },
  data(){
    return{

      tarea:{
        //agregamos Id
        id:'',
        nombre:'',
        categorias: [],
        estado:"",
        numero:0
      }
    }
  },
  methods:{
    ...mapActions(['setTareas']),

    procesarFormulario(){
      console.log(this.tarea)
      if(this.tarea.nombre.trim()=== ""){
        console.log('Campo Vacío')
        return
      }
      //generamos id
      this.tarea.id = shortid.generate()

      //envio de datos
      //esto ira al index.js actions, luego a mutations y acaba en state
      this.setTareas(this.tarea)

      //limpiar datos tras el submit
      this.tarea = {
        id:'',
         nombre:'',
        categorias: [],
        estado:"",
        numero:0

      }


    }
  },
  
}
</script>
