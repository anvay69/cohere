import { useState, useEffect } from "react";

function TaskForm({ task, onSubmit, onCancel }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const isEditing = !!task;

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        } else {
            setTitle("");
            setDescription("");
            setStatus("pending");
        }
    }, [task]);


    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit(
            { title: title.trim(), description: description ? description.trim() : null, status }
        );
    }

    return <div className="modal-overlay" onClick={onCancel}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
                <h2 className="modal-title">{isEditing ? "Edit Task" : "New Task"}</h2>
                <button className="modal-close" onClick={onCancel}>x</button>
            </div>

            <form onSubmit={handleSubmit}>

                {/* title */}
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        id={"title"}
                        type={"text"}
                        className={"form-input"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={"Enter task title"}
                        autoFocus
                    />
                </div>

                {/* description */}
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id={"description"}
                        className={"form-textarea"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={"Enter task description"}
                    />
                </div>

                {/* status */}
                <div className="form-group">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        id={"status"}
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="pending">To Do</option>
                        <option value="started">In Progress</option>
                        <option value="completed">Done</option>
                    </select>
                </div>

                <div className="form-action">
                    <button className="btn-outline btn" type="button" onClick={onCancel}>
                        Cancel
                    </button>

                    <button className="btn-primary btn" type="submit">
                        {isEditing ? "Save Changes" : "Create Task"}
                    </button>
                </div>
            </form>
        </div>
    </div>
}

export default TaskForm;