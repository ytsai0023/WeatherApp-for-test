console.log(`client site javascript file is loaded.`)


const weatherForm =  document.querySelector('form')
const messageOne = document.querySelector('.message-1')
const messageTwo = document.querySelector('.message-2')
messageOne.textContent = 'From javascript'

weatherForm.addEventListener('submit',(e)=>{
     e.preventDefault()
     const address = document.querySelector('input').value
  
    fetch(`http://localhost:3000/weather?address=${address}`).then((res)=>{
        res.json().then((data)=>{
            if(data.error){          
                messageTwo.textContent =data.error
            }else{
                messageTwo.textContent = `Location:${data.location},Forecase:${data.forecast}`

            }

    })
})
})
