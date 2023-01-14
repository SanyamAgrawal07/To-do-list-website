window.addEventListener('load',()=>{
    const $newTaskForm = document.querySelector('#newTaskForm')
    const $newTaskInput = document.querySelector('#newTaskInput')
    const $tasks = document.querySelector('#tasks')
    const $taskTemplate = document.querySelector('#task-template').innerHTML
    
    $newTaskForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const task = $newTaskInput.value
        const num = Math.floor(Math.random()*10000) + 1
        const html = Mustache.render($taskTemplate,{
            task,
            taskId: `task${num}`,
            remId: `del${num}`
        })
        $tasks.insertAdjacentHTML('beforeend', html)
        var scriptElm = document.createElement('script');
        scriptElm.setAttribute('id',`script${num}`)
        var inlineCode = document.createTextNode(`
            document.querySelector('#del${num}').addEventListener('click',(e)=>{
                e.preventDefault()
                const html = document.querySelector('#task${num}')
                html.remove()
                const script = document.querySelector('#script${num}')
                script.remove()
            })
        `);
        scriptElm.appendChild(inlineCode); 
        document.body.appendChild(scriptElm);
    })
})