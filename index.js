window.addEventListener('load',()=>{
    const $newTaskForm = document.querySelector('#newTaskForm')
    const $newTaskInput = document.querySelector('#newTaskInput')
    const $tasks = document.querySelector('#tasks')
    const $taskTemplate = document.querySelector('#task-template').innerHTML
    
    $newTaskForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const task = $newTaskInput.value
        if(document.querySelector(`#${task}script`)){
            alert('Cannot make duplicate tasks')
            return
        }
        const html = Mustache.render($taskTemplate,{
            task,
            taskId: `${task}task`,
            remId: `${task}rem`
        })
        $tasks.insertAdjacentHTML('beforeend', html)
        var scriptElm = document.createElement('script');
        scriptElm.setAttribute('id',`${task}script`)
        var inlineCode = document.createTextNode(`
            document.querySelector('#${task}rem').addEventListener('click',(e)=>{
                e.preventDefault()
                const html = document.querySelector('#${task}task')
                html.remove()
                const script = document.querySelector('#${task}script')
                script.remove()
            })
        `);
        scriptElm.appendChild(inlineCode); 
        document.body.appendChild(scriptElm);
    })
})