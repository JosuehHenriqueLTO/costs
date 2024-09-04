import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Message from "../form/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import styles from "./Projects.module.css"
import ProjectCard from "../project/ProjectCard"
import Loading from "../layout/Loading"

function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')})
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>My Projects</h1>
                <LinkButton to="/newproject" text="Create a Project" />
            </div>
            {message && <Message type='success' msg={message}/>}
            {projectMessage && <Message type='success' msg={projectMessage}/>}
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard 
                            id={project.id} 
                            name={project.name} 
                            budget={project.budget} 
                            category={project?.category?.name} 
                            key={project.id} 
                            handleRemove={removeProject} 
                        />
                    ))
                }
                {!removeLoading && <Loading />}
            </Container>
        </div>
    )
}
export default Projects