const state = {
    currentAreaCode: [{name:'中国',areaCode:100000,value:0}]
}
const mutations = {
    PushCurrentAreaCode: (state, data) => {
        state.currentAreaCode.push(data)
    },
    PopCurrentAreaCode: (state) => {
        state.currentAreaCode.pop()
    },
    BackToCurrentAreaCode:(state,data)=>{
        let index =state.currentAreaCode.findIndex((x)=>{
            return x.areaCode===data
        })
        console.log(index)
        state.currentAreaCode=state.currentAreaCode.splice(0,index+1)
    }
}
const actions={}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}