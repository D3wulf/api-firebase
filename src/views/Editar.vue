<template>
<!-- capturamos lo que viene de la url -->
Editar {{$route.params.id}}  -- {{tarea}}
<form @submit.prevent="update(tarea)">
<Input :tarea="tarea"/>

</form>
  
</template>

<script>

import {mapState, mapActions} from 'vuex'
import Input from '../components/Input'

export default {
    components:{
        Input
    },
    computed:{
        ...mapState(['tarea'])
    },
    methods: {
        ...mapActions(['setTarea','update'])
    },
    created(){
        this.setTarea(this.$route.params.id)
    }

}
</script>
