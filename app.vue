<script setup>
// https://api.openweathermap.org/data/2.5/weather?q=Nairobi&appid=e8d19ead6d845ec3064c9cced3ea58d7
const cookie = useCookie("city")

if(!cookie.value){
  cookie.value = "Nairobi"
}
const search = ref(cookie.value)
const input = ref("")
const background = ref("")
const config = useRuntimeConfig()
// const {data: city, error } = useFetch( () =>
//   `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=e8d19ead6d845ec3064c9cced3ea58d7`)

const {data:city,error, refresh} = useAsyncData("city", async () => {
  let response 
  try {
    response = await $fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search.value}`,
    {
      params:{
        units:"metric",
        appid:config.public.WEATHER_APP_SECRET
      }
    }
  )
  cookie.value = search.value
    const temp = response.main.temp
  if(temp <= -10){
    background.value = "https://images.unsplash.com/photo-1612220520964-e80ee05b54c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }else if(temp > - 10 && temp <= 0){
    background.value = "https://images.unsplash.com/photo-1519749163903-90027c6224bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }else if(temp >0 && temp <= 10){
    background.value = "https://images.unsplash.com/photo-1501691223387-dd0500403074?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }else{
    background.value = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
  } catch (error) {
    console.log(error)
  }
 
  return response
},
{ 
  watch:[search]
})
let today = new Date()
today = today.toLocaleDateString("en-US", {
  weekday:"long", 
  year:"numeric",
  month:"long", 
  day:"numeric"
})
const handleClick = () => {
  const formatedSearch = input.value.trim().split(" ").join("+")
  search.value = formatedSearch
  input.value = ""
  refresh()
}

const goBack = () => {
  search.value = cookie.value
}
</script>

<template>
  <div v-if="city" class="h-screen relative overflow-hidden">
    <img :src="background" class="h-full w-full" />
    <div class="absolute w-full h-full top-0 overlay"/>
    <div class="absolute w-full h-full top-0 p-48">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="md:w-1/2">
          <h1 class="text-5xl md:text-6xl lg:text-7xl text-white">{{ city.name }}</h1>
          <p class="font-extralight text-xl lg:text-2xl mt-2 text-white">{{ today }}</p>
          <img 
          :src="`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`"
          class="w-55 icon"/>
        </div>
        <div class="md:w-1/2">
          <p class="text-4xl md:text-8xl lg:text-9xl text-white font-extralight">
            {{city.main.temp}}°
          </p>
        </div>
      </div>
      <div class="mt-20 flex flex-col md:flex-row justify-center items-center ">
        <input type="text" class="lg:w-1/2 h-10" placeholder="Search a city..." v-model="input">
        <button @click="handleClick" class="bg-sky-400 w-20 text-white h-10">Search</button>
      </div>
    </div>
  </div>
  <div v-else class="h-screen flex flex-col justify-center items-center">
    <p class="text-center text-7xl">We can't find that city</p>
    <button @click="goBack" class="mt-5 bg-sky-400 px-10 w-50 text-white h-10">
      Go Back
    </button>
  </div>
</template>
<style scoped>
.overlay{
  background-color: rgba(0, 0, 0, 0.5);
}
.icon{
  margin-left: -2.75rem;
  margin-top: -2.75rem;
}
</style>