const { useState } = React;

// Header component
function Header({ theme, toggleTheme }) {
    return (
        <header className="app-header">
            <h2>Architectural Firm Dashboard</h2>
            <button onClick={toggleTheme}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
        </header>
    );
}

// Stat card component (props)
function StatCard({ title, value }) {
    return (
        <div className="stat-card">
            <p>{title}</p>
            <h3>{value}</h3>
        </div>
    );
}

// Project list component (props)
function ProjectList({ projects, onToggle, onDelete }) {
    return (
        <ul>
            {projects.map(p => (
                <li key={p.id} className={p.done ? "done" : ""}>
                    <input type="checkbox" checked={p.done} onChange={() => onToggle(p.id)} />
                    <span>{p.name}</span>
                    <button className="delete-btn" onClick={() => onDelete(p.id)}>x</button>
                </li>
            ))}
        </ul>
    );
}

// Main app (state with useState)
function App() {
    const [theme, setTheme] = useState("light");
    const [text, setText] = useState("");
    const [filter, setFilter] = useState("all");
    const [projects, setProjects] = useState([
        { id: 1, name: "JMR Facelift", done: true },
        { id: 2, name: "CSE Expansion", done: false },
        { id: 3, name: "Hostel Renovation", done: false }
    ]);

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    function addProject(e) {
        e.preventDefault();
        if (text.trim() === "") return;
        setProjects([...projects, { id: Date.now(), name: text.trim(), done: false }]);
        setText("");
    }

    function toggleProject(id) {
        setProjects(projects.map(p => p.id === id ? { ...p, done: !p.done } : p));
    }

    function deleteProject(id) {
        setProjects(projects.filter(p => p.id !== id));
    }

    const completed = projects.filter(p => p.done).length;

    let visible = projects;
    if (filter === "open") visible = projects.filter(p => !p.done);
    if (filter === "completed") visible = projects.filter(p => p.done);

    return (
        <div className={"app " + theme}>
            <Header theme={theme} toggleTheme={toggleTheme} />

            <div className="stats">
                <StatCard title="Total Projects" value={projects.length} />
                <StatCard title="Completed" value={completed} />
                <StatCard title="In Progress" value={projects.length - completed} />
            </div>

            <div className="box">
                <h3>Project Milestones</h3>
                <form onSubmit={addProject}>
                    <input
                        type="text"
                        placeholder="Add a new project..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    <button type="submit">Add</button>
                </form>
                <div className="filters">
                    {["all", "open", "completed"].map(f => (
                        <button
                            key={f}
                            className={filter === f ? "active" : ""}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <ProjectList projects={visible} onToggle={toggleProject} onDelete={deleteProject} />
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
