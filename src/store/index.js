import { createStore } from 'vuex'
import router from '../router'

export default createStore({
    state: {
        tareas: [],
        tarea: {
            id: '',
            nombre: '',
            categorias: [],
            estado: "",
            numero: 0
        }
    },
    mutations: {
        cargar(state, payload) {
            state.tareas = payload
        },
        set(state, payload) {

            state.tareas.push(payload)

        },
        eliminar(state, payload) {
            //se filtran todos los id distintos al que pulsamos en eliminar
            state.tareas = state.tareas.filter(item => item.id !== payload)


        },
        tarea(state, payload) {
            if (!state.tareas.find(item => item.id === payload)) {
                router.push('/')
                return
            }
            state.tarea = state.tareas.find(item => item.id === payload)


        },
        update(state, payload) {

            state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
                //para redireccionar tras ejecutar el update
            router.push('/')

        }

    },
    actions: {
        async cargarLocalStorage({ commit }) {
            try {
                //recoger datos de firebase
                const res = await fetch('https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas.json')
                    //transformar en json
                const dataDB = await res.json()
                    //console.log(dataDB)
                    //creamos una variable con un array vacio para llenarlo de datos
                const arrayTareas = []
                    //creamos un for para que los datos que hemos conseguido en el fetch, recorrerlos e ir añadiendolos
                    // en el arraytareas
                for (let id in dataDB) {
                    //console.log(id)
                    //console.log(dataDB[id])
                    arrayTareas.push(dataDB[id])
                }
                //console.log(arrayTareas)
                //Teniendo la info ya en arraytareas, la cargamos usando la mutacion, arraytareas seria el payload
                commit('cargar', arrayTareas)


            } catch (error) {
                console.log(error)

            }
        },
        //firebase
        async setTareas({ commit }, tarea) {
            try {
                const res = await fetch(`https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas/${tarea.id}.json`, {
                    //como segundo parametro metemos un objeto que sera configuracion del fetch

                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    //mandaremos el body y lo pasamos a json
                    body: JSON.stringify(tarea)

                })
                const dataDB = await res.json()
                console.log(dataDB)
            } catch (error) {
                console.log(error)
            }
            commit('set', tarea)
        },
        async deleteTareas({ commit }, id) {

            try {
                //fetch a la base de datos, esta vez por la id
                await fetch(`https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas/${id}.json`, {
                    //Delete para borrar
                    method: 'DELETE',

                })

            } catch (error) {

                console.log(error)
            }
            commit('eliminar', id)
        },
        setTarea({ commit }, id) {

            commit('tarea', id)
        },
        async update({ commit }, tarea) {

            try {
                //fetch a la base de datos, esta vez por la id
                const res = await fetch(`https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas/${tarea.id}.json`, {
                        //patch es para actualizar
                        method: 'PATCH',
                        //pasamos a json string
                        body: JSON.stringify(tarea),


                    })
                    //guardamos los resultados en datadb en formato json
                const dataDB = await res.json()

                console.log(dataDB)


            } catch (error) {

                console.log(error)
            }
            //ejecutamos los cambios al mutator update y mandamos lo que nos sale en dataDB
            commit('update', dataDB)
        }

    },
    modules: {}
})