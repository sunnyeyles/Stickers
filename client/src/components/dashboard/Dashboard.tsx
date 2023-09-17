import { Link } from 'react-router-dom'
import { Paper } from '@mantine/core'

export function Dashboard() {
    return(
        <>
        <Paper ml={200}>
            <h1>Dashboard</h1>
            <Link to="/login">LOGIN</Link>
        </Paper>
        </>
    )
}