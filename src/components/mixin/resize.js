export default function () {
    let myChart
    const resizeHandler = () => {
        myChart.resize()
    }
    const resizeChart = () => {
        console.log(myChart)
        window.addEventListener('resize', resizeHandler())
    }
    const removeResizeChart=()=>{
        window.removeEventListener('resize', resizeHandler())
    }
    return {
        myChart,
        resizeChart,
        removeResizeChart
    }
}