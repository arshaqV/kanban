import { useState } from "react"
import { useStore } from "../store"
import "./Column.css"
import Task from "./Task"
import classNames from "classnames"


export default function Column({ state }) {
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)
    const [drop, setDrop] = useState(false)
    const addTask = useStore((store) => store.addTask)
    const tasks = useStore((store) => store.tasks.filter((task) => task.state === state))
    const setDraggedTask = useStore((store) => store.setDraggedTask)
    const draggedTask = useStore((store) => store.draggedTask)
    const moveTask = useStore((store) => store.moveTask)
    return <div className={classNames("column", { drop: drop })}
        onDragOver={e => {
            setDrop(true);
            e.preventDefault()
        }}
        onDragLeave={e => {
            setDrop(false);
            e.preventDefault()
        }}
        onDrop={e => {
            console.log(draggedTask)
            moveTask(draggedTask, state)
            setDrop(false)
            setDraggedTask(null);
        }}
    ><div className="topWrapper">
            <p>{state}</p>
            <div className="addBtn" onClick={() => { setOpen(true) }}>+</div>
        </div>
        {tasks.map((task) => <Task title={task.title} key={task.title} />)}
        {open && <div className="modal">
            <div className="modalContent">
                <input placeholder="Type here..." onChange={e => setText(e.target.value)} value={text} />
                <button onClick={() => {
                    addTask(text, state)
                    setText('')
                    setOpen(false)
                }}><p>+</p></button>
            </div>
        </div>
        }

    </div >
}