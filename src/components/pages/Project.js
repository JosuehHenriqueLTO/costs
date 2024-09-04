import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Loading from "../layout/Loading"
import styles from "./Project.module.css"
import Container from "../layout/Container"
import ProjectForm from "../project/ProjectForm"
import Message from "../form/Message"

function Project() {
    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const[message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    .then((resp) => resp.json())
    .then((data) => {
        setProject(data)
    })
    .catch((err) => console.log) 
    }, [id])

   function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function editPost(project) {
        // budget validation
        if(project.budget < project.cost) {
            setMessage("Budget can't be less than it costs!")
            setType('error')
            return false
        }
        
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage("Project has been updated!")
            setType('success')
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Project: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>{! showProjectForm ? 'Edit Project' : 'Close'}</button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Category:</span> {project?.category?.name}
                                    </p>
                                    <p>
                                        <span>Total Budget:</span> R${project?.budget}
                                    </p>
                                    <p>
                                        {/* <span>Total Used:</span> R${project?.category?.name} */}
                                    </p>
                                </div >
                            ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={editPost} 
                                btnText='Finish editing'
                                projectData={project} />
                            </div>
                        )}
                        </div>
                    </Container>
                </div>)
                : (<Loading />)
            }
            
        </>
        
    )
}
export default Project