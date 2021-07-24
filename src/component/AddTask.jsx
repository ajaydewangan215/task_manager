import { useState } from 'react'

const AddTask = ({onAdd}) => {

    const [inputText, setInputText] = useState({
        text:'', day:'', reminder:false
    })

    const InputEvent = e => {
        let { name, value } = e.target
        if(name === 'reminder') {value = e.currentTarget.checked}
        setInputText({...inputText, [name]:value})
    }

    const {text, day, reminder} = inputText

    const submitEvent = e => {
        e.preventDefault()
        if(!text){
            alert('Please add text')
            return
        }

        onAdd({text, day, reminder})

        setInputText({ text:'', day:'', reminder:false})
    }

    return (
        <form className="add-form" onSubmit={submitEvent}>
            <div className="form-control">
                <label>Task</label>
                <input 
                    type="text"
                    name="text"
                    value={text}
                    placeholder="Add Task" 
                    onChange={InputEvent}
                    />
            </div>

            <div className="form-control">
                <label>Day & Time</label>
                <input 
                    type="text"
                    name="day"
                    value={day}
                    onChange={InputEvent}
                    placeholder="Add Day & Time" 
                />
            </div>

            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input 
                    type="checkbox"
                    checked={reminder}
                    name="reminder"
                    onChange={InputEvent}
                    value={reminder}
                 />
            </div>

            <input type="submit" value="Save Task" className="btn btn-block"/>
        </form>
    )
}

export default AddTask
